/* Social Steps — lightweight i18n + UI interactions */
(function () {
  "use strict";

  const APP_STORE_URL = "https://apps.apple.com/nl/app/social-steps-earn-your-time/id6779904572";

  const LANGS = [
    { code: "en", label: "English" },
    { code: "nl", label: "Nederlands" },
    { code: "de", label: "Deutsch" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "it", label: "Italiano" },
    { code: "pt", label: "Português" },
  ];

  // "Download on the App Store" badge — labels per language inside apply()
  function badgeSVG(small, big) {
    return (
      '<svg viewBox="0 0 132 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">' +
      '<rect width="132" height="40" rx="8" fill="#000"/>' +
      '<rect x="0.5" y="0.5" width="131" height="39" rx="7.5" fill="none" stroke="#A6A6A6" stroke-width="1" opacity="0.5"/>' +
      '<path transform="translate(10 8) scale(0.92)" fill="#fff" d="M18.71 19.5c-.83 1.24-1.69 2.45-3.02 2.47-1.31.03-1.73-.78-3.23-.78-1.49 0-1.95.76-3.19.81-1.28.05-2.26-1.34-3.1-2.57-1.72-2.5-3.04-7.07-1.27-10.15.88-1.53 2.44-2.49 4.14-2.52 1.26-.02 2.45.85 3.23.85.77 0 2.22-1.05 3.74-.89.64.03 2.42.26 3.57 1.96-.09.06-2.13 1.25-2.11 3.71.03 2.95 2.59 3.93 2.62 3.94-.02.07-.41 1.42-1.36 2.81M13 5.39c.69-.84 1.16-2.01.94-3.14-1.01.04-2.23.67-2.94 1.49-.64.74-1.2 1.93-1.05 3.06 1.13.09 2.27-.57 3.05-1.41"/>' +
      '<text x="40" y="16" fill="#fff" font-family="Inter, -apple-system, Helvetica, Arial, sans-serif" font-size="8" font-weight="400">' + small + '</text>' +
      '<text x="40" y="31" fill="#fff" font-family="Inter, -apple-system, Helvetica, Arial, sans-serif" font-size="15.5" font-weight="600" letter-spacing="-0.3">' + big + '</text>' +
      '</svg>'
    );
  }

  const T = {
    en: {
      nav_how: "How it works", nav_features: "Features", nav_faq: "FAQ", nav_privacy: "Privacy", nav_terms: "Terms",
      hero_badge: "Walk more. Scroll less.",
      hero_title: "Earn your screen time", hero_accent: "by walking",
      hero_lead: "Social Steps turns your daily steps into screen time. Pick the apps that distract you, set your pace, and let your feet unlock your phone.",
      cta_download: "Download on the App Store", cta_how: "See how it works",
      rating_text: "Loved on the App Store",
      trust_privacy: "Privacy-first", trust_noads: "No ads", trust_notracking: "No tracking",
      fc1_title: "+38 min", fc1_sub: "earned today", fc2_title: "Auto-block", fc2_sub: "stay focused",
      stat1: "steps = 1 minute", stat2: "ads or trackers", stat3: "accounts needed", stat4: "languages",
      how_eyebrow: "How it works", how_title: "Three simple steps", how_sub: "No willpower required — just movement.",
      step1_t: "Walk", step1_d: "Social Steps reads your steps from Apple Health. Every step counts toward today's screen time.",
      step2_t: "Earn", step2_d: "Your steps become minutes. Start at 200 steps per minute — with Premium you set your own rate.",
      step3_t: "Unlock", step3_d: "Choose the apps to limit. They stay blocked until you've earned enough time by moving.",
      feat_eyebrow: "Features", feat_title: "Everything you need to stay focused", feat_sub: "Built around your privacy, designed to keep you moving.",
      feat1_t: "Automatic app blocking", feat1_d: "Chosen apps stay locked until you've earned enough time — handled silently in the background.",
      feat2_t: "Privacy by design", feat2_d: "No accounts, no ads, no tracking. Your app selection and step history stay on your device; only new step counts are added, without your name, to the community total in iCloud.",
      feat3_t: "Daily history", feat3_d: "See the screen time you earned and used each day, kept accurate with your real step totals.",
      feat4_t: "Your own pace", feat4_d: "Start at 200 steps per minute, or set a custom conversion rate with Premium.",
      feat5_t: "Made with Apple Health", feat5_d: "Reads your steps from Apple Health and uses Apple's Screen Time framework — no extra hardware.",
      feat6_t: "Speaks your language", feat6_d: "Available in English, Dutch, German, French, Spanish, Italian and Portuguese.",
      sc1_tag: "Stay focused", sc1_t: "Distracting apps, blocked automatically", sc1_d: "No need to rely on willpower. The apps you choose stay locked until your steps unlock them — handled silently in the background.",
      sc1_li1: "Block any app or category", sc1_li2: "Runs in the background", sc1_li3: "Your selection stays private",
      sc2_tag: "Track progress", sc2_t: "See every day at a glance", sc2_d: "A clean history shows the screen time you earned and used each day, automatically kept accurate with your real step totals.",
      sc2_li1: "Daily earned vs. used", sc2_li2: "Accurate to your real steps", sc2_li3: "Beautiful, simple overview",
      premium_t: "Social Steps Premium", premium_d: "Make it yours. Set your own conversion rate and add bonus minutes whenever you need them — billed monthly or yearly in your local currency.",
      premium_p1: "Custom conversion rate", premium_p2: "Bonus minutes", premium_p3: "Cancel anytime", premium_cta: "Get Social Steps",
      faq_eyebrow: "FAQ", faq_title: "Common questions",
      faq1_q: "How does Social Steps work?", faq1_a: "It reads your daily steps from Apple Health and converts them into screen-time minutes. The apps you choose stay blocked until you've earned enough time by walking.",
      faq2_q: "How many steps do I need for one minute?", faq2_a: "By default, 200 steps equal 1 minute of screen time. With Premium you can set your own conversion rate.",
      faq3_q: "Is my health data safe?", faq3_a: "Yes. Your steps are read on your device and are never sold or used for ads. Only new step counts are added, without your name, to the community total in iCloud; your history stays on your device.",
      faq_more: "See all questions →",
      final_t: "Ready to walk your way back to focus?", final_d: "Download Social Steps and turn movement into screen time.", final_btn: "Download on the App Store",
      footer_tagline: "Earn your screen time by walking.",
      footer_product: "Product", footer_legal: "Legal", footer_contact: "Contact", footer_rights: "© 2026 Social Steps. All rights reserved.", footer_made: "Made for focus.",
      badge_small: "Download on the", badge_big: "App Store",
    },
    nl: {
      nav_how: "Hoe het werkt", nav_features: "Functies", nav_faq: "FAQ", nav_privacy: "Privacy", nav_terms: "Voorwaarden",
      hero_badge: "Meer lopen. Minder scrollen.",
      hero_title: "Verdien je schermtijd", hero_accent: "door te lopen",
      hero_lead: "Social Steps zet je dagelijkse stappen om in schermtijd. Kies de apps die je afleiden, bepaal je tempo en laat je voeten je telefoon ontgrendelen.",
      cta_download: "Download in de App Store", cta_how: "Bekijk hoe het werkt",
      rating_text: "Geliefd in de App Store",
      trust_privacy: "Privacy voorop", trust_noads: "Geen advertenties", trust_notracking: "Geen tracking",
      fc1_title: "+38 min", fc1_sub: "vandaag verdiend", fc2_title: "Auto-blok", fc2_sub: "blijf gefocust",
      stat1: "stappen = 1 minuut", stat2: "advertenties of trackers", stat3: "accounts nodig", stat4: "talen",
      how_eyebrow: "Hoe het werkt", how_title: "Drie simpele stappen", how_sub: "Geen wilskracht nodig — alleen beweging.",
      step1_t: "Loop", step1_d: "Social Steps leest je stappen uit Apple Gezondheid. Elke stap telt mee voor je schermtijd van vandaag.",
      step2_t: "Verdien", step2_d: "Je stappen worden minuten. Start met 200 stappen per minuut — met Premium stel je je eigen ratio in.",
      step3_t: "Ontgrendel", step3_d: "Kies de apps die je wilt beperken. Ze blijven geblokkeerd tot je genoeg tijd hebt verdiend met bewegen.",
      feat_eyebrow: "Functies", feat_title: "Alles om gefocust te blijven", feat_sub: "Gebouwd rond je privacy, gemaakt om je in beweging te houden.",
      feat1_t: "Apps automatisch blokkeren", feat1_d: "Gekozen apps blijven vergrendeld tot je genoeg tijd hebt verdiend — stil op de achtergrond geregeld.",
      feat2_t: "Privacy by design", feat2_d: "Geen accounts, geen advertenties, geen tracking. Je appselectie en stappengeschiedenis blijven op je toestel; alleen nieuwe stappen tellen zonder je naam mee in de gezamenlijke teller in iCloud.",
      feat3_t: "Dagelijkse historie", feat3_d: "Zie per dag de schermtijd die je verdiende en gebruikte, kloppend met je echte stappentotalen.",
      feat4_t: "Je eigen tempo", feat4_d: "Start met 200 stappen per minuut, of stel met Premium je eigen conversieratio in.",
      feat5_t: "Met Apple Gezondheid", feat5_d: "Leest je stappen uit Apple Gezondheid en gebruikt Apple's Schermtijd — geen extra hardware.",
      feat6_t: "Spreekt jouw taal", feat6_d: "Beschikbaar in het Engels, Nederlands, Duits, Frans, Spaans, Italiaans en Portugees.",
      sc1_tag: "Blijf gefocust", sc1_t: "Afleidende apps, automatisch geblokkeerd", sc1_d: "Geen wilskracht nodig. De apps die je kiest blijven vergrendeld tot je stappen ze ontgrendelen — stil op de achtergrond geregeld.",
      sc1_li1: "Blokkeer elke app of categorie", sc1_li2: "Werkt op de achtergrond", sc1_li3: "Je selectie blijft privé",
      sc2_tag: "Volg je voortgang", sc2_t: "Zie elke dag in één oogopslag", sc2_d: "Een overzichtelijke historie toont de schermtijd die je per dag verdiende en gebruikte, automatisch kloppend met je echte stappentotalen.",
      sc2_li1: "Verdiend vs. gebruikt per dag", sc2_li2: "Klopt met je echte stappen", sc2_li3: "Mooi, simpel overzicht",
      premium_t: "Social Steps Premium", premium_d: "Maak het van jou. Stel je eigen conversieratio in en voeg bonusminuten toe wanneer je wilt — per maand of per jaar in je eigen valuta.",
      premium_p1: "Eigen conversieratio", premium_p2: "Bonusminuten", premium_p3: "Altijd opzegbaar", premium_cta: "Download Social Steps",
      faq_eyebrow: "FAQ", faq_title: "Veelgestelde vragen",
      faq1_q: "Hoe werkt Social Steps?", faq1_a: "Het leest je dagelijkse stappen uit Apple Gezondheid en zet ze om in schermtijd-minuten. De apps die je kiest blijven geblokkeerd tot je genoeg tijd hebt verdiend met lopen.",
      faq2_q: "Hoeveel stappen heb ik nodig voor één minuut?", faq2_a: "Standaard staan 200 stappen gelijk aan 1 minuut schermtijd. Met Premium stel je je eigen conversieratio in.",
      faq3_q: "Is mijn gezondheidsdata veilig?", faq3_a: "Ja. Je stappen worden op je toestel gelezen en nooit verkocht of gebruikt voor advertenties. Alleen nieuwe stappen tellen zonder je naam mee in de gezamenlijke teller in iCloud; je geschiedenis blijft op je toestel.",
      faq_more: "Bekijk alle vragen →",
      final_t: "Klaar om terug te lopen naar focus?", final_d: "Download Social Steps en zet beweging om in schermtijd.", final_btn: "Download in de App Store",
      footer_tagline: "Verdien je schermtijd door te lopen.",
      footer_product: "Product", footer_legal: "Juridisch", footer_contact: "Contact", footer_rights: "© 2026 Social Steps. Alle rechten voorbehouden.", footer_made: "Gemaakt voor focus.",
      badge_small: "Download in de", badge_big: "App Store",
    },
    de: {
      nav_how: "So funktioniert's", nav_features: "Funktionen", nav_faq: "FAQ", nav_privacy: "Datenschutz", nav_terms: "AGB",
      hero_badge: "Mehr gehen. Weniger scrollen.",
      hero_title: "Verdiene deine Bildschirmzeit", hero_accent: "durchs Gehen",
      hero_lead: "Social Steps verwandelt deine täglichen Schritte in Bildschirmzeit. Wähle die Apps, die dich ablenken, bestimme dein Tempo und lass deine Füße dein Handy freischalten.",
      cta_download: "Im App Store laden", cta_how: "So funktioniert's",
      rating_text: "Beliebt im App Store",
      trust_privacy: "Datenschutz zuerst", trust_noads: "Keine Werbung", trust_notracking: "Kein Tracking",
      fc1_title: "+38 Min.", fc1_sub: "heute verdient", fc2_title: "Auto-Sperre", fc2_sub: "bleib fokussiert",
      stat1: "Schritte = 1 Minute", stat2: "Werbung oder Tracker", stat3: "Konten nötig", stat4: "Sprachen",
      how_eyebrow: "So funktioniert's", how_title: "Drei einfache Schritte", how_sub: "Keine Willenskraft nötig — nur Bewegung.",
      step1_t: "Gehen", step1_d: "Social Steps liest deine Schritte aus Apple Health. Jeder Schritt zählt für die heutige Bildschirmzeit.",
      step2_t: "Verdienen", step2_d: "Deine Schritte werden zu Minuten. Start bei 200 Schritten pro Minute — mit Premium legst du dein eigenes Verhältnis fest.",
      step3_t: "Freischalten", step3_d: "Wähle die Apps zum Begrenzen. Sie bleiben gesperrt, bis du genug Zeit erlaufen hast.",
      feat_eyebrow: "Funktionen", feat_title: "Alles, um fokussiert zu bleiben", feat_sub: "Rund um deinen Datenschutz gebaut, um dich in Bewegung zu halten.",
      feat1_t: "Automatische App-Sperre", feat1_d: "Gewählte Apps bleiben gesperrt, bis du genug Zeit verdient hast — leise im Hintergrund.",
      feat2_t: "Datenschutz by Design", feat2_d: "Keine Konten, keine Werbung, kein Tracking. Deine App-Auswahl und dein Schrittverlauf bleiben auf deinem Gerät; nur neue Schritte fließen ohne deinen Namen in den gemeinsamen Zähler in iCloud ein.",
      feat3_t: "Täglicher Verlauf", feat3_d: "Sieh pro Tag die verdiente und genutzte Bildschirmzeit, korrekt mit deinen echten Schrittzahlen.",
      feat4_t: "Dein eigenes Tempo", feat4_d: "Start bei 200 Schritten pro Minute, oder lege mit Premium dein eigenes Verhältnis fest.",
      feat5_t: "Mit Apple Health", feat5_d: "Liest deine Schritte aus Apple Health und nutzt Apples Bildschirmzeit — keine extra Hardware.",
      feat6_t: "Spricht deine Sprache", feat6_d: "Verfügbar auf Englisch, Niederländisch, Deutsch, Französisch, Spanisch, Italienisch und Portugiesisch.",
      sc1_tag: "Bleib fokussiert", sc1_t: "Ablenkende Apps, automatisch gesperrt", sc1_d: "Keine Willenskraft nötig. Die gewählten Apps bleiben gesperrt, bis deine Schritte sie freischalten — leise im Hintergrund.",
      sc1_li1: "Sperre jede App oder Kategorie", sc1_li2: "Läuft im Hintergrund", sc1_li3: "Deine Auswahl bleibt privat",
      sc2_tag: "Fortschritt verfolgen", sc2_t: "Jeder Tag auf einen Blick", sc2_d: "Ein klarer Verlauf zeigt die verdiente und genutzte Bildschirmzeit pro Tag, automatisch korrekt mit deinen echten Schrittzahlen.",
      sc2_li1: "Verdient vs. genutzt pro Tag", sc2_li2: "Korrekt mit echten Schritten", sc2_li3: "Schöne, einfache Übersicht",
      premium_t: "Social Steps Premium", premium_d: "Mach es zu deinem. Lege dein eigenes Verhältnis fest und füge Bonusminuten hinzu, wann du willst — monatlich oder jährlich in deiner Währung.",
      premium_p1: "Eigenes Verhältnis", premium_p2: "Bonusminuten", premium_p3: "Jederzeit kündbar", premium_cta: "Social Steps holen",
      faq_eyebrow: "FAQ", faq_title: "Häufige Fragen",
      faq1_q: "Wie funktioniert Social Steps?", faq1_a: "Es liest deine täglichen Schritte aus Apple Health und wandelt sie in Bildschirmzeit-Minuten um. Die gewählten Apps bleiben gesperrt, bis du genug Zeit erlaufen hast.",
      faq2_q: "Wie viele Schritte brauche ich für eine Minute?", faq2_a: "Standardmäßig entsprechen 200 Schritte 1 Minute Bildschirmzeit. Mit Premium legst du dein eigenes Verhältnis fest.",
      faq3_q: "Sind meine Gesundheitsdaten sicher?", faq3_a: "Ja. Deine Schritte werden auf deinem Gerät gelesen und nie verkauft oder für Werbung genutzt. Nur neue Schritte fließen ohne deinen Namen in den gemeinsamen Zähler in iCloud ein; dein Verlauf bleibt auf deinem Gerät.",
      faq_more: "Alle Fragen ansehen →",
      final_t: "Bereit, dich zurück zum Fokus zu gehen?", final_d: "Lade Social Steps und verwandle Bewegung in Bildschirmzeit.", final_btn: "Im App Store laden",
      footer_tagline: "Verdiene deine Bildschirmzeit durchs Gehen.",
      footer_product: "Produkt", footer_legal: "Rechtliches", footer_contact: "Kontakt", footer_rights: "© 2026 Social Steps. Alle Rechte vorbehalten.", footer_made: "Für Fokus gemacht.",
      badge_small: "Laden im", badge_big: "App Store",
    },
    fr: {
      nav_how: "Fonctionnement", nav_features: "Fonctions", nav_faq: "FAQ", nav_privacy: "Confidentialité", nav_terms: "Conditions",
      hero_badge: "Marche plus. Scrolle moins.",
      hero_title: "Gagne ton temps d’écran", hero_accent: "en marchant",
      hero_lead: "Social Steps transforme tes pas quotidiens en temps d’écran. Choisis les apps qui te distraient, fixe ton rythme et laisse tes pieds déverrouiller ton téléphone.",
      cta_download: "Télécharger sur l’App Store", cta_how: "Voir le fonctionnement",
      rating_text: "Apprécié sur l’App Store",
      trust_privacy: "Vie privée d’abord", trust_noads: "Sans pub", trust_notracking: "Sans pistage",
      fc1_title: "+38 min", fc1_sub: "gagnées aujourd’hui", fc2_title: "Blocage auto", fc2_sub: "reste concentré",
      stat1: "pas = 1 minute", stat2: "pubs ou traqueurs", stat3: "compte requis", stat4: "langues",
      how_eyebrow: "Fonctionnement", how_title: "Trois étapes simples", how_sub: "Aucune volonté requise — juste du mouvement.",
      step1_t: "Marche", step1_d: "Social Steps lit tes pas dans Apple Santé. Chaque pas compte pour le temps d’écran du jour.",
      step2_t: "Gagne", step2_d: "Tes pas deviennent des minutes. Départ à 200 pas par minute — avec Premium, tu fixes ton propre taux.",
      step3_t: "Débloque", step3_d: "Choisis les apps à limiter. Elles restent bloquées jusqu’à ce que tu aies gagné assez de temps en bougeant.",
      feat_eyebrow: "Fonctions", feat_title: "Tout pour rester concentré", feat_sub: "Conçu autour de ta vie privée, pour te garder en mouvement.",
      feat1_t: "Blocage automatique des apps", feat1_d: "Les apps choisies restent verrouillées jusqu’à ce que tu aies gagné assez de temps — en silence, en arrière-plan.",
      feat2_t: "Confidentialité par conception", feat2_d: "Pas de comptes, pas de pubs, pas de pistage. Ta sélection d’apps et ton historique de pas restent sur ton appareil ; seuls les nouveaux pas sont ajoutés, sans ton nom, au compteur commun dans iCloud.",
      feat3_t: "Historique quotidien", feat3_d: "Vois le temps gagné et utilisé chaque jour, exact selon tes totaux de pas réels.",
      feat4_t: "Ton propre rythme", feat4_d: "Départ à 200 pas par minute, ou fixe un taux personnalisé avec Premium.",
      feat5_t: "Avec Apple Santé", feat5_d: "Lit tes pas dans Apple Santé et utilise le Temps d’écran d’Apple — sans matériel supplémentaire.",
      feat6_t: "Parle ta langue", feat6_d: "Disponible en anglais, néerlandais, allemand, français, espagnol, italien et portugais.",
      sc1_tag: "Reste concentré", sc1_t: "Les apps distrayantes, bloquées automatiquement", sc1_d: "Pas besoin de volonté. Les apps choisies restent verrouillées jusqu’à ce que tes pas les déverrouillent — en silence, en arrière-plan.",
      sc1_li1: "Bloque toute app ou catégorie", sc1_li2: "Fonctionne en arrière-plan", sc1_li3: "Ta sélection reste privée",
      sc2_tag: "Suis tes progrès", sc2_t: "Chaque jour en un coup d’œil", sc2_d: "Un historique clair montre le temps d’écran gagné et utilisé chaque jour, automatiquement exact avec tes totaux de pas réels.",
      sc2_li1: "Gagné vs. utilisé par jour", sc2_li2: "Exact selon tes vrais pas", sc2_li3: "Aperçu simple et élégant",
      premium_t: "Social Steps Premium", premium_d: "Personnalise tout. Fixe ton propre taux de conversion et ajoute des minutes bonus quand tu veux — facturé chaque mois ou chaque année dans ta devise.",
      premium_p1: "Taux personnalisé", premium_p2: "Minutes bonus", premium_p3: "Annulable à tout moment", premium_cta: "Obtenir Social Steps",
      faq_eyebrow: "FAQ", faq_title: "Questions fréquentes",
      faq1_q: "Comment fonctionne Social Steps ?", faq1_a: "Il lit tes pas quotidiens dans Apple Santé et les convertit en minutes de temps d’écran. Les apps choisies restent bloquées jusqu’à ce que tu aies gagné assez de temps en marchant.",
      faq2_q: "Combien de pas pour une minute ?", faq2_a: "Par défaut, 200 pas équivalent à 1 minute de temps d’écran. Avec Premium, tu fixes ton propre taux.",
      faq3_q: "Mes données de santé sont-elles protégées ?", faq3_a: "Oui. Tes pas sont lus sur ton appareil et ne sont jamais vendus ni utilisés pour de la publicité. Seuls les nouveaux pas sont ajoutés, sans ton nom, au compteur commun dans iCloud ; ton historique reste sur ton appareil.",
      faq_more: "Voir toutes les questions →",
      final_t: "Prêt à retrouver ta concentration en marchant ?", final_d: "Télécharge Social Steps et transforme le mouvement en temps d’écran.", final_btn: "Télécharger sur l’App Store",
      footer_tagline: "Gagne ton temps d’écran en marchant.",
      footer_product: "Produit", footer_legal: "Mentions légales", footer_contact: "Contact", footer_rights: "© 2026 Social Steps. Tous droits réservés.", footer_made: "Conçu pour la concentration.",
      badge_small: "Télécharger dans l’", badge_big: "App Store",
    },
    es: {
      nav_how: "Cómo funciona", nav_features: "Funciones", nav_faq: "FAQ", nav_privacy: "Privacidad", nav_terms: "Términos",
      hero_badge: "Camina más. Scrollea menos.",
      hero_title: "Gana tiempo de pantalla", hero_accent: "caminando",
      hero_lead: "Social Steps convierte tus pasos diarios en tiempo de pantalla. Elige las apps que te distraen, marca tu ritmo y deja que tus pies desbloqueen tu teléfono.",
      cta_download: "Descargar en el App Store", cta_how: "Ver cómo funciona",
      rating_text: "Querida en el App Store",
      trust_privacy: "Privacidad primero", trust_noads: "Sin anuncios", trust_notracking: "Sin rastreo",
      fc1_title: "+38 min", fc1_sub: "ganados hoy", fc2_title: "Bloqueo auto", fc2_sub: "mantén el foco",
      stat1: "pasos = 1 minuto", stat2: "anuncios o rastreadores", stat3: "cuentas necesarias", stat4: "idiomas",
      how_eyebrow: "Cómo funciona", how_title: "Tres pasos sencillos", how_sub: "Sin fuerza de voluntad — solo movimiento.",
      step1_t: "Camina", step1_d: "Social Steps lee tus pasos de Apple Salud. Cada paso cuenta para el tiempo de pantalla de hoy.",
      step2_t: "Gana", step2_d: "Tus pasos se convierten en minutos. Empieza con 200 pasos por minuto — con Premium fijas tu propia tasa.",
      step3_t: "Desbloquea", step3_d: "Elige las apps a limitar. Permanecen bloqueadas hasta que ganes tiempo suficiente moviéndote.",
      feat_eyebrow: "Funciones", feat_title: "Todo para mantener el foco", feat_sub: "Creada en torno a tu privacidad, diseñada para mantenerte en movimiento.",
      feat1_t: "Bloqueo automático de apps", feat1_d: "Las apps elegidas quedan bloqueadas hasta que ganes tiempo suficiente — en silencio, en segundo plano.",
      feat2_t: "Privacidad por diseño", feat2_d: "Sin cuentas, sin anuncios, sin rastreo. Tu selección de apps y tu historial de pasos se quedan en tu dispositivo; solo los pasos nuevos se suman, sin tu nombre, al contador común en iCloud.",
      feat3_t: "Historial diario", feat3_d: "Mira el tiempo ganado y usado cada día, exacto con tus totales de pasos reales.",
      feat4_t: "Tu propio ritmo", feat4_d: "Empieza con 200 pasos por minuto, o fija una tasa personalizada con Premium.",
      feat5_t: "Con Apple Salud", feat5_d: "Lee tus pasos de Apple Salud y usa el Tiempo de Uso de Apple — sin hardware extra.",
      feat6_t: "Habla tu idioma", feat6_d: "Disponible en inglés, neerlandés, alemán, francés, español, italiano y portugués.",
      sc1_tag: "Mantén el foco", sc1_t: "Apps que distraen, bloqueadas automáticamente", sc1_d: "Sin depender de la voluntad. Las apps que eliges quedan bloqueadas hasta que tus pasos las desbloquean — en silencio, en segundo plano.",
      sc1_li1: "Bloquea cualquier app o categoría", sc1_li2: "Funciona en segundo plano", sc1_li3: "Tu selección es privada",
      sc2_tag: "Sigue tu progreso", sc2_t: "Cada día de un vistazo", sc2_d: "Un historial claro muestra el tiempo ganado y usado cada día, siempre exacto con tus pasos reales.",
      sc2_li1: "Ganado vs. usado por día", sc2_li2: "Exacto según tus pasos", sc2_li3: "Resumen simple y elegante",
      premium_t: "Social Steps Premium", premium_d: "Hazlo tuyo. Define tu propia tasa de conversión y añade minutos extra cuando quieras — cada mes o cada año en tu moneda local.",
      premium_p1: "Tasa personalizada", premium_p2: "Minutos extra", premium_p3: "Cancela cuando quieras", premium_cta: "Obtener Social Steps",
      faq_eyebrow: "FAQ", faq_title: "Preguntas frecuentes",
      faq1_q: "¿Cómo funciona Social Steps?", faq1_a: "Lee tus pasos diarios de Apple Salud y los convierte en minutos de tiempo de pantalla. Las apps que eliges quedan bloqueadas hasta que ganes tiempo suficiente caminando.",
      faq2_q: "¿Cuántos pasos necesito para un minuto?", faq2_a: "Por defecto, 200 pasos equivalen a 1 minuto de tiempo de pantalla. Con Premium fijas tu propia tasa.",
      faq3_q: "¿Están seguros mis datos de salud?", faq3_a: "Sí. Tus pasos se leen en tu dispositivo y nunca se venden ni se usan para anuncios. Solo los pasos nuevos se suman, sin tu nombre, al contador común en iCloud; tu historial se queda en tu dispositivo.",
      faq_more: "Ver todas las preguntas →",
      final_t: "¿Listo para volver a concentrarte caminando?", final_d: "Descarga Social Steps y convierte el movimiento en tiempo de pantalla.", final_btn: "Descargar en el App Store",
      footer_tagline: "Gana tiempo de pantalla caminando.",
      footer_product: "Producto", footer_legal: "Legal", footer_contact: "Contacto", footer_rights: "© 2026 Social Steps. Todos los derechos reservados.", footer_made: "Hecho para el foco.",
      badge_small: "Descárgalo en el", badge_big: "App Store",
    },
    it: {
      nav_how: "Come funziona", nav_features: "Funzioni", nav_faq: "FAQ", nav_privacy: "Privacy", nav_terms: "Termini",
      hero_badge: "Cammina di più. Scrolla di meno.",
      hero_title: "Guadagna tempo di utilizzo", hero_accent: "camminando",
      hero_lead: "Social Steps trasforma i tuoi passi quotidiani in tempo di utilizzo. Scegli le app che ti distraggono, imposta il tuo ritmo e lascia che i tuoi piedi sblocchino il telefono.",
      cta_download: "Scarica su App Store", cta_how: "Scopri come funziona",
      rating_text: "Amata su App Store",
      trust_privacy: "Privacy al primo posto", trust_noads: "Niente pubblicità", trust_notracking: "Nessun tracciamento",
      fc1_title: "+38 min", fc1_sub: "guadagnati oggi", fc2_title: "Blocco auto", fc2_sub: "resta concentrato",
      stat1: "passi = 1 minuto", stat2: "pubblicità o tracker", stat3: "account necessari", stat4: "lingue",
      how_eyebrow: "Come funziona", how_title: "Tre semplici passi", how_sub: "Nessuna forza di volontà — solo movimento.",
      step1_t: "Cammina", step1_d: "Social Steps legge i tuoi passi da Apple Salute. Ogni passo conta per il tempo di utilizzo di oggi.",
      step2_t: "Guadagna", step2_d: "I tuoi passi diventano minuti. Si parte da 200 passi al minuto — con Premium imposti il tuo rapporto.",
      step3_t: "Sblocca", step3_d: "Scegli le app da limitare. Restano bloccate finché non guadagni abbastanza tempo muovendoti.",
      feat_eyebrow: "Funzioni", feat_title: "Tutto per restare concentrato", feat_sub: "Costruita attorno alla tua privacy, per tenerti in movimento.",
      feat1_t: "Blocco automatico delle app", feat1_d: "Le app scelte restano bloccate finché non guadagni abbastanza tempo — in silenzio, in background.",
      feat2_t: "Privacy by design", feat2_d: "Nessun account, nessuna pubblicità, nessun tracciamento. La selezione delle app e la cronologia dei passi restano sul dispositivo; solo i nuovi passi vengono aggiunti, senza il tuo nome, al contatore comune su iCloud.",
      feat3_t: "Cronologia giornaliera", feat3_d: "Vedi il tempo guadagnato e usato ogni giorno, accurato con i tuoi totali di passi reali.",
      feat4_t: "Il tuo ritmo", feat4_d: "Parti da 200 passi al minuto, o imposta un rapporto personalizzato con Premium.",
      feat5_t: "Con Apple Salute", feat5_d: "Legge i tuoi passi da Apple Salute e usa Tempo di Utilizzo di Apple — senza hardware extra.",
      feat6_t: "Parla la tua lingua", feat6_d: "Disponibile in inglese, olandese, tedesco, francese, spagnolo, italiano e portoghese.",
      sc1_tag: "Resta concentrato", sc1_t: "App che distraggono, bloccate automaticamente", sc1_d: "Senza affidarti alla forza di volontà. Le app scelte restano bloccate finché i tuoi passi non le sbloccano — in silenzio, in background.",
      sc1_li1: "Blocca qualsiasi app o categoria", sc1_li2: "Funziona in background", sc1_li3: "La tua selezione resta privata",
      sc2_tag: "Segui i progressi", sc2_t: "Ogni giorno a colpo d’occhio", sc2_d: "Una cronologia chiara mostra il tempo guadagnato e usato ogni giorno, sempre accurato con i tuoi passi reali.",
      sc2_li1: "Guadagnato vs. usato al giorno", sc2_li2: "Accurato con i passi reali", sc2_li3: "Panoramica semplice ed elegante",
      premium_t: "Social Steps Premium", premium_d: "Rendilo tuo. Imposta il tuo rapporto di conversione e aggiungi minuti bonus quando vuoi — ogni mese o ogni anno nella tua valuta.",
      premium_p1: "Rapporto personalizzato", premium_p2: "Minuti bonus", premium_p3: "Disdici quando vuoi", premium_cta: "Scarica Social Steps",
      faq_eyebrow: "FAQ", faq_title: "Domande frequenti",
      faq1_q: "Come funziona Social Steps?", faq1_a: "Legge i tuoi passi quotidiani da Apple Salute e li converte in minuti di tempo di utilizzo. Le app scelte restano bloccate finché non guadagni abbastanza tempo camminando.",
      faq2_q: "Quanti passi servono per un minuto?", faq2_a: "Di default, 200 passi equivalgono a 1 minuto di tempo di utilizzo. Con Premium imposti il tuo rapporto.",
      faq3_q: "I miei dati sulla salute sono al sicuro?", faq3_a: "Sì. I tuoi passi vengono letti sul dispositivo e non vengono mai venduti né usati per la pubblicità. Solo i nuovi passi vengono aggiunti, senza il tuo nome, al contatore comune su iCloud; la cronologia resta sul dispositivo.",
      faq_more: "Vedi tutte le domande →",
      final_t: "Pronto a tornare alla concentrazione camminando?", final_d: "Scarica Social Steps e trasforma il movimento in tempo di utilizzo.", final_btn: "Scarica su App Store",
      footer_tagline: "Guadagna tempo di utilizzo camminando.",
      footer_product: "Prodotto", footer_legal: "Note legali", footer_contact: "Contatti", footer_rights: "© 2026 Social Steps. Tutti i diritti riservati.", footer_made: "Fatto per la concentrazione.",
      badge_small: "Scarica su", badge_big: "App Store",
    },
    pt: {
      nav_how: "Como funciona", nav_features: "Recursos", nav_faq: "FAQ", nav_privacy: "Privacidade", nav_terms: "Termos",
      hero_badge: "Caminhe mais. Role menos.",
      hero_title: "Ganhe seu tempo de tela", hero_accent: "caminhando",
      hero_lead: "O Social Steps transforma seus passos diários em tempo de tela. Escolha os apps que te distraem, defina seu ritmo e deixe seus pés desbloquearem o celular.",
      cta_download: "Baixar na App Store", cta_how: "Veja como funciona",
      rating_text: "Adorado na App Store",
      trust_privacy: "Privacidade em primeiro", trust_noads: "Sem anúncios", trust_notracking: "Sem rastreamento",
      fc1_title: "+38 min", fc1_sub: "ganhos hoje", fc2_title: "Bloqueio auto", fc2_sub: "mantenha o foco",
      stat1: "passos = 1 minuto", stat2: "anúncios ou rastreadores", stat3: "contas necessárias", stat4: "idiomas",
      how_eyebrow: "Como funciona", how_title: "Três passos simples", how_sub: "Sem força de vontade — só movimento.",
      step1_t: "Caminhe", step1_d: "O Social Steps lê seus passos do Apple Saúde. Cada passo conta para o tempo de tela de hoje.",
      step2_t: "Ganhe", step2_d: "Seus passos viram minutos. Comece com 200 passos por minuto — com o Premium você define sua própria taxa.",
      step3_t: "Desbloqueie", step3_d: "Escolha os apps a limitar. Eles ficam bloqueados até você ganhar tempo suficiente se movendo.",
      feat_eyebrow: "Recursos", feat_title: "Tudo para manter o foco", feat_sub: "Feito em torno da sua privacidade, para te manter em movimento.",
      feat1_t: "Bloqueio automático de apps", feat1_d: "Os apps escolhidos ficam bloqueados até você ganhar tempo suficiente — silenciosamente, em segundo plano.",
      feat2_t: "Privacidade por padrão", feat2_d: "Sem contas, sem anúncios, sem rastreamento. Sua seleção de apps e seu histórico de passos ficam no dispositivo; só os passos novos entram, sem o seu nome, no contador coletivo no iCloud.",
      feat3_t: "Histórico diário", feat3_d: "Veja o tempo ganho e usado por dia, exato com seus totais reais de passos.",
      feat4_t: "Seu próprio ritmo", feat4_d: "Comece com 200 passos por minuto, ou defina uma taxa personalizada com o Premium.",
      feat5_t: "Com o Apple Saúde", feat5_d: "Lê seus passos do Apple Saúde e usa o Tempo de Uso da Apple — sem hardware extra.",
      feat6_t: "Fala seu idioma", feat6_d: "Disponível em inglês, holandês, alemão, francês, espanhol, italiano e português.",
      sc1_tag: "Mantenha o foco", sc1_t: "Apps que distraem, bloqueados automaticamente", sc1_d: "Sem depender de força de vontade. Os apps escolhidos ficam bloqueados até seus passos os desbloquearem — silenciosamente, em segundo plano.",
      sc1_li1: "Bloqueie qualquer app ou categoria", sc1_li2: "Funciona em segundo plano", sc1_li3: "Sua seleção é privada",
      sc2_tag: "Acompanhe seu progresso", sc2_t: "Cada dia num relance", sc2_d: "Um histórico claro mostra o tempo ganho e usado por dia, sempre exato com seus totais reais de passos.",
      sc2_li1: "Ganho vs. usado por dia", sc2_li2: "Exato com seus passos reais", sc2_li3: "Visão simples e elegante",
      premium_t: "Social Steps Premium", premium_d: "Deixe do seu jeito. Defina sua própria taxa de conversão e adicione minutos bônus quando precisar — cobrado mensal ou anualmente na sua moeda.",
      premium_p1: "Taxa personalizada", premium_p2: "Minutos bônus", premium_p3: "Cancele quando quiser", premium_cta: "Obter o Social Steps",
      faq_eyebrow: "FAQ", faq_title: "Perguntas frequentes",
      faq1_q: "Como o Social Steps funciona?", faq1_a: "Ele lê seus passos diários do Apple Saúde e os converte em minutos de tempo de tela. Os apps escolhidos ficam bloqueados até você ganhar tempo suficiente caminhando.",
      faq2_q: "Quantos passos preciso para um minuto?", faq2_a: "Por padrão, 200 passos equivalem a 1 minuto de tempo de tela. Com o Premium você define sua própria taxa.",
      faq3_q: "Meus dados de saúde estão seguros?", faq3_a: "Sim. Seus passos são lidos no dispositivo e nunca são vendidos nem usados para anúncios. Só os passos novos entram, sem o seu nome, no contador coletivo no iCloud; seu histórico fica no dispositivo.",
      faq_more: "Ver todas as perguntas →",
      final_t: "Pronto para voltar ao foco caminhando?", final_d: "Baixe o Social Steps e transforme movimento em tempo de tela.", final_btn: "Baixar na App Store",
      footer_tagline: "Ganhe seu tempo de tela caminhando.",
      footer_product: "Produto", footer_legal: "Jurídico", footer_contact: "Contato", footer_rights: "© 2026 Social Steps. Todos os direitos reservados.", footer_made: "Feito para o foco.",
      badge_small: "Baixar na", badge_big: "App Store",
    },
  };

  // localStorage gooit een fout als de browser site-opslag blokkeert (bv. "alle cookies
  // blokkeren"). Zonder deze vangnetten stopte het script en bleef de homepage leeg.
  function loadLang() {
    try { return localStorage.getItem("ss_lang"); } catch (e) { return null; }
  }
  function saveLang(code) {
    try { localStorage.setItem("ss_lang", code); } catch (e) { /* opslag geblokkeerd: niet onthouden */ }
  }

  function pickLang() {
    const saved = loadLang();
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
    // App Store badges
    const svg = badgeSVG(dict.badge_small || "Download on the", dict.badge_big || "App Store");
    document.querySelectorAll(".appstore-badge").forEach(function (el) { el.innerHTML = svg; });

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
        saveLang(code);
        apply(code);
        menu.classList.remove("open");
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    // make sure every App Store link points to the right place
    document.querySelectorAll("[data-appstore]").forEach(function (el) {
      if (el.tagName === "A") el.setAttribute("href", APP_STORE_URL);
    });

    buildLangMenu();
    apply(pickLang());

    // language dropdown toggle
    const langBtn = document.querySelector(".lang-btn");
    const langMenu = document.querySelector(".lang-menu");
    if (langBtn && langMenu) {
      langBtn.addEventListener("click", function (e) { e.stopPropagation(); langMenu.classList.toggle("open"); });
      document.addEventListener("click", function () { langMenu.classList.remove("open"); });
    }

    // mobile menu toggle
    const navToggle = document.querySelector(".nav-toggle");
    const mobileMenu = document.getElementById("mobileMenu");
    if (navToggle && mobileMenu) {
      navToggle.addEventListener("click", function () {
        const open = mobileMenu.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      mobileMenu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobileMenu.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    // header shadow + scroll progress
    const header = document.querySelector(".site-header");
    const progress = document.getElementById("scrollProgress");
    const onScroll = function () {
      if (header) header.classList.toggle("scrolled", window.scrollY > 8);
      if (progress) {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + "%";
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // FAQ accordion
    document.querySelectorAll(".faq-item button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const item = btn.closest(".faq-item");
        const ans = item.querySelector(".ans");
        const open = item.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        ans.style.maxHeight = open ? ans.scrollHeight + "px" : "0";
      });
    });

    // reveal on scroll (progressive enhancement)
    const revealEls = document.querySelectorAll(".reveal");
    function revealAll() { revealEls.forEach(function (el) { el.classList.add("in"); }); }
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold: 0.08, rootMargin: "0px 0px -5% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
      // Safety net: if the observer never fires (e.g. inside a zero-size preview
      // iframe), reveal everything so the page is never left blank.
      setTimeout(function () { if (!document.querySelector(".reveal.in")) revealAll(); }, 1000);
    } else {
      revealAll();
    }
  });
})();
