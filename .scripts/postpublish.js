const fs = require('fs');

fs.unlink('package.json', (err) => {
  if (err) throw err;

  fs.rename('package.original.json', 'package.json', function (err) {
    if (err) throw err;
  });
});
