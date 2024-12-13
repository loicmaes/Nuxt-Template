import { useScheduler } from "#scheduler";
import * as authRepository from "~/server/database/repositories/auth";
import * as accountVerificationRepository from "~/server/database/repositories/accountVerification";

export default defineNitroPlugin(() => {
  const scheduler = useScheduler();

  scheduler.run(async () => {
    const count = await authRepository.prune();
    console.log(`[${new Date().toLocaleString()}] Auth sessions pruning task done. (${count})`);
  }).dailyAt(0, 0);
  scheduler.run(async () => {
    const count = await accountVerificationRepository.prune();
    console.log(`[${new Date().toLocaleString()}] Account's verification requests pruning task done. (${count})`);
  }).dailyAt(0, 0);
});
