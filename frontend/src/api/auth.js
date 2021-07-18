export const loginAsync = ({ id }) =>
  new Promise((resolve, reject) => {
    const request = fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id,
      }),
    }).then((response) => response.json());

    resolve(request);
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
