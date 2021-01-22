import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../model/login.model';
import {LoginService} from '../services/login.service';
import {​​ Router }​​ from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) { 
    this.formLogin=this.formBuilder.group({
      email: ['',[Validators.required,Validators.email]],
      password: ['', Validators.required]
    });
    console.log(this.formLogin);
  }

  ngOnInit(): void {
  }

  loginClick(){
    const email=this.formLogin.get('email').value;
    const password=this.formLogin.get('password').value;
    console.log(email, password);
    const data=new LoginRequest();
    data.email=email;
    data.password=password;
    this.loginService.login(data).subscribe(value => {
      if(value.token){
        this.router.navigate(['home']);
      }
    },error =>{
      alert(error.erro.error);

    });


  }

}
