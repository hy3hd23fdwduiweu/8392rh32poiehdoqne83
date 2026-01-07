import { db } from "./db.js";

export function auth(req, res, next) {
  const token = req.headers["x-token"];
  if (!token) return res.sendStatus(401);

  db.get(
    "SELECT * FROM players WHERE token=?",
    [token],
    (_, row) => {
      if (!row) return res.sendStatus(403);
      req.player = row;
      next();
    }
  );
}
