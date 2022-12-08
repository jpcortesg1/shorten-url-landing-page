import Hamburger from "./components/Hamburger.js";
import AddLink from "./components/AddLink.js";
import Copy from "./components/Copy.js";

export default class View {
  constructor() {
    this.model = null;
    this.links = document.querySelector(".links");

    // Create instances of components
    this.burger = new Hamburger();
    this.addLink = new AddLink();

    // Set up event listeners
    this.burger.onClick(this.toggleNav);
    this.addLink.onClick((value) => this.createLink(value));
  }

  setModel(model) {
    this.model = model;
  }

  render() {
    const links = [...this.model.links];
    links.forEach((link) => {
      const { link: url, shortURL } = link;
      const newLink = this.createLinkDOM(url, shortURL);
      this.links.appendChild(newLink);
    });
  }

  createLeft(url) {
    const large = document.createElement("p");
    large.classList.add("link-large");
    large.innerText = url;

    const left = document.createElement("div");
    left.classList.add("link-left");
    left.appendChild(large);

    return left;
  }

  createRight(shortURL) {
    const short = document.createElement("a");
    short.classList.add("link-sort");
    short.href = shortURL;
    short.innerText = shortURL;

    const copy = new Copy(shortURL);
    const button = copy.create();

    const right = document.createElement("div");
    right.classList.add("link-right");
    right.appendChild(short);
    right.appendChild(button);

    return right;
  }

  createLinkDOM(url, shortURL) {
    const left = this.createLeft(url);
    const right = this.createRight(shortURL);

    const link = document.createElement("div");
    link.classList.add("link");
    link.appendChild(left);
    link.appendChild(right);

    return link;
  }

  async createLink(value) {
    const shortURL = await this.model.createLink(value);
    if (!shortURL) {
      this.addLink.incorrectURL();
      return;
    }
    const link = this.createLinkDOM(value, shortURL);
    this.links.appendChild(link);
  }

  toggleNav(btn, nav) {
    btn.classList.toggle("active");
    nav.classList.toggle("active");
  }
}
