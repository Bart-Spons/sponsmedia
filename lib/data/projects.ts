// lib/data/projects.ts
export interface Project {
    id: string;
    title: string;
    titleNl?: string;
    description: string;
    descriptionNl?: string;
    image: string;
    video?: string; // Optional field for video content
    videoMuted?: boolean; // Always mute the video
    portrait?: boolean; // Vertical (9:16) video: shown whole on a blurred backdrop
    technologies: string[];
    category: string;
    categoryNl?: string;
    featured: boolean;
    liveUrl?: string;
    githubUrl?: string;
    completedDate: string;
    // Extended fields for detailed project pages
    client?: string;
    clientNl?: string;
    duration?: string;
    durationNl?: string;
    team?: string[];
    challenge?: string;
    challengeNl?: string;
    solution?: string;
    solutionNl?: string;
    results?: string[];
    resultsNl?: string[];
    additionalImages?: string[];
    testimonial?: {
        text: string;
        textNl?: string;
        author: string;
        role: string;
        roleNl?: string;
    };
}

export const projectsData: Project[] = [
    {
        id: "g-adventures",
        title: "G Adventures",
        description: "A travel notebook from South America, written by the people we met along the way.",
        image: "/images/projects/g-adventures/poster.webp",
        video: "/video/g-adventures.mp4",
        portrait: true,
        technologies: ["Concept", "Filming", "Editing", "Short-form video"],
        category: "Video Production",
        featured: true,
        completedDate: "2026-09",
        client: "G Adventures",
        duration: "17 days",
        challenge:
            "G Adventures wanted to show their Buenos Aires to Rio de Janeiro trip, through Argentina, Uruguay and Brazil, to a young audience. Not as another highlights reel of landmarks, but in a way that feels personal.",
        solution:
            "I turned the trip into a video notebook. Along the way I asked the people we met to write one piece of life advice in my notebook: a shopkeeper behind her counter, a girl in a Brazil shirt, kids on a football pitch. Every page became a scene, edited into a 40-second vertical video.",
        results: [
            "Published on the Instagram of G Adventures 18-to-Thirtysomethings",
            "Shared by Oak Travel",
            "A format that puts people, not places, at the centre of the trip",
        ],
        titleNl: "G Adventures",
        descriptionNl: "Een reisnotitieboek uit Zuid-Amerika, geschreven door de mensen die we onderweg ontmoetten.",
        categoryNl: "Videoproductie",
        clientNl: "G Adventures",
        durationNl: "17 dagen",
        challengeNl:
            "G Adventures wilde hun reis van Buenos Aires naar Rio de Janeiro, door Argentinië, Uruguay en Brazilië, laten zien aan een jong publiek. Niet als zoveelste highlightvideo van bezienswaardigheden, maar op een manier die persoonlijk voelt.",
        solutionNl:
            "Ik maakte van de reis een video-notitieboek. Onderweg vroeg ik de mensen die we ontmoetten om één levensles in mijn boekje te schrijven: een verkoopster achter haar toonbank, een meisje in een Braziliëshirt, kinderen op een voetbalveldje. Elke pagina werd een scène, gemonteerd tot een verticale video van 40 seconden.",
        resultsNl: [
            "Gepubliceerd op de Instagram van G Adventures 18-to-Thirtysomethings",
            "Gedeeld door Oak Travel",
            "Een format waarin mensen centraal staan, niet plekken",
        ],
    },
    {
        id: "capgemini",
        title: "Capgemini",
        description:
            "Onboarding platform for new employees to learn different frameworks.",
        image: "/images/projects/capgemini/cap.webp",
        video: "/video/capgemini.mp4",
        videoMuted: true,
        technologies: ["HTML", "CSS", "Javascript", "Figma"],
        category: "Web Design, Web Development",
        featured: true,
        liveUrl: "https://capgemini.example.com",
        completedDate: "2025-07",
        client: "Capgemini",
        duration: "5 months",
        team: [
            "Frontend Developer",
            "Team Lead Front-end development",
            "UI/UX Designer",
        ],
        challenge:
            "How can developers find the right Framework that fits them? Capgemini needed a comprehensive onboarding platform to help new employees quickly learn and adapt to various front-end frameworks",
        solution:
            "I designed and developed an interactive learning platform with hands-on coding exercises, framework comparisons, and progress tracking. The platform includes guided tutorials, real-world project examples, and assessment tools to ensure consistent learning outcomes.",
        results: [
            "Application used at the Capgemini Academy (learning school within the company)",
            "During the onboarding developers learn 3 different frameworks instead of 1",
            "Experienced developers can also learn a new framework using this application.",
        ],
        additionalImages: [
            "/placeholders/capgemini.png",
            "/images/projects/capgemini/screen1.webp",
            "/images/projects/capgemini/screen2.webp",
        ],
        titleNl: "Capgemini Academy",
        descriptionNl:
            "Een uitgebreide leerplatform voor front-end frameworks ontworpen voor Capgemini's onboarding proces.",
        categoryNl: "Web Development",
        clientNl: "Capgemini",
        challengeNl:
            "Hoe kunnen developers het juiste Framework vinden dat bij hen past? Capgemini had een uitgebreid onboarding platform nodig om nieuwe medewerkers te helpen snel te leren en zich aan te passen aan verschillende front-end frameworks",
        solutionNl:
            "Ik heb een interactief leerplatform ontworpen en ontwikkeld met hands-on coding oefeningen, framework vergelijkingen en voortgangstracking. Het platform bevat begeleide tutorials, real-world project voorbeelden en assessment tools om consistente leerresultaten te waarborgen.",
        resultsNl: [
            "Applicatie gebruikt bij de Capgemini Academy (leerschool binnen het bedrijf)",
            "Tijdens de onboarding leren developers 3 verschillende frameworks in plaats van 1",
            "Ervaren developers kunnen ook een nieuw framework leren met deze applicatie.",
        ],
    },
    {
        id: "mindmelt",
        title: "MindMelt",
        description: "Web development for a Japanese marketing agency.",
        image: "/images/projects/mindmelt/mindmelt.webp",
        video: "/video/mindmelt.mp4",
        technologies: ["Wordpress", "Adobe XD", "HTML", "CSS", "JavaScript"],
        category: "Web Development",
        featured: true,
        liveUrl: "https://mindmelt.jp",
        completedDate: "2025-08",
        client: "MindMelt Marketing Agency",
        duration: "3 months",
        team: ["Wordpress Developer", "UI/UX Designer"],
        challenge:
            "A Japanese marketing agency needed a modern, interactive website that would attract international clients to reach out to them before entering the Japanese market.",
        solution:
            "I developed a dynamic WordPress site with custom plugins. Small interaction coded in custom sections. (The website is still being updated with new content and features)",
        results: [
            "Increased the SEO",
            "Improved website loading speed ",
            "Enhanced user experience with real-time features",
        ],
        testimonial: {
            text: "We are very happy with the result so far. The real-time features and modern design have significantly improved the flow of the website. I look forward to continuing our collaboration with SponsMedia as we expand our online presence.",
            author: "Julio Luciano",
            role: "CEO of MindMelt",
        },
        titleNl: "MindMelt",
        descriptionNl: "Web development voor een Japans marketing bureau.",
        categoryNl: "Web Development",
        clientNl: "MindMelt Marketing Agency",
        challengeNl:
            "Een Japans marketing bureau had een moderne, interactieve website nodig die internationale klanten zou aantrekken om contact met hen op te nemen voordat ze de Japanse markt betreden.",
        solutionNl:
            "Ik heb een dynamische WordPress site ontwikkeld met aangepaste plugins. Kleine interacties gecodeerd in aangepaste secties. (De website wordt nog steeds bijgewerkt met nieuwe content en features)",
        resultsNl: [
            "Verhoogde de SEO",
            "Verbeterde website laadsnelheid",
            "Verbeterde gebruikerservaring met real-time features",
        ],
    },
    // {
    //     id: "kraftr",
    //     title: "Kraftr",
    //     description: "Branding for a 3d printing company / media page.",
    //     image: "/placeholders/kraftr.jpg",
    //     technologies: ["Illustrator", "OpenAI"],
    //     category: "Digital Design",
    //     featured: true,
    //     liveUrl: "https://kraftr.example.com",
    //     completedDate: "2024-01",
    // },
];
