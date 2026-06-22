const { createApp } = Vue;

createApp({
    data: function() {
        return {
            menuOpen: false,
            locale: navigator.language.startsWith('pl') ? 'pl' : 'en',
            translations: {
                nav: {
                    about: { pl: "O mnie", en: "About" },
                    projects: { pl: "Projekty", en: "Projects" },
                    skills: { pl: "Umiejętności", en: "Skills" },
                    contact: { pl: "Kontakt", en: "Contact" }
                },
                hero: {
                    title: { pl: "Full Stack Developer", en: "Full Stack Developer" },
                    desc: {
                        pl: "Jestem programist\u0105 PHP z wieloletnim do\u015bwiadczeniem w tworzeniu i rozwijaniu aplikacji webowych. Pracuj\u0119 g\u0142\u00f3wnie z backendem, ale swobodnie poruszam si\u0119 tak\u017ce w obszarze frontendu, baz danych, test\u00f3w i wdro\u017ce\u0144.\n\nNajcz\u0119\u015bciej pracuj\u0119 z PHP, Symfony, Laravel, JavaScript, MySQL, Dockerem i PHPUnit. Cen\u0119 prosty, czytelny kod, dobr\u0105 organizacj\u0119 pracy oraz rozwi\u0105zania, kt\u00f3re s\u0105 stabilne i \u0142atwe w utrzymaniu.\n\nW pracy stawiam na odpowiedzialno\u015b\u0107, techniczn\u0105 rzetelno\u015b\u0107 i praktyczne podej\u015bcie do problem\u00f3w.",
                        en: "Full Stack Web Developer, experienced in designing and building web applications, especially in PHP, Laravel, Symfony, Vue.js, and Docker environments. I've worked on complex legacy systems as well as modern cloud-based solutions. I value clean, readable code, good organization, and solutions that are stable and maintainable."
                    },
                    contactBtn: { pl: "Skontaktuj si\u0119", en: "Contact Me" },
                    githubBtn: { pl: "M\u00f3j GitHub", en: "My GitHub" }
                },
                section: {
                    about: { pl: "Do\u015bwiadczenie zawodowe", en: "Professional Experience" },
                    projects: { pl: "Projekty", en: "Projects" },
                    skills: { pl: "Umiej\u0119tno\u015bci", en: "Skills" },
                    contact: { pl: "Nawi\u0105\u017cmy kontakt", en: "Let's Connect" }
                },
                contact: {
                    text: { pl: "Zawsze jestem zainteresowany nowymi projektami i mo\u017cliwo\u015bciami.", en: "Always interested in new projects and opportunities." }
                },
                footer: {
                    text: { pl: "\u00a9 2025 Mariusz. Wszystkie prawa zastrze\u017cone.", en: "\u00a9 2025 Mariusz. All rights reserved." }
                }
            },
            experiences: [
                {
                    id: 1,
                    company: "Rubix",
                    role: { pl: "Full Stack Developer", en: "Full Stack Developer" },
                    period: { pl: "Luty 2022 – Kwiecień 2024", en: "Feb 2022 – Apr 2024" },
                    location: "Remote",
                    description: {
                        pl: "Obsługa i rozwój złożonych systemów legacy, naprawianie trudnych błędów, optymalizacja wydajności bazy danych oraz uczestnictwo w procesach wdrażania systemów.",
                        en: "At Rubix, I was responsible for maintaining and developing an application with a highly complex, long-standing structure—a system based on heavily outdated legacy code, which required great caution and a deep understanding of the business context. My tasks included maintaining and developing applications, diagnosing and fixing challenging bugs, optimizing database performance, and participating in system deployment processes."
                    }
                },
                {
                    id: 2,
                    company: "ccFound",
                    role: { pl: "Full Stack Developer", en: "Full Stack Developer" },
                    period: { pl: "Marzec 2021 – Luty 2022", en: "March 2021 – February 2022" },
                    description: {
                        pl: "Migracja starej bazy kodu do Symfony, tworzenie nowego REST API, wdrażanie systemów serverless na Google Cloud.",
                        en: "My role involved migrating a legacy codebase to Symfony, developing a new REST-compliant API, and deploying serverless systems on Google Cloud. Working at ccFound taught me to be a real 'one-man band' – the scope of responsibilities was immense, requiring excellent organization and versatility."
                    }
                },
                {
                    id: 3,
                    company: "Sescom Polska",
                    role: { pl: "PHP Web Developer", en: "PHP Web Developer" },
                    period: { pl: "Listopad 2019 – Grudzień 2020", en: "November 2019 – December 2020" },
                    description: {
                        pl: "Tworzenie aplikacji w Laravel, implementacja systemu urlopów, zapewnianie jakości kodu zgodnie z zasadami SOLID i DRY.",
                        en: "I co-developed applications in Laravel, implemented a vacation system, and ensured code quality according to SOLID and DRY principles. This job helped me reach a higher level of professionalism in programming."
                    }
                },
                {
                    id: 4,
                    company: "Asist Sp. z o.o.",
                    role: { pl: "Web Developer", en: "Web Developer" },
                    period: { pl: "Sierpień 2017 – Październik 2019", en: "August 2017 – October 2019" },
                    description: {
                        pl: "Projektowanie i tworzenie aplikacji webowych w PHP, implementacja zaawansowanego wyszukiwarki ubezpieczeń samochodowych, budowa systemu CRM.",
                        en: "My responsibilities included designing and developing web applications in PHP, implementing an advanced car insurance search engine, and building a CRM system. I independently introduced object-oriented programming and supported the sales team."
                    }
                }
            ],
            projects: [
                {
                    id: 1,
                    name: "kolejki",
                    desc: { pl: "Implementacja REST API", en: "REST API Implementation" },
                    link: "https://github.com/mafio69/kolejki",
                    tech: ["PHP", "REST API", "Backend"]
                },
                {
                    id: 2,
                    name: "petstore-crud",
                    desc: { pl: "Aplikacja CRUD Pet Store", en: "Pet Store CRUD Application" },
                    link: "https://github.com/mafio69/petstore-crud",
                    tech: ["PHP", "CRUD", "API"]
                },
                {
                    id: 3,
                    name: "fast-php-log-viewer",
                    desc: { pl: "Szybki podgląd logów PHP", en: "Fast PHP Log Viewer" },
                    link: "https://github.com/mafio69/fast-php-log-viewer",
                    tech: ["PHP", "Logs", "Developer Tools"]
                },
                {
                    id: 4,
                    name: "php-logger",
                    desc: { pl: "Biblioteka logowania dla PHP", en: "PHP Logger Library" },
                    link: "https://github.com/mafio69/php-logger",
                    tech: ["PHP", "Logger", "Library"]
                },
                {
                    id: 5,
                    name: "blog-mafio-pl",
                    desc: { pl: "Blog engine dla mafio.pl", en: "Blog Engine for mafio.pl" },
                    link: "https://github.com/mafio69/blog-mafio-pl",
                    tech: ["PHP", "Blog", "CMS"]
                },
                {
                    id: 6,
                    name: "wirralAI",
                    desc: { pl: "Aplikacja wspomagana AI", en: "AI Powered Application" },
                    link: "https://github.com/mafio69/wirralAI",
                    tech: ["PHP", "AI", "Backend"]
                }
            ],
            skills: [
                {
                    category: { pl: "Backend", en: "Backend" },
                    items: ["PHP", "Laravel", "Symfony", "OOP", "SOLID", "Design Patterns"]
                },
                {
                    category: { pl: "Frontend", en: "Frontend" },
                    items: ["Vue.js", "JavaScript ES6+", "HTML5", "CSS3", "jQuery"]
                },
                {
                    category: { pl: "DevOps", en: "DevOps" },
                    items: ["Docker", "CI/CD", "GitHub Actions", "Jenkins", "Google Cloud"]
                },
                {
                    category: { pl: "Baza danych", en: "Database" },
                    items: ["MySQL", "PostgreSQL", "SQL"]
                },
                {
                    category: { pl: "AI", en: "AI" },
                    items: ["GitHub Copilot", "Claude Code", "OpenCode", "AI endpoint"]
                }
            ]
        };
    },
    computed: {
        localizedExperiences: function() {
            var self = this;
            return this.experiences.map(function(e) {
                return {
                    id: e.id,
                    company: e.company,
                    role: typeof e.role === 'object' ? e.role[self.locale] : e.role,
                    period: typeof e.period === 'object' ? e.period[self.locale] : e.period,
                    location: e.location,
                    description: typeof e.description === 'object' ? e.description[self.locale] : e.description
                };
            });
        },
        localizedProjects: function() {
            var self = this;
            return this.projects.map(function(p) {
                return {
                    id: p.id,
                    name: p.name,
                    desc: typeof p.desc === 'object' ? p.desc[self.locale] : p.desc,
                    link: p.link,
                    tech: p.tech
                };
            });
        },
        localizedSkills: function() {
            var self = this;
            return this.skills.map(function(s) {
                return {
                    category: typeof s.category === 'object' ? s.category[self.locale] : s.category,
                    items: s.items
                };
            });
        }
    },
    methods: {
        t: function(key) {
            var keys = key.split('.');
            var val = this.translations;
            for (var i = 0; i < keys.length; i++) {
                val = val[keys[i]];
            }
            return val ? val[this.locale] : key;
        },
        setLocale: function(loc) {
            this.locale = loc;
        },
        toggleMenu: function() {
            this.menuOpen = !this.menuOpen;
        }
    }
}).mount('#app');
