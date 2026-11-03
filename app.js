const synth = window.speechSynthesis;
let soundOn = true;
let speechRate = Number(localStorage.getItem('lingobloom-speech-rate') || '0.88');
const languageSelect = document.getElementById('languageSelect');
const translations = {
  tr: {
    dailyLesson: 'GÜNLÜK DERSİN',
    gettingToKnow: 'Birbirimizi tanıyalım',
    greetingsTitle: 'Selamlaşma ve tanışma',
    greetingsDescription: 'Merhaba demeyi, kendini tanıtmayı ve birinin adını sormayı öğren.',
    weeklyFocus: 'HAFTALIK ODAK',
    buildBasics: 'Temellerini geliştir',
    focusDescription: 'Güçlü bir temel oluşturuyorsun. Her gün biraz pratik büyük fark yaratır.',
    moreLessons: 'DAHA FAZLA BAŞLANGIÇ DERSİ',
    learnEveryday: 'Her gün için kullanışlı İngilizce öğren',
    wordOfDay: 'GÜNÜN KELİMESİ',
    sayWithConfidence: 'Kendinden emin konuş',
    exploreWords: 'Kelimeleri keşfet'
  },
  es: {
    dailyLesson: 'LECCIÓN DEL DÍA',
    gettingToKnow: 'Para conocernos',
    greetingsTitle: 'Saludos y presentaciones',
    greetingsDescription: 'Aprende a decir hola, presentarte y preguntar el nombre de otra persona.',
    weeklyFocus: 'ENFOQUE SEMANAL',
    buildBasics: 'Construye tus bases',
    focusDescription: 'Estás creando una base sólida. Un poco de práctica cada día marca una gran diferencia.',
    moreLessons: 'MÁS LECCIONES PARA PRINCIPIANTES',
    learnEveryday: 'Aprende inglés útil para cada día',
    wordOfDay: 'PALABRA DEL DÍA',
    sayWithConfidence: 'Habla con confianza',
    exploreWords: 'Explorar palabras'
  },
  fa: {
    dailyLesson: 'درس روزانه شما',
    gettingToKnow: 'آشنایی با یکدیگر',
    greetingsTitle: 'سلام و معرفی',
    greetingsDescription: 'یاد بگیر سلام کنی، خودت را معرفی کنی و نام دیگران را بپرسی.',
    weeklyFocus: 'تمرکز هفتگی',
    buildBasics: 'پایه‌های خود را بساز',
    focusDescription: 'داری پایه‌ای محکم می‌سازی. کمی تمرین روزانه تفاوت بزرگی ایجاد می‌کند.',
    moreLessons: 'درس‌های بیشتر برای مبتدی‌ها',
    learnEveryday: 'انگلیسی کاربردی برای هر روز یاد بگیر',
    wordOfDay: 'کلمه روز',
    sayWithConfidence: 'با اعتمادبه‌نفس صحبت کن',
    exploreWords: 'کشف کلمه‌ها',
    lessonNumbers: 'اعداد و زمان',
    lessonNumbersDescription: 'شمردن، گفتن ساعت و گفتن شماره تلفن را تمرین کن.',
    lessonFood: 'غذا و نوشیدنی',
    lessonFoodDescription: 'یک میان‌وعده سفارش بده و درباره غذای مورد علاقه‌ات بگو.',
    lessonRoutine: 'برنامه روزانه من',
    lessonRoutineDescription: 'درباره صبح، کار و عصر خود صحبت کن.',
    lessonDirections: 'مکان‌ها و مسیرها',
    lessonDirectionsDescription: 'آدرس بپرس و مسیرهای ساده را بفهم.',
    lessonFamily: 'خانواده و دوستان',
    lessonFamilyDescription: 'افراد مهم زندگی‌ات را توصیف و خانواده‌ات را معرفی کن.',
    lessonWeather: 'آب‌وهوا و لباس',
    lessonWeatherDescription: 'درباره روزهای آفتابی صحبت کن و لباس مناسب انتخاب کن.',
    lessonShopping: 'خرید کردن',
    lessonShoppingDescription: 'قیمت و اندازه را بپرس و مؤدبانه پرداخت کن.',
    lessonWork: 'کار و مدرسه',
    lessonWorkDescription: 'درباره شغل یا کلاس خود صحبت کن.',
    lessonHealth: 'سلامت و احساسات',
    lessonHealthDescription: 'احساست را بیان کن و کمک ساده بخواه.',
    lessonTravel: 'عبارت‌های سفر',
    lessonTravelDescription: 'در فرودگاه، هتل و ایستگاه از عبارت‌های دوستانه استفاده کن.',
    lessonReview: 'مرور و گفت‌وگوی واقعی',
    lessonReviewDescription: 'کلمه‌های جدیدت را در یک گفت‌وگوی کوتاه روزمره به کار ببر.'
  }
};

