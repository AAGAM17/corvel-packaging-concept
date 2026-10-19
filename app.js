const $ = (s, el = document) => el.querySelector(s);
const page = document.body.dataset.page;
const params = new URLSearchParams(location.search);

// ---- shared header / footer ----
const LINKS = [['products.html', 'Products'], ['industries.html', 'Industries'], ['sustainability.html', 'Sustainability'], ['build.html', 'Build your packaging']];
$('#chrome-top').outerHTML = `<header><div class="wrap">
  <a class="logo" href="index.html">Corvel<i>.</i></a>
  <nav aria-label="Main">${LINKS.map(([h, t]) => `<a href="${h}" ${location.pathname.endsWith(h) ? 'aria-current="page"' : ''}>${t}</a>`).join('')}</nav>
</div></header>`;
$('#chrome-bottom').outerHTML = `<footer><div class="wrap">
  <p><strong>Corvel Packaging</strong></p>
  <p>Concept project by Aagam Shah - fictional brand</p>
  <p>All products, specifications and copy on this site are invented for demonstration. Specs are illustrative.</p>
</div></footer>`;

const card = p => `<a class="card" href="product.html?id=${p.id}">
  <span class="eyebrow">${p.category}</span><h3>${p.name}</h3><p>${p.blurb}</p>
  ${p.industries.map(i => `<span class="tag">${INDUSTRIES.find(x => x.id === i).name}</span>`).join('')}</a>`;

// ---- home: featured ----
if (page === 'home') $('#featured').innerHTML = PRODUCTS.slice(0, 3).map(card).join('');

// ---- products: filterable grid ----
if (page === 'products') {
  const filters = { category: 'All', industry: 'All' };
  const groups = [
    ['category', ['All', ...CATEGORIES].map(c => [c, c])],
    ['industry', [['All', 'All'], ...INDUSTRIES.map(i => [i.id, i.name])]],
  ];
  const draw = () => {
    $('#chips').innerHTML = groups.map(([key, opts]) => `<div class="chips" role="group" aria-label="Filter by ${key}">` +
      opts.map(([v, label]) => `<button class="chip" data-k="${key}" data-v="${v}" aria-pressed="${filters[key] === v}">${label}</button>`).join('') + '</div>').join('');
    const list = PRODUCTS.filter(p => (filters.category === 'All' || p.category === filters.category) && (filters.industry === 'All' || p.industries.includes(filters.industry)));
    $('#grid').innerHTML = list.map(card).join('') || '<p>No products match these filters.</p>';
    $('#count').textContent = `${list.length} of ${PRODUCTS.length} products`;
  };
  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('.chip');
    if (b) { filters[b.dataset.k] = b.dataset.v; draw(); $(`.chip[data-k="${b.dataset.k}"][data-v="${b.dataset.v}"]`).focus(); }
  });
  draw();
}

// ---- product page ----
if (page === 'product') {
  const p = PRODUCTS.find(x => x.id === params.get('id'));
  if (!p) { $('#pdp').innerHTML = '<div class="wrap pdp-hero"><h1>Not found</h1><p class="lede"><a href="products.html">Back to products</a></p></div>'; }
  else {
    document.title = `${p.name} · Corvel Packaging`;
    $('#pdp').innerHTML = `<div class="wrap pdp-hero"><span class="eyebrow">${p.category}</span><h1>${p.name}</h1><p class="lede">${p.blurb}</p>
      <p style="margin-top:2rem"><a class="btn" href="build.html?material=${p.material}">Build this pack</a></p></div>
      <section><div class="wrap"><h2>Specs</h2><table><caption>Illustrative specifications only. Not a real offer.</caption>
      ${Object.entries(p.specs).map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('')}</table></div></section>`;
  }
}

// ---- industries ----
if (page === 'industries') $('#ind').innerHTML = INDUSTRIES.map(i => `<div class="ind"><h2>${i.name}</h2><div><p>${i.copy}</p>
  <p style="margin-top:1rem"><a href="products.html">See the range</a></p></div></div>`).join('');

