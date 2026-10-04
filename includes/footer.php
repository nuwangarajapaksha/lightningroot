</main>

<footer id="contact-form" class="bg-slate-950 text-slate-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
    <div>
      <div class="flex items-center gap-2 mb-3">
        <span class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white font-bold">⚡</span>
        <span class="text-lg font-extrabold text-white">LightningRoot</span>
      </div>
      <p class="text-sm leading-6 text-slate-400">A growing toolkit for understanding, transforming, and publishing images and documents.</p>
      <a href="mailto:support@lightningroot.com" class="mt-5 inline-flex text-sm font-semibold text-brand-300 hover:text-white transition">support@lightningroot.com</a>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Live now</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="<?= htmlspecialchars(public_url('analyze.php')) ?>" class="flex items-center gap-2 hover:text-white transition"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>Image Analysis Gauges</a></li>
        <li><a href="<?= htmlspecialchars(public_url('converter.php')) ?>" class="flex items-center gap-2 hover:text-white transition"><span class="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>File Converter</a></li>
        <li><a href="<?= htmlspecialchars(public_url('about.php')) ?>" class="text-slate-500 hover:text-white transition">About the platform</a></li>
      </ul>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Coming next</h4>
      <ul class="space-y-2 text-sm">
        <?php foreach (['Document scanning', 'Image / PDF editing', 'Subtitles and captions', 'API access'] as $service): ?><li class="text-slate-500"><?= htmlspecialchars($service) ?></li><?php endforeach; ?>
      </ul>
    </div>
    <div>
      <h4 class="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Account</h4>
      <ul class="space-y-2 text-sm">
        <li><a href="<?= htmlspecialchars(public_url('login.php')) ?>" class="hover:text-white transition">Log in</a></li>
        <li><a href="<?= htmlspecialchars(public_url('register.php')) ?>" class="hover:text-white transition">Create account</a></li>
        <li><a href="<?= htmlspecialchars(public_url('index.php')) ?>#contact-form" class="hover:text-white transition">Contact us</a></li>
        <li><a href="<?= htmlspecialchars(public_url('about.php')) ?>" class="hover:text-white transition">Capabilities</a></li>
      </ul>
    </div>
    <div class="lg:col-span-2">
      <h4 class="text-white font-semibold mb-2 text-sm uppercase tracking-wide">Send a note</h4>
      <?php if (isset($_GET['contact']) && $_GET['contact'] === 'sent'): ?>
        <p class="text-xs text-emerald-300 mb-2">Your message has been sent.</p>
      <?php elseif (isset($_GET['contact']) && $_GET['contact'] === 'error'): ?>
        <p class="text-xs text-red-300 mb-2">Could not send. Please try again.</p>
      <?php else: ?>
        <p class="text-xs text-slate-400 mb-2">Questions, ideas, or early service requests?</p>
      <?php endif; ?>
      <form method="post" action="<?= htmlspecialchars(public_url('api/contact.php')) ?>" class="space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <input name="name" type="text" required maxlength="120" placeholder="Name" class="min-w-0 rounded-md px-2.5 py-1.5 text-xs text-slate-800">
          <input name="email" type="email" required maxlength="180" placeholder="Email" class="min-w-0 rounded-md px-2.5 py-1.5 text-xs text-slate-800">
        </div>
        <textarea name="message" required maxlength="5000" rows="2" placeholder="Your message" class="w-full rounded-md px-2.5 py-1.5 text-xs text-slate-800"></textarea>
        <input name="website" type="text" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true">
        <button class="rounded-md bg-brand-600 hover:bg-brand-500 px-3 py-1.5 text-xs font-semibold text-white transition">Send message</button>
      </form>
    </div>
  </div>
  <div class="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
    &copy; <?= date('Y') ?> LightningRoot.com <span class="mx-2 text-slate-700">/</span> Built for clearer file work.
  </div>
</footer>
</body>
</html>
