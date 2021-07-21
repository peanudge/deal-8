import mysqlConnection from "../../../config/mysql.js";
import ChatRoomListItem from "../ChatRoomListItem.js";
import ChatRoom from "../ChatRoom.js";
import Chat from "../Chat.js";

export default class MySQLChatStore {
  async getChatRoomsByProductId(productId, author) {
    const query = `
    SELECT 
    cr.roomId AS roomId, cra.username AS username, p.thumbnail AS thumbnail, mcr.content AS content, mcr.createdAt AS createdAt
    FROM chatroom AS cr
    INNER JOIN (
      SELECT cra.roomId AS roomId, c.content AS content, c.createdAt AS createdAt
      FROM chatroom_attend AS cra 
      LEFT JOIN chat AS c ON c.roomId = cra.roomId
      WHERE username = ? AND (c.roomId, c.id) IN (SELECT roomId, max(id) FROM chat GROUP BY roomId)
    ) AS mcr ON mcr.roomId = cr.roomId
    LEFT JOIN chatroom_attend AS cra ON cr.roomId = cra.roomId
    LEFT JOIN product AS p ON p.id = cr.productId
    WHERE cra.username != ? AND p.id = ?
    `;

    const params = [author, author, productId];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];
      return rows.map(
        (row) =>
          new ChatRoomListItem(
            row.roomId,
            row.username,
            row.thumbnail,
            row.content,
            row.createdAt
          )
      );
    } catch (err) {
      throw err;
    }
  }

  async getChatRoomAttend(username, productId) {
    const query = `
    SELECT cra.roomId AS roomId FROM chatroom_attend AS cra 
    LEFT JOIN chatroom AS cr ON cra.roomId = cr.roomId 
    WHERE cra.username=? and cr.productId=?;
    `;
    const params = [username, productId];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];
      if (rows.length > 0) {
        const row = rows[0];
        return row.roomId;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async createChatRoom(currentUsername, targetUsername, productId) {
    console.log(currentUsername, targetUsername, productId);
    const createChatroomQuery = `
        INSERT INTO chatroom(productId) VALUES(?)
      `;
    const createChatroomParams = [productId];
    try {
      const chatroomCreateResult = await mysqlConnection
        .promise()
        .query(createChatroomQuery, createChatroomParams);

      const isSuccess = chatroomCreateResult[0].affectedRows > 0;
      if (isSuccess) {
        const newChatroomId = chatroomCreateResult[0].insertId;
        const createChatRoomAttendsQuery = `
          INSERT INTO chatroom_attend(roomId, username) VALUES(?, ?), (?, ?)
        `;
        const createChatRoomAttendsParams = [
          newChatroomId,
          currentUsername,
          newChatroomId,
          targetUsername,
        ];
        const attendInsertResult = await mysqlConnection
          .promise()
          .query(createChatRoomAttendsQuery, createChatRoomAttendsParams);
        if (attendInsertResult[0].affectedRows >= 2) {
          return newChatroomId;
        } else {
          throw new Error("Chat Attend 생성에 실패 했습니다.");
        }
      } else {
        throw new Error("Chat Room 생성에 실패 했습니다.");
      }
    } catch (err) {
      throw err;
    }
  }

  async getChatRoom(roomId) {
    const query = `
      SELECT roomId, productId FROM chatroom WHERE roomId = ?
    `;
    const params = [roomId];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];
      if (rows.length > 0) {
        const { roomId, productId } = rows[0];
        return new ChatRoom(roomId, productId);
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async getChats(roomId, count = 20) {
    const query = `
      SELECT id, roomId, content, writer, createdAt FROM chat WHERE roomId= ? ORDER BY createdAt DESC LIMIT ?;
    `;
    const params = [roomId, count];

    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];
      return rows.map(
        (row) =>
          new Chat(row.id, row.roomId, row.content, row.writer, row.createdAt)
      );
    } catch (err) {
      throw err;
    }
  }

  async addChat(roomdId, content, writer) {
    const query = `
      INSERT INTO chat(roomId, content, writer, createdAt) VALUES(?, ?, ?, CURRENT_TIMESTAMP);
    `;
    const params = [roomdId, content, writer];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      if (result[0].affectedRows > 0) {
        return result[0].insertId;
      } else {
        return null;
      }
    } catch (err) {
      throw err;
    }
  }

  async getChatRooms(username) {
    const query = `
    SELECT 
    cr.roomId AS roomId, cra.username AS username, p.thumbnail AS thumbnail, mcr.content AS content, mcr.createdAt AS createdAt
    FROM chatroom AS cr
    INNER JOIN (
      SELECT cra.roomId AS roomId, c.content AS content, c.createdAt AS createdAt
      FROM chatroom_attend AS cra 
      LEFT JOIN chat AS c ON c.roomId = cra.roomId
      WHERE username = ? AND (c.roomId, c.id) IN (SELECT roomId, max(id) FROM chat GROUP BY roomId)
    ) AS mcr ON mcr.roomId = cr.roomId
    LEFT JOIN chatroom_attend AS cra ON cr.roomId = cra.roomId
    LEFT JOIN product AS p ON p.id = cr.productId
    WHERE cra.username != ? 
    `;

    const params = [username, username];
    try {
      const result = await mysqlConnection.promise().query(query, params);
      const rows = result[0];
      return rows.map(
        (row) =>
          new ChatRoomListItem(
            row.roomId,
            row.username,
            row.thumbnail,
            row.content,
            row.createdAt
          )
      );
    } catch (err) {
      throw err;
    }
  }
}
