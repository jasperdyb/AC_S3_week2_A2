const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')

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

err = undefined


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'pug')

app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));



app.get('/', function (req, res) {
  console.log(req.session)
  if (req.session.user) {
    res.redirect('/welcome')
  }
  else if (req.session.email) {
    res.render('index', { email: req.session.email, err })
    err = undefined
  }
  else {
    res.render('index');
  }
});

app.post('/', (req, res) => {
  email = req.body.email
  password = req.body.password

  for (i = 0; i < users.length; i++) {
    if (email === users[i].email) {
      req.session.email = users[i].email
      if (password === users[i].password) {
        err = undefined
        req.session.user = users[i].firstName
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
    res.redirect('/')
  }
  else {
    res.redirect('/welcome')
  }
})

app.get('/welcome', (req, res) => {
  if (req.session.user) {
    res.render('welcome', { name: req.session.user })
  }
  else {
    res.redirect('/')
  }

})

app.get('/logout', (req, res) => {
  console.log('logout')
  req.session.destroy()
  res.redirect('/')
})

app.listen(port)