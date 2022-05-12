// to connect server with mongoDB

// import mongoose

const mongoose = require('mongoose')

// define connection string

mongoose.connect('mongodb://localhost:27017/bankAppJan', {
    useNewUrlParser: true
})

// to create model

const User = mongoose.model('User', {
    acno: Number,
    uname: String,
    password: String,
    balance: Number,
    transaction: []
})

// export model

module.exports={
    User 
}
