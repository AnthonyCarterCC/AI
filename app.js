const questions = [
  { key: "outlook", category: "Microsoft 365", text: "Catching up on emails and meetings, and drafting replies, inside Outlook and Teams", help: "Rate this highly if your day lives in Outlook and Teams and you want help right where you already work." },
  { key: "officefiles", category: "Microsoft 365", text: "Building and fixing Word, Excel and PowerPoint files from a simple request", help: "For turning notes into a presentation, cleaning up a spreadsheet or tidying a long Word document." },
  { key: "companydata", category: "Microsoft 365", text: "Answering questions from our own company files, emails and chats", help: "For finding that policy, quote or conversation without digging through SharePoint and your inbox." },
  { key: "google", category: "Google", text: "Working inside Gmail, Google Docs, Sheets and Meet", help: "Rate this highly if you or your team run on Google Workspace." },
  { key: "writing", category: "Writing", text: "Polished writing that reads like a careful person wrote it", help: "For proposals, policies, board papers and anything with your name on it." },
  { key: "longdocs", category: "Documents", text: "Reading very long documents and pulling out what matters", help: "Contracts, tenders and 100-page reports: the clauses to watch, the numbers to check, the summary." },
  { key: "research", category: "Research", text: "Researching a topic on the web and getting a report with sources", help: "For comparing suppliers, preparing a brief or getting across an unfamiliar topic." },
  { key: "current", category: "Current events", text: "Up-to-the-minute news and what people are talking about today", help: "For work where this morning's headlines and public conversation really matter." },
  { key: "data", category: "Numbers", text: "Analysing spreadsheets, spotting trends and building charts", help: "Drop in a sales or finance spreadsheet and ask what is going on." },
  { key: "coding", category: "Building", text: "Building small tools, scripts or automations without being a developer", help: "A quick calculator, a report that updates itself, or a simple web page for your team." },
  { key: "images", category: "Visuals", text: "Creating images, diagrams and graphics for slides and marketing", help: "Rate the importance of making visuals, not your current skill level." },
  { key: "media", category: "Audio and video", text: "Understanding recordings, video, photos of whiteboards and scanned pages", help: "For meeting recordings, training videos, photographed notes and paper documents." },
  { key: "voice", category: "On the move", text: "Talking to it by voice on a phone, hands-free", help: "For thinking out loud, driving, walking between meetings or accessibility." },
  { key: "easy", category: "Adoption", text: "Easy enough that staff are productive on day one with no training", help: "Think of your least technical team member: could they start straight away?" },
  { key: "cost", category: "Cost", text: "The lowest possible cost per person per month", help: "Rate this highly if budget is the deciding factor. See our AI pricing page for the figures." },
  { key: "heavyuse", category: "How often", text: "Using it heavily all day without running into limits", help: "Rate this highly if people will lean on it constantly. Some tools use their allowance up faster than others." },
  { key: "security", category: "Security", text: "Company data kept private, not used to train AI, with admin controls", help: "For governed adoption across a team, not just personal experimenting." },
  { key: "teamwork", category: "Teamwork", text: "Sharing prompts, projects and knowledge across the team", help: "For a shared library of what works, so everyone does not start from scratch." },
  { key: "agents", category: "Automation", text: "Having AI carry out multi-step jobs for me, such as collecting, checking, filling in and sending", help: "Rate this highly if you want it to do the legwork, not just answer questions." },
  { key: "accuracy", category: "Accuracy", text: "Preferring “I’m not sure” to a confident guess", help: "For work where a made-up answer would be costly, so you want a tool that admits doubt." }
];

