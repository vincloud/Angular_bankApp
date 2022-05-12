import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const options = {
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})

export class DataService {

  currentUname: any
  currentAcno: any

  // database: any = {
  //   1000: { acno: 1000, uname: "vineeth", password: "1000", balance: 5000, transaction: [] },
  //   1001: { acno: 1001, uname: "san", password: "1001", balance: 5000, transaction: [] },
  //   1002: { acno: 1002, uname: "vish", password: "1002", balance: 5000, transaction: [] }
  // }

  constructor(private http: HttpClient) {
    // this.getdetails()
  }
  //   register 


  // savedetails() {
  //   if (this.database) {
  //     localStorage.setItem("database", JSON.stringify(this.database))
  //   }
  //   if (this.currentUname) {
  //     localStorage.setItem("currentname", JSON.stringify(this.currentUname))
  //   }
  //   if (this.currentAcno) {
  //     localStorage.setItem("currentAcno", JSON.stringify(this.currentAcno))
  //   }
  // }

  // getdetails() {
  //   if (localStorage.getItem("database")) {
  //     this.database = JSON.parse(localStorage.getItem("database") || "")
  //   }
  //   if (localStorage.getItem("currentname")) {
  //     this.currentUname = JSON.parse(localStorage.getItem("currentname") || "")
  //   }
  // }


  // gettransaction array

  getTransaction(acno: any) {
    const data = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction', data, this.getoption())
  }

  //  register

  register(acno: any, uname: any, password: any) {
    const data = {
      acno,
      uname,
      password
    }
    return this.http.post("http://localhost:3000/register", data)
  }

  //  login

  login(acno: any, password: any) {

    const data = {
      acno,
      password
    }
    //  login API call
    return this.http.post("http://localhost:3000/login", data)

  }

  // deposit

  deposit(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      password: pswd,
      amt
    }
    //  deposit API 
    return this.http.post("http://localhost:3000/deposit", data, this.getoption())
  }

  //  to add token inside http header

  getoption() {
    const token = JSON.parse(localStorage.getItem("token") || '')

    let headers = new HttpHeaders()

    if (token) {
      headers = headers.append('x-access-token', token)
      options.headers = headers
    }
    return options
  }


  // withdhraw

  withdraw(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      password: pswd,
      amt
    }
    //  withdraw API 
    return this.http.post("http://localhost:3000/withdraw", data, this.getoption())
  }


// delete Account

deleteAccount(acno:any){
  // deleteApI
  return this.http.delete('http://localhost:3000/deleteAcc/'+acno )
}

}
