import {Component, Input, OnInit} from '@angular/core';
import {AppointmentService} from './appointment.service';
import {Appointment} from './appointment.model';
import {Patient} from '../patient-list/patient.model';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../patient-list/patient.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css'],
  providers: [AppointmentService]

})
export class AppointmentListComponent implements OnInit {
  appointmentList: Appointment[];
  @Input() patient?: Patient;

  constructor(private route: ActivatedRoute,
              private patientService: PatientService,
              private location: Location,
              private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.getPatient();
    this.getAppointments();
  }

  getPatient(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patientService.getPatient(id)
      .subscribe(patient => this.patient = patient);
  }

  getAppointments(): void {
    this.appointmentService.getAppointmentByUser(this.patient.id)
      .subscribe(appointmentList => this.appointmentList = appointmentList);
  }

  add(date: string, department: string, room: string, reason: string, recipe: string): void {
    date = date.trim();
    department = department.trim();
    room = room.trim();
    reason = reason.trim();
    recipe = recipe.trim();
    this.appointmentService.addAppointment({ date, department, room, reason, recipe } as Appointment, this.patient.id)
      .subscribe(appointment => { this.appointmentList.push(appointment); },
        error1 => {},
        () => {},
      );
  }

  delete(appointment: Appointment): void {
    this.appointmentList = this.appointmentList.filter(c => c !== appointment);
    this.appointmentService.deleteAppointment(appointment).subscribe();
  }
}

