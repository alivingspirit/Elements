"use strict";

var EventCaller = {
  eventMap: new Map(),
  registerEvent: function registerEvent(event, func) {
    if (!this.eventMap.has(event)) {
      this.eventMap.set(event, []);
    }
    this.eventMap.get(event).push(event);
  },

  raiseEvent: function raiseEvent(event) {
    var events = this.eventMap.get(event);

    if (events != undefined) {
      events.forEach(function (event) {
        return event();
      });
    }
  }
};
//# sourceMappingURL=C:\Users\Abayai\Desktop\Git Development\jsx\EventCaller.js.map