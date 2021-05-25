export class SignupInfo {

  username: string;
  role: string[];
  password: string;

  constructor(username: string, role: string[], password: string) {
    this.username = username;
    this.role = role;
    this.password = password;
  }
}
