var mongoose = require('mongoose');

 var uri = "mongodb+srv://canvas_user:2407Rakhee%21@cluster0-jjkgt.mongodb.net/quoradb?poolSize=10?retryWrites=true"

 
  mongoose.connect(uri.toString()).then(() => console.log('connected to DB'))
  .catch(err => console.log("DB CONNECTION ERROR" + err));