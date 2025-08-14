
const dict = {
  ru: { nav_about:"О компании", nav_products:"Продукция", nav_industries:"Отрасли", nav_contact:"Контакты",
    hero_badge:"Инженерные решения мирового уровня",
    hero_h1:"Промышленные компоненты <span style='background:linear-gradient(135deg,#F6D56B,#B97A13);-webkit-background-clip:text;background-clip:text;color:transparent'>класса премиум</span>",
    hero_p:"«pcp» проектирует и поставляет арматуру, трубопроводные системы и решения для тяжелой промышленности.",
    cta_primary:"Посмотреть продукцию", cta_secondary:"Связаться",
    hero_m1_t:"Гарантия 24 месяца", hero_m1_d:"Расширенная поддержка",
    hero_m2_t:"Сертификация ISO", hero_m2_d:"9001, 14001, 45001",
    about_h2:"Почему pcp?", about_p:"Качество, сроки и прозрачность. Контроль на каждом этапе.",
    stats_years:"лет опыта", stats_projects:"выполненных проектов", stats_skus:"позиции на складе", stats_partners:"партнёров по миру",
    products_h2:"Линейки продукции", products_p:"Готовые решения и спецификации под проект.",
    pr1_t:"Запорная арматура", pr1_d:"Шаровые, задвижки, обратные клапаны до PN160",
    pr2_t:"Трубные системы", pr2_d:"Нержавеющая и углеродистая сталь, фитинги",
    pr3_t:"Автоматизация", pr3_d:"Электро/пневмоприводы, позиционеры",
    pr4_t:"Фильтры и сепараторы", pr4_d:"Y-фильтры, циклоны, тонкая очистка",
    pr5_t:"Безопасность", pr5_d:"Предохранительные клапаны, датчики, блокировки",
    pr6_t:"Логистика и сервис", pr6_d:"Поставка «под ключ», шеф-монтаж, гарантия",
    industries_h2:"Решения для отраслей", industries_p:"Работаем в суровых условиях и на критически важных объектах.",
    ind_energy:"Энергетика", ind_mining:"Горнодобыча", ind_oilgas:"Нефть и газ", ind_chem:"Химическая", ind_build:"Строительство", ind_water:"Водоснабжение",
    adv_h2:"Наши преимущества", adv1:"ISO и протоколы испытаний", adv2:"Комплектация под ТЗ", adv3:"Экспресс-поставки со склада", adv4:"Инжиниринг и техподдержка 24/7",
    partners_h2:"Нам доверяют",
    contact_h2:"Связаться с нами", contact_p:"Опишите задачу — вернёмся с расчётом и сроками в течение рабочего дня.",
    name:"Ваше имя", phone:"Телефон", message:"Сообщение", send:"Отправить запрос", sent:"Спасибо! Мы свяжемся с вами в ближайшее время.",
    footer:"© " + new Date().getFullYear() + " pcp. Все права защищены."
  },
  uz: { nav_about:"Kompaniya haqida", nav_products:"Mahsulotlar", nav_industries:"Tarmoqlar", nav_contact:"Aloqa",
    hero_badge:"Jahon darajasidagi muhandislik yechimlari",
    hero_h1:"Sanoat komponentlari <span style='background:linear-gradient(135deg,#F6D56B,#B97A13);-webkit-background-clip:text;background-clip:text;color:transparent'>premium sinf</span>",
    hero_p:"«pcp» og‘ir sanoat uchun armatura, quvurlar tizimi va yechimlarni yetkazadi.",
    cta_primary:"Mahsulotlarni ko‘rish", cta_secondary:"Bog‘lanish",
    hero_m1_t:"24 oylik kafolat", hero_m1_d:"Kengaytirilgan qo‘llab-quvvatlash",
    hero_m2_t:"ISO sertifikatlari", hero_m2_d:"9001, 14001, 45001",
    about_h2:"Nega pcp?", about_p:"Sifat, muddat va shaffoflik. Har bir bosqichda nazorat.",
    stats_years:"yillik tajriba", stats_projects:"bajarilgan loyiha", stats_skus:"ombordagi pozitsiya", stats_partners:"hamkorlar",
    products_h2:"Mahsulot yo‘nalishlari", products_p:"Tayyor yechim yoki loyiha spetsifikatsiyasi.",
    pr1_t:"Armatura", pr1_d:"Sharli kranlar, zaslonkalar, qaytish klapanlari PN160 gacha",
    pr2_t:"Quvurlar tizimi", pr2_d:"Zanglamas va uglerodli po‘lat, fitinglar",
    pr3_t:"Avtomatlashtirish", pr3_d:"Elektro/pnevmo privodlar, pozitsionerlar",
    pr4_t:"Filtr va separatorlar", pr4_d:"Y-filtrlar, siklonlar, nozik tozalash",
    pr5_t:"Xavfsizlik", pr5_d:"Xavfsizlik klapanlari, datchiklar, blokirovkalar",
    pr6_t:"Logistika va servis", pr6_d:"Kalit topshirish, shef-montaj, kafolat",
    industries_h2:"Tarmoqlar uchun yechimlar", industries_p:"Og‘ir sharoitlarda va muhim obyektlarda.",
    ind_energy:"Energetika", ind_mining:"Konchilik", ind_oilgas:"Neft va gaz", ind_chem:"Kimyo", ind_build:"Qurilish", ind_water:"Suv ta’minoti",
    adv_h2:"Afzalliklarimiz", adv1:"ISO va sinov protokollari", adv2:"TZ bo‘yicha jamlanma", adv3:"Ombordan tez yetkazib berish", adv4:"24/7 injiniring va texnik yordam",
    partners_h2:"Bizga ishonishadi",
    contact_h2:"Biz bilan bog‘laning", contact_p:"Vazifani tavsiflab bering — ish kuni davomida javob beramiz.",
    name:"Ismingiz", phone:"Telefon", message:"Xabar", send:"So‘rov yuborish", sent:"Rahmat! Tez orada bog‘lanamiz.",
    footer:"© " + new Date().getFullYear() + " pcp. Barcha huquqlar himoyalangan."
  }
};

