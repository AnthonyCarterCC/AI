const questions = [
  { key: "m365", weight: 2, category: "Microsoft 365", text: "Working inside Microsoft 365: Outlook, Teams, Word, Excel and PowerPoint, and answering from our own files, emails and chats", help: "Rate this highly if your business runs on Microsoft 365 and you want help right where you already work, from catching up on email to building a presentation to finding that policy or quote." },
  { key: "google", category: "Google", text: "Working inside Gmail, Google Docs, Sheets and Meet", help: "Rate this highly if you or your team run on Google Workspace." },
  { key: "writing", category: "Writing", text: "Polished writing that reads like a careful person wrote it", help: "For proposals, policies, board papers and anything with your name on it." },
  { key: "longdocs", category: "Documents", text: "Reading very long documents and pulling out what matters", help: "Contracts, tenders and 100-page reports: the clauses to watch, the numbers to check, the summary." },
  { key: "research", category: "Research", text: "Researching a topic on the web, including today's news, and getting a report with sources", help: "For comparing suppliers, preparing a brief, getting across an unfamiliar topic or keeping up with what is happening this week." },
  { key: "data", category: "Numbers", text: "Analysing spreadsheets, spotting trends and building charts", help: "Drop in a sales or finance spreadsheet and ask what is going on." },
  { key: "coding", category: "Building", text: "Building small tools, scripts or automations without being a developer", help: "A quick calculator, a report that updates itself, or a simple web page for your team." },
  { key: "images", category: "Visuals", text: "Creating images, diagrams and graphics for slides and marketing", help: "Rate the importance of making visuals, not your current skill level." },
  { key: "media", category: "Beyond typing", text: "Working with more than text: talking by voice, and understanding recordings, video, photos of whiteboards and scanned pages", help: "For thinking out loud hands-free, meeting recordings, training videos, photographed notes and paper documents." },
  { key: "easy", category: "Adoption", text: "Easy enough that staff are productive on day one with no training", help: "Think of your least technical team member: could they start straight away?" },
  { key: "cost", category: "Cost", text: "The lowest possible cost per person per month", help: "Rate this highly if budget is the deciding factor. See our AI pricing page for the figures." },
  { key: "heavyuse", category: "How often", text: "Using it heavily all day without running into limits", help: "Rate this highly if people will lean on it constantly. Some tools use their allowance up faster than others." },
  { key: "security", category: "Security", text: "Company data kept private, not used to train AI, with admin controls", help: "For governed adoption across a team, not just personal experimenting." }
];

// Directional capability profiles (1–10), reviewed October 2026 (13 questions).
// Keep these separate from UI code so the comparison can be audited and updated.
const products = {
  ChatGPT: {
    scores: { m365: 6, google: 6, writing: 8, longdocs: 7, research: 8.5, data: 9, coding: 9, images: 10, media: 9, easy: 10, cost: 6, heavyuse: 8, security: 8 },
    summary: "A strong all-round choice when you want one flexible tool for research, creation, analysis, coding and everyday questions.",
    strengths: { images: "strong image creation", media: "excellent voice conversation", easy: "polished, easy to start", data: "strong spreadsheet and data analysis", research: "deep, source-backed research", coding: "strong building tools" },
    url: "https://chatgpt.com/", colour: "#10a37f", initial: "C", logo: "assets/logos/chatgpt.svg"
  },
  Claude: {
    scores: { m365: 6, google: 6, writing: 10, longdocs: 10, research: 7, data: 8, coding: 10, images: 3, media: 5, easy: 9, cost: 6, heavyuse: 5, security: 8 },
    summary: "A particularly good fit for careful writing, long documents, nuanced thinking and collaborative coding or prototype work.",
    strengths: { writing: "careful, natural writing", longdocs: "excellent with very long documents", coding: "strong at building tools and prototypes", data: "capable with spreadsheets and Office files" },
    url: "https://claude.ai/", colour: "#d87955", initial: "C", logo: "assets/logos/claude.svg"
  },
  Gemini: {
    scores: { m365: 4, google: 10, writing: 8, longdocs: 10, research: 8.5, data: 8, coding: 8, images: 9, media: 9.5, easy: 9, cost: 8, heavyuse: 9, security: 8 },
    summary: "A natural match when your work centres on Google, with excellent multimodal, research, mobile and Workspace integration.",
    strengths: { google: "deep Google Workspace integration", longdocs: "handles very long documents", media: "strong video and audio understanding, and excellent mobile and voice use", cost: "included with many Google Workspace plans", heavyuse: "generous allowances for heavy use", research: "Deep Research with broad web access" },
    url: "https://gemini.google.com/", colour: "#527ceb", initial: "G", logo: "assets/logos/gemini.svg"
  },
  Copilot: {
    scores: { m365: 10, google: 3, writing: 7, longdocs: 7, research: 6.5, data: 8, coding: 6, images: 7, media: 7, easy: 8, cost: 7, heavyuse: 8, security: 10 },
    summary: "The clearest fit for organisations invested in Microsoft 365, especially when work already happens in Office, Outlook and Teams.",
    strengths: { m365: "native in Outlook, Teams, Word, Excel and PowerPoint, and searches your own files, emails and chats", security: "strong organisational controls and data protection", heavyuse: "light on allowances for everyday work", cost: "modest add-on cost for existing Microsoft 365 users" },
    url: "https://copilot.microsoft.com/", colour: "#7e57c2", initial: "C", logo: "assets/logos/copilot.svg"
  },
  Grok: {
    scores: { m365: 2, google: 3, writing: 6, longdocs: 6, research: 8.5, data: 5, coding: 6, images: 8, media: 7, easy: 7, cost: 4, heavyuse: 6, security: 5 },
    summary: "A distinctive option if real-time public conversation, emerging news and the X ecosystem matter more than office-suite integration.",
    strengths: { research: "real-time awareness, the X platform and fast exploration of current topics", images: "capable image creation", media: "voice and mobile access" },
    url: "https://grok.com/", colour: "#202020", initial: "G", logo: "assets/logos/grok.svg"
  }
};

