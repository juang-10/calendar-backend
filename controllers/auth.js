const { response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generarJWT } = require('../helpers/jwt');

const createUser = async(req, res = response) => {

  const { email, password } = req.body;

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

    // Generar JWT
    const token = await generarJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
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
    const token = await generarJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    })
    
  } catch (error) {
    
  }
}

const renewToken = async (req, res = response) => {

  const { uid, name } = req;

  // Generar un nuevo JWT y retornarlo en la petición
  const token = await generarJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    msg: 'Renew Token',
    token,
  })
}

module.exports = {
  createUser,
  loginUser,
  renewToken,
}