import express from "express";
import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";

const r = express.Router();

r.post("/", (req, res) => {
  const { uuid, name } = req.body;
  const token = uuidv4();

  db.run(
    `INSERT OR IGNORE INTO players (uuid,name,token)
     VALUES (?,?,?)`,
    [uuid, name, token]
  );

  res.json({ token });
});

export default r;
