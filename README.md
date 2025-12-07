# ZANT - Intelligent Workplace Accident Reporting System

[![Java](https://img.shields.io/badge/Java-21-ED8B00?logo=openjdk)](https://openjdk.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?logo=springboot)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite)](https://vitejs.dev/)

## Table of Contents

- [Project Description](#project-description)
- [Tech Stack](#tech-stack)
- [Getting Started Locally](#getting-started-locally)
- [Available Scripts](#available-scripts)
- [Project Scope](#project-scope)
- [Project Status](#project-status)

## Project Description

**ZANT** is an intelligent system designed to support workplace accident claims and decision-making for the Polish Social Insurance Institution (ZUS), specifically for self-employed individuals.

The project transforms the current complex and stressful accident reporting process into an intuitive digital experience — *"From chaos to clarity"*. The system operates on two parallel tracks:

### 1. Entrepreneur Assistant (Web App)
A guided wizard that helps injured self-employed individuals report workplace accidents step-by-step, translating official legal jargon into understandable language.

### 2. ZUS Analytical Engine (Internal Tool)
Automates document analysis, verifies statement consistency, and generates draft decisions (Legal Opinions and Accident Cards) for ZUS officials.

**Key Benefits:**
- 📝 Reduces formal errors in accident reports
- ⏱️ Shortens case processing time
- 🤖 AI-powered assistance with document analysis and legal classification
- 📊 Automatic inconsistency detection between testimonies

> This product is developed as a response to the **HackNation 2025** challenge.

## Tech Stack

### Backend

#### Core
| Technology | Version | Description |
|------------|---------|-------------|
| Java | 21 | Programming language |
| Spring Boot | 3.5.8 | Application framework |
| Maven | - | Build automation tool |

#### Database & Persistence
| Technology | Description |
|------------|-------------|
| Spring Data JPA | Data access abstraction |
| H2 Database | In-memory database for development |
| Spring JDBC | Database connectivity |

#### API & Documentation
| Technology | Description |
|------------|-------------|
| Spring Web | RESTful web services |
| Spring HATEOAS | Hypermedia-driven REST APIs |
| SpringDoc OpenAPI | API documentation (Swagger UI) |

#### Document Processing
| Technology | Description |
|------------|-------------|
| Apache PDFBox | PDF generation and manipulation |
| docx4j | DOCX document processing |

#### Developer Tools
| Technology | Description |
|------------|-------------|
| Lombok | Boilerplate code reduction |
| MapStruct | Object mapping |
| Spring DevTools | Development productivity |

---

### Frontend

#### Core
| Technology | Version | Description |
|------------|---------|-------------|
| React | 19.2 | UI library for building user interfaces |
| TypeScript | 5.9 | Type-safe JavaScript |
| Vite | 7.2 | Next-generation frontend build tool |

### Styling & UI
| Technology | Description |
|------------|-------------|
| Tailwind CSS v4 | Utility-first CSS framework |
| Shadcn/ui | Re-usable component library |
| Lucide React | Beautiful & consistent icon library |
| tw-animate-css | Animation utilities |

### Forms & Validation
| Technology | Description |
|------------|-------------|
| React Hook Form | Performant form management |
| Zod | TypeScript-first schema validation |
| @hookform/resolvers | Validation resolvers |

### Utilities
| Technology | Description |
|------------|-------------|
| clsx / tailwind-merge | Conditional class utilities |
| class-variance-authority | Component variant management |
| date-fns | Date manipulation library |
| react-router-dom | Client-side routing |
| react-pdf | PDF rendering |

### AI Integration
| Technology | Description |
|------------|-------------|
| @openrouter/sdk | OpenRouter API integration for LLM capabilities |

### Quality & Workflow
| Technology | Description |
|------------|-------------|
| ESLint 9 | Code linting |
| Prettier | Code formatting |
| Husky | Git hooks |
| Vitest | Unit testing framework |

## Getting Started Locally

### Prerequisites

- **Java** >= 21
- **Maven** >= 3.9
- **Node.js** >= 18.0.0
- **npm** >= 9.0.0 (or yarn/pnpm)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/hacknation-task.git
   cd hacknation-task
   ```

#### Backend Setup

2. **Navigate to the backend directory**
   ```bash
   cd backend
   ```

3. **Run the Spring Boot application**
   ```bash
   ./mvnw spring-boot:run
   ```
   
   The API will be available at `http://localhost:8080`
   
   Swagger UI: `http://localhost:8080/swagger-ui.html`

#### Frontend Setup

4. **Navigate to the frontend directory** (in a new terminal)
   ```bash
   cd frontend
   ```

5. **Install dependencies**
   ```bash
   npm install
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## Available Scripts

### Backend (from `backend` directory)

| Command | Description |
|---------|-------------|
| `./mvnw spring-boot:run` | Starts the Spring Boot server |
| `./mvnw clean install` | Builds the project and runs tests |
| `./mvnw test` | Runs unit tests |
| `./mvnw package` | Creates executable JAR file |

### Frontend (from `frontend` directory)

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Compiles TypeScript and builds for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check for code issues |
| `npm run prepare` | Sets up Husky git hooks |

## Project Scope

### In Scope (MVP - HackNation 2025)

#### Module A: Entrepreneur Assistant
- ✅ Report type selection (Notification, Injured Statement, or both)
- ✅ Business data retrieval simulation (NIP/REGON mockup with CEIDG)
- ✅ AI-powered intelligent interview (max 3 clarifying questions)
- ✅ Soft validation with educational warnings
- ✅ PDF document generation with JSON data export

#### Module B: ZUS Analyst Panel
- ✅ OCR document digitalization (PDF/JPG/PNG, including handwriting)
- ✅ Split-screen view (scan on left, extracted text on right)
- ✅ Traffic Light Widget for 4 accident criteria assessment
- ✅ Discrepancy Dashboard for testimony comparison
- ✅ Draft Decision Generator (Legal Opinion + Accident Card)
- ✅ Medical referral recommendations (flagging only)

### Out of Scope
- ❌ Real integration with government systems (PUE ZUS, CEIDG, PESEL Registry)
- ❌ Full GDPR encryption and security (demo uses anonymized/test data)
- ❌ Mobile application
- ❌ Legally binding AI decisions (AI serves advisory role only)

## Project Status

🚧 **Status: In Development (MVP Phase)**

This project is currently being developed as part of the **HackNation 2025** hackathon. The focus is on delivering a functional prototype demonstrating the "Happy Path" user journeys.

### Success Metrics

| Metric | Target |
|--------|--------|
| Time to completion | Full demo path < 3 minutes |
| OCR accuracy | Key fields correct in 4/5 test scenarios |
| Legal classification | Correct recommendation in 5 test cases |

---

<div align="center">

**Made with ❤️ for HackNation 2025**

</div>
