/* Social Steps — lightweight i18n + UI interactions */
(function () {
  "use strict";

  const LANGS = [
    { code: "en", label: "English" },
    { code: "nl", label: "Nederlands" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "it", label: "Italiano" },
    { code: "pt", label: "Português" },
  ];

  const T = {
    en: {
      nav_how: "How it works", nav_faq: "FAQ", nav_privacy: "Privacy", nav_terms: "Terms",
      hero_badge: "Walk more. Scroll less.",
      hero_title: "Earn your screen time", hero_accent: "by walking",
      hero_lead: "Social Steps turns your daily steps into screen time. Pick the apps that distract you, set your pace, and let your feet unlock your phone.",
      cta_download: "Download on the App Store", cta_how: "See how it works",
      trust_privacy: "Privacy-first", trust_noads: "No ads", trust_notracking: "No tracking",
      fc1_title: "+38 min", fc1_sub: "earned today", fc2_title: "Auto-block", fc2_sub: "stay focused",
      how_eyebrow: "How it works", how_title: "Three simple steps", how_sub: "No willpower required — just movement.",
      step1_t: "Walk", step1_d: "Social Steps reads your steps from Apple Health. Every step counts toward today's screen time.",
      step2_t: "Earn", step2_d: "Your steps become minutes. Start at 200 steps per minute — with Premium you set your own rate.",
      step3_t: "Unlock", step3_d: "Choose the apps to limit. They stay blocked until you've earned enough time by moving.",
      sc1_tag: "Stay focused", sc1_t: "Distracting apps, blocked automatically", sc1_d: "No need to rely on willpower. The apps you choose stay locked until your steps unlock them — handled silently in the background.",
      sc1_li1: "Block any app or category", sc1_li2: "Runs in the background", sc1_li3: "Your selection stays private",
      sc2_tag: "Track progress", sc2_t: "See every day at a glance", sc2_d: "A clean history shows the screen time you earned and used each day, automatically kept accurate with your real step totals.",
      sc2_li1: "Daily earned vs. used", sc2_li2: "Accurate to your real steps", sc2_li3: "Beautiful, simple overview",
      premium_t: "Social Steps Premium", premium_d: "Make it yours. Set your own conversion rate and add bonus minutes whenever you need them — billed monthly in your local currency.",
      premium_p1: "Custom conversion rate", premium_p2: "Bonus minutes", premium_p3: "Cancel anytime",
      final_t: "Ready to walk your way back to focus?", final_d: "Download Social Steps and turn movement into screen time.", final_btn: "Download on the App Store",
      footer_tagline: "Earn your screen time by walking.",
      footer_product: "Product", footer_legal: "Legal", footer_contact: "Contact", footer_rights: "© 2026 Social Steps. All rights reserved.",
    },
    nl: {
      nav_how: "Hoe het werkt", nav_faq: "FAQ", nav_privacy: "Privacy", nav_terms: "Voorwaarden",
      hero_badge: "Meer lopen. Minder scrollen.",
      hero_title: "Verdien je schermtijd", hero_accent: "door te lopen",
      hero_lead: "Social Steps zet je dagelijkse stappen om in schermtijd. Kies de apps die je afleiden, bepaal je tempo en laat je voeten je telefoon ontgrendelen.",
      cta_download: "Download in de App Store", cta_how: "Bekijk hoe het werkt",
      trust_privacy: "Privacy voorop", trust_noads: "Geen advertenties", trust_notracking: "Geen tracking",
      fc1_title: "+38 min", fc1_sub: "vandaag verdiend", fc2_title: "Auto-blok", fc2_sub: "blijf gefocust",
      how_eyebrow: "Hoe het werkt", how_title: "Drie simpele stappen", how_sub: "Geen wilskracht nodig — alleen beweging.",
      step1_t: "Loop", step1_d: "Social Steps leest je stappen uit Apple Gezondheid. Elke stap telt mee voor je schermtijd van vandaag.",
      step2_t: "Verdien", step2_d: "Je stappen worden minuten. Start met 200 stappen per minuut — met Premium stel je je eigen ratio in.",
      step3_t: "Ontgrendel", step3_d: "Kies de apps die je wilt beperken. Ze blijven geblokkeerd tot je genoeg tijd hebt verdiend met bewegen.",
      sc1_tag: "Blijf gefocust", sc1_t: "Afleidende apps, automatisch geblokkeerd", sc1_d: "Geen wilskracht nodig. De apps die je kiest blijven vergrendeld tot je stappen ze ontgrendelen — stil op de achtergrond geregeld.",
      sc1_li1: "Blokkeer elke app of categorie", sc1_li2: "Werkt op de achtergrond", sc1_li3: "Je selectie blijft privé",
      sc2_tag: "Volg je voortgang", sc2_t: "Zie elke dag in één oogopslag", sc2_d: "Een overzichtelijke historie toont de schermtijd die je per dag verdiende en gebruikte, automatisch kloppend met je echte stappentotalen.",
      sc2_li1: "Verdiend vs. gebruikt per dag", sc2_li2: "Klopt met je echte stappen", sc2_li3: "Mooi, simpel overzicht",
      premium_t: "Social Steps Premium", premium_d: "Maak het van jou. Stel je eigen conversieratio in en voeg bonusminuten toe wanneer je wilt — maandelijks in je eigen valuta.",
      premium_p1: "Eigen conversieratio", premium_p2: "Bonusminuten", premium_p3: "Altijd opzegbaar",
      final_t: "Klaar om terug te lopen naar focus?", final_d: "Download Social Steps en zet beweging om in schermtijd.", final_btn: "Download in de App Store",
      footer_tagline: "Verdien je schermtijd door te lopen.",
      footer_product: "Product", footer_legal: "Juridisch", footer_contact: "Contact", footer_rights: "© 2026 Social Steps. Alle rechten voorbehouden.",
    },
    de: {
      nav_how: "So funktioniert's", nav_faq: "FAQ", nav_privacy: "Datenschutz", nav_terms: "AGB",
      hero_badge: "Mehr gehen. Weniger scrollen.",
      hero_title: "Verdiene deine Bildschirmzeit", hero_accent: "durchs Gehen",
      hero_lead: "Social Steps verwandelt deine täglichen Schritte in Bildschirmzeit. Wähle die Apps, die dich ablenken, bestimme dein Tempo und lass deine Füße dein Handy freischalten.",
      cta_download: "Im App Store laden", cta_how: "So funktioniert's",
      trust_privacy: "Datenschutz zuerst", trust_noads: "Keine Werbung", trust_notracking: "Kein Tracking",
      fc1_title: "+38 Min.", fc1_sub: "heute verdient", fc2_title: "Auto-Sperre", fc2_sub: "bleib fokussiert",
      how_eyebrow: "So funktioniert's", how_title: "Drei einfache Schritte", how_sub: "Keine Willenskraft nötig — nur Bewegung.",
      step1_t: "Gehen", step1_d: "Social Steps liest deine Schritte aus Apple Health. Jeder Schritt zählt für die heutige Bildschirmzeit.",
      step2_t: "Verdienen", step2_d: "Deine Schritte werden zu Minuten. Start bei 200 Schritten pro Minute — mit Premium legst du dein eigenes Verhältnis fest.",
      step3_t: "Freischalten", step3_d: "Wähle die Apps zum Begrenzen. Sie bleiben gesperrt, bis du genug Zeit erlaufen hast.",
      sc1_tag: "Bleib fokussiert", sc1_t: "Ablenkende Apps, automatisch gesperrt", sc1_d: "Keine Willenskraft nötig. Die gewählten Apps bleiben gesperrt, bis deine Schritte sie freischalten — leise im Hintergrund.",
      sc1_li1: "Sperre jede App oder Kategorie", sc1_li2: "Läuft im Hintergrund", sc1_li3: "Deine Auswahl bleibt privat",
      sc2_tag: "Fortschritt verfolgen", sc2_t: "Jeder Tag auf einen Blick", sc2_d: "Ein klarer Verlauf zeigt die verdiente und genutzte Bildschirmzeit pro Tag, automatisch korrekt mit deinen echten Schrittzahlen.",
      sc2_li1: "Verdient vs. genutzt pro Tag", sc2_li2: "Korrekt mit echten Schritten", sc2_li3: "Schöne, einfache Übersicht",
      premium_t: "Social Steps Premium", premium_d: "Mach es zu deinem. Lege dein eigenes Verhältnis fest und füge Bonusminuten hinzu, wann du willst — monatlich in deiner Währung.",
      premium_p1: "Eigenes Verhältnis", premium_p2: "Bonusminuten", premium_p3: "Jederzeit kündbar",
      final_t: "Bereit, dich zurück zum Fokus zu gehen?", final_d: "Lade Social Steps und verwandle Bewegung in Bildschirmzeit.", final_btn: "Im App Store laden",
      footer_tagline: "Verdiene deine Bildschirmzeit durchs Gehen.",
      footer_product: "Produkt", footer_legal: "Rechtliches", footer_contact: "Kontakt", footer_rights: "© 2026 Social Steps. Alle Rechte vorbehalten.",
    },
    fr: {
      nav_how: "Fonctionnement", nav_faq: "FAQ", nav_privacy: "Confidentialité", nav_terms: "Conditions",
      hero_badge: "Marche plus. Scrolle moins.",
      hero_title: "Gagne ton temps d’écran", hero_accent: "en marchant",
      hero_lead: "Social Steps transforme tes pas quotidiens en temps d’écran. Choisis les apps qui te distraient, fixe ton rythme et laisse tes pieds déverrouiller ton téléphone.",
      cta_download: "Télécharger sur l’App Store", cta_how: "Voir le fonctionnement",
      trust_privacy: "Vie privée d’abord", trust_noads: "Sans pub", trust_notracking: "Sans pistage",
      fc1_title: "+38 min", fc1_sub: "gagnées aujourd’hui", fc2_title: "Blocage auto", fc2_sub: "reste concentré",
      how_eyebrow: "Fonctionnement", how_title: "Trois étapes simples", how_sub: "Aucune volonté requise — juste du mouvement.",
      step1_t: "Marche", step1_d: "Social Steps lit tes pas dans Apple Santé. Chaque pas compte pour le temps d’écran du jour.",
      step2_t: "Gagne", step2_d: "Tes pas deviennent des minutes. Départ à 200 pas par minute — avec Premium, tu fixes ton propre taux.",
      step3_t: "Débloque", step3_d: "Choisis les apps à limiter. Elles restent bloquées jusqu’à ce que tu aies gagné assez de temps en bougeant.",
      sc1_tag: "Reste concentré", sc1_t: "Les apps distrayantes, bloquées automatiquement", sc1_d: "Pas besoin de volonté. Les apps choisies restent verrouillées jusqu’à ce que tes pas les déverrouillent — en silence, en arrière-plan.",
      sc1_li1: "Bloque toute app ou catégorie", sc1_li2: "Fonctionne en arrière-plan", sc1_li3: "Ta sélection reste privée",
      sc2_tag: "Suis tes progrès", sc2_t: "Chaque jour en un coup d’œil", sc2_d: "Un historique clair montre le temps d’écran gagné et utilisé chaque jour, automatiquement exact avec tes totaux de pas réels.",
      sc2_li1: "Gagné vs. utilisé par jour", sc2_li2: "Exact selon tes vrais pas", sc2_li3: "Aperçu simple et élégant",
      premium_t: "Social Steps Premium", premium_d: "Personnalise tout. Fixe ton propre taux de conversion et ajoute des minutes bonus quand tu veux — facturé chaque mois dans ta devise.",
      premium_p1: "Taux personnalisé", premium_p2: "Minutes bonus", premium_p3: "Annulable à tout moment",
      final_t: "Prêt à retrouver ta concentration en marchant ?", final_d: "Télécharge Social Steps et transforme le mouvement en temps d’écran.", final_btn: "Télécharger sur l’App Store",
      footer_tagline: "Gagne ton temps d’écran en marchant.",
      footer_product: "Produit", footer_legal: "Mentions légales", footer_contact: "Contact", footer_rights: "© 2026 Social Steps. Tous droits réservés.",
    },
    es: {
      nav_how: "Cómo funciona", nav_faq: "FAQ", nav_privacy: "Privacidad", nav_terms: "Términos",
      hero_badge: "Camina más. Scrollea menos.",
      hero_title: "Gana tiempo de pantalla", hero_accent: "caminando",
      hero_lead: "Social Steps convierte tus pasos diarios en tiempo de pantalla. Elige las apps que te distraen, marca tu ritmo y deja que tus pies desbloqueen tu teléfono.",
      cta_download: "Descargar en el App Store", cta_how: "Ver cómo funciona",
      trust_privacy: "Privacidad primero", trust_noads: "Sin anuncios", trust_notracking: "Sin rastreo",
      fc1_title: "+38 min", fc1_sub: "ganados hoy", fc2_title: "Bloqueo auto", fc2_sub: "mantén el foco",
      how_eyebrow: "Cómo funciona", how_title: "Tres pasos sencillos", how_sub: "Sin fuerza de voluntad — solo movimiento.",
      step1_t: "Camina", step1_d: "Social Steps lee tus pasos de Apple Salud. Cada paso cuenta para el tiempo de pantalla de hoy.",
      step2_t: "Gana", step2_d: "Tus pasos se convierten en minutos. Empieza con 200 pasos por minuto — con Premium fijas tu propia tasa.",
      step3_t: "Desbloquea", step3_d: "Elige las apps a limitar. Permanecen bloqueadas hasta que ganes tiempo suficiente moviéndote.",
      sc1_tag: "Mantén el foco", sc1_t: "Apps que distraen, bloqueadas automáticamente", sc1_d: "Sin depender de la voluntad. Las apps que eliges quedan bloqueadas hasta que tus pasos las desbloquean — en silencio, en segundo plano.",
      sc1_li1: "Bloquea cualquier app o categoría", sc1_li2: "Funciona en segundo plano", sc1_li3: "Tu selección es privada",
      sc2_tag: "Sigue tu progreso", sc2_t: "Cada día de un vistazo", sc2_d: "Un historial claro muestra el tiempo ganado y usado cada día, siempre exacto con tus pasos reales.",
      sc2_li1: "Ganado vs. usado por día", sc2_li2: "Exacto según tus pasos", sc2_li3: "Resumen simple y elegante",
      premium_t: "Social Steps Premium", premium_d: "Hazlo tuyo. Define tu propia tasa de conversión y añade minutos extra cuando quieras — cada mes en tu moneda local.",
      premium_p1: "Tasa personalizada", premium_p2: "Minutos extra", premium_p3: "Cancela cuando quieras",
      final_t: "¿Listo para volver a concentrarte caminando?", final_d: "Descarga Social Steps y convierte el movimiento en tiempo de pantalla.", final_btn: "Descargar en el App Store",
      footer_tagline: "Gana tiempo de pantalla caminando.",
      footer_product: "Producto", footer_legal: "Legal", footer_contact: "Contacto", footer_rights: "© 2026 Social Steps. Todos los derechos reservados.",
    },
    it: {
      nav_how: "Come funziona", nav_faq: "FAQ", nav_privacy: "Privacy", nav_terms: "Termini",
      hero_badge: "Cammina di più. Scrolla di meno.",
      hero_title: "Guadagna tempo di utilizzo", hero_accent: "camminando",
      hero_lead: "Social Steps trasforma i tuoi passi quotidiani in tempo di utilizzo. Scegli le app che ti distraggono, imposta il tuo ritmo e lascia che i tuoi piedi sblocchino il telefono.",
      cta_download: "Scarica su App Store", cta_how: "Scopri come funziona",
      trust_privacy: "Privacy al primo posto", trust_noads: "Niente pubblicità", trust_notracking: "Nessun tracciamento",
      fc1_title: "+38 min", fc1_sub: "guadagnati oggi", fc2_title: "Blocco auto", fc2_sub: "resta concentrato",
      how_eyebrow: "Come funziona", how_title: "Tre semplici passi", how_sub: "Nessuna forza di volontà — solo movimento.",
      step1_t: "Cammina", step1_d: "Social Steps legge i tuoi passi da Apple Salute. Ogni passo conta per il tempo di utilizzo di oggi.",
      step2_t: "Guadagna", step2_d: "I tuoi passi diventano minuti. Si parte da 200 passi al minuto — con Premium imposti il tuo rapporto.",
      step3_t: "Sblocca", step3_d: "Scegli le app da limitare. Restano bloccate finché non guadagni abbastanza tempo muovendoti.",
      sc1_tag: "Resta concentrato", sc1_t: "App che distraggono, bloccate automaticamente", sc1_d: "Senza affidarti alla forza di volontà. Le app scelte restano bloccate finché i tuoi passi non le sbloccano — in silenzio, in background.",
      sc1_li1: "Blocca qualsiasi app o categoria", sc1_li2: "Funziona in background", sc1_li3: "La tua selezione resta privata",
      sc2_tag: "Segui i progressi", sc2_t: "Ogni giorno a colpo d’occhio", sc2_d: "Una cronologia chiara mostra il tempo guadagnato e usato ogni giorno, sempre accurato con i tuoi passi reali.",
      sc2_li1: "Guadagnato vs. usato al giorno", sc2_li2: "Accurato con i passi reali", sc2_li3: "Panoramica semplice ed elegante",
      premium_t: "Social Steps Premium", premium_d: "Rendilo tuo. Imposta il tuo rapporto di conversione e aggiungi minuti bonus quando vuoi — ogni mese nella tua valuta.",
      premium_p1: "Rapporto personalizzato", premium_p2: "Minuti bonus", premium_p3: "Disdici quando vuoi",
      final_t: "Pronto a tornare alla concentrazione camminando?", final_d: "Scarica Social Steps e trasforma il movimento in tempo di utilizzo.", final_btn: "Scarica su App Store",
      footer_tagline: "Guadagna tempo di utilizzo camminando.",
      footer_product: "Prodotto", footer_legal: "Note legali", footer_contact: "Contatti", footer_rights: "© 2026 Social Steps. Tutti i diritti riservati.",
    },
    pt: {
      nav_how: "Como funciona", nav_faq: "FAQ", nav_privacy: "Privacidade", nav_terms: "Termos",
      hero_badge: "Caminhe mais. Role menos.",
      hero_title: "Ganhe seu tempo de tela", hero_accent: "caminhando",
      hero_lead: "O Social Steps transforma seus passos diários em tempo de tela. Escolha os apps que te distraem, defina seu ritmo e deixe seus pés desbloquearem o celular.",
      cta_download: "Baixar na App Store", cta_how: "Veja como funciona",
      trust_privacy: "Privacidade em primeiro", trust_noads: "Sem anúncios", trust_notracking: "Sem rastreamento",
      fc1_title: "+38 min", fc1_sub: "ganhos hoje", fc2_title: "Bloqueio auto", fc2_sub: "mantenha o foco",
      how_eyebrow: "Como funciona", how_title: "Três passos simples", how_sub: "Sem força de vontade — só movimento.",
      step1_t: "Caminhe", step1_d: "O Social Steps lê seus passos do Apple Saúde. Cada passo conta para o tempo de tela de hoje.",
      step2_t: "Ganhe", step2_d: "Seus passos viram minutos. Comece com 200 passos por minuto — com o Premium você define sua própria taxa.",
      step3_t: "Desbloqueie", step3_d: "Escolha os apps a limitar. Eles ficam bloqueados até você ganhar tempo suficiente se movendo.",
      sc1_tag: "Mantenha o foco", sc1_t: "Apps que distraem, bloqueados automaticamente", sc1_d: "Sem depender de força de vontade. Os apps escolhidos ficam bloqueados até seus passos os desbloquearem — silenciosamente, em segundo plano.",
      sc1_li1: "Bloqueie qualquer app ou categoria", sc1_li2: "Funciona em segundo plano", sc1_li3: "Sua seleção é privada",
      sc2_tag: "Acompanhe seu progresso", sc2_t: "Cada dia num relance", sc2_d: "Um histórico claro mostra o tempo ganho e usado por dia, sempre exato com seus totais reais de passos.",
      sc2_li1: "Ganho vs. usado por dia", sc2_li2: "Exato com seus passos reais", sc2_li3: "Visão simples e elegante",
      premium_t: "Social Steps Premium", premium_d: "Deixe do seu jeito. Defina sua própria taxa de conversão e adicione minutos bônus quando precisar — cobrado mensalmente na sua moeda.",
      premium_p1: "Taxa personalizada", premium_p2: "Minutos bônus", premium_p3: "Cancele quando quiser",
      final_t: "Pronto para voltar ao foco caminhando?", final_d: "Baixe o Social Steps e transforme movimento em tempo de tela.", final_btn: "Baixar na App Store",
      footer_tagline: "Ganhe seu tempo de tela caminhando.",
      footer_product: "Produto", footer_legal: "Jurídico", footer_contact: "Contato", footer_rights: "© 2026 Social Steps. Todos os direitos reservados.",
    },
  };

  function pickLang() {
    const saved = localStorage.getItem("ss_lang");
    if (saved && T[saved]) return saved;
    const nav = (navigator.languages || [navigator.language || "en"]);
    for (const l of nav) {
      const code = l.toLowerCase().split("-")[0];
      if (T[code]) return code;
    }
    return "en";
  }

  function apply(lang) {
    const dict = T[lang] || T.en;
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] != null) el.textContent = dict[key];
    });
    const cur = LANGS.find(function (x) { return x.code === lang; });
    const lbl = document.querySelector(".lang-label");
    if (lbl && cur) lbl.textContent = cur.code.toUpperCase();
    document.querySelectorAll(".lang-menu button").forEach(function (b) {
      b.classList.toggle("active", b.dataset.code === lang);
    });
  }

  function buildLangMenu() {
    const menu = document.querySelector(".lang-menu");
    if (!menu) return;
    menu.innerHTML = LANGS.map(function (l) {
      return '<button data-code="' + l.code + '">' + l.label + '</button>';
    }).join("");
    menu.querySelectorAll("button").forEach(function (b) {
      b.addEventListener("click", function () {
        const code = b.dataset.code;
        localStorage.setItem("ss_lang", code);
        apply(code);
        menu.classList.remove("open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    buildLangMenu();
    apply(pickLang());

    // language dropdown toggle
    const btn = document.querySelector(".lang-btn");
    const menu = document.querySelector(".lang-menu");
    if (btn && menu) {
      btn.addEventListener("click", function (e) { e.stopPropagation(); menu.classList.toggle("open"); });
      document.addEventListener("click", function () { menu.classList.remove("open"); });
    }

    // header shadow on scroll
    const header = document.querySelector(".site-header");
    const onScroll = function () { if (header) header.classList.toggle("scrolled", window.scrollY > 8); };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

    // reveal on scroll
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  });
})();
