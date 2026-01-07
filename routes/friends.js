import express from "express";
import { db } from "../db.js";

const r = express.Router();

r.post("/request", (req, res) => {
  db.get(
    `SELECT COUNT(*) as c FROM friends
     WHERE server=? AND (sender=? OR receiver=?) AND accepted=1`,
    [req.server, req.player.uuid, req.player.uuid],
    (_, row) => {
      if (row.c >= 6) return res.status(403).json({ error: "Friend limit" });

      db.run(
        `INSERT OR IGNORE INTO friends VALUES (?,?,?,0)`,
        [req.server, req.player.uuid, req.body.target]
      );
      res.sendStatus(200);
    }
  );
});

r.post("/accept", (req, res) => {
  db.run(
    `UPDATE friends SET accepted=1
     WHERE server=? AND sender=? AND receiver=?`,
    [req.server, req.body.sender, req.player.uuid]
  );
  res.sendStatus(200);
});

r.post("/remove", (req, res) => {
  db.run(
    `DELETE FROM friends
     WHERE server=? AND
     ((sender=? AND receiver=?) OR (sender=? AND receiver=?))`,
    [req.server, req.player.uuid, req.body.target, req.body.target, req.player.uuid]
  );
  res.sendStatus(200);
});

export default r;
