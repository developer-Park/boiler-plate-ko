const express = require('express');
// const req = require('express/lib/request')
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key'); 
const {auth } = require('./middleware/auth');
const { User } = require("./models/User");


//appication /x-www-forn-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//apllication/jason
app.use(bodyParser.json());

app.use(cookieParser());


const mongoose = require('mongoose');
// mongoose.connect('mongodb://dudaksdk3214:cjstk5068@boilerplate-shard-00-00.d4uud.mongodb.net:27017,boilerplate-shard-00-01.d4uud.mongodb.net:27017,boilerplate-shard-00-02.d4uud.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-7i54lw-shard-0&authSource=admin&retryWrites=true&w=majority').then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

mongoose.connect(config.mongoURI).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 하세요'))

app.post('/api/users/register', (req, res) => {
  //회원 가입 할때 필요한 정보를 데이터베이스에 넣어준다.

        const user = new User(req.body);

        user.save((err, userInfo) => {
          if(err) return res.json({success: false, err})
          return res.status(200).json({
            success: true
          })
        })
      }) 


app.post('/api/users/login', (req, res) => {

  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당되는 유저가 없습니다."
      })
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      // console.log('err',err)

      // console.log('isMatch',isMatch)

      if (!isMatch)
        return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." })

      //비밀번호 까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장한다.  어디에 ?  쿠키 , 로컳스토리지 
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id })
  })
})
})
})


app.get('/api/users/auth', auth, (req, res) => {

  res.status(200).json({
_id: req.user._id,
isAdmin: req.user.role === 0 ? false : true, 
isAuth: true,
email:req.user.email,
name: req.user.name,
lastname: req.user.lastname,
role: req.user.role,
image: req.user.image

})
})


app.get('/api/users/logout', auth, (req,res) => {
  User.findOneAndUpdate({_id: req.user._id}, 
    {token : ""}, (err,user) => {
      if (err) return res.json({success: false, err});
      return res.status(200).send({
        success: true
      })
    })
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


