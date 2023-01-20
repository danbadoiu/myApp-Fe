module.exports = function (app) {
  const DATA = require('../data');
  app.post('/core/api/v1/login', (req, res) => {
    const reqBody = req.body;
    const user = DATA.users.find(
      user => user.username === reqBody.username
    );

    if (!reqBody.username || !reqBody.password || !user) {
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

    switch (user.role) {
      case 'DOCTOR':
        role = 'ROLE_DOCTOR';
        break;
      case 'PATIENT':
        role = 'ROLE_PATIENT';
        break;
    }

    const responseData = {
      accessToken: 'AT',
      refreshToken: 'RT',
      expiresIn: '3600',
      userDetails: {
        userId: user.id,
        username: user.username,
        role: role,
      },
    };

    module.exports.USER = responseData;

    res.status(200).contentType('application/json').send(responseData);
  });
};
