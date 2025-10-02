# MovieFlix - Aplicação Web Estática com Docker e Nginx

## Descrição

O **MovieFlix** é uma aplicação web simples contendo arquivos estáticos (**HTML, CSS e JS**) que simulam uma página de filmes.  
A aplicação é empacotada em um **container Docker** e servida pelo **Nginx**.

O projeto também possui um **workflow GitHub Actions** para build, teste e push da imagem Docker automaticamente para o **Docker Hub**.

---

## Arquitetura

## Arquitetura da Aplicação (ASCII)

        ┌─────────────┐
        │  Navegador  │
        │  (Browser)  │
        └─────┬───────┘
              │ HTTP Request
              ▼
        ┌─────────────┐
        │   Nginx     │
        │ (Container) │
        └─────┬───────┘
              │ Servindo arquivos estáticos
              ▼
    ┌─────────────────────┐
    │   Aplicação Web     │
    │  HTML | CSS | JS    │
    │       (src/)        │
    └─────────────────────┘

- **Frontend:** HTML, CSS e JS (estáticos)
- **Servidor web:** Nginx rodando dentro do container Docker
- **CI/CD:** GitHub Actions para build, teste e push da imagem
- **Repositório Docker:** Docker Hub (`pedronevesb/movieflix`)

---

## Requisitos

- Docker instalado
- Git (para clonar o repositório)
- Navegador para acessar a aplicação

---

## Como rodar localmente

1. Clone o repositório:

```bash
git clone https://github.com/pedronb/movieflix.git
cd movieflix
```

2. Build da imagem Docker:

```bash
docker build -t pedronevesb/movieflix:latest .
```

3. Rodar o container:

```bash
docker run -d -p 8080:80 pedronevesb/movieflix:latest
```

4. Acesse a aplicação no navegador:

```bash
http://localhost:8080
```
