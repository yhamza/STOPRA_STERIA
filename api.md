### API Utilisateur
#### Créer un Utilisateur
Méthode : POST
URL : /user
Guards : JwtAuthGuard, RolesGuard
Rôle requis : ADMIN
Corps : CreateUserDto
#### Les DTOs :
```json{
  "CreateUserDto": {
    "email": "string",
    "password": "string",
    "role": "string"
  },
  "UpdateUserDto": {
    "email": "string",
    "password": "string",
    "role": "string"
  },
  "LoginUserDto": {
    "email": "string",
    "password": "string"
  },
  "RegisterUserDto": {
    "email": "string",
    "password": "string",
    "role": "string"
  }
}
```

#### Se Connecter
Méthode : POST
URL : /user/login
Corps : LoginUserDto
#### Obtenir le Profil de l'Utilisateur
Méthode : GET
URL : /user/profile
Guards : JwtAuthGuard, RolesGuard
Rôles requis : ADMIN ou USER
En-tête : Authorization: Bearer <token>
#### Se Déconnecter
Méthode : GET
URL : /user/logout/:userId
Guards : JwtAuthGuard, RolesGuard
Rôles requis : ADMIN ou USER
Paramètre de requête : userId
#### Obtenir Tous les Utilisateurs
Méthode : GET
URL : /user
Guards : JwtAuthGuard, RolesGuard
Rôle requis : ADMIN
#### Obtenir un Utilisateur par ID
Méthode : GET
URL : /user/:id
Guards : JwtAuthGuard
Rôle requis : ADMIN
Paramètre : id (ID de l'utilisateur)
#### Mettre à Jour un Utilisateur
Méthode : PATCH
URL : /user/:id
Guards : JwtAuthGuard, RolesGuard
Rôle requis : ADMIN
Paramètre : id (ID de l'utilisateur)
Corps : UpdateUserDto
#### Supprimer un Utilisateur
Méthode : DELETE
URL : /user/:id
Guards : JwtAuthGuard, RolesGuard
Rôle requis : ADMIN
Paramètre : id (ID de l'utilisateur)
### API Interaction
#### Créer une Nouvelle Interaction
Méthode : POST
URL : /interactions
Corps : CreateInteractionDto
#### Obtenir les Interactions par ID Utilisateur
Méthode : GET
URL : /interactions/:userId
Guards : JwtAuthGuard, RolesGuard
Rôles requis : ADMIN ou MODERATOR
Paramètre : userId
#### Supprimer les Interactions par ID Utilisateur
Méthode : DELETE
URL : /interactions/:userId
Guards : JwtAuthGuard, RolesGuard
Rôle requis : ADMIN
Paramètre : userId
#### Définir un Cache pour un Utilisateur
Méthode : GET
URL : /interactions/setCaches/:userId
Paramètre : userId
### API Caches
#### Sauvegarder le Cache dans la Base de Données
Méthode : POST
URL : /caches
Corps : CreateCacheDTO
#### Obtenir Tous les Caches
Méthode : GET
URL : /caches
#### Obtenir le Cache pour un Utilisateur Spécifique
Méthode : GET
URL : /caches/:userId
Paramètre : userId
### API Statistiques
#### Sauvegarder les Statistiques d'un Utilisateur
Méthode : POST
URL : /statistics
Guards : JwtAuthGuard, RolesGuard
Rôles requis : ADMIN ou MODERATOR
Corps : StatisticsEntity
#### Obtenir les Statistiques d'un Utilisateur Spécifique
Méthode : GET
URL : /statistics/:userId
Guards : JwtAuthGuard, RolesGuard
Rôles requis : ADMIN ou MODERATOR
Paramètre : userId
#### Obtenir les Statistiques de Tous les Utilisateurs
Méthode : GET
URL : /statistics
Guards : JwtAuthGuard, RolesGuard
Rôles requis : ADMIN ou MODERATOR
### Stratégie
Authentification de l'Utilisateur
Il existe trois types d'utilisateurs : USER, MODERATOR, et ADMIN.

#### Contrôle d'Accès
Tant que l'utilisateur est authentifié, certaines APIs sont protégées en fonction de son rôle.
ADMIN peut accéder à toutes les APIs.
MODERATOR peut uniquement accéder aux APIs des statistiques.
USER peut se connecter et interagir avec le système, mais ne peut pas accéder aux fonctionnalités administratives.
#### Gestion des Interactions
Les interactions des utilisateurs connectés sont suivies.
Lorsqu'un utilisateur se déconnecte, ses interactions sont enregistrées dans la base de données, et un cache est créé pour cet utilisateur.
Les statistiques sont générées à partir du cache et stockées dans la table des statistiques.
À chaque connexion et déconnexion, le cache est sauvegardé et les statistiques sont générées.
#### Accès Basé sur les Rôles
ADMIN a accès à toutes les APIs.
MODERATOR a accès uniquement aux APIs liées aux statistiques.
USER peut se connecter et interagir avec le système, mais n'a pas accès aux fonctionnalités administratives.