const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;
const VLADIVOSTOK_OFFSET_MS = 10 * HOUR_MS;
const QUEST_OPEN_HOUR = 7;
const STORAGE_KEY = "duckQuestProgress:v1";
const AUTH_KEY = "duckQuestAuth:v1";
const TEST_AUTH_KEY = "duckQuestTestAuth:v1";
const EDITOR_AUTH_KEY = "duckQuestEditorAuth:v1";
const CONTENT_KEY = "duckQuestContent:v1";
const DUCK_BANK_KEY = "duckQuestBank:v1";
const SUPABASE_URL = "https://seggytyatffeuxcmqlof.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Jc9BGLiWgYdF99Qa-i0_jA_nXStNkMb";
const SUPABASE_CONTENT_TABLE = "duck_quest_content";
const SUPABASE_CONTENT_ID = "main";
const queryParams = new URLSearchParams(window.location.search);
const IS_LOCAL_DEV =
  window.location.protocol === "file:" ||
  ["localhost", "127.0.0.1", ""].includes(window.location.hostname);
const IS_EDITOR_MODE = sessionStorage.getItem(EDITOR_AUTH_KEY) === "true";
const IS_TEST_MODE =
  IS_EDITOR_MODE ||
  (IS_LOCAL_DEV && (queryParams.has("fast") || sessionStorage.getItem(TEST_AUTH_KEY) === "true"));
const DUCK_SRC = "duck-sticker.png?v=party1";
const supabaseClient =
  SUPABASE_URL && SUPABASE_ANON_KEY && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;
const AUTH_LOGIN = "kisik10_06_26";
const AUTH_PASSWORD_HASH = "62262f9573b15be63a825d2d6213f9e87e17369f1fab97810aee4834ff1dae25";
const TEST_LOGIN = "guest";
const TEST_PASSWORD_HASH = "9af15b336e6a9619928537df30b2e6a2376569fcf9d7e773eccede65606529a0";
const EDITOR_LOGIN = "lianna4353";
const EDITOR_PASSWORD_HASH = "39af45603772378a1109366921d9e5af203658fbb150071294d8bf0f82ab8976";
if (queryParams.has("logout")) {
  sessionStorage.removeItem(AUTH_KEY);
  sessionStorage.removeItem(TEST_AUTH_KEY);
  sessionStorage.removeItem(EDITOR_AUTH_KEY);
}

const personalConfig = {
  birthdayPerson: "именинник",
  yourName: "я",
  images: {
    him: "photos/him.jpg",
    me: "photos/me.jpg",
    styledHim: "photos/styled-him.jpg"
  }
};

const gameConfig = {
  site: {
    authEyebrow: "Birthday Access",
    authTitle: "С днём рождения!",
    authLead: "Скорее заходи играть",
    heroBadge: "Режим работы с 07:00 до 00:00",
    heroEyebrow: "Birthday Duck Quest",
    heroTitle: "По мотивам игры «Утиные истории 2025»",
    heroLead:
      "Проходи задания по одному в день. После каждого интерактива открывается артефакт, а следующая миссия станет доступна на следующий день с 07:00 по Владивостоку.",
    progressLabel: "Прогресс дня",
    tasksEyebrow: "Маршрут",
    tasksTitle: "Задания на день",
    galleryEyebrow: "Галерея",
    galleryTitle: "Карточки-артефакты",
    finalButton: "Финальный подарок",
    taskDialogLabel: "Интерактив",
    taskCompleteButton: "Проверить код",
    taskCodeLabel: "Кодовое слово",
    taskCodePlaceholder: "Введи код",
    taskCodeHelp: "После правильного кода откроется артефакт.",
    artifactSaveButton: "Сохранить PNG",
    artifactCloseButton: "В галерею",
    finaleEyebrow: "5/5 артефактов",
    finaleTitle: "Финальный подарок открыт",
    finaleLead:
      "Утиная комиссия подтверждает: именинник прошел дневной квест, собрал все поздравления и заслужил главный сюрприз.",
    finaleHintLabel: "Финальная подсказка"
  },
  giftLocation:
    "За сбор всех артефактов награждаетесь сладким призом. Торт будет ждать отдельно.",
  finalMessage:
    "С днем рождения. Ты собрал все артефакты, прошел утиные истории дня и заслужил главный сладкий приз. А еще я очень тебя люблю.",
  tasks: [
    {
      id: "morning",
      title: "Угадай слово",
      teaser: "Первый артефакт спрятан в пропущенном слове.",
      statement: "Утка спрятала первый артефакт в пропущенном слове.",
      challenge: "ЭЭЭЭЭЙ, _______! У кого сегодня день рождения?",
      unlock: {
        type: "word",
        title: "Угадай слово",
        prompt: "ЭЭЭЭЭЙ, _______! У кого сегодня день рождения?",
        hint: "Необходимо указать пропущенное слово.",
        code: "кисик",
        success: "Верно. Первый артефакт открыт.",
        error: "Почти. Введи то самое ласковое слово."
      },
      artifact: {
        type: "kitten",
        label: "Kisik Card",
        title: "С днём рождения, кисик!",
        subtitle: "Первый праздничный артефакт",
        message: "Маленький котенок уже держит торт и официально подтверждает: сегодня день рождения самого любимого кисика.",
        accent: "#ffd84d",
        image: "assets/artifacts/kisik-card.jpg"
      }
    },
    {
      id: "food",
      title: "Выиграй партию шахмат",
      teaser: "Стратегический ход открывает коллекционный приз.",
      statement: "Игровая утка выдала квест только избранному персонажу.",
      challenge: "Выиграй партию белыми против утино-шахматного бота.",
      unlock: {
        type: "chess",
        title: "Выиграй партию шахмат",
        prompt: "Сыграй белыми против утино-шахматного бота. Победа засчитывается автоматически, без кодового слова.",
        hint: "Выбери белую фигуру и сделай ход. Если проиграешь, партия начнется заново.",
        code: "",
        success: "Партия засчитана. Коллекционный артефакт открыт.",
        error: "Партия еще не выиграна."
      },
      artifact: {
        type: "full-image",
        label: "Forbes Cover",
        title: "Обложка Forbes",
        subtitle: "Special collector issue",
        message: "Ура! Я даже не сомневалась, забирай артефакт дня - свою обложку из журнала для ТОП-1!",
        accent: "#55e6ff",
        image: "assets/artifacts/forbes-cover.png",
        imageLabel: "Forbes cover"
      }
    },
    {
      id: "meme",
      title: "Полей елку",
      teaser: "Елка растет вместе с возрастом.",
      statement: "Праздничная елка хочет дорасти до 28 лет.",
      challenge: "Полей елку на платформе и введи возраст, до которого она должна вырасти.",
      unlock: {
        type: "tree",
        title: "Полей елку",
        prompt: "Полей елку 28 раз, чтобы она выросла до итогового размера и открыла артефакт.",
        hint: "Каждый полив приближает елку к 28 годам. Для теста можно ввести код: 28.",
        code: "28",
        success: "Елка выросла до 28. Письмо-артефакт открыто.",
        error: "Елке нужно дорасти ровно до возраста именинника."
      },
      artifact: {
        type: "duck",
        label: "Love Letter",
        title: "Письмо, которое можно перечитать",
        subtitle: "Открывается после праздничного роста",
        message: "Пусть у тебя растет все хорошее: силы, мечты, удача и количество поводов улыбаться.",
        accent: "#b88cff"
      }
    },
    {
      id: "game",
      title: "Ответь на вопрос",
      teaser: "След ведет к любимой еде.",
      statement: "Еда призналась: она отвлекала, но только ради праздничного настроения.",
      challenge: "Ответь, какое блюдо сделало бы этот день идеальным.",
      unlock: {
        type: "question",
        title: "Ответь на вопрос",
        prompt: "Напиши свое любимое блюдо. Ответ сохранится как обещание вкусного момента.",
        hint: "Для теста подойдет код: вкусно.",
        code: "вкусно",
        success: "Вкусная улика принята. Сертификат открыт.",
        error: "Еда не расслышала. Попробуй код из подсказки."
      },
      artifact: {
        type: "duck",
        label: "Taste Pass",
        title: "Сертификат на вкусный момент",
        subtitle: "Погасить при первом удобном аппетите",
        message: "Ты заслужил что-то вкусное просто потому, что ты есть.",
        accent: "#ff8b36"
      }
    },
    {
      id: "final",
      title: "Печенька с предсказанием",
      teaser: "Финальная печенька знает, что все будет, но не сразу.",
      statement: "Последний артефакт открывается только тем, кто дошел до конца дня.",
      challenge: "Разломи печеньку с предсказанием и введи финальный код.",
      unlock: {
        type: "cookie",
        title: "Печенька с предсказанием",
        prompt: "Кликни по 3D-печеньке, чтобы разломить ее и достать предсказание на новый год жизни.",
        hint: "Печенька засчитает задание после клика. Для теста можно ввести код: coming soon.",
        code: "coming soon",
        success: "Финальное предсказание принято. Последний артефакт открыт.",
        error: "Печенька шепчет: попробуй фразу из подсказки."
      },
      artifact: {
        type: "final",
        label: "Coming Soon",
        title: "Коробка с секретом",
        subtitle: "14.06.2026",
        message: "Все будет, но не сразу. А за сбор всех артефактов награждаетесь сладким призом.",
        accent: "#7cffb2"
      }
    }
  ]
};

