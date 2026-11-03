// Real projects, written from the code, READMEs, results files and commit history
// in github.com/abrahamjust.
//
// Before publishing:
// - Lines marked TODO need you to confirm or rewrite them.
// - The "what I learned" style sentences in `outcomes` are my reading of the code
//   and commits. Rewrite them in your own words so they're true to your experience.
// - `image`, `heroImage` and some gallery shots are still placehold.co. Take a
//   screenshot of each app running and save it in public/screenshots/.
// - Gallery shots pointing at /screenshots/*.png are real figures copied from your
//   repos (included in the screenshots folder that came with this file).
// - Nothing is deployed yet, so liveUrl is null. The project page already hides a
//   missing link; update ProjectRow in HomePage/Projects.jsx to do the same.
// - BEACON was left out for now; it's still in your earlier five-project file.

const projects = [
  {
    slug: "gitinsight",
    kind: "Full-stack web app",
    title: "GitInsight",
    summary: "Imports a GitHub repository and turns its commits, pull requests, issues and reviews into a health score, a list of bottlenecks, and a plain-English explanation.",
    role: "Solo build: backend, analytics engine and AI layer",
    stack: "Node.js, Express, MongoDB, Redis, BullMQ, Gemini, React",
    year: "2026",
    timeline: "Jul 2026 to Oct 2026",
    url: "github.com/abrahamjust/gitinsight",
    liveUrl: null,
    codeUrl: "https://github.com/abrahamjust/gitinsight",
    image: "/gitinsight/login.png",
    heroImage: "/gitinsight/login.png",
    seed: 1301,
    artCrop: "0 120 560 400",

    problem: [
      "GitHub shows a repository's raw activity, but not whether the project is healthy. Is code review keeping up? Does everything depend on one person? Are issues piling up? Answering that means digging through commits, pull requests and issues by hand.",
      "Most repository dashboards stop at charts. They show numbers without saying which ones matter or what to do about them.",
    ],
    built: [
      "A web app where you paste a public repository URL. It imports the repo's commits, pull requests, issues, reviews, releases and contributors, then scores health across six dimensions: activity, collaboration, issues, contributors, releases and reviews. Each metric is scored against thresholds and combined with weights into one overall score, with a confidence level based on how many dimensions apply.",
      "On top of the scores sits a bottleneck detector with 13 rules, such as a low bus factor, slow first reviews or declining activity, each reported with the evidence that triggered it. Gemini then writes a short assessment from those computed numbers only, returned as structured JSON, with rules against inventing metrics, guessing causes or blaming individual contributors.",
    ],
    how: "The Express API stores imported data in MongoDB using batched bulk upserts. Syncing a repository runs as a BullMQ job on a separate worker process, which fetches only the commits, pull requests and issues that changed since the last sync, stops cleanly when GitHub's rate limit is hit, and clears the Redis cache when it finishes. Analytics and AI explanations are cached in Redis so dashboards load quickly.",
    architecture: [
      { name: "Dashboard", tech: "React, Vite" },
      { name: "API", tech: "Express" },
      { name: "Sync worker", tech: "BullMQ on Redis" },
      { name: "Health engine", tech: "Node, MongoDB" },
      { name: "Explanations", tech: "Gemini", ml: true },
    ],
    gallery: [
      // TODO: screenshot of a repository dashboard
      { src: "/gitinsight/overview.png", alt: "Repository dashboard with an overall health score and six dimension scores", caption: "The overall health score, broken down into six dimensions." },
      // TODO: screenshot of the bottlenecks and AI insights section
      { src: "/gitinsight/symptoms.png", alt: "List of detected bottlenecks next to the AI-written assessment", caption: "Detected bottlenecks with their evidence, and the AI assessment built from them." },
    ],
    outcomes: [
      "I built the backend over about six weeks, one layer at a time: import, analytics, health scoring, bottleneck detection, then the AI layer, caching and background sync. It's around 5,000 lines split into routes, controllers, services and repositories.",
      "The main lesson was keeping the AI honest. The model only sees computed metrics, and its instructions forbid guessing causes or calling a quiet repository abandoned, so every sentence it writes can be traced back to a number.",
    ],
  },

  {
    slug: "lexinsight",
    kind: "NLP and search",
    title: "LexInsight",
    summary: "A search engine for Indian Supreme Court judgments that works out what kind of precedent you're looking for and explains why each result ranked where it did.",
    role: "Retrieval pipeline, legal extraction, evaluation and app", // TODO: confirm this was solo
    stack: "Python, BM25, Doc2Vec, scikit-learn, FastAPI, React, TypeScript",
    year: "2026",
    timeline: "Oct 2026",
    url: "github.com/abrahamjust/LexInsight",
    liveUrl: null,
    codeUrl: "https://github.com/abrahamjust/LexInsight",
    image: "/lexinsight/overview.png",
    heroImage: "/lexinsight/overview.png",
    seed: 5170,
    artCrop: "300 260 560 400",

    problem: [
      "Legal research means finding the right precedent, not just matching keywords. Someone looking for a case that was distinguished needs different results from someone looking for one that was followed, even if they type the same words.",
      "Search tools usually return a ranked list with no reasoning, so a lawyer can't tell why a judgment came up or how much to trust it.",
    ],
    built: [
      "LexInsight first classifies a query's intent: factual similarity, legal issue, statute-based, supporting precedent or contrasting precedent. It then combines five signals with weights set for that intent: BM25 keyword match, Doc2Vec semantic similarity, a legal scorer for Acts and provisions, citation treatment (relied on versus distinguished or overruled), and outcome match. Signals that don't apply to a query are switched off.",
      "Rule-based extractors pull Acts, provisions, citations and outcomes out of 781 judgments from 2024. Every result shows a score breakdown and a short explanation built from those extracted features.",
    ],
    how: "Judgment PDFs are cleaned and split into their report sections, then indexed for BM25 and Doc2Vec. A FastAPI backend runs query analysis and fusion and serves a React and TypeScript front end with search, judgment pages, an evaluation dashboard and a relevance-labelling tool.",
    architecture: [
      { name: "Search page", tech: "React, TypeScript" },
      { name: "Intent classifier", tech: "Linear SVM", ml: true },
      { name: "Five signals", tech: "BM25, Doc2Vec, legal rules" },
      { name: "Fusion and reasons", tech: "FastAPI" },
      { name: "Corpus", tech: "781 judgments" },
    ],
    gallery: [
      { src: "/lexinsight/comparison.png", alt: "Grouped bar chart comparing seven retrieval systems on four metrics", caption: "Seven systems compared on 35 held-out test queries." },
      { src: "/lexinsight/ablation.png", alt: "Ablation chart showing the drop in nDCG when each signal is removed", caption: "Removing each signal in turn. The legal scorer matters most." },
    ],
    outcomes: [
      "The intent classifier reached 0.90 accuracy on held-out queries, against 0.74 for a keyword-rule baseline, and provision extraction scored 0.89 F1 on a held-out annotated sample.",
      // TODO: these retrieval numbers are provisional until you've reviewed the relevance labels in the app, then re-run the report
      "Settings were chosen on validation queries and the frozen system was tested once. The full hybrid reached nDCG@5 of 0.866 against 0.822 for BM25 alone; on 35 test queries that gain is a trend, not yet significant. Removing the legal scorer cost the most (0.114 nDCG@5).",
    ],
  },

  {
    slug: "agentic-crm",
    kind: "Team project: ML agent",
    title: "Agentic CRM",
    summary: "A small CRM for course enquiries where AI agents score every new lead and draft follow-ups for a person to approve.",
    role: "Team of 7. I built Agent A, the lead-scoring agent",
    stack: "Python, FastAPI, scikit-learn, XGBoost, SHAP, MCP",
    year: "2026",
    timeline: "Oct 2026",
    url: "github.com/abrahamjust/mcp-agentic-crm",
    liveUrl: null,
    codeUrl: "https://github.com/abrahamjust/mcp-agentic-crm",
    image: "/agentic-crm/dashboard_main.png",
    heroImage: "/agentic-crm/lead-pipeline.png",
    seed: 4512,
    artCrop: "240 60 560 400",

    problem: [
      "Education providers get a steady stream of course enquiries, and sales staff can't tell which ones to call first. Good leads go cold while time goes to people who were never going to sign up.",
      "Lead-scoring models trained on CRM exports often look great on paper because they quietly use fields the sales team fills in after talking to the lead.",
    ],
    built: [
      "Agent A watches the CRM for new leads, scores each one with its chance of converting, puts it in a Hot, Warm or Cold bucket, and writes back the top three reasons. It talks to the CRM through the team's MCP tool server and falls back to REST when MCP is unavailable.",
      "The model is a calibrated random forest trained on about 9,200 real leads. I audited the dataset for leakage and removed nine fields recorded by sales staff after contact (some of their values convert at 97 to 99%), so the model only uses what's known when a lead arrives. Reasons come from per-lead TreeSHAP values, and the bucket cut-offs come from the data: Hot is the lowest score with at least 80% precision.",
    ],
    how: "When the FastAPI backend announces a new lead over WebSocket, Agent A fetches the unscored leads, scores them and writes the result back. The CRM is the only state, so a lead stays unscored until its write succeeds and restarts recover on their own. A lead that keeps failing is retried three times and set aside, and the model file is only loaded if its checksum matches the model card.",
    architecture: [
      { name: "Enquiry form", tech: "HTML, JS" },
      { name: "CRM backend", tech: "FastAPI, SQLite" },
      { name: "Tool layer", tech: "MCP" },
      { name: "Agent A scoring", tech: "Random forest, SHAP", ml: true },
      { name: "Agent B drafts", tech: "Ollama" },
    ],
    gallery: [
      { src: "/agentic-crm/conversion.png", alt: "Bar chart of conversion rate for Hot, Warm and Cold leads", caption: "Hot leads converted at 80%, Cold at 6%, on the held-out test set." },
      { src: "/agentic-crm/form.png", alt: "The form component which gathers data", caption: "The form component, this gathers the data to run the pipeline on." },
    ],
    outcomes: [
      "On a held-out test set of 1,841 leads, the model reached 0.87 ROC-AUC against 0.80 for logistic regression. Hot leads (32% of the total) converted at 80%, and the Cold bucket (24% of leads) held only 3.8% of all conversions.",
      "In a live run, a submitted lead was scored in 0.25 seconds (median). Agent A ships with 67 tests, including a fake MCP server for testing tool calls without the real one.",
    ],
  },

  {
    slug: "mammograph",
    kind: "Deep learning and RAG",
    title: "MammoGraph",
    summary: "Explainable mammogram analysis: a graph transformer finds and classifies lesions, then a retrieval step writes a short summary that cites its sources.",
    role: "Model design, training, evaluation and the demo app", // TODO: confirm this was solo
    stack: "Python, PyTorch, ResNet-18, Grad-CAM, BM25, Ollama",
    year: "2026",
    timeline: "Sep 2026 to Oct 2026",
    url: "github.com/abrahamjust/MammoGraph",
    liveUrl: null,
    codeUrl: "https://github.com/abrahamjust/MammoGraph",
    image: "/mammograph/mainPage.png",
    heroImage: "/mammograph/results2.png",
    seed: 2096,
    artCrop: "340 120 560 400",

    problem: [
      "Deep learning models for mammograms usually give a single score with no explanation, which makes them hard to trust or check.",
      "Language models can write fluent reports, but left alone they invent findings and numbers. In a medical setting that's exactly what you can't allow.",
    ],
    built: [
      "A Graph Neural Transformer trained on VinDr-Mammo (20,000 images, 10 finding types). A ResNet-18 turns the image into a grid of patch features, each patch becomes a graph node linked to its 8 neighbours, and two graph-attention layers predict both image-level scores and lesion boxes.",
      "Every result comes with a Grad-CAM heatmap and a masking check that confirms the highlighted region really drives the score. BM25 retrieval pulls passages from a small BI-RADS knowledge base, a local MedGemma model writes a three-part summary citing them, and a rule-based guard rejects any summary with diagnosis wording, numbers not in the model output, or unknown citations, falling back to a template.",
    ],
    how: "The demo is a local web app on Python's standard HTTP server. An uploaded image (PNG, JPG, TIFF or DICOM) runs through detection, Grad-CAM, retrieval and the summary writer as a background job while the page polls for the result. It runs on a laptop CPU in 15 to 40 seconds per image, and 48 automated checks cover the logic without needing PyTorch or the weights.",
    architecture: [
      { name: "Upload", tech: "PNG, JPG, DICOM" },
      { name: "Graph transformer", tech: "PyTorch", ml: true },
      { name: "Heatmap check", tech: "Grad-CAM" },
      { name: "Evidence search", tech: "BM25" },
      { name: "Cited summary", tech: "MedGemma via Ollama", ml: true },
    ],
    gallery: [
      // TODO: screenshot of the app showing boxes, heatmap and summary
      { src: "/mammograph/results1.png", alt: "Mammogram with detected boxes, and a written summary", caption: "Detected lesions, and the cited summary for one image." },
      { src: "/mammograph/auroc.png", alt: "AUROC for each of 10 mammogram finding types and other results ", caption: "Image-level AUROC for each finding type on the 4,000-image test set and other results." },
    ],
    outcomes: [
      "On the 4,000-image test set, macro AUROC rose from 0.64 for a plain ResNet-18 baseline to 0.82. Suspicious calcifications reached 0.97 AUROC and masses 0.81. Lesion detection is the weak part: it finds about 45% of lesions at roughly one false box per image.",
      "I tested whether the heatmap means anything: its peak lands inside a real lesion box 63% of the time, against 3% for the untrained model and 7% for a random point. Checking explanations against a baseline, rather than trusting how they look, is something I'll keep doing.",
    ],
  },
];

export default projects;
