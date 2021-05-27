import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Appointment } from './appointment.model';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {Patient} from '../patient-list/patient.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  private appointmentsUrl = 'http://localhost:8081/restApi/appointments';

  constructor(private http: HttpClient) { }

  /** GET appointments from the server */
  getAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.appointmentsUrl);
  }

  /** POST: add a new appointment to the server */
  addAppointment(appointment: Appointment, patientId: number): Observable<Appointment> {
    const url = `${this.appointmentsUrl}/${patientId}`;
    return this.http.post<Appointment>(url, appointment, httpOptions).pipe(
      tap((appointmentAdded: Appointment) => this.log(`added appointment id=${appointmentAdded.id}`)),
      catchError(this.handleError<Appointment>('addAppointment'))
    );
  }

  /** GET appointment by id. Will 404 if id not found */
  getAppointmentByUser(id: number): Observable<Appointment[]> {
    const url = `${this.appointmentsUrl}/${id}`;
    return this.http.get<Appointment[]>(url).pipe(
      tap(_ => this.log(`fetched appointment id=${id}`)),
      catchError(this.handleError<Appointment[]>(`getAppointment id=${id}`))
    );
  }

  /** DELETE: delete the appointment from the server */
  deleteAppointment(appointment: Appointment | number): Observable<Appointment> {
    const id = typeof appointment === 'number' ? appointment : appointment.id;
    const url = `${this.appointmentsUrl}/${id}`;
    return this.http.delete<Appointment>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted appointment id=${id}`)),
      catchError(this.handleError<Appointment>('deleteAppointment'))
    );
  }

  /** PUT: update the appointment on the server */
  updateAppointment(appointment: Appointment): Observable<any> {
    const id = typeof appointment === 'number' ? appointment : appointment.id;
    const url = `${this.appointmentsUrl}/${id}`;
    return this.http.put(url, appointment, httpOptions).pipe(
      tap(_ => this.log(`updated appointment id=${appointment.id}`)),
      catchError(this.handleError<any>('updateAppointment'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a AppointmentService message with the MessageService */
  private log(message: string) {
    console.log('AppointmentService: ' + message);
  }
}
