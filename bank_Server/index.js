// import express
const { request } = require('express')
const express = require('express')

const dataService = require('./services/data.service')

const jwt = require('jsonwebtoken')

const cors = require('cors')

// create an app using express
const app = express()

// to use cors to set origin
app.use(cors({
    origin:'http://localhost:4200'
}))
// to parse json
app.use(express.json())

// Application specific middleware
const logMiddleware = (req, res, next) => {
    console.log("Middleware");
    next()
}

app.use(logMiddleware)

// jwtMiddleware to verify token
const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]
       
        const data = jwt.verify(token, 'supersecretkey123456')
        req.currentAcc = data.currentAcc
        next()
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "Please Login in !!"
        })
    }
}

// to resolve http request 
// GET - to fetch the data
app.get('/', (req, res) => {
    res.send("GET METHOD")
})

//POST  - to create data
app.post('/', (req, res) => {
    res.send("post METHOD")
})

//PUT - to modify or upodate
app.put('/', (req, res) => {
    res.send("PUT METHOD")
})

//PATCH - to modify or upodate PARTIALY data
app.patch('/', (req, res) => {
    res.send("Patch METHOD")
})

//DELETE - to delete data
app.delete('/', (req, res) => {
    res.send("delete METHOD")
})

// bank app server

// register API
app.post('/register', (req, res) => {
    // asynchoronous
    dataService.register(req.body.acno, req.body.uname, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

// Login API
app.post('/login', (req, res) => {
    dataService.login(req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//   deposit API
app.post('/deposit', jwtMiddleware, (req, res) => {
    dataService.deposit(req.body.acno, req.body.password, req.body.amt)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

//   dwithdraw API
app.post('/withdraw', jwtMiddleware, (req, res) => {
    dataService.withdraw(req, req.body.acno, req.body.password, req.body.amt)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
    
})

//   Transaction API
app.post('/transaction', jwtMiddleware, (req, res) => {
    dataService.getTransaction(req.body.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
   
})

// deleteAcc API

app.delete('/deleteAcc/:acno',(req,res)=>{
    dataService.deleteAcc(req.params.acno)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


// set port for server
app.listen(3000, () => {
    console.log("Server started at port no:3000");
})



