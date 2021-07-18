export const getProfileAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        username: "Woowahan",
        locations: ["역삼동"],
      });
    }, 500);
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
