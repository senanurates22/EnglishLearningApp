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
  }
};

function updateLanguage(language) {
  const copy = translations[language] || translations.tr;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    if (copy[key]) element.textContent = copy[key];
  });
  document.querySelectorAll('.vocab-card').forEach((card) => {
    const translation = card.dataset[`translation${language === 'tr' ? 'Tr' : 'Es'}`];
    if (translation) card.querySelector('.translation').textContent = translation;
  });
  document.documentElement.lang = language;
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

const quizFeedback = document.querySelector('.quiz-feedback');
document.querySelectorAll('.quiz-options button').forEach((option) => {
  option.addEventListener('click', () => {
    document.querySelectorAll('.quiz-options button').forEach((item) => item.classList.remove('correct', 'wrong', 'selected'));
    const correct = option.dataset.correct === 'true';
    option.classList.add(correct ? 'correct' : 'wrong');
    quizFeedback.textContent = correct ? 'That’s right! Great job.' : 'Almost! Try “Hello”.';
    quizFeedback.style.color = correct ? '#328560' : '#c4615b';
    if (correct) speak('Hello');
  });
});

document.getElementById('nextConversation').addEventListener('click', (event) => {
  document.querySelector('.next-message').classList.remove('hidden');
  event.currentTarget.innerHTML = 'Great job! <span>✓</span>';
  event.currentTarget.disabled = true;
  speak('Nice to meet you, Alex!');
});

document.getElementById('shuffleWords').addEventListener('click', () => {
  const cards = [...document.querySelectorAll('.vocab-card')];
  const grid = document.querySelector('.vocab-grid');
  cards.reverse().forEach((card) => grid.appendChild(card));
});
