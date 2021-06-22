const express = require('express')
const server = express()
const cors = require('cors')

server.use(cors())
server.options('*', cors());

const EXPRESS_PORT = 3000

module.exports = {
  bootstrap: (callback) => {
    server.listen(EXPRESS_PORT, () => {
      console.log(`Listening on port ${EXPRESS_PORT}`);
      
      if (callback) {
        callback(server)
      }
    })
  }
}
