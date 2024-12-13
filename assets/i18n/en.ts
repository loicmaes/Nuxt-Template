export default {
  temp: {
    welcome: {
      title: "Welcome to Nuxt!",
      caption: "Start your project with functional authentication and operational front/back route protection! A revolution for project kick-offs to avoid redundant work in designing a private application.",
      visitDoc: "Get started",
      authProcess: "Start testing",
      logOut: {
        idle: "Disconnect",
        loading: "Disconnecting...",
      },
      sayHi: "Hi, {username}",
    },
  },
  platformLabel: "Nuxt Template:",
  globals: {
    toasts: {
      serverError: {
        title: "Oops... 💢",
        description: "An internal error occurred... Maybe try again?",
      },
      sessionExpired: {
        title: "Oops... 💢",
        description: "Your session had reach his expiration date! Login to access again.",
      },
    },
  },
  auth: {
    login: {
      title: "Login",
      form: {
        fields: {
          username: "Username",
          password: "Password",
          showPassword: "Show password",
        },
        action: {
          idle: "Take me in",
          loading: "Logging in...",
        },
      },
      toasts: {
        wrongCredentials: {
          title: "Oops... 💢",
          description: "You provided wrong credentials... Try again!",
        },
        userLoggedIn: {
          title: "Hey {username} 👋",
          description: "Glad to see you back here!",
        },
      },
    },
    register: {
      title: "Register",
      form: {
        fields: {
          username: "Username",
          password: "Password",
          showPassword: "Show password",
          conditions: "By clicking, you agree to our Privacy Policy.",
        },
        action: {
          idle: "Start the adventure",
          loading: "Registering...",
        },
      },
      toasts: {
        usernameAlreadyUsed: {
          title: "Oops... 💢",
          description: "Username \"{username}\" is already registered! Use another one.",
        },
        userRegistered: {
          title: "Congratulations 🎉",
          description: "You're now a member of our big family! Glad to see you here {username}.",
        },
      },
    },
  },
};
