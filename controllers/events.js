const { response } = require('express');


const getEvents = ( req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEvents'
  });
}

const createEvent = (req, res = response) => {

  res.json({
    ok: true,
    event: 'createEvent',
  });

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