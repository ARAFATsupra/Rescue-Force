# ITM Rescue Force

**Bangladesh Emergency Response System — Powered by IT, Management and Artificial Intelligence**

> 100% Offline AI · No API · No Server · No Internet Required for AI

**Live Site:** [remarkable-pothos-937353.netlify.app](https://remarkable-pothos-937353.netlify.app/)

---

## What is ITM Rescue Force?

ITM Rescue Force is a fully offline-capable, AI-powered emergency response platform built for Bangladesh. It combines a public-facing emergency portal with a secure admin control panel, all powered by **RescueGPT** — a custom offline AI assistant that runs entirely inside the browser with zero internet dependency.

The platform demonstrates three disciplines working together:

- **I — Information Technology**: Web platform, GPS tracking, UAV drones, mission database, live command dashboard
- **T — Management**: Role-based team coordination, mission tracking, resource logistics, post-mission reporting
- **M — AI**: Route optimization, flood/cyclone forecasting, resource allocation, offline RescueGPT assistant

> ITM = Information Technology + Management — Together, saving lives.

---

## Live Demo

**Public Site:** [https://remarkable-pothos-937353.netlify.app/](https://remarkable-pothos-937353.netlify.app/)  
**Admin Panel:** [https://remarkable-pothos-937353.netlify.app/admin](https://remarkable-pothos-937353.netlify.app/admin)

To run locally: unzip the folder and open `index.html` directly in Chrome or Firefox. No setup, no server, no internet needed.

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

## Public Website — `index.html`

### Hero Section
Cinematic animated title with live command status card showing real-time mission data:
- 3 Active Missions
- 7 Teams on Standby
- 142 Missions Completed
- 4 Drones Active

Animated stat counters: Hours Active, Districts Covered, Missions Completed, Lives Protected.

### Emergency Ticker
Continuously scrolling bar showing all Bangladesh emergency hotlines across the full viewport.

### About Section
Mission, Vision, and Values with animated cards explaining the ITM philosophy.

### How It Works
Three-pillar breakdown of Information Technology, Management, and AI with a five-step operational flow:  
Emergency Report → AI + HQ Analysis → Team Dispatch → Rescue Operation → Mission Report

### Team — Our Rescue Force
Six specialized role cards with live status indicators:

| Role | Name | District | Default Status |
|---|---|---|---|
| Commander | Cmdr. Rafiq | Dhaka | On Mission |
| Medic Lead | Dr. Nadia Islam | Dhaka | On Mission |
| Drone Pilot | Pilot Arif | Comilla | On Mission |
| Field Rescuer | Rescuer Sumon | Chittagong | Available |
| Comms Officer | Comms Bristy | Sylhet | Standby |
| Engineer | Eng. Kamal | Rajshahi | Available |

### Emergency Reporting Form
GPS-enabled public form with fields for name, phone, emergency type, location, description, and severity level (Low / Medium / High / Critical). Submissions saved to localStorage and routed to the admin panel.

Emergency types covered: Fire/Explosion, Flood/Water Emergency, Road Accident, Health/Medical Emergency, Cyclone/Storm, Earthquake/Building Collapse, Gas Leak, Animal Rescue, Other.

### Live Dashboard
Google Maps embed centered on Bangladesh with 4 live stat cards and the full team status tracker table.

### RescueGPT AI Chatbot
Fully offline AI assistant with quick topic buttons. Described in detail in the section below.

### First Aid Quick Reference
Six essential first aid cards:

| Topic | Key Action |
|---|---|
| Severe Bleeding | Direct pressure, elevate limb, maintain for 15 minutes |
| Burns | Cold running water for 20 minutes, never use ice or butter |
| Choking | 5 back blows, 5 abdominal thrusts (Heimlich maneuver) |
| CPR | 30 compressions at 100–120/min, 5cm deep, then 2 rescue breaths |
| Heatstroke | Cool shade, ice packs to neck/armpits/groin, call 108 |
| Snake Bite | Immobilize limb, go to hospital within 4 hours for antivenom |

### Footer
Emergency hotlines, navigation links, contact email, and the fixed pulsing CALL 999 float button.

---

## Admin Panel — `admin.html`

**Login:** `admin` / `rescue2025`  
URL: [/admin](https://remarkable-pothos-937353.netlify.app/admin)

> Note: Credentials are stored client-side for academic demonstration purposes only.

### Vehicle Dispatch
Four AI-coordinated rescue vehicles with animated status indicators and a live dispatch log:

| Vehicle | Key Features |
|---|---|
| AI Ambulance Unit | Smart GPS routing, hospital pre-alert, onboard medical AI, patient vitals monitoring |
| AI Fire Rescue Unit | Drone-integrated fire mapping, thermal imaging, hazmat detection, AI foam/water optimization |
| Rescue Helicopter | Aerial hoist system, thermal survivor detection, remote area access, live command video |
| Flood Rescue Boat | 20-person capacity, sonar depth scanner, high-speed navigation, emergency supplies |

### Drone Command Center
Three UAV types with battery countdown timers and a live feed simulation panel:

| Drone | Capability |
|---|---|
| Surveillance Drone Alpha | 4K video, 12km range, night vision, 45-min endurance |
| Thermal Search Drone Beta | Infrared camera, through-smoke detection, GPS survivor pinpointing |
| Supply Drone Gamma | 5kg payload, precision GPS delivery, auto-return safety mode |

### Mission Log
Filterable operational history table: All / Active / Completed missions with ID, type, location, team, start time, and status.

### Emergency Reports
All public form submissions displayed with severity badges. Supports bulk clearing.

### Team Status Management
Live table to update each team member's status in real time via dropdown selectors.

### Resource Inventory
Eight resource cards with animated fill bars tracking equipment and supply levels across all units.

### AI Smart Coordination (Offline)
Four offline AI decision-support panels:

| Panel | Function |
|---|---|
| Route Optimizer | Fastest, safest routes to active emergency zones avoiding traffic |
| Flood Risk Predictor | Predicts high-risk zones for the next 24 hours based on weather and topography |
| Resource Recommender | Suggests optimal tools per mission type and team composition |
| Hospital Coordinator | Nearest hospitals, bed availability, automatic pre-alerts |

### AI Mission Advisor
Offline tactical advisor powered by RescueGPT with a military knowledge base for strategic mission guidance.

### Analytics Dashboard
Key performance metrics with animated visualizations:

| Metric | Value |
|---|---|
| Total Missions | 142 |
| Success Rate | 98% |
| Average Response Time | 7.2 minutes |
| Lives Protected | 1,247 |

Mission type breakdown: Flood Response 38%, Fire Rescue 24%, Road Accident 21%, Health Emergency 17%.  
Monthly mission count bar chart spanning November through May.

---

## RescueGPT — Offline AI Engine

RescueGPT is a custom intent-scoring AI engine built entirely in vanilla JavaScript. No API key. No server call. No internet. It runs directly in the browser.

### How It Works
1. Every message is scored against 22+ emergency knowledge topics
2. Weighted keyword matching and exact intent detection are applied
3. Conversation context is tracked across multiple turns
4. Rich responses are returned with follow-up suggestion chips
5. Graceful fallback handles unrecognized questions

### Topics Covered

| Category | Topics |
|---|---|
| Natural Disasters | Flood safety, cyclone preparedness, earthquake survival |
| Fire and Gas | Fire emergency, gas leak, building collapse |
| Medical First Aid | CPR, bleeding, burns, choking, snake bite, heatstroke, drowning |
| Accidents | Road accidents, animal rescue |
| Public Health | Infectious disease, mental health crisis |
| Preparedness | Disaster prep, water purification, first aid kit |
| Bangladesh-Specific | Emergency hotlines, weather alerts |

### Why Fully Offline?
- Works in disaster zones with no internet connection
- No cost, no API key, no account, no expiry
- Instant responses with zero network latency
- Complete privacy — no data ever leaves the browser
- Always available — no downtime, no rate limits

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript (ES6+) |
| AI Engine | Custom JavaScript intent-scoring engine |
| Styling | CSS custom properties, dark/light theme system, CSS animations |
| Storage | Browser localStorage for forms, settings, and preferences |
| Maps | Google Maps embed |
| Deployment | Netlify (live) / works on any static hosting or locally |

---

## Design System

- **Dark / Light Theme**: Toggle via sun/moon button in the navbar. Preference persists in localStorage and is shared across the main site and admin panel.
- **Animations**: Intersection Observer-triggered counter animations, scroll-reveal sections, pulsing status indicators, animated resource bars.
- **Responsive**: Mobile-first with hamburger navigation for small screens.
- **Typography**: Designed for clarity under stress — large, readable type hierarchy.

---

## Bangladesh Emergency Numbers

| Number | Service |
|---|---|
| 999 | National Emergency |
| 108 | Ambulance |
| 101 | Fire Brigade |
| 100 | Police |
| 104 | Disaster Management |
| 181 | Women and Children Helpline |
| 16789 | Mental Health |
| 1906 | Gas Emergency |
| 112 | Global Emergency |

---

## How to Run Locally

1. Download or clone this repository
2. Open the `rescue_force` folder
3. Double-click `index.html` — opens directly in Chrome or Firefox
4. For the admin panel, open `admin.html` or navigate to it from the site navbar

No build step. No dependencies. No configuration.

---

## How to Deploy

**Netlify Drop**
1. Go to [netlify.com/drop](https://netlify.com/drop)
2. Drag the `rescue_force` folder onto the page
3. Live instantly with a public URL

**GitHub Pages**
1. Push this repository to GitHub
2. Go to Settings > Pages
3. Set source to the `main` branch and root folder
4. Published at `https://yourusername.github.io/repository-name`

---

## Project Context

Developed as an academic project at **Daffodil International University**, Bangladesh, demonstrating the integration of three disciplines through a real-world emergency response system.

**Contact:** itmrescueforce@gmail.com  
**Department:** ITM Dept, Bangladesh

---

## Team

Developed by ITM Rescue Force  
Daffodil International University  
Bangladesh · 2025

---

## License

Developed for academic and educational purposes.  
All rights reserved by the ITM Rescue Force team, Daffodil International University, 2025.
