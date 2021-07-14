export const loginAsync = ({ id }, cb) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Login Request with ${id}`);
      cb();
    }, 500);
    // TODO: Change Real Fetch
    // fetch("/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     id,
    //   }),
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       // TODO: navigator
    //     }
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
  });

export const signupAsync = ({ id, location }, cb) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(`Signup Request with id: ${id}, location:${location}`);
      cb();
    }, 500);
  });