function updateLanguage(language) {
  const copy = translations[language] || translations.tr;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });
  document.querySelectorAll('.vocab-card').forEach((card) => {
    const translation = card.dataset[`translation${language === 'tr' ? 'Tr' : language === 'es' ? 'Es' : 'Fa'}`];
    if (translation) card.querySelector('.translation').textContent = translation;
  });
  document.documentElement.lang = language;
  document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
  localStorage.setItem('lingobloom-language', language);
}

function speak(text) {
  if (!soundOn || !('speechSynthesis' in window)) return;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = speechRate;
  synth.speak(utterance);
}

languageSelect.value = localStorage.getItem('lingobloom-language') || 'tr';
updateLanguage(languageSelect.value);
languageSelect.addEventListener('change', (event) => updateLanguage(event.target.value));

document.querySelectorAll('[data-speech]').forEach((button) => {
  button.addEventListener('click', () => speak(button.dataset.speech));
});

document.getElementById('soundToggle').addEventListener('click', (event) => {
  soundOn = !soundOn;
  event.currentTarget.textContent = soundOn ? '🔊' : '🔇';
  event.currentTarget.setAttribute('aria-label', soundOn ? 'Mute sound' : 'Turn sound on');
});

const settingsPanel = document.getElementById('settingsPanel');
document.getElementById('settingsToggle').addEventListener('click', () => settingsPanel.classList.toggle('hidden'));
document.getElementById('settingsClose').addEventListener('click', () => settingsPanel.classList.add('hidden'));
const savedTextSize = localStorage.getItem('lingobloom-text-size') || 'normal';
const savedContrast = localStorage.getItem('lingobloom-high-contrast') === 'true';
const savedMotion = localStorage.getItem('lingobloom-reduced-motion') === 'true';
const savedCaptions = localStorage.getItem('lingobloom-captions') !== 'false';
document.getElementById('textSize').value = savedTextSize;
document.getElementById('audioSpeed').value = String(speechRate);
document.getElementById('highContrast').checked = savedContrast;
document.getElementById('reducedMotion').checked = savedMotion;
document.getElementById('showCaptions').checked = savedCaptions;
function applyAccessibility() {
  const size = document.getElementById('textSize').value;
  document.documentElement.dataset.textSize = size;
  document.documentElement.classList.toggle('high-contrast', document.getElementById('highContrast').checked);
  document.documentElement.classList.toggle('reduced-motion', document.getElementById('reducedMotion').checked);
  document.documentElement.classList.toggle('hide-captions', !document.getElementById('showCaptions').checked);
}
document.getElementById('textSize').addEventListener('change', (event) => { localStorage.setItem('lingobloom-text-size', event.target.value); applyAccessibility(); });
document.getElementById('audioSpeed').addEventListener('change', (event) => { speechRate = Number(event.target.value); localStorage.setItem('lingobloom-speech-rate', speechRate); });
document.getElementById('highContrast').addEventListener('change', (event) => { localStorage.setItem('lingobloom-high-contrast', event.target.checked); applyAccessibility(); });
document.getElementById('reducedMotion').addEventListener('change', (event) => { localStorage.setItem('lingobloom-reduced-motion', event.target.checked); applyAccessibility(); });
document.getElementById('showCaptions').addEventListener('change', (event) => { localStorage.setItem('lingobloom-captions', event.target.checked); applyAccessibility(); });
applyAccessibility();

document.getElementById('greetButton').addEventListener('click', () => speak('Hello! Good morning. Welcome to LingoBloom.'));

const quizQuestions = [
  { topic: 'Greetings', prompt: 'How do you say “Merhaba” in English?', speech: 'How do you say Merhaba in English?', options: ['Hello', 'Goodbye', 'Please'], answer: 'Hello' },
  { topic: 'Introductions', prompt: 'Complete: “Nice to ___ you.”', speech: 'Complete: Nice to meet you.', options: ['meet', 'see', 'call'], answer: 'meet' },
  { topic: 'Food', prompt: 'What do you say when you want water?', speech: 'What do you say when you want water?', options: ['Water, please', 'I am water', 'Good night'], answer: 'Water, please' },
  { topic: 'Numbers', prompt: 'Which number comes after nine?', speech: 'Which number comes after nine?', options: ['Eight', 'Ten', 'Twelve'], answer: 'Ten' },
  { topic: 'Directions', prompt: 'What is the opposite of “left”?', speech: 'What is the opposite of left?', options: ['Right', 'Near', 'Up'], answer: 'Right' }
];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
const quizPrompt = document.getElementById('quizPrompt');
const quizOptions = document.getElementById('quizOptions');
const quizFeedback = document.getElementById('quizFeedback');
const quizProgress = document.querySelector('.quiz-progress span');
const quizTopic = document.getElementById('quizTopic');
const quizNext = document.getElementById('quizNext');
const quizReset = document.getElementById('quizReset');

