export default class Copy {
  constructor(link) {
    this.buttons = document.querySelectorAll(".button-link");
    this.link = link;
  }

  create() {
    const button = document.createElement("button");
    button.classList.add("button", "button-link");
    button.innerText = "Copy";

    button.onclick = () => {
      navigator.clipboard.writeText(this.link);
      button.innerText = "Copied!";
      button.classList.add("button-copied");
      setTimeout(() => {
        button.innerText = "Copy";
        button.classList.remove("button-copied");
      }, 2000);
    };

    return button;
  }
}
