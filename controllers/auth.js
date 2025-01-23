const { response} = require('express');
const User = require('../models/User');

const createUser = async(req, res = response) => {

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email })

    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'Un usuario ya existe con este correo'
      })
    }

    user = new User(req.body);
    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Error al crear el usuario',
    })
  }
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