function renderQuiz() {
  const question = quizQuestions[quizIndex];
  quizAnswered = false;
  quizTopic.textContent = question.topic;
  quizPrompt.textContent = question.prompt;
  quizOptions.innerHTML = question.options.map((option) => `<button type="button" data-answer="${option}">${option}</button>`).join('');
  quizFeedback.textContent = '';
  quizNext.classList.add('hidden');
  quizReset.classList.add('hidden');
  quizProgress.style.width = `${(quizIndex / quizQuestions.length) * 100}%`;
  document.querySelector('.question-count').textContent = `Question ${quizIndex + 1} of ${quizQuestions.length}`;
  document.getElementById('quizScore').textContent = `${quizScore} correct`;
  quizOptions.querySelectorAll('button').forEach((option) => option.addEventListener('click', () => answerQuiz(option)));
}

function answerQuiz(option) {
  if (quizAnswered) return;
  quizAnswered = true;
  const question = quizQuestions[quizIndex];
  const correct = option.dataset.answer === question.answer;
  if (correct) quizScore += 1;
  quizOptions.querySelectorAll('button').forEach((item) => {
    item.disabled = true;
    if (item.dataset.answer === question.answer) item.classList.add('correct');
  });
  if (!correct) option.classList.add('wrong');
  quizFeedback.textContent = correct ? 'That’s right! Great job.' : `Almost! The answer is “${question.answer}”.`;
  quizFeedback.style.color = correct ? '#328560' : '#c4615b';
  document.getElementById('quizScore').textContent = `${quizScore} correct`;
  quizProgress.style.width = `${((quizIndex + 1) / quizQuestions.length) * 100}%`;
  if (quizIndex === quizQuestions.length - 1) quizReset.classList.remove('hidden');
  else quizNext.classList.remove('hidden');
  if (correct) speak(question.answer);
}

document.getElementById('quizSpeak').addEventListener('click', () => speak(quizQuestions[quizIndex].speech));
quizNext.addEventListener('click', () => { quizIndex += 1; renderQuiz(); });
quizReset.addEventListener('click', () => { quizIndex = 0; quizScore = 0; renderQuiz(); });
renderQuiz();

const conversationTurns = [
  { prompt: 'Hi there! What’s your name?', translation: 'سلام! اسمت چیست؟', options: [{ text: 'Hi! My name is Alex.', translation: 'سلام! اسم من الکس است.', next: 'Nice to meet you, Alex!' }, { text: 'I am hungry.', translation: 'من گرسنه هستم.', next: 'Let’s practice introductions first.' }] },
  { prompt: 'Nice to meet you! Where are you from?', translation: 'از آشنایی با تو خوشحالم! اهل کجایی؟', options: [{ text: 'I’m from Turkey.', translation: 'من اهل ترکیه هستم.', next: 'That sounds wonderful!' }, { text: 'I’m ten years old.', translation: 'من ده ساله هستم.', next: 'Good sentence! Now tell me where you are from.' }] },
  { prompt: 'What do you like to eat?', translation: 'چه غذایی دوست داری؟', options: [{ text: 'I like apples.', translation: 'من سیب دوست دارم.', next: 'Apples are delicious!' }, { text: 'My name is Alex.', translation: 'اسم من الکس است.', next: 'We know your name! Let’s talk about food.' }] },
  { prompt: 'Great work! How are you today?', translation: 'آفرین! امروز چطوری؟', options: [{ text: 'I am happy, thank you!', translation: 'خوشحالم، متشکرم!', next: 'You completed your first chat!' }, { text: 'Goodbye yesterday.', translation: 'خداحافظ دیروز.', next: 'Almost! Try: I am happy, thank you!' }] }
];
let conversationIndex = 0;
const conversationPrompt = document.getElementById('conversationPrompt');
const conversationPromptTranslation = document.getElementById('conversationPromptTranslation');
const conversationOptions = document.getElementById('conversationOptions');
const conversationProgress = document.getElementById('conversationProgress');
const conversationStatus = document.getElementById('conversationStatus');
const chatMessages = document.getElementById('chatMessages');

function renderConversation() {
  const turn = conversationTurns[conversationIndex];
  conversationPrompt.textContent = turn.prompt;
  conversationPromptTranslation.textContent = turn.translation;
  conversationProgress.textContent = `${conversationIndex + 1} / ${conversationTurns.length}`;
  conversationStatus.textContent = 'Choose a reply to continue.';
  conversationOptions.innerHTML = turn.options.map((option, index) => `<button type="button" class="conversation-option" data-option="${index}"><span>${option.text}</span><small>${option.translation}</small><b>🔊</b></button>`).join('');
  conversationOptions.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => chooseConversation(button)));
}

