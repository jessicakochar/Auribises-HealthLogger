import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name?: string;
  contact_number?: number;
  email?: string;
  password?: string;
   // Add this line

  constructor(
    private authService: AngularFireAuth,
    private router: Router,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  

  onSubmit() {
    console.log('Name: ', this.name);
    console.log('Phone Number: ', this.contact_number);
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);

    this.authService
      .createUserWithEmailAndPassword(this.email!, this.password!)
      .then((userCredential: firebase.auth.UserCredential) => {
        let user = userCredential.user;
        let uid = user?.uid;

        console.log('User Created With UID', user?.uid);

        let document = {
          name: this.name,
          contact_number: this.contact_number,
          email: this.email,
        };
        // insert as well as update operation
        this.firestore.collection('users').doc(user?.uid).set(document);
        this.router.navigate(['/home'], {queryParams: {uid}});
      })

      .catch((error) => {
        console.log('Something Went Wrong', error);
      });
  }
}