var botio = require(process.env['BOTIO_MODULE']);
require('shelljs/global');

var fail = false;

//
// Lint
//
echo();
echo('>> Linting');

exec('make lint', {silent:false, async:true}, function(error, output) {
  if(error > 0) {
    fail = true;
  }

  if (!fail) {
    botio.message('+ **Lint:** Passed');
  } else {
    botio.message('+ **Lint:** FAILED');
  }

  if (fail)
    exit(1);
}); // exec lint
