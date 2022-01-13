const express = require('express')
const app = express()
const port = 5000

const mongoose = require('mongoose')
mongoose.connect('mongodb://dudaksdk3214:cjstk5068@boilerplate-shard-00-00.d4uud.mongodb.net:27017,boilerplate-shard-00-01.d4uud.mongodb.net:27017,boilerplate-shard-00-02.d4uud.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7i54lw-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('Hello World! 안녕하세요')
    })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

