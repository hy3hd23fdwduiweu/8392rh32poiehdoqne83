import express from "express";
import { db } from "../db.js";

const r = express.Router();

r.post("/create", (req, res) => {
  const expires = Date.now() + Math.min(req.body.minutes, 480) * 60000;

  db.run(
    `INSERT INTO shares VALUES (?,?,?)`,
    [req.player.uuid, req.body.target, expires]
  );

  res.sendStatus(200);
});

export default r;
