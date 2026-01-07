import express from "express";
import { db } from "../db.js";
import { v4 as uuidv4 } from "uuid";

const r = express.Router();

r.post("/create", (req, res) => {
  const id = uuidv4();

  db.run(
    `INSERT INTO groups VALUES (?,?,?,?,?)`,
    [id, req.body.name, req.player.uuid, req.body.password || null, req.body.inviteOnly ? 1 : 0]
  );

  db.run(
    `INSERT INTO group_members VALUES (?,?,?,?,?)`,
    [id, req.player.uuid, "leader", 0, 0]
  );

  res.json({ id });
});

r.post("/join", (req, res) => {
  db.get(
    `SELECT * FROM groups WHERE id=?`,
    [req.body.group],
    (_, g) => {
      if (!g) return res.sendStatus(404);
      if (g.invite_only && !req.body.invited) return res.sendStatus(403);
      if (g.password && g.password !== req.body.password) return res.sendStatus(403);

      db.run(
        `INSERT INTO group_members VALUES (?,?,?,?,?)`,
        [g.id, req.player.uuid, "member", 0, 0]
      );

      res.sendStatus(200);
    }
  );
});

r.post("/blind", (req, res) => {
  db.run(
    `UPDATE group_members SET blinded=?
     WHERE group_id=? AND uuid=?`,
    [req.body.blind ? 1 : 0, req.body.group, req.body.target]
  );
  res.sendStatus(200);
});

export default r;
