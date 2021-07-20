import { signupAsync } from "@/api/auth";
import { navigateTo } from "@/router";

const ERROR_LOCATION_EMPTY = "우리 동네를 필수로 입력해야합니다.";
const ERROR_USERNAME_EMPTY = "아이디를 필수로 입력해야합니다.";

export default class Controller {
  constructor({ signupFormView }) {
    this.signupFormView = signupFormView;
    this.subscribeViewEvents();
    this.error = {};
    this.render();
  }

  subscribeViewEvents() {
    this.signupFormView.on("@signup", (e) => this.signup(e.detail.value));
  }

  signup({ id, location }) {
    if (!id || id === "") {
      this.error = { username: ERROR_USERNAME_EMPTY };
      this.render();
    } else if (!location || location === "") {
      this.error = { location: ERROR_LOCATION_EMPTY };
      this.render();
    } else {
      signupAsync({
        id,
        location,
      }).then(({ success, error }) => {
        if (success) {
          navigateTo("/profile");
        } else {
          this.error = {
            username: error,
          };
          this.render();
        }
      });
    }
  }

  render() {
    this.signupFormView.show(this.error);
  }
}
