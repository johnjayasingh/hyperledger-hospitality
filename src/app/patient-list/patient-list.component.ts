import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { PatientService } from '../Patient/Patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;



  patientId = new FormControl("", Validators.required);



  fullName = new FormControl("", Validators.required);



  age = new FormControl("", Validators.required);



  bloodGroup = new FormControl("", Validators.required);



  Medications = new FormControl("", Validators.required);




  constructor(private servicePatient: PatientService, fb: FormBuilder) {
    this.myForm = fb.group({


      patientId: this.patientId,



      fullName: this.fullName,



      age: this.age,



      bloodGroup: this.bloodGroup,



      Medications: this.Medications


    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.servicePatient.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(participant => {
          tempList.push(participant);
        });
        this.allParticipants = tempList;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

}
