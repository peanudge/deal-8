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

export const signupAsync = ({ id, location }) =>
  new Promise((resolve, reject) => {
    const request = fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: id,
        location: location,
      }),
    }).then((response) => response.json());

    resolve(request);
  });

export const logoutAsync = () =>
  new Promise((resolve, reject) => {
    const request = fetch("/api/auth/signout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    resolve(request);
  });
