export class Patient {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;
  gender: string;

  constructor(firstname: string, lastname: string, email: string, telephone: string, gender: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.telephone = telephone;
    this.gender = gender;
  }

}
