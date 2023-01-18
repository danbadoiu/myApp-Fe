module.exports = function (app) {
  const DATA = require('../data');
  app.post('/core/api/v1/login', (req, res) => {
    const reqBody = req.body;
    const employee = DATA.employees.find(
      employee => employee.username === reqBody.username
    );

    if (!reqBody.username || !reqBody.password || !employee) {
      res
        .status(400)
        .contentType('application/json')
        .send({
          errors: [
            {
              errorCode: "KEYCLOAK_LOGIN_INVALID_CREDENTIALS"
            },
          ],
        });
    }

    let role;

    switch (employee.role) {
      case 'HR':
        role = 'ROLE_HR';
        break;
      case 'TEAM_LEAD':
        role = 'ROLE_TEAM_LEAD';
        break;
      case 'USER':
        role = 'ROLE_EMPLOYEE';
        break;
    }

    const responseData = {
      accessToken: 'AT',
      refreshToken: 'RT',
      expiresIn: '3600',
      userDetails: {
        employeeId: employee.id,
        username: employee.username,
        role: role,
      },
    };

    module.exports.USER = responseData;

    res.status(200).contentType('application/json').send(responseData);
  });
};
