const synth = window.speechSynthesis;
let soundOn = true;

function speak(text) {
  if (!soundOn || !('speechSynthesis' in window)) return;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.88;
  synth.speak(utterance);
}

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
