export const getProfileAsync = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        username: 'Woowahan',
        locations: ['역삼동', '범박동'],
      });
    }, 500);
  });
