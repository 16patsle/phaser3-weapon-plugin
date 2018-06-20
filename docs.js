'use strict';
const jsdoc2md = require('jsdoc-to-markdown');
const fs = require('fs');
const path = require('path');

/* input and output paths */
const inputDir = 'src';
const outputDir = path.join(__dirname, 'docs');

const inputFilesRaw = fs.readdirSync(inputDir);

const inputFiles = inputFilesRaw.reduce((files, file) => {
  files.push(path.join(inputDir, file));
  return files;
}, []);

/* get template data */
const templateData = jsdoc2md.getTemplateDataSync({
  files: inputFiles
});

/* reduce templateData to an array of class names */
const classNames = templateData.reduce((classNames, identifier) => {
  if (identifier.kind === 'class') classNames.push(identifier.name);
  return classNames;
}, []);

/* check if the output dir exists, if not create it */
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

/* create a documentation file for each class */
for (const className of classNames) {
  const template = `{{#class name="${className}"}}{{>docs}}{{/class}}`;
  console.log(`rendering ${className}, template: ${template}`);
  const output = jsdoc2md.renderSync({
    data: templateData,
    template: template
  });
  fs.writeFileSync(path.resolve(outputDir, `${className}.md`), output);
}