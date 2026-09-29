<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/auth.php';
$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    $stmt = $pdo->prepare('SELECT id, name, email, password_hash, role, status FROM users WHERE email = :email');
    $stmt->execute([':email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($user && $user['status'] !== 'active') {
      $error = 'This account is inactive. Please contact an administrator.';
    } elseif ($user && password_verify($password, $user['password_hash'])) {
        unset($user['password_hash']);
        $_SESSION['user'] = $user;
        $pdo->prepare('UPDATE users SET last_login_at = NOW() WHERE id = :id')->execute([':id'=>$user['id']]);
        log_activity($pdo, $user['id'], 'login');
        header('Location: ' . public_url($user['role'] === 'admin' ? 'admin/index.php' : 'analyze.php'));
        exit;
    }
    $error = 'Invalid email or password.';
}
$pageTitle = 'Log In';
require_once __DIR__ . '/../includes/header.php';
?>
<section class="max-w-md mx-auto px-4 py-16">
  <h1 class="text-2xl font-bold text-slate-900 mb-6 text-center">Welcome back</h1>
  <?php if ($error): ?><p class="mb-4 rounded-lg bg-red-50 text-red-700 text-sm px-4 py-2"><?= htmlspecialchars($error) ?></p><?php endif; ?>
  <form method="post" class="space-y-4 bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
    <div>
      <label class="text-sm font-medium text-slate-700">Email</label>
      <input name="email" type="email" required class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:ring-2 focus:ring-brand-400 focus:outline-none">
    </div>
    <div>
      <label class="text-sm font-medium text-slate-700">Password</label>
      <div class="relative mt-1">
        <input id="loginPassword" name="password" type="password" required class="w-full rounded-lg border border-slate-200 px-3 py-2 pr-16 focus:ring-2 focus:ring-brand-400 focus:outline-none">
        <button type="button" data-password-toggle="loginPassword" class="absolute inset-y-0 right-0 px-3 text-brand-600 hover:text-brand-800" aria-controls="loginPassword" aria-label="Show password" title="Show password">
          <svg data-password-show class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>
          <svg data-password-hide class="hidden h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.458 12C3.732 16.057 7.523 19 12 19c1.28 0 2.508-.238 3.64-.672M6.228 6.228A10.45 10.45 0 0 1 12 5c4.478 0 8.268 2.943 9.542 7a10.52 10.52 0 0 1-4.132 5.411M6.228 6.228 3 3m3.228 3.228 12.544 12.544M9.88 9.88a3 3 0 0 0 4.24 4.24"/></svg>
        </button>
      </div>
    </div>
    <button class="w-full rounded-lg bg-brand-600 py-2.5 text-white font-semibold hover:bg-brand-700 transition">Log in</button>
    <p class="text-sm text-center text-slate-500">No account? <a href="<?= htmlspecialchars(public_url('register.php')) ?>" class="text-brand-600 font-medium">Sign up</a></p>
  </form>
</section>
<script>
  document.querySelector('[data-password-toggle="loginPassword"]').addEventListener('click', (event) => {
    const button = event.currentTarget;
    const password = document.getElementById(button.getAttribute('aria-controls'));
    const isVisible = password.type === 'text';
    password.type = isVisible ? 'password' : 'text';
    button.querySelector('[data-password-show]').classList.toggle('hidden', !isVisible);
    button.querySelector('[data-password-hide]').classList.toggle('hidden', isVisible);
    button.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
    button.setAttribute('title', isVisible ? 'Show password' : 'Hide password');
  });
</script>
<?php require_once __DIR__ . '/../includes/footer.php'; ?>
