/* eslint-disable no-console */
const pathToSvgFolder = '../src/assets/svgs';

const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, pathToSvgFolder);

fs.readdir(folderPath, (directoryReadError, files) => {
  if (directoryReadError) {
    return console.error(directoryReadError);
  }

  files.forEach(file => {
    if (!file.includes('.svg')) return;

    const filePath = path.join(folderPath, file);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      }

      fs.writeFile(
        filePath,
        data
          .replace('height="24"', '')
          .replace('width="24"', '')
          .replaceAll('viewbox="0 0 24 24"', '')
          .replace('  ', ' ')
          .replace(' >', '>')
          .replace('<svg ', '<svg viewbox="0 0 24 24" '),
        fileWriteError => {
          if (fileWriteError) {
            return console.error(fileWriteError);
          }
        },
      );
    });
  });
});
