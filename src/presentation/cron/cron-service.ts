import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    /* cada segundo */
    // const job = new CronJob(
    //   "* * * * * *", // cronTime
    //   () => {
    //     console.log("You will see this message every second");
    //   }
    // );

    const job = new CronJob(cronTime, onTick);

    job.start();

    return job;
  }
}
