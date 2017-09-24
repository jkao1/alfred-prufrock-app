'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './session.events';

var SessionSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

registerEvents(SessionSchema);
export default mongoose.model('Session', SessionSchema);