let firstRender = true;
const state = { current: 0, answers: {} };
const $ = (selector) => document.querySelector(selector);
const survey = $("#survey");
const results = $("#results");
const ratingGrid = $("#rating-grid");

function showOnly(section, scroll = true) {
  [survey, results].forEach(item => { item.hidden = item !== section; });
  if (scroll) window.scrollTo({ top: 0, behavior: "smooth" });
}

function beginSurvey(scroll = true) {
  state.current = 0;
  state.answers = {};
  showOnly(survey, scroll === true);
  updateLiveChart();
  renderQuestion();
}

function buildLiveChart() {
  $("#live-chart-list").innerHTML = Object.entries(products).map(([name, product]) => `
    <li class="live-product-row" data-product="${name}">
      <div class="live-product-label">
        <span>${name}</span>
        <output aria-label="${name} live fit score">5.0</output>
      </div>
      <div class="live-product-track" aria-hidden="true">
        <span class="live-product-marker" data-logo="${product.logo}" style="left:44.44%; --product-colour:${product.colour}"></span>
      </div>
    </li>`).join("");
  document.querySelectorAll(".live-product-marker").forEach(async marker => {
    const response = await fetch(marker.dataset.logo);
    marker.innerHTML = await response.text();
  });
}

function liveScores() {
  const answered = questions.filter(question => Object.hasOwn(state.answers, question.key));
  return Object.entries(products).map(([name, product]) => {
    if (!answered.length) return { name, score: 5 };
    const movement = answered.reduce((sum, question) => {
      const importance = state.answers[question.key] / 10;
      return sum + (question.weight || 1) * importance * (product.scores[question.key] - 5);
    }, 0) / answered.reduce((sum, question) => sum + (question.weight || 1), 0);
    return { name, score: Math.max(1, Math.min(10, 5 + movement)) };
  });
}

function updateLiveChart() {
  liveScores().forEach(({ name, score }) => {
    const row = document.querySelector(`[data-product="${name}"]`);
    if (!row) return;
    row.querySelector("output").value = score.toFixed(1);
    row.querySelector(".live-product-marker").style.left = `${((score - 1) / 9) * 100}%`;
  });
}

function renderQuestion() {
  const question = questions[state.current];
  $("#question-count").textContent = `Question ${state.current + 1} of ${questions.length}`;
  $("#progress-bar").style.width = `${((state.current + 1) / questions.length) * 100}%`;
  $("#question-category").textContent = question.category;
  $("#survey-title").textContent = question.text;
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
  if (!firstRender) $("#survey-title").focus({ preventScroll: true });
  firstRender = false;
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
  updateLiveChart();
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
  const totalWeight = questions.reduce((sum, question) => sum + state.answers[question.key] * (question.weight || 1), 0);
  return Object.entries(products).map(([name, product]) => {
    const weighted = questions.reduce((sum, question) => sum + state.answers[question.key] * (question.weight || 1) * product.scores[question.key], 0);
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
  $("#winner-logo").style.borderColor = winner.product.colour;
  fetch(winner.product.logo).then(response => response.text()).then(svg => { $("#winner-logo").innerHTML = svg; });
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
  const text = `My Commonsense AI match is ${ranking[0].name} (${ranking[0].score}%). Take the survey at ai.commonsense.com.au/matchmaker.html`;
  navigator.clipboard.writeText(text).then(() => {
    const button = $("#copy-button");
    button.textContent = "Copied!";
    setTimeout(() => { button.textContent = "Copy my result"; }, 1800);
  });
}

$("#restart-button").addEventListener("click", () => beginSurvey());
$("#retake-button").addEventListener("click", () => beginSurvey());
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
buildLiveChart();
beginSurvey(false);
document.querySelectorAll("[data-open-method]").forEach(button => button.addEventListener("click", () => methodDialog.showModal()));
document.querySelectorAll("[data-close-method]").forEach(button => button.addEventListener("click", () => methodDialog.close()));
methodDialog.addEventListener("click", event => { if (event.target === methodDialog) methodDialog.close(); });
$("#year").textContent = new Date().getFullYear();
