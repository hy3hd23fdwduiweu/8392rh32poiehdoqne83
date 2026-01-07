import express from "express";
import "./db.js";
import { auth } from "./auth.js";

import register from "./routes/register.js";
import location from "./routes/location.js";
import friends from "./routes/friends.js";
import shares from "./routes/shares.js";
import groups from "./routes/groups.js";
import stealth from "./routes/stealth.js";
import visibility from "./routes/visibility.js";

const app = express();
app.use(express.json());

app.get("/", (_, res) => {
  res.send("TeamTracker API is running");
});

app.use("/register", register);
app.use("/location", auth, location);
app.use("/friends", auth, friends);
app.use("/shares", auth, shares);
app.use("/groups", auth, groups);
app.use("/stealth", auth, stealth);
app.use("/visible", auth, visibility);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`TeamTracker API running on port ${PORT}`)
);
