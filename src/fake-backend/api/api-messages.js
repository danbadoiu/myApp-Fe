module.exports = function (app) {
  const DATA = require("../data");

  app.get("/core/api/v1/messages", (req, res) => {
    const messages = DATA.messages;
    res
      .status(200)
      .contentType("application/json")
      .send(JSON.stringify({ items: messages }));
  });
  app.post("/core/api/v1/messages", (req, res) => {
    const reqBody = req.body;

    const newEmpIndex =
      DATA.messages.push({
        id: `${DATA.messages.length + 1}`,
        idSender: reqBody.idSender,
        idReceiver: reqBody.idReceiver,
        message: reqBody.message,
        date: reqBody.date,
      }) - 1;
    res
      .status(201)
      .contentType("application/json")
      .send({ items: DATA.messages[newEmpIndex] });
  });
};
