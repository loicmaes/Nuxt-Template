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
    locales: {
      en: "English",
      fr: "French",
      de: "German",
    },
    themes: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  auth: {
    login: {
      title: "Login",
      form: {
        fields: {
          username: "Username",
          password: "Password",
          forgotPassword: "Forgot password?",
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
        notVerified: {
          title: "Oops... 💢",
          description: "Your account is not verified, check your inbox to verify it and then, try again.",
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
          email: "Email address",
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
    verify: {
      title: "One Time Verification",
      status: {
        pending: {
          title: "Loading...",
          description: "Your account's verification is in progress. Please wait...",
        },
        error: {
          title: "Error",
          description: "An error occurred while verifying your account! Please retry.",
        },
      },
      toasts: {
        success: {
          title: "Congratulations 🎉",
          description: "Your account has been successfully verified! You can now login to access to all features.",
        },
      },
    },
    resetPassword: {
      request: {
        title: "Reset password",
        description: "Enter the email linked to your account, a reset link will be sent if an account is found!",
        toasts: {
          emailSent: {
            title: "Whoosh 📨",
            description: "Check your inbox; a rest password link has been sent to your email address.",
          },
        },
        form: {
          fields: {
            email: "Your email address",
          },
          action: {
            idle: "Submit request",
            loading: "Submitting...",
          },
        },
      },
      newPassword: {
        title: "New password",
        toasts: {
          sessionNotFound: {
            title: "Oops 💢",
            description: "The current session you're running on doesn't exist or expired.",
          },
          passwordReset: {
            title: "Alright 🎉",
            description: "Your password has been updated! You can now login using this password.",
          },
        },
        form: {
          fields: {
            password: "New password",
            confirm: "Confirm password",
            showPasswords: "Show passwords",
          },
          action: {
            idle: "Reset my password",
            loading: "Updating password...",
          },
        },
      },
    },
  },
};
