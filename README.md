# ITes Frontend

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> Frontend of **ITes** — a platform for organizing IT competitions, hackathons, freelance orders, and team building.

ITes is a web platform that connects **participants**, **organizers**, and **customers** in one ecosystem. Users can participate in competitions, find teammates, publish freelance orders, build a portfolio, and manage applications through a personal dashboard.

Originally created during a hackathon, the project has since been significantly expanded and improved.

## Features

### Authentication

* Registration and login
* Role-based accounts:

  * Participant
  * Organizer
  * Client

### Participant

* Browse competitions, orders, and teams
* Apply to competitions
* Apply to freelance orders
* Apply to join teams
* Create teams
* Choose a role in a team:

  * Developer
  * Designer
  * Manager
  * Marketer
* Build a portfolio based on submitted applications

### Organizer

* Create IT competitions and events
* Edit competition descriptions using a Markdown editor
* Manage participant applications
* Approve or reject applications through the dashboard

### Client

* Publish freelance orders
* Review incoming applications
* Accept or reject candidates

### User Profile

* Edit profile information
* Upload an avatar
* Manage personal information

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* React Hook Form
* Zod
* shadcn/ui
* Lucide Icons

### Backend

The backend is developed as a separate project.

Main technologies:

* ASP.NET Core
* Entity Framework Core
* PostgreSQL
* Docker, Docker Compose
* JWT Authentication

Repository:

* [**ites-backend**](https://github.com/gurori/ites-backend)

## Project Structure

```text
public/

src/
├── app/
├── components/
└── lib/
    ├── hooks/
    ├── services/
    ├── types/
    ├── apiFetch.ts
    ├── constants.ts
    ├── format.ts
    ├── utils.ts
    └── zod-schemas.ts
```

## Running Locally

### Requirements

* [Node.js](https://nodejs.org/en/download)
* [npm](https://docs.npmjs.com/cli/v11/configuring-npm/install)

### Installation

```bash
git clone https://github.com/gurori/ites-frontend.git

cd ites-frontend

npm install

npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

## Live Demo

The frontend is deployed on Vercel:

https://ites.vercel.app

## Project Status

The project is under active development. New features, UI improvements, and backend functionality continue to be added.

## About

This project demonstrates experience with:

* building large-scale React/Next.js applications
* authentication and authorization
* role-based interfaces
* complex forms and validation
* Markdown editor integration
* responsive UI development
* interaction with ASP.NET Core REST APIs
* deploying production-ready Next.js applications using Vercel

## License

All rights reserved.

The source code is publicly available for viewing and educational purposes only.
No permission is granted to use, copy, modify, distribute, or deploy this software
without explicit written permission from the copyright holder.
