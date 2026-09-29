<?php
require_once __DIR__ . '/../../config/db.php';
require_once __DIR__ . '/../../config/auth.php';
require_admin();

$admin = current_user();
$superuserEmail = 'admin@lightningroot.com';
$isSuperuser = strcasecmp((string)($admin['email'] ?? ''), $superuserEmail) === 0;
$csrfToken = $_SESSION['admin_users_csrf'] ?? bin2hex(random_bytes(32));
$_SESSION['admin_users_csrf'] = $csrfToken;
$error = '';
$search = trim($_GET['q'] ?? '');
$page = max(1, (int)($_GET['page'] ?? 1));
$perPage = 10;

$redirect = function (array $params = []): void {
  header('Location: ' . public_url('admin/users.php') . ($params ? '?' . http_build_query($params) : ''));
  exit;
};

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if (!hash_equals($csrfToken, $_POST['csrf_token'] ?? '')) {
    $error = 'Your session expired. Please try again.';
  } else {
    $action = $_POST['action'] ?? '';
    $userId = (int)($_POST['user_id'] ?? 0);
    $name = trim($_POST['name'] ?? '');
    $email = strtolower(trim($_POST['email'] ?? ''));
    $role = ($_POST['role'] ?? 'user') === 'admin' ? 'admin' : 'user';
    $password = $_POST['password'] ?? '';

    try {
      if ($action === 'create') {
        if ($name === '' || strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 180 || strlen($password) < 8) {
          throw new RuntimeException('Enter a valid name, email, and password of at least 8 characters.');
        }
        if ($role === 'admin' && !$isSuperuser) {
          throw new RuntimeException('Only the Superuser can add admins.');
        }
        $stmt = $pdo->prepare('INSERT INTO users (name, email, password_hash, role) VALUES (:name, :email, :password_hash, :role) RETURNING id');
        $stmt->execute([':name' => $name, ':email' => $email, ':password_hash' => password_hash($password, PASSWORD_DEFAULT), ':role' => $role]);
        log_activity($pdo, (int)$admin['id'], 'admin_create_user', ['user_id' => (int)$stmt->fetchColumn(), 'role' => $role]);
        $redirect(['message' => 'created']);
      }

      if ($action === 'update') {
        if ($userId < 1 || $name === '' || strlen($name) > 120 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 180) {
          throw new RuntimeException('Enter a valid name and email address.');
        }
        $existingStmt = $pdo->prepare('SELECT email, role, status FROM users WHERE id = :id');
        $existingStmt->execute([':id' => $userId]);
        $existingUser = $existingStmt->fetch(PDO::FETCH_ASSOC);
        if (!$existingUser) {
          throw new RuntimeException('User not found.');
        }
        $existingEmail = strtolower($existingUser['email']);
        $existingRole = $existingUser['role'];
        $status = ($_POST['status'] ?? 'active') === 'inactive' ? 'inactive' : 'active';
        if ($existingEmail === strtolower($superuserEmail) && !$isSuperuser) {
          throw new RuntimeException('Only the Superuser can edit the Superuser account.');
        }
        if ($existingEmail === strtolower($superuserEmail) && $email !== strtolower($superuserEmail)) {
          throw new RuntimeException('The Superuser email address cannot be changed.');
        }
        if ($existingEmail === strtolower($superuserEmail) && $role !== 'admin') {
          throw new RuntimeException('The Superuser role cannot be changed.');
        }
        if ($existingEmail === strtolower($superuserEmail) && $status !== 'active') {
          throw new RuntimeException('The Superuser account cannot be deactivated.');
        }
        if ($existingRole === 'admin' && $role !== 'admin' && !$isSuperuser) {
          throw new RuntimeException('Only the Superuser can change admin access.');
        }
        if ($existingRole !== 'admin' && $role === 'admin' && !$isSuperuser) {
          throw new RuntimeException('Only the Superuser can add admins.');
        }
        if ($userId === (int)$admin['id'] && $role !== 'admin') {
          throw new RuntimeException('You cannot remove your own admin access.');
        }
        if ($existingRole === 'admin' && $role !== 'admin' && (int)$pdo->query("SELECT COUNT(*) FROM users WHERE role = 'admin'")->fetchColumn() <= 1) {
          throw new RuntimeException('You must keep at least one admin.');
        }
        if ($password !== '' && strlen($password) < 8) {
          throw new RuntimeException('A new password must be at least 8 characters.');
        }

        $params = [':id' => $userId, ':name' => $name, ':email' => $email, ':role' => $role, ':status' => $status];
        $passwordSql = '';
        if ($password !== '') {
          $passwordSql = ', password_hash = :password_hash';
          $params[':password_hash'] = password_hash($password, PASSWORD_DEFAULT);
        }
        $stmt = $pdo->prepare("UPDATE users SET name = :name, email = :email, role = :role, status = :status$passwordSql WHERE id = :id");
        $stmt->execute($params);
        if ($userId === (int)$admin['id']) {
          $_SESSION['user']['name'] = $name;
          $_SESSION['user']['email'] = $email;
        }
        log_activity($pdo, (int)$admin['id'], 'admin_update_user', ['user_id' => $userId, 'role' => $role]);
        $redirect(['message' => 'updated']);
      }

      if ($action === 'toggle_status') {
        if ($userId < 1) {
          throw new RuntimeException('Invalid user account.');
        }
        $stmt = $pdo->prepare('SELECT email, role, status FROM users WHERE id = :id');
        $stmt->execute([':id' => $userId]);
        $targetUser = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$targetUser) {
          throw new RuntimeException('User not found.');
        }
        $targetRole = $targetUser['role'];
        $newStatus = $targetUser['status'] === 'active' ? 'inactive' : 'active';
        if (strcasecmp($targetUser['email'], $superuserEmail) === 0) {
          throw new RuntimeException('The Superuser account cannot be deactivated.');
        }
        $stmt = $pdo->prepare('UPDATE users SET status = :status WHERE id = :id');
        $stmt->execute([':status' => $newStatus, ':id' => $userId]);
        log_activity($pdo, (int)$admin['id'], 'admin_change_user_status', ['user_id' => $userId, 'status' => $newStatus]);
        $redirect(['message' => $newStatus]);
      }
    } catch (RuntimeException $e) {
      $error = $e->getMessage();
    } catch (PDOException $e) {
      $error = $e->getCode() === '23505' ? 'That email address is already in use.' : 'Unable to save the user. Please try again.';
    }
  }
}

