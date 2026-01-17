
# Me-API Playground

A very basic full-stack playground that stores my personal profile in a database and exposes it via a small REST API with a minimal frontend to run queries.

This project is built as part of the **Intern – Software & AI Developer assessment (Track A: Backend Assessment)**.

---

## Architecture

- **Backend**: Node.js + Express
- **Database**: SQLite
- **Frontend**: Plain HTML + JavaScript
- **Hosting**:
  - Backend: (Render / Railway)
  - Frontend: (Netlify / Vercel)

---

## Features

- Create / Read / Update personal profile
- List projects and filter by skill
- Search projects using keywords
- Health check endpoint for liveness
- Seeded database with real personal data

---

## API Endpoints

### Health Check
```http
GET /health
````

Returns `200 OK` if the server is running.

---

### Profile

```http
GET /profile
PUT /profile
```

---

### Projects

```http
GET /projects
GET /projects?skill=React
```

---

### Search

```http
GET /search?q=app
```

---

### Top Skills

```http
GET /skills/top
```

---

## Database Schema

The database schema is defined in `schema.sql`.

Tables:

* `profile`
* `skills`
* `projects`

The database is seeded with my real profile data using `seed.sql`.

---

## Local Setup

### Prerequisites

* Node.js (v16+)

### Steps

```bash
git clone <your-repo-url>
cd me-api-playground
npm install
node index.js
```

Backend will start at:

```
http://localhost:3000
```

---

## Frontend Usage

Open the frontend using **VS Code Live Server**:

```
frontend/index.html
```

The UI allows:

* Viewing profile information
* Searching projects by keyword
* Listing projects filtered by skill

---

## Sample cURL Requests

```bash
curl http://localhost:3000/health
curl http://localhost:3000/profile
curl http://localhost:3000/projects?skill=React
curl http://localhost:3000/search?q=app
```

---

## Known Limitations

* No authentication
* Basic UI only
* No pagination or rate-limiting
* SQLite used for simplicity

---

## Live URLs

* **Backend**: [https://your-backend-url.com](https://your-backend-url.com)
* **Frontend**: [https://your-frontend-url.com](https://your-frontend-url.com)

---

## Resume

🔗 [https://your-resume-link.com](https://your-resume-link.com)
