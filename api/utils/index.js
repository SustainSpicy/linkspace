export const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

let lastRequestTime = 0;

let lastRequestTimes = {};

export function limitRequest(req, res, next) {
  const userId = req.user.email;
  const currentTime = Date.now();
  if (
    lastRequestTimes[userId] &&
    currentTime - lastRequestTimes[userId] < 120000
  ) {
    return res.status(429).send("Too Many Requests. Try again later.");
  }
  lastRequestTimes[userId] = currentTime;
  next();
}
