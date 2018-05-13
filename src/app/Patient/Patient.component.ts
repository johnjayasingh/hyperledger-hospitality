/*
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { PatientService } from './Patient.service';
import 'rxjs/add/operator/toPromise';
import { ActivatedRoute, Params } from '@angular/router';
import { HospitalService } from '../Hospital/Hospital.service';
@Component({
  selector: 'app-Patient',
  templateUrl: './Patient.component.html',
  styleUrls: ['./Patient.component.css'],
})
export class PatientComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;
  private hospital;
  private hospitalId;


  patientId = new FormControl('', Validators.required);



  fullName = new FormControl('', Validators.required);



  age = new FormControl('', Validators.required);



  bloodGroup = new FormControl('', Validators.required);







  constructor(private serviceHospital: HospitalService, private servicePatient: PatientService,
    fb: FormBuilder, private ar: ActivatedRoute) {
    this.ar.params.subscribe((params: Params) => {
      this.hospitalId = params['hospitalId'];
    });
    this.myForm = fb.group({
      patientId: this.patientId,
      fullName: this.fullName,
      age: this.age,
      bloodGroup: this.bloodGroup,
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    const tempList = [];
    if (this.hospitalId) {
      this.serviceHospital.getparticipant(this.hospitalId)
        .toPromise()
        .then((result) => {
          this.hospital = result;
          this.errorMessage = null;
          result.patients.forEach(async (patientId: any) => {
            const namespace = patientId.split('#');
            await this.servicePatient.getparticipant(namespace[1]).toPromise().then((participantData) => {
              tempList.push(participantData);
            });
          });
          this.allParticipants = tempList;
        })
        .catch((error) => {
          if (error == 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
          }
          else if (error == '404 - Not Found') {
            this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
          }
          else {
            this.errorMessage = error;
          }
        });
    } else {
      this.servicePatient.getAll()
        .toPromise()
        .then((result) => {
          this.hospital = result;
          this.errorMessage = null;
          result.forEach(participant => {

            tempList.push(participant);
          });
          this.allParticipants = tempList;
        })
        .catch((error) => {
          if (error == 'Server error') {
            this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
          }
          else if (error == '404 - Not Found') {
            this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
          }
          else {
            this.errorMessage = error;
          }
        });
    }

  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.hospitality.Patient',
      'patientId': this.patientId.value,
      'fullName': this.fullName.value,
      'age': this.age.value,
      'bloodGroup': this.bloodGroup.value,
    };

    this.myForm.setValue({
      'patientId': null,
      'fullName': null,
      'age': null,
      'bloodGroup': null,
    });

    return this.servicePatient.addParticipant(this.participant)
      .toPromise()
      .then((patient) => {
        this.hospital.patients.push(`${patient['$class']}#${patient['patientId']}`)
        this.updateHospital()
          .then((response) => {
            this.errorMessage = null;
            this.myForm.setValue({
              'patientId': null,
              'fullName': null,
              'age': null,
              'bloodGroup': null,
            });
          });
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  updateParticipant(form: any): Promise<any> {
    this.participant = {
      $class: 'org.hospitality.Patient',
      'fullName': this.fullName.value,
      'age': this.age.value,
      'bloodGroup': this.bloodGroup.value,
    };

    return this.servicePatient.updateParticipant(form.get('patientId').value, this.participant)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
        }
        else {
          this.errorMessage = error;
        }
      });
  }


  deleteParticipant(): Promise<any> {

    return this.servicePatient.deleteParticipant(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
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

    return this.servicePatient.getparticipant(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {
          'patientId': result.patientId,
          'fullName': result.fullName,
          'age': result.age,
          'bloodGroup': result.bloodGroup,
        };
        this.myForm.setValue(formObject);
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
        }
        else {
          this.errorMessage = error;
        }
      });

  }

  resetForm(): void {
    this.myForm.setValue({


      'patientId': null,



      'fullName': null,



      'age': null,



      'bloodGroup': null,





    });
  }


  updateHospital(): Promise<any> {
    this.participant = {
      $class: 'org.hospitality.Hospital',
      'name': this.hospital.name,
      'address': this.hospital.address,
      'patients': this.hospital.patients
    };

    return this.serviceHospital.updateParticipant(this.hospitalId, this.participant)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = '404 - Could not find API route. Please check your available APIs.'
        }
        else {
          this.errorMessage = error;
        }
      });
  }

}