function setLang(lang){
  const d = dict[lang] || dict.ru;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const key = el.getAttribute("data-i18n");
    if(d[key] !== undefined){ el.innerHTML = d[key]; }
  });
  document.querySelectorAll("[data-i18n-ph]").forEach(el=>{
    const key = el.getAttribute("data-i18n-ph");
    if(d[key] !== undefined){ el.setAttribute("placeholder", d[key]); }
  });
  document.querySelectorAll(".lang-switch button").forEach(b=>b.classList.remove("active"));
  const btn = document.querySelector(`.lang-switch button[data-lang='${lang}']`);
  if(btn) btn.classList.add("active");
  localStorage.setItem("pcp-lang", lang);
}

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("pcp-lang") || "ru";
  setLang(saved);

  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("show"); io.unobserve(e.target); } });
  }, {threshold:.12});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));

  const counters = document.querySelectorAll("[data-counter]");
  const ci = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target; const end = parseInt(el.getAttribute("data-counter"),10);
        let cur = 0; const inc = Math.max(1, Math.round(end/80));
        const t = setInterval(()=>{ cur += inc; if(cur >= end){ cur = end; clearInterval(t); } el.textContent = cur.toLocaleString("ru-RU"); }, 16);
        ci.unobserve(el);
      }
    });
  }, {threshold:.6});
  counters.forEach(el=>ci.observe(el));

  document.addEventListener("click", (e)=>{
    const a = e.target.closest("a[data-prefill]");
    if(!a) return;
    const field = document.querySelector('textarea[name="msg"]');
    const msg = a.getAttribute("data-prefill");
    if(field){ field.value = msg + "\\n\\n— Укажите объёмы, давления, температуру и стандарты"; }
  });

  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", async (e)=>{
    e.preventDefault();
    const data = { name: form.name.value.trim(), phone: form.phone.value.trim(), msg: form.msg.value.trim(), lang: localStorage.getItem("pcp-lang")||"ru" };
    const n = document.getElementById("notice");
    try{
      const res = await fetch("/api/contact", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify(data) });
      if(!res.ok) throw new Error("HTTP " + res.status);
      form.reset(); n.textContent = (dict[data.lang]||dict.ru).sent; n.classList.add("glass"); n.style.padding="12px 14px"; n.style.marginTop="10px";
    }catch(err){
      n.textContent = "Ошибка отправки. Подключите бэкенд или напишите в Telegram.";
      n.style.color = "#ffb3b3";
    }
  });
});

window.pcpSetLang = setLang;

// mobile menu toggle
window.addEventListener("DOMContentLoaded", ()=>{
  const btn = document.querySelector(".m-nav-toggle");
  const links = document.querySelector(".nav .links");
  if(btn && links){
    btn.addEventListener("click", ()=> links.classList.toggle("show"));
    links.querySelectorAll("a").forEach(a=> a.addEventListener("click", ()=> links.classList.remove("show")));
  }
});