const state = {
  activeTask: null,
  activeArtifact: null,
  completed: [],
  bankCoins: 0,
  treeWaterCount: 0,
  chess: null
};

const authScreen = document.querySelector("#auth-screen");
const authForm = document.querySelector("#auth-form");
const authError = document.querySelector("#auth-error");
const questApp = document.querySelector("#quest-app");
const editorPanel = document.querySelector("#editor-panel");
const editorFields = document.querySelector("#editor-fields");
const editorStatus = document.querySelector("#editor-status");
const publishLocalContentButton = document.querySelector("#publish-local-content");
const taskGrid = document.querySelector("#task-grid");
const artifactGallery = document.querySelector("#artifact-gallery");
const duckCount = document.querySelector("#duck-count");
const taskCount = document.querySelector("#task-count");
const progressFill = document.querySelector("#progress-fill");
const nextUnlock = document.querySelector("#next-unlock");
const solveButton = document.querySelector("#solve-button");
const taskDialog = document.querySelector("#task-dialog");
const artifactDialog = document.querySelector("#artifact-dialog");
const artifactPreview = document.querySelector("#artifact-card-preview");
const finale = document.querySelector("#finale");
const taskUnlockForm = document.querySelector("#task-unlock-form");
const unlockGame = document.querySelector("#unlock-game");
const taskCodeInput = document.querySelector("#task-code-input");
const taskCodeHelp = document.querySelector("#task-code-help");
const taskCodeFeedback = document.querySelector("#task-code-feedback");
const duckBankCount = document.querySelector("#duck-bank-count");
const duckClicker = document.querySelector("#duck-clicker");
const duckClickPop = document.querySelector("#duck-click-pop");

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const defaultGameConfig = clone(gameConfig);
const ACTIVE_TASK_IDS = new Set(["morning", "food", "meme", "game", "final"]);
let saveContentTimer = null;
let lastRemoteContent = "";

function mergeDeep(target, source) {
  Object.entries(source || {}).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      target[key] = value;
      return;
    }
    if (value && typeof value === "object") {
      target[key] = mergeDeep(target[key] || {}, value);
      return;
    }
    target[key] = value;
  });
  return target;
}

function getByPath(path) {
  return path.split(".").reduce((current, key) => current?.[key], gameConfig);
}

function setByPath(path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  const target = keys.reduce((current, key) => current[key], gameConfig);
  target[last] = value;
}

function contentSnapshot() {
  return {
    site: gameConfig.site,
    giftLocation: gameConfig.giftLocation,
    finalMessage: gameConfig.finalMessage,
    tasks: gameConfig.tasks
  };
}

function applyContentOverrides(saved) {
  if (!saved || typeof saved !== "object") return false;
    if (saved.site?.heroTitle === "10 уточек до подарка") {
      saved.site.heroTitle = gameConfig.site.heroTitle;
    }
    if (saved.site?.heroBadge === "1 задание в час") {
      saved.site.heroBadge = gameConfig.site.heroBadge;
    }
    if (
      saved.site?.heroLead ===
        "Проходи задания в течение дня. После каждого интерактива открывается артефакт, а следующая миссия станет доступна через час." ||
      saved.site?.heroLead ===
        "Проходи задания в течение дня. После каждого задания открывается поздравительная карточка-артефакт, а следующая миссия станет доступна через час."
    ) {
      saved.site.heroLead = gameConfig.site.heroLead;
    }
    if (saved.site?.authTitle === "Вход в Duck Quest") {
      saved.site.authTitle = gameConfig.site.authTitle;
    }
    if (
      saved.site?.authLead ===
      "Эта платформа открывается только главному имениннику. Введи личный логин и пароль, чтобы начать дневной квест."
    ) {
      saved.site.authLead = gameConfig.site.authLead;
    }
    if (Array.isArray(saved.tasks)) {
      const savedTasksById = new Map(saved.tasks.filter((task) => task?.id).map((task) => [task.id, task]));
      saved.tasks = gameConfig.tasks.map((task) => mergeDeep(clone(task), savedTasksById.get(task.id) || {}));
    }
    mergeDeep(gameConfig, saved);
    normalizeInteractiveConfig();
  return true;
}

function loadLocalContentOverrides() {
  try {
    const raw = localStorage.getItem(CONTENT_KEY);
    if (!raw) return false;
    const saved = JSON.parse(raw);
    return applyContentOverrides(saved);
  } catch {
    localStorage.removeItem(CONTENT_KEY);
    return false;
  }
}

async function loadRemoteContentOverrides() {
  if (!supabaseClient) return false;
  const { data, error } = await supabaseClient
    .from(SUPABASE_CONTENT_TABLE)
    .select("content")
    .eq("id", SUPABASE_CONTENT_ID)
    .maybeSingle();
  if (error || !data?.content) return false;
  lastRemoteContent = JSON.stringify(data.content);
  localStorage.setItem(CONTENT_KEY, lastRemoteContent);
  return applyContentOverrides(data.content);
}

function normalizeInteractiveConfig() {
  gameConfig.tasks = gameConfig.tasks.filter((task) => ACTIVE_TASK_IDS.has(task.id));
  const morningTask = gameConfig.tasks.find((task) => task.id === "morning");
  if (morningTask) {
    morningTask.unlock = {
      ...(morningTask.unlock || {}),
      type: "word",
      code: "кисик",
      title: morningTask.unlock?.title || "Угадай слово",
      prompt: morningTask.unlock?.prompt || morningTask.challenge || "ЭЭЭЭЭЙ, _______! У кого сегодня день рождения?",
      hint: morningTask.unlock?.hint || "Необходимо указать пропущенное слово.",
      success: morningTask.unlock?.success || "Верно. Первый артефакт открыт.",
      error: morningTask.unlock?.error || "Почти. Введи то самое ласковое слово."
    };
    morningTask.artifact = {
      ...(morningTask.artifact || {}),
      type: "kitten",
      label: morningTask.artifact?.label || "Kisik Card",
      title: morningTask.artifact?.title || "С днём рождения, кисик!",
      subtitle: morningTask.artifact?.subtitle || "Первый праздничный артефакт",
      message:
        morningTask.artifact?.message ||
        "Маленький котенок уже держит торт и официально подтверждает: сегодня день рождения самого любимого кисика.",
      accent: morningTask.artifact?.accent || "#ffd84d",
      image: "assets/artifacts/kisik-card.jpg"
    };
  }
  const chessTask = gameConfig.tasks.find((task) => task.id === "game");
  const secondTask = gameConfig.tasks.find((task) => task.id === "food");
  if (secondTask) {
    Object.assign(secondTask, {
      title: "Выиграй партию шахмат",
      teaser: "Стратегический ход открывает коллекционный приз.",
      statement: "Игровая утка выдала квест только избранному персонажу.",
      challenge: "Выиграй партию белыми против утино-шахматного бота."
    });
    secondTask.unlock = {
      ...(secondTask.unlock || {}),
      type: "chess",
      title: "Выиграй партию шахмат",
      prompt: "Сыграй белыми против утино-шахматного бота. Победа засчитывается автоматически, без кодового слова.",
      hint: "Выбери белую фигуру и сделай ход. Если проиграешь, партия начнется заново.",
      code: "",
      success: secondTask.unlock?.success || "Партия засчитана. Коллекционный артефакт открыт.",
      error: secondTask.unlock?.error || "Партия еще не выиграна."
    };
    secondTask.artifact = {
      ...(secondTask.artifact || {}),
      type: "full-image",
      label: "Forbes Cover",
      title: "Обложка Forbes",
      subtitle: "Special collector issue",
      message: "Ура! Я даже не сомневалась, забирай артефакт дня - свою обложку из журнала для ТОП-1!",
      accent: "#55e6ff",
      image: "assets/artifacts/forbes-cover.png",
      imageLabel: "Forbes cover"
    };
  }
  if (chessTask) {
    Object.assign(chessTask, {
      title: "Ответь на вопрос",
      teaser: "След ведет к любимой еде.",
      statement: "Еда призналась: она отвлекала, но только ради праздничного настроения.",
      challenge: "Ответь, какое блюдо сделало бы этот день идеальным."
    });
    chessTask.unlock = {
      ...(chessTask.unlock || {}),
      type: "question",
      title: "Ответь на вопрос",
      prompt: "Напиши свое любимое блюдо. Ответ сохранится как обещание вкусного момента.",
      hint: "Для теста подойдет код: вкусно.",
      code: "вкусно",
      success: chessTask.unlock?.success || "Вкусная улика принята. Сертификат открыт.",
      error: chessTask.unlock?.error || "Еда не расслышала. Попробуй код из подсказки."
    };
    chessTask.artifact = {
      ...(chessTask.artifact || {}),
      type: "duck",
      label: chessTask.artifact?.label || "Taste Pass",
      title: chessTask.artifact?.title || "Сертификат на вкусный момент",
      subtitle: chessTask.artifact?.subtitle || "Погасить при первом удобном аппетите",
      message: chessTask.artifact?.message || "Ты заслужил что-то вкусное просто потому, что ты есть.",
      accent: chessTask.artifact?.accent || "#ff8b36"
    };
  }
  const tarotTask = gameConfig.tasks.find((task) => task.id === "compliment");
  if (tarotTask) {
    tarotTask.unlock = {
      ...(tarotTask.unlock || {}),
      type: "stars",
      title: "Место и время рождения",
      prompt: "Введи место рождения и любое время, чтобы открыть личную ТАРО-карту года.",
      hint: "Место рождения: Владивосток или г. Владивосток. Время можно указать любое.",
      code: "",
      success: "Карта ТАРО открыта. Артефакт сохранен в галерее.",
      error: "Карта просит Владивосток и любое время рождения."
    };
    tarotTask.artifact = {
      ...(tarotTask.artifact || {}),
      type: "tarot",
      label: "TAROT 2026",
      title: "Карта года: Рыжий кот в галстуке",
      subtitle: "Личный карьерный талисман",
      message: "Тебя ждет удача во всех карьерных делах и большой успех в новом году, главное слушай свое сердце!",
      accent: "#ffb347"
    };
  }
}

