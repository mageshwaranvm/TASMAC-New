// Store entries in localStorage
const salesForm = document.getElementById('salesForm');
const logList = document.getElementById('log');
let entries = JSON.parse(localStorage.getItem('salesEntries')) || [];

function renderLog() {
  logList.innerHTML = '';
  entries.forEach(e => {
    const li = document.createElement('li');
    li.textContent = `${e.date} | ${e.brand} | Opening: ${e.opening} | Sales: ${e.sales} | Closing: ${e.closing}`;
    logList.appendChild(li);
  });
}

salesForm.addEventListener('submit', e => {
  e.preventDefault();
  const date = document.getElementById('date').value;
  const brand = document.getElementById('brand').value;
  const opening = parseInt(document.getElementById('opening').value);
  const sales = parseInt(document.getElementById('sales').value);
  const purchases = parseInt(document.getElementById('purchases').value);

  const closing = opening - sales + purchases;

  const entry = { date, brand, opening, sales, purchases, closing };
  entries.push(entry);
  localStorage.setItem('salesEntries', JSON.stringify(entries));
  renderLog();
});

// PDF generation using jsPDF
document.getElementById('generatePDF').addEventListener('click', () => {
  const doc = new window.jspdf.jsPDF();
  doc.text("Daily Sales Report", 10, 10);
  let y = 20;
  entries.forEach(e => {
    doc.text(`${e.date} | ${e.brand} | Opening: ${e.opening} | Sales: ${e.sales} | Closing: ${e.closing}`, 10, y);
    y += 10;
  });
  doc.save("sales_report.pdf");
});

renderLog();
