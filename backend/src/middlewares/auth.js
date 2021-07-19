import { UNAUTHORIZED_STATUS } from "../util/HttpStatus.js";

const authMiddleware = (req, res, next) => {
  const username = req?.session?.username;

  if (username === undefined) {
    return res.status(UNAUTHORIZED_STATUS).json({ isAuth: false });
  }
  next();
};

export default authMiddleware;
