import express from "express";
import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";

const r = express.Router();

r.post("/", (req, res) => {
  const { uuid, name, server } = req.body;
  if (!uuid || !server) return res.sendStatus(400);

  const token = uuidv4();

  db.run(
    `INSERT OR IGNORE INTO players (uuid,server,name,token)
     VALUES (?,?,?,?)`,
    [uuid, server, name, token]
  );

  res.json({ token });
});

export default r;
