module.exports = function(app, db) {

  var ObjectID = require('mongodb').ObjectID;

  app.get("/media", function(req, res, next) {
    db.collection("media_data", function(err, result){
        result.find({}).sort({_id: -1}).limit(10).toArray(function(err, data){
          res.json(data);
      })
    });
  });

  // collection.find({ 'category_id': 10 }).sort({_id: -1}).limit(10, function (e, d) {})
// var query = ModelName.find({}, null, {limit: 10, sort: {'epoch': -1}});


  app.delete('/media/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('media_data').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Media ' + id + ' deleted!');
      } 
    });
  });

  app.post('/media', (req, res) => {
    const media_data = { title: req.body.title, message: req.body.message };

    db.collection('media_data').insert(media_data, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });
};