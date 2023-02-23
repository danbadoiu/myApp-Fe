module.exports = function (app) {
  const DATA = require("../data");

  app.get("/core/api/v1/posts", (req, res) => {
    const posts = DATA.posts;
    res
      .status(200)
      .contentType("application/json")
      .send(JSON.stringify({ items: posts }));
  });
  app.post("/core/api/v1/posts", (req, res) => {
    const reqBody = req.body;

    const newEmpIndex =
      DATA.posts.push({
        id: `${DATA.posts.length + 1}`,
        idUser: reqBody.idUser,
        message: reqBody.message,
        date: reqBody.date,
        image: req.image
      }) - 1;
    res
      .status(201)
      .contentType("application/json")
      .send({ items: DATA.posts[newEmpIndex] });
  });
};