function chooseConversation(button) {
  const turn = conversationTurns[conversationIndex];
  const option = turn.options[Number(button.dataset.option)];
  conversationOptions.querySelectorAll('button').forEach((item) => { item.disabled = true; });
  const reply = document.createElement('div');
  reply.className = 'message user-message';
  reply.innerHTML = `${option.text} <span>🔊</span>`;
  chatMessages.insertBefore(reply, conversationOptions);
  speak(option.text);
  conversationStatus.textContent = option.next;
  setTimeout(() => speak(option.next), 250);
  if (conversationIndex === conversationTurns.length - 1) {
    conversationStatus.textContent = '🎉 You completed Alex’s first chat!';
    document.getElementById('conversationRestart').classList.remove('hidden');
    return;
  }
  setTimeout(() => {
    conversationIndex += 1;
    renderConversation();
  }, 900);
}

document.getElementById('conversationRestart').addEventListener('click', () => {
  conversationIndex = 0;
  document.querySelectorAll('#chatMessages .user-message').forEach((message) => message.remove());
  document.getElementById('conversationRestart').classList.add('hidden');
  renderConversation();
});
renderConversation();

document.getElementById('shuffleWords').addEventListener('click', () => {
  const cards = [...document.querySelectorAll('.vocab-card')];
  const grid = document.querySelector('.vocab-grid');
  cards.reverse().forEach((card) => grid.appendChild(card));
});

const scenarioData = {
  introductions: { label: 'INTRODUCTIONS', title: 'Meet a new friend', icon: '👋', prompt: 'Hello! Is this your first day here?', translation: 'سلام! آیا امروز اولین روز تو اینجاست؟', phrase: 'Hello! Is this your first day here?', options: [{ text: 'Yes, it is. Nice to meet you!', fa: 'بله، همین‌طور است. از آشنایی خوشحالم!', good: true }, { text: 'I would like the bill, please.', fa: 'لطفاً صورت‌حساب را می‌خواهم.', good: false }] },
  food: { label: 'ORDERING FOOD', title: 'At a friendly café', icon: '🍽️', prompt: 'What would you like to drink?', translation: 'برای نوشیدنی چه میل دارید؟', phrase: 'What would you like to drink?', options: [{ text: 'Could I have some water, please?', fa: 'می‌شود لطفاً کمی آب بدهید؟', good: true }, { text: 'Turn left at the corner.', fa: 'سرِ کوچه به چپ بپیچید.', good: false }] },
  shopping: { label: 'SHOPPING', title: 'Find the right size', icon: '🛍️', prompt: 'Can I help you find a size?', translation: 'می‌توانم برای پیدا کردن اندازه کمکتان کنم؟', phrase: 'Can I help you find a size?', options: [{ text: 'Yes, do you have a medium?', fa: 'بله، اندازه متوسط دارید؟', good: true }, { text: 'I work in an office.', fa: 'من در یک اداره کار می‌کنم.', good: false }] },
  directions: { label: 'DIRECTIONS', title: 'Ask for the station', icon: '🧭', prompt: 'Excuse me, how do I get to the station?', translation: 'ببخشید، چطور به ایستگاه بروم؟', phrase: 'Excuse me, how do I get to the station?', options: [{ text: 'Go straight, then turn right.', fa: 'مستقیم بروید، سپس به راست بپیچید.', good: true }, { text: 'I would like a coffee.', fa: 'من یک قهوه می‌خواهم.', good: false }] },
  work: { label: 'WORKPLACE', title: 'Meet a colleague', icon: '💼', prompt: 'What do you do?', translation: 'چه کار می‌کنید؟', phrase: 'What do you do?', options: [{ text: 'I work as a designer.', fa: 'من به‌عنوان طراح کار می‌کنم.', good: true }, { text: 'It is sunny today.', fa: 'امروز هوا آفتابی است.', good: false }] }
};
let activeScenario = 'introductions';
function renderScenario() {
  const scenario = scenarioData[activeScenario];
  document.querySelector('.scenario-icon').textContent = scenario.icon;
  document.getElementById('scenarioLabel').textContent = scenario.label;
  document.getElementById('scenarioTitle').textContent = scenario.title;
  document.getElementById('scenarioPrompt').textContent = scenario.prompt;
  document.getElementById('scenarioTranslation').textContent = scenario.translation;
  document.getElementById('scenarioFeedback').textContent = 'Choose a response to practice.';
  document.getElementById('scenarioOptions').innerHTML = scenario.options.map((option, index) => `<button class="scenario-option" data-index="${index}" type="button"><strong>${option.text}</strong><small>${option.fa}</small></button>`).join('');
  document.querySelectorAll('.scenario-option').forEach((button) => button.addEventListener('click', () => {
    const option = scenario.options[Number(button.dataset.index)];
    document.querySelectorAll('.scenario-option').forEach((item) => { item.disabled = true; });
    button.classList.add(option.good ? 'correct' : 'wrong');
    document.getElementById('scenarioFeedback').textContent = option.good ? 'Great choice — that fits the situation.' : `Try this instead: “${scenario.options.find((item) => item.good).text}”`;
    if (option.good) {
      document.getElementById('goalPracticeCheck').textContent = '✓';
      document.getElementById('goalPracticeCheck').classList.add('done');
      speak(option.text);
    }
  }));
}
document.querySelectorAll('.scenario-tab').forEach((tab) => tab.addEventListener('click', () => {
  activeScenario = tab.dataset.scenario;
  document.querySelectorAll('.scenario-tab').forEach((item) => { item.classList.toggle('active', item === tab); item.setAttribute('aria-selected', item === tab ? 'true' : 'false'); });
  renderScenario();
}));
document.getElementById('scenarioSpeak').addEventListener('click', () => speak(scenarioData[activeScenario].phrase));
renderScenario();

