//this code is probably horrible but it will get the job done.
var fsPath = require('path'),
    fs = require('fs'),
    MOCHA_RESULTS = 'mocha-test-results.txt',
    template = fs.readFileSync('templates/test.html', 'utf8');

function Create(gaiaDir, title, outputFile) {
  var results = fs.readFileSync(fsPath.join(gaiaDir, MOCHA_RESULTS), 'utf8'),
      output = template;

  output = output.replace('{{TITLE}}', title);
  output = output.replace('{{BODY}}', results);

  fs.writeFileSync(outputFile, output, 'utf8');
}

module.exports = Create;