async function saveContentOverrides() {
  const content = contentSnapshot();
  const serialized = JSON.stringify(content);
  localStorage.setItem(CONTENT_KEY, serialized);
  if (supabaseClient) {
    const { error } = await supabaseClient.from(SUPABASE_CONTENT_TABLE).upsert({
      id: SUPABASE_CONTENT_ID,
      content,
      updated_at: new Date().toISOString()
    });
    if (error) {
      editorStatus.textContent = "Сохранено локально, Supabase не ответил";
      return;
    }
    lastRemoteContent = serialized;
    editorStatus.textContent = "Автосохранено онлайн";
    return;
  }
  editorStatus.textContent = "Автосохранено локально";
}

async function publishLocalContentOnline() {
  if (!supabaseClient) {
    editorStatus.textContent = "Supabase не подключен";
    return;
  }
  editorStatus.textContent = "Публикую локальные правки онлайн...";
  await saveContentOverrides();
}

function scheduleContentSave() {
  if (saveContentTimer) window.clearTimeout(saveContentTimer);
  editorStatus.textContent = supabaseClient ? "Сохраняю онлайн..." : "Сохраняю локально...";
  saveContentTimer = window.setTimeout(saveContentOverrides, 600);
}

function refreshAfterContentEdit() {
  renderSiteText();
  renderTasks();
  renderGallery();
  renderProgress();
  if (state.activeTask) openTask(state.activeTask);
  if (state.activeArtifact) openArtifact(state.activeArtifact);
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element) element.textContent = value;
}

function renderSiteText() {
  const { site } = gameConfig;
  setText("#auth-eyebrow", site.authEyebrow);
  setText("#auth-title", site.authTitle);
  setText("#auth-lead", site.authLead);
  setText("#hero-badge", site.heroBadge);
  setText("#hero-eyebrow", site.heroEyebrow);
  setText("#hero-title", site.heroTitle);
  setText("#hero-lead", site.heroLead);
  setText("#progress-label", site.progressLabel);
  setText("#tasks-eyebrow", site.tasksEyebrow);
  setText("#tasks-title", site.tasksTitle);
  setText("#gallery-eyebrow", site.galleryEyebrow);
  setText("#gallery-title", site.galleryTitle);
  setText("#solve-button", site.finalButton);
  setText("#task-dialog-label", site.taskDialogLabel);
  if (!state.activeTask) {
    setText("#complete-task", site.taskCompleteButton);
    setText("#task-code-label", site.taskCodeLabel || "Кодовое слово");
    if (taskCodeInput) taskCodeInput.placeholder = site.taskCodePlaceholder || "Введи код";
    if (taskCodeHelp) taskCodeHelp.textContent = site.taskCodeHelp || "";
  }
  setText("#download-artifact", site.artifactSaveButton);
  setText("#close-artifact-secondary", site.artifactCloseButton);
  setText("#finale-eyebrow", site.finaleEyebrow);
  setText("#finale-title", site.finaleTitle);
  setText("#finale-lead", site.finaleLead);
  setText("#finale-hint-label", site.finaleHintLabel);
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function isAuthenticated() {
  return (
    sessionStorage.getItem(AUTH_KEY) === "true" ||
    sessionStorage.getItem(EDITOR_AUTH_KEY) === "true" ||
    (IS_LOCAL_DEV && queryParams.has("auth"))
  );
}

function showQuest() {
  authScreen.hidden = true;
  questApp.hidden = false;
}

function showAuth() {
  authScreen.hidden = false;
  questApp.hidden = true;
}

async function handleAuthSubmit(event) {
  event.preventDefault();
  const login = document.querySelector("#login-input").value.trim();
  const password = document.querySelector("#password-input").value;
  const passwordHash = await sha256(password);
  const mainMatch = login === AUTH_LOGIN && passwordHash === AUTH_PASSWORD_HASH;
  const testMatch = IS_LOCAL_DEV && login === TEST_LOGIN && passwordHash === TEST_PASSWORD_HASH;
  const editorMatch = login === EDITOR_LOGIN && passwordHash === EDITOR_PASSWORD_HASH;
  if (mainMatch || testMatch || editorMatch) {
    sessionStorage.setItem(AUTH_KEY, "true");
    if (editorMatch) {
      sessionStorage.setItem(EDITOR_AUTH_KEY, "true");
      sessionStorage.removeItem(TEST_AUTH_KEY);
      const editorUrl = new URL(window.location.href);
      editorUrl.searchParams.delete("logout");
      editorUrl.searchParams.delete("reset");
      window.location.replace(editorUrl.toString());
      return;
    }
    if (testMatch) {
      sessionStorage.setItem(TEST_AUTH_KEY, "true");
      sessionStorage.removeItem(EDITOR_AUTH_KEY);
      if (!queryParams.has("fast")) {
        const testUrl = new URL(window.location.href);
        testUrl.searchParams.delete("logout");
        testUrl.searchParams.set("fast", "1");
        window.location.replace(testUrl.toString());
        return;
      }
    } else {
      sessionStorage.removeItem(TEST_AUTH_KEY);
      sessionStorage.removeItem(EDITOR_AUTH_KEY);
    }
    authError.textContent = "";
    showQuest();
    return;
  }
  authError.textContent = "Логин или пароль не совпали. Попробуй еще раз.";
}

function loadProgress() {
  if (queryParams.has("reset")) {
    localStorage.removeItem(STORAGE_KEY);
  }
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
    const seen = new Set();
    state.completed = Array.isArray(saved.completed)
      ? saved.completed.filter((entry) => {
          if (!entry?.id || !ACTIVE_TASK_IDS.has(entry.id) || seen.has(entry.id)) return false;
          seen.add(entry.id);
          return true;
        })
      : [];
  } catch {
    state.completed = [];
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ completed: state.completed }));
}

function loadDuckBank() {
  if (queryParams.has("reset")) {
    localStorage.removeItem(DUCK_BANK_KEY);
  }
  const saved = Number(localStorage.getItem(DUCK_BANK_KEY) || 0);
  state.bankCoins = Number.isFinite(saved) ? Math.max(0, Math.floor(saved)) : 0;
}

function saveDuckBank() {
  localStorage.setItem(DUCK_BANK_KEY, String(state.bankCoins));
}

function completedIds() {
  return new Set(state.completed.map((entry) => entry.id));
}

function getCompletedEntry(taskId) {
  return state.completed.find((entry) => entry.id === taskId);
}

function nextTaskIndex() {
  return state.completed.length;
}

function lastCompletedAt() {
  const last = state.completed[state.completed.length - 1];
  return last ? last.completedAt : 0;
}

function vladivostokParts(timestamp = Date.now()) {
  const vladivostokDate = new Date(timestamp + VLADIVOSTOK_OFFSET_MS);
  return {
    year: vladivostokDate.getUTCFullYear(),
    month: vladivostokDate.getUTCMonth(),
    day: vladivostokDate.getUTCDate(),
    hour: vladivostokDate.getUTCHours(),
    minute: vladivostokDate.getUTCMinutes(),
    second: vladivostokDate.getUTCSeconds()
  };
}

function vladivostokDayStart(timestamp = Date.now()) {
  const parts = vladivostokParts(timestamp);
  return Date.UTC(parts.year, parts.month, parts.day) - VLADIVOSTOK_OFFSET_MS;
}

function questOpenAt(timestamp = Date.now()) {
  return vladivostokDayStart(timestamp) + QUEST_OPEN_HOUR * HOUR_MS;
}

function isQuestOpenNow(timestamp = Date.now()) {
  return timestamp >= questOpenAt(timestamp);
}

function nextQuestOpenAt(timestamp = Date.now()) {
  const openToday = questOpenAt(timestamp);
  return timestamp < openToday ? openToday : openToday + DAY_MS;
}