const reviewWords = [
  { word: 'Hello', type: 'GREETING', meaning: 'Merhaba · سلام', example: 'Hello! Nice to meet you.' },
  { word: 'Water, please', type: 'FOOD & DRINK', meaning: 'Su, lütfen · آب، لطفاً', example: 'Could I have some water, please?' },
  { word: 'Turn right', type: 'DIRECTIONS', meaning: 'Sağa dön · به راست بپیچید', example: 'Go straight, then turn right.' }
];
let reviewIndex = 0;
const renderReview = () => {
  const card = reviewWords[reviewIndex];
  document.getElementById('reviewType').textContent = card.type;
  document.getElementById('reviewWord').textContent = card.word;
  document.getElementById('reviewMeaning').textContent = card.meaning;
  document.getElementById('reviewExample').textContent = card.example;
  document.getElementById('reviewExample').classList.add('hidden');
  document.getElementById('reviewActions').classList.add('hidden');
  document.getElementById('revealReview').classList.remove('hidden');
  document.getElementById('reviewCount').textContent = `${reviewWords.length - reviewIndex} cards`;
};
document.getElementById('revealReview').addEventListener('click', () => {
  document.getElementById('reviewExample').classList.remove('hidden');
  document.getElementById('reviewActions').classList.remove('hidden');
  document.getElementById('revealReview').classList.add('hidden');
  speak(reviewWords[reviewIndex].word);
});
document.querySelectorAll('#reviewActions button').forEach((button) => button.addEventListener('click', () => {
  reviewIndex += 1;
  document.getElementById('goalPracticeCount').textContent = `${Math.min(5, 2 + reviewIndex)} / 5`;
  if (reviewIndex >= reviewWords.length) {
    document.getElementById('reviewCard').innerHTML = '<div class="review-complete">🎉<strong>Review complete!</strong><small>Your next review is scheduled for tomorrow.</small></div>';
    document.getElementById('reviewCount').textContent = 'Done';
  } else renderReview();
}));
renderReview();

const recordButton = document.getElementById('recordButton');
const recordStatus = document.getElementById('recordStatus');
const recordingAudio = document.getElementById('recordingAudio');
let mediaRecorder;
let recordingChunks = [];
if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
  recordButton.disabled = true;
  recordStatus.textContent = 'Recording is not supported here. Use Hear model to practice instead.';
  document.getElementById('pronunciationFallback').textContent = 'Tip: listen to the model, repeat slowly, and use the audio controls when your browser supports recording.';
} else {
  recordButton.addEventListener('click', async () => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recordingChunks = [];
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => recordingChunks.push(event.data);
        mediaRecorder.onstop = () => {
          const blob = new Blob(recordingChunks, { type: 'audio/webm' });
          recordingAudio.src = URL.createObjectURL(blob);
          recordingAudio.classList.remove('hidden');
          recordButton.textContent = '● Record again';
          recordStatus.textContent = 'Recording ready — listen back and compare.';
          stream.getTracks().forEach((track) => track.stop());
          document.getElementById('goalSpeakCheck').textContent = '✓';
          document.getElementById('goalSpeakCheck').classList.add('done');
        };
        mediaRecorder.start();
        recordButton.textContent = '■ Stop recording';
        recordStatus.textContent = 'Listening… say the phrase clearly.';
      } catch {
        recordStatus.textContent = 'Microphone permission was not granted. You can still practice with Hear model.';
      }
    } else mediaRecorder.stop();
  });
}
document.getElementById('pronunciationSpeak').addEventListener('click', () => speak(document.getElementById('pronunciationPhrase').textContent.replace(/[“”]/g, '')));

