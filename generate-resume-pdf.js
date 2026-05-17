const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const htmlPath = path.resolve(__dirname, 'assets/documents/Ravi_Singh_Resume.html');
  const pdfPath  = path.resolve(__dirname, 'assets/documents/Ravi_Singh_Resume.pdf');

  console.log('Loading resume HTML...');
  await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Hide the print-bar button strip (not needed in PDF)
  await page.addStyleTag({ content: '.print-bar { display: none !important; } body { background: #fff; } .page { margin: 0; box-shadow: none; }' });

  console.log('Generating PDF...');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  await browser.close();
  console.log('✅ PDF saved to: ' + pdfPath);
})();
