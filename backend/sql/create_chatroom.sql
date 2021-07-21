CREATE TABLE chatroom (
    roomId INT PRIMARY KEY AUTO_INCREMENT,
    productId INT,
    FOREIGN KEY(productId) REFERENCES product(id)
)