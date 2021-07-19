CREATE TABLE product (
    id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    category INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT,
    cost INT,
    status VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    thumbnail VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    countOfView INT DEFAULT(0),

    FOREIGN KEY (author) REFERENCES account (username),
    FOREIGN KEY (category) REFERENCES category (id)
);

CREATE TABLE product_image (
    id int(10) NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (id) REFERENCES product (id)
);
