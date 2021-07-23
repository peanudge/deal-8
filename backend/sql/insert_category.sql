INSERT INTO category(id, name) VALUES(0,"디지털 기기");
INSERT INTO category(id, name) VALUES(1,"게임/취미");
INSERT INTO category(id, name) VALUES(2,"여성패션/잡화");
INSERT INTO category(id, name) VALUES(3,"뷰티/미용");
INSERT INTO category(id, name) VALUES(4,"생활 가전");
INSERT INTO category(id, name) VALUES(5,"생활/가공식품");
INSERT INTO category(id, name) VALUES(6,"남성패션/잡화");
INSERT INTO category(id, name) VALUES(7,"반려동물");
INSERT INTO category(id, name) VALUES(8,"가구 인테리어");
INSERT INTO category(id, name) VALUES(9,"스포츠/레저");
INSERT INTO category(id, name) VALUES(10,"유아동");
INSERT INTO category(id, name) VALUES(11,"도서/티켓");



SELECT cr.roomId AS roomId,cra.username AS username, p.thumbnail AS thumbnail, mcr.content FROM chatroom AS cr
INNER JOIN (
    SELECT cra.roomId AS roomId, c.content AS content 
    FROM chatroom_attend AS cra LEFT JOIN chat AS c ON c.roomId = cra.roomId 
    WHERE username = "woowahan" ORDER BY c.createdAt LIMIT 1
) AS mcr ON mcr.roomId = cr.roomId
LEFT JOIN chatroom_attend AS cra ON cr.roomId = cra.roomId
LEFT JOIN product AS p ON p.id = cr.productId
WHERE cra.username != "woowahan";