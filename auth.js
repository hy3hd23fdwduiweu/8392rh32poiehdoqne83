import { db } from "./db.js";

export function auth(req, res, next) {
  const token = req.headers["x-token"];
  const server = req.headers["x-server"];

  if (!token || !server) return res.sendStatus(401);

  db.get(
    "SELECT * FROM players WHERE token=? AND server=?",
    [token, server],
    (_, row) => {
      if (!row) return res.sendStatus(403);
      req.player = row;
      req.server = server;
      next();
    }
  );
}
