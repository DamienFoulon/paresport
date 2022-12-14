import i18n from "i18next";
import { initReactI18next } from "react-i18next";
const resources = {
  en: {
    translation: {
      "Warning: This site is purely fictitious, no money transaction is possible.":
        "Warning: This site is purely fictitious, no money transaction is possible.",
      "Please understand, however, that playing on any other platform may be addictive.":
        "Please understand, however, that playing on any other platform may be addictive.",
      "If you think you have a problem, please consult the player info service site: ":
        "If you think you have a problem, please consult the player info service site: ",
      Register: "Register",
      Login: "Login",
      "Search a match": "Search a match",
      All: "All",
      "Top competitions": "Top competitions",
      Games: "Jeux",
      Draw: "Draw",
      "Get free coins": "Get free coins",
      "You can claim free coins every days !":
        "You can claim free coins every days !",
    },
  },
  fr: {
    translation: {
      "Warning: This site is purely fictitious, no money transaction is possible.":
        "Attention : Ce site est purement fictif, aucune transaction d'argent n'y est possible",
      "Please understand, however, that playing on any other platform may be addictive.":
        "Veuillez toutefois comprendre que jouer sur une quelconque autre platforme peut comporter des risques d'addiction.",
      "If you think you have a problem, please consult the player info service site: ":
        "Si vous pensez avoir un problème, veuillez consulter le site de joueurs infos service : ",
      Register: "S'inscrire",
      Login: "Connexion",
      "Search a match": "Rechercher un match",
      All: "Tous",
      "Top competitions": "Top des competitions",
      Games: "Jeux",
      Draw: "Nul",
      "Get free coins": "Obtenez des crédits gratuits",
      "You can claim free coins every days !":
        "Récupérez des crédits gratuits tous les jours !",
    },
  },
};

export default i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});