const placementQuestions = [
  { question: 'Choose the correct greeting:', options: ['Hello', 'Yesterday', 'Kitchen'], answer: 'Hello' },
  { question: 'Complete: “I ___ coffee.”', options: ['like', 'likes', 'liking'], answer: 'like' },
  { question: 'Which sentence asks for directions?', options: ['Where is the station?', 'I am hungry.', 'This is my friend.'], answer: 'Where is the station?' },
  { question: 'Choose the natural reply: “How are you?”', options: ['I’m good, thanks!', 'At three o’clock.', 'It is a book.'], answer: 'I’m good, thanks!' }
];
let placementIndex = 0;
let placementScore = 0;
function renderPlacement() {
  const item = placementQuestions[placementIndex];
  document.getElementById('placementProgress').textContent = `QUESTION ${placementIndex + 1} OF ${placementQuestions.length}`;
  document.getElementById('placementQuestion').textContent = item.question;
  document.getElementById('placementFeedback').textContent = '';
  document.getElementById('placementOptions').innerHTML = item.options.map((option) => `<button type="button" data-answer="${option}">${option}</button>`).join('');
  document.querySelectorAll('#placementOptions button').forEach((button) => button.addEventListener('click', () => {
    document.querySelectorAll('#placementOptions button').forEach((itemButton) => { itemButton.disabled = true; });
    if (button.dataset.answer === item.answer) { placementScore += 1; button.classList.add('correct'); }
    else { button.classList.add('wrong'); document.querySelector(`#placementOptions button[data-answer="${CSS.escape(item.answer)}"]`).classList.add('correct'); }
    if (placementIndex === placementQuestions.length - 1) {
      const level = placementScore >= 3 ? 'Elementary (A1+)': 'Starter (pre-A1)';
      document.getElementById('placementResult').innerHTML = `<strong>Your suggested start: ${level}</strong><small>${placementScore}/${placementQuestions.length} correct · Begin with Greetings & introductions, then build through Food & directions.</small>`;
      document.getElementById('placementResult').classList.remove('hidden');
    } else setTimeout(() => { placementIndex += 1; renderPlacement(); }, 650);
  }));
}
document.getElementById('placementStart').addEventListener('click', () => {
  placementIndex = 0;
  placementScore = 0;
  document.getElementById('placementCard').classList.remove('hidden');
  document.getElementById('placementStart').classList.add('hidden');
  document.getElementById('placementResult').classList.add('hidden');
  renderPlacement();
});

