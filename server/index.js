const express = require("express");
const userRouter = require("./routes/user.routes");
const cors = require("cors");
const postRouter = require("./routes/post.routes");
const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use("/api", cors(corsOptions), userRouter);
app.use("/api", cors(corsOptions), postRouter);
app.listen(PORT, () => console.log(`listen port:${PORT}`));
