import { useScheduler } from "#scheduler";
import * as authRepository from "~/server/database/repositories/auth";
import * as accountVerificationRepository from "~/server/database/repositories/accountVerification";
import * as passwordResetRepository from "~/server/database/repositories/passwordRequest";

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(async () => await authRepository.prune()).dailyAt(0, 0);
  scheduler.run(async () => await accountVerificationRepository.prune()).dailyAt(0, 0);
  scheduler.run(async () => await passwordResetRepository.prune()).dailyAt(0, 0);
});
