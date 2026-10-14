# Commonsense AI Portal

A growing portal for practical AI tools, training, prompt packs, downloadable resources and business guidance. The first live tool is a private, browser-only survey on its own `matchmaker.html` page that recommends one of five general-purpose AI tools based on the user's priorities. The homepage also links to curated external training resources.

## Run locally

No build step or dependencies are required. Serve the folder with any static web server, for example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Hosting and deployment

Source lives on GitHub (`AnthonyCarterCC/AI`, `main` branch) and is served at `ai.commonsense.com.au` through Cloudflare, the same way as the main Commonsense website. Pushing to `main` publishes the change.

1. Edit and test locally.
2. Commit to `main` and push.
3. Wait for the Cloudflare deployment to finish.
4. Refresh and check the homepage, Matchmaker and privacy notice on the live domain.

`CNAME` is left over from the original GitHub Pages setup and is harmless. `robots.txt` and `sitemap.xml` use the `.html` URLs the site currently serves, so update both if that changes.

## Theme

The site's theme is **Human judgement. AI capability.** AI is presented as a tool that works for people, never as a colleague, assistant or companion. Keep new copy consistent with that: lead with what the person can do, and avoid wording that gives AI human traits.

## Updating the comparison

The survey questions and product capability profiles live near the top of `app.js`. Scores are directional ratings from 1–10. Review them regularly because features, plans and limits change frequently.

The result is calculated as a weighted average:

```text
sum(user importance × product capability) ÷ sum(user importance)
```

No survey answers leave the user's browser.
