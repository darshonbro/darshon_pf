import { EventEmitter } from "events";

class ActivityEmitter extends EventEmitter {}

const globalForActivity = global as unknown as { activityEmitter?: ActivityEmitter };

export const activityEmitter = globalForActivity.activityEmitter || new ActivityEmitter();
activityEmitter.setMaxListeners(100);

if (process.env.NODE_ENV !== "production") {
  globalForActivity.activityEmitter = activityEmitter;
}

