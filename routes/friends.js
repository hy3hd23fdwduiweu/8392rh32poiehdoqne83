import express from "express";
import { db } from "../db.js";

const r = express.Router();

r.post("/request", (req, res) => {
  db.run(
    `INSERT OR IGNORE INTO friends VALUES (?,?,0)`,
    [req.player.uuid, req.body.target]
  );
  res.sendStatus(200);
});

r.post("/accept", (req, res) => {
  db.run(
    `UPDATE friends SET accepted=1
     WHERE sender=? AND receiver=?`,
    [req.body.sender, req.player.uuid]
  );
  res.sendStatus(200);
});

r.post("/remove", (req, res) => {
  db.run(
    `DELETE FROM friends
     WHERE (sender=? AND receiver=?)
     OR (sender=? AND receiver=?)`,
    [req.player.uuid, req.body.target, req.body.target, req.player.uuid]
  );
  res.sendStatus(200);
});

export default r;
