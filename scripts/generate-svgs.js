/* eslint-disable no-console */
const pathToSvgFolder = '../src/assets/svgs';

const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, pathToSvgFolder);

const getFileComments = () =>
  `/**\n * !!!! WARNING! THIS IS AN AUTO-GENERATED FILE!\n * !!!! CHANGES TO THE FILE WILL BE OVERWRITTEN!\n */\n/* eslint-disable @typescript-eslint/no-restricted-imports */\n/* eslint-disable prettier/prettier */\n`;

let fileContent = getFileComments();

fs.readdir(folderPath, (directoryReadError, files) => {
  if (directoryReadError) {
    return console.error(directoryReadError);
  }

  files.forEach(file => {
    if (!file.includes('.svg')) return;

    fileContent += getFileContent(file);
  });

  fs.writeFile(
    path.join(folderPath, 'index.tsx'),
    fileContent,
    fileWriteError => {
      if (fileWriteError) {
        return console.error(fileWriteError);
      }

      console.log('The file was saved!');
    },
  );
});

const getFileContent = filename => {
  const iconName = getIconName(filename);

  return `export {default as ${iconName}} from './${filename}';\n`;
};

const getIconName = filename =>
  filename.replace('.svg', '').split('_').map(upperFirstLetter).join('');

const upperFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);
