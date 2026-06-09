const WORKER_URL = 'https://aryan-portfolio-proxy.sageofninetale.workers.dev';

const QUICK_CHIPS = [
  { emoji: '🏥', label: 'What is Cascade AI?' },
  { emoji: '🚀', label: 'What has he built?' },
  { emoji: '💼', label: 'Should I hire him?' },
  { emoji: '🌟', label: 'What makes him different?' },
];

const FOLLOW_UP_SETS = [
  ['🔍 How does Cascade work?', '🚀 Other projects?'],
  ['💼 Should I hire him?', '🌟 What drives him?'],
  ['🏥 His healthcare vision?', '⚡ Most impressive project?'],
  ['🤝 How to contact him?', '🎯 What is he building now?'],
];
let followUpIndex = 0;

let messageHistory = [];
let isOpen = false;
let isSpeaking = false;
let recognition = null;

function buildWidget() {
  const widget = document.createElement('div');
  widget.id = 'ask-aryan-widget';
  widget.innerHTML = `
    <button id="chat-toggle-btn" aria-label="Ask Aryan">
      <span class="chat-toggle-avatar">AS</span>
      <span class="chat-toggle-label">Ask Aryan</span>
    </button>

    <div id="chat-panel" aria-hidden="true">
      <div class="chat-header">
        <div class="chat-avatar-circle">AS</div>
        <div class="chat-header-info">
          <span class="chat-header-name">Aryan Subhash</span>
          <span class="chat-header-sub">Ask me anything</span>
        </div>
        <button class="chat-close-btn" aria-label="Close chat">✕</button>
      </div>

      <div class="chat-messages" id="chat-messages">
        <div class="chat-msg assistant">
          <p>Hey! I'm Aryan's AI. He built Cascade AI, got recognised by Microsoft and Anthropic, personally met Boris (the creator of Claude Code) at their London event and even got a selfie (scroll down to the Event section 📸). Ask me anything 👋</p>
          <button class="speak-btn" aria-label="Read aloud">🔊</button>
        </div>
        <div class="chat-chips" id="chat-chips">
          ${QUICK_CHIPS.map(c => `<button class="chip-btn">${c.emoji} ${c.label}</button>`).join('')}
        </div>
      </div>

      <div class="chat-input-bar">
        <input id="chat-input" type="text" placeholder="Ask anything..." autocomplete="off" maxlength="300" />
        <button id="mic-btn" aria-label="Voice input" title="Speak your question">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <rect x="9" y="2" width="6" height="12" rx="3"/>
            <path d="M5 10a7 7 0 0 0 14 0M12 19v3M9 22h6"/>
          </svg>
        </button>
        <button id="send-btn" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);
  attachEvents();
}

function attachEvents() {
  const toggleBtn  = document.getElementById('chat-toggle-btn');
  const panel      = document.getElementById('chat-panel');
  const closeBtn   = panel.querySelector('.chat-close-btn');
  const input      = document.getElementById('chat-input');
  const sendBtn    = document.getElementById('send-btn');
  const micBtn     = document.getElementById('mic-btn');
  const chipsContainer = document.getElementById('chat-chips');

  toggleBtn.addEventListener('click', () => togglePanel());
  closeBtn.addEventListener('click', () => togglePanel(false));

  sendBtn.addEventListener('click', () => handleSend());
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } });

  chipsContainer.addEventListener('click', e => {
    const chip = e.target.closest('.chip-btn');
    if (chip) handleSend(chip.textContent.trim().replace(/^[^\w]+/, '').trim());
  });

  document.getElementById('chat-messages').addEventListener('click', e => {
    const btn = e.target.closest('.speak-btn');
    if (btn) {
      const text = btn.parentElement.querySelector('p')?.textContent;
      if (text) speakText(text, btn);
    }
  });

  setupVoiceInput(micBtn, input);
}

function togglePanel(forceOpen) {
  const panel = document.getElementById('chat-panel');
  const btn   = document.getElementById('chat-toggle-btn');
  isOpen = forceOpen !== undefined ? forceOpen : !isOpen;
  panel.classList.toggle('open', isOpen);
  panel.setAttribute('aria-hidden', String(!isOpen));
  btn.classList.toggle('active', isOpen);
  if (isOpen) document.getElementById('chat-input').focus();
}

async function handleSend(overrideText) {
  const input = document.getElementById('chat-input');
  const text = (overrideText || input.value).trim();
  if (!text) return;

  input.value = '';
  hideChips();
  appendMessage('user', text);
  messageHistory.push({ role: 'user', content: text });

  const typingId = showTyping();

  try {
    const res = await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: messageHistory }),
    });

    const data = await res.json();
    removeTyping(typingId);

    if (data.content && data.content[0]?.text) {
      const reply = data.content[0].text;
      messageHistory.push({ role: 'assistant', content: reply });
      appendMessage('assistant', reply, true);
      appendFollowUpChips();
    } else {
      appendMessage('assistant', "Hmm, something went wrong on my end. Try again in a moment!", false);
    }
  } catch {
    removeTyping(typingId);
    appendMessage('assistant', "I can't connect right now — try refreshing or reach out directly via the Contact section.", false);
  }
}

function appendFollowUpChips() {
  const container = document.getElementById('chat-messages');
  const set = FOLLOW_UP_SETS[followUpIndex % FOLLOW_UP_SETS.length];
  followUpIndex++;
  const div = document.createElement('div');
  div.className = 'chat-chips follow-up-chips';
  div.innerHTML = set.map(label => `<button class="chip-btn follow-chip">${label}</button>`).join('');
  div.addEventListener('click', e => {
    const chip = e.target.closest('.chip-btn');
    if (chip) { div.remove(); handleSend(chip.textContent.replace(/^[^\w]+/, '').trim()); }
  });
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendMessage(role, text, showSpeak = false) {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<p>${escapeHtml(text)}</p>${showSpeak ? '<button class="speak-btn" aria-label="Read aloud">🔊</button>' : ''}`;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function showTyping() {
  const container = document.getElementById('chat-messages');
  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.className = 'chat-msg assistant typing-indicator';
  div.id = id;
  div.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTyping(id) {
  document.getElementById(id)?.remove();
}

function hideChips() {
  const chips = document.getElementById('chat-chips');
  if (chips) chips.style.display = 'none';
}

function speakText(text, btn) {
  if (isSpeaking) { speechSynthesis.cancel(); isSpeaking = false; btn.textContent = '🔊'; return; }
  const utt = new SpeechSynthesisUtterance(text);
  utt.rate = 1.05;
  utt.pitch = 1;
  utt.onstart = () => { isSpeaking = true; btn.textContent = '⏹'; };
  utt.onend = () => { isSpeaking = false; btn.textContent = '🔊'; };
  speechSynthesis.speak(utt);
}

function setupVoiceInput(micBtn, input) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) { micBtn.style.display = 'none'; return; }

  recognition = new SpeechRecognition();
  recognition.lang = 'en-GB';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = e => {
    input.value = e.results[0][0].transcript;
    micBtn.classList.remove('mic-active');
  };
  recognition.onend = () => micBtn.classList.remove('mic-active');
  recognition.onerror = () => micBtn.classList.remove('mic-active');

  micBtn.addEventListener('click', () => {
    if (micBtn.classList.contains('mic-active')) {
      recognition.stop();
    } else {
      recognition.start();
      micBtn.classList.add('mic-active');
    }
  });
}

function escapeHtml(text) {
  return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', buildWidget);
