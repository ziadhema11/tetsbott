const express = require('express');
const app = express();
module.exports = client => {
  app.set('view engine', 'ejs');
  app.use(express.static('public'));
  
  app.get('/', (req, res) => {
    res.render('index.ejs', { client });
  });
  let dom = {
    PORT: 3000
  }
  let listener = app.listen(dom.PORT, () => {
    console.log('app listening at port ' + listener.address().port);
  });
}