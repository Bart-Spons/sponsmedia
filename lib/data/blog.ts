// lib/data/blog.ts
export interface BlogPost {
    id: string;
    title: string;
    titleNl?: string;
    excerpt: string;
    excerptNl?: string;
    author: string;
    publishDate: string;
    tags: string[];
    tagsNl?: string[];
    image: string;
    content: string;
    contentNl?: string;
}

export const blogData: BlogPost[] = [
    {
        id: "seo-2025-complete-guide",
        title: "SEO in 2025: The Complete Guide to Ranking Higher",
        titleNl: "SEO in 2025: De Complete Gids voor Hogere Rankings",
        excerpt:
            "A comprehensive guide to SEO strategies and ranking factors for 2025. Learn how to optimize your site for the latest search engine updates and stay ahead of the competition.",
        excerptNl:
            "Een uitgebreide gids voor SEO-strategieën en rankingfactoren in 2025. Leer hoe je je site optimaliseert voor de nieuwste zoekmachine-updates en voorop blijft lopen.",
        author: "Bart Spons",
        publishDate: "2025-08-01",
        tags: ["SEO", "Google", "Ranking", "Digital Marketing"],
        tagsNl: ["SEO", "Google", "Ranking", "Digitale Marketing"],
        image: "/images/blog/seo-landscape-banner.png",
        content: `
<h2>SEO in 2025: The Complete Guide to Ranking Higher</h2>
<p>Master modern SEO with proven strategies that actually work. From technical optimization to content marketing, here's everything you need to dominate search results in 2025.</p>
<img src="/images/blog/seo-analytics.webp" alt="SEO Strategy Dashboard" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<p><strong>Personal Story Time:</strong> In 2024, I was working in a Japanese marketing agency in Tokyo, Japan. I helped them from the second page to the first page on Google for "marketing agency Japan." The secret? It wasn't some black-hat trick or expensive tool. It was understanding how SEO has fundamentally changed in 2024.</p>
<p>If you're still using 2022 SEO tactics, you're probably wondering why your rankings are stuck. Here's the reality: <strong>Google's AI revolution has rewritten the rules.</strong></p>
<h3>What Actually Works in 2025</h3>
<p>Let me be blunt – most SEO advice online is outdated. After optimizing websites this year, here's what actually changed:</p>
<ul>
  <li>Google now cares more about <strong>Experience, Expertise, Authoritativeness, and Trust (E-E-A-T)</strong> than keyword stuffing. This isn't just theory – I've seen it work.</li>
  <li><strong>Real Success Story:</strong> A fitness coach on social media jumped to #1 for "weight loss tips" not because of perfect keywords, but because she shared her authentic 50-pound weight loss journey with real photos and progress logs.</li>
  <li><strong>Quick Win:</strong> Add an "About" section to every blog post explaining why YOU'RE qualified to write about this topic. Authority beats algorithms.</li>
</ul>
<h3>Technical SEO: The Foundation That Can't Be Ignored (Web Core Vitals)</h3>
<p>Here's the brutal truth: If your site is slow, nothing else matters.</p>
<p>Google's Core Web Vitals aren't suggestions – they're ranking factors that can make or break your site.</p>
<ul>
  <li><strong>Loading Speed:</strong> Under 2.5 seconds (most sites take 6+ seconds)</li>
  <li><strong>Interactivity:</strong> Less than 100ms delay when users click</li>
  <li><strong>Visual Stability:</strong> No surprise layout shifts that annoy users</li>
</ul>
<p>Use Google's PageSpeed Insights tool RIGHT NOW. If your score is below 90, you're losing rankings (and customers) every single day.</p>
<img src="/images/blog/web-core-vitals.png" alt="Web Core Vitals Dashboard" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h3>Mobile-First = Mobile-ONLY</h3>
<p>70% of searches happen on mobile. If your site sucks on phones, Google treats it as broken everywhere.</p>
<p><strong>The 10-Second Test:</strong> Open your website on your phone. Can you easily read text, click buttons, and fill forms? If not, fix this before anything else.</p>
<h3>Content Strategy: Beyond Keywords</h3>
<p>Stop chasing individual keywords. Think bigger. Think clusters.</p>
<p>Instead of creating random one-off articles, create content series around broad topics. Netflix does this with shows, and you should do it with content.</p>
<ul>
  <li><strong>Pillar Content:</strong> One comprehensive guide (3,000+ words)</li>
  <li><strong>Cluster Content:</strong> 5-7 supporting articles that link back to your pillar</li>
</ul>
<p>Pick ONE broad topic in your industry. Create the ultimate guide, then support it with smaller, focused articles. This strategy doubled my client's organic traffic in 6 months.</p>
<img src="/images/blog/seo-content.webp" alt="Content Strategy Planning" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h3>The "So What?" Test</h3>
<p>Every paragraph should pass this test: If a reader says "so what?" you should have a clear, valuable answer.</p>
<p>❌ <strong>Bad:</strong> "Email marketing is important for businesses."</p>
<p>✅ <strong>Good:</strong> "Email marketing generates $42 for every $1 spent, making it the highest ROI channel for small businesses."</p>
<h3>Link Building That Actually Works</h3>
<img src="/images/blog/seo-link.webp" alt="Link Building Strategy" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<p>Forget buying links. Here's how you can land high-authority backlinks in 6 months:</p>
<ul>
  <li><strong>The Broken Link Goldmine:</strong> Find broken links on popular sites, create better replacement content, then offer it as a solution.</li>
  <li><strong>My 4-Step Process:</strong>
    <ol>
      <li>Find popular articles in your industry</li>
      <li>Check for broken links (use free tools like Broken Link Checker)</li>
      <li>Create content that could replace the broken link</li>
      <li>Email: "Hey, noticed a broken link in your article. I have a resource that might help."</li>
    </ol>
  </li>
  <li><strong>The Skyscraper Technique 2.0:</strong> Find outdated content that's ranking well. Create something 10x better.</li>
</ul>
<h3>Local SEO: Your Competitive Advantage</h3>
<img src="/images/blog/local-seo.webp" alt="Local SEO Strategy" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h4>Google Business Profile Optimization</h4>
<p>This is the fastest way to improve local rankings:</p>
<ul>
  <li>Post 2-3 updates (photos, events, offers)</li>
  <li>Respond to ALL reviews within 24 hours</li>
  <li>Add new photos (Google loves fresh visual content)</li>
  <li>Update business hours for holidays</li>
</ul>
<ul>
  <li>Analyze insights and double down on top-performing content</li>
  <li>Add new services or products</li>
  <li>Update description with seasonal keywords</li>
</ul>
<p>Ask customers to leave reviews with specific keywords. Instead of "please leave a review," try "if you loved our pasta, we'd appreciate a review mentioning your favorite dish."</p>
<h3>Measuring What Matters</h3>
<img src="/images/blog/seo-analytics.webp" alt="SEO Analytics Dashboard" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h4>The Only 5 Metrics You Need to Track</h4>
<ol>
  <li><strong>Organic Traffic Growth:</strong> Month-over-month increases</li>
  <li><strong>Average Position:</strong> Track your top 20 keywords</li>
  <li><strong>Click-Through Rate:</strong> From search results to your site</li>
  <li><strong>Conversion Rate:</strong> From organic traffic to customers</li>
  <li><strong>Core Web Vitals:</strong> Speed and user experience scores</li>
</ol>
<ul>
  <li><strong>Free:</strong> Google Search Console + Google Analytics 4</li>
  <li><strong>Paid:</strong> Ahrefs for keyword research and competitor analysis</li>
  <li><strong>Bonus:</strong> Hotjar to see how users actually behave on your site (don't forget to mention this in your cookies policy)</li>
</ul>
<h3>Costly Mistakes to Avoid</h3>
<h4>The "More Content = Better Rankings" Trap</h4>
<p>I see businesses publishing 5+ blog posts per week of mediocre content. Stop. One amazing article per month beats 20 okay ones.</p>
<h4>Buying Backlinks</h4>
<p>Yes, you can buy links. No, you shouldn't. Google's getting scary good at detecting paid links. I've seen sites lose 80% of their traffic overnight from bad link purchases.</p>
<h3>Ignoring User Experience</h3>
<p>Your bounce rate is a ranking factor. If people click on your site and immediately leave, Google notices.</p>
<ul>
  <li>Can users find what they want in 3 clicks or less?</li>
  <li>Is your most important content "above the fold"?</li>
  <li>Do you have a clear call-to-action on every page?</li>
</ul>
<h3>What's Coming Next</h3>
<h4>AI and Search</h4>
<p>ChatGPT is changing how people search. Optimize for conversational queries:</p>
<ul>
  <li>"What's the best camera for beginners?" instead of "best beginner camera"</li>
  <li>"How do I fix a leaky faucet?" instead of "faucet repair"</li>
</ul>
<h4>Video Search</h4>
<p>YouTube is the second-largest search engine. Every blog post should have a companion video. By creating a simple video version of your article, you can reach people who prefer watching over reading and increase your chances of being discovered through YouTube search.</p>
<p><strong>Easy Start:</strong> Record yourself reading your article with simple slides. Upload to YouTube with the same keywords. Add timestamps, a short description, and a link back to your blog post for extra traffic. Over time, you can experiment with more engaging formats like talking head videos, screen recordings, or short clips for social media.</p>
<h3>The Bottom Line</h3>
<p>SEO in 2025 isn't about tricks or hacks. It's about creating genuinely helpful content, building real relationships, and providing an excellent user experience.</p>
<p>Focus on helping your audience first. Rankings are a byproduct of great user experience.</p>
<h3>Need Help with Your SEO?</h3>
<p>Every business needs a different SEO strategy. What works for a restaurant won't work for a SaaS company. What works in Amsterdam won't work in Tokyo.</p>
<h4>Get Professional Help</h4>
<p>Stop guessing what works. Get professional help for YOUR business.</p>
<p><a href="/en/contact" class="btn btn-primary">📞 Connect with Us</a></p>
<p><em>No generic advice. No cookie-cutter solutions. Just results that work for YOUR industry.</em></p>
<div class="mt-16 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="text-sm text-gray-300">
      <p class="font-semibold mb-1">Enjoyed this article?</p>
      <p>Share it with your network!</p>
    </div>
    <div class="flex gap-3">
      <a href="https://twitter.com/intent/tweet?text=SEO%20in%202025%3A%20The%20Complete%20Guide%20to%20Ranking%20Higher&amp;url=https%3A%2F%2Fsponsmedia.com%2Fen%2Fblog%2Fseo-2025-complete-guide" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Share on X</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsponsmedia.com%2Fen%2Fblog%2Fseo-2025-complete-guide" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-700/20 hover:bg-blue-700/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Share on LinkedIn</a>
    </div>
  </div>
</div>
`,
        contentNl: `
<h2>SEO in 2025: De Complete Gids voor Hogere Rankings</h2>
<p>Beheers moderne SEO met bewezen strategieën die écht werken. Van technische optimalisatie tot contentmarketing: alles wat je nodig hebt om in 2025 hoger te scoren in Google.</p>
<img src="/images/blog/seo-landscape-banner.png" alt="SEO Strategie Dashboard" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<p><strong>Persoonlijk verhaal:</strong> In 2024 werkte ik bij een Japans marketingbureau in Tokyo. Ik hielp ze van pagina 2 naar pagina 1 op Google voor "marketingbureau Japan". Het geheim? Geen trucjes of dure tools, maar begrijpen hoe SEO fundamenteel is veranderd.</p>
<p>Gebruik je nog SEO-tactieken uit 2022? Dan vraag je je waarschijnlijk af waarom je ranking stagneert. <strong>Google’s AI-revolutie heeft de regels herschreven.</strong></p>
<h3>Wat werkt écht in 2025?</h3>
<ul>
  <li>Google kijkt nu vooral naar <strong>Ervaring, Expertise, Autoriteit en Vertrouwen (E-E-A-T)</strong> in plaats van keyword stuffing.</li>
  <li><strong>Succesvoorbeeld:</strong> Een fitnesscoach werd #1 voor "afvaltips" door haar authentieke verhaal en foto’s te delen, niet door perfecte keywords.</li>
  <li><strong>Snelle winst:</strong> Voeg een "Over mij"-sectie toe aan elke blog en leg uit waarom jij expert bent. Autoriteit wint van algoritmes.</li>
</ul>
<h3>Technische SEO: De basis die je niet mag negeren (Web Core Vitals)</h3>
<p>Is je site traag? Dan telt de rest niet.</p>
<ul>
  <li><strong>Laadtijd:</strong> Onder 2,5 seconden</li>
  <li><strong>Interactiviteit:</strong> Minder dan 100ms vertraging</li>
  <li><strong>Visuele stabiliteit:</strong> Geen onverwachte verschuivingen</li>
</ul>
<p>Check je score met Google PageSpeed Insights. Onder de 90? Dan verlies je elke dag ranking en klanten.</p>
<img src="/images/blog/web-core-vitals.png" alt="Web Core Vitals Dashboard" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h3>Mobile-First = Mobile-ONLY</h3>
<p>70% van de zoekopdrachten gebeurt mobiel. Als je site niet goed werkt op mobiel, ziet Google hem overal als ‘kapot’.</p>
<p><strong>10-seconden test:</strong> Open je site op je telefoon. Kun je alles makkelijk lezen en gebruiken? Zo niet, fix dit eerst.</p>
<h3>Contentstrategie: Meer dan keywords</h3>
<p>Stop met losse keywords najagen. Denk in clusters.</p>
<ul>
  <li><strong>Pillar content:</strong> Eén uitgebreide gids (3000+ woorden)</li>
  <li><strong>Cluster content:</strong> 5-7 ondersteunende artikelen die naar je pillar linken</li>
</ul>
<p>Kies één breed onderwerp en maak de ultieme gids. Ondersteun met korte, gerichte artikelen. Dit verdubbelde het organisch verkeer van mijn klant in 6 maanden.</p>
<img src="/images/blog/seo-content.webp" alt="Contentstrategie Planning" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h3>De "So What?"-test</h3>
<p>Elke alinea moet waarde bieden. Vraag jezelf: “So what?”</p>
<p>❌ <strong>Slecht:</strong> "E-mailmarketing is belangrijk voor bedrijven."</p>
<p>✅ <strong>Goed:</strong> "E-mailmarketing levert €42 op voor elke €1 investering – het hoogste rendement voor mkb."</p>
<h3>Linkbuilding die werkt</h3>
<img src="/images/blog/seo-link.webp" alt="Linkbuilding Strategie" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<ul>
  <li><strong>Broken Link Goldmine:</strong> Zoek gebroken links op populaire sites, maak betere content en bied die aan als vervanging.</li>
  <li><strong>Mijn 4-stappenplan:</strong>
    <ol>
      <li>Vind populaire artikelen in jouw branche</li>
      <li>Check op gebroken links (gratis tools)</li>
      <li>Maak vervangende content</li>
      <li>Mail: "Ik zag een gebroken link in je artikel. Mijn resource kan helpen."</li>
    </ol>
  </li>
  <li><strong>Skyscraper-techniek 2.0:</strong> Vind verouderde content die goed scoort en maak iets dat 10x beter is.</li>
</ul>
<h3>Lokale SEO: Jouw voorsprong</h3>
<img src="/images/blog/local-seo.webp" alt="Lokale SEO Strategie" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h4>Google Bedrijfsprofiel optimaliseren</h4>
<ul>
  <li>Plaats 2-3 updates (foto’s, evenementen, aanbiedingen)</li>
  <li>Reageer binnen 24 uur op alle reviews</li>
  <li>Voeg nieuwe foto’s toe</li>
  <li>Pas openingstijden aan voor feestdagen</li>
</ul>
<ul>
  <li>Analyseer statistieken en focus op best presterende content</li>
  <li>Voeg nieuwe diensten of producten toe</li>
  <li>Update beschrijving met seizoensgebonden keywords</li>
</ul>
<p>Vraag klanten om reviews met specifieke keywords. Bijvoorbeeld: “Vond je onze pasta lekker? Noem je favoriete gerecht in je review!”</p>
<h3>Meten wat telt</h3>
<img src="/images/blog/seo-analytics.webp" alt="SEO Analytics Dashboard" class="mx-auto w-full md:max-w-[55%] rounded-xl shadow-xl ring-1 ring-white/10 my-6" loading="lazy" />
<h4>De 5 belangrijkste metrics</h4>
<ol>
  <li><strong>Organisch verkeer:</strong> Groei per maand</li>
  <li><strong>Gemiddelde positie:</strong> Volg je top 20 keywords</li>
  <li><strong>Click-through rate:</strong> Van zoekresultaat naar site</li>
  <li><strong>Conversieratio:</strong> Van bezoeker naar klant</li>
  <li><strong>Core Web Vitals:</strong> Snelheid en gebruikerservaring</li>
</ol>
<ul>
  <li><strong>Gratis:</strong> Google Search Console + Google Analytics 4</li>
  <li><strong>Betaald:</strong> Ahrefs voor keyword research en concurrentieanalyse</li>
  <li><strong>Bonus:</strong> Hotjar om gebruikersgedrag te zien (vermeld dit in je cookiebeleid)</li>
</ul>
<h3>Dure fouten om te vermijden</h3>
<h4>De "Meer content = betere ranking"-valkuil</h4>
<p>Publiceer niet 5+ matige blogs per week. Eén geweldige blog per maand is beter dan 20 middelmatige.</p>
<h4>Backlinks kopen</h4>
<p>Ja, je kunt links kopen. Nee, je moet het niet doen. Google herkent betaalde links steeds beter. Sites kunnen 80% van hun verkeer verliezen door slechte links.</p>
<h3>Gebruikerservaring negeren</h3>
<p>Je bounce rate telt mee voor je ranking. Als bezoekers direct wegklikken, merkt Google dat.</p>
<ul>
  <li>Vinden gebruikers binnen 3 klikken wat ze zoeken?</li>
  <li>Staat je belangrijkste content ‘boven de vouw’?</li>
  <li>Heeft elke pagina een duidelijke call-to-action?</li>
</ul>
<h3>Wat komt eraan?</h3>
<h4>AI en zoeken</h4>
<p>ChatGPT verandert hoe mensen zoeken. Optimaliseer voor conversatie-vragen:</p>
<ul>
  <li>"Wat is de beste camera voor beginners?" in plaats van "beste beginnerscamera"</li>
  <li>"Hoe repareer ik een lekkende kraan?" in plaats van "kraan reparatie"</li>
</ul>
<h4>Video Search</h4>
<p>YouTube is de tweede grootste zoekmachine. Maak bij elke blog een video. Zo bereik je mensen die liever kijken dan lezen en vergroot je je vindbaarheid.</p>
<p><strong>Simpele start:</strong> Neem jezelf op terwijl je je artikel voorleest met slides. Upload naar YouTube met dezelfde keywords. Voeg timestamps, een korte beschrijving en een link naar je blog toe voor extra verkeer.</p>
<h3>Conclusie</h3>
<p>SEO in 2025 draait niet om trucjes. Het gaat om écht waardevolle content, relaties opbouwen en een uitstekende gebruikerservaring.</p>
<p>Help je doelgroep eerst. Rankings volgen vanzelf.</p>
<h3>Hulp nodig met SEO?</h3>
<p>Elke branche heeft een andere SEO-strategie nodig. Wat werkt voor een restaurant, werkt niet voor SaaS. Wat werkt in Amsterdam, werkt niet in Tokyo.</p>
<h4>Professionele hulp nodig?</h4>
<p>Stop met gokken. Krijg professionele hulp voor jouw bedrijf.</p>
<p><a href="/nl/contact" class="btn btn-primary">📞 Neem contact op</a></p>
<p><em>Geen standaardadvies. Geen copy-paste oplossingen. Alleen resultaat voor jouw branche.</em></p>
<div class="mt-16 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="text-sm text-gray-300">
      <p class="font-semibold mb-1">Artikel interessant?</p>
      <p>Deel het met je netwerk!</p>
    </div>
    <div class="flex gap-3">
      <a href="https://twitter.com/intent/tweet?text=SEO%20in%202025%3A%20De%20Complete%20Gids%20voor%20Hogere%20Rankings&amp;url=https%3A%2F%2Fsponsmedia.com%2Fnl%2Fblog%2Fseo-2025-complete-guide" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Deel op X</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsponsmedia.com%2Fnl%2Fblog%2Fseo-2025-complete-guide" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-700/20 hover:bg-blue-700/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Deel op LinkedIn</a>
    </div>
  </div>
</div>
`,
    },
    {
        id: "social-first-strategy-2025",
        title: "Building a Social-First Business Strategy for 2025",
        titleNl: "Een Social-First Bedrijfsstrategie Bouwen voor 2025",
        excerpt:
            "How to create a social-first approach for your business in 2025. Learn about platform-native content, engagement tactics, and measuring success on social media.",
        excerptNl:
            "Hoe je een social-first aanpak voor je bedrijf in 2025 creëert. Leer over platform-native content, betrokkenheidstactieken en het meten van succes op sociale media.",
        author: "Bart Spons",
        publishDate: "2025-07-15",
        tags: ["Social Media", "Strategy", "Engagement", "Content"],
        tagsNl: ["Social Media", "Strategie", "Betrokkenheid", "Content"],
        image: "/images/blog/social-first.webp",

        // --- EN ---
        content: `
<p>Social media has evolved from a marketing channel to the foundation of modern business growth. Companies embracing a social-first approach are outpacing traditional competitors by 3x in customer acquisition and engagement.</p>

<h2>What Does Social-First Mean for Your Business?</h2>
<p>Social-first means building your entire business strategy around social platforms and community engagement, rather than treating social media as an afterthought.</p>

<blockquote>
  <p><strong>Pro Tip:</strong> The shift is happening now. Traditional companies build products first, then try to find customers. Social-first companies build communities first, then create products those communities actually want.</p>
</blockquote>

<p><strong>The New Business Model:</strong></p>
<ul>
  <li>❌ <strong>Old Way:</strong> Product → Website → Social Media</li>
  <li>✅ <strong>New Way:</strong> Community → Content → Products</li>
</ul>
<p>This approach puts customer relationships at the center of everything you do.</p>

<h2>Platform Strategy That Works</h2>
<p>Stop trying to be everywhere. <strong>Focus beats frequency every time.</strong></p>
<p><strong>Smart Strategy:</strong> Choose 2–3 platforms where your audience actually hangs out. Master those before expanding.</p>
<p><strong>Platform Purpose Guide:</strong></p>
<ul>
  <li><strong>LinkedIn</strong> → B2B networking and professional content</li>
  <li><strong>Instagram</strong> → Visual storytelling and lifestyle branding</li>
  <li><strong>TikTok</strong> → Viral content and Gen Z engagement</li>
  <li><strong>YouTube</strong> → Long-form education and tutorials</li>
</ul>
<p><strong>⚠️ Warning:</strong> Spreading yourself across 6+ platforms = mediocre results everywhere. Pick your battles and win them.</p>

<h2>Content That Builds Community</h2>
<p>Forget posting random stuff. <strong>Successful social-first businesses follow the 3-pillar content strategy:</strong></p>
<ul>
  <li><strong>Educational Content:</strong> Share industry insights and helpful tips that solve real problems.</li>
  <li><strong>Behind-the-Scenes Content:</strong> Show your team, process, and company culture. People buy from people they trust.</li>
  <li><strong>Customer Success Stories:</strong> Feature testimonials and case studies. Let your customers be your marketing team.</li>
</ul>
<p><strong>The Golden Rule:</strong> Follow the 80/20 split — 80% valuable content that helps your audience, 20% promotional content about your business.</p>

<h2>Turning Social Media Into Sales</h2>
<p>Here's what most businesses get wrong: <strong>They treat social media like a billboard instead of a conversation.</strong></p>
<p><strong>Game Changer:</strong> Modern customers research <em>and</em> buy directly through social platforms. Companies using social commerce see 30% higher conversion rates.</p>
<p><strong>The Social Sales Trifecta:</strong></p>
<ul>
  <li><strong>Social Commerce</strong> → Tag products for instant purchasing</li>
  <li><strong>Social Proof</strong> → Share reviews and user-generated content</li>
  <li><strong>Lead Generation</strong> → Use social listening to find potential customers</li>
</ul>

<blockquote>
  <p><strong>Pro Tip:</strong> Stop selling and start helping. Answer questions, solve problems, and the sales will follow naturally.</p>
</blockquote>

<h2>Measuring What Matters</h2>
<p><strong>Stop obsessing over vanity metrics.</strong> Likes don't pay the bills.</p>
<p><strong>Reality Check:</strong> Focus on metrics that actually drive business growth, not ego boosts.</p>
<p><strong>The Only 4 Metrics That Matter:</strong></p>
<ol>
  <li><strong>Engagement Quality</strong> → Comments and shares (not likes)</li>
  <li><strong>Website Traffic</strong> → Visitors coming from social platforms</li>
  <li><strong>Lead Generation</strong> → Contact forms filled from social traffic</li>
  <li><strong>Revenue Attribution</strong> → Actual sales from social channels</li>
</ol>
<p><strong>⚡ Quick Win:</strong> Set up UTM parameters to track which social posts actually generate revenue. You'll be surprised what works vs. what doesn't.</p>
<p><em>About UTM:</em> UTM parameters are small tags you add to a link (e.g. <code>?utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=summer</code>) so analytics tools can track exactly where clicks and conversions come from.</p>

<h2>Getting Started (Without Overwhelm)</h2>
<p><strong>Building a social-first business doesn't happen overnight.</strong> Start small, think big.</p>
<p><strong>Your 30-Day Social-First Challenge:</strong></p>
<ul>
  <li><strong>Week 1:</strong> Audit your current social presence (be brutal — what's actually working?)</li>
  <li><strong>Week 2:</strong> Choose your 2 primary platforms and clean up your profiles</li>
  <li><strong>Week 3:</strong> Create your first week of valuable, non-promotional content</li>
  <li><strong>Week 4:</strong> Engage authentically and track your results</li>
</ul>

<blockquote>
  <p><strong>Pro Tip:</strong> Consistency beats perfection. One valuable post per week is better than seven mediocre ones.</p>
</blockquote>

<h2>Need Help Going Social-First?</h2>
<p><strong>Here's the truth:</strong> Every company's social media strategy should be different. What works for a SaaS company won't work for a restaurant. What works in Amsterdam won't work in Tokyo.</p>

<h3>Want Help with Your Strategy?</h3>
<p><strong>Stop guessing and start growing with professional guidance.</strong></p>
<p><a href="/en/contact">📞 Connect with Us</a></p>
`,

        // --- NL ---
        contentNl: `
<p>Social media is geëvolueerd van een marketingkanaal tot de basis van moderne bedrijfsgroei. Bedrijven die een social-first aanpak omarmen, groeien 3x sneller in klantacquisitie en betrokkenheid dan traditionele concurrenten.</p>

<h2>Wat betekent Social-First voor jouw bedrijf?</h2>
<p>Social-first betekent dat je je volledige bedrijfsstrategie bouwt rondom sociale platformen en community-engagement, in plaats van social achteraf toe te voegen.</p>

<blockquote>
  <p><strong>Pro Tip:</strong> De verschuiving is nu bezig. Traditionele bedrijven bouwen eerst producten en zoeken daarna klanten. Social-first bedrijven bouwen eerst een community en creëren vervolgens producten die die community echt wil.</p>
</blockquote>

<p><strong>Het nieuwe businessmodel:</strong></p>
<ul>
  <li>❌ <strong>Oud:</strong> Product → Website → Social Media</li>
  <li>✅ <strong>Nieuw:</strong> Community → Content → Producten</li>
</ul>
<p>Deze aanpak zet klantrelaties centraal in alles wat je doet.</p>

<h2>Platformstrategie die werkt</h2>
<p>Probeer niet overal te zijn. <strong>Focus wint het altijd van frequentie.</strong></p>
<p><strong>Slimme strategie:</strong> Kies 2–3 platformen waar jouw doelgroep écht actief is. Meester die eerst, breid daarna pas uit.</p>
<p><strong>Platform-gids:</strong></p>
<ul>
  <li><strong>LinkedIn</strong> → B2B-netwerken en professionele content</li>
  <li><strong>Instagram</strong> → Visuele storytelling en lifestyle-branding</li>
  <li><strong>TikTok</strong> → Virale content en Gen Z-betrokkenheid</li>
  <li><strong>YouTube</strong> → Long-form educatie en tutorials</li>
</ul>
<p><strong>⚠️ Waarschuwing:</strong> Jezelf over 6+ platformen verspreiden = middelmatige resultaten overal. Kies je gevechten en win ze.</p>

<h2>Content die een community bouwt</h2>
<p>Vergeet willekeurig posten. <strong>Succesvolle social-first bedrijven volgen de 3-pijler contentstrategie:</strong></p>
<ul>
  <li><strong>Educatieve content:</strong> Deel branche-inzichten en praktische tips die echte problemen oplossen.</li>
  <li><strong>Achter-de-schermen:</strong> Laat je team, proces en cultuur zien. Mensen kopen van mensen die ze vertrouwen.</li>
  <li><strong>Klant­succesverhalen:</strong> Toon testimonials en cases. Laat je klanten jouw marketingteam zijn.</li>
</ul>
<p><strong>De Gouden Regel:</strong> Hanteer 80/20 — 80% waardevolle, helpende content en 20% promotionele content.</p>

<h2>Social omzetten naar sales</h2>
<p>Wat vaak misgaat: <strong>Social wordt behandeld als een billboard, niet als een gesprek.</strong></p>
<p><strong>Game-changer:</strong> Moderne klanten onderzoeken <em>én</em> kopen direct via social. Bedrijven met social commerce zien 30% hogere conversies.</p>
<p><strong>De Social Sales Trifecta:</strong></p>
<ul>
  <li><strong>Social Commerce</strong> → Tag producten voor directe aankoop</li>
  <li><strong>Social Proof</strong> → Deel reviews en user-generated content</li>
  <li><strong>Leadgeneratie</strong> → Gebruik social listening om prospects te vinden</li>
</ul>

<blockquote>
  <p><strong>Pro Tip:</strong> Stop met verkopen en begin met helpen. Beantwoord vragen, los problemen op — de sales volgen vanzelf.</p>
</blockquote>

<h2>Meten wat ertoe doet</h2>
<p><strong>Stop met focussen op vanity metrics.</strong> Likes betalen geen rekeningen.</p>
<p><strong>Reality check:</strong> Richt je op metrics die echte groei sturen, niet op ego-boosts.</p>
<p><strong>De 4 enige metrics die tellen:</strong></p>
<ol>
  <li><strong>Kwaliteit van engagement</strong> → Comments en shares (niet likes)</li>
  <li><strong>Website­verkeer</strong> → Bezoekers vanuit social</li>
  <li><strong>Leadgeneratie</strong> → Ingevulde formulieren vanuit social</li>
  <li><strong>Omzet­toerekening</strong> → Échte sales vanuit social kanalen</li>
</ol>
<p><strong>⚡ Snelle winst:</strong> Zet UTM-parameters op om te meten welke posts omzet genereren. Je zult verbaasd zijn wat werkt.</p>
<p><em>Over UTM:</em> UTM-parameters zijn kleine tagjes aan een link (bijv. <code>?utm_source=instagram&amp;utm_medium=social&amp;utm_campaign=summer</code>) zodat analytics exact herkomst en conversies kunnen toeschrijven.</p>

<h2>Starten (zonder overwhelm)</h2>
<p><strong>Een social-first bedrijf bouw je niet in één nacht.</strong> Begin klein, denk groot.</p>
<p><strong>Jouw 30-dagen social-first challenge:</strong></p>
<ul>
  <li><strong>Week 1:</strong> Audit van je huidige social (wees eerlijk: wat werkt écht?)</li>
  <li><strong>Week 2:</strong> Kies je 2 primaire platformen en maak je profielen strak</li>
  <li><strong>Week 3:</strong> Maak je eerste week waardevolle, niet-promotionele content</li>
  <li><strong>Week 4:</strong> Engageer oprecht en volg je resultaten</li>
</ul>

<blockquote>
  <p><strong>Pro Tip:</strong> Consistentie wint van perfectie. Eén waardevolle post per week is beter dan zeven middelmatige.</p>
</blockquote>

<h2>Hulp nodig met Social-First?</h2>
<p><strong>De waarheid:</strong> Elke socialstrategie moet anders zijn. Wat werkt voor SaaS, werkt niet voor horeca. Wat werkt in Amsterdam, werkt niet in Tokyo.</p>

<h3>Hulp bij je strategie?</h3>
<p><strong>Stop met gokken en groei met professionele begeleiding.</strong></p>
<p><a href="/nl/contact">📞 Neem contact op</a></p>
`,
    },
    {
        id: "online-marketing-trends-2026",
        title: "Online Marketing Trends in 2026",
        titleNl:
            "Online marketing trends in 2026: Zichtbaar blijven zonder harder te schreeuwen",
        excerpt:
            "In 2026, marketing gets more human: less noise, more meaning. Learn the 3 trends that matter most (meaningful storytelling, sharper audience focus, and AI-driven discovery) + practical quick wins to apply this week.",
        excerptNl:
            "In 2026 wordt marketing menselijker: minder ruis, meer betekenis. Ontdek de 3 trends die er écht toe doen (betekenisvol verhaal, scherpere doelgroepfocus en AI-gedreven vindbaarheid) + quick wins die je deze week al kunt toepassen.",
        author: "Bart Spons",
        publishDate: "2026-01-09",
        tags: ["Marketing", "Trends", "Brand", "AI", "Content"],
        tagsNl: ["Marketing", "Trends", "Merk", "AI", "Content"],
        image: "/images/blog/marketing-banner.png",

        // --- EN ---
        content: `
<h2>Online Marketing Trends in 2026: How to Stay Visible Without Shouting</h2>
<p>2026 isn’t about posting more. It’s about posting <strong>with purpose</strong>.</p>
<p>The brands that win this year won’t be the loudest. They’ll be the clearest: a stronger story, a sharper audience, and content that AI (and humans) can actually understand and trust.</p>

<blockquote>
  <p><strong>Reality check:</strong> If your marketing strategy is “be everywhere” and “post more”, you’ll feel busy… but not necessarily grow.</p>
</blockquote>

<p><strong>Personal story time:</strong> I’ve worked with teams where the content calendar was packed, but results were flat. Once we removed 50% of the noise and doubled down on <em>one clear message</em> for <em>one clear audience</em>, engagement (and leads) finally started to move.</p>

<h3>The 3 trends that matter most in 2026</h3>
<p>Let’s cut through the hype. Here are the trends that actually change what you should do next.</p>

<h3>1) From visibility to meaning (story > noise)</h3>
<p>In the past few years, online marketing often meant: more reach, more content, more “look at me.” In 2026 the shift is obvious: <strong>people want brands that stand for something</strong>.</p>
<p>That doesn’t mean every post needs to go viral. It means every post should fit your brand, your values, and the experience you want people to remember.</p>

<ul>
  <li><strong>❌ Old approach:</strong> “How do we get more views?”</li>
  <li><strong>✅ 2026 approach:</strong> “What do we want to mean to the right people?”</li>
</ul>

<blockquote>
  <p><strong>Quick Win:</strong> Add a 1-sentence “Why this matters” to every page and post. If you can’t explain the “why”, don’t publish it yet.</p>
</blockquote>

<h4>The 10-minute brand clarity exercise</h4>
<p>Answer these questions (honestly):</p>
<ol>
  <li>What problem do we solve better than others?</li>
  <li>What do we want to be known for in 12 months?</li>
  <li>What do we refuse to do (even if it gets clicks)?</li>
</ol>
<p>If your team gives 5 different answers, your marketing will feel inconsistent — and your audience will feel it too.</p>

<h3>2) Focus on a specific audience (relevance > reach)</h3>
<p>Trying to speak to everyone creates content that feels like it’s for no one. In 2026, growth comes from choosing: <strong>a smaller, specific audience</strong> and serving them extremely well.</p>

<p>It’s not about how often you’re seen. It’s about <strong>by who</strong>.</p>

<h4>Stop targeting “everyone”</h4>
<p>Instead of “small businesses”, go deeper:</p>
<ul>
  <li>“Local service businesses in Amsterdam who rely on inbound leads”</li>
  <li>“Creative studios that need a fast portfolio site that converts”</li>
  <li>“Founders launching a new brand and need traction in 90 days”</li>
</ul>

<blockquote>
  <p><strong>Quick Win:</strong> Rewrite your homepage hero text so it clearly says <em>who</em> you help + <em>what outcome</em> you deliver. If it could fit any business, it’s too vague.</p>
</blockquote>

<h3>3) AI-driven discovery (structure + authority wins)</h3>
<p>AI isn’t “a tool you might try”. It’s changing how people discover information.</p>
<p>More people ask questions directly in ChatGPT, or get answers inside Google’s AI experiences. The algorithms are a black box, but the pattern is clear: <strong>authority, relevance, context, and structure</strong> decide whether you show up.</p>

<h4>What AI-friendly content actually looks like</h4>
<ul>
  <li><strong>Clear structure:</strong> headings that match real questions</li>
  <li><strong>Direct answers:</strong> don’t bury the point in paragraph 7</li>
  <li><strong>Context:</strong> who is this for, and when does it apply?</li>
  <li><strong>Proof:</strong> examples, steps, results, and concrete guidance</li>
</ul>

<blockquote>
  <p><strong>Quick Win:</strong> Add a short FAQ section to your key pages (Services + Blog posts). Make each question a real query your client would ask.</p>
</blockquote>

<h3>Your 2026 action plan (simple, but powerful)</h3>
<p>If you do nothing else this month, do this:</p>
<ol>
  <li><strong>Clarify your meaning:</strong> 1 message you want to own</li>
  <li><strong>Choose your audience:</strong> 1 specific group you serve best</li>
  <li><strong>Build structured content:</strong> 3 pages/posts that answer real questions clearly</li>
</ol>

<h3>The bottom line</h3>
<p>Marketing in 2026 becomes more human: less shouting, more listening. Less chasing clicks, more building trust. Less random content, more deliberate choices.</p>
<p><strong>Be more visible online</strong> by being more relevant — not louder.</p>

<h3>Want help applying this to your website and content?</h3>
<p>If you want a clear plan (and a site that communicates it fast), I can help you translate these trends into a strategy you can actually execute.</p>
<p><a href="/en/contact" class="btn btn-primary">📞 Connect with SponsMedia</a></p>

<div class="mt-16 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="text-sm text-gray-300">
      <p class="font-semibold mb-1">Enjoyed this article?</p>
      <p>Share it with your network!</p>
    </div>
    <div class="flex gap-3">
      <a href="https://twitter.com/intent/tweet?text=Online%20Marketing%20Trends%20in%202026%3A%20How%20to%20Stay%20Visible%20Without%20Shouting&amp;url=https%3A%2F%2Fsponsmedia.com%2Fen%2Fblog%2Fonline-marketing-trends-2026" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Share on X</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsponsmedia.com%2Fen%2Fblog%2Fonline-marketing-trends-2026" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-700/20 hover:bg-blue-700/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Share on LinkedIn</a>
    </div>
  </div>
</div>
`,

        // --- NL ---
        contentNl: `
<h2>Online marketing trends in 2026: Zichtbaar blijven zonder harder te schreeuwen</h2>
<p>2026 draait niet om méér posten. Het draait om posten <strong>met intentie</strong>.</p>
<p>De merken die dit jaar winnen, zijn niet per se het luidst. Ze zijn het duidelijkst: een sterker verhaal, een scherpere doelgroep en content die AI (én mensen) echt snappen en vertrouwen.</p>

<blockquote>
  <p><strong>Reality check:</strong> Als je strategie “overal zijn” en “meer content” is, ben je druk… maar groei je niet automatisch.</p>
</blockquote>

<p><strong>Persoonlijk verhaal:</strong> Ik heb in teams gezeten waar de contentkalender bomvol stond, maar de resultaten vlak bleven. Toen we 50% van de ruis schrapten en kozen voor <em>één duidelijke boodschap</em> voor <em>één duidelijke doelgroep</em>, kwamen engagement en leads eindelijk in beweging.</p>

<h3>De 3 trends die er écht toe doen in 2026</h3>
<p>Geen hype. Gewoon de dingen die je aanpak veranderen — en je resultaten kunnen verbeteren.</p>

<h3>1) Van zichtbaarheid naar betekenis (verhaal > ruis)</h3>
<p>De afgelopen jaren betekende online marketing vaak: meer bereik, meer content, meer “kijk mij”. In 2026 zie je een duidelijke verschuiving: <strong>mensen willen merken die ergens voor staan</strong>.</p>
<p>Dat betekent niet dat elke post moet scoren. Wel dat elke post past bij je merk, je visie en de ervaring die je wilt achterlaten.</p>

<ul>
  <li><strong>❌ Oud:</strong> “Hoe krijgen we meer views?”</li>
  <li><strong>✅ 2026:</strong> “Wat willen we betekenen voor de juiste mensen?”</li>
</ul>

<blockquote>
  <p><strong>Quick Win:</strong> Voeg aan elke pagina/post één zin toe: “Waarom dit belangrijk is.” Kun je dat niet uitleggen? Dan is het nog niet klaar om te publiceren.</p>
</blockquote>

<h4>De 10-minuten merk-oefening</h4>
<p>Beantwoord dit eerlijk:</p>
<ol>
  <li>Welk probleem lossen wij beter op dan anderen?</li>
  <li>Waar willen we over 12 maanden om bekendstaan?</li>
  <li>Wat doen we bewust níet (ook al levert het clicks op)?</li>
</ol>
<p>Als je team 5 verschillende antwoorden geeft, voelt je marketing inconsistent — en je doelgroep merkt dat.</p>

<h3>2) Focus op een specifieke doelgroep (relevantie > bereik)</h3>
<p>Als je iedereen probeert aan te spreken, maak je content die voelt alsof het voor niemand is. In 2026 zit groei in durven kiezen: <strong>een kleinere, specifieke doelgroep</strong> die je extreem goed bedient.</p>
<p>Het gaat niet om hoe vaak je wordt gezien. Het gaat om <strong>door wie</strong>.</p>

<h4>Stop met targeten op “iedereen”</h4>
<p>Ga dieper dan “mkb” of “ondernemers”:</p>
<ul>
  <li>“Lokale dienstverleners in Amsterdam die inbound leads nodig hebben”</li>
  <li>“Creatieve studios die een razendsnelle portfolio-site willen die converteert”</li>
  <li>“Founders die in 90 dagen traction willen opbouwen”</li>
</ul>

<blockquote>
  <p><strong>Quick Win:</strong> Herschrijf je hero-tekst op je homepage: <em>wie</em> help je + <em>welke uitkomst</em> lever je. Als het op elk bedrijf past, is het te vaag.</p>
</blockquote>

<h3>3) AI-gedreven vindbaarheid (structuur + autoriteit wint)</h3>
<p>AI is geen “tool die je misschien eens probeert”. Het verandert hoe mensen informatie vinden.</p>
<p>Steeds vaker stellen mensen vragen direct in ChatGPT, of krijgen ze antwoorden binnen Google’s AI-ervaringen. Hoe het precies werkt is deels een black box, maar de richting is duidelijk: <strong>autoriteit, relevantie, context en structuur</strong> bepalen of je zichtbaar bent.</p>

<h4>Hoe AI-vriendelijke content er écht uitziet</h4>
<ul>
  <li><strong>Heldere structuur:</strong> headings die echte vragen beantwoorden</li>
  <li><strong>Directe antwoorden:</strong> niet pas in alinea 7 to-the-point</li>
  <li><strong>Context:</strong> voor wie is dit, en wanneer geldt het?</li>
  <li><strong>Bewijs:</strong> voorbeelden, stappen, resultaten en concrete guidance</li>
</ul>

<blockquote>
  <p><strong>Quick Win:</strong> Voeg een korte FAQ toe aan je belangrijkste pagina’s (Diensten + blogs). Maak elke vraag een realistische zoekvraag van je klant.</p>
</blockquote>

<h3>Jouw 2026 actieplan (simpel, maar sterk)</h3>
<p>Als je deze maand maar drie dingen doet, doe dan dit:</p>
<ol>
  <li><strong>Maak je betekenis scherp:</strong> 1 boodschap die je wilt ownen</li>
  <li><strong>Kies je doelgroep:</strong> 1 specifieke groep die je het beste helpt</li>
  <li><strong>Bouw gestructureerde content:</strong> 3 pagina’s/posts die echte vragen helder beantwoorden</li>
</ol>

<h3>Conclusie</h3>
<p>Marketing in 2026 wordt menselijker: minder schreeuwen, meer luisteren. Minder click-chasing, meer vertrouwen bouwen. Minder random content, meer bewuste keuzes.</p>
<p><strong>Be more visible online</strong> door relevanter te zijn — niet luider.</p>

<h3>Hulp nodig om dit te vertalen naar je website en content?</h3>
<p>Als je een duidelijk plan wilt (en een site die dat snel communiceert), help ik je deze trends om te zetten in een strategie die je echt kunt uitvoeren.</p>
<p><a href="/nl/contact" class="btn btn-primary">📞 Neem contact op met SponsMedia</a></p>

<div class="mt-16 p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-xl border border-white/10 backdrop-blur-sm">
  <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
    <div class="text-sm text-gray-300">
      <p class="font-semibold mb-1">Vond je dit artikel handig?</p>
      <p>Deel het met je netwerk!</p>
    </div>
    <div class="flex gap-3">
      <a href="https://twitter.com/intent/tweet?text=Online%20marketing%20trends%20in%202026%3A%20Zichtbaar%20blijven%20zonder%20harder%20te%20schreeuwen&amp;url=https%3A%2F%2Fsponsmedia.com%2Fnl%2Fblog%2Fonline-marketing-trends-2026" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Deel op X</a>
      <a href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fsponsmedia.com%2Fnl%2Fblog%2Fonline-marketing-trends-2026" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-blue-700/20 hover:bg-blue-700/30 text-blue-300 rounded-lg transition-colors text-sm font-medium">Deel op LinkedIn</a>
    </div>
  </div>
</div>
`,
    },
];
