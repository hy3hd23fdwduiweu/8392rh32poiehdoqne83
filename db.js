import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("teamtracker.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      uuid TEXT,
      server TEXT,
      name TEXT,
      token TEXT UNIQUE,
      x REAL,
      y REAL,
      z REAL,
      dimension TEXT,
      last_move INTEGER DEFAULT 0,
      stealth_until INTEGER DEFAULT 0,
      PRIMARY KEY (uuid, server)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS friends (
      server TEXT,
      sender TEXT,
      receiver TEXT,
      accepted INTEGER,
      PRIMARY KEY (server, sender, receiver)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS shares (
      server TEXT,
      owner TEXT,
      target TEXT,
      expires INTEGER,
      PRIMARY KEY (server, owner, target)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ignored (
      server TEXT,
      owner TEXT,
      target TEXT,
      PRIMARY KEY (server, owner, target)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
      server TEXT,
      name TEXT,
      leader TEXT,
      password TEXT,
      invite_only INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS group_members (
      group_id TEXT,
      uuid TEXT,
      role TEXT,
      blinded INTEGER,
      icon INTEGER,
      PRIMARY KEY (group_id, uuid)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS group_invites (
      group_id TEXT,
      target TEXT,
      PRIMARY KEY (group_id, target)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS group_waypoints (
      group_id TEXT,
      name TEXT,
      x REAL,
      y REAL,
      z REAL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS broadcasts (
      server TEXT,
      sender TEXT,
      message TEXT,
      scope TEXT,
      created INTEGER
    )
  `);
});