// Directional capability profiles (1–10), reviewed October 2026 (20 questions).
// Keep these separate from UI code so the comparison can be audited and updated.
const products = {
  ChatGPT: {
    scores: { outlook: 5, officefiles: 8, companydata: 5, google: 6, writing: 8, longdocs: 7, research: 9, current: 8, data: 9, coding: 9, images: 10, media: 8, voice: 10, easy: 10, cost: 6, heavyuse: 8, security: 8, teamwork: 8, agents: 9, accuracy: 7 },
    summary: "A strong all-round choice when you want one flexible tool for research, creation, analysis, coding and everyday questions.",
    strengths: { images: "strong image creation", voice: "excellent voice conversation", easy: "polished, easy to start", data: "strong spreadsheet and data analysis", research: "deep, source-backed research", agents: "capable multi-step task agents", coding: "strong building tools" },
    url: "https://chatgpt.com/", colour: "#10a37f", initial: "C", logo: "assets/logos/chatgpt.svg"
  },
  Claude: {
    scores: { outlook: 5, officefiles: 9, companydata: 5, google: 6, writing: 10, longdocs: 10, research: 8, current: 6, data: 8, coding: 10, images: 3, media: 4, voice: 6, easy: 9, cost: 6, heavyuse: 5, security: 8, teamwork: 8, agents: 8, accuracy: 10 },
    summary: "A particularly good fit for careful writing, long documents, nuanced thinking and collaborative coding or prototype work.",
    strengths: { writing: "careful, natural writing", longdocs: "excellent with very long documents", accuracy: "more willing to say it is unsure", coding: "strong at building tools and prototypes", officefiles: "good at Word, Excel and PowerPoint files", teamwork: "shared Projects for teams" },
    url: "https://claude.ai/", colour: "#d87955", initial: "C", logo: "assets/logos/claude.svg"
  },
  Gemini: {
    scores: { outlook: 3, officefiles: 6, companydata: 4, google: 10, writing: 8, longdocs: 10, research: 9, current: 8, data: 8, coding: 8, images: 9, media: 10, voice: 9, easy: 9, cost: 8, heavyuse: 9, security: 8, teamwork: 7, agents: 8, accuracy: 7 },
    summary: "A natural match when your work centres on Google, with excellent multimodal, research, mobile and Workspace integration.",
    strengths: { google: "deep Google Workspace integration", longdocs: "handles very long documents", media: "strong video and audio understanding", cost: "included with many Google Workspace plans", heavyuse: "generous allowances for heavy use", voice: "excellent mobile and voice use", research: "Deep Research with broad web access" },
    url: "https://gemini.google.com/", colour: "#527ceb", initial: "G", logo: "assets/logos/gemini.svg"
  },
  Copilot: {
    scores: { outlook: 10, officefiles: 9, companydata: 10, google: 3, writing: 7, longdocs: 7, research: 7, current: 6, data: 8, coding: 6, images: 7, media: 7, voice: 7, easy: 8, cost: 7, heavyuse: 8, security: 10, teamwork: 6, agents: 7, accuracy: 7 },
    summary: "The clearest fit for organisations invested in Microsoft 365, especially when work already happens in Office, Outlook and Teams.",
    strengths: { outlook: "native in Outlook and Teams", companydata: "searches your own Microsoft 365 files, emails and chats", security: "strong organisational controls and data protection", officefiles: "works inside Word, Excel and PowerPoint", heavyuse: "light on allowances for everyday work", cost: "modest add-on cost for existing Microsoft 365 users" },
    url: "https://copilot.microsoft.com/", colour: "#7e57c2", initial: "C", logo: "assets/logos/copilot.svg"
  },
  Grok: {
    scores: { outlook: 2, officefiles: 3, companydata: 2, google: 3, writing: 6, longdocs: 6, research: 7, current: 10, data: 5, coding: 6, images: 8, media: 6, voice: 8, easy: 7, cost: 4, heavyuse: 6, security: 5, teamwork: 4, agents: 6, accuracy: 5 },
    summary: "A distinctive option if real-time public conversation, emerging news and the X ecosystem matter more than office-suite integration.",
    strengths: { current: "real-time awareness and the X platform", images: "capable image creation", voice: "voice and mobile access", research: "fast exploration of current topics" },
    url: "https://grok.com/", colour: "#202020", initial: "G", logo: "assets/logos/grok.svg"
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
      return sum + importance * (product.scores[question.key] - 5);
    }, 0) / answered.length;
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

$("#start-button").addEventListener("click", beginSurvey);
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
buildLiveChart();
document.querySelectorAll("[data-open-method]").forEach(button => button.addEventListener("click", () => methodDialog.showModal()));
document.querySelectorAll("[data-close-method]").forEach(button => button.addEventListener("click", () => methodDialog.close()));
methodDialog.addEventListener("click", event => { if (event.target === methodDialog) methodDialog.close(); });
$("#year").textContent = new Date().getFullYear();
