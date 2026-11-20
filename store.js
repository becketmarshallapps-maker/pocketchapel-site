// App Store badge on computers (Becket, Nov 20): clicking it on a computer used to open the Mac App Store.
// Now, on a computer, it shows a big QR code to scan with an iPhone instead. Phones still go straight to the App Store.
(function () {
  var badge = document.querySelector('.store');
  if (!badge) return;
  var ua = navigator.userAgent || '';
  var phone = /iPhone|iPad|iPod|Android/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPads say "Mac"
  if (phone) return;

  var box = document.createElement('div');
  box.className = 'qr-pop';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Get Pocket Chapel on your iPhone');
  box.innerHTML =
    '<div class="qr-card">' +
    '<button class="qr-close" type="button" aria-label="Close">×</button>' +
    '<h2>Get Pocket Chapel on your iPhone</h2>' +
    '<img src="app-store-qr.svg" alt="QR code for Pocket Chapel on the App Store" width="220" height="220">' +
    '<p>Open your iPhone’s camera and point it at the code.</p>' +
    '</div>';
  document.body.appendChild(box);

  function open(e) { e.preventDefault(); box.classList.add('show'); box.querySelector('.qr-close').focus(); }
  function close() { box.classList.remove('show'); badge.focus(); }
  badge.addEventListener('click', open);
  box.addEventListener('click', function (e) { if (e.target === box || e.target.closest('.qr-close')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && box.classList.contains('show')) close(); });
})();
