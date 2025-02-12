const { response } = require('express');
const Event = require('../models/Events');


const getEvents = async( req, res = response) => {

  const events = await Event.find().populate('user', 'name');

  res.json({
    ok: true,
    events: events
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

const updateEvent = async (req, res = response) => {

  const eventoID = req.params.id;

  try {

    const event = await Event.findById(eventoID);
    const uid = req.uid;

    if(!event){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if(event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }

    const newEvent = {
      ...req.body,
      user: uid
    }

    const eventUpdated = await Event.findByIdAndUpdate(eventoID, newEvent, {new: true});

    res.json({
      ok: true,
      event: eventUpdated
    });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const deleteEvent = async(req, res = response) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const event = await Event.findById(eventoId);

    if(!event){
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      });
    }

    if(event.user.toString() !== uid){
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      });
    }
    
    await Event.findByIdAndDelete(eventoId);

    res.json({ok: true})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent
}