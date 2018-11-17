var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ScrapedDataSchema = new Schema({
  title: {
    type:String
  },
  link: {
    type:String
  },
  //Have the Schema take an array named "notes" which consists of an array of ObjectIds from the Note Collection
  notes: [{
    type: Schema.Types.ObjectId,
    ref:'Note'
  }]
});

var ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema);
module.exports = ScrapedData;
