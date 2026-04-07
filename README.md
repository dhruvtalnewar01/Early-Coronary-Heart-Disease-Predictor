<div align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Grade-00C7B7?style=for-the-badge&logo=medtronic" alt="Status" />
  <img src="https://img.shields.io/badge/Architecture-Agentic%20Microservices-blue?style=for-the-badge&logo=docker" alt="Architecture" />
  <img src="https://img.shields.io/badge/LLM%20Orchestration-LangGraph-FF4F00?style=for-the-badge" alt="LangGraph" />
  <img src="https://img.shields.io/badge/Frontend-Next.js%20%7C%20GSAP-black?style=for-the-badge&logo=next.js" alt="Next.js" />
  
  <br />
  <h1 style="border-bottom: none; margin-bottom: 0;">DRISHTI: Core Intelligence Dashboard</h1>
  <p><b>Advanced Early-Coronary Heart Disease (CHD) Prediction & Autonomous Diagnostic Formulation Framework</b></p>
</div>

***

## 🌐 1. Executive Synopsis & Impact Analysis

The **Early-CHD Predictor Framework (DRISHTI Core)** represents a paradigm shift in autonomous computational cardiology. By decoupling traditional monolithic diagnostic engines and replacing them with a distributed, multi-agent continuous-reasoning pipeline, the framework ingests multivariate clinical telemetry and outputs highly resilient, physician-grade prognoses. 

Designed for longitudinal telemetry integration, the system harmonizes biomarker variance, macroscopic physiological attributes, and established AHA/ESC prognostic algorithms to produce deterministic interventions within an incredibly constrained time envelope using localized and distributed LLM intelligence arrays.

***

## ⚙️ 2. Architectural Topology

The system adheres to a robust, asynchronous, state-driven microservices environment. All computationally expensive machine reasoning is strictly offloaded to a LangGraph-orchestrated backend, leaving the Next.js presentation layer to rapidly stream intelligence via WebSocket and RESTful pipelines.

```mermaid
%%{init: {'theme': 'base', 'themeVariables': { 'primaryColor': '#0d1117', 'edgeLabelBackground':'#161b22', 'tertiaryColor': '#161b22', 'fontFamily': 'monospace'}}}%%
graph TD
    subgraph "Presentation Layer (V8 Engine)"
        UI["Next.js Responsive Viewport"]
        GSAP["Kinematic GSAP Timelines"]
        UI <-->|JSON Payloads| GSAP
    end

    subgraph "API Ingress (FastAPI Gateway)"
        Gateway["REST/ASGI Gateway\n(CORS + Security Middlewares)"]
    end

    subgraph "Distributed Cognitive Core (LangGraph)"
        Orchestrator{"State Graph\nOrchestrator"}
        
        BioAgent["Biomarker Extrapolation Specialist"]
        ScoreAgent["Algorithmic Scoring Engine\n(SCORE2, Framingham, ASCVD)"]
        InterventionAgent["Autonomous Treatment Formulation"]
        LogicSynth["Clinical Logic Synthesizer"]
        
        Orchestrator <--> BioAgent
        Orchestrator <--> ScoreAgent
        Orchestrator <--> InterventionAgent
        Orchestrator <--> LogicSynth
    end

    subgraph "Persistence Data Lake"
        PG[(PostgreSQL\nRelational Schema)]
        Redis[(Redis\nMemory & Celery State)]
        Chroma[(ChromaDB\nKnowledge Retrieval / RAG)]
    end

    subgraph "Neural Computation"
        LLM["OpenRouter Global Subsystem\n(Meta-Llama-3.3-70B)"]
    end

    UI ===|REST API Over HTTPS| Gateway
    Gateway ===|Asynchronous Dispatch| Orchestrator
    
    BioAgent -.-> Redis
    ScoreAgent -.-> PG
    InterventionAgent -.-> Chroma
    
    LogicSynth ===> LLM
```

***

## 🧠 3. Advanced Diagnostic Subsystems

