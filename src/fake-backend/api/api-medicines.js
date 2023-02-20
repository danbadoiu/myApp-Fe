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
  app.get("/core/api/v1/medicinesBox", (req, res) => {
    const medicinesBox = DATA.medicinesBox;
    res
      .status(200)
      .contentType("application/json")
      .send(JSON.stringify({ items: medicinesBox }));
  });
  app.post("/core/api/v1/medicinesBox", (req, res) => {
    const reqBody = req.body;

    const newEmpIndex =
      DATA.medicinesBox.push({
        id: `${DATA.medicinesBox.length + 1}`,
        name: reqBody.name,
        description: reqBody.description,
        image: reqBody.image,
      }) - 1;
    res
      .status(201)
      .contentType("application/json")
      .send({ items: DATA.medicinesBox[newEmpIndex] });
  });
  app.delete("/core/api/v1/medicinesBox/:id", (req, res) => {
    const medicineId = req.params["id"];
    if (medicineId) {
      medicines = DATA.medicinesBox;
      const medicine = DATA.medicinesBox.find((r) => r.id === medicineId);
      const index = DATA.medicinesBox.indexOf(medicine);

      medicines.splice(index, 1);
      res.status(204).contentType("application/json").send();
    } else {
      res
        .status(400)
        .contentType("application/json")
        .send({
          errors: [
            {
              errorCode: "LEAVE_REQUEST_NOT_FOUND",
              devMessage: "The request does not exist!",
            },
          ],
        });
    }
  });
};
