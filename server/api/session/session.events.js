/**
 * Session model events
 */

'use strict';

import {EventEmitter} from 'events';
var SessionEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SessionEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Session) {
  for(var e in events) {
    let event = events[e];
    Session.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    SessionEvents.emit(event + ':' + doc._id, doc);
    SessionEvents.emit(event, doc);
  };
}

export {registerEvents};
export default SessionEvents;
