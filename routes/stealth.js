import express from "express";
import { db } from "../db.js";

const r = express.Router();

r.post("/set", (req, res) => {
  const until = Date.now() + Math.min(req.body.minutes, 60) * 60000;
  db.run(
    `UPDATE players SET stealth_until=? WHERE uuid=?`,
    [until, req.player.uuid]
  );
  res.sendStatus(200);
});

export default r;
