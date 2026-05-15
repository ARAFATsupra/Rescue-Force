# ITM Rescue Force v4.0

**A fully offline, AI-powered emergency response platform built for Bangladesh.**

> No API. No server. No internet required for AI. Everything runs directly in the browser.

---

## Overview

ITM Rescue Force is a web-based emergency response and disaster management platform developed at Daffodil International University, Bangladesh. The platform combines a public-facing emergency portal with a secure admin control panel, powered by a custom-built offline AI assistant called **RescueGPT**.

The system is designed to remain fully functional in disaster scenarios where internet connectivity is unavailable. All AI logic runs entirely in the browser using a weighted intent-scoring engine built in vanilla JavaScript.

---

## Live Demo

Open `index.html` directly in any modern browser. No setup, no server, no internet connection needed.

To deploy online: drag the project folder to [netlify.com/drop](https://netlify.com/drop). Live in under 30 seconds.

---

## File Structure

```
rescue_force/
├── index.html              Main public website
├── style.css               Complete design system (dark + light themes)
├── app.js                  Core JS: chatbot UI, GPS form, animations
├── rescuegpt-engine.js     Offline AI engine (no API, no internet)
├── admin.html              Admin control panel
├── admin.js                Admin logic: dispatch, drones, AI advisor
└── README.md               Project documentation
```

---

## Features

### Public Website — `index.html`

| Section | Description |
|---|---|
| Hero | Cinematic animated title, live command card, stat counters |
| Ticker | Scrolling Bangladesh emergency hotlines |
| About | Mission / Vision / Values with animated cards |
| How It Works | IT / Management / AI pillars with flow diagram |
| Team | 6 role cards with live status indicators |
| Report Emergency | GPS-enabled form, saves to localStorage |
| Live Dashboard | Google Maps integration, 4 stat cards, team status tracker |
| RescueGPT | Fully offline AI chatbot with 12 quick topic buttons |
| First Aid Guide | 6 quick reference cards |
| Footer | Hotlines, links, contact information |
| Float Button | Fixed pulsing CALL 999 emergency button |

### Admin Panel — `admin.html`

| Panel | Description |
|---|---|
| Login | Protected with credentials (see below) |
| Vehicle Dispatch | 4 vehicles with animated status and dispatch log |
| Drone Control | 3 drones with live feed simulation, battery countdown |
| Mission Log | Filterable table: All / Active / Completed |
| Emergency Reports | All public form submissions with severity badges |
| Team Status | Live dropdowns to update each member's status |
| Resources | 8 resource cards with animated fill bars |
| AI Coordination | 4 offline AI panels: route, flood, resource, hospital |
| AI Mission Advisor | Tactical advisor powered by RescueGPT + military knowledge base |
| Analytics | KPI stats, animated bar chart, mission type breakdown |

---

## RescueGPT — Offline AI Engine

RescueGPT is a custom intent-scoring AI engine built entirely in JavaScript. It requires no external API, no server, and no internet connection.

### How It Works

1. Every user message is scored against 22+ emergency knowledge topics
2. Weighted keyword matching and exact intent detection are applied
3. Conversation context is tracked across turns
4. Rich, detailed responses are returned with follow-up suggestions
5. Graceful fallback handles unrecognized questions

### Topics Covered

| Category | Topics |
|---|---|
| Natural Disasters | Flood safety, cyclone preparedness, earthquake survival |
| Fire & Gas | Fire emergency, gas leak response, building collapse |
| Medical First Aid | CPR, bleeding control, burns, choking, snake bite, heatstroke, drowning |
| Accidents | Road accidents, animal rescue |
| Public Health | Infectious disease response, mental health crisis |
| Preparedness | Disaster prep, water purification, first aid kit guide |
| Bangladesh-Specific | Emergency hotlines, weather alerts |

### Why Fully Offline?

- Works in disaster zones with no internet
- No cost, no API key, no expiry
- Instant responses with zero network latency
- Complete privacy — no data ever leaves the browser
- Never goes down, never rate-limited

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| AI Engine | Custom JavaScript intent-scoring engine |
| Styling | CSS custom properties, dark/light theming, CSS animations |
| Storage | Browser localStorage for form data and user preferences |
| Maps | Google Maps embed |
| Deployment | Static hosting (Netlify, GitHub Pages, or local file system) |

---

## Design System

- **Themes**: Full dark and light mode, toggle via sun/moon button in the navbar. Preference persists across sessions via localStorage.
- **Animations**: Intersection Observer-based counter animations, scroll-triggered reveals, pulsing status indicators, animated fill bars.
- **Responsive**: Mobile-first layout with hamburger navigation for small screens.
- **Accessibility**: Semantic HTML, ARIA labels, keyboard-navigable UI.

---

## Admin Credentials

```
Username: admin
Password: rescue2025
```

> Note: These credentials are stored client-side and intended for academic demonstration only. Do not use in a production environment without a proper authentication backend.

---

## Bangladesh Emergency Numbers

| Number | Service |
|---|---|
| 999 | National Emergency |
| 108 | Ambulance |
| 101 | Fire Brigade |
| 100 | Police |
| 104 | Disaster Management |
| 181 | Women & Children Helpline |
| 16789 | Mental Health |
| 1906 | Gas Emergency |
| 112 | Global Emergency |

---

## How to Run Locally

1. Download or clone this repository
2. Open the `rescue_force` folder
3. Double-click `index.html` — it opens directly in Chrome or Firefox
4. No build step, no dependencies, no configuration needed

---

## How to Deploy Online

**Netlify Drop (fastest)**
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the `rescue_force` folder onto the page
3. The site is live instantly with a public URL

**GitHub Pages**
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Set source to the `main` branch and root folder
4. The site will be published at `https://yourusername.github.io/repository-name`

---

## Project Context

This platform was developed as part of an academic project at **Daffodil International University**, Bangladesh, demonstrating the integration of three disciplines:

- **IT** — Real GPS integration, localStorage, progressive web animations
- **Management** — Role-based teams, mission tracking, resource inventory
- **AI** — Offline intent-scoring chatbot and tactical mission advisor

---

## Team

Developed by ITM Rescue Force  
Daffodil International University  
Bangladesh · 2025

---

## License

This project is developed for academic and educational purposes.  
All rights reserved by the ITM Rescue Force team, Daffodil International University, 2025.
