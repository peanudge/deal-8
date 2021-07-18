export const getProfileAsync = () =>
  new Promise((resolve, reject) => {
    const request = fetch("/api/account/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());

    resolve(request);
  });

export const addLocationAsync = (location) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        locations: [location],
      });
    }, 500);
  });
};

export const deleteLocationAsync = (location) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        success: true,
        locations: [],
      });
    }, 500);
  });
};
