# Application Bancaire Distribuée - Spring Cloud, Agentic AI & Telegram Bot

Projet de synthèse mettant en œuvre une architecture microservices sécurisée intègrent un Agent IA connecté via le protocole MCP (Model Context Protocol), Spring AI, un frontend Angular et un Bot Telegram.

## Architecture du Système

- **Configuration & Découverte** : Spring Cloud Config, Eureka Discovery / Consul
- **Gateway & Sécurité** : Spring Cloud Gateway, Keycloak (OAuth2 / OIDC)
- **Services Métiers** :
    - `Customer-Service` : Gestion des clients (Base DB)
    - `Ebank-Service` : Gestion des comptes bancaires (Communication OpenFeign)
- **Agentic AI & Communication** :
    - `Ebank-Chatbot-Service` : Agent IA développé avec **Spring AI**
    - **MCP (Model Context Protocol)** : Interconnexion entre l'Agent et les Microservices
    - **Bot Telegram** : Interface de chat conversationnelle pour les utilisateurs
- **Frontend** : Application Angular

## Structure du Repository

```text
.
├── config-service/
├── discovery-service/
├── gateway-service/
├── customer-service/
├── ebank-service/
├── ebank-chatbot-service/
├── angular-frontend/
├── docker-compose.yml
└── README.md