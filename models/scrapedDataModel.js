var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var ScrapedDataSchema = new Schema({
  title: {
    type:String
  },
  link: {
    type:String
  },
  
  
  notes: [{
    type: Schema.Types.ObjectId,
    ref:'Note'
  }]
});

var ScrapedData = mongoose.model('ScrapedData', ScrapedDataSchema);
module.exports = ScrapedData;
