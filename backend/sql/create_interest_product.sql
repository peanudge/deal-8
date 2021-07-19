CREATE TABLE interest_product (
    username VARCHAR(255),
    id INT(10),

    PRIMARY KEY (username, id),
    FOREIGN KEY (username) REFERENCES account(username) ON DELETE CASCADE,
    FOREIGN KEY (id) REFERENCES product(id) ON DELETE CASCADE
)
