export default (username: string): IEmailTemplate => ({
  subject: `Congratulations ${username} 🎉`,
  text: `Your account has been successfully verified! You have now access to the whole platform. Trying it is adopting it!`,
});
