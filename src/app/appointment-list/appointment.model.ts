export class Appointment {
  id: number;
  date: string;
  department: string;
  room: string;
  reason: string;
  recipe: string;

  constructor(date: string, department: string, room: string, reason: string, recipe: string) {
    this.date = date;
    this.department = department;
    this.room = room;
    this.reason = reason;
    this.recipe = recipe;
  }

}
