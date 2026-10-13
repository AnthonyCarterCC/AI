const questions = [
  { key: "easy", category: "Everyday fit", text: "A simple, polished all-rounder that is easy to start using", help: "Think quick questions, drafting, brainstorming and a smooth day-to-day experience." },
  { key: "microsoft", category: "Your ecosystem", text: "Working directly with Word, Excel, PowerPoint, Outlook and Teams", help: "Rate this highly if Microsoft 365 is where most of your work already lives." },
  { key: "google", category: "Your ecosystem", text: "Working closely with Gmail, Drive, Docs, Sheets and other Google services", help: "Rate this highly if you or your team run primarily on Google Workspace." },
  { key: "writing", category: "Thinking & creating", text: "Thoughtful writing, editing and making sense of long documents", help: "For reports, proposals, policies, analysis and careful communication." },
  { key: "research", category: "Research", text: "In-depth web research with useful sources and up-to-date information", help: "For comparing options, preparing briefs and investigating unfamiliar topics." },
  { key: "coding", category: "Building", text: "Coding, debugging and turning an idea into a working tool", help: "This includes help for non-developers as well as experienced technical teams." },
  { key: "media", category: "Creative work", text: "Creating and understanding images, audio, video or visual content", help: "Rate the importance of working beyond text—not your current skill level." },
  { key: "live", category: "What’s happening now", text: "A strong pulse on breaking news, public conversation and what’s trending", help: "Especially relevant if real-time discussion and the X platform matter to your work." },
  { key: "voice", category: "How you interact", text: "Natural voice conversations and useful mobile access", help: "For hands-free use, thinking out loud, accessibility and work on the move." },
  { key: "business", category: "Business readiness", text: "Business controls, privacy options and fit with the tools my team already pays for", help: "For governed workplace adoption—not just personal experimentation." }
];

// Directional capability profiles (1–10), reviewed October 2026.
// Keep these separate from UI code so the comparison can be audited and updated.
const products = {
  ChatGPT: {
    scores: { easy: 10, microsoft: 6, google: 7, writing: 9, research: 10, coding: 10, media: 10, live: 8, voice: 10, business: 9 },
    summary: "A strong all-round choice when you want one flexible assistant for research, creation, analysis, coding and conversation.",
    strengths: { easy: "polished all-round experience", research: "deep, source-backed research", coding: "strong building and coding tools", media: "broad image and file capabilities", voice: "natural voice interaction", business: "mature team and business options" },
    url: "https://chatgpt.com/", colour: "#10a37f", initial: "C"
  },
  Claude: {
    scores: { easy: 9, microsoft: 5, google: 7, writing: 10, research: 9, coding: 10, media: 6, live: 7, voice: 7, business: 9 },
    summary: "A particularly good fit for careful writing, long documents, nuanced thinking and collaborative coding or prototype work.",
    strengths: { writing: "careful long-form writing and document work", coding: "strong coding and interactive Artifacts", research: "research with clear synthesis", business: "useful project knowledge and team controls", easy: "calm, focused conversational experience" },
    url: "https://claude.ai/", colour: "#d87955", initial: "C"
  },
  Gemini: {
    scores: { easy: 9, microsoft: 4, google: 10, writing: 8, research: 10, coding: 9, media: 10, live: 9, voice: 10, business: 9 },
    summary: "A natural match when your work centres on Google, with excellent multimodal, research, mobile and Workspace integration.",
    strengths: { google: "deep Google Workspace integration", research: "Deep Research and broad web access", media: "strong image, audio and video workflows", voice: "excellent mobile and live interaction", business: "enterprise options within Workspace" },
    url: "https://gemini.google.com/", colour: "#527ceb", initial: "G"
  },
  Copilot: {
    scores: { easy: 8, microsoft: 10, google: 3, writing: 8, research: 8, coding: 8, media: 8, live: 8, voice: 8, business: 10 },
    summary: "The clearest fit for organisations invested in Microsoft 365, especially when work already happens in Office, Outlook and Teams.",
    strengths: { microsoft: "native Microsoft 365 fit", business: "strong organisational controls and Microsoft Graph context", writing: "assistance inside familiar Office workflows", research: "web-grounded research and workplace search", voice: "voice access across Copilot experiences" },
    url: "https://copilot.microsoft.com/", colour: "#7e57c2", initial: "C"
  },
  Grok: {
    scores: { easy: 8, microsoft: 3, google: 4, writing: 7, research: 8, coding: 8, media: 9, live: 10, voice: 8, business: 6 },
    summary: "A distinctive option if real-time public conversation, emerging news and the X ecosystem matter more than office-suite integration.",
    strengths: { live: "real-time awareness and the X ecosystem", media: "capable visual and multimodal tools", research: "fast exploration of current topics", voice: "conversational mobile access", coding: "solid technical problem-solving" },
    url: "https://grok.com/", colour: "#202020", initial: "G"
  }
};

const state = { current: 0, answers: {} };
const $ = (selector) => document.querySelector(selector);
const intro = $("#intro");
const survey = $("#survey");
const results = $("#results");
const ratingGrid = $("#rating-grid");