function timeUntilNext(now = Date.now()) {
  if (IS_TEST_MODE) return 0;
  if (state.completed.length >= gameConfig.tasks.length) return 0;
  if (state.completed.length === 0) {
    return isQuestOpenNow(now) ? 0 : Math.max(0, questOpenAt(now) - now);
  }
  const last = lastCompletedAt();
  const nextOpen = Math.max(nextQuestOpenAt(last), questOpenAt(now));
  return Math.max(0, nextOpen - now);
}

function formatDuration(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rest = minutes % 60;
    return `${hours} ч ${rest} мин`;
  }
  return `${minutes} мин ${String(seconds).padStart(2, "0")} сек`;
}

function taskStatus(index, task) {
  if (completedIds().has(task.id)) return "done";
  if (IS_TEST_MODE) return "available";
  const nextIndex = nextTaskIndex();
  if (index === nextIndex && timeUntilNext() === 0) return "available";
  return "locked";
}

function taskMeta(index, status) {
  if (status === "done") return IS_TEST_MODE ? "Открыть интерактив еще раз" : "Открыть карточку";
  if (status === "available") return "Можно пройти сейчас";
  if (index === nextTaskIndex()) return `Откроется с 07:00 по Владивостоку`;
  return "Откроется после предыдущих миссий";
}

function unlockTypeLabel(type) {
  const labels = {
    word: "Угадай слово",
    question: "Ответь на вопрос",
    tree: "Полей елку",
    chess: "Шахматы",
    cookie: "Печенька"
  };
  return labels[type] || "Интерактив";
}

function renderTasks() {
  taskGrid.innerHTML = gameConfig.tasks
    .map((task, index) => {
      const status = taskStatus(index, task);
      const label = status === "done" ? (IS_TEST_MODE ? "Пройдено" : "Карточка в галерее") : status === "available" ? "Открыто" : "Закрыто";
      if (status === "locked") {
        return `
          <button class="task-card locked secret-task" type="button" data-id="${task.id}" aria-label="Задание ${index + 1} пока закрыто">
            <div class="secret-task-inner">
              <img class="duck-sticker secret-task-duck" src="${DUCK_SRC}" alt="" />
              <span class="secret-lock" aria-hidden="true">&#128274;</span>
            </div>
            <span class="task-status">${label}</span>
          </button>
        `;
      }
      return `
        <button class="task-card ${status}" type="button" data-id="${task.id}">
          <div class="task-card-top">
            <span class="task-number">${status === "done" ? "✓" : index + 1}</span>
            <span class="task-status">${label}</span>
          </div>
          <h3>${task.title}</h3>
          <span class="task-kind">${unlockTypeLabel(task.unlock?.type)}</span>
          <p>${task.teaser}</p>
          <small>${taskMeta(index, status)}</small>
        </button>
      `;
    })
    .join("");
}

function renderGallery() {
  const ids = completedIds();
  artifactGallery.innerHTML = gameConfig.tasks
    .map((task, index) => {
      const unlocked = ids.has(task.id);
      return `
        <button class="artifact-tile ${unlocked ? "unlocked" : "locked"}" type="button" data-id="${task.id}" ${unlocked ? "" : "disabled"}>
          ${unlocked ? `<img class="duck-sticker" src="${DUCK_SRC}" alt="" />` : `<span>${index + 1}</span>`}
          <strong>${unlocked ? task.artifact.label : "Locked"}</strong>
        </button>
      `;
    })
    .join("");
}

function renderProgress() {
  const total = gameConfig.tasks.length;
  const found = state.completed.length;
  const waitMs = timeUntilNext();
  duckCount.textContent = `${found}/${total} уточек`;
  taskCount.textContent = `${found} завершено`;
  progressFill.style.width = `${(found / total) * 100}%`;
  solveButton.disabled = found !== total;

  if (found === total) {
    nextUnlock.textContent = "Все артефакты собраны. Финальный подарок открыт.";
  } else if (waitMs === 0) {
    nextUnlock.textContent = `Задание ${found + 1} уже доступно`;
  } else if (found === 0) {
    nextUnlock.textContent = `Первое задание откроется в 07:00 по Владивостоку через ${formatDuration(waitMs)}`;
  } else {
    nextUnlock.textContent = `Следующее задание откроется в 07:00 по Владивостоку через ${formatDuration(waitMs)}`;
  }
}

function renderDuckBank() {
  if (duckBankCount) duckBankCount.textContent = String(state.bankCoins);
}

function tapDuckBank(event) {
  state.bankCoins += 1;
  saveDuckBank();
  renderDuckBank();
  if (duckClicker) {
    duckClicker.classList.remove("duck-clicked");
    void duckClicker.offsetWidth;
    duckClicker.classList.add("duck-clicked");
  }
  if (duckClickPop && duckClicker) {
    const rect = duckClicker.getBoundingClientRect();
    const x = event?.clientX ? event.clientX - rect.left : rect.width * 0.58;
    const y = event?.clientY ? event.clientY - rect.top : rect.height * 0.32;
    duckClickPop.style.setProperty("--tap-x", `${x}px`);
    duckClickPop.style.setProperty("--tap-y", `${y}px`);
    duckClickPop.classList.remove("show");
    void duckClickPop.offsetWidth;
    duckClickPop.classList.add("show");
  }
}

function escapeHTML(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHTML(value).replaceAll('"', "&quot;");
}

function editorInput(path, label, options = {}) {
  const value = getByPath(path) || "";
  const inputAttrs = `data-edit-path="${path}"`;
  const control = options.short
    ? `<input ${inputAttrs} value="${escapeAttribute(value)}" />`
    : `<textarea ${inputAttrs} rows="${options.rows || 3}">${escapeHTML(value)}</textarea>`;
  return `
    <label class="editor-field">
      <span>${label}</span>
      ${control}
    </label>
  `;
}

function renderEditor() {
  if (!IS_TEST_MODE || !isAuthenticated()) {
    editorPanel.hidden = true;
    return;
  }

  editorPanel.hidden = false;
  if (editorFields.dataset.rendered === "true") return;

  const siteFields = [
    ["site.authEyebrow", "Вход: маленький заголовок", { short: true }],
    ["site.authTitle", "Вход: заголовок", { short: true }],
    ["site.authLead", "Вход: описание"],
    ["site.heroBadge", "Плашка сверху", { short: true }],
    ["site.heroEyebrow", "Hero: маленький заголовок", { short: true }],
    ["site.heroTitle", "Hero: главный заголовок", { short: true }],
    ["site.heroLead", "Hero: описание"],
    ["site.progressLabel", "Прогресс: подпись", { short: true }],
    ["site.tasksEyebrow", "Блок заданий: маленький заголовок", { short: true }],
    ["site.tasksTitle", "Блок заданий: заголовок", { short: true }],
    ["site.galleryEyebrow", "Галерея: маленький заголовок", { short: true }],
    ["site.galleryTitle", "Галерея: заголовок", { short: true }],
    ["site.finalButton", "Кнопка финала", { short: true }],
    ["site.taskDialogLabel", "Модалка задания: подпись", { short: true }],
    ["site.taskCompleteButton", "Кнопка выполнения задания", { short: true }],
    ["site.taskCodeLabel", "Код: подпись поля", { short: true }],
    ["site.taskCodePlaceholder", "Код: плейсхолдер", { short: true }],
    ["site.taskCodeHelp", "Код: общая подсказка"],
    ["site.artifactSaveButton", "Кнопка сохранения карточки", { short: true }],
    ["site.artifactCloseButton", "Кнопка возврата в галерею", { short: true }],
    ["site.finaleEyebrow", "Финал: маленький заголовок", { short: true }],
    ["site.finaleTitle", "Финал: заголовок", { short: true }],
    ["site.finaleLead", "Финал: описание"],
    ["site.finaleHintLabel", "Финал: подпись подсказки", { short: true }],
    ["giftLocation", "Финальный тайник"],
    ["finalMessage", "Финальное поздравление", { rows: 4 }]
  ];

  const taskFields = gameConfig.tasks
    .map(
      (task, index) => `
        <details class="editor-group">
          <summary>${index + 1}. ${escapeHTML(task.title)}</summary>
          ${editorInput(`tasks.${index}.title`, "Название задания", { short: true })}
          ${editorInput(`tasks.${index}.teaser`, "Короткое описание")}
          ${editorInput(`tasks.${index}.statement`, "Текст в окне задания")}
          ${editorInput(`tasks.${index}.challenge`, "Что нужно сделать")}
          ${editorInput(`tasks.${index}.unlock.title`, "Интерактив: название", { short: true })}
          ${editorInput(`tasks.${index}.unlock.prompt`, "Интерактив: описание")}
          ${editorInput(`tasks.${index}.unlock.hint`, "Интерактив: подсказка")}
          ${editorInput(`tasks.${index}.unlock.code`, "Интерактив: кодовое слово", { short: true })}
          ${editorInput(`tasks.${index}.unlock.success`, "Интерактив: успех")}
          ${editorInput(`tasks.${index}.unlock.error`, "Интерактив: ошибка")}
          ${editorInput(`tasks.${index}.artifact.label`, "Карточка: верхняя подпись", { short: true })}
          ${editorInput(`tasks.${index}.artifact.title`, "Карточка: заголовок")}
          ${editorInput(`tasks.${index}.artifact.subtitle`, "Карточка: подзаголовок")}
          ${editorInput(`tasks.${index}.artifact.message`, "Карточка: поздравление", { rows: 4 })}
        </details>
      `
    )
    .join("");

  editorFields.innerHTML = `
    <details class="editor-group" open>
      <summary>Тексты сайта</summary>
      ${siteFields.map(([path, label, options]) => editorInput(path, label, options)).join("")}
    </details>
    ${taskFields}
  `;
  editorFields.dataset.rendered = "true";
  editorStatus.textContent = supabaseClient ? "Онлайн-редактор" : "Локальный редактор";
  if (publishLocalContentButton) publishLocalContentButton.hidden = !supabaseClient;
}