// ---- RFQ wizard ----
if (page === 'build') {
  const STEPS = ['Material', 'Size', 'Print', 'Quantity', 'Contact'];
  const COLOURS = [['1', 'One colour', 'Single spot colour'], ['2', 'Two colours', 'Two spot colours'], ['4', 'Full colour', 'CMYK process'], ['5+', 'Full colour + spot', 'CMYK plus special colour or coating']];
  const s = { step: 0, material: MATERIALS.some(m => m.id === params.get('material')) ? params.get('material') : '', l: '', w: '', h: '', colours: '', qty: '', name: '', company: '', email: '', phone: '', notes: '' };
  const root = $('#wizard');
  const radios = (name, items) => `<div class="opts">${items.map(([v, t, n]) => `<label class="opt"><input type="radio" name="${name}" value="${v}" ${s[name] === v ? 'checked' : ''}><span>${t}${n ? `<small>${n}</small>` : ''}</span></label>`).join('')}</div>`;
  // values go through value="" so escape quotes; summary uses textContent
  const esc = v => String(v).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const field = (name, label, type = 'text', extra = '') => `<label class="f">${label}<input name="${name}" type="${type}" value="${esc(s[name])}" ${extra}></label>`;
  const views = [
    () => `<legend>What is it made of?</legend>${radios('material', MATERIALS.map(m => [m.id, m.name, m.note]))}`,
    () => `<legend>How big? (mm)</legend><div class="row">${[['l', 'Length'], ['w', 'Width'], ['h', 'Height']].map(([k, t]) => field(k, t, 'number', 'min="1" max="2000"')).join('')}</div><p class="muted">Inside dimensions of the pack. Unsure? Give your best estimate and we will confirm.</p>`,
    () => `<legend>How many print colours?</legend>${radios('colours', COLOURS)}`,
    () => `<legend>How many do you need?</legend>${radios('qty', QTY_OPTIONS.map(q => [q, q + ' units']))}`,
    () => `<legend>Who should we reply to?</legend><div class="row">${field('name', 'Name', 'text', 'autocomplete="name"')}${field('company', 'Company', 'text', 'autocomplete="organization"')}</div><div class="row">${field('email', 'Email', 'email', 'autocomplete="email"')}${field('phone', 'Phone', 'tel', 'autocomplete="tel"')}</div><label class="f">Notes<textarea name="notes" rows="3">${esc(s.notes)}</textarea></label>`,
  ];
  const summary = () => [
    'Packaging enquiry (Corvel Packaging concept site)', '',
    `Material: ${MATERIALS.find(m => m.id === s.material).name}`,
    `Size: ${s.l} × ${s.w} × ${s.h} mm`,
    `Print: ${COLOURS.find(c => c[0] === s.colours)[1]}`,
    `Quantity: ${s.qty} units`, '',
    `Name: ${s.name}`,
    s.company ? `Company: ${s.company}` : null,
    `Email: ${s.email}`,
    s.phone ? `Phone: ${s.phone}` : null,
    s.notes ? `Notes: ${s.notes}` : null,
  ].filter(x => x !== null).join('\n');

  const render = (err = '') => {
    if (s.step === STEPS.length) {
      const text = summary(), enc = encodeURIComponent(text);
      root.innerHTML = `<h2>Your summary</h2><pre class="summary"></pre>
        <p class="muted" style="margin-top:12px">Concept site: nothing is sent from here. The buttons open your own WhatsApp or email app with the text filled in.</p>
        <div class="nav-row"><button class="btn alt" id="back">Edit</button><span>
        <a class="btn" href="https://wa.me/?text=${enc}" target="_blank" rel="noopener">WhatsApp</a>
        <a class="btn alt" href="mailto:sales@corvel.example?subject=${encodeURIComponent('Packaging enquiry')}&body=${enc}">Email</a></span></div>`;
      $('pre', root).textContent = text;
    } else {
      root.innerHTML = `<ol class="steps">${STEPS.map((t, i) => `<li class="${i < s.step ? 'done' : i === s.step ? 'on' : ''}">${i + 1}. ${t}</li>`).join('')}</ol>
        <form novalidate><fieldset>${views[s.step]()}</fieldset><p class="err" role="alert">${err}</p>
        <div class="nav-row">${s.step ? '<button type="button" class="btn alt" id="back">Back</button>' : '<span></span>'}
        <button class="btn">${s.step === STEPS.length - 1 ? 'See summary' : 'Next'}</button></div></form>`;
      $('form', root).onsubmit = e => {
        e.preventDefault();
        for (const [k, v] of new FormData(e.target)) s[k] = v.trim();
        const missing = [['material'], ['l', 'w', 'h'], ['colours'], ['qty'], ['name', 'email']][s.step].some(k => !s[k]);
        const badEmail = s.step === 4 && !missing && !/^\S+@\S+\.\S+$/.test(s.email);
        if (missing || badEmail) return render(missing ? 'Please complete this step to continue.' : 'Enter a valid email address.');
        s.step++; render(); root.scrollIntoView();
      };
    }
    const back = $('#back'); if (back) back.onclick = () => { s.step--; render(); };
  };
  render();
}
