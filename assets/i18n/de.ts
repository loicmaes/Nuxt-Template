export default {
  temp: {
    welcome: {
      title: "Willkommen bei Nuxt!",
      caption: "Starte dein Projekt mit funktionaler Authentifizierung und operativem Front-/Back-Routenschutz! Eine Revolution für den Projektstart, um redundante Arbeiten bei der Gestaltung einer privaten Anwendung zu vermeiden.",
      visitDoc: "Loslegen",
      authProcess: "Tests starten",
      logOut: {
        idle: "Abmelden",
        loading: "Abmeldung...",
      },
      sayHi: "Hallo, {username}",
    },
  },
  platformLabel: "Nuxt-Vorlage:",
  globals: {
    toasts: {
      serverError: {
        title: "Oops... 💢",
        description: "Ein interner Fehler ist aufgetreten... Vielleicht nochmal versuchen?",
      },
      sessionExpired: {
        title: "Oops... 💢",
        description: "Deine Sitzung ist abgelaufen! Melde dich erneut an, um wieder Zugriff zu erhalten.",
      },
    },
    locales: {
      en: "Englisch",
      fr: "Französisch",
      de: "Deutsch",
    },
    themes: {
      light: "Hell",
      dark: "Dunkel",
      system: "System",
    },
  },
  auth: {
    login: {
      title: "Anmelden",
      form: {
        fields: {
          username: "Benutzername",
          password: "Passwort",
          forgotPassword: "Passwort vergessen?",
          showPassword: "Passwort anzeigen",
        },
        action: {
          idle: "Einloggen",
          loading: "Anmeldung...",
        },
      },
      toasts: {
        wrongCredentials: {
          title: "Oops... 💢",
          description: "Falsche Anmeldedaten angegeben... Versuche es erneut!",
        },
        notVerified: {
          title: "Oops... 💢",
          description: "Dein Konto ist nicht verifiziert. Überprüfe deine E-Mails, um es zu bestätigen, und versuche es dann erneut.",
        },
        userLoggedIn: {
          title: "Hallo {username} 👋",
          description: "Schön, dich wieder hier zu sehen!",
        },
      },
    },
    register: {
      title: "Registrieren",
      form: {
        fields: {
          username: "Benutzername",
          email: "E-Mail-Adresse",
          password: "Passwort",
          showPassword: "Passwort anzeigen",
          conditions: "Mit dem Klicken stimmst du unserer Datenschutzrichtlinie zu.",
        },
        action: {
          idle: "Abenteuer starten",
          loading: "Registrierung...",
        },
      },
      toasts: {
        usernameAlreadyUsed: {
          title: "Oops... 💢",
          description: "Der Benutzername \"{username}\" ist bereits registriert! Wähle einen anderen.",
        },
        userRegistered: {
          title: "Herzlichen Glückwunsch 🎉",
          description: "Du bist jetzt Teil unserer großen Familie! Schön, dich hier zu sehen, {username}.",
        },
      },
    },
    verify: {
      title: "Einmalige Verifizierung",
      status: {
        pending: {
          title: "Laden...",
          description: "Die Verifizierung deines Kontos wird durchgeführt. Bitte warte einen Moment...",
        },
        error: {
          title: "Fehler",
          description: "Ein Fehler ist bei der Verifizierung deines Kontos aufgetreten! Bitte erneut versuchen.",
        },
      },
      toasts: {
        success: {
          title: "Herzlichen Glückwunsch 🎉",
          description: "Dein Konto wurde erfolgreich verifiziert! Du kannst dich jetzt anmelden und alle Funktionen nutzen.",
        },
      },
    },
    resetPassword: {
      request: {
        title: "Passwort zurücksetzen",
        description: "Gib die E-Mail-Adresse ein, die mit deinem Konto verknüpft ist. Ein Link zum Zurücksetzen wird gesendet, wenn ein Konto gefunden wird!",
        toasts: {
          emailSent: {
            title: "Geschafft 📨",
            description: "Überprüfe deinen Posteingang; ein Link zum Zurücksetzen des Passworts wurde an deine E-Mail-Adresse gesendet.",
          },
        },
        form: {
          fields: {
            email: "Deine E-Mail-Adresse",
          },
          action: {
            idle: "Anfrage senden",
            loading: "Senden...",
          },
        },
      },
      newPassword: {
        title: "Neues Passwort",
        toasts: {
          sessionNotFound: {
            title: "Oops 💢",
            description: "Die aktuelle Sitzung, auf der du arbeitest, existiert nicht oder ist abgelaufen.",
          },
          passwordReset: {
            title: "Alles klar 🎉",
            description: "Dein Passwort wurde aktualisiert! Du kannst dich jetzt mit diesem Passwort anmelden.",
          },
        },
        form: {
          fields: {
            password: "Neues Passwort",
            confirm: "Passwort bestätigen",
            showPasswords: "Passwörter anzeigen",
          },
          action: {
            idle: "Passwort zurücksetzen",
            loading: "Passwort aktualisieren...",
          },
        },
      },
    },
  },
};
