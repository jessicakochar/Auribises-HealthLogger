import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  bloodPressureLow? : number;
  bloodPressureHigh? : number;
  sugar? : number;
  uid? : string;

  healthlogs$: Observable<any []>;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore){
    this.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    this.healthlogs$ =  this.firestore.collection('users').doc(this.uid).collection('healthlogs').valueChanges();
  }
  
  ngOnInit(): void{ 
    this.uid = this.route.snapshot.queryParamMap.get('uid') || '';
    console.log("User's UID Recieved", this.uid);
  }

  onSubmit(){ 
    console.log("BP High: ", this.bloodPressureHigh);
    console.log("BP Low: ", this.bloodPressureLow);
    console.log("Sugar: ", this.sugar);

    let document = {
      "bloodPressureHigh": this.bloodPressureHigh,
      "bloodPressureLow": this.bloodPressureLow,
      "sugar": this.sugar,
      "createdOn": new Date,
    }

    this.firestore.collection('users').doc(this.uid).collection('healthlogs').add(document);
    console.log('Health Details Saved');
    
    this.bloodPressureHigh = 0;
    this.bloodPressureLow = 0;
    this.sugar = 0;


  }
  
}