function showOnly(section) {
  [intro, survey, results].forEach(item => { item.hidden = item !== section; });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function beginSurvey() {
  state.current = 0;
  state.answers = {};
  showOnly(survey);
  renderQuestion();
}

function renderQuestion() {
  const question = questions[state.current];
  $("#question-count").textContent = `Question ${state.current + 1} of ${questions.length}`;
  $("#progress-bar").style.width = `${((state.current + 1) / questions.length) * 100}%`;
  $("#question-category").textContent = question.category;
  $("#question-text").textContent = question.text;
  $("#question-help").textContent = question.help;
  $("#back-button").style.visibility = state.current === 0 ? "hidden" : "visible";
  $("#next-button").textContent = state.current === questions.length - 1 ? "See my result →" : "Next →";

  ratingGrid.innerHTML = "";
  for (let value = 1; value <= 10; value += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rating-button";
    button.textContent = value;
    button.setAttribute("aria-label", `${value} out of 10`);
    button.setAttribute("aria-pressed", state.answers[question.key] === value ? "true" : "false");
    if (state.answers[question.key] === value) button.classList.add("selected");
    button.addEventListener("click", () => selectRating(value));
    ratingGrid.appendChild(button);
  }
  $("#next-button").disabled = !state.answers[question.key];
  $("#survey-title").focus({ preventScroll: true });
}

function selectRating(value) {
  const key = questions[state.current].key;
  state.answers[key] = value;
  [...ratingGrid.children].forEach((button, index) => {
    const selected = index + 1 === value;
    button.classList.toggle("selected", selected);
    button.setAttribute("aria-pressed", selected ? "true" : "false");
  });
  $("#next-button").disabled = false;
}

function nextQuestion() {
  if (!state.answers[questions[state.current].key]) return;
  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function calculateResults() {
  const totalWeight = Object.values(state.answers).reduce((sum, value) => sum + value, 0);
  return Object.entries(products).map(([name, product]) => {
    const weighted = questions.reduce((sum, question) => sum + state.answers[question.key] * product.scores[question.key], 0);
    return { name, product, raw: weighted / totalWeight, score: Math.round((weighted / totalWeight) * 10) };
  }).sort((a, b) => b.raw - a.raw);
}

function bestReasons(product) {
  return questions
    .filter(question => product.strengths[question.key])
    .map(question => ({ text: product.strengths[question.key], impact: state.answers[question.key] * product.scores[question.key] }))
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 3)
    .map(item => item.text);
}

function showResults() {
  const ranked = calculateResults();
  const winner = ranked[0];
  $("#winner-name").textContent = winner.name;
  $("#winner-summary").textContent = winner.product.summary;
  $("#winner-score").textContent = winner.score;
  $("#winner-logo").textContent = winner.product.initial;
  $("#winner-logo").style.background = winner.product.colour;
  $("#winner-link").href = winner.product.url;
  $("#winner-link-name").textContent = winner.name;
  $("#winner-reasons").innerHTML = bestReasons(winner.product).map(reason => `<li>${reason}</li>`).join("");

  $("#ranking-list").innerHTML = ranked.map((item, index) => `
    <li class="ranking-item">
      <span class="rank-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="rank-name">${item.name}</span>
      <span class="rank-track" aria-hidden="true"><span style="width:${item.score}%"></span></span>
      <span class="rank-score">${item.score}%</span>
    </li>`).join("");

  showOnly(results);
  $("#result-title").focus({ preventScroll: true });
}

function copyResult() {
  const ranking = calculateResults();
  const text = `My Common Sense AI match is ${ranking[0].name} (${ranking[0].score}%). Take the survey at ai.commonsense.com.au`;
  navigator.clipboard.writeText(text).then(() => {
    const button = $("#copy-button");
    button.textContent = "Copied!";
    setTimeout(() => { button.textContent = "Copy my result"; }, 1800);
  });
}

$("#start-button").addEventListener("click", beginSurvey);
$("#header-survey-button").addEventListener("click", beginSurvey);
$("#restart-button").addEventListener("click", beginSurvey);
$("#retake-button").addEventListener("click", beginSurvey);
$("#next-button").addEventListener("click", nextQuestion);
$("#back-button").addEventListener("click", () => { if (state.current > 0) { state.current -= 1; renderQuestion(); } });
$("#copy-button").addEventListener("click", copyResult);
document.addEventListener("keydown", event => {
  if (survey.hidden) return;
  if (event.key >= "1" && event.key <= "9") selectRating(Number(event.key));
  if (event.key === "0") selectRating(10);
  if (event.key === "Enter" && !$("#next-button").disabled) nextQuestion();
});

const methodDialog = $("#method-dialog");
document.querySelectorAll("[data-open-method]").forEach(button => button.addEventListener("click", () => methodDialog.showModal()));
document.querySelectorAll("[data-close-method]").forEach(button => button.addEventListener("click", () => methodDialog.close()));
methodDialog.addEventListener("click", event => { if (event.target === methodDialog) methodDialog.close(); });
$("#year").textContent = new Date().getFullYear();
