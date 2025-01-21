const { response} = require('express');
const createUser = (req, res = response) => {
  
  const { name, email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: 'Registro',
    name,
    email,
    password,
  })
}

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.status(201).json({
    ok: true,
    msg: 'Login',
    email,
    password,
  })
}

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'Renew Token',
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}