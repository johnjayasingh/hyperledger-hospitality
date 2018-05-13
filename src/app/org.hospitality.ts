import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.hospitality{
   export enum BloodGroup {
      A_POSITIVE,
      A_NEGATIVE,
      B_POSITIVE,
      B_NEGATIVE,
      AB_POSITIVE,
      AB_NEGATIVE,
      O_POSITIVE,
      O_NEGATIVE,
   }
   export class Medication {
      prescriptionDrugs: string;
      strengh: string;
      directions: string;
      prescribedBy: string;
   }
   export class Patient extends Participant {
      patientId: string;
      fullName: string;
      age: number;
      bloodGroup: BloodGroup;
      Medications: Medication[];
   }
   export class Hospital extends Participant {
      hospitalId: string;
      name: string;
      address: string;
      patients: Patient[];
   }
// }
