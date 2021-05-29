import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Patient } from './patient.model';
import { PatientService } from './patient.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
  providers: [PatientService]
})
export class PatientListComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['id', 'firstname', 'lastname', 'email', 'telephone', 'gender', 'appointments', 'edit', 'delete'];
  // patientList: Patient[];
  public dataSource = new MatTableDataSource<Patient>();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatients();
  }

  getPatients(): void {
    this.patientService.getPatients()
      .subscribe(patientList => this.dataSource.data = patientList as Patient[]);
  }

  add(firstname: string, lastname: string, email: string, telephone: string): void {
    firstname = firstname.trim();
    lastname = lastname.trim();
    email = email.trim();
    telephone = telephone.trim();
    this.patientService.addPatient({ firstname, lastname, email, telephone } as Patient)
      .subscribe(patient => { this.dataSource.data.push(patient); },
        error1 => {},
        () => {},
      );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  delete(patient: Patient): void {
    this.dataSource.data = this.dataSource.data.filter(c => c !== patient);
    this.patientService.deletePatient(patient).subscribe();
  }
}

