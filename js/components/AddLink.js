export default class AddLink {
  constructor() {
    this.addLink = document.querySelector(".button-shorten");
    this.addLinkInput = document.querySelector(".add-link");
  }

  incorrectURL() {
    this.addLinkInput.classList.add("incorrect");
  }

  onClick(callback) {
    this.addLink.onclick = (e) => {
      e.preventDefault();
      this.addLinkInput.classList.remove("incorrect");
      const value = this.addLinkInput.value;
      this.addLinkInput.value = "";
      callback(value);
    };
  }
}
