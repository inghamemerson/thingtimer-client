import * as moment from 'moment';

export const utcTimeAgo = (utcDateString) => {
  // Moment from now to render time since UTC string: https://momentjs.com/docs/#/displaying/fromnow/
  // Kinda brittle, expects a YYYY-MM-DD HH:mm:ss UTC date
  var utcDate = moment.utc(utcDateString).toDate();
  return moment(utcDate).local().fromNow();
};

export const timeDiff = (startDate, endDate) => {
  // Moment difference: https://momentjs.com/docs/#/displaying/difference/
  // Not opinionated, accurate as long as both times are the same timezone
  return moment.duration(moment(startDate).diff(endDate)).humanize();
};

export const lifespan = (thing) => {
  // Takes a thing and return it's lifespan if it has completed timers.
  // Returns false if no timers are present
  // TODO refactor lifespan(), Kinda gross and brittle

  let render = false;
  let timerAverage = 0;
  let timerCount = 0;
  let thingLifespan = 0;
  let quantity = thing.quantity;

  thing.timers.map(timer => {
    if (timer.started_at && timer.ended_at) {
      timerAverage += moment.duration(moment(timer.started_at).diff(timer.ended_at));
      timerCount += 1;
      render = true;
    }
  });

  if (!render) {
    return false;
  }

  thingLifespan = timerAverage / timerCount;

  if (quantity) {
    thingLifespan = thingLifespan * quantity;
  }

  return moment.duration(thingLifespan).humanize();
};