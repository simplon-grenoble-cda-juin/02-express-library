## Roadmap découverte répertoire et modèle

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