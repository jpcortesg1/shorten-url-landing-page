export default class Model {
  constructor() {
    this.view = null;
    this.domain = "5yt9.short.gy";
    this.publicKey = "pk_wpFIs9W7LAeXaFHR";
    this.links = JSON.parse(localStorage.getItem("links")) || [];
  }

  setView(view) {
    this.view = view;
  }

  save(link, shortURL) {
    this.links.push({ link, shortURL });
    localStorage.setItem("links", JSON.stringify(this.links));
  }

  validateURL(value) {
    const regex = new RegExp(
      "^(https?:\\/\\/)" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!regex.test(value);
  }

  async sendRequest(body) {
    const response = await fetch("https://api.short.io/links/public", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        authorization: this.publicKey,
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  }

  async createLink(value) {
    const isValid = this.validateURL(value);
    if (!isValid) return false;
    const body = {
      originalURL: value,
      domain: "5yt9.short.gy",
    };
    const { shortURL } = await this.sendRequest(body);
    this.save(value, shortURL);
    return shortURL;
  }
}
