// Tap an email address to copy it (Becket, Nov 18), with a short "Copied" note.
(function () {
  var toast = document.createElement('div');
  toast.className = 'toast';
  document.body.appendChild(toast);
  var timer;
  function show(text) {
    toast.textContent = text;
    toast.classList.add('show');
    clearTimeout(timer);
    timer = setTimeout(function () { toast.classList.remove('show'); }, 1800);
  }
  function copy(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    var t = document.createElement('textarea');
    t.value = text; t.style.position = 'fixed'; t.style.opacity = '0';
    document.body.appendChild(t); t.select();
    try { document.execCommand('copy'); } finally { document.body.removeChild(t); }
    return Promise.resolve();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('.email');
    if (!b) return;
    var addr = b.getAttribute('data-email');
    copy(addr).then(function () { show('Copied ' + addr); }, function () { show(addr); });
  });
})();
