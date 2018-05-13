/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';



import { PatientComponent } from './Patient/Patient.component';
import { HospitalComponent } from './Hospital/Hospital.component';
import { RegisterHospitalComponent } from './register-hospital/register-hospital.component';
import { LoginComponent } from './login/login.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PatientListComponent } from './patient-list/patient-list.component';


const routes: Routes = [
  //{ path: 'transaction', component: TransactionComponent },
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterHospitalComponent },
  { path: 'add', component: RegisterPatientComponent },
  { path: '', component: HomeComponent },
  { path: 'Patient/:patientId', component: PatientComponent },

  { path: 'Hospital', component: HospitalComponent },
  { path: 'Hospital/:hospitalId', component: PatientComponent },


  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
