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

export const getChatRoomsByProductAsync = (productId) => {
  // TODO: productId 별로 채팅리스트를 가져와야함 (판매자만 가능)
  return new Promise((resolve, reject) => {
    const request = fetch(`/api/chatroom?productId=${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => response.json());
    resolve(request);
  });
};
