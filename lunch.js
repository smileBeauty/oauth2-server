const express = require("express");
const OAuth2Server = require("oauth2-server");
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const oauth2 = new OAuth2Server({
  model: require("./model.js"),
  grants: ["password", "refresh_token"],
  debug: true,
});

app.post("/oauth/token", (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  return oauth2
    .token(request, response)
    .then((token) => {
      console.log('token', token);
      res.json({
        value: token,
      })
    })
    .catch((err) => res.status(err.code || 500).json(err));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
