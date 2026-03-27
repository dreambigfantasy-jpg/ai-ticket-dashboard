const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
workbook.xlsx.readFile('My tickets JFMM.xlsx').then(() => {
  const worksheet = workbook.getWorksheet(1);
  
  // Get headers
  const headers = [];
  const firstRow = worksheet.getRow(1);
  firstRow.eachCell((cell, colNumber) => {
    headers[colNumber] = cell.value;
  });
  
  // Find all CSM-related columns
  console.log('CSM-related columns:');
  headers.forEach((header, index) => {
    if (header && header.toLowerCase().includes('csm')) {
      console.log(`Col ${index}: ${header}`);
    }
  });
  
  const merchantColIndex = headers.indexOf('Merchant');
  
  // Check different potential CSM columns
  console.log('\nChecking row data (first 5 Stayclassy rows):');
  let stayCount = 0;
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && stayCount < 5) {
      const merchant = row.getCell(merchantColIndex).value;
      if (merchant === 'Stayclassy') {
        console.log(`\nRow ${rowNumber} (Stayclassy):`);
        headers.forEach((header, colNum) => {
          if (header) {
            const value = row.getCell(colNum).value;
            if (header.toLowerCase().includes('csm') || header.toLowerCase().includes('merchant')) {
              console.log(`  ${header} (Col ${colNum}): ${value}`);
            }
          }
        });
        stayCount++;
      }
    }
  });
  
}).catch(err => {
  console.error('Error:', err);
});