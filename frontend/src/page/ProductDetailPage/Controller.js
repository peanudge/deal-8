import { signupAsync } from '@/api/auth';
import { navigateTo } from '@/router';

const tag = '[Product Controller]';
export default class Controller {
  constructor({}) {
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {}

  render() {}
}
