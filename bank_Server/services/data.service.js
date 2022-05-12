// import jsonwebtoken
const jwt = require('jsonwebtoken')

// import db.js

const db = require('./db')

// database = {
//     1000: { acno: 1000, uname: "vineeth", password: "1000", balance: 5000, transaction: [] },
//     1001: { acno: 1001, uname: "san", password: "1001", balance: 5000, transaction: [] },
//     1002: { acno: 1002, uname: "vish", password: "1002", balance: 5000, transaction: [] }
// }

//   register defenition 

const register = (acno, uname, password) => {
    return db.User.findOne({ acno })
        .then(user => {
            if (user) {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Already existed...please Login in !!!"
                }
            }
            else {
                const newUser = new db.User({
                    acno,
                    uname,
                    password,
                    balance: 0,
                    transaction: []
                })
                newUser.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: "Succssfully Registered !!! "
                }
            }
        })
}

//  Login

const login = (acno, password) => {
    return db.User.findOne({
        acno,
        password
    })
        .then(user => {
            if (user) {
                currentUname = user.uname
                currentAcno = acno
                token = jwt.sign({
                    currentAcc: acno
                }, 'supersecretkey123456')
                return {
                    statusCode: 200,
                    status: true,
                    message: "Succssfully Logged in !!! ",
                    currentUname,
                    currentAcno,
                    token
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Invalid Credential"
                }
            }
        })
}

// deposit
const deposit = (acno, pswd, amt) => {
    var amount = parseInt(amt)
    return db.User.findOne({ acno, password: pswd })
        .then(user => {
            if (user) {
                user.balance += amount
                user.transaction.push({
                    amount: amount,
                    type: "CREDIT"
                })
                user.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: amount + "depositted successfully...New balance is" + user.balance
                }
            }
            else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Invalid Credentials"  
                }
            }
        })
}


// withdhraw

const withdraw = (req, acno, pswd, amt) => {
    var amount = parseInt(amt)
    currentAcc = req.currentAcc
    return db.User.findOne({
        acno, password: pswd
    }).then(user => {
        if (currentAcc != acno) {
            return {
                statusCode: 422,
                status: false,
                message: "Operation denied"
            }
        }
        if (user) {
            if (user.balance > amount) {
                user.balance -= amount
                user.transaction.push({
                    amount: amount,
                    type: "DEBIT"
                })
                user.save()
                return {
                    statusCode: 200,
                    status: true,
                    message: amount + "debitted successfully...New balance is" + user.balance
                }
            } else {
                return {
                    statusCode: 422,
                    status: false,
                    message: "Insufficient balance"
                }
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Invalid credentials"
            }
        }
    })
}

// transaction history 

const getTransaction = (acno) => {

    return db.User.findOne({
        acno
    }).then(user => {
        if (user) {
            return {
                statusCode: 200,
                status: true,
                transaction: user.transaction
            }
        }
        else {
            return {
                statusCode: 422,
                status: false,
                message: "Invalid ACC number"
            }
        }
    })
}

const deleteAcc=(acno)=>{
    return db.User.deleteOne({
        acno
    })
    .then(user=>{
        if(user){
            return {
                statusCode: 200,
                status: true,
                message:"Account Deleted Successfully"
            }
        }
        else{
            return {
                statusCode: 200,
                status: true,
                message:"Account Deleted Successfully"
            }
        }
    })
}


module.exports = {
    register, login, deposit, withdraw, getTransaction,deleteAcc 
     
}