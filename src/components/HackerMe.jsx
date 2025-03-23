"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import "./HackerMe.css"

// Add this function at the top level, before the MoreAboutMe component
const useTheme = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    // Check if document exists (for SSR)
    if (typeof document !== "undefined") {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark"
      setTheme(isDark ? "dark" : "light")

      // Create a mutation observer to watch for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === "data-theme") {
            const newTheme = document.documentElement.getAttribute("data-theme")
            setTheme(newTheme === "dark" ? "dark" : "light")
          }
        })
      })

      observer.observe(document.documentElement, { attributes: true })

      return () => observer.disconnect()
    }
  }, [])

  return theme
}

const HackerMe = ({ onExit }) => {
  const theme = useTheme()
  const [terminalHistory, setTerminalHistory] = useState([])
  const [currentInput, setCurrentInput] = useState("")
  const [commandHistory, setCommandHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isInitialized, setIsInitialized] = useState(false)
  const [loadingStage, setLoadingStage] = useState(0)
  const [isMinimized, setIsMinimized] = useState(false)
  const [fileSystem, setFileSystem] = useState({
    currentDir: "/home/user",
    dirs: {
      "/": ["home", "bin", "etc", "usr", "var"],
      "/home": ["user"],
      "/home/user": ["personal", "projects", "skills", "experience", "education", "interests", ".hidden"],
      "/home/user/personal": ["story.md", "background.txt", "contact.enc", "about.md"],
      "/home/user/projects": ["portfolio.json", "github-repos.list", "current-work.log", "featured-project.md"],
      "/home/user/skills": ["languages.csv", "frameworks.json", "tools.txt", "soft-skills.md"],
      "/home/user/experience": ["work-history.json", "achievements.md", "testimonials.txt"],
      "/home/user/education": ["degrees.json", "certifications.md", "courses.txt"],
      "/home/user/interests": ["hobbies.md", "books.json", "travel.txt"],
      "/home/user/.hidden": ["secrets.enc", "hacker-manifesto.txt", "access-codes.bin", "easter-egg.md"],
      "/bin": [
        "ls",
        "cd",
        "cat",
        "help",
        "clear",
        "whoami",
        "hack",
        "matrix",
        "skills",
        "contact",
        "projects",
        "experience",
        "education",
        "interests",
        "about",
        "resume",
        "social",
        "exit",
        "home",
      ],
      "/etc": ["passwd", "shadow", "hosts", "motd"],
      "/usr": ["share", "local"],
      "/var": ["log", "cache"],
    },
    files: {
      "/home/user/personal/story.md":
        "# My Story\n\nInitial interest in web technologies detected at age 12. Hobby status upgraded to career path following successful deployment of first web application. Subject demonstrated natural aptitude for technical problem-solving from early development stages. Formal education provided baseline knowledge, but 78.3% of valuable skills acquired through self-directed learning protocols and hands-on project execution. Each technical challenge has been logged as a growth node in personal development matrix.",

      "/home/user/personal/background.txt":
        "BACKGROUND INFORMATION\n====================\n\nOrigin: [REDACTED]\nEducation: Computer Science, [REDACTED] University\nSpecialization: Web Development, System Architecture\nYears Active: [CALCULATING...] years\n\nSubject has demonstrated exceptional problem-solving capabilities and adaptation to rapidly evolving technological landscape. Primary motivation appears to be intellectual curiosity rather than financial gain.",

      "/home/user/personal/contact.enc":
        "[ENCRYPTED FILE - DECRYPTION KEY REQUIRED]\n\nUse 'hack contact.enc' to attempt decryption",

      "/home/user/personal/about.md":
        "# About Me\n\nI am a passionate web developer and software engineer with a deep interest in creating elegant, efficient, and user-friendly applications. My journey in technology began with simple HTML websites and has evolved into building complex, scalable applications using modern frameworks and methodologies.\n\nI believe in continuous learning and staying updated with the latest technologies while maintaining a strong foundation in core principles. My approach to problem-solving combines analytical thinking with creative solutions.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through mentoring and writing technical articles.",

      "/home/user/projects/portfolio.json":
        '{\n  "projects": [\n    {\n      "name": "E-commerce Platform",\n      "tech": ["React", "Node.js", "MongoDB"],\n      "year": 2022,\n      "description": "Full-stack e-commerce solution with payment processing and inventory management",\n      "link": "https://github.com/username/ecommerce-platform"\n    },\n    {\n      "name": "Data Visualization Dashboard",\n      "tech": ["D3.js", "Vue", "Firebase"],\n      "year": 2021,\n      "description": "Real-time analytics dashboard for monitoring system performance metrics",\n      "link": "https://github.com/username/data-viz-dashboard"\n    },\n    {\n      "name": "Mobile Fitness App",\n      "tech": ["React Native", "GraphQL", "AWS"],\n      "year": 2020,\n      "description": "Cross-platform mobile application for fitness tracking with social features",\n      "link": "https://github.com/username/fitness-app"\n    },\n    {\n      "name": "Content Management System",\n      "tech": ["Next.js", "Prisma", "PostgreSQL"],\n      "year": 2023,\n      "description": "Headless CMS with custom admin interface and API endpoints",\n      "link": "https://github.com/username/headless-cms"\n    },\n    {\n      "name": "AI-Powered Recommendation Engine",\n      "tech": ["Python", "TensorFlow", "FastAPI"],\n      "year": 2022,\n      "description": "Machine learning system for personalized content recommendations",\n      "link": "https://github.com/username/recommendation-engine"\n    }\n  ]\n}',

      "/home/user/projects/github-repos.list":
        "1. frontend-framework - A lightweight component library\n2. algorithm-visualizer - Educational tool for visualizing common algorithms\n3. api-toolkit - Collection of utilities for API development\n4. security-scanner - Web application security testing tool\n5. performance-metrics - Library for measuring and optimizing web performance\n6. design-system - Comprehensive UI design system with documentation\n7. state-management - Efficient state management library for JavaScript applications\n8. accessibility-tools - Toolkit for improving web accessibility compliance",

      "/home/user/projects/current-work.log":
        ">> 2023-03-15: Implemented authentication system\n>> 2023-03-18: Fixed cross-browser compatibility issues\n>> 2023-03-20: Optimized database queries, 43% performance improvement\n>> 2023-03-22: Added responsive design for mobile devices\n>> 2023-03-25: Deployed v1.2.0 to production\n>> 2023-03-28: Started work on new feature branch\n>> 2023-04-02: Integrated machine learning model for content recommendations\n>> 2023-04-05: Implemented A/B testing framework\n>> 2023-04-10: Optimized image loading with lazy loading and WebP conversion\n>> 2023-04-15: Added internationalization support for 5 languages",

      "/home/user/projects/featured-project.md":
        "# Featured Project: AI-Powered Content Platform\n\n## Overview\nA cutting-edge content platform that leverages artificial intelligence to deliver personalized content experiences to users. The platform analyzes user behavior and preferences to recommend relevant articles, videos, and interactive content.\n\n## Technical Stack\n- **Frontend**: React with Next.js for server-side rendering and optimal performance\n- **Backend**: Node.js with Express, GraphQL API\n- **Database**: MongoDB for content storage, Redis for caching\n- **AI/ML**: TensorFlow for recommendation engine, Natural Language Processing for content analysis\n- **DevOps**: Docker, Kubernetes, CI/CD with GitHub Actions\n\n## Key Features\n- Real-time content recommendations based on user behavior\n- Advanced search with natural language understanding\n- Content categorization and tagging using machine learning\n- User engagement analytics dashboard\n- A/B testing framework for content optimization\n\n## Challenges & Solutions\n- **Challenge**: Scaling to handle millions of content pieces\n  **Solution**: Implemented efficient indexing and caching strategies\n\n- **Challenge**: Ensuring recommendation diversity\n  **Solution**: Developed a hybrid recommendation algorithm combining collaborative filtering with content-based approaches\n\n- **Challenge**: Real-time performance across devices\n  **Solution**: Optimized frontend with code splitting, lazy loading, and service workers",

      "/home/user/skills/languages.csv":
        "Category,Language,Proficiency,Years\nFrontend,JavaScript,Expert,8\nFrontend,TypeScript,Advanced,5\nFrontend,HTML/CSS,Expert,10\nBackend,Node.js,Expert,6\nBackend,Python,Intermediate,4\nBackend,PHP,Intermediate,3\nDatabase,SQL,Advanced,7\nMobile,React Native,Advanced,4\nMobile,Swift,Beginner,1\nDevOps,Bash/Shell,Intermediate,5\nData Science,R,Beginner,2\nSystems,C++,Intermediate,3",

      "/home/user/skills/frameworks.json":
        '{\n  "frontend": [\n    {"name": "React", "level": "Expert", "years": 6},\n    {"name": "Vue", "level": "Advanced", "years": 3},\n    {"name": "Angular", "level": "Intermediate", "years": 2},\n    {"name": "Next.js", "level": "Expert", "years": 4},\n    {"name": "Svelte", "level": "Intermediate", "years": 1},\n    {"name": "Redux", "level": "Expert", "years": 5}\n  ],\n  "backend": [\n    {"name": "Express", "level": "Expert", "years": 5},\n    {"name": "Django", "level": "Intermediate", "years": 2},\n    {"name": "Laravel", "level": "Intermediate", "years": 2},\n    {"name": "NestJS", "level": "Advanced", "years": 3},\n    {"name": "FastAPI", "level": "Intermediate", "years": 1}\n  ],\n  "css": [\n    {"name": "Tailwind", "level": "Expert", "years": 3},\n    {"name": "SASS", "level": "Advanced", "years": 5},\n    {"name": "CSS-in-JS", "level": "Advanced", "years": 4},\n    {"name": "Bootstrap", "level": "Expert", "years": 6},\n    {"name": "Material UI", "level": "Advanced", "years": 4}\n  ],\n  "testing": [\n    {"name": "Jest", "level": "Expert", "years": 4},\n    {"name": "Cypress", "level": "Advanced", "years": 3},\n    {"name": "React Testing Library", "level": "Expert", "years": 3},\n    {"name": "Mocha", "level": "Intermediate", "years": 2}\n  ],\n  "databases": [\n    {"name": "MongoDB", "level": "Expert", "years": 5},\n    {"name": "PostgreSQL", "level": "Advanced", "years": 4},\n    {"name": "MySQL", "level": "Advanced", "years": 6},\n    {"name": "Redis", "level": "Intermediate", "years": 3},\n    {"name": "Firebase", "level": "Advanced", "years": 4}\n  ]\n}',

      "/home/user/skills/tools.txt":
        "DEVELOPMENT TOOLS & ENVIRONMENTS\n==============================\n\n- Version Control: Git, GitHub, GitLab, Bitbucket\n- CI/CD: Jenkins, GitHub Actions, CircleCI, Travis CI\n- Containers: Docker, Kubernetes (basic), Docker Compose\n- Cloud: AWS (S3, EC2, Lambda, DynamoDB), Vercel, Netlify, DigitalOcean, Google Cloud Platform\n- Testing: Jest, Cypress, React Testing Library, Selenium, Postman\n- Design: Figma, Adobe XD, Sketch, Photoshop\n- Editors: VS Code, Vim (basic), WebStorm\n- OS: Linux, macOS, Windows\n- Project Management: Jira, Trello, Asana, Notion\n- Documentation: Markdown, Storybook, Swagger, JSDoc\n- Monitoring: Sentry, New Relic, Datadog, Grafana\n- Performance: Lighthouse, WebPageTest, Chrome DevTools",

      "/home/user/skills/soft-skills.md":
        "# Soft Skills\n\n## Communication\n- Clear and concise technical writing\n- Effective presentation of complex concepts\n- Active listening and feedback incorporation\n- Cross-functional team collaboration\n\n## Problem Solving\n- Analytical thinking and root cause analysis\n- Creative solution development\n- Systematic debugging methodology\n- Research and information synthesis\n\n## Leadership\n- Team mentoring and knowledge sharing\n- Project planning and execution\n- Decision making under uncertainty\n- Conflict resolution and consensus building\n\n## Work Ethic\n- Self-motivated and proactive approach\n- Continuous learning and skill development\n- Attention to detail and quality focus\n- Time management and prioritization\n\n## Adaptability\n- Quick learning of new technologies\n- Flexibility in changing requirements\n- Comfort with ambiguity\n- Open-mindedness to different approaches",

      "/home/user/experience/work-history.json":
        '{\n  "positions": [\n    {\n      "title": "Senior Frontend Developer",\n      "company": "TechInnovate Solutions",\n      "period": "2021 - Present",\n      "responsibilities": [\n        "Lead development of customer-facing web applications using React and Next.js",\n        "Architect and implement reusable component libraries and design systems",\n        "Mentor junior developers and conduct code reviews",\n        "Collaborate with UX/UI designers to implement pixel-perfect interfaces",\n        "Optimize application performance and accessibility compliance"\n      ],\n      "technologies": ["React", "Next.js", "TypeScript", "GraphQL", "Jest", "Cypress"]\n    },\n    {\n      "title": "Full Stack Developer",\n      "company": "DataViz Enterprises",\n      "period": "2018 - 2021",\n      "responsibilities": [\n        "Developed and maintained data visualization dashboards for enterprise clients",\n        "Built RESTful APIs and microservices using Node.js and Express",\n        "Implemented real-time data processing with WebSockets and Redis",\n        "Designed and optimized database schemas for performance",\n        "Participated in agile development process with two-week sprints"\n      ],\n      "technologies": ["Vue.js", "Node.js", "Express", "MongoDB", "D3.js", "Socket.io"]\n    },\n    {\n      "title": "Web Developer",\n      "company": "Creative Digital Agency",\n      "period": "2016 - 2018",\n      "responsibilities": [\n        "Created responsive websites for clients across various industries",\n        "Developed custom WordPress themes and plugins",\n        "Implemented e-commerce solutions with WooCommerce and Shopify",\n        "Optimized website performance and SEO",\n        "Collaborated with design team to implement interactive features"\n      ],\n      "technologies": ["HTML/CSS", "JavaScript", "PHP", "WordPress", "Shopify", "SASS"]\n    }\n  ]\n}',

      "/home/user/experience/achievements.md":
        "# Professional Achievements\n\n## Technical Innovations\n\n- **Performance Optimization Framework**\n  Developed a performance optimization framework that reduced page load times by 65% across all company products, resulting in a 23% increase in user engagement and 18% improvement in conversion rates.\n\n- **Automated Testing Infrastructure**\n  Designed and implemented an automated testing infrastructure that reduced QA time by 40% while increasing test coverage by 75%, enabling faster release cycles and fewer production bugs.\n\n- **Microservices Architecture Migration**\n  Led the migration from a monolithic application to a microservices architecture, improving system scalability and reducing deployment times from hours to minutes.\n\n## Recognition & Awards\n\n- **Innovation Award (2022)**\n  Received company-wide innovation award for developing an AI-powered content recommendation engine that increased user time-on-site by 35%.\n\n- **Open Source Contributor of the Year (2021)**\n  Recognized for significant contributions to major open-source projects in the JavaScript ecosystem.\n\n- **Best Technical Solution Award (2020)**\n  Won industry award for developing an accessibility-focused component library that simplified WCAG compliance.\n\n## Publications & Speaking\n\n- **Conference Speaker**\n  Presented at 5 major tech conferences on topics including state management, performance optimization, and accessibility.\n\n- **Technical Author**\n  Published 20+ technical articles on web development best practices, reaching over 500,000 readers.\n\n- **Video Course Creator**\n  Developed a comprehensive video course on modern JavaScript frameworks with over 50,000 students enrolled.",

      "/home/user/experience/testimonials.txt":
        'PROFESSIONAL TESTIMONIALS\n========================\n\n"[Name] is one of the most talented developers I\'ve had the pleasure to work with. Their ability to solve complex problems while maintaining clean, maintainable code is exceptional. They consistently deliver high-quality work ahead of schedule and have become an invaluable asset to our team."\n— Sarah Johnson, CTO at TechInnovate Solutions\n\n"Working with [Name] transformed our development process. They not only improved our technical infrastructure but also elevated the skills of our entire team through mentorship and knowledge sharing. Their deep understanding of both frontend and backend technologies allowed us to tackle challenges we previously thought impossible."\n— Michael Chen, Engineering Manager at DataViz Enterprises\n\n"[Name]\'s attention to detail and commitment to user experience sets them apart. They don\'t just write code; they create solutions that genuinely improve how people interact with technology. Their work on our platform resulted in the highest user satisfaction scores we\'ve ever recorded."\n— Emily Rodriguez, Product Director at Creative Digital Agency\n\n"I\'ve rarely encountered a developer with such a perfect balance of technical expertise and communication skills. [Name] can explain complex technical concepts to non-technical stakeholders with ease, making them an essential bridge between our development and business teams."\n— David Kim, CEO at StartupLaunch Inc.',

      "/home/user/education/degrees.json":
        '{\n  "degrees": [\n    {\n      "degree": "Master of Science in Computer Science",\n      "institution": "Tech University",\n      "year": "2016",\n      "focus": "Software Engineering and Artificial Intelligence",\n      "achievements": [\n        "Graduated with honors (GPA: 3.9/4.0)",\n        "Research assistant in Human-Computer Interaction Lab",\n        "Master\'s thesis on "Optimizing User Experience Through Predictive Algorithms""\n      ]\n    },\n    {\n      "degree": "Bachelor of Science in Computer Science",\n      "institution": "State University",\n      "year": "2014",\n      "focus": "Web Development and Database Systems",\n      "achievements": [\n        "Dean\'s List all semesters",\n        "President of Computer Science Student Association",\n        "Senior project: "Real-time Collaborative Coding Platform""\n      ]\n    }\n  ],\n  "additionalEducation": [\n    {\n      "type": "Study Abroad Program",\n      "institution": "International Institute of Technology",\n      "location": "Berlin, Germany",\n      "year": "2013",\n      "focus": "European Computer Science and Innovation"\n    },\n    {\n      "type": "Summer Research Program",\n      "institution": "National Research Laboratory",\n      "year": "2012",\n      "focus": "Emerging Web Technologies"\n    }\n  ]\n}',

      "/home/user/education/certifications.md":
        "# Professional Certifications\n\n## Technical Certifications\n\n### AWS Certified Solutions Architect\n**Issuer**: Amazon Web Services\n**Date**: 2022\n**Skills**: Cloud architecture, AWS services, scalable systems design\n\n### Google Professional Cloud Developer\n**Issuer**: Google Cloud\n**Date**: 2021\n**Skills**: Cloud-native application development, GCP services\n\n### Microsoft Certified: Azure Developer Associate\n**Issuer**: Microsoft\n**Date**: 2020\n**Skills**: Azure services, cloud applications, secure solutions\n\n### Certified Kubernetes Administrator\n**Issuer**: Cloud Native Computing Foundation\n**Date**: 2021\n**Skills**: Kubernetes deployment, maintenance, troubleshooting\n\n## Specialized Training\n\n### Advanced React Patterns and Performance\n**Issuer**: Frontend Masters\n**Date**: 2022\n**Skills**: React optimization, advanced patterns, state management\n\n### Machine Learning Engineering\n**Issuer**: Coursera (Stanford University)\n**Date**: 2021\n**Skills**: ML algorithms, data preprocessing, model deployment\n\n### Accessibility in Web Development\n**Issuer**: W3C\n**Date**: 2020\n**Skills**: WCAG compliance, assistive technologies, inclusive design\n\n### Advanced TypeScript Programming\n**Issuer**: TypeScript Academy\n**Date**: 2022\n**Skills**: Type systems, generics, advanced patterns",

      "/home/user/education/courses.txt":
        "CONTINUING EDUCATION COURSES\n===========================\n\n2023 - Advanced GraphQL API Design and Best Practices\n      Provider: Apollo GraphQL\n      Key Topics: Schema design, performance optimization, caching strategies\n\n2022 - Web Performance Optimization Masterclass\n      Provider: Frontend Masters\n      Key Topics: Core Web Vitals, lazy loading, code splitting, image optimization\n\n2022 - Secure Coding Practices for Web Developers\n      Provider: OWASP Foundation\n      Key Topics: XSS prevention, CSRF protection, secure authentication\n\n2021 - Data Visualization with D3.js\n      Provider: Observable\n      Key Topics: Interactive visualizations, animations, data processing\n\n2021 - Microservices Architecture and Implementation\n      Provider: O'Reilly Learning\n      Key Topics: Service design, API gateways, event-driven architecture\n\n2020 - Advanced CSS and Sass\n      Provider: Udemy\n      Key Topics: CSS Grid, Flexbox, animations, responsive design\n\n2020 - JavaScript: The Hard Parts\n      Provider: Codesmith\n      Key Topics: Closures, asynchronous JavaScript, prototypal inheritance\n\n2019 - Test-Driven Development in JavaScript\n      Provider: Pluralsight\n      Key Topics: Jest, testing strategies, mocking\n\n2019 - Algorithms and Data Structures\n      Provider: MIT OpenCourseWare\n      Key Topics: Complexity analysis, sorting algorithms, data structures\n\n2018 - Progressive Web Apps Fundamentals\n      Provider: Google Developers\n      Key Topics: Service workers, offline functionality, push notifications",

      "/home/user/interests/hobbies.md":
        "# Personal Interests & Hobbies\n\n## Technology & Making\n- **Open Source Contributing**: Active contributor to several open-source projects\n- **Electronics & Arduino**: Building small IoT devices and home automation systems\n- **3D Printing**: Creating functional prototypes and decorative objects\n- **Game Development**: Experimenting with Unity and Godot in spare time\n\n## Learning & Growth\n- **Language Learning**: Currently studying Japanese (intermediate level)\n- **Music Production**: Creating electronic music using Ableton Live\n- **Technical Writing**: Maintaining a personal blog on emerging technologies\n- **Public Speaking**: Member of local Toastmasters club\n\n## Physical Activities\n- **Rock Climbing**: Indoor bouldering and sport climbing\n- **Hiking**: Exploring national parks and wilderness areas\n- **Cycling**: Both road cycling and mountain biking\n- **Yoga**: Regular practice for balance and mindfulness\n\n## Creative Pursuits\n- **Photography**: Landscape and urban photography\n- **Cooking**: Experimenting with international cuisines\n- **Digital Art**: Creating generative art with code\n- **Reading**: Science fiction, popular science, and technical books",

      "/home/user/interests/books.json":
        '{\n  "technical": [\n    {\n      "title": "Clean Code",\n      "author": "Robert C. Martin",\n      "impact": "Fundamentally changed my approach to writing maintainable software"\n    },\n    {\n      "title": "Designing Data-Intensive Applications",\n      "author": "Martin Kleppmann",\n      "impact": "Deepened my understanding of distributed systems and databases"\n    },\n    {\n      "title": "You Don\'t Know JS",\n      "author": "Kyle Simpson",\n      "impact": "Provided crucial insights into JavaScript\'s core mechanisms"\n    },\n    {\n      "title": "Refactoring",\n      "author": "Martin Fowler",\n      "impact": "Taught me systematic approaches to improving code quality"\n    },\n    {\n      "title": "The Pragmatic Programmer",\n      "author": "Andrew Hunt & David Thomas",\n      "impact": "Shaped my philosophy on software craftsmanship"\n    }\n  ],\n  "non_technical": [\n    {\n      "title": "Thinking, Fast and Slow",\n      "author": "Daniel Kahneman",\n      "impact": "Improved my decision-making process and understanding of cognitive biases"\n    },\n    {\n      "title": "Dune",\n      "author": "Frank Herbert",\n      "impact": "Favorite science fiction novel exploring complex themes of politics and ecology"\n    },\n    {\n      "title": "Atomic Habits",\n      "author": "James Clear",\n      "impact": "Helped establish productive routines and continuous improvement"\n    },\n    {\n      "title": "The Design of Everyday Things",\n      "author": "Don Norman",\n      "impact": "Influenced my approach to user experience and interface design"\n    },\n    {\n      "title": "Sapiens",\n      "author": "Yuval Noah Harari",\n      "impact": "Provided perspective on human history and technological evolution"\n    }\n  ],\n  "currently_reading": [\n    {\n      "title": "The Art of Computer Programming",\n      "author": "Donald Knuth",\n      "goal": "Deepen understanding of fundamental algorithms"\n    },\n    {\n      "title": "Working in Public",\n      "author": "Nadia Eghbal",\n      "goal": "Better understand open source ecosystem and sustainability"\n    }\n  ]\n}',

      "/home/user/interests/travel.txt":
        "TRAVEL EXPERIENCES & ASPIRATIONS\n==============================\n\nPLACES VISITED\n-------------\n\nMALAYSIA (2014)\nHighlights: Kualalumpur, Lankawi,\nTech Connection: Visited Nintendo headquarters and attended a local developer meetup\n\nGERMANY (2018)\nHighlights: Berlin's startup scene, Bavarian countryside, Munich's museums\nTech Connection: Participated in Berlin Tech Conference and toured innovation labs\n\nCANADA (2017)\nHighlights: Vancouver's natural beauty, Toronto's diverse neighborhoods, Montreal's culture\nTech Connection: Collaborated with Canadian tech company on cross-border project\n\nSINGAPORE (2016)\nHighlights: Gardens by the Bay, hawker centers, urban efficiency\nTech Connection: Studied Singapore's smart city initiatives and implementation\n\nICELAND (2015)\nHighlights: Northern lights, volcanic landscapes, hot springs\nTech Connection: Explored renewable energy technology and data centers\n\nFUTURE DESTINATIONS\n-----------------\n\nNEW ZEALAND\nInterest: Natural landscapes, outdoor adventures, Wellington's tech scene\nGoal: Work remotely while exploring both islands\n\nPORTUGAL\nInterest: Lisbon's growing tech hub, coastal beauty, historical sites\nGoal: Attend Web Summit and connect with European developers\n\nSOUTH KOREA\nInterest: Seoul's technology integration, food culture, historical temples\nGoal: Study Korean tech giants' innovation approaches\n\nTRAVEL PHILOSOPHY\n---------------\nI believe travel broadens perspective and sparks creativity. I seek destinations that offer a blend of natural beauty, cultural experiences, and technological innovation. When traveling, I enjoy connecting with local developer communities and bringing back fresh ideas and approaches to my work.",

      "/home/user/.hidden/secrets.enc":
        "[ENCRYPTED FILE - HIGH SECURITY CLEARANCE REQUIRED]\n\nAttempting unauthorized access may trigger security protocols.",

      "/home/user/.hidden/hacker-manifesto.txt":
        'THE HACKER MANIFESTO\n====================\n\n"This is our world now... the world of the electron and the switch, the beauty of the baud."\n\n"We make use of a service already existing without paying for what could be dirt-cheap if it wasn\'t run by profiteering gluttons, and you call us criminals."\n\n"Yes, I am a criminal. My crime is that of curiosity."\n\n"We exist without skin color, without nationality, without religious bias... and you call us criminals."\n\n"You build atomic bombs, you wage wars, you murder, cheat, and lie to us and try to make us believe it\'s for our own good, yet we\'re the criminals."\n\n"Yes, I am a criminal. My crime is of outsmarting you, something that you will never forgive me for."',

      "/home/user/.hidden/access-codes.bin":
        "01001000 01100001 01100011 01101011 01100101 01110010 00100000 01000101 01110100 01101000 01101001 01100011 01110011 00111010 00100000 01000001 01101100 01110111 01100001 01111001 01110011 00100000 01100010 01100101 00100000 01100011 01110101 01110010 01101001 01101111 01110101 01110011 00101100 00100000 01101110 01100101 01110110 01100101 01110010 00100000 01100100 01100101 01110011 01110100 01110010 01110101 01100011 01110100 01101001 01110110 01100101",

      "/home/user/.hidden/easter-egg.md":
        "# Congratulations, Explorer!\n\nYou've discovered a hidden easter egg in this terminal. Your curiosity and willingness to explore beyond the obvious paths is the mark of a true developer.\n\n## Your Reward\n\nAs a reward for your exploration, here's a piece of wisdom:\n\n> \"The best code is written with both technical excellence and human empathy. Never forget that behind every user interface is a person with hopes, frustrations, and dreams.\"\n\nKeep this exploratory spirit in all your coding adventures. The best developers are those who venture into the unknown directories of knowledge and aren't afraid to peek into hidden files.\n\n## Secret Command\n\nTry running the command `matrix special` for a unique surprise!",

      "/etc/passwd":
        "root:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin\nsys:x:3:3:sys:/dev:/usr/sbin/nologin\nsync:x:4:65534:sync:/bin:/bin/sync\nuser:x:1000:1000:Regular User:/home/user:/bin/bash",

      "/etc/shadow": "[ACCESS DENIED] - Insufficient privileges",

      "/etc/hosts":
        "127.0.0.1 localhost\n127.0.1.1 terminal-system\n\n# The following lines are desirable for IPv6 capable hosts\n::1     ip6-localhost ip6-loopback\nfe00::0 ip6-localnet\nff02::1 ip6-allnodes\nff02::2 ip6-allrouters",

      "/etc/motd":
        "Welcome to the Personal Terminal Interface\nVersion 1.0.2\n\nThis terminal provides access to personal and professional information.\nType 'help' for a list of available commands.\n\nREMINDER: Some information may be encrypted for security purposes.\nUse appropriate commands to access protected content.\n\nLast system update: 2023-04-15\nSecurity level: High",
    },
  })
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Initialize terminal
  useEffect(() => {
    if (!isInitialized) {
      const timer = setTimeout(() => {
        setLoadingStage(1)
        setTimeout(() => {
          setLoadingStage(2)
          setTimeout(() => {
            setLoadingStage(3)
            setTimeout(() => {
              setIsInitialized(true)
              addToHistory({
                type: "system",
                content: "Terminal initialized. Type 'help' for available commands.",
              })
            }, 1000)
          }, 800)
        }, 1200)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [isInitialized])

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && isInitialized) {
        inputRef.current.focus()
      }
    }

    const terminal = terminalRef.current
    if (terminal) {
      terminal.addEventListener("click", handleClick)
    }

    return () => {
      if (terminal) {
        terminal.removeEventListener("click", handleClick)
      }
    }
  }, [isInitialized])

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalHistory])

  const addToHistory = useCallback((entry) => {
    setTerminalHistory((prev) => [...prev, entry])
  }, [])

  const handleInputChange = (e) => {
    setCurrentInput(e.target.value)
  }

  const handleKeyDown = (e) => {
    // Handle up/down arrows for command history
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCurrentInput("")
      }
    } else if (e.key === "Tab") {
      e.preventDefault()
      handleTabCompletion()
    } else if (e.key === "Escape") {
      if (isMinimized) {
        setIsMinimized(false)
      } else {
        exitTerminal()
      }
    }
  }

  const handleTabCompletion = () => {
    const input = currentInput.trim()
    const args = input.split(" ")
    const command = args[0]

    // Tab completion for commands
    if (args.length === 1) {
      const availableCommands = [
        "ls",
        "cd",
        "cat",
        "help",
        "clear",
        "whoami",
        "hack",
        "matrix",
        "skills",
        "contact",
        "projects",
        "experience",
        "education",
        "interests",
        "about",
        "resume",
        "social",
        "exit",
        "home",
        "find",
        "echo",
      ]
      const matchingCommands = availableCommands.filter((cmd) => cmd.startsWith(command))

      if (matchingCommands.length === 1) {
        setCurrentInput(matchingCommands[0] + " ")
      } else if (matchingCommands.length > 1) {
        addToHistory({
          type: "system",
          content: matchingCommands.join("  "),
        })
      }
    }
    // Tab completion for files and directories
    else if (args.length === 2 && (command === "cd" || command === "cat")) {
      const path = args[1]
      const currentDirContents = getCurrentDirContents()

      const matchingPaths = currentDirContents.filter((item) => item.startsWith(path))

      if (matchingPaths.length === 1) {
        setCurrentInput(`${command} ${matchingPaths[0]}`)
      } else if (matchingPaths.length > 1) {
        addToHistory({
          type: "system",
          content: matchingPaths.join("  "),
        })
      }
    }
  }

  const getCurrentDirContents = () => {
    const { currentDir, dirs } = fileSystem
    return dirs[currentDir] || []
  }

  const getAbsolutePath = (path) => {
    const { currentDir } = fileSystem

    if (path.startsWith("/")) {
      return path
    }

    if (path === "..") {
      const parts = currentDir.split("/")
      parts.pop()
      return parts.join("/") || "/"
    }

    if (path === ".") {
      return currentDir
    }

    return currentDir === "/" ? `/${path}` : `${currentDir}/${path}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const input = currentInput.trim()

    if (!input) return

    // Add command to history
    addToHistory({
      type: "command",
      content: input,
    })

    // Add to command history for up/down navigation
    setCommandHistory((prev) => [...prev, input])
    setHistoryIndex(-1)

    // Process command
    processCommand(input)

    // Clear input
    setCurrentInput("")
  }

  const processCommand = (input) => {
    const args = input.split(" ")
    const command = args[0].toLowerCase()
    const params = args.slice(1).join(" ")

    switch (command) {
      case "help":
        showHelp()
        break
      case "clear":
        clearTerminal()
        break
      case "ls":
        listDirectory(args[1])
        break
      case "cd":
        changeDirectory(args[1])
        break
      case "cat":
        viewFile(args[1])
        break
      case "whoami":
        showWhoami()
        break
      case "hack":
        hackSystem(args[1])
        break
      case "matrix":
        if (args[1] === "special") {
          showSpecialMatrix()
        } else {
          showMatrix()
        }
        break
      case "skills":
        showSkills()
        break
      case "contact":
        showContact()
        break
      case "projects":
        showProjects()
        break
      case "experience":
        showExperience()
        break
      case "education":
        showEducation()
        break
      case "interests":
        showInterests()
        break
      case "about":
        showAbout()
        break
      case "resume":
        showResume()
        break
      case "social":
        showSocial()
        break
      case "find":
        findInFiles(params)
        break
      case "echo":
        echoText(args.slice(1).join(" "))
        break
      case "exit":
      case "home":
        exitTerminal()
        break
      default:
        addToHistory({
          type: "error",
          content: `Command not found: ${command}. Type 'help' for available commands.`,
        })
    }
  }

  const showHelp = () => {
    addToHistory({
      type: "output",
      content: `
AVAILABLE COMMANDS
=================

NAVIGATION & VIEWING
  help                Show this help message
  clear               Clear the terminal
  ls [directory]      List directory contents
  cd [directory]      Change directory
  cat [file]          View file contents
  find [text]         Search for text in files

PROFILE INFORMATION
  whoami              Display user information
  about               Show about me information
  skills              Display skills overview
  projects            Show project portfolio
  experience          Display work experience
  education           Show education background
  interests           Display personal interests
  contact             Show contact information
  resume              Display comprehensive resume
  social              Show social media profiles

SPECIAL COMMANDS
  hack [target]       Attempt to access encrypted information
  matrix              Enter visualization mode
  echo [text]         Display text in terminal
  exit, home          Return to homepage

TIP: Use Tab key for command and path completion
      `,
    })
  }

  const clearTerminal = () => {
    setTerminalHistory([])
  }

  const listDirectory = (path) => {
    const { dirs, currentDir } = fileSystem
    const targetPath = path ? getAbsolutePath(path) : currentDir

    if (!dirs[targetPath]) {
      addToHistory({
        type: "error",
        content: `ls: cannot access '${path}': No such directory`,
      })
      return
    }

    const contents = dirs[targetPath]
    const formattedContents = contents
      .map((item) => {
        // Check if item is a directory
        const isDir = dirs[targetPath === "/" ? `/${item}` : `${targetPath}/${item}`]
        const isHidden = item.startsWith(".")

        if (isDir) {
          return `<span class="terminal-dir${isHidden ? " terminal-hidden" : ""}">${item}/</span>`
        } else {
          return `<span class="terminal-file${isHidden ? " terminal-hidden" : ""}">${item}</span>`
        }
      })
      .join("  ")

    addToHistory({
      type: "output-html",
      content: formattedContents || "(empty directory)",
    })
  }

  const changeDirectory = (path) => {
    if (!path) {
      addToHistory({
        type: "error",
        content: "cd: missing operand",
      })
      return
    }

    const { dirs } = fileSystem
    const targetPath = getAbsolutePath(path)

    if (!dirs[targetPath]) {
      addToHistory({
        type: "error",
        content: `cd: ${path}: No such directory`,
      })
      return
    }

    setFileSystem((prev) => ({
      ...prev,
      currentDir: targetPath,
    }))

    addToHistory({
      type: "system",
      content: `Changed directory to: ${targetPath}`,
    })
  }

  const viewFile = (path) => {
    if (!path) {
      addToHistory({
        type: "error",
        content: "cat: missing operand",
      })
      return
    }

    const { files, currentDir } = fileSystem
    const targetPath = path.startsWith("/") ? path : `${currentDir}/${path}`

    if (!files[targetPath]) {
      addToHistory({
        type: "error",
        content: `cat: ${path}: No such file`,
      })
      return
    }

    addToHistory({
      type: "file",
      content: files[targetPath],
      filename: path,
    })
  }

  const showWhoami = () => {
    addToHistory({
      type: "output",
      content: `
USER PROFILE
===========
Username: billahdotdev
Role: Web Developer
Status: Active
Access Level: Standard User
Last Login: ${new Date().toLocaleString()}

Type 'about' for more detailed information.
      `,
    })
  }

  const hackSystem = (target) => {
    if (!target) {
      addToHistory({
        type: "error",
        content: "hack: missing target. Usage: hack [target]",
      })
      return
    }

    // Simulate hacking animation
    addToHistory({
      type: "system",
      content: `Attempting to access: ${target}`,
    })

    // Simulate result after delay
    setTimeout(() => {
      if (target === "contact.enc") {
        addToHistory({
          type: "success",
          content: "Decryption successful!",
        })

        addToHistory({
          type: "output",
          content: `
CONTACT INFORMATION
==================
Email: billahdotdev@gmail.com
GitHub: github.com/billahdotdev
LinkedIn: linkedin.com/in/billahdodev
X: @billahdotdev
Personal Website: https://billah.dev
          `,
        })
      } else if (target === "secrets.enc") {
        addToHistory({
          type: "error",
          content: "Decryption failed: Security level too high",
        })

        addToHistory({
          type: "warning",
          content: "Warning: Unauthorized access attempt logged",
        })
      } else if (target === "mainframe" || target === "system") {
        addToHistory({
          type: "success",
          content: "Access granted to mainframe!",
        })

        addToHistory({
          type: "easter-egg",
          content: "You found an easter egg! Try exploring the .hidden directory.",
        })
      } else {
        addToHistory({
          type: "error",
          content: `Failed to access: ${target} - Target not recognized or not accessible`,
        })
      }
    }, 1500)
  }

  const showMatrix = () => {
    addToHistory({
      type: "system",
      content: "Activating visualization mode...",
    })

    setTimeout(() => {
      addToHistory({
        type: "system",
        content: "Visualization mode activated. The truth is out there.",
      })

      // Create a simple matrix animation
      const matrixContainer = document.createElement("div")
      matrixContainer.className = "matrix"
      document.body.appendChild(matrixContainer)

      const canvas = document.createElement("canvas")
      matrixContainer.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const characters =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789"
      const columns = canvas.width / 20
      const drops = []

      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }

      const drawMatrix = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = "#0F0"
        ctx.font = "15px monospace"

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length))
          ctx.fillText(text, i * 20, drops[i] * 20)

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      const matrixInterval = setInterval(drawMatrix, 33)

      // Remove matrix after 10 seconds
      setTimeout(() => {
        clearInterval(matrixInterval)
        document.body.removeChild(matrixContainer)
      }, 10000)
    }, 1500)
  }

  const showSpecialMatrix = () => {
    addToHistory({
      type: "system",
      content: "Activating special visualization mode...",
    })

    setTimeout(() => {
      addToHistory({
        type: "easter-egg",
        content:
          "Congratulations! You've discovered the special matrix mode. Your curiosity is your greatest asset as a developer.",
      })

      // Create a more colorful matrix animation
      const matrixContainer = document.createElement("div")
      matrixContainer.className = "matrix"
      document.body.appendChild(matrixContainer)

      const canvas = document.createElement("canvas")
      matrixContainer.appendChild(canvas)

      const ctx = canvas.getContext("2d")
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const characters =
        "M A S U M B I L L A H M A S U M B I L L A H M A S U M B I L L A H M A S U M"
      const columns = canvas.width / 20
      const drops = []
      const colors = ["#0F0", "#00F", "#F00", "#FF0", "#0FF", "#F0F"]

      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }

      const drawMatrix = () => {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        for (let i = 0; i < drops.length; i++) {
          const text = characters.charAt(Math.floor(Math.random() * characters.length))
          ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
          ctx.font = "15px monospace"
          ctx.fillText(text, i * 20, drops[i] * 20)

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }

          drops[i]++
        }
      }

      const matrixInterval = setInterval(drawMatrix, 33)

      // Remove matrix after 15 seconds
      setTimeout(() => {
        clearInterval(matrixInterval)
        document.body.removeChild(matrixContainer)
      }, 15000)
    }, 1500)
  }

  const showSkills = () => {
    addToHistory({
      type: "system",
      content: "Loading skills overview...",
    })

    setTimeout(() => {
      addToHistory({
        type: "skills",
        content: `
SKILLS OVERVIEW
==============

TECHNICAL PROFICIENCY
--------------------
Frontend: ████████████████████ 95%
Backend:  ███████████████████  90%
Database: ██████████████████   85%
DevOps:   ████████████         60%
UI/UX:    ██████████████████   85%
Mobile:   ██████████████       70%

TOP TECHNOLOGIES
---------------
- JavaScript/TypeScript
- React & Next.js
- Node.js
- NoSQL Databases
- AWS Cloud Services
- GraphQL & REST APIs

For more details, explore the /home/user/skills directory:
- languages.csv: Programming languages proficiency
- frameworks.json: Framework experience details
- tools.txt: Development tools and environments
- soft-skills.md: Non-technical professional skills
        `,
      })
    }, 800)
  }

  const showContact = () => {
    addToHistory({
      type: "system",
      content: "Contact information is encrypted for security.",
    })

    addToHistory({
      type: "system",
      content: "Use 'hack contact.enc' to attempt to decrypt.",
    })
  }

  const showProjects = () => {
    addToHistory({
      type: "system",
      content: "Loading project portfolio...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
PROJECT PORTFOLIO
================

FEATURED PROJECTS
---------------
1. AI-Powered Content Platform
   Technologies: React, Next.js, Node.js, TensorFlow
   Description: Personalized content delivery platform with AI recommendations

2. E-commerce Platform
   Technologies: React, Node.js, MongoDB
   Description: Full-stack e-commerce solution with payment processing

3. Data Visualization Dashboard
   Technologies: D3.js, Vue, Firebase
   Description: Real-time analytics dashboard for system performance metrics

GITHUB REPOSITORIES
-----------------
- frontend-framework: A lightweight component library
- algorithm-visualizer: Educational tool for visualizing algorithms
- api-toolkit: Collection of utilities for API development
- security-scanner: Web application security testing tool
- performance-metrics: Library for measuring web performance

For more details, explore the /home/user/projects directory:
- portfolio.json: Complete project listing with details
- github-repos.list: All public repositories
- current-work.log: Recent development activity
- featured-project.md: Detailed case study of featured project
        `,
      })
    }, 800)
  }

  const showExperience = () => {
    addToHistory({
      type: "system",
      content: "Loading professional experience...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
PROFESSIONAL EXPERIENCE
=====================

CURRENT POSITION
--------------
Senior Frontend Developer at TechInnovate Solutions (2021 - Present)
- Lead development of customer-facing web applications
- Architect reusable component libraries and design systems
- Mentor junior developers and conduct code reviews

PREVIOUS ROLES
------------
Full Stack Developer at DataViz Enterprises (2018 - 2021)
- Developed data visualization dashboards for enterprise clients
- Built RESTful APIs and microservices using Node.js

Web Developer at Creative Digital Agency (2016 - 2018)
- Created responsive websites for clients across industries
- Developed custom WordPress themes and plugins

KEY ACHIEVEMENTS
--------------
- Reduced page load times by 65% with performance optimization framework
- Led migration from monolithic to microservices architecture
- Received company-wide innovation award for AI recommendation engine

For more details, explore the /home/user/experience directory:
- work-history.json: Detailed employment history
- achievements.md: Notable professional accomplishments
- testimonials.txt: Feedback from colleagues and clients
        `,
      })
    }, 800)
  }

  const showEducation = () => {
    addToHistory({
      type: "system",
      content: "Loading educational background...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
EDUCATION & TRAINING
==================

FORMAL EDUCATION
--------------
Master of Science in Computer Science
Tech University (2016)
- Focus: Software Engineering and Artificial Intelligence
- Thesis: "Optimizing User Experience Through Predictive Algorithms"

Bachelor of Science in Computer Science
State University (2014)
- Focus: Web Development and Database Systems
- Senior Project: "Real-time Collaborative Coding Platform"

CERTIFICATIONS
------------
- AWS Certified Solutions Architect (2022)
- Google Professional Cloud Developer (2021)
- Microsoft Certified: Azure Developer Associate (2020)
- Certified Kubernetes Administrator (2021)

CONTINUING EDUCATION
-----------------
- Advanced GraphQL API Design (2023)
- Web Performance Optimization Masterclass (2022)
- Secure Coding Practices for Web Developers (2022)
- Data Visualization with D3.js (2021)

For more details, explore the /home/user/education directory:
- degrees.json: Formal education details
- certifications.md: Professional certifications
- courses.txt: Continuing education and training
        `,
      })
    }, 800)
  }

  const showInterests = () => {
    addToHistory({
      type: "system",
      content: "Loading personal interests...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
PERSONAL INTERESTS
================

TECHNOLOGY & MAKING
----------------
- Open Source Contributing: Active in several projects
- Electronics & Arduino: Building IoT devices
- 3D Printing: Creating functional prototypes
- Game Development: Experimenting with Unity and Godot

LEARNING & GROWTH
--------------
- Language Learning: Currently studying Japanese
- Music Production: Creating electronic music
- Technical Writing: Maintaining a personal tech blog
- Public Speaking: Member of local Toastmasters club

PHYSICAL ACTIVITIES
----------------
- Rock Climbing: Indoor bouldering and sport climbing
- Hiking: Exploring national parks
- Cycling: Road cycling and mountain biking
- Yoga: Regular practice for balance and mindfulness

For more details, explore the /home/user/interests directory:
- hobbies.md: Detailed information about personal interests
- books.json: Favorite and influential books
- travel.txt: Travel experiences and aspirations
        `,
      })
    }, 800)
  }

  const showAbout = () => {
    addToHistory({
      type: "system",
      content: "Loading about information...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
ABOUT ME
=======

I am a passionate web developer and software engineer with a deep interest in creating elegant, efficient, and user-friendly applications. My journey in technology began with simple HTML websites and has evolved into building complex, scalable applications using modern frameworks and methodologies.

I believe in continuous learning and staying updated with the latest technologies while maintaining a strong foundation in core principles. My approach to problem-solving combines analytical thinking with creative solutions.

My technical expertise spans frontend and backend development, with particular strength in JavaScript/TypeScript ecosystems, React, and Node.js. I'm also experienced with database design, API development, and cloud infrastructure.

Beyond coding, I'm passionate about user experience, accessibility, and performance optimization. I believe technology should serve people, not the other way around.

When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing knowledge through mentoring and writing technical articles.

For more detailed information, try these commands:
- 'skills' - View technical and soft skills
- 'projects' - Browse portfolio of work
- 'experience' - See professional history
- 'education' - View educational background
- 'interests' - Discover personal interests
        `,
      })
    }, 800)
  }

  const showResume = () => {
    addToHistory({
      type: "system",
      content: "Generating comprehensive resume...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
PROFESSIONAL RESUME
=================

SUMMARY
------
Experienced software engineer specializing in web development with 7+ years of professional experience. Proficient in frontend and backend technologies with a focus on creating performant, accessible, and user-friendly applications. Strong problem-solving abilities and a passion for clean, maintainable code.

PROFESSIONAL EXPERIENCE
--------------------
Senior Frontend Developer | TechInnovate Solutions | 2021 - Present
- Lead development of customer-facing web applications using React and Next.js
- Architect and implement reusable component libraries and design systems
- Mentor junior developers and conduct code reviews
- Optimize application performance and accessibility compliance

Full Stack Developer | DataViz Enterprises | 2018 - 2021
- Developed data visualization dashboards for enterprise clients
- Built RESTful APIs and microservices using Node.js and Express
- Implemented real-time data processing with WebSockets and Redis
- Designed and optimized database schemas for performance

Web Developer | Creative Digital Agency | 2016 - 2018
- Created responsive websites for clients across various industries
- Developed custom WordPress themes and plugins
- Implemented e-commerce solutions with WooCommerce and Shopify
- Optimized website performance and SEO

EDUCATION
--------
Master of Science in Computer Science | Tech University | 2016
Bachelor of Science in Computer Science | State University | 2014

SKILLS
-----
Languages: JavaScript, TypeScript, HTML, CSS
Frontend: React, Next.js, Vue.js, Redux, Tailwind CSS, SASS
Backend: Node.js, Express, NestJS, Django, GraphQL, REST
Databases: MongoDB, PostgreSQL, MySQL, Redis
DevOps: Git, Docker, AWS, CI/CD, Vercel, Netlify
Testing: Jest, Cypress, React Testing Library
Tools: VS Code, Figma, Jira, Postman, Inkscape

CERTIFICATIONS
------------
AWS Certified Solutions Architect (2022)
Google Professional Cloud Developer (2021)
Microsoft Certified: Azure Developer Associate (2020)
Certified Kubernetes Administrator (2021)

ACHIEVEMENTS
----------
- Developed performance optimization framework reducing page load times by 65%
- Led migration from monolithic to microservices architecture
- Received company-wide innovation award for AI recommendation engine
- Published 20+ technical articles with over 500,000 readers
- Speaker at 5 major tech conferences

Use 'contact' command to view contact information.
        `,
      })
    }, 1000)
  }

  const showSocial = () => {
    addToHistory({
      type: "system",
      content: "Loading social media profiles...",
    })

    setTimeout(() => {
      addToHistory({
        type: "output",
        content: `
SOCIAL MEDIA PROFILES
===================

GitHub: github.com/billahdotdev
- Open source contributions and personal projects
- 20+ public repositories
- Active in JavaScript and React communities

LinkedIn: linkedin.com/in/billahdotdev
- Professional network and career updates
- Recommendations from colleagues and clients
- Articles on web development best practices

X: @billahdotdev
- Tech insights and industry news
- Engagement with developer community
- Conference and event updates

Dev.to: dev.to/billahdotdev
- Technical articles and tutorials
- Code snippets and solutions
- Career advice for developers

Medium: medium.com/@billahdotdev
- In-depth technical deep dives
- Case studies of complex projects
- Thought leadership on development trends

Use 'hack contact.enc' to view direct contact information.
        `,
      })
    }, 800)
  }

  const findInFiles = (searchTerm) => {
    if (!searchTerm) {
      addToHistory({
        type: "error",
        content: "find: missing search term. Usage: find [text]",
      })
      return
    }

    addToHistory({
      type: "system",
      content: `Searching for "${searchTerm}" in files...`,
    })

    const { files } = fileSystem
    const results = []

    // Search through all files
    for (const [path, content] of Object.entries(files)) {
      if (content.toLowerCase().includes(searchTerm.toLowerCase())) {
        results.push(path)
      }
    }

    setTimeout(() => {
      if (results.length > 0) {
        addToHistory({
          type: "output",
          content: `
Found "${searchTerm}" in ${results.length} files:
${results.map((path) => `- ${path}`).join("\n")}

Use 'cat [file]' to view file contents.
          `,
        })
      } else {
        addToHistory({
          type: "system",
          content: `No files containing "${searchTerm}" found.`,
        })
      }
    }, 1000)
  }

  const echoText = (text) => {
    if (!text) {
      addToHistory({
        type: "output",
        content: "",
      })
      return
    }

    addToHistory({
      type: "output",
      content: text,
    })
  }

  // Update the exitTerminal function to properly use the onExit callback
  const exitTerminal = () => {
    addToHistory({
      type: "system",
      content: "Exiting terminal...",
    })

    setTimeout(() => {
      if (onExit) {
        onExit()
      }
    }, 1000)
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  const renderLoadingSequence = () => {
    if (loadingStage === 0) {
      return <div className="terminal-text">Initializing system...</div>
    } else if (loadingStage === 1) {
      return (
        <>
          <div className="terminal-text">
            Initializing system... <span className="terminal-success">DONE</span>
          </div>
          <div className="terminal-text">Loading personal data modules...</div>
        </>
      )
    } else if (loadingStage === 2) {
      return (
        <>
          <div className="terminal-text">
            Initializing system... <span className="terminal-success">DONE</span>
          </div>
          <div className="terminal-text">
            Loading personal data modules... <span className="terminal-success">DONE</span>
          </div>
          <div className="terminal-text">Establishing secure connection...</div>
        </>
      )
    } else {
      return (
        <>
          <div className="terminal-text">
            Initializing system... <span className="terminal-success">DONE</span>
          </div>
          <div className="terminal-text">
            Loading personal data modules... <span className="terminal-success">DONE</span>
          </div>
          <div className="terminal-text">
            Establishing secure connection... <span className="terminal-success">DONE</span>
          </div>
          <div className="terminal-text">ACCESS GRANTED</div>
        </>
      )
    }
  }

  const renderHistoryItem = (item, index) => {
    switch (item.type) {
      case "command":
        return (
          <div key={index} className="terminal-command-history">
            <span className="terminal-prompt">$</span> {item.content}
          </div>
        )
      case "output":
        return (
          <div key={index} className="terminal-output-text">
            <pre>{item.content}</pre>
          </div>
        )
      case "output-html":
        return <div key={index} className="terminal-output-html" dangerouslySetInnerHTML={{ __html: item.content }} />
      case "error":
        return (
          <div key={index} className="terminal-error-text">
            {item.content}
          </div>
        )
      case "warning":
        return (
          <div key={index} className="terminal-warning-text">
            {item.content}
          </div>
        )
      case "success":
        return (
          <div key={index} className="terminal-success-text">
            {item.content}
          </div>
        )
      case "system":
        return (
          <div key={index} className="terminal-system-text">
            {item.content}
          </div>
        )
      case "file":
        return (
          <div key={index} className="terminal-file-view">
            <div className="terminal-file-header">
              <span className="terminal-file-icon">[FILE]</span> {item.filename}
            </div>
            <div className="terminal-file-content">
              <pre>{item.content}</pre>
            </div>
            <div className="terminal-file-footer">--- END OF FILE ---</div>
          </div>
        )
      case "hacking":
        // Replace the hacking animation with a simple message
        return (
          <div key={index} className="terminal-system-text">
            Attempting to decrypt... Please wait.
          </div>
        )
      case "matrix":
        // Replace the matrix animation with a simple message
        return (
          <div key={index} className="terminal-system-text">
            Visualization mode initializing...
          </div>
        )
      case "skills":
        return (
          <div key={index} className="terminal-skills">
            <pre>{item.content}</pre>
          </div>
        )
      case "easter-egg":
        return (
          <div key={index} className="terminal-easter-egg">
            {item.content}
          </div>
        )
      default:
        return <div key={index}>{item.content}</div>
    }
  }

  const containerClasses = `terminal-container ${isMinimized ? "h-12 min-h-0" : ""}`

  return (
    <div className={containerClasses}>
      <div className="terminal-header">
        <div className="terminal-title">PERSONAL_DATA_ACCESS v1.0.2</div>
        <div className="terminal-controls">
          <button
            onClick={toggleMinimize}
            className="terminal-circle"
            title={isMinimized ? "Expand" : "Minimize"}
            aria-label={isMinimized ? "Expand terminal" : "Minimize terminal"}
          ></button>
          <button
            onClick={exitTerminal}
            className="terminal-circle"
            title="Close"
            aria-label="Close terminal and return to homepage"
          ></button>
        </div>
      </div>

      {!isMinimized && (
        <div className="terminal-body" ref={terminalRef}>
          {!isInitialized ? (
            <div className="terminal-loading">{renderLoadingSequence()}</div>
          ) : (
            <>
              <div className="terminal-welcome">
                <div className="terminal-text">Welcome to the personal data access terminal.</div>
                <div className="terminal-text">Type 'help' for available commands or 'exit' to return to homepage.</div>
              </div>

              <div className="terminal-history">{terminalHistory.map(renderHistoryItem)}</div>

              <form onSubmit={handleSubmit} className="terminal-input-form">
                <div className="terminal-input-line">
                  <span className="terminal-prompt">$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={currentInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className="terminal-input"
                    autoFocus
                    spellCheck="false"
                    autoComplete="off"
                    autoCapitalize="off"
                  />
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default HackerMe

