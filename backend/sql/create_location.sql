CREATE TABLE location(
    username VARCHAR(255),
    location VARCHAR(255),
    UNIQUE KEY usernamelocation (username, location),
    FOREIGN KEY (username)
    REFERENCES account(username) ON DELETE CASCADE
);