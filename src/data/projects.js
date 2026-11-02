// DUMMY DATA for building the layout.
// The projects, names and numbers below are made up. Replace them with your real work.
// Images use placehold.co so the page has something to show; swap in your own
// screenshots (put them in public/screenshots/) when you have them.

const projects = [
  {
    slug: "shelfwise",
    kind: "Full-stack web app",
    title: "Shelfwise",
    summary: "Inventory and reordering for independent bookshops that still track stock in spreadsheets.",
    role: "Solo build, design to deploy",
    stack: "Next.js, tRPC, Postgres, Python",
    year: "2026",
    timeline: "Jan 2026 to Apr 2026",
    url: "shelfwise.app",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/you/shelfwise",
    image: "https://placehold.co/1600x1000/E7E9E4/2D43D6?text=Shelfwise",
    heroImage: "https://placehold.co/2400x1500/E7E9E4/2D43D6?text=Shelfwise",
    seed: 1301,
    artCrop: "0 120 560 400",

    problem: [
      "Small bookshops run on thin margins, and most of them track stock in a spreadsheet that one person updates at the end of the day. Popular titles sell out before anyone notices, and slow ones sit on the shelf for months.",
      "The inventory tools that exist are built for chains. They're expensive, take weeks to set up, and assume a barcode scanner at every till.",
    ],
    built: [
      "A web app that imports a shop's existing spreadsheet in one step, then keeps stock up to date from the till's sales export.",
      "The part I'm proudest of is the reorder list. A small model looks at each title's sales over the last few weeks and suggests what to reorder and how many, so the owner reviews a short list instead of the whole catalogue.",
    ],
    how: "Sales exports land in Postgres through a nightly import. The API serves the dashboard, and a separate Python service scores reorder suggestions so the web app stays fast.",
    architecture: [
      { name: "Browser", tech: "Next.js" },
      { name: "API", tech: "tRPC on Node" },
      { name: "Database", tech: "Postgres" },
      { name: "Forecasting", tech: "Python, scikit-learn", ml: true },
    ],
    gallery: [
      { src: "https://placehold.co/1200x900/FFFFFF/2D43D6?text=Dashboard", alt: "Stock dashboard with low-stock alerts", caption: "The dashboard flags titles that will run out this week." },
      { src: "https://placehold.co/1200x900/FFFFFF/FF4FA3?text=Reorder+list", alt: "Suggested reorder list", caption: "Suggested reorders, with the reason behind each one." },
    ],
    outcomes: [
      "Two local shops used it for a month during testing. Both stopped running out of their bestsellers, and one cut the time spent on stock from an hour a day to about ten minutes.",
      "I learned how much of a product is the boring import step: getting messy spreadsheets in cleanly took longer than the forecasting.",
    ],
  },

  {
    slug: "leafcheck",
    kind: "ML model and demo",
    title: "Leafcheck",
    summary: "A photo-based plant disease checker for home gardeners, with a model small enough to run in the browser.",
    role: "Model training and the web demo",
    stack: "Python, PyTorch, ONNX, React",
    year: "2025",
    timeline: "Aug 2025 to Oct 2025",
    url: "leafcheck.dev",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/you/leafcheck",
    image: "https://placehold.co/1600x1000/E7E9E4/FF4FA3?text=Leafcheck",
    heroImage: "https://placehold.co/2400x1500/E7E9E4/FF4FA3?text=Leafcheck",
    seed: 2096,
    artCrop: "340 120 560 400",

    problem: [
      "Gardeners notice spots or yellowing on a leaf and have no quick way to tell whether it's a disease, a pest, or just too much sun.",
      "Existing plant apps send every photo to a server, need an account, and often get it wrong on photos taken in ordinary light.",
    ],
    built: [
      "An image classifier trained on public leaf-disease datasets, then fine-tuned on photos taken with phones in real gardens.",
      "I compressed the model so it runs entirely in the browser. Photos never leave the user's phone, and it works offline once loaded.",
    ],
    how: "Training happens in Python. The finished model is exported to ONNX and loaded by the React demo, which runs it on the device with ONNX Runtime Web.",
    architecture: [
      { name: "Phone camera", tech: "Browser" },
      { name: "Demo app", tech: "React" },
      { name: "Classifier", tech: "ONNX Runtime Web", ml: true },
    ],
    gallery: [
      { src: "https://placehold.co/1200x900/FFFFFF/FF4FA3?text=Result+screen", alt: "Result screen showing a diagnosis", caption: "A result with confidence and what to do next." },
      { src: "https://placehold.co/1200x900/FFFFFF/2D43D6?text=Training+curves", alt: "Training and validation accuracy chart", caption: "Training runs, comparing the full and compressed models." },
    ],
    outcomes: [
      "The compressed model is about a tenth of the original's size and keeps most of its accuracy on real garden photos.",
      "This was my first time shipping a model to the browser, and I learned more about quantisation and image preprocessing than about the model itself.",
    ],
  },

  {
    slug: "relay",
    kind: "Backend service",
    title: "Relay",
    summary: "A webhook delivery service that retries failed deliveries and lets developers replay any event.",
    role: "API design and infrastructure",
    stack: "Go, Redis, Postgres, Docker",
    year: "2025",
    timeline: "Mar 2025 to Jun 2025",
    url: "api.relay.dev",
    liveUrl: "https://example.com",
    codeUrl: "https://github.com/you/relay",
    image: "https://placehold.co/1600x1000/E7E9E4/1E2233?text=Relay",
    heroImage: "https://placehold.co/2400x1500/E7E9E4/1E2233?text=Relay",
    seed: 3388,
    artCrop: "120 300 560 400",

    problem: [
      "Apps that send webhooks usually fire once and forget. If the receiving server is down for a minute, the event is lost and nobody knows.",
      "Debugging is worse: there's no record of what was sent, so developers end up asking support to resend things by hand.",
    ],
    built: [
      "A small service that sits between an app and its webhook receivers. It queues every event, retries with backoff when a delivery fails, and keeps a log of every attempt.",
      "A replay endpoint lets a developer resend any past event to any URL, which turned out to be the feature people used most.",
    ],
    how: "Incoming events are written to Postgres, then pushed onto a Redis queue. Go workers deliver them, record each attempt, and schedule retries.",
    architecture: [
      { name: "Your app", tech: "HTTP" },
      { name: "Relay API", tech: "Go" },
      { name: "Queue", tech: "Redis" },
      { name: "Workers", tech: "Go" },
      { name: "Event log", tech: "Postgres" },
    ],
    gallery: [
      { src: "https://placehold.co/1200x900/FFFFFF/1E2233?text=Delivery+log", alt: "Delivery log with retry attempts", caption: "Every delivery attempt, with status and timing." },
      { src: "https://placehold.co/1200x900/FFFFFF/2D43D6?text=API+docs", alt: "API documentation page", caption: "The API reference, generated from the OpenAPI spec." },
    ],
    outcomes: [
      "In load tests it handled a steady stream of events on a single small server without dropping any, including while receivers were deliberately taken offline.",
      "It taught me to design for failure first: most of the code is about what happens when things go wrong.",
    ],
  },

  {
    slug: "tidy-env",
    kind: "Open-source tool",
    title: "tidy-env",
    summary: "A command-line tool that checks .env files against a schema before your app starts.",
    role: "Creator and maintainer",
    stack: "TypeScript, Node",
    year: "2024",
    timeline: "Nov 2024, maintained since",
    url: "github.com/you/tidy-env",
    liveUrl: "https://www.npmjs.com",
    codeUrl: "https://github.com/you/tidy-env",
    image: "https://placehold.co/1600x1000/E7E9E4/2D43D6?text=tidy-env",
    heroImage: "https://placehold.co/2400x1500/E7E9E4/2D43D6?text=tidy-env",
    seed: 4512,
    artCrop: "240 60 560 400",

    problem: [
      "A missing or mistyped environment variable is one of the most common reasons an app works locally and breaks in production.",
      "The error usually shows up far from the cause, deep inside some library, long after the app has started.",
    ],
    built: [
      "A tiny CLI and library. You describe your variables once in a schema file, and tidy-env checks them on startup with a clear message that names exactly what's missing or wrong.",
    ],
    how: "It reads the schema, loads the environment, and validates each variable. It's designed to run in a pre-start script or a CI step.",
    architecture: [
      { name: "Schema file", tech: "env.schema.json" },
      { name: "tidy-env", tech: "TypeScript CLI" },
      { name: "Your app", tech: "Node" },
    ],
    gallery: [
      { src: "https://placehold.co/1200x900/1E2233/F3F4F1?text=Terminal+output", alt: "Terminal output listing missing variables", caption: "A failed check names each problem and how to fix it." },
      { src: "https://placehold.co/1200x900/FFFFFF/2D43D6?text=README", alt: "Project README on GitHub", caption: "The README walks through setup in three steps." },
    ],
    outcomes: [
      "Used in a handful of projects beyond my own, with issues and a couple of pull requests from people I've never met.",
      "Maintaining it taught me to write error messages for a stranger at 2am, which has changed how I write them everywhere.",
    ],
  },
];

export default projects;