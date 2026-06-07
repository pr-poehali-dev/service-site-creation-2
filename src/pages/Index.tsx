import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/0e1fa674-2068-424e-9908-6bc5a999f1cf/files/46de94be-e700-4cbe-90d6-69418ec3102f.jpg";

const NAV_ITEMS = [
  { id: "home",      label: "Главная",   icon: "Home" },
  { id: "services",  label: "Услуги",    icon: "Layers" },
  { id: "portfolio", label: "Портфолио", icon: "Grid2x2" },
  { id: "price",     label: "Прайс",     icon: "Tag" },
  { id: "about",     label: "Обо мне",   icon: "User" },
  { id: "blog",      label: "Блог",      icon: "BookOpen" },
  { id: "brief",     label: "Бриф",      icon: "ClipboardList" },
  { id: "contact",   label: "Контакты",  icon: "Mail" },
];

const SERVICES = [
  { id: "reels-expert",  cat: "Рилсмейкер", title: "Рилсы для экспертов",       icon: "Video",         desc: "Снимаю и монтирую вертикальные видео для экспертов: полезный контент, прогревы, личный бренд. Цепляющий монтаж, музыка, субтитры.",          includes: ["Съёмка", "Монтаж", "Субтитры", "Музыка"] },
  { id: "reels-wedding", cat: "Рилсмейкер", title: "Рилсы для свадеб",           icon: "Heart",         desc: "Атмосферные вертикальные видео со свадеб — от сборов до первого танца. Нежный монтаж, кинематографичная картинка.",                        includes: ["Съёмка", "Монтаж", "Цветокоррекция", "Музыка"] },
  { id: "reels-events",  cat: "Рилсмейкер", title: "Рилсы для мероприятий",      icon: "CalendarCheck", desc: "Рилсы с конференций, форумов, корпоративов и любых событий. Быстро, стильно, под задачу бизнеса.",                                        includes: ["Съёмка", "Монтаж", "Branding overlay"] },
  { id: "lessons",       cat: "Рилсмейкер", title: "Съёмка уроков и курсов",     icon: "GraduationCap", desc: "Профессиональная съёмка обучающих уроков для онлайн-школ и экспертов: несколько камер, свет, чистый звук.",                             includes: ["Многокамерная съёмка", "Свет", "Монтаж", "Чистый звук"] },
  { id: "presentations", cat: "Рилсмейкер", title: "Съёмка презентаций",         icon: "Monitor",       desc: "Видеосъёмка презентаций, выступлений, питчей — для экспертов, конференций и корпоративных событий.",                                   includes: ["Съёмка", "Монтаж", "Титры"] },
  { id: "montage",       cat: "Монтаж",     title: "Монтаж видео в рилсы",        icon: "Scissors",      desc: "Присылаешь исходники — получаешь готовый рилс. Ритмичный монтаж, переходы, текст, звук под настроение.",                                includes: ["Монтаж исходников", "Субтитры", "Музыка", "Цветокоррекция"] },
  { id: "clips",         cat: "Креатор",    title: "Клипы и рекламные ролики",    icon: "Film",          desc: "Авторские клипы для экспертов и брендов, рекламные ролики с концепцией, режиссурой и профессиональным монтажом.",                      includes: ["Концепция", "Съёмка", "Монтаж", "Цветокоррекция"] },
  { id: "animation",     cat: "Креатор",    title: "Мультики и анимация",         icon: "Sparkles",      desc: "Создаю анимированные ролики, explainer-видео, мини-мультфильмы для брендов, детских проектов и соцсетей.",                             includes: ["Сценарий", "Раскадровка", "Анимация", "Озвучка"] },
  { id: "restore",       cat: "Креатор",    title: "Реставрация и оживление фото", icon: "ImagePlay",    desc: "Восстанавливаю старые фотографии, убираю повреждения, добавляю цвет. Оживляю фото с помощью ИИ-анимации.",                            includes: ["Реставрация", "Колоризация", "Анимация лица", "Архивное качество"] },
  { id: "wb",            cat: "Креатор",    title: "Карточки для Wildberries",    icon: "ShoppingBag",   desc: "Продающие карточки товаров для WB и Ozon: съёмка, обработка, инфографика, видео-карточки.",                                            includes: ["Предметная съёмка", "Инфографика", "Обработка", "Видео-карточка"] },
  { id: "websites",      cat: "Креатор",    title: "Создание сайтов",             icon: "Globe",         desc: "Красивые и функциональные сайты с помощью ИИ-инструментов: лендинги, портфолио, сайты для бизнеса — под ключ.",                       includes: ["Дизайн", "Разработка", "Адаптив", "Наполнение"] },
  { id: "portrait",      cat: "Фотограф",   title: "Портреты и фото для экспертов", icon: "Camera",     desc: "Деловые портреты, фото для соцсетей и личного бренда. Работаю со светом и образом, чтобы ты выглядела уверенно и притягательно.",    includes: ["Студийная/уличная съёмка", "Свет", "Ретушь", "Архив"] },
  { id: "family",        cat: "Фотограф",   title: "Семейные фотосессии",         icon: "Users",         desc: "Тёплые семейные фотосессии — дома, на природе или в студии. Живые эмоции, настоящие моменты, красивый архив.",                        includes: ["Съёмка 1-2ч", "Локация", "Ретушь", "Готовый архив"] },
];

