const express = require('express');
const path = require('path');

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}

const app = express();

app.use(express.static(__dirname + '/dist/word-count'));

app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname,'/dist/word-count/index.html'));
});

app.use(forceSSL());

app.listen(process.env.PORT || 8080);
