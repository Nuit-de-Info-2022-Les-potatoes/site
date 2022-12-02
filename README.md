## Installation

### Pré-requis

Pour démarrer l'environnement, vous devez avoir les outils suivants :

- [Docker](https://docs.docker.com/compose/)
- [Docker Compose](https://docs.docker.com/)

### Instruction

Pour lancer l'application, il suffit d'utiliser le fichier de configuration de Docker Compose (à la racine du projet) :

```bash
docker-compose up -d
```

L'application est alors accessible à l'adresse  : http://localhost:8080

## Contribution

Le système de versionnage du code source utilisé est [Github](https://github.com/)
est: [https://github.com/Nuit-de-Info-2022-Les-potatoes/site](https://github.com/Nuit-de-Info-2022-Les-potatoes/site)
Nous adoptons une méthode classique en ce qui concerne le versionning de notre projet. En effet, il ne faut jamais push
dans la branche `main` et `dev` qui sont toutes les deux des branches dites “protéger” :

- **La branche main** : permet d’avoir les modifications en production.
- **La branche dev** permet de mettre toutes les tâches finies en attente qui doivent être review avant d’être mis en
  production.
- **Nouvelles fonctionnalités** : Pour pouvoir commencer à créer de nouvelles fonctionnalités, il faut créer une
  nouvelle branche. Ce nom doit être au format : `feat/<nom>`

Une fusion d'une branche doit obligatoirement être réalisée par une pull request.

Il est à noter que l’on utilise une convention de nommage pour les commits disponibles sur ce
lien : [Commits Conventionnels](https://www.conventionalcommits.org/fr/v1.0.0/)

## Répartition des taches

On utilise les tickers Github pour répertorier toutes les fonctionnalités a développé. Pour la répartition des tâches,
on utilise la méthodologie Kanban avec
l'outil [Projet](https://github.com/orgs/Nuit-de-Info-2022-Les-potatoes/projects/2) de Github :

- **Backlogs :** contient la liste des fonctionnalités techniques pas encore plannfiées. Elles sont classées par ordre
  décroissant de priorité (la plus urgente en premier)
- **À faire :** représente les tâches plannifiées.
- **En cours :** représente les fonctionnalités en train d’être développées.
- **Révision du code :** contient les tâches qui sont en attente dans une Pull Request entre la branche de la
  fonctionnalité et celle de développement. Cela signifie que ces tâches sont en relecture ou en attente de relecture.
- **Test :** contient les tâches qui sont attente dans une Pull Request entre la branche de développement et celle
  principale. Elles doivent être validées par un test par un membre de l'équipe avant de réaliser cette fusion.
- **Terminé :** contient toutes les fonctionnalités développées qui se trouvent dans la branche principale

### Definition Of Done

Une tâche est considérée comme finit lorsque le code associé est arrivé dans la branche, en respectant les différentes
étapes évoquée précédemment.
