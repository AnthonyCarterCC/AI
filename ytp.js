(function () {
  var KEYS = ['SUBJECT', 'PRODUCT', 'PERSON', 'CONTEXT'];
  var EXAMPLE = {
    SUBJECT: 'Organising my working day, priorities, email, meetings, notes and To Do list using AI.',
    PRODUCT: 'Microsoft 365 Copilot',
    PERSON: 'An experienced business owner, CEO, COO, CIO, senior manager or corporate professional.',
    CONTEXT: 'I run an established professional services business. I want to use AI to run my working life more effectively.\nI am NOT interested in marketing, social media, audience building, lead generation, selling courses, starting an AI agency, side hustles or making money with AI.\nI want to see how someone running a real business uses AI during a normal working day.'
  };
  var el = function (id) { return document.getElementById(id); };
  var pre = el('ytp-pre'), note = el('ytp-note'), copied = el('ytp-copied');
  var timer;

  function values() {
    var v = {};
    KEYS.forEach(function (k) { v[k] = el('f-' + k).value.replace(/\s+$/, '').replace(/^\s+/, ''); });
    return v;
  }
  function render() {
    var v = values(), empty = 0, plain = YTP_TEMPLATE;
    pre.textContent = '';
    var parts = YTP_TEMPLATE.split(/(\{\{[A-Z]+\}\})/);
    parts.forEach(function (p) {
      var m = p.match(/^\{\{([A-Z]+)\}\}$/);
      if (!m) { pre.appendChild(document.createTextNode(p)); return; }
      var k = m[1];
      if (v[k]) { pre.appendChild(document.createTextNode(v[k])); plain = plain.replace(p, v[k]); }
      else { var s = document.createElement('mark'); s.textContent = YTP_PLACEHOLDERS[k]; pre.appendChild(s); plain = plain.replace(p, YTP_PLACEHOLDERS[k]); empty++; }
    });
    render.plain = plain; render.empty = empty;
    note.textContent = empty ? (empty === 4 ? 'Fill in the four boxes and your prompt will appear here. The highlighted lines are the parts still to fill in.' : empty + (empty === 1 ? ' box is' : ' boxes are') + ' still empty. The highlighted text will be copied as it stands, so fill it in or delete it before you paste.') : 'All four boxes are filled in. Your prompt is ready to copy.';
  }
  function say(msg) { copied.textContent = msg; clearTimeout(timer); timer = setTimeout(function () { copied.textContent = ''; }, 3500); }
  function copy() {
    var text = render.plain;
    function fallback() {
      var ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select(); var ok = false; try { ok = document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); return ok;
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(function () { say('Copied. Now paste it into your AI.'); }, function () { say(fallback() ? 'Copied. Now paste it into your AI.' : 'Copy failed. Select the text and copy it yourself.'); });
    } else { say(fallback() ? 'Copied. Now paste it into your AI.' : 'Copy failed. Select the text and copy it yourself.'); }
  }
  KEYS.forEach(function (k) { el('f-' + k).addEventListener('input', render); });
  el('ytp-copy').addEventListener('click', copy);
  el('ytp-example').addEventListener('click', function () { KEYS.forEach(function (k) { el('f-' + k).value = EXAMPLE[k]; }); render(); });
  el('ytp-reset').addEventListener('click', function () { KEYS.forEach(function (k) { el('f-' + k).value = ''; }); render(); el('f-SUBJECT').focus(); });
  render();
})();
