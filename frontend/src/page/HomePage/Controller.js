const tag = "[HomePage Controller]";
export default class Controller {
  constructor({ mainHeaderView }) {
    console.log(tag);
    this.mainHeaderView = mainHeaderView;
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    // TODO: binding event
  }

  render() {
    this.mainHeaderView.show();
  }
}
