## Roadmap découverte répertoire et modèle

### 1️⃣ Créer la connexion entre Express et la base de données

**1** Installer `pg` et `dotenv`

- 🔗 [Installation `pg`](https://www.npmjs.com/package/pg)
- 🔗 [Installation TS `pg`](https://www.npmjs.com/package/@types/pg)
- 🔗 [Installation `dotenv`](https://www.npmjs.com/package/dotenv)

**2** Créer la classe abstraite `libs/Database.ts`

🔗 [Exemple `libs/Database.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/libs/Database.ts)

**3** Implémenter la méthode static `getPool` qui exploite le fichier d'environnement

🔍 Focus : les fichiers d'environnements (en bref, approfondissement en devops)

🔍 Focus : versionnement et exploitation des fichiers d'environnements

📚 [Documentation `pg` : paramètres de la classe Pool](https://node-postgres.com/apis/pool)
