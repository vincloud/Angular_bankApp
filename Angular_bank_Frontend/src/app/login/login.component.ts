import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "Your perfect banking partner"

  accno = "Account number please !!"



  loginForm = this.fb.group({
    acno: [``, [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: [``, [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  })


  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  // get_acno(event: any) {
  //   console.log(event.target.value);
  //   this.acno = event.target.value

  // }

  // get_pswd(event: any) {
  //   console.log(event.target.value);
  //   this.pswd = event.target.value
  // }

  // Oneway binding usindg refernce vairable*****************************
  // login(a:any,p:any) {

  //   var acno = a.value
  //   var pswd = p.value

  //   let db = this.database

  //   if (acno in db) {
  //     if (pswd == db[acno]["password"]) {
  //       alert("Login Success")
  //     }
  //     else {
  //       alert("Invalid Password")
  //     }

  //   }
  //   else {
  //     alert("Invalid Account Number")
  //   }

  // }

  // Twoway Binding *******************************
  login() {

    if (this.loginForm.valid) {
      // asynchronous
      var acno = this.loginForm.value.acno
      var pswd = this.loginForm.value.pswd

      this.ds.login(acno, pswd)
        .subscribe((result: any) => {
          if (result) {
            localStorage.setItem("currentUname", JSON.stringify(result.currentUname))
            localStorage.setItem("currentAcno", JSON.stringify(result.currentAcno))
            localStorage.setItem("token", JSON.stringify(result.token))
            alert(result.message)
            this.router.navigateByUrl("home")
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )

    }
    else {
      alert("Invalid form")
    }

  }

}