const SERVICE_CATS = ["Рилсмейкер", "Монтаж", "Фотограф", "Креатор"];

const PRICES = [
  {
    cat: "Рилсы и видео", popular: false,
    items: [
      { name: "Монтаж 1 рилса из ваших исходников", price: "от 2 000 ₽" },
      { name: "Съёмка + монтаж 1 рилса",            price: "от 5 000 ₽" },
      { name: "Пакет: 4 рилса в месяц",             price: "от 15 000 ₽" },
      { name: "Съёмка уроков / курса (день)",        price: "от 20 000 ₽" },
      { name: "Съёмка мероприятия (до 3ч)",         price: "от 15 000 ₽" },
      { name: "Рекламный ролик",                     price: "от 30 000 ₽" },
    ],
  },
  {
    cat: "Фотография", popular: true,
    items: [
      { name: "Портретная съёмка (1ч)",                price: "от 5 000 ₽" },
      { name: "Фото для экспертов (2ч)",               price: "от 10 000 ₽" },
      { name: "Семейная фотосессия (2ч)",              price: "от 8 000 ₽" },
      { name: "Предметная съёмка WB (10 фото)",        price: "от 3 000 ₽" },
    ],
  },
  {
    cat: "Креатив и сайты", popular: false,
    items: [
      { name: "Реставрация фото",                      price: "от 500 ₽ / фото" },
      { name: "Оживление фото (ИИ-анимация)",          price: "от 1 000 ₽ / фото" },
      { name: "Анимированный ролик / мультик",         price: "от 15 000 ₽" },
      { name: "Лендинг / сайт-портфолио",              price: "от 20 000 ₽" },
      { name: "Карточки WB (съёмка + обработка)",      price: "от 5 000 ₽" },
    ],
  },
];

