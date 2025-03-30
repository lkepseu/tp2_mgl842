# **EffiTask**

EffiTask est une application de gestion de tâches conçue pour optimiser la productivité des utilisateurs en offrant une interface simple, intuitive et efficace pour organiser, prioriser et suivre les tâches.

---

## **Table des matières**

1. [Description du projet](#description-du-projet)
2. [Technologies utilisées](#technologies-utilisées)
3. [Installation](#installation)
4. [Architecture du projet](#architecture-du-projet)
5. [Tests](#tests)
6. [CI/CD](#cicd)
7. [Qualité du code](#qualité-du-code)
8. [Contribution](#contribution)
9. [Licence](#licence)

---

## **Description du projet**

EffiTask permet aux utilisateurs de :

- Créer, modifier et supprimer des tâches.
- Organiser les tâches par catégories et priorités.
- Suivre l'avancement de chaque tâche avec des indicateurs visuels.
- Ajouter des rappels et des échéances pour ne jamais manquer une tâche importante.

Cette application est idéale pour les professionnels et les équipes cherchant à améliorer leur gestion du temps et de la charge de travail.

---

## **Technologies utilisées**

Voici les technologies et outils utilisés pour ce projet :

- **Frontend** : Vue.js (v3), Nuxt 3, Vuex (gestion de l'état), Vuetify (UI)
- **Backend** : Node.js, Express
- **Base de données** : MongoDB (avec Mongoose)
- **Authentification** : JSON Web Token (JWT)
- **Tests** : Jest, Vue Test Utils, Cypress (tests E2E)
- **CI/CD** : GitHub Actions
- **Linting et Formatage** : ESLint, Prettier

---

## **Installation**

### Prérequis

- Node.js version 18 ou supérieure.
- MongoDB en local ou un service MongoDB (par exemple, MongoDB Atlas).

### Étapes d'installation

1. **Cloner le dépôt** :
    ```bash
    git clone https://github.com/username/effitask.git
    ```

2. **Accéder au répertoire du projet** :
    ```bash
    cd effitask
    ```

3. **Installer les dépendances pour le backend et le frontend** :
    ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
    ```

4. **Configurer les variables d'environnement** (dans un fichier `.env`) :
    - `MONGODB_URI` : URL de votre base de données MongoDB.
    - `JWT_SECRET` : Clé secrète pour la génération de jetons JWT.

5. **Lancer l'application en mode développement** :
    ```bash
    # Lancer le backend
    cd backend
    npm start

    # Lancer le frontend
    cd ../frontend
    npm run dev
    ```

6. **Accéder à l'application** :
   - Le frontend sera accessible sur `http://localhost:3000`.
   - Le backend API sera accessible sur `http://localhost:5000`.

---

## **Architecture du projet**

Le projet est structuré de manière modulaire pour garantir une maintenance facile et une évolutivité. Voici l'architecture de base :

- **Frontend** :
    - **Pages** : Pages Vue.js pour gérer la logique et la présentation des vues.
    - **Composants** : Tâches, formulaires, notifications, etc.
    - **Store (Vuex)** : Gestion de l'état global de l'application.
    - **Services** : Communication avec l'API backend.
    
- **Backend** :
    - **API** : Endpoints REST pour la gestion des tâches, authentification, etc.
    - **Modèles** : Schémas Mongoose pour la gestion des données.
    - **Services** : Logique métier, gestion des notifications et rappels.

---

## **Tests**

### Tests unitaires

Les tests unitaires sont utilisés pour valider la logique métier et les composants individuels.

```bash
# Pour tester le frontend
cd frontend
npm run test

# Pour tester le backend
cd backend
npm run test
```

### Tests d'intégration

Les tests d'intégration valident les interactions entre les différents composants du système.

```bash
cd backend
npm run integration-test
```

### Tests End-to-End (E2E)

Les tests E2E assurent que l'application fonctionne comme prévu du début à la fin, y compris la communication entre le frontend et le backend.

```bash
cd frontend
npm run e2e
```

---

## **CI/CD**

Le projet utilise **GitHub Actions** pour l'intégration continue et le déploiement continu.

- **Tests** : Les tests sont exécutés sur chaque pull request.
- **Déploiement** : Lors de la fusion dans la branche `main`, l'application est automatiquement déployée sur un environnement de staging, puis en production après validation.

---

## **Qualité du code**

### Linting et formatage

EffiTask utilise **ESLint** et **Prettier** pour garantir un code cohérent, lisible et sans erreurs.

- **Linting** : `eslint`
- **Formatage** : `prettier`

Vous pouvez exécuter ces commandes pour vérifier et formater le code :

```bash
# Pour vérifier le code
npm run lint

# Pour formater le code
npm run format
```

### Couverture de code

Nous avons pour objectif de maintenir une couverture de tests d'au moins 90 %. Vous pouvez vérifier la couverture de code avec la commande suivante :

```bash
npm run coverage
```

### Analyse statique

Nous utilisons **SonarQube** pour analyser le code et détecter les vulnérabilités, les erreurs et les problèmes de performance.

```bash
sonar-scanner
```

---

## **Contribution**

Nous encourageons les contributions à **EffiTask** ! Pour contribuer, suivez ces étapes :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature-xyz`).
3. Apportez vos modifications.
4. Exécutez tous les tests pour vous assurer qu'ils passent.
5. Soumettez une pull request avec une description détaillée des changements.

---

## **Licence**

EffiTask est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

### **Exemple de section qualité logicielle détaillée :**

```markdown
## **Qualité Logicielle**

EffiTask respecte les bonnes pratiques pour garantir une qualité de code optimale :

- **Test-Driven Development (TDD)** : Nous pratiquons TDD pour toutes les nouvelles fonctionnalités. Les tests sont écrits avant l'implémentation de la fonctionnalité.
- **Code Review** : Chaque contribution passe par une revue de code pour s'assurer de la qualité du code et de la conformité aux standards.
- **Pair Programming** : Certaines tâches sont réalisées en pair programming pour favoriser l'échange de connaissances et assurer une meilleure qualité du code.
- **Couverture de tests** : Un objectif de couverture de tests de 90 % est maintenu, avec un focus sur les tests unitaires et d'intégration.
```

---
