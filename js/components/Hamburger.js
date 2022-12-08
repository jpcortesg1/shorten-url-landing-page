export default class Hamburger {
  constructor() {
    this.btn = document.querySelector(".hamburger");
    this.nav = document.querySelector(".navbar-mobile");
  }

  onClick(callback) {
    this.btn.onclick = () => {
      callback(this.btn, this.nav);
    };
  }
}
