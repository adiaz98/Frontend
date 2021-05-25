import { Component, OnInit } from '@angular/core';
import { Patient } from './patient.model';
import { PatientService } from './patient.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [PatientService]
})
export class PatientListComponent implements OnInit {
  patientList: Patient[];

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(patientList => this.patientList = patientList);
  }

  add(firstname: string, lastname: string, email: string, telephone: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    this.patientService.addPatient({ firstname, lastname, email, telephone } as Patient)
      .subscribe(patient => { this.patientList.push(patient); },
        error1 => {},
        () => {},
      );
  }

  delete(patient: Patient): void {
    this.patientList = this.patientList.filter(c => c !== patient);
    this.patientService.deletePatient(patient).subscribe();
  }
}

