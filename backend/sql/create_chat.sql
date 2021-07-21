CREATE TABLE chat (
    id INT AUTO_INCREMENT PRIMARY KEY,
    roomId INT,
    content VARCHAR(255),
    writer VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(roomId) REFERENCES chatroom(roomId),
    FOREIGN KEY(writer) REFERENCES account(username)
)