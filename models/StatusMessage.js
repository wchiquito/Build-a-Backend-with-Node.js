const StatusMessage = function(...args) {
    this.status = args[0];
    this.message = args[1] || 'Operation finished';
    //this.length = _eventList.length;
    if (args[2]) this.event = args[2];
};

module.exports = StatusMessage;