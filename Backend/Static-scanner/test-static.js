const StaticScanner = require('./StaticScanner');

// Replace this with the URL you want to scan
const urlToScan = 'https://www.jazeeraairways.com/en-pk';

const scanner = new StaticScanner(urlToScan);

scanner.scan().then(results => {
  console.log(results);
}).catch(err => {
  console.error('Error during scan:', err);
});
