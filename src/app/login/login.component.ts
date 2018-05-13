import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { PatientService } from '../Patient/Patient.service';
import { Patient, Hospital } from '../org.hospitality';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  private nouserfound: Boolean = false;
  private allTransactions;
  private Transaction;
  private currentId;
  private errorMessage;

  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  constructor(fb: FormBuilder, private router: Router,
    private patientDataService: DataService<Patient>, private hospitalDataService: DataService<Hospital>) {
    this.myForm = fb.group({
      username: this.username,
      password: this.password
    });
  };
  ngOnInit() {
  }

  onSubmit(form: FormGroup) {
    this.patientDataService.getAll('Patient').toPromise().then((patients) => {
      const patient = patients.filter((patient) => patient.patientId === form.value.username)[0];
      if (patient) {
        this.router.navigate([`Patient/${form.value.username}`]);
      } else {
        this.nouserfound = true;
      }
    });
    this.hospitalDataService.getAll('Hospital').toPromise().then((hospitals) => {
      const hospital = hospitals.filter((hospital) => hospital.hospitalId === form.value.username)[0];
      if (hospital) {
        this.router.navigate([`Hospital/${form.value.username}`]);
      } else {
        this.nouserfound = true;
      }
    });
  }
}
