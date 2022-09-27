import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
  },
  score: {
    type: 'string',
    reqired: true
  }
})

const player = mongoose.model('player', schema)

export default player