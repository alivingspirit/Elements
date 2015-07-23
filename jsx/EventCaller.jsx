var EventCaller = {
    eventMap: new Map(),
    registerEvent(event, func){
      if(!this.eventMap.has(event)){
        this.eventMap.set(event, []);
      }
      this.eventMap.get(event).push(event);
    },

    raiseEvent(event){
      var events = this.eventMap.get(event);

      if( events != undefined ){
        events.forEach( event => event() );
        }
    }
};
