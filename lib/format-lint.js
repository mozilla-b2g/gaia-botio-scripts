var REGEX = {
  file: /FILE\s*:\s*(.*)\s\-+/,
  errLine: /^Line ([0-9]+)/,
  gaiaPath: /(.*)\/apps\//
};

/**
 * Accepts a base url and lint output
 * formats all lint urls, and line numbers
 * to point to a github url.
 *
 * @param {String} gitUrl url to git repo 
 * @param {String} contents output of gjslint command.
 */
function formatLint(gitUrl, contents) {

  //slow but effective...

  var lines = contents.split('\n'),
      currentFile, output = [];

  lines.forEach(function(line) {
    var isFile,
        isLine;

    line = line.replace(REGEX.file, function(all, file) {
      var url;
      file = file.replace(REGEX.gaiaPath, 'apps/');
      url = baseUrl + file;

      isFile = true;
      currentFile = url;

      return '[' + file + '](' + url + ')';
    });

    if (!isFile) {
      line = line.replace(REGEX.errLine, function(all, line) {
        return '[' + line + '](' + currentFile + '#L' + line + ')';
      });
    }

    output.push(line);

  });

  return output.join('\n');
}

module.exports = formatLint;
