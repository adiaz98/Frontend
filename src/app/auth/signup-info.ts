export class SignupInfo {

  username: string;
  role: string[];
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  telephone: string;

  constructor(username: string, role: string[], password: string, firstname: string, lastname: string, email: string, telephone: string) {
    this.username = username;
    this.role = role;
    this.password = password;
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.telephone = telephone;
  }
}
