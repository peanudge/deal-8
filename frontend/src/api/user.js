export const getProfileAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        username: "Woowahan",
      });
    }, 500);
  });