$messages = ['created' => 'User created successfully.', 'updated' => 'User updated successfully.', 'active' => 'User activated successfully.', 'inactive' => 'User deactivated successfully.'];
$status = $messages[$_GET['message'] ?? ''] ?? '';

$countStmt = $pdo->prepare('SELECT COUNT(*) FROM users WHERE name ILIKE :search OR email ILIKE :search');
$countStmt->execute([':search' => '%' . $search . '%']);
$totalUsers = (int)$countStmt->fetchColumn();
$totalPages = max(1, (int)ceil($totalUsers / $perPage));
$page = min($page, $totalPages);
$offset = ($page - 1) * $perPage;

$stmt = $pdo->prepare('
  SELECT u.id, u.name, u.email, u.role, u.status, u.created_at, u.last_login_at,
     COUNT(up.id) AS upload_count
  FROM users u
  LEFT JOIN uploads up ON up.user_id = u.id
  WHERE u.name ILIKE :search OR u.email ILIKE :search
  GROUP BY u.id ORDER BY u.created_at DESC
  LIMIT :limit OFFSET :offset
');
$stmt->bindValue(':search', '%' . $search . '%', PDO::PARAM_STR);
$stmt->bindValue(':limit', $perPage, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

$editUser = null;
if (isset($_GET['edit'])) {
  $stmt = $pdo->prepare('SELECT id, name, email, role, status FROM users WHERE id = :id');
  $stmt->execute([':id' => (int)$_GET['edit']]);
  $requestedUser = $stmt->fetch(PDO::FETCH_ASSOC) ?: null;
  if ($requestedUser && ($isSuperuser || strcasecmp($requestedUser['email'], $superuserEmail) !== 0)) {
    $editUser = $requestedUser;
  }
}

$e = static fn ($value): string => htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
$queryParams = $search === '' ? [] : ['q' => $search];

$pageTitle = 'Manage Users';
require_once __DIR__ . '/../../includes/header.php';
?>
<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
  <?php render_breadcrumbs(); ?>
  <div class="flex items-center justify-between mb-8 flex-wrap gap-3">
    <div>
      <h1 class="text-2xl font-bold text-slate-900">User management</h1>
      <p class="text-sm text-slate-500 mt-1">Manage accounts, roles, access, and activity.</p>
    </div>
    <nav class="flex gap-2 text-sm">
      <a href="<?= htmlspecialchars(public_url('admin/index.php')) ?>" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200">Overview</a>
      <a href="<?= htmlspecialchars(public_url('admin/users.php')) ?>" class="px-3 py-1.5 rounded-lg bg-brand-600 text-white font-medium">Users</a>
      <a href="<?= htmlspecialchars(public_url('admin/uploads.php')) ?>" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200">Uploads</a>
    </nav>
  </div>
  <?php if ($error): ?><p class="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-3"><?= $e($error) ?></p><?php endif; ?>
  <?php if ($status): ?><p class="mb-4 rounded-lg bg-green-50 text-green-700 text-sm px-4 py-3"><?= $e($status) ?></p><?php endif; ?>

  <div class="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    <div class="p-5 sm:p-6 border-b border-slate-100">
      <div class="flex items-center justify-between gap-3 mb-4">
        <div><h2 class="font-bold text-slate-900">All users</h2><p class="text-xs text-slate-500 mt-1"><?= $totalUsers ?> total account<?= $totalUsers === 1 ? '' : 's' ?></p></div>
        <span class="text-sm text-slate-500">Page <?= $page ?> of <?= $totalPages ?></span>
      </div>
      <div class="flex items-center gap-3">
        <form method="get" class="relative min-w-0 flex-1">
          <svg class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="m20 20-4-4"/></svg>
          <input name="q" value="<?= $e($search) ?>" type="search" placeholder="Search by name or email..." aria-label="Search users" class="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-24 text-sm focus:border-brand-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-100">
          <button class="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-700">Search</button>
        </form>
        <button type="button" data-open-modal="createUserModal" class="inline-flex shrink-0 items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-bold text-white shadow-sm shadow-brand-200 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:ring-offset-2">
          <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>
          Add user
        </button>
      </div>
      <?php if ($search !== ''): ?><a href="<?= $e(public_url('admin/users.php')) ?>" class="inline-block mt-2 text-xs font-semibold text-brand-600 hover:text-brand-800">Clear search</a><?php endif; ?>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-sm min-w-[900px]">
        <thead class="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 text-left">
          <tr><th class="px-6 py-3 font-bold">User</th><th class="px-4 py-3 font-bold">Role</th><th class="px-4 py-3 font-bold">Status</th><th class="px-4 py-3 font-bold">Uploads</th><th class="px-4 py-3 font-bold">Joined</th><th class="px-4 py-3 font-bold">Last login</th><th class="px-6 py-3 text-right font-bold">Actions</th></tr>
        </thead>
        <tbody>
          <?php foreach ($users as $u): $isProtectedUser = strcasecmp($u['email'], $superuserEmail) === 0; ?>
          <tr class="border-t border-slate-100 hover:bg-slate-50/70 transition-colors">
            <td class="px-6 py-4"><div class="flex items-center gap-3"><span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl <?= $isProtectedUser ? 'bg-amber-100 text-amber-700' : 'bg-brand-50 text-brand-700' ?> font-bold"><?= $e(strtoupper(substr($u['name'], 0, 1))) ?></span><div><p class="font-semibold text-slate-800"><?= $e($u['name']) ?><?php if ($isProtectedUser): ?><span class="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">Superuser</span><?php endif; ?></p><p class="text-xs text-slate-500"><?= $e($u['email']) ?></p></div></div></td>
            <td class="px-4 py-4"><span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold <?= $u['role']==='admin' ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-slate-600' ?>"><?= $e($u['role'] === 'admin' && $isProtectedUser ? 'Superuser' : $u['role']) ?></span></td>
            <td class="px-4 py-4"><span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold <?= $u['status'] === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500' ?>"><?= $e(ucfirst($u['status'])) ?></span></td>
            <td class="px-4 py-4 text-slate-600"><?= (int)$u['upload_count'] ?></td>
            <td class="px-4 py-4 text-slate-500"><?= $e(date('M j, Y', strtotime($u['created_at']))) ?></td>
            <td class="px-4 py-4 text-slate-500"><?= $u['last_login_at'] ? $e(date('M j, Y g:ia', strtotime($u['last_login_at']))) : 'Never' ?></td>
            <td class="px-6 py-4"><div class="flex items-center justify-end gap-3"><?php if (!$isProtectedUser || $isSuperuser): ?><button type="button" data-edit-user='<?= $e(json_encode(['id' => $u['id'], 'name' => $u['name'], 'email' => $u['email'], 'role' => $u['role'], 'status' => $u['status']], JSON_HEX_APOS | JSON_HEX_QUOT)) ?>' class="font-semibold text-brand-600 hover:text-brand-800">Edit</button><?php endif; ?><?php if (!$isProtectedUser): ?><form method="post" onsubmit="return confirm('Change this user account status?');"><input type="hidden" name="csrf_token" value="<?= $e($csrfToken) ?>"><input type="hidden" name="action" value="toggle_status"><input type="hidden" name="user_id" value="<?= (int)$u['id'] ?>"><button class="font-semibold <?= $u['status'] === 'active' ? 'text-amber-600 hover:text-amber-800' : 'text-emerald-600 hover:text-emerald-800' ?>"><?= $u['status'] === 'active' ? 'Deactivate' : 'Activate' ?></button></form><?php else: ?><span class="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z"/><path stroke-linecap="round" d="m9.5 12 1.7 1.7 3.5-3.5"/></svg>Protected</span><?php endif; ?></div></td>
          </tr>
          <?php endforeach; ?>
          <?php if (!$users): ?><tr><td colspan="7" class="px-6 py-14 text-center text-slate-500">No users found.</td></tr><?php endif; ?>
        </tbody>
      </table>
    </div>
    <?php if ($totalPages > 1): ?><div class="flex items-center justify-between border-t border-slate-100 px-6 py-4"><p class="text-xs text-slate-500">Showing <?= $offset + 1 ?>–<?= min($offset + $perPage, $totalUsers) ?> of <?= $totalUsers ?></p><nav class="flex items-center gap-1" aria-label="User pages"><?php for ($pageNumber = 1; $pageNumber <= $totalPages; $pageNumber++): $pageLink = $queryParams + ['page' => $pageNumber]; ?><a href="<?= $e(public_url('admin/users.php') . '?' . http_build_query($pageLink)) ?>" class="min-w-8 rounded-lg px-2.5 py-1.5 text-center text-xs font-semibold <?= $pageNumber === $page ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100' ?>"><?= $pageNumber ?></a><?php endfor; ?></nav></div><?php endif; ?>
  </div>

  <div id="createUserModal" class="fixed inset-0 z-[60] hidden items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="createUserTitle">
    <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl" data-modal-panel>
      <div class="flex items-start justify-between border-b border-slate-100 px-6 py-5"><div><h2 id="createUserTitle" class="text-lg font-bold text-slate-900">Add new user</h2><p class="mt-1 text-sm text-slate-500">Create a standard user or admin account.</p></div><button type="button" data-close-modal class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg></button></div>
      <form method="post" class="space-y-4 p-6"><input type="hidden" name="csrf_token" value="<?= $e($csrfToken) ?>"><input type="hidden" name="action" value="create"><label class="block"><span class="text-sm font-semibold text-slate-700">Full name</span><input name="name" type="text" maxlength="120" required class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"></label><label class="block"><span class="text-sm font-semibold text-slate-700">Email address</span><input name="email" type="email" maxlength="180" required class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"></label><label class="block"><span class="text-sm font-semibold text-slate-700">Password</span><input name="password" type="password" minlength="8" required class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"><span class="mt-1 block text-xs text-slate-400">Use at least 8 characters.</span></label><label class="block"><span class="text-sm font-semibold text-slate-700">Account role</span><select name="role" class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"><option value="user">User</option><?php if ($isSuperuser): ?><option value="admin">Admin</option><?php endif; ?></select></label><div class="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" data-close-modal class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button class="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700">Create user</button></div></form>
    </div>
  </div>

</section>
<div id="editUserModal" class="fixed inset-0 z-[60] hidden items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="editUserTitle">
  <div class="w-full max-w-md rounded-2xl bg-white shadow-2xl" data-modal-panel>
    <div class="flex items-start justify-between border-b border-slate-100 px-6 py-5"><div><h2 id="editUserTitle" class="text-lg font-bold text-slate-900">Edit user</h2><p class="mt-1 text-sm text-slate-500">Update account details and permissions.</p></div><button type="button" data-close-modal class="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M6 6l12 12M18 6 6 18"/></svg></button></div>
    <form method="post" class="space-y-4 p-6"><input type="hidden" name="csrf_token" value="<?= $e($csrfToken) ?>"><input type="hidden" name="action" value="update"><input id="editUserId" type="hidden" name="user_id"><label class="block"><span class="text-sm font-semibold text-slate-700">Full name</span><input id="editUserName" name="name" type="text" maxlength="120" required class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"></label><label class="block"><span class="text-sm font-semibold text-slate-700">Email address</span><input id="editUserEmail" name="email" type="email" maxlength="180" required class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"></label><label class="block"><span class="text-sm font-semibold text-slate-700">New password <span class="font-normal text-slate-400">(optional)</span></span><input name="password" type="password" minlength="8" class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"></label><label class="block"><span class="text-sm font-semibold text-slate-700">Account role</span><select id="editUserRole" name="role" class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"><option value="user">User</option><option value="admin">Admin</option></select></label><label class="block"><span class="text-sm font-semibold text-slate-700">Account status</span><select id="editUserStatus" name="status" class="mt-1.5 w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm focus:border-brand-400 focus:outline-none focus:ring-2 focus:ring-brand-100"><option value="active">Active</option><option value="inactive">Inactive</option></select></label><div class="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" data-close-modal class="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button><button class="rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-brand-700">Save changes</button></div></form>
  </div>
</div>
<script>
  (() => {
    const body = document.body;
    const openModal = (modal) => { modal.classList.remove('hidden'); modal.classList.add('flex'); body.classList.add('overflow-hidden'); };
    const closeModal = (modal) => { modal.classList.add('hidden'); modal.classList.remove('flex'); body.classList.remove('overflow-hidden'); };
    document.querySelectorAll('[data-open-modal]').forEach((button) => button.addEventListener('click', () => openModal(document.getElementById(button.dataset.openModal))));
    document.querySelectorAll('[data-close-modal]').forEach((button) => button.addEventListener('click', () => closeModal(button.closest('[role="dialog"]'))));
    document.querySelectorAll('[role="dialog"]').forEach((modal) => modal.addEventListener('click', (event) => { if (event.target === modal) closeModal(modal); }));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.querySelectorAll('[role="dialog"].flex').forEach(closeModal); });
    document.querySelectorAll('[data-edit-user]').forEach((button) => button.addEventListener('click', () => {
      const user = JSON.parse(button.dataset.editUser);
      document.getElementById('editUserId').value = user.id;
      document.getElementById('editUserName').value = user.name;
      document.getElementById('editUserEmail').value = user.email;
      document.getElementById('editUserEmail').readOnly = user.email.toLowerCase() === 'admin@lightningroot.com';
      document.getElementById('editUserRole').value = user.role;
      document.getElementById('editUserStatus').value = user.status;
      openModal(document.getElementById('editUserModal'));
    }));
    <?php if ($editUser): ?>
    document.getElementById('editUserId').value = <?= (int)$editUser['id'] ?>;
    document.getElementById('editUserName').value = <?= json_encode($editUser['name']) ?>;
    document.getElementById('editUserEmail').value = <?= json_encode($editUser['email']) ?>;
    document.getElementById('editUserEmail').readOnly = <?= json_encode(strcasecmp($editUser['email'], $superuserEmail) === 0) ?>;
    document.getElementById('editUserRole').value = <?= json_encode($editUser['role']) ?>;
    document.getElementById('editUserStatus').value = <?= json_encode($editUser['status']) ?>;
    openModal(document.getElementById('editUserModal'));
    <?php endif; ?>
  })();
</script>
<?php require_once __DIR__ . '/../../includes/footer.php'; ?>
