import cron from "node-cron";
import scheduleMailToAllByReuqestType from "./mailService/schedulerMail";

const sendScheduledMail = (schedular, pillarId) => {
  console.log("========>inside cron scheduler===> Reminder mail will triger on coming monday=========> testing dev deploy logs");
  try {
    // cron job for every week (0 0 * * 0)
    //         */10 * * * * will run every 10 min.
    // */10 * * * * * will run every 10 sec.

    //0 9 * * 1       will run on monday 9am
console.log(`=================> schedular data : ${schedular}`)
    cron.schedule(schedular.toString(), async () => {
      scheduleMailToAllByReuqestType("not NULL", pillarId);

      scheduleMailToAllByReuqestType("NULL", pillarId);
    });
  } catch (err) {
    console.log(err);
  }
};

export default {
  sendScheduledMail,
};