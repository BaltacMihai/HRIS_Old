export class CustomDateFormat {
  constructor(dateToConvert) {
    this.date = new Date(dateToConvert);
  }

  database() {
    return (
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1) +
      "-" +
      this.date.getDate() +
      " "
    );
  }
  form() {
    return (
      this.date.getFullYear() +
      "-" +
      (this.date.getMonth() + 1 < 10
        ? "0" + (this.date.getMonth() + 1)
        : this.date.getMonth() + 1) +
      "-" +
      (this.date.getDate() < 10
        ? "0" + this.date.getDate()
        : this.date.getDate())
    );
  }
  user() {
    let day =
      this.date.getDate() < 10
        ? "0" + this.date.getDate()
        : this.date.getDate();
    let month =
      this.date.getMonth() + 1 < 10
        ? "0" + (this.date.getMonth() + 1)
        : this.date.getMonth() + 1;
    let year = this.date.getFullYear();

    return day + "." + month + "." + year;
  }
  getHour() {
    let hour =
      this.date.getHours() < 10
        ? "0" + this.date.getHours()
        : this.date.getHours();
    let minute =
      this.date.getMinutes() < 10
        ? "0" + this.date.getMinutes()
        : this.date.getMinutes();
    return hour + ":" + minute;
  }
}
