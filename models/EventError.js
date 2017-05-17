const EventError = function() {
  return {
    status: 404,
    message: "Event not found"
  }
};

module.exports = EventError;