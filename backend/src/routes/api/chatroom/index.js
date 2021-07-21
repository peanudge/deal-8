import express from "express";
import authMiddleware from "../../../middlewares/auth.js";

import MySQLAccountStore from "../../../model/Account/Store/MySQLAccountStore.js";
import MySQLProductStore from "../../../model/Product/Store/MySQLProductStore.js";
import InMemmoryChatStore from "../../../model/Chat/Store/InMemmoryChatStore.js";

import { INTERNAL_SERVER_ERROR_STATUS } from "../../../util/HttpStatus.js";

const accountStore = new MySQLAccountStore();
const productStore = new MySQLProductStore();
const chatStore = new InMemmoryChatStore();

const router = express.Router();

// 모든 API 가 authMiddleware를 사용
router.use("", authMiddleware);

// Menu에서 자신의 채팅 목록
// GET /api/chatroom/mine
router.get("/mine", async (req, res) => {
  // 자신이 가진 room 들의 정보를 불러와야함
  const username = req.session.username;
});

// 글쓴이 기능
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

// POST /api/chatroom/attend?productId=0
router.post("/attend", async (req, res) => {
  // TODO: productId를 받아서 해당 room의 roomId 를 반환하거나 만들어서 반환
  const { productId } = req.query;
  const username = req.session.username;
  try {
    const attendInfo = await chatStore.getAttendInfo({ username, productId });
    console.log("attendInfo");
    console.log(attendInfo);
    if (attendInfo === null) {
      const roomId = await chatStore.createRoom({ username, productId });
      console.log(roomId);
      if (roomId === null) {
        return res
          .status(404)
          .json({ success: false, error: "해당 상품이 없습니다." });
      }
      return res.json({ success: true, roomId });
    }

    return res.json({ success: true, roomId: attendInfo?.roomId });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
});

// DELETE /api/chatroom/exit?roomId=[uuid]
router.delete("/exit", (req, res) => {
  // TODO: 해당 유저를 roomId가 속한 방에서 제거
  const { roomId } = req.query;
  const username = req.session.username;
});

export default router;
