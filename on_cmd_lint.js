var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

var fail = false;

//
// Lint
//
echo();
echo('>> Linting');

exec('make lint', {silent: false, async: true}, function(error, output) {
  var processed;

  if (error > 0) {
    fail = true;
  }

  try {
    processed = require('./lib/format-lint')(
      botio.public_url,
      output
    );
  } catch (e) {
    echo('!!failed to process lint output: ' + e.message + '\n' + e.stack);
  }

  if (!fail) {
    botio.message('+ **Lint:** Passed\n----\n');
  } else {
    botio.message(
      'Lint: FAILED<br />----' + processed.replace(/\n/g, '<br />')
    );
  }

  if (fail)
    exit(1);
}); // exec lint
