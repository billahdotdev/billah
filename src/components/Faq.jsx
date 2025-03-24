"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Code,
  BarChart,
  PenTool,
  Terminal,
  ChevronRight,
  ChevronLeft,
  X,
  MessageCircle,
  Lightbulb,
  Sparkles,
  ArrowRight,
} from "lucide-react"
import "./Faq.css"

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("popular")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeQuestion, setActiveQuestion] = useState(null)
  const [showSearch, setShowSearch] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef(null)
  const searchTimeoutRef = useRef(null)
  const categoriesInnerRef = useRef(null)

  const categoryIcons = {
    popular: <MessageCircle size={22} color="white" />,
    web: <Code size={22} />,
    seo: <BarChart size={22} />,
    marketing: <Sparkles size={22} />,
    branding: <PenTool size={22} />,
    linux: <Terminal size={22} />,
  }

  const categories = [
    { id: "popular", label: "Popular Questions" },
    { id: "web", label: "Web Development" },
    { id: "seo", label: "SEO" },
    { id: "marketing", label: "Marketing" },
    { id: "branding", label: "Branding" },
    { id: "linux", label: "Linux" },
  ]

  const faqItems = [
    // Popular questions across categories
    {
        "question": "What services do you offer?",
        "answer": "I offer a comprehensive range of digital services including web development, SEO optimization, digital marketing, brand identity design, and Linux migration services. Each service is tailored to meet your specific business needs and goals.",
        "category": "popular",
        "keywords": ["services", "offer", "provide", "help", "work", "do"]
      },
      {
        "question": "How much do your services cost?",
        "answer": "My pricing is customized based on project scope, timeline, and specific requirements. I offer transparent pricing with detailed proposals outlining all costs upfront. Contact me for a free consultation to discuss your project and receive a personalized quote.",
        "category": "popular",
        "keywords": ["price", "cost", "pricing", "fee", "charge", "expensive", "cheap", "budget", "money", "pay"]
      },
      {
        "question": "How long does a typical project take?",
        "answer": "Project timelines vary depending on complexity and scope. A basic website might take 2-4 weeks, while a comprehensive branding project could take 4-8 weeks. SEO and marketing campaigns are ongoing services with initial setup periods of 2-3 weeks. I'll provide a detailed timeline during our consultation.",
        "category": "popular",
        "keywords": ["time", "timeline", "duration", "long", "take", "finish", "complete", "weeks", "months"]
      },
      {
        "question": "Do you offer ongoing support after the project is complete?",
        "answer": "Yes, I provide ongoing support after completing any project. Whether it’s website maintenance, SEO monitoring, digital marketing campaigns, or post-migration support for Linux, I offer flexible options to ensure your business continues to thrive after the initial work is done.",
        "category": "popular",
        "keywords": ["support", "ongoing", "maintenance", "help", "after project", "assistance"]
      },
      {
        "question": "Can you help my business improve its online visibility?",
        "answer": "Absolutely! I specialize in SEO and digital marketing strategies that help businesses increase their online presence, improve search engine rankings, and drive more traffic to their websites. I create customized plans based on your goals and target audience to maximize your visibility.",
        "category": "popular",
        "keywords": ["visibility", "online", "improve", "seo", "marketing", "visibility", "traffic"]
      },
      {
        "question": "Do I need to have experience with Linux before migrating?",
        "answer": "No prior Linux experience is required. I offer full support and guidance throughout the entire migration process, ensuring a smooth transition. I can help you get familiar with the Linux environment and assist with any issues that may arise post-migration.",
        "category": "popular",
        "keywords": ["Linux", "migration", "support", "new user", "transition", "help"]
      },
      {
        "question": "How can you help my business stand out from competitors with branding?",
        "answer": "I work with you to develop a unique and cohesive brand identity that resonates with your target audience. By focusing on your business's strengths and values, I create visual elements like logos, color schemes, and messaging that differentiate you from competitors and build a memorable presence in the market.",
        "category": "popular",
        "keywords": ["branding", "stand out", "competitive", "unique", "identity", "memorable", "design"]
      },
      {
        "question": "Can you help with content creation for my website or social media?",
        "answer": "Yes, I offer content creation services for websites, blogs, and social media platforms. I help craft engaging and SEO-friendly content that aligns with your brand’s voice and attracts your target audience, helping you build a stronger online presence and engage customers effectively.",
        "category": "popular",
        "keywords": ["content", "creation", "website", "social media", "engagement", "SEO", "write"]
      },
      {
        "question": "What kind of businesses can benefit from your services?",
        "answer": "My services are designed for small businesses, startups, and individuals looking to establish or improve their online presence, whether it's through web development, SEO, digital marketing, branding, or Linux migration. I tailor my approach to each client’s specific goals and budget.",
        "category": "popular",
        "keywords": ["businesses", "small business", "startup", "individuals", "tailored", "services"]
      },
      {
        "question": "How do I get started with your services?",
        "answer": "Getting started is simple! Reach out to me for a free consultation, and we’ll discuss your needs, goals, and timeline. From there, I’ll create a customized plan to ensure we meet your business objectives efficiently. I’ll be with you every step of the way to ensure success.",
        "category": "popular",
        "keywords": ["get started", "begin", "consultation", "plan", "services", "contact"]
      },

    // Web Development
    {
        "question": "What technologies do you use for web development?",
        "answer": "I specialize in using modern web technologies such as HTML, CSS, JavaScript, and popular frameworks like React and Next.js. I ensure that your website is responsive, user-friendly, and performs well on all devices, creating a seamless experience for your visitors.",
        "category": "web",
        "keywords": ["technologies", "stack", "react", "javascript", "framework", "responsive", "web development"]
      },
      {
        "question": "Do you handle website maintenance?",
        "answer": "Yes, I offer website maintenance services to keep your website running smoothly. This includes regular updates, security patches, content updates, and performance optimization. I can also fix any issues that arise and provide ongoing support to ensure your site stays up-to-date.",
        "category": "web",
        "keywords": ["maintenance", "update", "support", "fix", "care", "manage", "website"]
      },
      {
        "question": "How do you ensure website security?",
        "answer": "I take website security seriously by implementing SSL certificates for HTTPS encryption, secure login systems, and regularly updating the website’s software to protect against vulnerabilities. Additionally, I set up automatic backups and recovery options to safeguard your site against potential data loss or attacks.",
        "category": "web",
        "keywords": ["security", "safe", "encryption", "backup", "protect", "vulnerabilities", "website"]
      },
      {
        "question": "What is responsive web design?",
        "answer": "Responsive web design ensures that your website adapts to different screen sizes and devices, whether it's a desktop, tablet, or smartphone. This is important because it provides a better user experience and helps your website rank higher on search engines like Google.",
        "category": "web",
        "keywords": ["responsive", "design", "mobile", "tablet", "desktop", "user experience"]
      },
      {
        "question": "How long does it take to build a website?",
        "answer": "The time it takes to build a website depends on the complexity and scope of the project. A simple website can take a few weeks, while more complex sites with custom features might take several months. I provide an estimated timeline after understanding your project’s requirements.",
        "category": "web",
        "keywords": ["time", "build", "website", "timeline", "project"]
      },
      {
        "question": "Do you offer custom web design?",
        "answer": "Yes, I offer custom web design services tailored to your brand and business needs. I work closely with you to create a design that reflects your vision, ensuring that your website is both visually appealing and user-friendly.",
        "category": "web",
        "keywords": ["custom", "web design", "design", "branding", "user experience"]
      },
      {
        "question": "Will my website be search engine friendly?",
        "answer": "Yes, I build websites with SEO best practices in mind, including proper use of meta tags, headings, and keyword optimization. This helps your website perform better on search engines like Google, making it easier for potential customers to find you online.",
        "category": "web",
        "keywords": ["SEO", "search engine", "friendly", "optimization", "keywords", "google"]
      },
      {
        "question": "Can you integrate e-commerce functionality into my website?",
        "answer": "Yes, I can integrate e-commerce features such as product catalogs, shopping carts, secure checkout systems, and payment gateway integration. Whether you’re starting a small online store or need a more robust e-commerce solution, I can help you set up and maintain your online store.",
        "category": "web",
        "keywords": ["e-commerce", "store", "shopping cart", "payment", "online store"]
      },
      {
        "question": "How do I update the content on my website?",
        "answer": "I can set up a content management system (CMS) like WordPress, making it easy for you to update your website’s text, images, and other content without needing technical knowledge. Alternatively, I can provide ongoing maintenance if you prefer not to handle content updates yourself.",
        "category": "web",
        "keywords": ["update", "content", "cms", "website", "management", "easy"]
      },
      {
        "question": "Can you help with website hosting?",
        "answer": "Yes, I can assist with website hosting by recommending reliable hosting providers or helping you set up your hosting environment. I ensure that your site is hosted securely, has adequate resources, and performs well to give your visitors a smooth experience.",
        "category": "web",
        "keywords": ["hosting", "website", "server", "performance", "secure", "setup"]
      },
      {
        "question": "What is the cost of building a website?",
        "answer": "The cost of building a website varies depending on the features and complexity. A simple website can start at an affordable rate, while more complex sites may require a higher investment. I offer customized quotes based on your needs and provide transparent pricing.",
        "category": "web",
        "keywords": ["cost", "website", "price", "build", "quote", "affordable"]
      },
      {
        "question": "Do you provide ongoing support after the website is launched?",
        "answer": "Yes, I offer ongoing support after the website launch to ensure it runs smoothly. Whether you need help with updates, troubleshooting, or adding new features, I’m available to assist you in maintaining your website over time.",
        "category": "web",
        "keywords": ["support", "ongoing", "help", "maintenance", "troubleshoot", "website"]
      },

    // SEO
    {
        "question": "How long will it take to see results from SEO?",
        "answer": "SEO is a long-term strategy, and you can expect to see initial results within 3-6 months. However, significant improvements in search rankings may take 6-12 months. I will provide regular updates on your progress throughout the process.",
        "category": "seo",
        "keywords": ["time", "results", "ranking", "wait", "see", "improve"]
      },
      {
        "question": "What does your basic SEO service include?",
        "answer": "My basic SEO service includes keyword research, on-page optimization (such as meta tags, headings, and content optimization), and improving your site's mobile-friendliness and load speed. This service is designed to help small businesses get started with SEO and improve their search engine visibility.",
        "category": "seo",
        "keywords": ["basic", "service", "include", "seo", "optimization", "keywords"]
      },
      {
        "question": "What is on-page SEO?",
        "answer": "On-page SEO refers to optimizing the content and HTML elements of your website to make it more search engine-friendly. This includes things like meta tags, title tags, headings, and keyword-rich content. It helps search engines understand your site and improve your ranking.",
        "category": "seo",
        "keywords": ["on-page", "seo", "optimization", "content", "tags", "ranking"]
      },
      {
        "question": "Why is SEO important for my website?",
        "answer": "SEO is important because it helps your website rank higher on search engines like Google, making it easier for potential customers to find your business. It increases organic traffic to your website, helping you attract more leads and grow your business.",
        "category": "seo",
        "keywords": ["important", "seo", "website", "ranking", "traffic", "customers"]
      },
      {
        "question": "How do you improve my website's SEO?",
        "answer": "I start with basic keyword research to identify terms that will attract your target audience. I then optimize your website’s content and structure, focusing on areas like meta tags, headings, and ensuring your site loads quickly and is mobile-friendly. These foundational improvements help search engines better understand and rank your site.",
        "category": "seo",
        "keywords": ["improve", "website", "seo", "keywords", "content", "mobile"]
      },
      {
        "question": "How do you measure the success of SEO?",
        "answer": "I track your website’s organic traffic, keyword rankings, and overall performance on search engines. I also monitor how well your pages are performing in search results and provide monthly reports with insights on progress and areas for improvement.",
        "category": "seo",
        "keywords": ["measure", "success", "seo", "traffic", "keywords", "performance"]
      },
      {
        "question": "Do you provide ongoing SEO services?",
        "answer": "Yes, I offer ongoing SEO services where I continuously monitor and optimize your website to ensure it remains competitive in search rankings. Regular updates and adjustments are essential to maintain and improve your site's visibility.",
        "category": "seo",
        "keywords": ["ongoing", "services", "seo", "monitor", "optimize", "update"]
      },
      {
        "question": "What is the cost of basic SEO services?",
        "answer": "The cost of basic SEO services varies depending on the size of your website and the scope of work required. I offer affordable packages designed to fit the needs of small businesses just starting with SEO. Contact me for a personalized quote.",
        "category": "seo",
        "keywords": ["cost", "basic", "seo", "pricing", "affordable", "services"]
      },
      {
        "question": "Will SEO improve my rankings on Google?",
        "answer": "Yes, SEO helps improve your website’s rankings on Google and other search engines. By optimizing your site, creating relevant content, and ensuring your site is user-friendly, you increase the chances of appearing higher in search results, which can attract more visitors to your website.",
        "category": "seo",
        "keywords": ["google", "rankings", "seo", "improve", "search", "results"]
      },
      {
        "question": "How do you choose the right keywords for my website?",
        "answer": "I choose keywords based on your business goals, target audience, and search volume. I use tools to identify keywords that are relevant to your products or services and that potential customers are searching for. The goal is to target terms that will drive high-quality traffic to your site.",
        "category": "seo",
        "keywords": ["keywords", "right", "choose", "website", "search", "traffic"]
      },
      {
        "question": "Is content important for SEO?",
        "answer": "Yes, content is crucial for SEO. Search engines prioritize high-quality, relevant content that answers users’ questions. I help you create engaging content that incorporates your target keywords and provides value to your audience, helping to improve your rankings and visibility.",
        "category": "seo",
        "keywords": ["content", "important", "seo", "quality", "keywords", "engagement"]
      },

    // Marketing
    {
        "question": "Which digital marketing channels do you focus on?",
        "answer": "I create customized marketing strategies across multiple channels including search engine marketing (SEM), social media, email marketing, content marketing, and display advertising. The specific channels we focus on depend on your target audience, business goals, and where your potential customers are most active.",
        "category": "marketing",
        "keywords": ["channel", "platform", "social", "email", "ads", "advertising", "media", "content"]
      },
      {
        "question": "How do you measure marketing campaign success?",
        "answer": "I establish clear KPIs aligned with your business objectives, which may include conversion rates, cost per acquisition, return on ad spend, engagement metrics, and overall ROI. I provide comprehensive analytics dashboards and regular reports that track performance and deliver actionable insights.",
        "category": "marketing",
        "keywords": ["measure", "track", "success", "performance", "metrics", "kpi", "report", "analytics", "data", "roi"]
      },
      {
        "question": "Do you handle social media management?",
        "answer": "Yes, I offer complete social media management services including strategy development, content creation, posting schedules, community engagement, paid advertising, and performance analytics. I can manage all major platforms including Instagram, Facebook, Twitter, LinkedIn, and TikTok.",
        "category": "marketing",
        "keywords": ["social", "media", "facebook", "instagram", "twitter", "linkedin", "tiktok", "post", "content"]
      },
      {
        "question": "What is content marketing, and how can it benefit my business?",
        "answer": "Content marketing involves creating valuable, relevant content that attracts and engages your target audience. This can include blog posts, videos, infographics, and podcasts. By providing useful information, content marketing builds trust with potential customers, drives traffic to your website, and improves SEO, leading to higher conversions.",
        "category": "marketing",
        "keywords": ["content", "marketing", "benefit", "blog", "video", "seo", "traffic", "conversion"]
      },
      {
        "question": "How do you optimize paid advertising campaigns?",
        "answer": "I optimize paid advertising campaigns by continuously analyzing performance metrics such as click-through rates (CTR), conversion rates, and cost-per-click (CPC). Based on this data, I adjust targeting, bidding strategies, ad copy, and creative assets to improve ROI and maximize results across platforms like Google Ads, Facebook Ads, and others.",
        "category": "marketing",
        "keywords": ["paid", "advertising", "campaigns", "optimization", "roi", "google ads", "facebook ads", "performance"]
      },
      {
        "question": "What is search engine marketing (SEM) and how does it work?",
        "answer": "Search engine marketing (SEM) is a form of digital marketing that involves running paid ads on search engines like Google. SEM helps increase your website's visibility on search engine results pages (SERPs) for targeted keywords, driving more traffic to your site. I manage the entire SEM process, from keyword research to ad creation, bidding strategies, and ongoing optimization.",
        "category": "marketing",
        "keywords": ["SEM", "search", "marketing", "paid ads", "google", "visibility", "keywords"]
      },
      {
        "question": "Do you provide email marketing services?",
        "answer": "Yes, I offer email marketing services, including campaign strategy, design, list management, and performance analysis. I help businesses create personalized email campaigns that nurture leads, boost engagement, and drive sales. With targeted segmentation, I ensure your messages reach the right audience at the right time.",
        "category": "marketing",
        "keywords": ["email", "marketing", "campaign", "list", "engagement", "sales", "targeting"]
      },
      {
        "question": "What is the difference between organic and paid marketing?",
        "answer": "Organic marketing involves strategies like SEO, content marketing, and social media engagement that build visibility over time without direct costs. Paid marketing, on the other hand, involves paid advertising like Google Ads and social media ads to quickly boost visibility and traffic. Both are effective, and I help businesses balance both for maximum impact.",
        "category": "marketing",
        "keywords": ["organic", "paid", "marketing", "seo", "ads", "content", "visibility"]
      },
      {
        "question": "How do you create a digital marketing strategy?",
        "answer": "I begin by understanding your business goals, target audience, and competitive landscape. From there, I craft a customized digital marketing strategy that aligns with your objectives. This may include selecting the right digital marketing channels, defining key performance indicators (KPIs), and planning content and ad campaigns to drive results. I continuously refine the strategy based on data and performance analysis.",
        "category": "marketing",
        "keywords": ["strategy", "digital", "marketing", "kpi", "content", "performance", "plan"]
      },
      {
        "question": "What is your approach to improving SEO?",
        "answer": "My approach to SEO focuses on both on-page and off-page optimization. I start by optimizing your website’s content, meta tags, and structure for targeted keywords. I also work on building high-quality backlinks, improving site speed, and enhancing user experience to boost your rankings on search engines and drive organic traffic to your site.",
        "category": "marketing",
        "keywords": ["seo", "search", "optimization", "on-page", "off-page", "backlinks", "content", "traffic"]
      },
      {
        "question": "Do you provide analytics and reporting for digital marketing campaigns?",
        "answer": "Yes, I provide detailed analytics and reporting to track the performance of all your digital marketing campaigns. I offer insights into key metrics like website traffic, conversion rates, ad performance, and overall ROI. Regular reports help ensure that your marketing efforts stay on track and allow us to make data-driven adjustments for continuous improvement.",
        "category": "marketing",
        "keywords": ["analytics", "reporting", "performance", "metrics", "tracking", "insights", "roi"]
      },
      {
        "question": "How much does a digital marketing campaign cost?",
        "answer": "The cost of a digital marketing campaign depends on the scope, channels used, and the level of service required. Whether you're looking for social media management, paid advertising, or a comprehensive multi-channel strategy, I offer flexible packages to fit your budget. Contact me for a personalized quote based on your specific business needs and goals.",
        "category": "marketing",
        "keywords": ["cost", "pricing", "campaign", "quote", "service", "budget"]
      },
      {
        "question": "Can you help me target specific customer segments with digital marketing?",
        "answer": "Yes, I specialize in creating targeted digital marketing campaigns that reach specific customer segments based on demographics, interests, and behaviors. Using data-driven insights, I can tailor ads, content, and social media strategies to effectively engage the right audience and drive higher conversion rates.",
        "category": "marketing",
        "keywords": ["target", "segmentation", "audience", "customer", "campaign", "data-driven"]
      },

    // Branding
    {
        "question": "What's included in your branding package?",
        "answer": "My comprehensive branding package includes brand strategy development, logo design, color palette selection, typography guidelines, brand voice definition, visual identity system, and brand usage guidelines. For established businesses, I also offer brand refresh and repositioning services.",
        "category": "branding",
        "keywords": ["package", "include", "offer", "brand", "logo", "identity", "design", "visual"]
      },
      {
        "question": "How do you create a brand that stands out?",
        "answer": "My branding approach combines strategic thinking with creative execution. I focus on creating distinctive, memorable brands that communicate your unique value proposition. Unlike many designers who focus solely on aesthetics, I ensure every brand element serves a strategic purpose and contributes to your business objectives.",
        "category": "branding",
        "keywords": ["unique", "stand out", "different", "memorable", "distinctive", "creative", "special"]
      },
      {
        "question": "Do you design logos and visual identities?",
        "answer": "Yes, I create complete visual identity systems including logos, color schemes, typography, imagery styles, and design elements. Each visual identity is crafted to be distinctive, memorable, and aligned with your brand strategy while being versatile enough to work across all applications from digital to print.",
        "category": "branding",
        "keywords": ["logo", "design", "visual", "identity", "brand", "graphic", "creative"]
      },
      {
        "question": "How long does the branding process take?",
        "answer": "The branding process typically takes 4-6 weeks depending on the complexity of the project and client feedback. This timeline includes strategy development, design iterations, and final delivery of your brand assets. I ensure that each step is carefully planned to create a cohesive and powerful brand.",
        "category": "branding",
        "keywords": ["timeline", "process", "duration", "branding", "design", "strategy"]
      },
      {
        "question": "Can you help rebrand my business?",
        "answer": "Absolutely! If your current branding no longer reflects your business's values or market position, I offer rebranding services to help refresh your image and reposition your business. This includes updating your logo, visual identity, and brand strategy to better align with your target audience and business goals.",
        "category": "branding",
        "keywords": ["rebrand", "refresh", "reposition", "update", "image", "business", "identity"]
      },
      {
        "question": "What’s the difference between branding and marketing?",
        "answer": "Branding is the creation of a unique identity for your business, including your values, mission, and visual appearance, which sets you apart in the marketplace. Marketing is the strategy used to communicate that brand to your audience through various channels. Branding lays the foundation for successful marketing, helping your messaging resonate more effectively.",
        "category": "branding",
        "keywords": ["difference", "branding", "marketing", "identity", "strategy", "communication"]
      },
      {
        "question": "Do you offer brand strategy services?",
        "answer": "Yes, I offer comprehensive brand strategy services to help define your business's unique position in the market. This includes identifying your target audience, crafting your brand message, and ensuring that every aspect of your branding supports your business objectives. A strong brand strategy is essential for long-term business success.",
        "category": "branding",
        "keywords": ["strategy", "brand", "position", "message", "target audience", "objective"]
      },
      {
        "question": "Can you help me create a brand that works across different platforms?",
        "answer": "Yes! A key part of my branding service is ensuring that your brand is versatile and works seamlessly across different platforms, whether digital or print. I design brand elements with flexibility in mind, ensuring consistency in logo use, color schemes, typography, and messaging on websites, social media, print materials, and more.",
        "category": "branding",
        "keywords": ["platform", "cross-platform", "versatile", "consistency", "brand", "digital", "print"]
      },
      {
        "question": "Do you offer brand guidelines after the design is complete?",
        "answer": "Yes, after completing your branding project, I provide a detailed set of brand guidelines. These guidelines include how to use your logo, color palette, typography, imagery, and any other visual elements, ensuring that your brand remains consistent across all mediums and over time.",
        "category": "branding",
        "keywords": ["guidelines", "brand", "usage", "logo", "typography", "color", "consistency"]
      },
      {
        "question": "How do you ensure the brand I get reflects my business's values?",
        "answer": "Before starting the design process, I work closely with you to understand your business, mission, values, and target audience. This deep understanding allows me to create a brand that truly represents who you are and resonates with your customers. Every design choice is made with your business goals and values in mind.",
        "category": "branding",
        "keywords": ["values", "business", "mission", "target audience", "understanding", "design"]
      },
      {
        "question": "Do you offer any additional services like web design or marketing?",
        "answer": "Yes, in addition to branding, I offer web design and digital marketing services to ensure that your brand has a strong online presence. This includes creating websites that reflect your brand identity and assisting with digital marketing strategies such as social media marketing, email campaigns, and SEO.",
        "category": "branding",
        "keywords": ["web design", "marketing", "services", "digital", "online presence", "social media", "SEO"]
      },
      {
        "question": "What do you need from me to start the branding process?",
        "answer": "To start the branding process, I'll need to understand your business goals, target audience, current branding (if any), and any preferences you have for your brand's style. I'll provide a questionnaire to gather this information and schedule a consultation to discuss your vision and needs in more detail.",
        "category": "branding",
        "keywords": ["start", "process", "information", "consultation", "questionnaire", "branding"]
      },
      {
        "question": "How much does a branding project cost?",
        "answer": "The cost of a branding project depends on the scope and complexity of the work. I offer packages that can be customized to your needs, whether you’re a small startup looking for a simple logo or an established business needing a full brand overhaul. Contact me for a personalized quote based on your requirements.",
        "category": "branding",
        "keywords": ["cost", "pricing", "quote", "package", "branding", "project"]
      },

    // Linux
    
    {
        "question": "Why should I consider migrating to Linux?",
        "answer": "Linux offers many benefits, including cost savings (no licensing fees), improved security, better performance on older hardware, and more customization options. It’s a great option for small businesses and individuals looking to save money and improve their computing environment.",
        "category": "linux",
        "keywords": ["why", "benefit", "advantage", "cost", "security", "performance", "migration"]
      },
      {
        "question": "What does your Linux migration service include?",
        "answer": "My Linux migration service covers everything from system assessment, planning, data migration, software installation, and configuration, to user training and post-migration support. I focus on making the transition smooth and ensuring minimal disruption while taking advantage of Linux's cost-effectiveness and security.",
        "category": "linux",
        "keywords": ["migration", "service", "transition", "data migration", "training", "support"]
      },
      {
        "question": "Can you help me migrate my data to Linux safely?",
        "answer": "Yes, I ensure that all your data is securely backed up and migrated to your new Linux system. Whether it's documents, emails, or other files, I'll make sure everything is transferred safely and is fully accessible on the new system.",
        "category": "linux",
        "keywords": ["data", "migration", "backup", "secure", "transfer"]
      },
      {
        "question": "What Linux distributions do you support for migration?",
        "answer": "I support a range of popular Linux distributions such as Ubuntu, Linux Mint, Fedora, and Debian. Depending on your needs and preferences, I’ll recommend the best option for your system to ensure an efficient migration.",
        "category": "linux",
        "keywords": ["distributions", "ubuntu", "mint", "fedora", "debian", "recommend"]
      },
      {
        "question": "Will my existing software work on Linux after migration?",
        "answer": "Many software applications can run on Linux either natively or through compatibility tools like Wine or virtual machines. If needed, I’ll help you find Linux alternatives or guide you through setting up necessary workarounds to ensure compatibility.",
        "category": "linux",
        "keywords": ["software", "compatibility", "apps", "alternatives", "wine"]
      },
      {
        "question": "How long will the migration process take?",
        "answer": "The time it takes to migrate depends on your system's complexity and the amount of data. For small businesses or individuals, the process can take from a few hours to a few days. I'll provide a more specific timeline based on your needs after an initial assessment.",
        "category": "linux",
        "keywords": ["time", "duration", "process", "timeline", "migration"]
      },
      {
        "question": "Is Linux a good choice for someone new to computers?",
        "answer": "Yes, Linux can be a great choice for beginners, especially distributions like Ubuntu and Linux Mint. They’re user-friendly, with intuitive interfaces and plenty of community support. I’ll help you get started and guide you through the setup process.",
        "category": "linux",
        "keywords": ["beginner", "new user", "ubuntu", "mint", "easy", "support"]
      },
      {
        "question": "How much does the Linux migration service cost?",
        "answer": "The cost depends on the complexity of your system and the amount of data to migrate. I offer affordable rates for both individuals and small businesses, and I can provide a personalized quote based on your specific needs. Please reach out to discuss further.",
        "category": "linux",
        "keywords": ["cost", "pricing", "quote", "affordable", "service"]
      },
      {
        "question": "Will I lose any data during the migration?",
        "answer": "Data loss is highly unlikely as I take all necessary precautions to back up your data before the migration. I ensure everything is safely transferred to your new system and double-check that all files are accessible once the process is complete.",
        "category": "linux",
        "keywords": ["data loss", "backup", "safety", "transfer", "verify"]
      },
      {
        "question": "What should I do to prepare for the Linux migration?",
        "answer": "To prepare, you’ll need to back up your important data, check that your hardware is compatible with Linux, and inform me about any essential software or configurations you need. I'll guide you through the process and ensure everything is ready for the migration.",
        "category": "linux",
        "keywords": ["prepare", "data", "backup", "hardware", "software"]
      },
      {
        "question": "What kind of support do you provide after the migration?",
        "answer": "I provide post-migration support including troubleshooting, software updates, security patches, and training. I ensure that you and your team are comfortable with Linux and assist you in maintaining your new system for the long term.",
        "category": "linux",
        "keywords": ["support", "post-migration", "training", "maintenance", "updates"]
      },
      {
        "question": "Can you help with ongoing maintenance after the migration?",
        "answer": "Yes, I offer ongoing maintenance services such as system updates, security patches, and performance optimization to ensure your Linux system continues to run smoothly and securely. I also offer additional training if needed.",
        "category": "linux",
        "keywords": ["maintenance", "updates", "security", "patches", "performance"]
      }
  ]

  // Update the position of the categories when active category changes
  useEffect(() => {
    if (categoriesInnerRef.current) {
      const currentIndex = categories.findIndex((cat) => cat.id === activeCategory)
      const translateX = currentIndex * -160 // Each card is 160px wide
      categoriesInnerRef.current.style.transform = `translateX(${translateX}px)`
    }
  }, [activeCategory, categories])

  // Improved fuzzy search function with better typo handling
  const fuzzySearch = useCallback((text, query) => {
    if (!query) return false

    // Convert both to lowercase for case-insensitive matching
    text = text.toLowerCase()
    query = query.toLowerCase()

    // Direct match check
    if (text.includes(query)) return true

    // Levenshtein distance calculation (simplified for performance)
    const maxDistance = Math.floor(query.length / 3) // Allow roughly 1/3 of characters to be wrong
    let distance = 0
    let textIndex = 0
    let queryIndex = 0

    while (textIndex < text.length && queryIndex < query.length) {
      if (text[textIndex] === query[queryIndex]) {
        queryIndex++
      } else {
        distance++
        if (distance > maxDistance) return false
      }
      textIndex++
    }

    // If we matched enough characters in the query
    return query.length - queryIndex <= maxDistance
  }, [])

  // Generate suggestions based on search query
  const generateSuggestions = useCallback(
    (query) => {
      if (!query || query.length < 2) return []

      const allSuggestions = []

      // Check for keyword matches
      faqItems.forEach((item) => {
        // Check question text
        if (fuzzySearch(item.question, query)) {
          allSuggestions.push({
            text: item.question,
            category: item.category,
            type: "question",
          })
        }

        // Check keywords
        if (item.keywords) {
          item.keywords.forEach((keyword) => {
            if (fuzzySearch(keyword, query) && !allSuggestions.some((s) => s.text === item.question)) {
              allSuggestions.push({
                text: item.question,
                category: item.category,
                type: "keyword",
                matchedKeyword: keyword,
              })
            }
          })
        }
      })

      // Limit to top 5 suggestions
      return allSuggestions.slice(0, 5)
    },
    [fuzzySearch],
  )

  useEffect(() => {
    // Reset active question when category changes
    setActiveQuestion(null)

    // Focus search input when search is shown
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [activeCategory, showSearch])

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.length > 0) {
      setIsSearching(true)

      // Delay search to avoid excessive processing while typing
      searchTimeoutRef.current = setTimeout(() => {
        const newSuggestions = generateSuggestions(searchQuery)
        setSuggestions(newSuggestions)
        setIsSearching(false)
      }, 300)
    } else {
      setSuggestions([])
      setIsSearching(false)
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery, generateSuggestions])

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        if (showSearch) {
          clearSearch()
        }
      }
    },
    [showSearch],
  )

  useEffect(() => {
    // Add keyboard event listener
    window.addEventListener("keydown", handleKeyDown)

    // Clean up
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])

  const toggleQuestion = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    setActiveCategory("search")
  }

  const clearSearch = () => {
    setSearchQuery("")
    setShowSearch(false)
    setActiveCategory("popular")
    setSuggestions([])
  }

  const selectSuggestion = (suggestion) => {
    // Find the question in faqItems
    const questionIndex = faqItems.findIndex(
      (item) => item.question === suggestion.text && item.category === suggestion.category,
    )

    if (questionIndex !== -1) {
      setActiveCategory(suggestion.category)

      // Wait for category change to take effect
      setTimeout(() => {
        setActiveQuestion(
          faqItems.filter((item) => item.category === suggestion.category).indexOf(faqItems[questionIndex]),
        )
      }, 100)
    }

    setSearchQuery("")
    setShowSearch(false)
    setSuggestions([])
  }

  // Filter items based on active category or search query
  const filteredItems =
    activeCategory === "search"
      ? faqItems.filter(
          (item) =>
            fuzzySearch(item.question, searchQuery) ||
            fuzzySearch(item.answer, searchQuery) ||
            (item.keywords && item.keywords.some((keyword) => fuzzySearch(keyword, searchQuery))),
        )
      : faqItems.filter((item) => item.category === activeCategory)

  // Get friendly message for no results
  const getNoResultsMessage = () => {
    const messages = [
      `Hmm, I don't have an answer for "${searchQuery}" yet.`,
      `I'm still learning about "${searchQuery}".`,
      `That's a great question about "${searchQuery}"! Let's chat about it.`,
      `I don't have details on "${searchQuery}" in my FAQ yet.`,
    ]

    return messages[Math.floor(Math.random() * messages.length)]
  }

  // Add a function to navigate between categories
  const navigateCategory = (direction) => {
    const currentIndex = categories.findIndex((cat) => cat.id === activeCategory)
    let newIndex

    if (direction === "next") {
      newIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0
    } else {
      newIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1
    }

    setActiveCategory(categories[newIndex].id)
  }

  return (
    <section className="section" id="faq">
      <div className="container">
        <h2 className="section-title">Have Questions?</h2>
        <p className="faq-subtitle">Find answers to common questions about my services</p>

        <div className="faq-search-container">
          {showSearch ? (
            <div className="faq-search-input-container">
              <Search size={18} className="faq-search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={handleSearch}
                className="faq-search-input"
                aria-label="Search questions"
              />
              <button onClick={clearSearch} className="faq-search-clear" aria-label="Clear search">
                <X size={18} />
              </button>

              {/* Suggestions dropdown */}
              <AnimatePresence>
                {suggestions.length > 0 && searchQuery.length > 0 && (
                  <motion.div
                    className="faq-suggestions"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    role="listbox"
                    aria-label="Search suggestions"
                  >
                    <div className="faq-suggestions-header">
                      <Lightbulb size={14} />
                      <span>Did you mean...</span>
                    </div>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="faq-suggestion-item"
                        onClick={() => selectSuggestion(suggestion)}
                        role="option"
                      >
                        <span className="faq-suggestion-text">{suggestion.text}</span>
                        <span className="faq-suggestion-category">
                          {categoryIcons[suggestion.category]}
                          <span>{categories.find((c) => c.id === suggestion.category)?.label}</span>
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Loading indicator */}
              {isSearching && searchQuery.length > 0 && (
                <div className="faq-search-loading" aria-hidden="true">
                  <div className="faq-search-loading-dot"></div>
                  <div className="faq-search-loading-dot"></div>
                  <div className="faq-search-loading-dot"></div>
                </div>
              )}
            </div>
          ) : (
            <button className="faq-search-button" onClick={() => setShowSearch(true)} aria-label="Open search">
              <Search size={18} />
              <span>Search questions</span>
            </button>
          )}
        </div>

        <div className="faq-categories-wrapper">
          <button
            className="faq-category-nav faq-category-nav-prev"
            onClick={() => navigateCategory("prev")}
            aria-label="Previous category"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="faq-categories" role="tablist" aria-label="FAQ Categories">
            <div className="faq-categories-inner" ref={categoriesInnerRef}>
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`faq-category ${activeCategory === category.id ? "active" : ""}`}
                  onClick={() => setActiveCategory(category.id)}
                  aria-selected={activeCategory === category.id}
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-controls={`panel-${category.id}`}
                >
                  <div className="faq-category-icon-wrapper">{categoryIcons[category.id]}</div>
                  <span className="faq-category-label">{category.label}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            className="faq-category-nav faq-category-nav-next"
            onClick={() => navigateCategory("next")}
            aria-label="Next category"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        <div className="faq-items-container">
          {filteredItems.length > 0 ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="faq-items"
                role="tabpanel"
                id={`panel-${activeCategory}`}
                aria-labelledby={`tab-${activeCategory}`}
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={`${item.category}-${index}`}
                    className={`faq-item ${activeQuestion === index ? "active" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <button
                      className="faq-question"
                      onClick={() => toggleQuestion(index)}
                      aria-expanded={activeQuestion === index}
                      aria-controls={`answer-${item.category}-${index}`}
                    >
                      <span>{item.question}</span>
                      <motion.div
                        animate={{ rotate: activeQuestion === index ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="faq-question-icon"
                        aria-hidden="true"
                      >
                        <ChevronRight size={18} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {activeQuestion === index && (
                        <motion.div
                          className="faq-answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          id={`answer-${item.category}-${index}`}
                        >
                          <p>{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="faq-no-results" role="status">
              <div className="faq-no-results-icon" aria-hidden="true">
                <Lightbulb size={32} />
              </div>
              <p>{getNoResultsMessage()}</p>
              <button onClick={clearSearch} className="faq-reset-search" aria-label="View all questions">
                <span>View all questions</span>
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        <div className="faq-contact-prompt">
          <div className="faq-contact-prompt-content">
            <h3>Still have questions?</h3>
            <p>I'm here to help with any specific questions about your project.</p>
            <a href="#contact" className="btn btn-outline">
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

