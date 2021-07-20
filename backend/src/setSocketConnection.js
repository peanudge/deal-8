const setSocketConnection = (io) => {
  io.on("connection", async (socket) => {
    console.log("client connected");
    socket.on("request joinRoom", (roomKey) => {
      // 사용자가 room에 참여하는 과정
      socket.currentRoom = roomKey;
      socket.join(roomKey);
    });

    socket.on("message", (message) => {
      // client의 메시지를 client가 속한 방으로 emit
      const roomKey = socket.currentRoom;
      // TODO: log comment to database
      const data = {
        message,
        writter: socket.id,
        createdAt: new Date(),
      };
      io.to(roomKey).emit("message", data);
    });
  });
};

export default setSocketConnection;
