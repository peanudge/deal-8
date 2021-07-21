import express from "express";
import authMiddleware from "../../../middlewares/auth.js";

import ChatStore from "../../../model/Chat/Store/MySQLChatStore.js";
import ProductStore from "../../../model/Product/Store/MySQLProductStore.js";
import { BAD_REQUEST, SUCCESS_STATUS } from "../../../util/HttpStatus.js";

const productStore = new ProductStore();
const chatStore = new ChatStore();

const router = express.Router();

router.use("", authMiddleware);

// GET /api/chatroom?productId=0
router.get("/", async (req, res) => {
  // TODO: productId 값을 받아서 해당 product를 id로 가지고 있는 room들의 정보를 return해야 합니다.
  const { productId } = req.query;
  const username = req.session.username;

  try {
    const chattingRoomList = await chatStore.getRoomsByProductId({
      productId,
      username,
    });
    return res.json(chattingRoomList);
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// GET /api/chatroom/:roomdId
router.get("/:roomId", async (req, res) => {
  const { roomId } = req.params;
  const id = Number(roomId);
  if (!id || isNaN(id)) {
    return res
      .status(BAD_REQUEST)
      .json({ success: false, error: "잘못된 파라미터입니다." });
  }
  const chatRoom = await chatStore.getChatRoom(id);
  if (chatRoom) {
    res.status(SUCCESS_STATUS).json({
      success: true,
      chatRoom,
    });
  }
});

router.post("/attend", async (req, res) => {
  const { productId } = req.query;
  const id = Number(productId);
  if (!id || isNaN(id)) {
    return res
      .status(BAD_REQUEST)
      .json({ success: false, error: "잘못된 파라미터입니다." });
  }
  const username = req.session.username;
  try {
    const originRoomId = await chatStore.getChatRoomAttend(username, id);
    if (originRoomId) {
      return res.json({ success: true, roomId: originRoomId });
    } else {
      const product = await productStore.getProductById(id);
      const author = product.author;
      const newRoomId = await chatStore.createChatRoom(username, author, id);
      return res.json({ success: true, roomId: newRoomId });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false });
  }
});

// DELETE /api/chatroom/exit?roomId=[uuid]
router.delete("/exit", (req, res) => {
  // TODO: 해당 유저를 roomId가 속한 방에서 제거
  const { roomId } = req.query;
  const username = req.session.username;
});

// TODO: 이동 GET /api/account/me/chatroom
// Menu에서 자신의 채팅 목록
// GET /api/chatroom/mine
router.get("/mine", async (req, res) => {
  // 자신이 가진 room 들의 정보를 불러와야함
  const username = req.session.username;
});

export default router;
