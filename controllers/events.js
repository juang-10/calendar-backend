const { response } = require('express');
const Event = require('../models/Events');


const getEvents = ( req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEvents'
  });
}

const createEvent = async(req, res = response) => {

  const event = new Event(req.body);

  try {

    event.user = req.uid;

    const eventSaved = await event.save();
    res.json({
      ok: true,
      event: eventSaved
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const updateEvent = (req, res = response) => {
  res.json({
    ok: true,
    event: 'updateEvent',
  });
}

const deleteEvent = (req, res = response) => {
  res.json({
    ok: true,
    event: 'deleteEvent',
  });
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}