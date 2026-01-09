export const PERSONAL_INFO = {
    name: "Aishwarya Ganga VN",
    title: "Data Analyst",
    tagline: "Transforming Data into Actionable Insights",
    email: "aishwaryaganga2004@gmail.com",
    phone: "6369182813",
    location: "Coimbatore, India",
    summary: "Results-driven Data Analyst with hands-on experience in Python, SQL, Power BI, and BigQuery. Proven ability to automate data pipelines, build executive dashboards, and deliver actionable insights. Strong foundation in IoT telemetry validation, statistical analysis, and business intelligence.",
    profileImage: "/profile.jpg", // Placeholder - will be replaced
};

export const SOCIAL_LINKS = {
    linkedin: "https://www.linkedin.com/in/aishwarya-ganga-vn/",
    github: "https://github.com/AishwaryaGangaVN",
    email: "mailto:aishwaryaganga2004@gmail.com",
};

export const SKILLS = {
    programming: [
        { name: "Python", level: 90, icon: "Code2" },
        { name: "SQL (MySQL)", level: 85, icon: "Database" },
        { name: "BigQuery", level: 80, icon: "Cloud" },
    ],
    dataAnalysis: [
        { name: "Power BI", level: 90, icon: "BarChart3" },
        { name: "Looker Studio", level: 85, icon: "LineChart" },
        { name: "Excel (Advanced)", level: 88, icon: "FileSpreadsheet" },
        { name: "EDA", level: 85, icon: "Search" },
    ],
    tools: [
        { name: "Git/GitHub", level: 80, icon: "GitBranch" },
        { name: "IoT Data Processing", level: 85, icon: "Radio" },
        { name: "Data Pipeline Automation", level: 88, icon: "Settings" },
    ],
    core: [
        { name: "Data Cleaning", level: 90, icon: "Sparkles" },
        { name: "Statistical Analysis", level: 85, icon: "Calculator" },
        { name: "Business Intelligence", level: 88, icon: "Briefcase" },
        { name: "Data Validation", level: 90, icon: "CheckCircle2" },
        { name: "Dashboard Development", level: 92, icon: "Smartphone" },
    ],
};

export const PROJECTS = [
    {
        id: 1,
        title: "SmartLights 2.0",
        description: "Enhanced IoT smart streetlighting data performance using Python automation and BigQuery for accurate, standardized telemetry processing. Developed Looker Studio dashboards to visualize system performance and deliver actionable insights.",
        technologies: ["Python", "BigQuery", "Looker Studio", "IoT"],
        highlights: [
            "Automated data pipelines for IoT telemetry validation",
            "Real-time dashboard for system performance monitoring",
            "Standardized data processing for 1000+ smart lights",
        ],
        category: "IoT & Analytics",
        color: "from-blue-500 to-cyan-500",
    },
    {
        id: 2,
        title: "Blinkit Sales Insights Dashboard",
        description: "Built comprehensive sales dashboard using Power BI with detailed data preprocessing, analysis, and visualization. Delivered actionable insights into sales performance, identifying trends, patterns, and improvement opportunities.",
        technologies: ["Power BI", "Excel", "Data Analysis"],
        highlights: [
            "Interactive sales performance dashboard",
            "Trend analysis and pattern recognition",
            "Revenue optimization recommendations",
        ],
        category: "Business Intelligence",
        color: "from-purple-500 to-pink-500",
        githubUrl: "https://github.com/AishwaryaGangaVN/personal-projects/blob/main/blinkit%20dashboard.pbix",
    },
    {
        id: 3,
        title: "Restaurant Orders Analysis",
        description: "Imported Excel data into MySQL and created relational tables for comprehensive restaurant order analysis. Analyzed revenue, popular items, peak hours, and customer trends using advanced SQL queries.",
        technologies: ["MySQL", "Excel", "SQL"],
        highlights: [
            "Relational database design and implementation",
            "Revenue and customer trend analysis",
            "Peak hours identification for operational optimization",
        ],
        category: "Data Analysis",
        color: "from-green-500 to-teal-500",
        githubUrl: "https://github.com/AishwaryaGangaVN/personal-projects/tree/main/Restuarant_db_analysis",
    },
    {
        id: 4,
        title: "Contextual Web-Based QA System",
        description: "Built system to extract context-driven answers from web content using NLP techniques and web scraping. Demonstrated expertise in real-time content analysis and accurate information retrieval from URLs.",
        technologies: ["Python", "NLP", "Web Scraping"],
        highlights: [
            "Real-time web content analysis",
            "Context-aware answer extraction",
            "Accurate information retrieval system",
        ],
        category: "NLP & AI",
        color: "from-orange-500 to-red-500",
        githubUrl: "https://github.com/AishwaryaGangaVN/personal-projects/blob/main/chatbot_web_url_based_(resume_project)_py.ipynb",
    },
];

export const EXPERIENCE = [
    {
        id: 1,
        company: "Schnell Energy Equipments Pvt Ltd",
        role: "Data Analyst Intern",
        location: "Coimbatore, India",
        period: "Jul 2024 – Jan 2025",
        responsibilities: [
            "Automated data pipelines using Python and BigQuery to validate IoT telemetry for smart lighting systems",
            "Developed Looker Studio dashboards delivering reliable insights that strengthened reporting efficiency and accelerated business decisions",
            "Ensured accurate, standardized telemetry data processing through systematic data validation and quality checks",
        ],
        technologies: ["Python", "BigQuery", "Looker Studio", "IoT"],
    },
    {
        id: 2,
        company: "Forge Innovation",
        role: "Graduate Innovation Trainee",
        location: "Coimbatore, India",
        period: "2024 – Jan 2025",
        responsibilities: [
            "Engaged in innovation workshops on IoT, rapid prototyping, IPR, and design systems focused on cutting-edge technology",
            "Built teamwork and collaborative problem-solving skills through cross-functional project work",
        ],
        technologies: ["IoT", "Rapid Prototyping", "Design Systems"],
    },
];

export const EDUCATION = [
    {
        id: 1,
        institution: "Kumaraguru College of Technology",
        degree: "B.Tech in Artificial Intelligence & Data Science",
        location: "Coimbatore, India",
        grade: "CGPA: 7.97/10",
        period: "2022 - 2026",
    },
    {
        id: 2,
        institution: "Holy Cross Anglo Indian Higher Secondary School",
        degree: "Higher Secondary Education (HSE)",
        location: "Thoothukudi, India",
        grade: "87%",
        period: "2019 - 2021",
    },
    {
        id: 3,
        institution: "Holy Cross Anglo Indian Higher Secondary School",
        degree: "Secondary School Leaving Certificate (SSLC)",
        location: "Thoothukudi, India",
        grade: "79%",
        period: "2018 - 2019",
    },
];

export const CERTIFICATIONS = [
    {
        id: 1,
        name: "Complete Data Science Bootcamp",
        issuer: "Coursera",
        year: "2024",
    },
    {
        id: 2,
        name: "IBM AI Engineering Professional Certificate",
        issuer: "Udemy",
        year: "2024",
    },
];

export const ACTIVITIES = [
    {
        id: 1,
        name: "IEEE Terra Nova",
        description: "PPG-enabled wearable emergency alert system development",
        year: "2024",
    },
];

export const STATS = [
    { label: "Projects Completed", value: 4, suffix: "+" },
    { label: "Months Experience", value: 6, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Certifications", value: 2, suffix: "" },
];
