import express from "express";
import { db } from "../db.js";

const r = express.Router();

r.get("/", (req, res) => {
  const now = Date.now();

  db.all(`
    SELECT p.uuid, p.name, p.x, p.y, p.z, p.dimension
    FROM players p
    WHERE p.server=?
      AND p.uuid != ?
      AND p.stealth_until < ?
      AND NOT EXISTS (
        SELECT 1 FROM ignored i
        WHERE i.server=? AND i.owner=p.uuid AND i.target=?
      )
      AND (
        EXISTS (
          SELECT 1 FROM friends f
          WHERE f.server=? AND f.accepted=1
          AND ((f.sender=? AND f.receiver=p.uuid)
            OR (f.receiver=? AND f.sender=p.uuid))
        )
        OR EXISTS (
          SELECT 1 FROM shares s
          WHERE s.server=? AND s.owner=p.uuid AND s.target=? AND s.expires>?
        )
        OR EXISTS (
          SELECT 1 FROM group_members g1
          JOIN group_members g2 ON g1.group_id=g2.group_id
          JOIN groups gr ON gr.id=g1.group_id
          WHERE gr.server=?
            AND g1.uuid=? AND g2.uuid=p.uuid
            AND g2.blinded=0
        )
      )
  `,
  [
    req.server,
    req.player.uuid,
    now,
    req.server,
    req.player.uuid,
    req.server,
    req.player.uuid,
    req.player.uuid,
    req.server,
    req.player.uuid,
    now,
    req.server,
    req.player.uuid
  ],
  (_, rows) => res.json(rows)
  );
});

export default r;
