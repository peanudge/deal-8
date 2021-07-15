export const getChatRoomsAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          key: "550e8400-e29b-41d4-a716-446655440000",
          targetUser: "UserA",
          product: 4002,
          productThumbnail: "/static/thumbnail/123233434",
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
          productThumbnail: "/static/thumbnail/123233434",
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
