export const getChatRoomsAsync = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          key: "550e8400-e29b-41d4-a716-446655440000",
          targetUser: "UserA",
          productId: 0,
          unReadCount: 1,
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
          productId: 0,
          unReadCount: 0,
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

export const getChatRoomAsync = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        key: "550e8400-e29b-41d4-a716-446655440000",
        targetUser: "testuser2",
        productTitle: "빈티지 롤러 스케이트",
        productId: 0,
        productCost: 10000,
        productThumbnail:
          "http://img.danawa.com/prod_img/500000/281/013/img/4013281_1.jpg?shrink=500:500&_v=20210129094708",
        totalMessageCount: 4, // TODO: 현제 message개수가 total보다 적을시 위로 스크롤 하면 채팅 fetch
        messages: [
          // 최대 20개 정도 불러오면 좋을 것 같다!
          {
            id: 1,
            writter: "testuser1",
            message: "안녕하세요",
            createdAt: new Date("July 19, 2021 22:41:00"),
          },
          {
            id: 2,
            writter: "testuser1",
            message: "직접 신어볼 수 있는 건가요?",
            createdAt: new Date("July 19, 2021 22:42:00"),
          },
          {
            id: 3,
            writter: "testuser2",
            message: "아니요",
            createdAt: new Date("July 19, 2021 22:43:00"),
          },
          {
            id: 4,
            writter: "testuser1",
            message: "네",
            createdAt: new Date("July 19, 2021 22:44:00"),
          },
        ],
      });
    }, 500);
  });
};

export const exitChatRoomAsync = (productId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 100);
  });
};
