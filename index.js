const express = require('express');
// const req = require('express/lib/request')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');

const config = require('./config/key'); 

const { User } = require("./models/User");


//appication /x-www-forn-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//apllication/jason
app.use(bodyParser.json());


const mongoose = require('mongoose');
// mongoose.connect('mongodb://dudaksdk3214:cjstk5068@boilerplate-shard-00-00.d4uud.mongodb.net:27017,boilerplate-shard-00-01.d4uud.mongodb.net:27017,boilerplate-shard-00-02.d4uud.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7i54lw-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 하세요'))

app.post('/register', (req, res) => {
  //회원 가입 할때 필요한 정보를 데이터베이스에 넣어준다.

        const user = new User(req.body);
        user.save((err, userInfo) => {
          if(err) return res.json({success: false, err})
          return res.status(200).json({
            success: true
          })
        })
      }) 


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


