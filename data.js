// All site content that varies lives here. Specs are illustrative only.
const MATERIALS = [
  { id: 'board', name: 'Folding carton board', note: 'Printed, die-cut, glued flat' },
  { id: 'corrugated', name: 'Corrugated board', note: 'Shippers, mailers, displays' },
  { id: 'rigid', name: 'Rigid board', note: 'Wrapped lid-and-base boxes' },
  { id: 'film', name: 'Laminated film', note: 'Pouches, sleeves, polybags' },
];

const CATEGORIES = ['Cartons', 'Corrugated', 'Rigid', 'Flexible'];

const INDUSTRIES = [
  { id: 'fmcg', name: 'FMCG', copy: 'Shelf-ready packs for food, home and personal care. Consistent colour across repeat runs, and formats that pack out quickly on filling lines.' },
  { id: 'pharma', name: 'Pharma', copy: 'Cartons and leaflets designed around clear information, tamper evidence and clean, controlled production. Specifications are agreed with your quality team.' },
  { id: 'ecommerce', name: 'E-commerce', copy: 'Boxes and mailers sized to the product, not the pallet. Easy to open, easy to return, and built to travel.' },
  { id: 'textiles', name: 'Textiles', copy: 'Garment boxes, rigid gift sets and clear polybags that protect fabric and present it well, from folded shirts to home linen.' },
];

const PRODUCTS = [
  { id: 'tuck-end', name: 'Tuck-end carton', category: 'Cartons', material: 'board', industries: ['fmcg', 'pharma'],
    blurb: 'The everyday folding carton: one flat blank, a tuck closure top and bottom.',
    specs: { Material: 'Folding carton board', 'Board weight': '250–400 gsm', 'Size range': '30 × 30 × 50 to 150 × 100 × 250 mm', Print: 'Up to 6 colours + coating', Finish: 'Matt or gloss varnish, foil, emboss', MOQ: '5,000 units', 'Lead time': '3–4 weeks' } },
  { id: 'crash-lock', name: 'Crash-lock carton', category: 'Cartons', material: 'board', industries: ['fmcg'],
    blurb: 'Pre-glued base that snaps open and locks, ready for fast hand or machine packing.',
    specs: { Material: 'Folding carton board', 'Board weight': '300–450 gsm', 'Size range': '50 × 50 × 80 to 200 × 150 × 300 mm', Print: 'Up to 6 colours + coating', Finish: 'Varnish, spot UV', MOQ: '5,000 units', 'Lead time': '3–4 weeks' } },
  { id: 'leaflet-carton', name: 'Leaflet carton', category: 'Cartons', material: 'board', industries: ['pharma'],
    blurb: 'Carton with space and structure for an insert, with tamper-evident closure options.',
    specs: { Material: 'Folding carton board', 'Board weight': '250–350 gsm', 'Size range': '20 × 20 × 60 to 100 × 60 × 180 mm', Print: 'Up to 4 colours + coating', Finish: 'Matt varnish, braille option', MOQ: '10,000 units', 'Lead time': '4–5 weeks' } },
  { id: 'shipper', name: 'Shipper box', category: 'Corrugated', material: 'corrugated', industries: ['ecommerce', 'fmcg'],
    blurb: 'Regular slotted container for moving product from warehouse to doorstep.',
    specs: { Material: 'Corrugated board', Flute: 'B or C flute, single wall', 'Size range': '150 × 100 × 50 to 600 × 400 × 400 mm', Print: '1–2 colours, flexo', Finish: 'Kraft or white liner', MOQ: '1,000 units', 'Lead time': '2–3 weeks' } },
  { id: 'die-cut-mailer', name: 'Die-cut mailer', category: 'Corrugated', material: 'corrugated', industries: ['ecommerce', 'textiles'],
    blurb: 'Self-locking mailer with no tape or glue, and a printed inside for the unboxing moment.',
    specs: { Material: 'Corrugated board', Flute: 'E flute, single wall', 'Size range': '150 × 100 × 30 to 400 × 300 × 100 mm', Print: 'Up to 4 colours, inside and out', Finish: 'White or kraft liner', MOQ: '1,000 units', 'Lead time': '3 weeks' } },
  { id: 'rigid-box', name: 'Lid and base box', category: 'Rigid', material: 'rigid', industries: ['textiles', 'fmcg'],
    blurb: 'Wrapped rigid box with a separate lid. Made for gifting and premium ranges.',
    specs: { Material: 'Rigid greyboard, wrapped', 'Board thickness': '1.5–3 mm', 'Size range': '80 × 80 × 30 to 400 × 300 × 120 mm', Print: 'Up to 4 colours on wrap paper', Finish: 'Foil, emboss, soft-touch', MOQ: '500 units', 'Lead time': '5–6 weeks' } },
  { id: 'stand-up-pouch', name: 'Stand-up pouch', category: 'Flexible', material: 'film', industries: ['fmcg'],
    blurb: 'Gusseted pouch that stands on the shelf, with optional zip and tear notch.',
    specs: { Material: 'Laminated film', Structure: '2 or 3 layers', 'Size range': '80 × 120 to 250 × 350 mm', Print: 'Up to 8 colours, gravure', Finish: 'Matt or gloss, window option', MOQ: '10,000 units', 'Lead time': '5–6 weeks' } },
  { id: 'polybag', name: 'Garment polybag', category: 'Flexible', material: 'film', industries: ['textiles', 'ecommerce'],
    blurb: 'Clear resealable bag for folded garments, with a printed size and care panel.',
    specs: { Material: 'Film, clear', Thickness: '30–50 micron', 'Size range': '200 × 300 to 500 × 700 mm', Print: '1–2 colours', Finish: 'Self-seal strip, vent holes', MOQ: '5,000 units', 'Lead time': '2–3 weeks' } },
];

const QTY_OPTIONS = ['1,000–5,000', '5,000–10,000', '10,000–50,000', '50,000+'];
