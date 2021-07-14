const tag = "[AbstractPage]";
class AbstractPage {
  constructor(params) {
    console.log(tag, "constructor");
    this.params = params;
  }

  setTitle(title) {
    document.title = title;
  }

  async render() {
    return "";
  }

  async after_render() {}
}

export default AbstractPage;
