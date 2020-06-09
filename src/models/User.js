const mongoose = require('mongoose')
const PointSchema = require('./PointSchema')
const config = require('./config')

mongoose.connect(process.env.MONGOBD_URI || `mongodb+srv://${config.cl}:${config.pw}@cluster0-efbho.mongodb.net/${config.db}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

const UserSchema = new mongoose.Schema({
  username: String,
  mail: String,
  first_name: String,
  user_city: String,
  user_state: String,
  location: {
    type: PointSchema,
    required: true,
    index: '2dsphere'
  },
  street: String,
  district: String,
  report: String
})

module.exports = mongoose.model('User', UserSchema)