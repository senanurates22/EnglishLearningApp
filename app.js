const synth = window.speechSynthesis;
let soundOn = true;
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
  utterance.rate = 0.88;
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
