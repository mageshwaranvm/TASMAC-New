let entries = JSON.parse(localStorage.getItem('salesEntries')) || [];
let brands = JSON.parse(localStorage.getItem('brands')) || [];

function showPage(page) {
  const content = document.getElementById('content');
  if (page === 'daily') {
    content.innerHTML = `
      <h2>Daily Sales Entry</h2>
      <form id="salesForm">
        <label>Date: <input type="date" id="date" required></label><br>
        <label>Brand: <select id="brand">${brands.map(b => `<option>${b.name}</option>`).join('')}</select></label><br>
        <label>Opening: <input type="number" id="opening" required></label><br>
        <label>Received: <input type="number" id="received" value="0"></label><br>
        <label>Sold: <input type="number" id="sold" required></label><br>
        <button type="submit">Save</button>
      </form>
      <ul id="log"></ul>
    `;
    document.getElementById('salesForm').addEventListener('submit', saveEntry);
    renderLog();
  } else if (page === 'report') {
    generateReport();
  } else if (page === 'history') {
    showHistory();
  } else if (page === 'brands') {
    manageBrands();
  }
}

function saveEntry(e) {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const brand = document.getElementById('brand').value;
  const opening = parseInt(document.getElementById('opening').value);
  const received = parseInt(document.getElementById('received').value);
  const sold = parseInt(document.getElementById('sold').value);
  const closing = opening + received - sold;

  const entry = { date, brand, opening, received, sold, closing };
  entries.push(entry);
  localStorage.setItem('salesEntries', JSON.stringify(entries));
  renderLog();
}

function renderLog() {
  const log = document.getElementById('log');
  if (!log) return;
  log.innerHTML = entries.map(e => `<li>${e.date} | ${e.brand} | Sold: ${e.sold} | Closing: ${e.closing}</li>`).join('');
}

function generateReport() {
  const content = document.getElementById('content');
  let totalSales = entries.reduce((sum, e) => sum + e.sold, 0);
  content.innerHTML = `<h2>Report</h2><p>Total bottles sold: ${totalSales}</p>`;
}

function showHistory() {
  const content = document.getElementById('content');
  content.innerHTML = `<h2>History</h2><ul>${entries.map(e => `<li>${e.date} - ${e.brand} - Sold ${e.sold}</li>`).join('')}</ul>`;
}

function manageBrands() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <h2>Brands</h2>
    <form id="brandForm">
      <label>Name: <input type="text" id="brandName" required></label>
      <button type="submit">Add Brand</button>
    </form>
    <ul>${brands.map(b => `<li>${b.name}</li>`).join('')}</ul>
  `;
  document.getElementById('brandForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('brandName').value;
    brands.push({ name });
    localStorage.setItem('brands', JSON.stringify(brands));
    manageBrands();
  });
}
