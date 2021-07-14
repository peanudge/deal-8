import { signupAsync } from "@/api/auth";
import { navigateTo } from "@/router";

const tag = "[Signup Controller]";
export default class Controller {
  constructor({ signupFormView }) {
    this.signupFormView = signupFormView;
    this.subscribeViewEvents();
    this.render();
  }

  subscribeViewEvents() {
    this.signupFormView.on("@signup", (e) => this.signup(e.detail.value));
  }

  signup({ id, location }) {
    signupAsync(
      {
        id,
        location,
      },
      () => {
        navigateTo("/");
      }
    );
  }

  render() {}
}
