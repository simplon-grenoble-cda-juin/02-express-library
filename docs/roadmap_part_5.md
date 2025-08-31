## Roadmap découverte répertoire et modèle

### 5️⃣ Ajouter un livre en base de données

**1** Implémenter la méthode `create` dans le répertoire `repositories/BookRepository.ts` (création du livre uniquement)

🔗 [Exemple `repositories/BookRepository.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/repositories/BookRepository.ts)

**2** Gérer la soumission du formulaire : réception des données + validations

🔗 [Exemple `controllers/BookController.ts`](https://github.com/simplon-grenoble-cda-juin/02-express-library/blob/app_full/controllers/BookController.ts)

**3** Gérer l'enregistrement des données en base (création du livre uniquement)

**4** Souligner la nécessiter de créer un second enregistrement dans la table `book_author` pour la relation entre un livre et un auteur

**5** Upgrade la méthode `create` du répertoire `repositories/BookRepository.ts` pour gérer la création d'un livre puis la création de la relation

🔍 Focus : les relations et les tables intermédiaires (Cf `book_author`)