function renderAll() {
  renderSiteText();
  renderTasks();
  renderGallery();
  renderProgress();
  renderDuckBank();
  renderEditor();
}

async function syncRemoteContent() {
  if (!supabaseClient || IS_EDITOR_MODE) return;
  const { data, error } = await supabaseClient
    .from(SUPABASE_CONTENT_TABLE)
    .select("content")
    .eq("id", SUPABASE_CONTENT_ID)
    .maybeSingle();
  if (error || !data?.content) return;
  const serialized = JSON.stringify(data.content);
  if (serialized === lastRemoteContent) return;
  lastRemoteContent = serialized;
  localStorage.setItem(CONTENT_KEY, serialized);
  applyContentOverrides(data.content);
  refreshAfterContentEdit();
}

function normalizeCode(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replaceAll("ё", "е")
    .replace(/\s+/g, " ");
}

function unlockSceneHTML(type) {
  if (type === "song") {
    return `<div class="unlock-scene song-bars" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>`;
  }
  if (type === "person") {
    return `
      <div class="unlock-scene suspect-row" aria-hidden="true">
        <span>любимая</span><span>утка</span><span>еда</span>
      </div>
    `;
  }
  if (type === "question") {
    return `<div class="unlock-scene question-mark" aria-hidden="true">?</div>`;
  }
  if (type === "puzzle") {
    return `
      <div class="unlock-scene puzzle-mini" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </div>
    `;
  }
  if (type === "tree") {
    return `
      <div class="unlock-scene tree-game">
        <div class="tree-sky">
          <div class="tree-sprout" data-tree-sprout style="--growth: 0">
            <span class="tree-tier top"></span>
            <span class="tree-tier middle"></span>
            <span class="tree-tier bottom"></span>
          </div>
          <div class="tree-ground"></div>
        </div>
        <div class="tree-controls">
          <strong data-tree-count>0/28</strong>
          <button class="mini-action" type="button" data-water-tree>Полить</button>
        </div>
      </div>
    `;
  }
  if (type === "chess") {
    const editorWinButton = IS_EDITOR_MODE
      ? `<button class="mini-action editor-win-chess" type="button" data-editor-win-chess>Засчитать победу редактору</button>`
      : "";
    return `
      <div class="unlock-scene chess-game">
        <div class="chess-status" data-chess-status>Твой ход: белые</div>
        <div class="chess-board" data-chess-board></div>
        ${editorWinButton}
      </div>
    `;
  }
  if (type === "call") {
    return `<div class="unlock-scene call-code" aria-hidden="true"><span>MSK</span><strong>1028</strong></div>`;
  }
  if (type === "stars") {
    return `
      <div class="unlock-scene oracle-card">
        <div class="oracle-flip" data-oracle-flip>
          <div class="oracle-face oracle-front">
            <div class="oracle-sigil" aria-hidden="true"><span></span><span></span><span></span></div>
            <div>
              <strong>Личная ТАРО-карта года</strong>
              <p>Введите место и время рождения, чтобы карта перевернулась и показала прогноз.</p>
            </div>
          </div>
          <div class="oracle-face oracle-back">
            <div class="tarot-mini-card">
              <div class="tarot-cat" aria-hidden="true"><span class="cat-ear left"></span><span class="cat-ear right"></span><span class="cat-face"></span><span class="cat-tie"></span></div>
              <strong>Рыжий кот в галстуке</strong>
            </div>
            <p>Тебя ждет удача во всех карьерных делах и большой успех в новом году, главное слушай свое сердце!</p>
          </div>
        </div>
        <label><span>Место рождения</span><input data-birth-place autocomplete="off" placeholder="Город" /></label>
        <label><span>Время</span><input data-birth-time autocomplete="off" placeholder="Например, 10:28" /></label>
        <button class="mini-action" type="button" data-open-oracle>Открыть карту</button>
        <p class="oracle-result" data-oracle-result></p>
      </div>
    `;
  }
  if (type === "cookie") {
    return `
      <button class="unlock-scene fortune-cookie" type="button" data-crack-cookie aria-label="Разломить печеньку">
        <span class="cookie-half left"></span>
        <span class="cookie-half right"></span>
        <span class="fortune-paper">В новом году жизни ты смелее выбираешь себя, растешь в карьере и идешь туда, где сердцу спокойно.</span>
      </button>
    `;
  }
  return `
    <div class="unlock-scene word-flip-card" aria-hidden="true">
      <div class="word-flip-inner">
        <div class="word-flip-face word-front">
          <strong>ЭЭЭЭЭЙ, _______! У кого сегодня день рождения?</strong>
        </div>
        <div class="word-flip-face word-back">
          ${kittenBirthdayHTML("small")}
        </div>
      </div>
    </div>
  `;
}

function unlockHTML(task) {
  const unlock = task.unlock || {};
  const type = unlock.type || "word";
  if (type === "word") {
    return `<div class="unlock-card word-only">${unlockSceneHTML(type)}</div>`;
  }
  const iconByType = {
    word: "Aa",
    song: "♪",
    person: "?",
    question: "!",
    puzzle: "▦",
    tree: "✦",
    chess: "♟",
    call: "☎",
    stars: "★",
    cookie: "◒"
  };
  const icon = iconByType[type] || "✓";
  return `
    <div class="unlock-card ${type}">
      <div class="unlock-icon" aria-hidden="true">${icon}</div>
      <div>
        <strong>${escapeHTML(unlock.title || task.title)}</strong>
        <p>${escapeHTML(unlock.prompt || task.challenge)}</p>
      </div>
      ${unlockSceneHTML(type)}
    </div>
  `;
}

function initUnlockScene(task) {
  if (task.unlock?.type === "chess") initChessGame();
}

function growTree() {
  if (!state.activeTask || state.activeTask.unlock?.type !== "tree") return;
  state.treeWaterCount = Math.min(28, state.treeWaterCount + 1);
  const growth = state.treeWaterCount / 28;
  const tree = unlockGame.querySelector("[data-tree-sprout]");
  const count = unlockGame.querySelector("[data-tree-count]");
  const button = unlockGame.querySelector("[data-water-tree]");
  if (tree) tree.style.setProperty("--growth", growth.toFixed(3));
  if (count) count.textContent = `${state.treeWaterCount}/28`;
  if (button) button.textContent = state.treeWaterCount >= 28 ? "Выросла" : "Полить";
  taskCodeFeedback.textContent =
    state.treeWaterCount >= 28
      ? "Елка выросла до 28. Открываю артефакт."
      : `Елка подросла: ${state.treeWaterCount}/28`;
  taskCodeFeedback.className = state.treeWaterCount >= 28 ? "unlock-feedback success" : "unlock-feedback";
  if (state.treeWaterCount >= 28) {
    taskCodeInput.value = state.activeTask.unlock?.code || "28";
    window.setTimeout(unlockActiveTask, 380);
  }
}

const chessPieces = {
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
  p: "♟",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  P: "♙"
};

const chessValues = { p: 10, n: 30, b: 32, r: 50, q: 90, k: 900 };
const chessStart = ["rnbqkbnr", "pppppppp", "........", "........", "........", "........", "PPPPPPPP", "RNBQKBNR"];

function initChessGame() {
  state.chess = {
    board: chessStart.map((row) => row.split("")),
    selected: null,
    turn: "white",
    ended: false
  };
  renderChessGame("Твой ход: белые");
}

function restartChessGame(message = "Новая партия. Твой ход: белые") {
  window.setTimeout(() => {
    if (!state.activeTask || state.activeTask.unlock?.type !== "chess") return;
    initChessGame();
    renderChessGame(message);
  }, 900);
}

function editorWinChess() {
  if (!IS_EDITOR_MODE || !state.activeTask || state.activeTask.unlock?.type !== "chess") return;
  if (state.chess) state.chess.ended = true;
  renderChessGame("Победа засчитана в режиме редактора");
  taskCodeFeedback.textContent = "Редакторская проверка: открываю шахматный артефакт.";
  taskCodeFeedback.className = "unlock-feedback success";
  window.setTimeout(unlockActiveTask, 420);
}

