const fs = require('fs');

const packageJson = require('../package.json');
delete packageJson.devDependencies;

fs.copyFile('package.json', 'package.original.json', (err) => {
  if (err) throw err;

  fs.writeFile('package.json', JSON.stringify(packageJson), function (err) {
    if (err) throw err;
  });
});
