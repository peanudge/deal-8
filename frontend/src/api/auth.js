// TODO: 콜백 함수들을 제거해야한다.

export const loginAsync = ({ id }, cb) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Login Request with ${id}`);
      cb();
    }, 500);
  });

export const signupAsync = ({ id, location }, cb) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Signup Request with id: ${id}, location:${location}`);
      cb();
    }, 500);
  });

export const logoutAsync = (cb) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Logout`);
      cb();
    }, 500);
  });