function isWhite(piece) {
  return piece && piece !== "." && piece === piece.toUpperCase();
}

function isBlack(piece) {
  return piece && piece !== "." && piece === piece.toLowerCase();
}

function chessColor(piece) {
  if (isWhite(piece)) return "white";
  if (isBlack(piece)) return "black";
  return "";
}

function inBoard(row, col) {
  return row >= 0 && row < 8 && col >= 0 && col < 8;
}

function slideMoves(board, row, col, directions, color) {
  const moves = [];
  directions.forEach(([dr, dc]) => {
    let nr = row + dr;
    let nc = col + dc;
    while (inBoard(nr, nc)) {
      const target = board[nr][nc];
      if (target === ".") {
        moves.push([nr, nc]);
      } else {
        if (chessColor(target) !== color) moves.push([nr, nc]);
        break;
      }
      nr += dr;
      nc += dc;
    }
  });
  return moves;
}

function legalMovesFor(board, row, col) {
  const piece = board[row][col];
  if (!piece || piece === ".") return [];
  const color = chessColor(piece);
  const lower = piece.toLowerCase();
  const moves = [];
  const add = (nr, nc) => {
    if (!inBoard(nr, nc)) return;
    const target = board[nr][nc];
    if (target === "." || chessColor(target) !== color) moves.push([nr, nc]);
  };
  if (lower === "p") {
    const dir = color === "white" ? -1 : 1;
    const start = color === "white" ? 6 : 1;
    if (inBoard(row + dir, col) && board[row + dir][col] === ".") moves.push([row + dir, col]);
    if (row === start && board[row + dir]?.[col] === "." && board[row + dir * 2]?.[col] === ".") moves.push([row + dir * 2, col]);
    [-1, 1].forEach((dc) => {
      const target = board[row + dir]?.[col + dc];
      if (target && target !== "." && chessColor(target) !== color) moves.push([row + dir, col + dc]);
    });
  }
  if (lower === "n") {
    [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dr, dc]) => add(row + dr, col + dc));
  }
  if (lower === "b") moves.push(...slideMoves(board, row, col, [[1, 1], [1, -1], [-1, 1], [-1, -1]], color));
  if (lower === "r") moves.push(...slideMoves(board, row, col, [[1, 0], [-1, 0], [0, 1], [0, -1]], color));
  if (lower === "q") moves.push(...slideMoves(board, row, col, [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]], color));
  if (lower === "k") {
    [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dr, dc]) => add(row + dr, col + dc));
  }
  return moves;
}

function allChessMoves(color) {
  const board = state.chess?.board || [];
  const moves = [];
  board.forEach((row, r) => {
    row.forEach((piece, c) => {
      if (chessColor(piece) === color) {
        legalMovesFor(board, r, c).forEach(([toRow, toCol]) => moves.push({ fromRow: r, fromCol: c, toRow, toCol }));
      }
    });
  });
  return moves;
}

function moveChessPiece(move) {
  const board = state.chess.board;
  const piece = board[move.fromRow][move.fromCol];
  const captured = board[move.toRow][move.toCol];
  board[move.toRow][move.toCol] = piece;
  board[move.fromRow][move.fromCol] = ".";
  if (piece === "P" && move.toRow === 0) board[move.toRow][move.toCol] = "Q";
  if (piece === "p" && move.toRow === 7) board[move.toRow][move.toCol] = "q";
  return captured;
}

function renderChessGame(statusText = "") {
  const boardEl = unlockGame.querySelector("[data-chess-board]");
  const statusEl = unlockGame.querySelector("[data-chess-status]");
  if (!boardEl || !state.chess) return;
  const selected = state.chess.selected;
  const moves = selected ? legalMovesFor(state.chess.board, selected.row, selected.col) : [];
  if (statusEl) statusEl.textContent = statusText;
  boardEl.innerHTML = state.chess.board
    .flatMap((row, r) =>
      row.map((piece, c) => {
        const selectedClass = selected?.row === r && selected?.col === c ? " selected" : "";
        const moveClass = moves.some(([mr, mc]) => mr === r && mc === c) ? " move" : "";
        return `<button class="chess-cell${selectedClass}${moveClass}" type="button" data-row="${r}" data-col="${c}">${piece === "." ? "" : chessPieces[piece]}</button>`;
      })
    )
    .join("");
}

function playBotMove() {
  if (!state.chess || state.chess.ended) return;
  const moves = allChessMoves("black");
  if (!moves.length) {
    state.chess.ended = true;
    taskCodeFeedback.textContent = "Боту некуда ходить. Победа засчитана.";
    taskCodeFeedback.className = "unlock-feedback success";
    window.setTimeout(unlockActiveTask, 500);
    return;
  }
  moves.sort((a, b) => {
    const av = chessValues[(state.chess.board[a.toRow][a.toCol] || ".").toLowerCase()] || 0;
    const bv = chessValues[(state.chess.board[b.toRow][b.toCol] || ".").toLowerCase()] || 0;
    const ac = 4 - Math.abs(3.5 - a.toRow) - Math.abs(3.5 - a.toCol);
    const bc = 4 - Math.abs(3.5 - b.toRow) - Math.abs(3.5 - b.toCol);
    return bv * 10 + bc - (av * 10 + ac);
  });
  const captured = moveChessPiece(moves[0]);
  if (captured === "K") {
    state.chess.ended = true;
    renderChessGame("Бот выиграл. Партия начнется заново.");
    restartChessGame();
    return;
  }
  state.chess.turn = "white";
  renderChessGame("Твой ход: белые");
}

function handleChessClick(cell) {
  if (!state.chess || state.chess.ended || state.chess.turn !== "white") return;
  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);
  const piece = state.chess.board[row][col];
  if (isWhite(piece)) {
    state.chess.selected = { row, col };
    renderChessGame("Выбери клетку для хода");
    return;
  }
  const selected = state.chess.selected;
  if (!selected) return;
  const allowed = legalMovesFor(state.chess.board, selected.row, selected.col).some(([mr, mc]) => mr === row && mc === col);
  if (!allowed) {
    renderChessGame("Так сходить нельзя");
    return;
  }
  const captured = moveChessPiece({ fromRow: selected.row, fromCol: selected.col, toRow: row, toCol: col });
  state.chess.selected = null;
  if (captured === "k") {
    state.chess.ended = true;
    taskCodeFeedback.textContent = "Матовая атака принята. Открываю артефакт.";
    taskCodeFeedback.className = "unlock-feedback success";
    renderChessGame("Победа белых");
    window.setTimeout(unlockActiveTask, 520);
    return;
  }
  state.chess.turn = "black";
  renderChessGame("Бот думает...");
  window.setTimeout(playBotMove, 520);
}

function openOracleCard() {
  if (!state.activeTask || state.activeTask.unlock?.type !== "stars") return;
  const place = unlockGame.querySelector("[data-birth-place]")?.value.trim();
  const time = unlockGame.querySelector("[data-birth-time]")?.value.trim();
  const result = unlockGame.querySelector("[data-oracle-result]");
  const normalizedPlace = normalizeCode(place).replace(/^г\.\s*/, "");
  if (normalizedPlace !== "владивосток" || !time) {
    if (result) result.textContent = "Карта откроется для Владивостока и любого указанного времени.";
    return;
  }
  const flip = unlockGame.querySelector("[data-oracle-flip]");
  if (flip) flip.classList.add("revealed");
  if (result) {
    result.textContent =
      "Карта открыта: тебя ждет удача во всех карьерных делах и большой успех в новом году, главное слушай свое сердце!";
  }
  taskCodeFeedback.textContent = "ТАРО-карта раскрылась. Открываю артефакт.";
  taskCodeFeedback.className = "unlock-feedback success";
  window.setTimeout(unlockActiveTask, 1200);
}

function crackCookie(button) {
  if (!state.activeTask || state.activeTask.unlock?.type !== "cookie" || button.classList.contains("cracked")) return;
  button.classList.add("cracked");
  taskCodeInput.value = state.activeTask.unlock?.code || "coming soon";
  taskCodeFeedback.textContent = "Предсказание найдено. Открываю финальный артефакт.";
  taskCodeFeedback.className = "unlock-feedback success";
  window.setTimeout(unlockActiveTask, 1250);
}

