import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [LoginComponent]
})
export class HomeComponent implements OnInit {

  depositForm = this.fb.group({
    acno: [``, [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: [``, [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: [``, [Validators.required, Validators.pattern('[0-9]*')]]
  })

  withdrawForm = this.fb.group({
    acno1: [``, [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: [``, [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: [``, [Validators.required, Validators.pattern('[0-9]*')]]
  })

  user: any
  acno: any
  lDate: any
  vineeth: any

  constructor(private ds: DataService, private fb: FormBuilder, private router: Router, private ls: LoginComponent) {
    if (!localStorage.getItem("token")) {
      alert("please Log in !!!")
      this.router.navigateByUrl("")
    }
    this.user = JSON.parse(localStorage.getItem("currentUname") || '')
    this.lDate = new Date()

  }
  ngOnInit(): void {

  }

  //  deposit 

  Deposit() {

    if (this.depositForm.valid) {
      var acno = this.depositForm.value.acno
      var pswd = this.depositForm.value.pswd
      var amount = this.depositForm.value.amount

      this.ds.deposit(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("Invalid Form")
    }

  }

  //   withdraw 

  withdraw() {
    var acno = this.withdrawForm.value.acno1
    var pswd = this.withdrawForm.value.pswd1
    var amount = this.withdrawForm.value.amount1

    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno, pswd, amount)
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
          }
        },
          (result) => {
            alert(result.error.message)
          }
        )
    }
    else {
      alert("Invalid Form")
    }
  }


  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
    localStorage.removeItem("token")
    this.router.navigateByUrl("")
  }

  deleteAcc() {
    this.acno = JSON.parse(localStorage.getItem("currentAcno") || '')
  }

  deleteFromParent(event: any) {
    console.log(event);
    //  async 
    this.ds.deleteAccount(event)
      .subscribe((result: any) => {
        if (result) {
          alert(result.message)
          localStorage.removeItem("currentAcno")
          localStorage.removeItem("currentUname")
          localStorage.removeItem("token")
          this.router.navigateByUrl("")
        }
      },
        (result) => {
          alert(result.error.message)
        }
      )
  }

  cancelfromParent() {
    this.acno = ""
  }


  vin() {
    this.vineeth = this.ls.accno
    console.log(this.vineeth);

  }


}
