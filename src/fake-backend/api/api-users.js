module.exports = function (app) {
  const DATA = require('../data');

  app.get('/core/api/v1/users', (req, res) => {
    const role = req.query['role'];
    if (!role || role === 'ALL') {
      users = DATA.users;
    } else {
      users = DATA.users.filter(
        user => user.role=== role
      );
    }
    res
      .status(200)
      .contentType('application/json')
      .send(JSON.stringify( {items: users} ));
  });

  app.post('/core/api/v1/users', (req, res) => {
    const reqBody = req.body;
    const usernameFromUser = DATA.users.find(
      user => user.username === reqBody.username
    );
    // const team = DATA.teams.find((team) => Number(team.id) === Number(reqBody.teamId));
    
    if (usernameFromUser) {
      res
        .status(400)
        .contentType('application/json')
        .send({
          errors: [
            {
              errorCode: 'KEYCLOAK_CREATE_EMPLOYEE_USERNAME_CONFLICT',
            },
          ],
        });
    } else {
      const newEmpIndex =
        DATA.users.push({
          id: `${DATA.users.length + 1}`,
          firstName: reqBody.firstName,
          lastName: reqBody.lastName,
          username: reqBody.username,
          email: reqBody.email,
          role: reqBody.role,
          password: reqBody.password
        }) - 1;
      res
        .status(201)
        .contentType('application/json')
        .send({ items: DATA.users[newEmpIndex] });
    }
  });

  app.patch('/core/api/v1/users/:id', (req, res) => {
    const reqBody = req.body;
    const id = req.params['id'];
    const teamId = reqBody['teamId'];
    const team = DATA.teams.find(team => Number(team.id) === Number(teamId));
    const user = DATA.users.find(empl => empl.id === id);
    const version = user.v;

    if (reqBody.v < version) {
      res
        .status(400)
        .contentType('application/json')
        .send({
          errors: [
            {
              errorCode: 'EMPLOYEE_UPDATE_VERSION_CONFLICT',
              devMessage: "Conflict on employee's versions!",
            },
          ],
        });
    } else {
      newUser = {
        id: id,
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        username: user.username,
        teamDetails: { id: team.id, name: team.name },
        email: reqBody.email,
        totalVacationDays: employee.totalVacationDays,
        role: reqBody.role,
        contractStartDate: employee.contractStartDate,
        v: reqBody.v,
      };
      users = DATA.users;
      const index = users.indexOf(user);
      users[index] = newUser;
      res
        .status(204)
        .contentType('application/json')
        .send({ items: users });
    }
  });

  app.patch('/core/api/v1/users/:id/inactivate', (req, res) => {
    const id = req.params['id'];
    users = DATA.users;
    const user = DATA.users.find(empl => empl.id === id);

    if (user) {
      newUser = {
        ...employee,
        status: 'INACTIVE',
      };
      users = DATA.users;
      const index = users.indexOf(user);
      users[index] = newUser;

      res
        .status(204)
        .contentType('application/json')
        .send({ items: users });
    } else {
      res
        .status(400)
        .contentType('application/json')
        .send({
          errors: [
            {
              errorCode: 'E0001C400',
              devMessage: 'The employee does not exist!',
            },
          ],
        });
    }
  });

  app.get('/core/public/api/users/:id', (req, res) => {
    const id = req.params['id'];
    const user = DATA.users.find(r => r.id === id);
    if (user) {
      res.status(200).contentType('application/json').send(user);
    }
  });

  
};