function openTask(task) {
  state.activeTask = task;
  state.chess = null;
  if (task.unlock?.type === "tree") state.treeWaterCount = 0;
  const codeFreeTypes = new Set(["chess", "stars"]);
  taskUnlockForm.classList.toggle("code-free", codeFreeTypes.has(task.unlock?.type));
  taskDialog.classList.toggle("word-task-dialog", task.id === "morning");
  const step = gameConfig.tasks.findIndex((item) => item.id === task.id) + 1;
  document.querySelector("#dialog-step").textContent = `Задание ${step} из ${gameConfig.tasks.length}`;
  document.querySelector("#dialog-name").textContent = task.title;
  document.querySelector("#dialog-statement").textContent = task.statement;
  document.querySelector("#dialog-challenge").textContent = task.challenge;
  unlockGame.innerHTML = unlockHTML(task);
  initUnlockScene(task);
  taskCodeInput.value = "";
  document.querySelector("#task-code-label").textContent =
    task.id === "morning" ? "Необходимо указать пропущенное слово" : gameConfig.site.taskCodeLabel || "Кодовое слово";
  document.querySelector("#complete-task").textContent =
    task.id === "morning" ? "Проверить слово" : gameConfig.site.taskCompleteButton || "Проверить код";
  taskCodeInput.placeholder = task.id === "morning" ? "Введи слово" : gameConfig.site.taskCodePlaceholder || "Введи код";
  taskCodeHelp.textContent = task.unlock?.hint || gameConfig.site.taskCodeHelp || "";
  taskCodeFeedback.textContent = "";
  taskCodeFeedback.className = "unlock-feedback";
  taskDialog.hidden = false;
  const gameFirstTypes = new Set(["tree", "chess", "stars", "cookie"]);
  if (!gameFirstTypes.has(task.unlock?.type)) {
    window.setTimeout(() => taskCodeInput.focus(), 80);
  }
}

function closeTaskDialog() {
  taskDialog.hidden = true;
  taskDialog.classList.remove("word-task-dialog");
  state.activeTask = null;
  state.chess = null;
}

async function unlockActiveTask() {
  if (!state.activeTask) return;
  const alreadyCompleted = completedIds().has(state.activeTask.id);
  if (alreadyCompleted && !IS_TEST_MODE) return;
  const submitButton = taskUnlockForm.querySelector("button[type='submit']");
  if (submitButton) submitButton.disabled = true;
  taskCodeFeedback.textContent =
    state.activeTask.unlock?.success || "Задание пройдено. Артефакт открыт.";
  taskCodeFeedback.className = "unlock-feedback success";
  if (!alreadyCompleted) {
    state.completed.push({ id: state.activeTask.id, completedAt: Date.now() });
    saveProgress();
  }
  const artifactTask = state.activeTask;
  if (artifactTask.artifact?.image) {
    await loadCanvasImage(artifactTask.artifact.image);
  }
  window.setTimeout(() => {
    if (submitButton) submitButton.disabled = false;
    closeTaskDialog();
    renderAll();
    openArtifact(artifactTask);
  }, 620);
}

function completeTask(event) {
  event?.preventDefault();
  if (!state.activeTask) return;
  const alreadyCompleted = completedIds().has(state.activeTask.id);
  if (alreadyCompleted && !IS_TEST_MODE) return;
  const expected = normalizeCode(state.activeTask.unlock?.code || "");
  const entered = normalizeCode(taskCodeInput.value);
  if (expected && entered !== expected) {
    taskCodeFeedback.textContent =
      state.activeTask.unlock?.error || "Код не совпал. Попробуй еще раз.";
    taskCodeFeedback.className = "unlock-feedback error";
    taskCodeInput.focus();
    return;
  }
  if (state.activeTask.id === "morning") {
    taskCodeFeedback.textContent = state.activeTask.unlock?.success || "Верно. Первый артефакт открыт.";
    taskCodeFeedback.className = "unlock-feedback success";
    unlockActiveTask();
    return;
  }
  unlockActiveTask();
}

function kittenBirthdayHTML(size = "large") {
  return `
    <div class="kitten-birthday ${size}" aria-hidden="true">
      <div class="kitten-party-hat"></div>
      <div class="kitten-head">
        <span class="kitten-ear left"></span>
        <span class="kitten-ear right"></span>
        <span class="kitten-eye left"></span>
        <span class="kitten-eye right"></span>
        <span class="kitten-nose"></span>
      </div>
      <div class="kitten-body"></div>
      <div class="kitten-cake"><span></span></div>
      <strong>С днём рождения, кисик!</strong>
    </div>
  `;
}

function tarotCatHTML() {
  return `
    <div class="tarot-illustration" aria-hidden="true">
      <div class="tarot-cat big">
        <span class="cat-ear left"></span>
        <span class="cat-ear right"></span>
        <span class="cat-face"></span>
        <span class="cat-tie"></span>
      </div>
    </div>
  `;
}

function artifactHTML(task) {
  const { artifact } = task;
  if (artifact.type === "kitten") {
    const artifactImage = artifact.image
      ? `<img class="artifact-source-image" src="${artifact.image}" alt="${artifact.title}" onerror="this.remove()" />`
      : "";
    return `
      <article class="artifact-card kitten-card" style="--artifact-accent: ${artifact.accent}">
        <div class="artifact-card-top">
          <span>${artifact.label}</span>
          <span>Duck Quest</span>
        </div>
        <div class="artifact-visual kitten-visual">
          ${kittenBirthdayHTML("large")}
          ${artifactImage}
        </div>
        <h3>${artifact.title}</h3>
        <p class="artifact-subtitle">${artifact.subtitle}</p>
        <p class="artifact-message">${artifact.message}</p>
      </article>
    `;
  }
  if (artifact.type === "tarot") {
    return `
      <article class="artifact-card tarot" style="--artifact-accent: ${artifact.accent}">
        <div class="artifact-card-top">
          <span>${artifact.label}</span>
          <span>Duck Quest</span>
        </div>
        <div class="artifact-visual tarot-visual">
          ${tarotCatHTML()}
        </div>
        <h3>${artifact.title}</h3>
        <p class="artifact-subtitle">${artifact.subtitle}</p>
        <p class="artifact-message">${artifact.message}</p>
      </article>
    `;
  }
  if (artifact.type === "full-image" && artifact.image) {
    return `
      <article class="artifact-card full-image-card" style="--artifact-accent: ${artifact.accent}">
        <img class="artifact-full-image" src="${artifact.image}" alt="${artifact.title}" />
        <p class="artifact-full-caption">${escapeHTML(artifact.message)}</p>
      </article>
    `;
  }
  const visualLabel =
    artifact.imageLabel ||
    (artifact.type === "portrait" ? "photo slot" : artifact.type === "glossy" ? "your photo" : "duck art");
  const imageMarkup = artifact.image
    ? `<img class="artifact-photo" src="${artifact.image}" alt="" onerror="this.remove(); this.closest('.photo-placeholder').classList.add('fallback-only')" />`
    : "";
  return `
    <article class="artifact-card ${artifact.type}" style="--artifact-accent: ${artifact.accent}">
      <div class="artifact-card-top">
        <span>${artifact.label}</span>
        <span>Duck Quest</span>
      </div>
      <div class="artifact-visual">
        <div class="photo-placeholder">
          ${imageMarkup}
          <img class="duck-sticker" src="${DUCK_SRC}" alt="" />
          <span>${visualLabel}</span>
        </div>
      </div>
      <h3>${artifact.title}</h3>
      <p class="artifact-subtitle">${artifact.subtitle}</p>
      <p class="artifact-message">${artifact.message}</p>
    </article>
  `;
}

function openArtifact(task) {
  state.activeArtifact = task;
  artifactPreview.innerHTML = artifactHTML(task);
  artifactDialog.hidden = false;
}

function closeArtifactDialog() {
  artifactDialog.hidden = true;
  state.activeArtifact = null;
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    if (context.measureText(testLine).width > maxWidth && line) {
      context.fillText(line, x, currentY);
      line = word;
      currentY += lineHeight;
    } else {
      line = testLine;
    }
    if (index === words.length - 1) context.fillText(line, x, currentY);
  });
}

function loadCanvasImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function drawCoverImage(ctx, image, x, y, width, height) {
  if (!image) return;
  const sourceRatio = image.width / image.height;
  const targetRatio = width / height;
  let sx = 0;
  let sy = 0;
  let sw = image.width;
  let sh = image.height;
  if (sourceRatio > targetRatio) {
    sw = image.height * targetRatio;
    sx = (image.width - sw) / 2;
  } else {
    sh = image.width / targetRatio;
    sy = (image.height - sh) / 2;
  }
  ctx.drawImage(image, sx, sy, sw, sh, x, y, width, height);
}

