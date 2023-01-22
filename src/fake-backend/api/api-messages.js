module.exports = function (app) {
  const DATA = require("../data");

  app.get("/core/api/v1/messages", (req, res) => {
    const messages = DATA.messages;
    res
      .status(200)
      .contentType("application/json")
      .send(JSON.stringify(messages));
  });
};
