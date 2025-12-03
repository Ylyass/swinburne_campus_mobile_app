Swinburne Campus Mobile App (PART A – Alpha Release)

A Semester 1 deliverable for COS40005 Computing Technology Project A.

This is Part A (the first half) of the full Final Year Project.
It includes the Alpha version of the Swinburne Campus Mobile App — core features are implemented and publicly accessible, while advanced features will be delivered in Part B (Semester 2).

📱 Live Demo (Web Preview)
https://swinburne-campus-mobile-app.vercel.app/

(The app is still under active development, but this demo version is fully usable and available for testing.)

🧭 Overview

This repository contains the Alpha version of the Swinburne Campus Mobile App, developed in COS40005 (Project A).
The purpose of this release is to demonstrate the foundational capabilities of the system and gather early feedback, while the remaining features will be completed in COS40006 (Project B).

Part A delivers:

Navigation

Emergency Assistance

Early Admin Console

Core UI/UX

Basic Support + Events structure

Part B will deliver:

Full Events module

Full Support Services

Live Chat

Advanced AR navigation

Performance & accessibility refinements

This follows the official plan, milestones, and scope defined in the project documentation.


✨ Features (Part A – Alpha)
✔️ Completed in Part A

Campus navigation (search + routing)

Emergency Services (one-tap security call)

Admin Console MVP (create + approve content)

Content caching for offline access

Core layouts for Events & Support

AR prototype (outdoor waypoint overlay)

Stable mobile-first UI

🔄 Coming in Part B (Semester 2)

Full Events module (filters, bookmarking, event map)

Full Support Services (directory + chat)

Live chat integration with IT Service Desk

Complete AR navigation mode

Accessibility refinement (WCAG AA)

Performance optimization

Admin Console V2

Final production build and handover pack

This structure aligns with your backlog and milestones.


🛠 Tech Stack
Frontend / Mobile

Next.js 14 (App Router)

React + TypeScript

TailwindCSS

Capacitor (for mobile packaging)

Web APIs + sensors (AR prototype)

Backend / Content Layer

Next.js API routes

Managed content store (versioned snapshot)

Token-based administrator auth

⚙️ Run Locally

The project uses one codebase for web and mobile.

npm install
npm run dev


Runs on:

http://localhost:3000


No separate mobile environment — the Capacitor wrapper is used only at packaging time.

🎨 UX & Design

Designed for real-world campus navigation

Clean, modern, mobile-friendly

High contrast, accessible

Large icons for new students

Fast access to emergencies & support

🧠 Technical Highlights
Part A Achievements

<2s load time on mid-range devices

Offline-friendly content caching

Secure admin console workflow

AR overlay prototype

Anonymous, opt-in telemetry foundation

📦 Project Structure
/app
  /navigation
  /events
  /support
  /emergency
  /admin
/lib
/components
/public

🚀 Roadmap
✔️ Part A – Alpha (This Repo)

Core functionality delivered.

▶️ Part B – Beta (Next Semester)

Final full product with events, live chat, AR improvements, and complete handover.
