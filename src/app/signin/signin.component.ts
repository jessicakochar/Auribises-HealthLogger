import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit{
  email? : string;
  password? : string;

// firebase sdk -> get reference of firebase authentication service
  constructor(private authService: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {}
  
  onSubmit(){
  console.log("Email: ", this.email);
  console.log("Password: ", this.password);
  this.authService.signInWithEmailAndPassword(this.email!, this.password!)
  .then((userCredential: firebase.auth.UserCredential)=>{
    
    let user = userCredential.user;
    let uid = user?.uid;

    console.log('User Signed In With UID', user?.uid);


    this.router.navigate(['/home'], {queryParams: {uid}})
  })
  
  .catch((error)=>{
    console.log("Something Went Wrong", error);

  });
  }
}