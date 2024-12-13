import { error } from "~/server/services/http";

const wait = async (delay: number) => new Promise(resolve => setTimeout(resolve, delay));

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  await wait(1500);
  return error(event);
});
