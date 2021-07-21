CREATE TABLE chatroom_attend (
    roomId INT,
    username VARCHAR(255),
    isAttend BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY(roomId) REFERENCES chatroom(roomId)
)