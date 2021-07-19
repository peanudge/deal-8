export const getChatRoomsAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          key: "550e8400-e29b-41d4-a716-446655440000",
          targetUser: "UserA",
          product: 4002,
          productThumbnail:
            "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
          lastChat: {
            id: 1233423,
            room: "550e8400-e29b-41d4-a716-446655440000",
            message: "실제로 신어볼 수 있는 건가요?",
            writer: "UserB",
            createAt: new Date().toDateString(),
          },
        },
        {
          key: "550e8400-e29b-41d4-a716-446655440000",
          targetUser: "UserC",
          product: 4002,
          productThumbnail:
            "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
          lastChat: {
            id: 1233423,
            room: "550e8400-e29b-41d4-a716-446655440000",
            message: "에누리점",
            writer: "UserC",
            createAt: new Date().toDateString(),
          },
        },
      ]);
    }, 500);
  });
};

export const getChatRoomAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        key: "550e8400-e29b-41d4-a716-446655440000",
        targetUser: "testtest",
        product: 0,
        productThumbnail:
          "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
      });
    }, 500);
  });
};