function drawTarotCanvas(ctx) {
  ctx.save();
  ctx.fillStyle = "#ffe7a3";
  ctx.strokeStyle = "#ffb347";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.roundRect(292, 170, 496, 580, 34);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(36,19,33,0.08)";
  ctx.beginPath();
  ctx.roundRect(326, 204, 428, 512, 24);
  ctx.fill();
  ctx.translate(540, 430);
  ctx.fillStyle = "#e67824";
  ctx.beginPath();
  ctx.moveTo(-126, -128);
  ctx.lineTo(-48, -16);
  ctx.lineTo(-172, -24);
  ctx.closePath();
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(126, -128);
  ctx.lineTo(48, -16);
  ctx.lineTo(172, -24);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#ff9f37";
  ctx.beginPath();
  ctx.ellipse(0, 0, 168, 148, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#241321";
  ctx.beginPath();
  ctx.arc(-54, -22, 10, 0, Math.PI * 2);
  ctx.arc(54, -22, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#6e2a18";
  ctx.beginPath();
  ctx.arc(0, 20, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(36,19,33,0.7)";
  ctx.lineWidth = 5;
  [[-92, 28, -36, 18], [-92, 52, -34, 38], [92, 28, 36, 18], [92, 52, 34, 38]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });
  ctx.fillStyle = "#14275f";
  ctx.beginPath();
  ctx.moveTo(0, 142);
  ctx.lineTo(58, 204);
  ctx.lineTo(28, 286);
  ctx.lineTo(-28, 286);
  ctx.lineTo(-58, 204);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawKittenCanvas(ctx) {
  ctx.save();
  ctx.fillStyle = "#201629";
  ctx.fillRect(124, 150, 832, 620);
  const glow = ctx.createRadialGradient(540, 390, 20, 540, 390, 360);
  glow.addColorStop(0, "rgba(255,216,77,0.34)");
  glow.addColorStop(1, "rgba(255,216,77,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(124, 150, 832, 620);
  ctx.translate(540, 410);

  ctx.fillStyle = "#ec9143";
  ctx.beginPath();
  ctx.moveTo(-94, -176);
  ctx.lineTo(-28, -68);
  ctx.lineTo(-132, -76);
  ctx.closePath();
  ctx.moveTo(94, -176);
  ctx.lineTo(28, -68);
  ctx.lineTo(132, -76);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffcc83";
  ctx.beginPath();
  ctx.ellipse(0, -48, 168, 158, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(181,102,34,0.36)";
  ctx.lineWidth = 8;
  [-70, -34, 36, 72].forEach((x) => {
    ctx.beginPath();
    ctx.moveTo(x, -180);
    ctx.quadraticCurveTo(x - 20, -106, x + 10, -24);
    ctx.stroke();
  });

  ctx.fillStyle = "#181521";
  ctx.beginPath();
  ctx.ellipse(-54, -56, 20, 26, 0, 0, Math.PI * 2);
  ctx.ellipse(54, -56, 20, 26, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(-61, -64, 6, 0, Math.PI * 2);
  ctx.arc(47, -64, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#d96b5b";
  ctx.beginPath();
  ctx.ellipse(0, -12, 12, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "rgba(47,28,24,0.65)";
  ctx.lineWidth = 4;
  [[-110, -6, -28, -16], [-108, 22, -26, 8], [110, -6, 28, -16], [108, 22, 26, 8]].forEach(([x1, y1, x2, y2]) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  });

  ctx.fillStyle = "#f3aa62";
  ctx.beginPath();
  ctx.roundRect(-72, 90, 144, 128, 54);
  ctx.fill();

  ctx.fillStyle = "#ff4f91";
  ctx.beginPath();
  ctx.moveTo(-42, -218);
  ctx.lineTo(40, -218);
  ctx.lineTo(0, -330);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#ffe66d";
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.moveTo(-20, -270);
  ctx.lineTo(28, -224);
  ctx.moveTo(-34, -238);
  ctx.lineTo(3, -218);
  ctx.stroke();
  ctx.fillStyle = "#63d8ff";
  ctx.beginPath();
  ctx.arc(0, -336, 14, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ffcf6f";
  ctx.beginPath();
  ctx.roundRect(-86, 96, 172, 90, 20);
  ctx.fill();
  ctx.fillStyle = "#ff8eb8";
  ctx.fillRect(-86, 120, 172, 32);
  ctx.fillStyle = "#fff4a8";
  ctx.fillRect(-86, 96, 172, 28);
  ctx.fillStyle = "#63d8ff";
  ctx.fillRect(-4, 56, 8, 42);
  ctx.fillStyle = "#ffd84d";
  ctx.beginPath();
  ctx.arc(0, 48, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

async function downloadArtifact() {
  if (!state.activeArtifact) return;
  const task = state.activeArtifact;
  if (task.artifact.type === "full-image" && task.artifact.image) {
    const link = document.createElement("a");
    link.download = `${task.id}-forbes-cover.png`;
    link.href = task.artifact.image;
    link.click();
    return;
  }
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1440;
  const ctx = canvas.getContext("2d");
  const accent = task.artifact.accent;
  const duckImage = await loadCanvasImage(DUCK_SRC);
  const artifactImage = task.artifact.image ? await loadCanvasImage(task.artifact.image) : null;

  ctx.fillStyle = "#0b1020";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, 1080, 1440);
  gradient.addColorStop(0, "#202946");
  gradient.addColorStop(1, "#14172d");
  ctx.fillStyle = gradient;
  ctx.fillRect(64, 64, 952, 1312);
  ctx.fillStyle = accent;
  ctx.fillRect(64, 64, 952, 18);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fillRect(124, 150, 832, 620);
  if (task.artifact.type === "kitten") {
    if (artifactImage) {
      drawCoverImage(ctx, artifactImage, 124, 150, 832, 620);
    } else {
      drawKittenCanvas(ctx);
    }
  } else if (task.artifact.type === "tarot") {
    drawTarotCanvas(ctx);
  } else if (artifactImage) {
    drawCoverImage(ctx, artifactImage, 124, 150, 832, 620);
    ctx.fillStyle = "rgba(11,16,32,0.18)";
    ctx.fillRect(124, 150, 832, 620);
  } else if (duckImage) {
    ctx.drawImage(duckImage, 250, 170, 580, 580);
  }
  ctx.fillStyle = "#7cffb2";
  ctx.font = "700 34px Manrope, sans-serif";
  ctx.fillText(task.artifact.label.toUpperCase(), 124, 880);
  ctx.fillStyle = "#ffffff";
  ctx.font = "900 72px Manrope, sans-serif";
  wrapText(ctx, task.artifact.title, 124, 980, 820, 82);
  ctx.fillStyle = "#aab3d1";
  ctx.font = "600 38px Manrope, sans-serif";
  wrapText(ctx, task.artifact.message, 124, 1210, 820, 50);
  const link = document.createElement("a");
  link.download = `${task.id}-duck-card.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
}

function showFinale() {
  document.querySelector("#gift-location").textContent = gameConfig.giftLocation;
  document.querySelector("#final-message").textContent = gameConfig.finalMessage;
  finale.hidden = false;
}

taskGrid.addEventListener("click", (event) => {
  const card = event.target.closest(".task-card");
  if (!card) return;
  const task = gameConfig.tasks.find((item) => item.id === card.dataset.id);
  const index = gameConfig.tasks.findIndex((item) => item.id === task.id);
  const status = taskStatus(index, task);
  if (status === "available") {
    openTask(task);
    return;
  }
  if (status === "done") {
    if (IS_TEST_MODE) {
      openTask(task);
      return;
    }
    openArtifact(task);
  }
});

unlockGame.addEventListener("click", (event) => {
  const waterButton = event.target.closest("[data-water-tree]");
  if (waterButton) {
    growTree();
    return;
  }
  const chessCell = event.target.closest("[data-chess-board] .chess-cell");
  if (chessCell) {
    handleChessClick(chessCell);
    return;
  }
  const editorWinChessButton = event.target.closest("[data-editor-win-chess]");
  if (editorWinChessButton) {
    editorWinChess();
    return;
  }
  const oracleButton = event.target.closest("[data-open-oracle]");
  if (oracleButton) {
    openOracleCard();
    return;
  }
  const cookieButton = event.target.closest("[data-crack-cookie]");
  if (cookieButton) {
    crackCookie(cookieButton);
  }
});

artifactGallery.addEventListener("click", (event) => {
  const tile = event.target.closest(".artifact-tile.unlocked");
  if (!tile) return;
  const task = gameConfig.tasks.find((item) => item.id === tile.dataset.id);
  openArtifact(task);
});

document.querySelector("#close-task-dialog").addEventListener("click", closeTaskDialog);
taskUnlockForm.addEventListener("submit", completeTask);
document.querySelector("#close-artifact-dialog").addEventListener("click", closeArtifactDialog);
document.querySelector("#close-artifact-secondary").addEventListener("click", closeArtifactDialog);
document.querySelector("#download-artifact").addEventListener("click", downloadArtifact);
document.querySelector("#close-finale").addEventListener("click", () => {
  finale.hidden = true;
});
solveButton.addEventListener("click", showFinale);
if (duckClicker) duckClicker.addEventListener("click", tapDuckBank);

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  taskDialog.hidden = true;
  artifactDialog.hidden = true;
  finale.hidden = true;
});

editorFields.addEventListener("input", (event) => {
  const input = event.target.closest("[data-edit-path]");
  if (!input) return;
  setByPath(input.dataset.editPath, input.value);
  refreshAfterContentEdit();
  scheduleContentSave();
});
if (publishLocalContentButton) {
  publishLocalContentButton.addEventListener("click", publishLocalContentOnline);
}

authForm.addEventListener("submit", handleAuthSubmit);

async function bootApp() {
  const hasLocalContent = loadLocalContentOverrides();
  if (!IS_TEST_MODE || !hasLocalContent) {
    await loadRemoteContentOverrides();
  }

  if (isAuthenticated()) {
    showQuest();
  } else {
    showAuth();
  }

  loadProgress();
  loadDuckBank();
  renderAll();
  setInterval(renderAll, 1000);
  setInterval(syncRemoteContent, 15000);
}

bootApp();
