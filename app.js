const express = require('express')
const pug = require('pug')
const bodyParser = require('body-parser')

const app = express()

port = 3000

const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]
email = undefined
password = undefined
err = undefined
name = undefined


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')

app.get('/', function (req, res) {
  console.log(email, password, err)
  res.render('index', { email, password, err });
  email = undefined
  err = undefined
});

app.post('/', (req, res) => {
  email = req.body.email
  password = req.body.password

  for (i = 0; i < users.length; i++) {
    // console.log(users[i].email)
    if (email === users[i].email) {
      if (password === users[i].password) {
        err = undefined
        name = users[i].firstName
        console.log(name)
        console.log("Login success")
      }
      else {
        password = undefined
        err = "Invalid password"
      }
      break
    }
    else {
      err = "User not exist."
    }
  }
  console.log(err)

  if (err) {
    // email = undefined
    // password = undefined
    // res.render('index', { email, password, err })
    res.redirect('/')
  }
  else {
    res.redirect('/welcome')
  }
})

app.get('/welcome', (req, res) => {
  res.render('welcome', { name: name })
})

app.listen(port)