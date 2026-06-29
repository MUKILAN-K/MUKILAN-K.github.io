// ============================================================
// constants.ts — All portfolio content data
// ============================================================

export const PERSONAL = {
  name: "MUKILAN K",
  tagline: "Engineering AI. Transforming Futures.",
  email: "mukilan.k.ai@gmail.com",
  phone: "6380891939",
  location: "Tamil Nadu, India",
  github: "https://github.com/mukilan.ai",
  linkedin: "https://linkedin.com/in/mukilan-k-ai",
  education: "B.Tech — AI & Data Science, K Ramakrishnan College of Technology (2023 – Present)",
};

export const CERTIFICATIONS = [
  "AWS Solutions Architect",
  "IBM Python for Data Science",
  "IBM Cloud Internship",
  "Tata Data Analytics",
  "JLPT N5 (Japanese Language Proficiency)",
  "NPTEL Python DSA",
  "Simplilearn Data Scientist",
];

export const SKILLS = {
  core: {
    label: "AI/ML Core",
    color: "#00ffff",
    tools: ["TensorFlow Lite", "Scikit-learn", "Speech Recognition", "Hugging Face", "OpenCV"],
  },
  hardware: {
    label: "Hardware / IoT",
    color: "#ff6b35",
    tools: ["ESP32-CAM", "Arduino", "Raspberry Pi", "Sensors", "Proteus"],
    icon: "chip",
  },
  cloud: {
    label: "Cloud / Web",
    color: "#7c3aed",
    tools: ["AWS", "IBM Cloud", "Firebase", "Git", "Docker"],
    icon: "cloud",
  },
  programming: {
    label: "Programming",
    color: "#10b981",
    tools: ["Python", "C", "SQL", "JavaScript", "MATLAB"],
    icon: "code",
  },
  creative: {
    label: "Creative Tools",
    color: "#f59e0b",
    tools: ["Blender", "MetaMask", "Figma", "Canva", "Adobe XD"],
    icon: "palette",
  },
};

export const PATENTS = {
  design: [
    "Wearable Safety Device — Ergonomic Form Factor",
    "Renewable Energy Harvesting Unit — Visual Design",
    "Smart Textile Interface — Aesthetic Patent",
  ],
  utility: [
    "AI-Powered Railway Track Crack Detection System",
    "Voice-Triggered SOS Wearable (RescueWist)",
    "Decentralized Solar-Powered Air Purification System",
    "Dual-Chamber Spirulina BioReactor Purifier",
    "ESP32-CAM Based Real-Time Object Recognition",
    "Smart Energy Distribution with Blockchain",
    "IoT Soil Moisture-Based Irrigation Controller",
    "ML-Driven Fall Detection Wristband",
    "Solar Tracking System with MPPT Algorithm",
    "Edge AI Gesture Recognition Glove",
    "Multi-modal Emotion Recognition System",
  ],
};

export const GRANT = {
  name: "Orchid Solution",
  type: "MSME Grant",
  amount: "₹5 Lakh",
  description:
    "Developing AI, IoT, and renewable energy products for real-world deployment and market entry.",
};

