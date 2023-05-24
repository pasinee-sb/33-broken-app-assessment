const express = require("express");
const ExpressError = require("./expressError");
let axios = require("axios");

const morgan = require("morgan");

const app = express();

app.use(express.json());

app.use(morgan("dev"));

app.post("/", async function (req, res, next) {
  try {
    let devs = req.body.developers;
    let bios = [];
    if (devs.length === 0) {
      throw new ExpressError("Please add username(s)", 404);
    }
    for (let dev of devs) {
      let biograph = await axios.get(`https://api.github.com/users/${dev}`);

      let out = { bio: biograph.data.bio, name: biograph.data.name };
      bios.push(out);
    }

    return res.json(bios);
  } catch (err) {
    next(err);
  }
});

// 404 handler
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.msg,
      status: status,
    },
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