const PORTFOLIO = [
  { id: 1, cat: "reels",    title: "Рилс для эксперта",    img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=500&q=80" },
  { id: 2, cat: "portrait", title: "Портрет эксперта",     img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80" },
  { id: 3, cat: "family",   title: "Семейная фотосессия",  img: "https://images.unsplash.com/photo-1609220136736-443140cffec6?w=500&q=80" },
  { id: 4, cat: "reels",    title: "Свадебный рилс",       img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&q=80" },
  { id: 5, cat: "clips",    title: "Рекламный ролик",      img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=500&q=80" },
  { id: 6, cat: "portrait", title: "Портрет девушки",      img: "https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=500&q=80" },
  { id: 7, cat: "wb",       title: "Карточка для WB",      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
  { id: 8, cat: "family",   title: "Семья на природе",     img: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=500&q=80" },
  { id: 9, cat: "clips",    title: "Клип для бренда",      img: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=500&q=80" },
];

const PORT_FILTERS: Record<string, string> = {
  all: "Все", reels: "Рилсы", portrait: "Портреты", family: "Семья", clips: "Клипы", wb: "WB",
};

const BLOG_POSTS = [
  { id: 1, title: "Как правильно подготовиться к фотосессии",     date: "2 июня 2024",  readTime: "3 мин", cat: "Фото" },
  { id: 2, title: "5 ошибок в рилсах, которые убивают охваты",    date: "20 мая 2024",  readTime: "5 мин", cat: "Рилсы" },
  { id: 3, title: "Что такое личный бренд и зачем он нужен",      date: "10 мая 2024",  readTime: "4 мин", cat: "Контент" },
];

// ─── BRIEF FORM ──────────────────────────────────────────────
function BriefForm({ serviceId, onSubmit }: { serviceId: string; onSubmit: () => void }) {
  const [svc, setSvc] = useState(serviceId);
  useEffect(() => setSvc(serviceId), [serviceId]);
  return (
    <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSubmit(); }}>
      <div>
        <label className="field-label">Услуга</label>
        <select value={svc} onChange={e => setSvc(e.target.value)}>
          <option value="">Выберите услугу</option>
          {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="field-label">Имя</label><input type="text" placeholder="Как вас зовут?" /></div>
        <div><label className="field-label">Telegram / Phone</label><input type="text" placeholder="+7 или @username" /></div>
      </div>
      <div><label className="field-label">Компания / Проект</label><input type="text" placeholder="Название проекта или бренда" /></div>
      <div><label className="field-label">Опишите задачу</label><textarea rows={4} placeholder="Что нужно сделать? Цель, формат, сроки..." /></div>
      <div>
        <label className="field-label">Бюджет</label>
        <select>
          <option value="">Пока не определились</option>
          <option>До 5 000 ₽</option>
          <option>5 000 — 20 000 ₽</option>
          <option>20 000 — 50 000 ₽</option>
          <option>Более 50 000 ₽</option>
        </select>
      </div>
      <div><label className="field-label">Референсы / ссылки (опционально)</label><input type="text" placeholder="Примеры, которые нравятся" /></div>
      <button type="submit" className="btn-rose w-full">Отправить бриф</button>
      <p className="text-[10px] text-muted-foreground font-body text-center">Отвечу в течение 24 часов</p>
    </form>
  );
}

// ─── MAIN ────────────────────────────────────────────────────
export default function Index() {
  const [active, setActive]         = useState("home");
  const [sidebarOpen, setSidebar]   = useState(false);
  const [filter, setFilter]         = useState("all");
  const [lightbox, setLightbox]     = useState<null | typeof PORTFOLIO[0]>(null);
  const [briefOpen, setBrief]       = useState(false);
  const [briefService, setBriefSvc] = useState("");

  const scrollTo = (id: string) => {
    setActive(id);
    setSidebar(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const openBrief = (svcId = "") => { setBriefSvc(svcId); setBrief(true); };

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 140;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= y) { setActive(NAV_ITEMS[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filtered = filter === "all" ? PORTFOLIO : PORTFOLIO.filter(p => p.cat === filter);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Mobile header ── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 py-4 border-b border-border"
        style={{ background: "hsl(var(--sidebar-background))" }}>
        <span className="font-display text-lg text-rose italic tracking-wider">NISA STUDIO</span>
        <button onClick={() => setSidebar(!sidebarOpen)} className="text-foreground p-1">
          <Icon name={sidebarOpen ? "X" : "Menu"} size={20} />
        </button>
      </header>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col w-[210px] border-r border-sidebar-border
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        style={{ background: "hsl(var(--sidebar-background))" }}
      >
        <div className="px-6 pt-8 pb-5 border-b border-sidebar-border">
          <div className="font-display text-xl text-rose italic tracking-wider">NISA STUDIO</div>
          <div className="text-[10px] text-muted-foreground mt-1 uppercase tracking-[0.18em] font-body">
            Фото · Видео · Контент
          </div>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`sidebar-link ${active === item.id ? "active" : ""}`}>
              <Icon name={item.icon} size={13} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="px-6 pb-6 pt-4 border-t border-sidebar-border">
          <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-3 font-body">Соцсети</p>
          <div className="flex gap-4">
            {["Instagram", "Youtube", "Send"].map(ic => (
              <a key={ic} href="#" className="text-muted-foreground hover:text-rose transition-colors duration-300">
                <Icon name={ic} size={15} />
              </a>
            ))}
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="lg:hidden fixed inset-0 z-30 bg-black/70" onClick={() => setSidebar(false)} />}

      {/* ── MAIN ── */}
      <main className="lg:pl-[210px]">

        {/* HOME */}
        <section id="home" className="relative min-h-screen flex items-end overflow-hidden pt-14 lg:pt-0">
          <div className="absolute inset-0">
            <img src={HERO_IMG} alt="NISA STUDIO" className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{
              background: "linear-gradient(to top, rgba(6,4,4,1) 0%, rgba(6,4,4,0.65) 45%, rgba(6,4,4,0.15) 100%)"
            }} />
          </div>
          <div className="relative z-10 px-8 md:px-14 pb-14 md:pb-24 max-w-2xl">
            <div className="hero-reveal flex items-center gap-3 mb-5">
              <span className="rose-line" />
              <span className="text-rose text-[10px] uppercase tracking-[0.25em] font-body">Фотограф · Рилсмейкер · Креатор</span>
            </div>
            <h1 className="hero-reveal font-display font-light leading-[0.95] mb-6 text-foreground"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)" }}>
              Создаю<br />
              <span className="italic text-rose">контент,</span><br />
              который<br />
              продаёт
            </h1>
            <p className="hero-reveal font-body text-sm text-muted-foreground max-w-sm mb-8 leading-relaxed">
              Рилсы, фото, монтаж, анимация, сайты — всё под ключ. Помогаю экспертам и брендам выглядеть сильно в каждом кадре.
            </p>
            <div className="hero-reveal flex flex-wrap gap-3">
              <button className="btn-rose" onClick={() => scrollTo("services")}>Услуги</button>
              <button className="btn-ghost" onClick={() => openBrief()}>Оставить заявку</button>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 hidden md:flex flex-col items-center gap-2 text-muted-foreground">
            <span className="text-[9px] uppercase tracking-[0.2em] font-body" style={{ writingMode: "vertical-rl" }}>Прокрутить</span>
            <Icon name="ChevronDown" size={13} className="text-rose animate-bounce" />
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="py-20 px-8 md:px-14">
          <div className="flex items-center gap-3 mb-3">
            <span className="rose-line" />
            <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Чем занимаюсь</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-14">Услуги</h2>
          {SERVICE_CATS.map(catName => {
            const group = SERVICES.filter(s => s.cat === catName);
            return (
              <div key={catName} className="mb-14">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-[10px] uppercase tracking-[0.2em] font-body text-rose border border-rose px-3 py-1">{catName}</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {group.map(s => (
                    <div key={s.id} className="service-card group">
                      <div className="w-9 h-9 flex items-center justify-center border border-border text-rose mb-4">
                        <Icon name={s.icon} size={16} />
                      </div>
                      <h3 className="font-display text-xl font-light mb-2">{s.title}</h3>
                      <p className="text-xs text-muted-foreground font-body leading-relaxed mb-4">{s.desc}</p>
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {s.includes.map(t => (
                          <span key={t} className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-0.5 font-body">{t}</span>
                        ))}
                      </div>
                      <button onClick={() => openBrief(s.id)}
                        className="text-[10px] uppercase tracking-widest text-rose font-body flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                        Заказать <Icon name="ArrowRight" size={11} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* PORTFOLIO */}
        <section id="portfolio" className="py-20 px-8 md:px-14 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="rose-line" />
            <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Примеры работ</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <h2 className="font-display text-4xl md:text-5xl font-light">Портфолио</h2>
            <div className="flex flex-wrap gap-1">
              {Object.entries(PORT_FILTERS).map(([k, v]) => (
                <button key={k} className={`filter-btn ${filter === k ? "active" : ""}`} onClick={() => setFilter(k)}>{v}</button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {filtered.map(item => (
              <div key={item.id} className="portfolio-item" onClick={() => setLightbox(item)}>
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="overlay">
                  <span className="text-[10px] uppercase tracking-widest text-rose font-body mb-1">{PORT_FILTERS[item.cat]}</span>
                  <h3 className="font-display text-lg text-white font-light">{item.title}</h3>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px] text-white/50 font-body">
                    <Icon name="ZoomIn" size={11} /><span>Открыть</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center py-16 text-muted-foreground font-body text-sm">Нет работ в этой категории</p>
          )}
        </section>

        {/* PRICE */}
        <section id="price" className="py-20 px-8 md:px-14 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="rose-line" />
            <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Стоимость</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-12">Прайс</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICES.map(block => (
              <div key={block.cat} className={`price-card ${block.popular ? "featured" : ""} relative`}>
                {block.popular && (
                  <div className="absolute top-0 right-0 bg-rose text-[9px] uppercase tracking-widest px-3 py-1 font-body"
                    style={{ color: "hsl(0 0% 4%)" }}>Популярно</div>
                )}
                <h3 className="font-display text-xl text-rose font-light mb-6">{block.cat}</h3>
                <div className="space-y-4">
                  {block.items.map(item => (
                    <div key={item.name} className="flex items-start justify-between gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <span className="text-xs font-body text-foreground leading-relaxed flex-1">{item.name}</span>
                      <span className="text-xs font-body text-rose whitespace-nowrap">{item.price}</span>
                    </div>
                  ))}
                </div>
                <button className="btn-rose w-full mt-8 text-[10px]" onClick={() => openBrief()}>Заказать</button>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground font-body text-center mt-8">
            Итоговая стоимость зависит от объёма и сложности — уточняю индивидуально
          </p>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 px-8 md:px-14 border-t border-border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="rose-line" />
                <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Знакомство</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Обо мне</h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4 text-sm">
                Привет! Меня зовут <span className="text-foreground font-medium">[Имя]</span> — я фотограф, рилсмейкер и креатор.
                [Добавь несколько слов о себе: откуда, сколько лет в профессии, с кем работаешь.]
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8 text-sm">
                [Расскажи почему занимаешься этим делом, что вдохновляет, какой результат даёшь клиентам.]
              </p>
              <div className="grid grid-cols-3 gap-6 border-t border-border pt-8">
                {[["100+", "проектов"], ["3+", "года опыта"], ["50+", "клиентов"]].map(([n, l]) => (
                  <div key={l}>
                    <div className="font-display text-3xl text-rose font-light">{n}</div>
                    <div className="text-[10px] text-muted-foreground font-body uppercase tracking-wider mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80"
                  alt="Nisa Studio" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 border border-rose flex items-center justify-center bg-background">
                <div className="text-center">
                  <div className="font-display text-[11px] text-rose italic">Since</div>
                  <div className="font-display text-lg text-rose">2021</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BLOG */}
        <section id="blog" className="py-20 px-8 md:px-14 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="rose-line" />
            <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Полезное</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-12">Блог</h2>
          <div className="border-t border-border">
            {BLOG_POSTS.map((p, i) => (
              <div key={p.id} className="blog-row group">
                <div className="flex items-start gap-5">
                  <span className="font-display text-4xl text-border font-light leading-none group-hover:text-rose transition-colors duration-300">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-rose font-body mb-1.5 block">{p.cat}</span>
                    <h3 className="font-display text-xl font-light group-hover:text-rose transition-colors duration-300">{p.title}</h3>
                    <div className="flex gap-3 mt-1.5 text-[10px] text-muted-foreground font-body">
                      <span>{p.date}</span><span>·</span><span>{p.readTime} чтения</span>
                    </div>
                  </div>
                </div>
                <Icon name="ArrowUpRight" size={16} className="text-border group-hover:text-rose transition-colors duration-300 flex-shrink-0 ml-4" />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <button className="btn-ghost">Все статьи</button>
          </div>
        </section>

        {/* BRIEF SECTION */}
        <section id="brief" className="py-20 px-8 md:px-14 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="rose-line" />
            <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Анкета клиента</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Бриф</h2>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-8">
                Заполни форму — расскажи про задачу, бюджет и сроки. Отвечу в течение 24 часов с расчётом стоимости.
              </p>
              <div className="space-y-4 mb-8">
                {["Выбираешь услугу", "Заполняешь бриф", "Получаешь расчёт", "Начинаем работу"].map((step, i) => (
                  <div key={step} className="flex items-center gap-4 text-sm font-body text-muted-foreground">
                    <span className="w-7 h-7 border border-rose text-rose flex items-center justify-center font-display text-sm flex-shrink-0">{i + 1}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
              {/* Внешняя анкета */}
              <div className="p-5 border border-border">
                <p className="text-xs text-muted-foreground font-body mb-3">Предпочитаешь заполнить Google-форму?</p>
                <a href="#" target="_blank" rel="noreferrer" className="btn-ghost text-[10px] inline-flex items-center gap-2">
                  Открыть анкету <Icon name="ExternalLink" size={11} />
                </a>
              </div>
            </div>
            <BriefForm serviceId="" onSubmit={() => {}} />
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-20 px-8 md:px-14 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <span className="rose-line" />
            <span className="text-rose text-[10px] uppercase tracking-[0.22em] font-body">Связаться</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-light mb-6">Контакты</h2>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-10">
                Есть проект или вопрос? Пиши — отвечу быстро и без воды.
              </p>
              <div className="space-y-5">
                {[
                  { icon: "Mail",      label: "Email",     value: "hello@nisastudio.ru",  href: "mailto:hello@nisastudio.ru" },
                  { icon: "Send",      label: "Telegram",  value: "@nisastudio",           href: "https://t.me/nisastudio" },
                  { icon: "Instagram", label: "Instagram", value: "@nisa.studio",          href: "#" },
                  { icon: "Youtube",   label: "YouTube",   value: "NISA STUDIO",           href: "#" },
                ].map(c => (
                  <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
                    className="flex items-center gap-4 group">
                    <div className="w-10 h-10 border border-border flex items-center justify-center text-rose flex-shrink-0 group-hover:border-rose transition-colors duration-300">
                      <Icon name={c.icon} size={15} />
                    </div>
                    <div>
                      <div className="text-[10px] text-muted-foreground uppercase tracking-wider font-body">{c.label}</div>
                      <div className="font-body text-sm text-foreground group-hover:text-rose transition-colors duration-300">{c.value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <form className="space-y-4" onSubmit={e => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="field-label">Имя</label><input type="text" placeholder="Ваше имя" /></div>
                  <div><label className="field-label">Telegram / Phone</label><input type="text" placeholder="@username" /></div>
                </div>
                <div>
                  <label className="field-label">Услуга</label>
                  <select>
                    <option value="">Выберите услугу</option>
                    {SERVICES.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                  </select>
                </div>
                <div><label className="field-label">Сообщение</label><textarea rows={4} placeholder="Расскажите о задаче..." /></div>
                <button type="submit" className="btn-rose w-full">Отправить</button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border px-8 md:px-14 py-7 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-display text-rose italic text-lg tracking-wider">NISA STUDIO</span>
          <span className="text-[10px] text-muted-foreground font-body uppercase tracking-wider">© 2024 — Все права защищены</span>
          <div className="flex gap-5">
            {["Instagram", "Youtube", "Send"].map(icon => (
              <a key={icon} href="#" className="text-muted-foreground hover:text-rose transition-colors duration-300">
                <Icon name={icon} size={15} />
              </a>
            ))}
          </div>
        </footer>
      </main>

      {/* LIGHTBOX */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 md:p-10"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors"
            onClick={() => setLightbox(null)}>
            <Icon name="X" size={22} />
          </button>
          <div className="max-w-3xl w-full" onClick={e => e.stopPropagation()}>
            <img src={lightbox.img} alt={lightbox.title} className="w-full max-h-[70vh] object-contain" />
            <div className="mt-5 flex items-end justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-rose font-body block mb-1">{PORT_FILTERS[lightbox.cat]}</span>
                <h3 className="font-display text-2xl text-white font-light">{lightbox.title}</h3>
              </div>
              <button className="btn-ghost text-[10px]"
                onClick={() => { setLightbox(null); openBrief(lightbox.cat); }}>
                Заказать похожее
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BRIEF MODAL */}
      {briefOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          onClick={() => setBrief(false)}>
          <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto border border-border"
            style={{ background: "hsl(0 0% 6%)" }}
            onClick={e => e.stopPropagation()}>
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-rose font-body mb-1">Заявка</div>
                  <h3 className="font-display text-2xl font-light">Бриф на проект</h3>
                </div>
                <button onClick={() => setBrief(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <Icon name="X" size={18} />
                </button>
              </div>
              <BriefForm serviceId={briefService} onSubmit={() => setBrief(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
