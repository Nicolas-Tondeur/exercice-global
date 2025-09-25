[![CI/CD Pipeline](https://github.com/Nicolas-Tondeur/exercice-global/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Nicolas-Tondeur/exercice-global/actions/workflows/pipeline.yml) \
https://github.com/Nicolas-Tondeur/exercice-global/actions/runs/18015026928

#Exercice Final: Projet CI/CD & Déploiement Multi-Environnements (DEV/PROD)

## 1. Contexte du Projet
Ce projet vise à automatiser entièrement le cycle de vie d'une application Web, du code source au déploiement en production, en utilisant une chaîne d'intégration et de déploiement continu (CI/CD).


Scénario: Déploiement multi-environnements d'une application Web.


Outils Principaux: GitHub pour la gestion du code et des workflows, GitHub Actions pour le pipeline CI/CD, et Ansible pour l'automatisation du déploiement.

Environnements Cibles:

Serveur de Développement (serveur-dev) 
Serveur de Production (serveur-prod) 

Les deux serveurs sont simulés par des conteneurs Docker pour reproduire un scénario réel de déploiement multi-environnements.


## 2. Architecture du Dépôt
La structure du dépôt suit les bonnes pratiques pour un projet Ansible intégré à un pipeline CI/CD:

<img width="186" height="738" alt="image" src="https://github.com/user-attachments/assets/dec29e75-fb21-4f29-a74b-073ce2e124a0" />


## 3. Configuration des Environnements Cibles (Étape 2)

Pour des raisons de praticité, l’environnement Docker tourne sur une instance EC2 sur AWS.
 
<img width="1510" height="555" alt="image" src="https://github.com/user-attachments/assets/afe8bdbd-2436-40ac-b312-150529afd091" />


Les serveurs sont des conteneurs Docker avec accès SSH configuré.

Environnement	  Hôte Simulé	    Port Externe	Branche Déployée
   DEV	        serveur-dev	       2222	            dev
   PROD	        serveur-prod	       2200	            main

On a récupéré les Clés SSH de l'instance EC2 et des 2 conteneurs prod & dev pour les ajouter aux secrets GitHub.
<img width="945" height="312" alt="image" src="https://github.com/user-attachments/assets/daf9cdb4-a4c4-4a88-9b63-85cf53355466" />


## 4. Configuration Ansible (Étapes 3 & 4)
Inventaires (ansible/inventory/)
Les fichiers dev.ini et prod.ini définissent les variables de connexion (hôte, port, utilisateur) spécifiques à chaque environnement. Les mots de passe et clés SSH sont gérés par des mécanismes sécurisés (GitHub Secrets ou Ansible Vault).


Playbooks (ansible/playbooks/)
Les playbooks sont conçus pour être spécifiques à un environnement:
deploy-dev.yml / deploy-prod.yml:

Installation des dépendances: Installe les prérequis comme git, node (si nécessaire) et le serveur web nginx.

Exécution du Rôle app: Clone le dépôt depuis GitHub et lance une commande de build ou d'exécution spécifique à l'application.

Vérification: Crée un fichier de log ou une page de confirmation pour valider le déploiement.


## 5. Pipeline CI/CD avec GitHub Actions (Étapes 5 & 6)
Le workflow est défini dans .github/workflows/pipeline.yml.

### 5.1. Gestion des Secrets (Étape 5)
Les clés privées SSH nécessaires à Ansible pour se connecter aux serveurs Docker sont stockées dans les GitHub Secrets. DEV_SSH_KEY & PROD_SSH_KEY

Cela garantit qu'aucun credential n'est stocké en clair dans le dépôt.

### 5.2. Logique du Déploiement (Étape 6)
Le pipeline se déclenche automatiquement sur un push vers les branches dev ou main.

Action sur la Branche	Pipeline CI (Test & Lint)	Pipeline CD (Déploiement Ansible)
push sur dev : Exécuté 

Déploiement sur serveur-dev (via deploy-dev.yml) 

push ou merge sur main : Exécuté 

Déploiement sur serveur-prod (via deploy-prod.yml) 


## 6. Validation et Tests Finaux (Étape 7)
Pour valider le bon fonctionnement de la chaîne CI/CD :

Test DEV: Pousser une modification sur la branche dev. Le workflow doit se déclencher et l'application mise à jour doit être visible sur serveur-dev (Port 2222).

Test PROD: Fusionner la branche dev dans main. Le workflow de déploiement Production doit être déclenché, mettant à jour l'application sur serveur-prod (Port 2200).

Vérification: Les logs et la page de confirmation doivent être présents sur les deux serveurs pour attester de la bonne exécution des playbooks.

Rendu final du site. On y accède via l’adresse ip publique de notre instance EC2 AWS.
<img width="1524" height="835" alt="image" src="https://github.com/user-attachments/assets/f61a75fa-dc52-44a4-8ebd-a95c5ab2a2f1" />






