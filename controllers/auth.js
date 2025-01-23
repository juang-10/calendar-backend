const { response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response) => {

  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email })

    if ( user ) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con este email'
      })
    }

    user = new User(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

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

const loginUser = async(req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email })

    if ( !user ) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con este email'
      })
    }

    // Confirmar los passwords
    const validPassword = bcrypt.compareSync(password, user.password);

    if ( !validPassword ) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto'
      })
    }

    // Generar JWT


    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      // token,
    })
    
  } catch (error) {
    
  }
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