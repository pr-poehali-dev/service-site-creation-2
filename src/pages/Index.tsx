import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0e1fa674-2068-424e-9908-6bc5a999f1cf/files/9179d426-7750-4695-aafa-5599c90442ce.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная", icon: "Home" },
  { id: "services", label: "Услуги", icon: "Layers" },
  { id: "portfolio", label: "Портфолио", icon: "Grid2x2" },
  { id: "about", label: "О мне", icon: "User" },
  { id: "blog", label: "Блог", icon: "BookOpen" },
  { id: "contact", label: "Контакты", icon: "Mail" },
];

const SERVICES = [
  {
    id: "branding",
    title: "Брендинг",
    tagline: "Идентичность, которую запоминают",
    price: "от 50 000 ₽",
    desc: "Создание визуальной идентичности бренда: логотип, фирменный стиль, брендбук. Каждый элемент — часть истории.",
    tags: ["Логотип", "Фирменный стиль", "Брендбук"],
    icon: "Sparkles",
  },
  {
    id: "design",
    title: "Дизайн",
    tagline: "Интерфейсы с характером",
    price: "от 30 000 ₽",
    desc: "UI/UX дизайн сайтов и приложений. Каждый экран продуман до деталей — от типографики до микроанимаций.",
    tags: ["UI/UX", "Сайты", "Приложения"],
    icon: "Palette",
  },
  {
    id: "photo",
    title: "Фотография",
    tagline: "Образы, которые говорят",
    price: "от 15 000 ₽",
    desc: "Портретная, предметная и коммерческая съёмка. Световое решение, пост-обработка, финальный архив.",
    tags: ["Портрет", "Предмет", "Коммерция"],
    icon: "Camera",
  },
  {
    id: "motion",
    title: "Моушн",
    tagline: "Движение как язык",
    price: "от 40 000 ₽",
    desc: "Анимированные ролики, заставки, рекламные видео. Концепция → раскадровка → финальный монтаж.",
    tags: ["Анимация", "Видео", "Реклама"],
    icon: "Play",
  },
  {
    id: "print",
    title: "Полиграфия",
    tagline: "Тактильный опыт",
    price: "от 10 000 ₽",
    desc: "Дизайн для печати: упаковка, каталоги, визитки, постеры. От макета до контроля производства.",
    tags: ["Упаковка", "Каталоги", "Постеры"],
    icon: "Package",
  },
  {
    id: "strategy",
    title: "Стратегия",
    tagline: "Смысл за образами",
    price: "от 80 000 ₽",
    desc: "Разработка коммуникационной стратегии бренда: позиционирование, tone of voice, визуальные принципы.",
    tags: ["Позиционирование", "Стратегия", "Концепция"],
    icon: "Target",
  },
];

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Ребрендинг Artisan", category: "branding", year: "2024", img: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&q=80" },
  { id: 2, title: "Приложение Forma", category: "design", year: "2024", img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&q=80" },
  { id: 3, title: "Съёмка Mercury", category: "photo", year: "2023", img: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7d3?w=600&q=80" },
  { id: 4, title: "Стиль Nova Cafe", category: "branding", year: "2024", img: "https://images.unsplash.com/photo-1545665277-5937489579f2?w=600&q=80" },
  { id: 5, title: "Видео Pulse", category: "motion", year: "2023", img: "https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=600&q=80" },
  { id: 6, title: "Упаковка Seed", category: "print", year: "2024", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80" },
  { id: 7, title: "Сайт Atelier", category: "design", year: "2024", img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&q=80" },
  { id: 8, title: "Фото Eclipse", category: "photo", year: "2023", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { id: 9, title: "Стратегия Vox", category: "strategy", year: "2024", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&q=80" },
];

const BLOG_POSTS = [
  { id: 1, title: "Почему минимализм — это не про простоту", date: "28 мая 2024", readTime: "4 мин", cat: "Дизайн" },
  { id: 2, title: "Как выбрать типографику для бренда", date: "14 мая 2024", readTime: "6 мин", cat: "Брендинг" },
  { id: 3, title: "Референсы vs оригинальность", date: "2 мая 2024", readTime: "3 мин", cat: "Творчество" },
];

const FILTER_LABELS: Record<string, string> = {
  all: "Все",
  branding: "Брендинг",
  design: "Дизайн",
  photo: "Фото",
  motion: "Моушн",
  print: "Полиграфия",
  strategy: "Стратегия",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [portfolioFilter, setPortfolioFilter] = useState("all");
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [lightbox, setLightbox] = useState<null | typeof PORTFOLIO_ITEMS[0]>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setSidebarOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = portfolioFilter === "all"
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((p) => p.category === portfolioFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 bg-background border-b border-border">
        <span className="font-display text-lg text-gold italic">Портфолио</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-foreground p-1">
          <Icon name={sidebarOpen ? "X" : "Menu"} size={20} />
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          w-[220px] border-r border-sidebar-border`}
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        <div className="px-6 pt-8 pb-6 border-b border-sidebar-border">
          <div className="font-display text-2xl text-gold italic leading-none">Портфолио</div>
          <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest font-body">Creative Studio</div>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`sidebar-link w-full text-left ${activeSection === item.id ? "active" : ""}`}
            >
              <Icon name={item.icon} size={14} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-6 pb-8 border-t border-sidebar-border pt-4">
          <div className="text-xs text-muted-foreground mb-3 font-body">Соцсети</div>
          <div className="flex gap-3">
            {["Instagram", "Youtube", "Send"].map((icon) => (
              <button key={icon} className="text-muted-foreground hover:text-gold transition-colors duration-300">
                <Icon name={icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="lg:pl-[220px]">

        {/* HOME */}
        <section id="home" className="relative min-h-screen flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <img src={HERO_IMAGE} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(8,6,5,1) 0%, rgba(8,6,5,0.7) 40%, rgba(8,6,5,0.2) 100%)"
            }} />
          </div>

          <div className="relative z-10 px-10 pb-16 md:pb-24 max-w-3xl">
            <div className="hero-text-animate flex items-center gap-3 mb-4">
              <span className="gold-line" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-body">Creative Designer</span>
            </div>
            <h1 className="hero-text-animate font-display text-5xl md:text-7xl lg:text-8xl font-light leading-none mb-6 text-foreground">
              Создаю
              <br />
              <span className="italic text-gold">образы,</span>
              <br />
              которые
              <br />
              работают
            </h1>
            <p className="hero-text-animate font-body text-base text-muted-foreground max-w-md mb-8 leading-relaxed">
              Брендинг, дизайн, фотография и стратегия — всё, что нужно, чтобы ваш бренд ожил и запомнился.
            </p>
            <div className="hero-text-animate flex flex-wrap gap-4">
              <button className="btn-gold" onClick={() => scrollTo("services")}>
                Услуги
              </button>
              <button className="btn-outline" onClick={() => scrollTo("portfolio")}>
                Портфолио
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-xs uppercase tracking-widest font-body" style={{ writingMode: "vertical-rl" }}>Прокрутить</span>
            <Icon name="ChevronDown" size={14} className="text-gold animate-bounce" />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-24 px-8 md:px-12">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="gold-line" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-body">Чем могу помочь</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">Услуги</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {SERVICES.map((s) => (
              <div key={s.id} className="service-card card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-border text-gold">
                    <Icon name={s.icon} size={18} />
                  </div>
                  <span className="text-xs font-body text-gold border border-gold px-2 py-0.5">{s.price}</span>
                </div>
                <h3 className="font-display text-2xl font-light mb-1">{s.title}</h3>
                <p className="text-gold text-xs italic font-display mb-3">{s.tagline}</p>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {s.tags.map((t) => (
                    <span key={t} className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 font-body">{t}</span>
                  ))}
                </div>
                <button
                  className="text-xs uppercase tracking-widest text-gold font-body flex items-center gap-2 hover:gap-3 transition-all duration-300"
                  onClick={() => { setSelectedService(s.id); setBriefOpen(true); }}
                >
                  Заполнить бриф <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-24 px-8 md:px-12 border-t border-border">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="gold-line" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-body">Избранные работы</span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <h2 className="font-display text-4xl md:text-5xl font-light">Портфолио</h2>
              <div className="flex flex-wrap gap-1">
                {Object.keys(FILTER_LABELS).map((f) => (
                  <button
                    key={f}
                    className={`filter-btn ${portfolioFilter === f ? "active" : ""}`}
                    onClick={() => setPortfolioFilter(f)}
                  >
                    {FILTER_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="portfolio-item"
                onClick={() => setLightbox(item)}
              >
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="overlay">
                  <span className="text-xs uppercase tracking-widest text-gold font-body mb-1">
                    {FILTER_LABELS[item.category]} · {item.year}
                  </span>
                  <h3 className="font-display text-xl text-white font-light">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-2 text-xs text-white/60 font-body">
                    <Icon name="ZoomIn" size={12} />
                    <span>Открыть</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-muted-foreground font-body">
              Нет работ в этой категории
            </div>
          )}
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 px-8 md:px-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="gold-line" />
                <span className="text-gold text-xs uppercase tracking-[0.2em] font-body">Кто я</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">О мне</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Привет! Я — визуальный дизайнер и бренд-стратег с <span className="text-gold">7+ годами опыта</span>. Работаю на стыке эстетики и смысла — создаю образы, которые не просто красивы, но и работают на бизнес-задачи.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Начинал с логотипов, вырос до стратегических проектов для международных брендов. Каждый проект для меня — это диалог с клиентом о том, кем он хочет стать.
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[["7+", "лет опыта"], ["140+", "проектов"], ["80+", "клиентов"]].map(([num, label]) => (
                  <div key={label}>
                    <div className="font-display text-3xl text-gold font-light">{num}</div>
                    <div className="text-xs text-muted-foreground font-body uppercase tracking-wider mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&q=80"
                  alt="Фото автора"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-gold flex items-center justify-center bg-background">
                <div className="text-center">
                  <div className="font-display text-sm text-gold italic">Since</div>
                  <div className="font-display text-xl text-gold">2017</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="py-24 px-8 md:px-12 border-t border-border">
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-3">
              <span className="gold-line" />
              <span className="text-gold text-xs uppercase tracking-[0.2em] font-body">Мысли и находки</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-light">Блог</h2>
          </div>

          <div className="space-y-0 border-t border-border">
            {BLOG_POSTS.map((post, i) => (
              <div
                key={post.id}
                className="group flex items-center justify-between py-7 border-b border-border cursor-pointer hover:px-4 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <span className="font-display text-5xl text-border font-light leading-none group-hover:text-gold transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gold font-body mb-2 block">{post.cat}</span>
                    <h3 className="font-display text-xl md:text-2xl font-light group-hover:text-gold transition-colors duration-300">
                      {post.title}
                    </h3>
                    <div className="flex gap-4 mt-2 text-xs text-muted-foreground font-body">
                      <span>{post.date}</span>
                      <span>·</span>
                      <span>{post.readTime} чтения</span>
                    </div>
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={18} className="text-border group-hover:text-gold transition-colors duration-300 flex-shrink-0 ml-4" />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button className="btn-outline">Все статьи</button>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 px-8 md:px-12 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="gold-line" />
                <span className="text-gold text-xs uppercase tracking-[0.2em] font-body">Напишите мне</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Контакты</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-10">
                Есть проект? Хотите обсудить идею или просто познакомиться? Я отвечаю в течение 24 часов.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Mail", label: "Email", value: "hello@myportfolio.ru" },
                  { icon: "Send", label: "Telegram", value: "@myportfolio" },
                  { icon: "Instagram", label: "Instagram", value: "@myportfolio" },
                ].map((c) => (
                  <div key={c.label} className="flex items-center gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center text-gold flex-shrink-0">
                      <Icon name={c.icon} size={16} />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-body">{c.label}</div>
                      <div className="font-body text-sm text-foreground">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Имя</label>
                    <input type="text" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Email</label>
                    <input type="email" placeholder="email@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Тема</label>
                  <select>
                    <option value="">Выберите услугу</option>
                    {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Сообщение</label>
                  <textarea rows={5} placeholder="Расскажите о вашем проекте..." />
                </div>
                <button type="submit" className="btn-gold w-full mt-2">
                  Отправить сообщение
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-8 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-gold italic text-lg">Портфолио</span>
          <span className="text-xs text-muted-foreground font-body">© 2024 — Все права защищены</span>
          <div className="flex gap-4">
            {["Instagram", "Youtube", "Send"].map((icon) => (
              <button key={icon} className="text-muted-foreground hover:text-gold transition-colors duration-300">
                <Icon name={icon} size={16} />
              </button>
            ))}
          </div>
        </footer>
      </main>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={24} />
          </button>
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[70vh] object-contain" />
            <div className="mt-6 flex items-end justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-gold font-body block mb-1">
                  {FILTER_LABELS[lightbox.category]} · {lightbox.year}
                </span>
                <h3 className="font-display text-3xl text-white font-light">{lightbox.title}</h3>
              </div>
              <button
                className="btn-outline text-xs"
                onClick={() => { setLightbox(null); setBriefOpen(true); setSelectedService(lightbox.category); }}
              >
                Заказать похожее
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BRIEF MODAL */}
      {briefOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setBriefOpen(false)}
        >
          <div
            className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
            style={{ background: "hsl(20 8% 7%)", border: "1px solid hsl(var(--border))" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-xs uppercase tracking-widest text-gold font-body mb-1">Заявка</div>
                  <h3 className="font-display text-2xl font-light">Бриф на проект</h3>
                </div>
                <button onClick={() => setBriefOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="X" size={20} />
                </button>
              </div>

              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Услуга</label>
                  <select value={selectedService || ""} onChange={(e) => setSelectedService(e.target.value)}>
                    <option value="">Выберите услугу</option>
                    {SERVICES.map((s) => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Имя</label>
                    <input type="text" placeholder="Ваше имя" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Телефон / TG</label>
                    <input type="text" placeholder="+7 или @username" />
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Компания / Бренд</label>
                  <input type="text" placeholder="Название компании или проекта" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Опишите задачу</label>
                  <textarea rows={4} placeholder="Что нужно сделать? Цель, контекст, сроки..." />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Бюджет</label>
                  <select>
                    <option value="">Не определился</option>
                    <option>До 30 000 ₽</option>
                    <option>30 000 — 80 000 ₽</option>
                    <option>80 000 — 200 000 ₽</option>
                    <option>Более 200 000 ₽</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground font-body block mb-2">Ссылки-референсы</label>
                  <input type="text" placeholder="Что вдохновляет? (опционально)" />
                </div>
                <button type="submit" className="btn-gold w-full mt-2">
                  Отправить бриф
                </button>
                <p className="text-xs text-muted-foreground font-body text-center mt-3">
                  Отвечу в течение 24 часов
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