### I. Biomarker & Hematological Processing Unit
Evaluates high-resolution lipid cascades (LDL-C, HDL-C, Triglycerides), inflammatory thresholds (hs-CRP), and cardiac injury markers (Troponin I). Unlike simplistic binary cutoff mechanisms, this module analyzes polynomial deviation models against normalized healthy age-adjusted baselines.

### II. Algorithmic Risk Stratification Engine
Runs asynchronous computations concurrently executing disparate, peer-reviewed cardiac risk heuristics:
- **Framingham 10-Year Liability Matrix** 
- **Pooled Cohort Equations (ASCVD)**
- **SCORE2 (Systematic Coronary Risk Estimation)**
- **Reynolds Risk Modifier** (Enhances accuracy using hs-CRP variables)

Through Bayesian pooling, a deterministic composite risk score is synthesized, mapped with specific confidence intervals to negate outlier variance.

### III. Vectorized RAG Intervention Architect
Queries millions of paramaterized AHA/ACC/ESC empirical guidelines vectorized using **ChromaDB**. Identifies precise statin intensities, antiplatelet regimens, and metabolic interventions based on localized geometric proximity to the patient's exact metabolic representation.

### IV. Medico-Legal Transcription Matrix
The `Clinical Syntax Synthesizer` compiles immutable, cryptographically verifiable PDF artifacts tracking the deliberative steps of the cognitive agents. This ensures strict transparency (XAI - Explainable AI) to prevent black-box assumptions.

***

## 🧬 4. Clinical Workflow & State Propagation Diagram

```mermaid
sequenceDiagram
    participant PHY as Physician/UI Dashboard
    participant API as FastAPI Ingress Layer
    participant O as LangGraph Orchestrator
    participant M as Memory / Redis
    participant L as LLM Inference Arrays

    PHY->>API: HTTP POST /api/v1/analyze [Patient Telemetry]
    API->>O: Initialize Cognitive State
    O->>M: Persist Baseline State Variable
    
    O->>L: Invoke Specialist Action: Biomarker Evaluation
    L-->>O: Return Vectorized Biomarker Deliberation
    
    O->>L: Invoke Specialist Action: Multi-Algorithm Scoring
    L-->>O: Return Consensus Risk Coefficient
    
    O->>L: Invoke Specialist Action: Guideline RAG Formulation
    L-->>O: Return F.I.T.T Protocol & Pharmacological Roadmap
    
    O->>API: Yield Final Consolidated Diagnostic Matrix
    API-->>PHY: Render Multi-stage Clinical Artifact
```

***

## 🚀 5. Deployment & Execution Infrastructure

This matrix requires meticulously deployed backend and presentation nodes.

### Backend Systems Initialization (Python 3.10+)
Ensure PostgreSQL, Redis, and appropriate API keys (OpenRouter) are configured within localized `.env` variables before running the ASGI container.
```bash
# 1. Enter isolated execution ring
cd backend
python3 -m venv venv
source venv/bin/activate

# 2. Synchronize dependency graph
pip install -r requirements.txt

# 3. Instantiate ASGI loop
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Presentation Node Initialization
Optimized for ultra-fast, statically hoisted runtime deployments (such as direct web drops) or Node.js SSR server deployments.
```bash
# 1. Resolve package matrix
npm install

# 2. Emulate production build state
npm run build

# 3. Spin up deployment distribution layer
npx serve out -p 3000
```
*Environment Variable Pre-Requisite:* `NEXT_PUBLIC_API_URL` must point directly to your deployed Uvicorn API gateway instance.

***

## ⚖️ 6. Postscript & Epilogue

> **Diagnostic Exemption Matrix:** This software relies entirely upon speculative, generative, and associative mathematical operations. While built utilizing highly deterministic state machines, none of the generated reports, PDF outputs, or intervention regimens can circumvent stringent medical licensure or rigorous clinical review. The pipeline intends entirely to **augment physiological adjudication**, not automate it.

<div align="center">
  <br/>
  <b>engineered for precision and speed.</b>
</div>