export const PROJECTS = [
  {
    id: "railway-robot",
    title: "Railway Track Crack Detection Mini-Robot",
    subtitle: "Solar-Powered Autonomous Inspection",
    description:
      "A solar-powered autonomous robot that traverses railway tracks in real-time using computer vision and AI to detect micro-fractures, preventing derailment accidents before they occur.",
    tech: ["ESP32-CAM", "TensorFlow Lite", "Solar Panel", "Arduino", "Python"],
    type: "robotics",
    color: "#ff6b35",
    accentColor: "#ff4500",
  },
  {
    id: "rescuewist",
    title: "RescueWist",
    subtitle: "Smart Voice-Triggered SOS Wearable",
    description:
      "An AI-powered wristband that detects distress through voice commands, heart-rate anomalies, and fall detection, instantly alerting emergency contacts with GPS coordinates.",
    tech: ["ESP32", "Speech Recognition", "BLE", "Firebase", "TensorFlow Lite"],
    type: "wearable",
    color: "#00ffff",
    accentColor: "#0080ff",
  },
  {
    id: "solar-purifier",
    title: "Decentralized Solar Air Purifier",
    subtitle: "Blockchain-Verified Clean Air Network",
    description:
      "A solar-powered air purification system with blockchain-based decentralized monitoring, ensuring transparent air quality data across distributed nodes.",
    tech: ["Solar PV", "MetaMask", "ESP32", "AWS", "Ethereum"],
    type: "sustainability",
    color: "#10b981",
    accentColor: "#059669",
  },
  {
    id: "biorespira",
    title: "BioRespira",
    subtitle: "Dual-Chamber Spirulina Purifier",
    description:
      "A bio-integrated air purification tower using live Spirulina algae as a natural CO₂ scrubber, converting polluted air to oxygen-rich, purified air through dual bio-chambers.",
    tech: ["Bioreactor Design", "IoT Sensors", "Arduino", "Python", "Blender"],
    type: "biotech",
    color: "#84cc16",
    accentColor: "#65a30d",
  },
  {
    id: "zentra",
    title: "Zentra",
    subtitle: "AI Wellness & Mental Health Dashboard",
    description:
      "An AI-driven mental wellness platform that tracks mood patterns, provides cognitive behavioral therapy prompts, and generates personalized mindfulness sessions.",
    tech: ["React", "Python", "ML", "Firebase", "Hugging Face"],
    type: "webapp",
    color: "#7c3aed",
    accentColor: "#6d28d9",
  },
  {
    id: "carznow",
    title: "CarzNow",
    subtitle: "AI-Powered Car Marketplace",
    description:
      "An intelligent automotive marketplace with ML-based price prediction, AR vehicle preview, and an AI assistant that matches buyers with their ideal vehicle.",
    tech: ["Next.js", "Python", "TensorFlow", "AWS", "MongoDB"],
    type: "webapp",
    color: "#f59e0b",
    accentColor: "#d97706",
  },
];

export const EXPERIENCE = [
  {
    id: "greenskill",
    role: "AI Engineering Intern",
    company: "GreenSkill AI (with SHELL)",
    period: "2024",
    description:
      "Developed ML models for energy optimization pipelines. Built real-time data dashboards using Python and cloud infrastructure.",
    skills: ["Python", "TensorFlow", "AWS", "Data Analytics"],
    color: "#10b981",
  },
  {
    id: "ibm",
    role: "Cloud Computing Intern",
    company: "IBM Cloud",
    period: "2024",
    description:
      "Designed and deployed cloud-native microservices on IBM Cloud. Earned IBM Cloud certification upon completion.",
    skills: ["IBM Cloud", "Docker", "Kubernetes", "CI/CD"],
    color: "#7c3aed",
  },
  {
    id: "inexus",
    role: "Web Developer",
    company: "Inexus",
    period: "2023",
    description:
      "Built responsive business websites using Wix and custom HTML/CSS/JS integrations for client projects.",
    skills: ["Wix", "JavaScript", "HTML/CSS", "SEO"],
    color: "#00ffff",
  },
  {
    id: "remote-recruiters",
    role: "Brand Ambassador",
    company: "Remote Recruiters Philippines",
    period: "2023",
    description:
      "Represented the brand at tech events, grew regional network by 40%, and coordinated cross-border recruitment campaigns.",
    skills: ["Marketing", "Networking", "Communication", "Strategy"],
    color: "#f59e0b",
  },
];

export const LANGUAGES = [
  { name: "Tamil", level: "Native", flag: "🇮🇳" },
  { name: "English", level: "Fluent", flag: "🌐" },
  { name: "Japanese", level: "JLPT N5", flag: "🇯🇵" },
];
