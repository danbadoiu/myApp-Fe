module.exports = function (app) {
    const DATA = require("../data");
  
    app.get("/core/api/v1/medicines", (req, res) => {
      const medicines = DATA.medicines;
      res
        .status(200)
        .contentType("application/json")
        .send(JSON.stringify({ items: medicines }));
    });
    app.post("/core/api/v1/medicines", (req, res) => {
      const reqBody = req.body;
  
      const newEmpIndex =
        DATA.medicines.push({
          id: `${DATA.medicines.length + 1}`,
          name: reqBody.name,
          description: reqBody.description,
          image: reqBody.image,
        }) - 1;
      res
        .status(201)
        .contentType("application/json")
        .send({ items: DATA.medicines[newEmpIndex] });
    });
  };
  