import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import 'rxjs/add/operator/toPromise';
import { HospitalService } from '../Hospital/Hospital.service';

@Component({
  selector: 'app-register-hospital',
  templateUrl: './register-hospital.component.html',
  styleUrls: ['./register-hospital.component.css']
})
export class RegisterHospitalComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;



  hospitalId = new FormControl("", Validators.required);



  name = new FormControl("", Validators.required);



  address = new FormControl("", Validators.required);







  constructor(private serviceHospital: HospitalService, fb: FormBuilder) {
    this.myForm = fb.group({


      hospitalId: this.hospitalId,



      name: this.name,



      address: this.address





    });
  };

  ngOnInit(): void {
  }


  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.hospitality.Hospital",
      "hospitalId": this.hospitalId.value,
      "name": this.name.value,
      "address": this.address.value,
      "patients": []
    };

    return this.serviceHospital.addParticipant(this.participant)
      .toPromise()
      .then((response) => {
        location.href = '';
        this.errorMessage = null;
        console.log(response);
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: "org.hospitality.Hospital",







      "name": this.name.value,





      "address": this.address.value,





      "patients": []



    };

    return this.serviceHospital.updateParticipant(form.get("hospitalId").value, this.participant)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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


  deleteParticipant(): Promise<any> {

    return this.serviceHospital.deleteParticipant(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
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

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceHospital.getparticipant(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {


          "hospitalId": null,



          "name": null,



          "address": null,



          "patients": null


        };




        if (result.hospitalId) {

          formObject.hospitalId = result.hospitalId;

        } else {
          formObject.hospitalId = null;
        }

        if (result.name) {

          formObject.name = result.name;

        } else {
          formObject.name = null;
        }

        if (result.address) {

          formObject.address = result.address;

        } else {
          formObject.address = null;
        }


        this.myForm.setValue(formObject);

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

  resetForm(): void {
    this.myForm.setValue({


      "hospitalId": null,



      "name": null,



      "address": null,
    });
  }

}
