export const getChatRoomAsync = (roomId) => {
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/chatroom/${roomId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};

export const attendChatRoomAsync = (productId) => {
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/chatroom/attend?productId=${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};

export const getChatsAsync = (roomId, limitCount = 20) => {
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/chatroom/${roomId}/chat?limit=${limitCount}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};

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

export const getChatRoomsByProductAsync = (productId) => {
  // TODO: productId 별로 채팅리스트를 가져와야함 (판매자만 가능)
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/chatroom?productId=${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => resolve(response.json()));
  });
};
