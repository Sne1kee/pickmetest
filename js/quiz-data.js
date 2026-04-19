/**
 * PICKME_QUIZ — fast 10-question gamer “pick me” vibe check (EN/UK).
 *
 * SCORING: sum of pickMePoints per chosen answer (hidden until score details).
 * maxScore = sum of each question’s highest pickMePoints (computed in app.js).
 * Questions can have 3–5 answers; point values may repeat if you want (e.g. joke options).
 */
(function (global) {
  global.PICKME_QUIZ = {
    meta: {
      title: {
        en: "E-girls pick-me check",
        uk: "E-girl pick-me тест",
      },
    },
    strings: {
      en: {
        tagline: "<3",
        footer: "Don't get upset with the results, some people could be like that.",
        next: "Next",
        back: "Back",
        seeResults: "Results",
        restart: "Again",
        progressOf: "{k} / {n}",
        scoreDetails: "Score",
        scoreLine: "{x} / {y}",
      },
      uk: {
        tagline: "<3",
        footer: "Не засмучуйся результатами, приймай себе такою якою ти є.",
        next: "Далі",
        back: "Назад",
        seeResults: "Результат",
        restart: "Ще раз",
        progressOf: "{k} / {n}",
        scoreDetails: "Рахунок",
        scoreLine: "{x} / {y}",
      },
    },
    questions: [
      {
        id: "pink",
        text: {
          en: "How many pink items do you own in games?",
          uk: "Скільки рожевих айтемів у тебе в іграх?",
        },
        answers: [
          { text: { en: "None", uk: "Жодного" }, pickMePoints: 0 },
          { text: { en: "A few things", uk: "Трохи" }, pickMePoints: 3 },
          { text: { en: "A lot", uk: "Багато" }, pickMePoints: 7 },
          { text: { en: "Almost all of my items are pink", uk: "Майже все рожеве" }, pickMePoints: 12 },
        ],
      },
      {
        id: "chatfaces",
        text: {
          en: "Do you use any of this in chat: <3, ^^?",
          uk: "Чи пишеш у чаті щось на кшталт: <3, ^^?",
        },
        answers: [
          { text: { en: "Yes <3", uk: "Так <3" }, pickMePoints: 12 },
          { text: { en: "No", uk: "Ні" }, pickMePoints: 0 },
          { text: { en: "Sometimes", uk: "Іноді" }, pickMePoints: 6 },
        ],
      },
      {
        id: "discord",
        text: {
          en: "If a boy asks for your Discord in game, do you give it to him?",
          uk: "Якщо хлопець просить твій Discord у грі — ти даси?",
        },
        answers: [
          { text: { en: "Yes", uk: "Так" }, pickMePoints: 12 },
          { text: { en: "Never", uk: "Ніколи" }, pickMePoints: 0 },
          { text: { en: "It depends if I liked him", uk: "Залежить, чи він мені сподобався" }, pickMePoints: 10 },
        ],
      },
      {
        id: "clutch",
        text: {
          en: "Do you enjoy when boys compliment you on your clutches?",
          uk: "Чи подобається тобі, коли хлопці хвалять твої клатчі?",
        },
        answers: [
          { text: { en: "Yes", uk: "Так" }, pickMePoints: 12 },
          { text: { en: "Of course, who would not?", uk: "Звісно, кому б не сподобалося?" }, pickMePoints: 9 },
          { text: { en: "Nah", uk: "Неа" }, pickMePoints: 3 },
          { text: { en: "No", uk: "Ні" }, pickMePoints: 0 },
        ],
      },
      {
        id: "topfrag",
        text: {
          en: "Another girl on your team top-frags the match. Closest reaction?",
          uk: "Інша дівчина в команді топфрагить матч. Твоя реакція?",
        },
        answers: [
          { text: { en: "Act unimpressed", uk: "Вдаю байдужість" }, pickMePoints: 12 },
          { text: { en: "WP — props in chat", uk: "WP — респект у чаті" }, pickMePoints: 0 },
          { text: { en: "Stay quiet, it’s whatever", uk: "Мовчу" }, pickMePoints: 2 },
          { text: { en: "She got lucky/enemies threw", uk: "Пощастило/вороги нафідили її" }, pickMePoints: 8 },
        ],
      },
      {
        id: "duo",
        text: {
          en: "Your duo adds a random boy and suddenly you’re third wheel in comms. You…",
          uk: "Дуо додає рандомного хлопця — ти третя у войсі. Ти…",
        },
        answers: [
          { text: { en: "Talk louder, try to joke more", uk: "Говорю голосніше, спробую жартувати більше" }, pickMePoints: 9 },
          { text: { en: "Play normal; Nothing really changes", uk: "Граю як завжди, нічого не змінилось" }, pickMePoints: 0 },
          { text: { en: "A bit uncomfortable but I keep playing", uk: "Трохи незручно, але граю далі" }, pickMePoints: 3 },
          { text: { en: "Hint I’m not comfortable with random people in our duo", uk: "Натякаю, що мені не комфортно з рандомними людьми в нашому дуо" }, pickMePoints: 12 },
        ],
      },
      {
        id: "skins",
        text: {
          en: "Which type of skins do you prefer in game?",
          uk: "Який тип скінів тобі більше заходить у іграх?",
        },
        answers: [
          { text: { en: "Futuristic / modern style", uk: "Футуристичний / сучасний стиль" }, pickMePoints: 0 },
          { text: { en: "Nature / cute style", uk: "Природа / милий стиль" }, pickMePoints: 12 },
          { text: { en: "Steampunk style", uk: "Стімпанк" }, pickMePoints: 0 },
          { text: { en: "Asian-ethno style (Kuronami)", uk: "Азійський-етно стиль (Kuronami)" }, pickMePoints: 9 },
        ],
      },
      {
        id: "lobby",
        text: {
          en: "Someone types “girls can’t aim” in lobby. You…",
          uk: "У лобі пишуть «дівчата не вміють аімити». Ти…",
        },
        answers: [
          { text: { en: "Report + mute don’t feed the troll", uk: "Репорт + мʼют не годую троля" }, pickMePoints: 0 },
          { text: { en: "One calm fact and friсk them", uk: "Один спокійний факт, і пішли вони" }, pickMePoints: 5 },
          { text: { en: "Pop off to prove MY aim", uk: "Включаюся, щоб довести СВІЙ аім" }, pickMePoints: 12 },
        ],
      },
      {
        id: "status",
        text: {
          en: "Which status/bio line fits you best (even ironically)?",
          uk: "Який статус/біо личить тобі найбільше (навіть іронічно)?",
        },
        answers: [
          { text: { en: "Rank or other random suff, that’s it", uk: "Ранг або всілякі рандомні штучки, і все" }, pickMePoints: 0 },
          { text: { en: "Funny one-liner", uk: "Жартівлива теза" }, pickMePoints: 2 },
          { text: { en: "“Chill girl who carries sometimes”", uk: "«Чілова дівчина, інколи кєрить гру»" }, pickMePoints: 8 },
          { text: { en: "“Not like other egirls”", uk: "«Не така як інші e-girlи»" }, pickMePoints: 12 },
        ],
      },
      {
        id: "notlikethat",
        text: {
          en: 'Do you say "I am not like that" even in a joke context?',
          uk: 'Чи кажеш ти «я не така» навіть жартома?',
        },
        answers: [
          { text: { en: "Yes", uk: "Так" }, pickMePoints: 12 },
          { text: { en: "No, I am not like that", uk: "Ні, я не така" }, pickMePoints: 12 },
          { text: { en: "No", uk: "Ні" }, pickMePoints: 0 },
        ],
      },
    ],
    resultBands: [
      {
        min: 0,
        max: 24,
        title: { en: "Touch grass queue", uk: "Черга на сонце" },
        body: {
          en: "Low-key answers. You’re probably here for the W, not the storyline.",
          uk: "Спокійні відповіді. Скоріше ти тут за віном, не за сюжетом.",
        },
      },
      {
        min: 25,
        max: 49,
        title: { en: "Casual cutie", uk: "Няшна кюті" },
        body: {
          en: "A sprinkle of cutie energy—harmless especially if you laugh at yourself too.",
          uk: "Трохи енергії «кюті» — норм, якщо ще й над собою смієшся топ.",
        },
      },
      {
        min: 50,
        max: 74,
        title: { en: "Ranked pick-me arc", uk: "Ранкед pick-me" },
        body: {
          en: "Several picks skew toward approval + contrast. Competitivly strong pick-me.",
          uk: "Кілька відповідей тягнуть на схвалення + контраст. Пікмі змагального рівня",
        },
      },
      {
        min: 75,
        max: 99,
        title: { en: "Full send e-drama", uk: "Фулл сенд е-драма" },
        body: {
          en: "High tally. If it’s a clip farm, it's ok; if not, maybe mute VC.(joke)",
          uk: "Високий рахунок. Якщо образ — ок; якщо ні вимкни войс.(жарт)",
        },
      },
      {
        min: 100,
        max: 120,
        title: { en: "Legendary lore drop", uk: "Легендарний пікмі лор" },
        body: {
          en: "Max chaos score. You’re either iconic or need and a solo queue break.",
          uk: "Максимум пікмі хаосу. Ти або ікона, або треба зробити перерву в соло-кю.",
        },
      },
    ],
  };
})(window);