const cefrUnits = {
  A1: [
    { title: 'Greetings & introductions', detail: 'Hello, names, countries, and the verb be.', questions: [{ q: 'Choose: “My name ___ Alex.”', options: ['am', 'is', 'are'], answer: 'is' }, { q: 'What is a friendly greeting?', options: ['Hello', 'Yesterday', 'Kitchen'], answer: 'Hello' }, { q: 'Complete: “Nice to ___ you.”', options: ['meet', 'eat', 'go'], answer: 'meet' }] },
    { title: 'Food & everyday needs', detail: 'Order food, say please, and talk about likes.', questions: [{ q: 'Choose the polite request:', options: ['Water, please.', 'Water yesterday.', 'Please water?'], answer: 'Water, please.' }, { q: 'Complete: “I ___ apples.”', options: ['like', 'likes', 'liking'], answer: 'like' }, { q: 'What do you drink?', options: ['Water', 'Chair', 'Street'], answer: 'Water' }] },
    { title: 'Time, places & routines', detail: 'Numbers, clocks, daily actions, and simple directions.', questions: [{ q: 'Which number comes after nine?', options: ['Eight', 'Ten', 'Twelve'], answer: 'Ten' }, { q: 'Choose the direction:', options: ['Turn right', 'Eat breakfast', 'Feel happy'], answer: 'Turn right' }, { q: 'Complete: “I ___ up at seven.”', options: ['wake', 'wakes', 'waking'], answer: 'wake' }] }
  ],
  A2: [
    { title: 'Past experiences', detail: 'Talk about yesterday with regular past verbs.', questions: [{ q: 'Yesterday I ___ to the park.', options: ['walked', 'walk', 'walking'], answer: 'walked' }, { q: 'Choose the past of “visit”.', options: ['visited', 'visiting', 'visits'], answer: 'visited' }, { q: 'Ask about the past:', options: ['What did you do?', 'What do you doing?', 'What you do yesterday?'], answer: 'What did you do?' }] },
    { title: 'Plans & invitations', detail: 'Make plans with going to and would like.', questions: [{ q: 'Complete: “I am going ___ travel.”', options: ['to', 'at', 'on'], answer: 'to' }, { q: 'A polite invitation is:', options: ['Would you like to come?', 'You come now.', 'Come yesterday.'], answer: 'Would you like to come?' }, { q: 'Choose a future time:', options: ['tomorrow', 'last week', 'yesterday'], answer: 'tomorrow' }] },
    { title: 'Comparisons & advice', detail: 'Compare things and give simple helpful advice.', questions: [{ q: 'The opposite of expensive is:', options: ['cheap', 'tall', 'late'], answer: 'cheap' }, { q: 'Good advice starts with:', options: ['You should', 'You yesterday', 'You are should'], answer: 'You should' }, { q: 'Complete: “This bag is ___ than that one.”', options: ['lighter', 'light', 'lightest'], answer: 'lighter' }] }
  ],
  B1: [
    { title: 'Stories & experiences', detail: 'Connect ideas with past events and details.', questions: [{ q: 'Choose the connector: “I was tired, ___ I finished.”', options: ['but', 'because', 'or'], answer: 'but' }, { q: 'Which sounds natural?', options: ['I have never tried sushi.', 'I never have try sushi.', 'I never tried have sushi.'], answer: 'I have never tried sushi.' }, { q: 'Complete: “While I was reading, she ___.”', options: ['called', 'call', 'calling'], answer: 'called' }] },
    { title: 'Opinions & reasons', detail: 'Share views, agree politely, and explain why.', questions: [{ q: 'Give an opinion:', options: ['I think it is useful.', 'It think useful.', 'I am think it.'], answer: 'I think it is useful.' }, { q: 'Add a reason:', options: ['because it saves time', 'but it saves time', 'so it saves time'], answer: 'because it saves time' }, { q: 'A polite disagreement is:', options: ['I see your point, but…', 'You are wrong!', 'No. Never.'], answer: 'I see your point, but…' }] },
    { title: 'Work & problem-solving', detail: 'Handle everyday workplace tasks and requests.', questions: [{ q: 'Ask for clarification:', options: ['Could you explain that?', 'Explain you that.', 'You explain?'], answer: 'Could you explain that?' }, { q: 'Complete: “I am responsible ___ this project.”', options: ['for', 'at', 'to'], answer: 'for' }, { q: 'Suggest a solution:', options: ['Why don’t we try again?', 'Why we don’t try?', 'We try why?'], answer: 'Why don’t we try again?' }] }
  ],
  B2: [
    { title: 'Fluent conversations', detail: 'Use natural phrases, nuance, and follow-up questions.', questions: [{ q: 'A natural follow-up is:', options: ['How did that make you feel?', 'How that made feel?', 'What feeling you?'], answer: 'How did that make you feel?' }, { q: 'Choose a nuanced opinion:', options: ['It depends on the situation.', 'It depend situation.', 'Situation depends it.'], answer: 'It depends on the situation.' }, { q: 'Complete: “I would have gone if I ___ known.”', options: ['had', 'have', 'would'], answer: 'had' }] },
    { title: 'Formal communication', detail: 'Write and speak clearly in professional contexts.', questions: [{ q: 'A formal opening is:', options: ['Dear Ms. Lee,', 'Hey you!', 'Hi buddy!'], answer: 'Dear Ms. Lee,' }, { q: 'Request politely:', options: ['I would appreciate your reply.', 'Reply now.', 'You reply me.'], answer: 'I would appreciate your reply.' }, { q: 'Close a formal email:', options: ['Kind regards,', 'See ya!', 'Bye bye!'], answer: 'Kind regards,' }] },
    { title: 'Review & independent English', detail: 'Bring grammar and vocabulary together with confidence.', questions: [{ q: 'Choose the clearest sentence:', options: ['Although it was late, we continued.', 'Although late was, continued we.', 'It late although we.'], answer: 'Although it was late, we continued.' }, { q: 'A strong summary begins:', options: ['Overall, the main idea is…', 'Main idea overall?', 'It is summary.'], answer: 'Overall, the main idea is…' }, { q: 'Choose the natural phrase:', options: ['I look forward to hearing from you.', 'I look forward hear you.', 'I look hearing from you.'], answer: 'I look forward to hearing from you.' }] }
  ]
};
const cefrOrder = ['A1', 'A2', 'B1', 'B2'];
let activeLevel = 'A1';
let activeUnitIndex = 0;
let unitTestIndex = 0;
let unitTestScore = 0;
let unitTestAnswered = false;
const completedUnits = JSON.parse(localStorage.getItem('lingobloom-completed-units') || '[]');
function unitKey(level, index) { return `${level}-${index}`; }
function isUnitUnlocked(level, index) {
  if (index === 0 && level === 'A1') return true;
  if (index > 0) return completedUnits.includes(unitKey(level, index - 1));
  const previousLevel = cefrOrder[cefrOrder.indexOf(level) - 1];
  return previousLevel ? cefrUnits[previousLevel].every((_, unitIndex) => completedUnits.includes(unitKey(previousLevel, unitIndex))) : false;
}
function isLevelUnlocked(level) {
  return level === 'A1' || cefrUnits[cefrOrder[cefrOrder.indexOf(level) - 1]].every((_, index) => completedUnits.includes(unitKey(cefrOrder[cefrOrder.indexOf(level) - 1], index)));
}
function renderLevelPath() {
  const units = cefrUnits[activeLevel];
  const path = document.getElementById('levelPath');
  path.innerHTML = units.map((unit, index) => {
    const complete = completedUnits.includes(unitKey(activeLevel, index));
    const unlocked = isUnitUnlocked(activeLevel, index);
    return `<article class="unit-card ${complete ? 'complete' : ''} ${unlocked ? '' : 'locked'} ${index === activeUnitIndex && unlocked ? 'current' : ''}"><div class="unit-number"><span>UNIT ${index + 1}</span><span>${complete ? '✓ Complete' : unlocked ? '● Ready' : '🔒 Locked'}</span></div><h3>${unit.title}</h3><p>${unit.detail}</p><button type="button" data-unit="${index}" ${unlocked ? '' : 'disabled'}>${complete ? 'Review test' : 'Study & test'} <span>→</span></button></article>`;
  }).join('');
  path.querySelectorAll('button:not(:disabled)').forEach((button) => button.addEventListener('click', () => startUnitTest(Number(button.dataset.unit))));
  const done = units.filter((_, index) => completedUnits.includes(unitKey(activeLevel, index))).length;
  document.getElementById('levelProgressLabel').textContent = `${activeLevel} · ${done} / ${units.length} units`;
  document.querySelectorAll('.level-tab').forEach((tab) => {
    const unlocked = isLevelUnlocked(tab.dataset.level);
    tab.classList.toggle('locked', !unlocked);
    tab.setAttribute('aria-selected', tab.dataset.level === activeLevel ? 'true' : 'false');
  });
}
function startUnitTest(index) {
  activeUnitIndex = index;
  unitTestIndex = 0;
  unitTestScore = 0;
  unitTestAnswered = false;
  document.getElementById('unitTestCard').classList.remove('hidden');
  document.getElementById('unitTestResult').classList.add('hidden');
  renderUnitTestQuestion();
  document.getElementById('unitTestCard').scrollIntoView({ behavior: document.documentElement.classList.contains('reduced-motion') ? 'auto' : 'smooth', block: 'center' });
}
function renderUnitTestQuestion() {
  const unit = cefrUnits[activeLevel][activeUnitIndex];
  const question = unit.questions[unitTestIndex];
  document.getElementById('unitTestLabel').textContent = `${activeLevel} · UNIT ${activeUnitIndex + 1} TEST`;
  document.getElementById('unitTestQuestion').textContent = question.q;
  document.getElementById('unitTestScore').textContent = `${unitTestIndex} / ${unit.questions.length}`;
  document.getElementById('unitTestFeedback').textContent = '';
  document.getElementById('unitTestOptions').innerHTML = question.options.map((option) => `<button type="button" data-answer="${option}">${option}</button>`).join('');
  document.querySelectorAll('#unitTestOptions button').forEach((button) => button.addEventListener('click', () => answerUnitTest(button, question.answer)));
}
function answerUnitTest(button, answer) {
  if (unitTestAnswered) return;
  unitTestAnswered = true;
  const correct = button.dataset.answer === answer;
  if (correct) { unitTestScore += 1; button.classList.add('correct'); }
  else { button.classList.add('wrong'); document.querySelector(`#unitTestOptions button[data-answer="${CSS.escape(answer)}"]`).classList.add('correct'); }
  document.querySelectorAll('#unitTestOptions button').forEach((item) => { item.disabled = true; });
  document.getElementById('unitTestFeedback').textContent = correct ? 'Correct — keep going!' : `The answer is “${answer}”.`;
  setTimeout(() => {
    unitTestIndex += 1;
    unitTestAnswered = false;
    if (unitTestIndex < cefrUnits[activeLevel][activeUnitIndex].questions.length) renderUnitTestQuestion();
    else finishUnitTest();
  }, 650);
}
function finishUnitTest() {
  const passed = unitTestScore >= 2;
  const result = document.getElementById('unitTestResult');
  result.classList.remove('hidden');
  result.innerHTML = passed
    ? `<strong>🎉 Unit complete — ${unitTestScore}/3</strong><small>You passed this checkpoint. The next unit is now unlocked.</small><button type="button" id="unitContinue">Continue path →</button>`
    : `<strong>Keep practicing — ${unitTestScore}/3</strong><small>You need 2 correct answers to pass. Review the unit and try again.</small><button type="button" id="unitRetry">Retry test ↻</button>`;
  if (passed) {
    const key = unitKey(activeLevel, activeUnitIndex);
    if (!completedUnits.includes(key)) completedUnits.push(key);
    localStorage.setItem('lingobloom-completed-units', JSON.stringify(completedUnits));
    renderLevelPath();
    document.getElementById('unitContinue').addEventListener('click', () => { document.getElementById('unitTestCard').classList.add('hidden'); renderLevelPath(); });
  } else document.getElementById('unitRetry').addEventListener('click', () => startUnitTest(activeUnitIndex));
}
document.querySelectorAll('.level-tab').forEach((tab) => tab.addEventListener('click', () => {
  if (!isLevelUnlocked(tab.dataset.level)) return;
  activeLevel = tab.dataset.level;
  activeUnitIndex = 0;
  document.querySelectorAll('.level-tab').forEach((item) => item.classList.toggle('active', item === tab));
  document.getElementById('unitTestCard').classList.add('hidden');
  renderLevelPath();
}));
renderLevelPath();
