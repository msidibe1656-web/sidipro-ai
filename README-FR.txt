SIDIPRO AI — KIT DE DÉPART NETLIFY

CONTENU
- index.html : page d'accueil
- style.css : apparence responsive
- script.js : interactions du site et chat
- netlify/functions/chat.js : fonction serveur pour l'assistant IA
- netlify.toml : configuration Netlify

DÉPLOIEMENT
1. Décompressez le ZIP sur votre téléphone ou ordinateur.
2. Dans Netlify, créez un NOUVEAU site/projet ou utilisez le projet SIDIPRO existant après avoir sauvegardé sa version actuelle.
3. Déployez le dossier qui contient index.html, style.css, script.js, netlify.toml et le dossier netlify.
4. Dans Netlify : Site configuration / Environment variables (ou Variables d'environnement), ajoutez :
   OPENAI_API_KEY = votre clé API secrète
   OPENAI_MODEL = gpt-4o-mini (facultatif)
5. Redéployez le site après avoir ajouté les variables.
6. Testez l'assistant.

SÉCURITÉ
- Ne mettez JAMAIS la clé API dans index.html ou script.js.
- Ne partagez pas la clé API dans une conversation ou une capture d'écran.
- L'API peut entraîner des frais selon son usage et les tarifs du fournisseur.
- La clé API et un compte API avec facturation/configuration valide sont nécessaires pour activer le vrai assistant.
- Le chat ne contrôle pas le téléphone et ne crée pas les comptes à la place des utilisateurs.

À FAIRE ENSUITE
- Tester et améliorer les traductions Bambara avec des locuteurs compétents.
- Ajouter l'envoi d'images après avoir mis en place une gestion sécurisée des fichiers.
- Ajouter authentification, base de données et paiements après validation du prototype.
- Vérifier le lien de la boutique Chariow et les coordonnées avant la mise en production.

IMPORTANT
Ce kit est une première version. Le site et son interface sont prêts à être déployés, mais le chatbot IA nécessite la clé API et la configuration Netlify. La traduction Bambara doit être testée et validée avant de la présenter comme service fiable.
