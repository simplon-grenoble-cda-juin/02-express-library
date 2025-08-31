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

---

### 2️⃣ Récupérer l'ensemble des livres en base de données

**1** Créer la classe abstraite `libs/Repository.ts`

🔗 [Exemple `libs/Repository.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/libs/Repository.ts)

**2** Implémenter la propriété `pool` avec une instance de `Pool` fournie par `libs/Database.ts`

**3** Créer le répertoire `repositories/BookRepository.ts` qui étend la classe `libs/Repository.ts`

🔗 [Exemple `repositories/BookRepository.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/repositories/BookRepository.ts)

**4** Implémenter la méthode `findAll`

**5** Exploiter le répertoire dans une méthode de contrôleur pour récupérer tous les livres

🔗 [Exemple `controllers/BookController.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/controllers/BookController.ts)

**6** Créer le modèle `models/Book.ts` et implémenter la classe avec propriété et méthode `fromRow`

🔗 [Exemple `models/Book.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/models/Book.ts)

**7** Exploiter le modèle `models/Book.ts` et sa méthode `fromRow` à l'issue de la récupération des données dans le répertoire `repositories/BookRepository.ts`

🔍 Focus : système de promesse avec async et await

🔍 Focus : système de gestion d'erreur avec try et catch

---

### 3️⃣ Récupérer le détail d'un livre en base de données

**1** Implémenter la méthode `findBy` dans le répertoire `repositories/BookRepository.ts`

🔗 [Exemple `repositories/BookRepository.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/repositories/BookRepository.ts)

**2** Exploiter le répertoire dans une méthode de contrôleur pour récupérer le détail d'un livre

🔗 [Exemple `controllers/BookController.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/controllers/BookController.ts)

---

### 4️⃣ Récupérer les données nécessaires au formulaire d'ajout d'un livre

**1** Créer les répertoires : `repositories/AuthorRepository.ts`, `repositories/CategoryRepository.ts` et `repositories/PublisherRepository.ts`

🔗 [Exemples `repositories/*.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/tree/app_full/repositories)

**2** Implémenter les méthodes `findAll` dans chaque répertoire pour récupérer les données de chaque modèle

**3** Exploiter les répertoires dans une méthode de contrôleur pour récupérer les données nécessaires au formulaire d'ajout d'un livre

🔗 [Exemple `controllers/BookController.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/controllers/BookController.ts)

---

### 5️⃣ Ajouter un livre en base de données

**1** Implémenter la méthode `create` dans le répertoire `repositories/BookRepository.ts` (création du livre uniquement)

🔗 [Exemple `repositories/BookRepository.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/repositories/BookRepository.ts)

**2** Gérer la soumission du formulaire : réception des données + validations

🔗 [Exemple `controllers/BookController.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/controllers/BookController.ts)

**3** Gérer l'enregistrement des données en base (création du livre uniquement)

**4** Souligner la nécessiter de créer un second enregistrement dans la table `book_author` pour la relation entre un livre et un auteur

**5** Upgrade la méthode `create` du répertoire `repositories/BookRepository.ts` pour gérer la création d'un livre puis la création de la relation

🔍 Focus : les relations et les tables intermédiaires (Cf `book_author`)

