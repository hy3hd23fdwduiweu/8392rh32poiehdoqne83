import express from "express";
import { db } from "../db.js";

const r = express.Router();

/**
 * Update player's location
 * Sent by the Minecraft mod
 */
r.post("/update", (req, res) => {
  const { x, y, z, dimension } = req.body;

  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof z !== "number" ||
    typeof dimension !== "string"
  ) {
    return res.sendStatus(400);
  }

  db.run(
    `UPDATE players
     SET x=?, y=?, z=?, dimension=?
     WHERE uuid=?`,
    [x, y, z, dimension, req.player.uuid]
  );

  res.sendStatus(200);
});

export default r;
