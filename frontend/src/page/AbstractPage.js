class AbstractPage {
  constructor(params) {
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
