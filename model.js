const clients = {
  "client-id": {
    client_id: "client-id",
    client_secret: "client-secret",
    grants: ["password", "refresh_token"],
    redirect_uris: ["http://localhost:3000/callback"],
  },
};

const users = {
  "user-id": {
    username: "username",
    password: "password",
    accountId: "user-id",
  },
};

const tokens = {};

module.exports = {
  getAccessToken: function (bearerToken) {
    return Promise.resolve(tokens[bearerToken]);
  },

  getClient: function (clientId, clientSecret) {
    return Promise.resolve(clients[clientId]);
  },

  grantTypeAllowed: function (clientId, grantType) {
    return Promise.resolve(clients[clientId].grants.includes(grantType));
  },

  getUser: function (username, password) {
    return Promise.resolve(
      users[username] && users[username].password === password
        ? users[username]
        : null
    );
  },

  saveAccessToken: function (accessToken, clientId, expires, user) {
    tokens[accessToken.token] = accessToken;
    return Promise.resolve();
  },

  getRefreshToken: function (refreshToken) {
    return Promise.resolve(tokens[refreshToken]);
  },

  saveRefreshToken: function (refreshToken, clientId, expires, user) {
    tokens[refreshToken.token] = refreshToken;
    return Promise.resolve();
  },
};
