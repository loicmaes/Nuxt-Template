export default {
  temp: {
    welcome: {
      title: "Bienvenue sur Nuxt !",
      caption: "Démarrez votre projet avec une authentification fonctionnelle et une protection de route front/back opérationnelle ! Une révolution pour le démarrage de projet afin de s'abstraire de tout travail redondant dans la conception d'une application privée.",
      visitDoc: "Commencer",
      authProcess: "Commencer les tests",
      logOut: {
        idle: "Se déconnecter",
        loading: "Déconnexion...",
      },
      sayHi: "Salut, {username}",
    },
  },
  platformLabel: "Modèle Nuxt :",
  globals: {
    toasts: {
      serverError: {
        title: "Oups... 💢",
        description: "Une erreur interne est survenue... Réessayez peut-être ?",
      },
      sessionExpired: {
        title: "Oups... 💢",
        description: "Votre session a expiré ! Connectez-vous pour y accéder à nouveau.",
      },
    },
    locales: {
      en: "Anglais",
      fr: "Français",
      de: "Allemand",
    },
    themes: {
      light: "Clair",
      dark: "Sombre",
      system: "Système",
    },
  },
  auth: {
    login: {
      title: "Connexion",
      form: {
        fields: {
          username: "Nom d'utilisateur",
          password: "Mot de passe",
          forgotPassword: "Mot de passe oublié ?",
          showPassword: "Afficher le mot de passe",
        },
        action: {
          idle: "Connectez-moi",
          loading: "Connexion...",
        },
      },
      toasts: {
        wrongCredentials: {
          title: "Oups... 💢",
          description: "Vous avez fourni de mauvaises informations d'identification... Réessayez !",
        },
        notVerified: {
          title: "Oups... 💢",
          description: "Votre compte n'est pas vérifié, vérifiez vos e-mails pour le confirmer puis réessayez.",
        },
        userLoggedIn: {
          title: "Hey {username} 👋",
          description: "Content de vous revoir ici !",
        },
      },
    },
    register: {
      title: "Inscription",
      form: {
        fields: {
          username: "Nom d'utilisateur",
          email: "Adresse e-mail",
          password: "Mot de passe",
          showPassword: "Afficher le mot de passe",
          conditions: "En cliquant, vous acceptez notre politique de confidentialité.",
        },
        action: {
          idle: "Commencer l'aventure",
          loading: "Inscription...",
        },
      },
      toasts: {
        usernameAlreadyUsed: {
          title: "Oups... 💢",
          description: "Le nom d'utilisateur \"{username}\" est déjà utilisé ! Choisissez-en un autre.",
        },
        userRegistered: {
          title: "Félicitations 🎉",
          description: "Vous faites maintenant partie de notre grande famille ! Heureux de vous voir ici, {username}.",
        },
      },
    },
    verify: {
      title: "Vérification unique",
      status: {
        pending: {
          title: "Chargement...",
          description: "La vérification de votre compte est en cours. Veuillez patienter...",
        },
        error: {
          title: "Erreur",
          description: "Une erreur est survenue lors de la vérification de votre compte ! Veuillez réessayer.",
        },
      },
      toasts: {
        success: {
          title: "Félicitations 🎉",
          description: "Votre compte a été vérifié avec succès ! Vous pouvez maintenant vous connecter et accéder à toutes les fonctionnalités.",
        },
      },
    },
    resetPassword: {
      request: {
        title: "Réinitialisation du mot de passe",
        description: "Entrez l'adresse e-mail liée à votre compte, un lien de réinitialisation vous sera envoyé si un compte est trouvé !",
        toasts: {
          emailSent: {
            title: "Hop 📨",
            description: "Vérifiez votre boîte de réception ; un lien de réinitialisation du mot de passe a été envoyé à votre adresse e-mail.",
          },
        },
        form: {
          fields: {
            email: "Votre adresse e-mail",
          },
          action: {
            idle: "Envoyer la demande",
            loading: "Envoi...",
          },
        },
      },
      newPassword: {
        title: "Nouveau mot de passe",
        toasts: {
          sessionNotFound: {
            title: "Oups 💢",
            description: "La session actuelle est introuvable ou a expiré.",
          },
          passwordReset: {
            title: "C'est bon 🎉",
            description: "Votre mot de passe a été mis à jour ! Vous pouvez maintenant vous connecter avec ce nouveau mot de passe.",
          },
        },
        form: {
          fields: {
            password: "Nouveau mot de passe",
            confirm: "Confirmer le mot de passe",
            showPasswords: "Afficher les mots de passe",
          },
          action: {
            idle: "Réinitialiser mon mot de passe",
            loading: "Mise à jour du mot de passe...",
          },
        },
      },
    },
  },
};
