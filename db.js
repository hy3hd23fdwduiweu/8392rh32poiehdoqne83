import sqlite3 from "sqlite3";
export const db = new sqlite3.Database("teamtracker.db");

db.serialize(() => {

  db.run(`
    CREATE TABLE IF NOT EXISTS players (
      uuid TEXT PRIMARY KEY,
      name TEXT,
      token TEXT UNIQUE,
      x REAL,
      y REAL,
      z REAL,
      dimension TEXT,
      stealth_until INTEGER DEFAULT 0
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS friends (
      sender TEXT,
      receiver TEXT,
      accepted INTEGER,
      PRIMARY KEY (sender, receiver)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS shares (
      owner TEXT,
      target TEXT,
      expires INTEGER
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS ignored (
      owner TEXT,
      target TEXT,
      PRIMARY KEY (owner, target)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS groups (
      id TEXT PRIMARY KEY,
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
      role TEXT,          -- leader | co | member
      blinded INTEGER,
      icon INTEGER,
      PRIMARY KEY (group_id, uuid)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS group_invites (
      group_id TEXT,
      target TEXT
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
      sender TEXT,
      message TEXT,
      scope TEXT,
      created INTEGER
    )
  `);
});
