import ChatStore from "./model/Chat/Store/MySQLChatStore.js";

const chatStore = new ChatStore();

const setSocketConnection = (io) => {
  io.on("connection", async (socket) => {
    socket.on("join", (roomKey) => {
      // 사용자가 room에 참여하는 과정
      socket.currentRoom = roomKey;
      socket.join(roomKey);
    });

    socket.on("client-message", (message) => {
      // client의 메시지를 client가 속한 방으로 emit
      const roomId = socket.currentRoom;
      const username = socket.handshake.session.username;

      chatStore.addChat(Number(roomId), message, username);

      const data = {
        room: roomId,
        content: message,
        writer: username,
        createdAt: new Date(),
      };
      io.to(roomId).emit("server-message", data);
    });
  });
};

export default setSocketConnection;
