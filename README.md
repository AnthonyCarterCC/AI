# Commonsense AI Portal

A growing portal for practical AI tools, training, prompt packs, downloadable resources and business guidance. The first live tool is a private, browser-only survey on its own `matchmaker.html` page that recommends one of five general-purpose AI assistants based on the user's priorities. The homepage also links to curated external training resources.

## Run locally

No build step or dependencies are required. Serve the folder with any static web server, for example:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Deploy to GitHub Pages

1. Create a public GitHub repository and add these files to its default branch.
2. In **Settings → Pages**, choose **Deploy from a branch**, then select the default branch and `/ (root)`.
3. The included `CNAME` file configures `ai.commonsense.com.au` as the custom domain.
4. At the DNS provider for `commonsense.com.au`, add a `CNAME` record named `ai` pointing to `<github-username>.github.io`.
5. Return to GitHub Pages settings, confirm the custom domain, then enable **Enforce HTTPS** after DNS is active.

## Updating the comparison

The survey questions and product capability profiles live near the top of `app.js`. Scores are directional ratings from 1–10. Review them regularly because features, plans and limits change frequently.

The result is calculated as a weighted average:

```text
sum(user importance × product capability) ÷ sum(user importance)
```

No survey answers leave the user's browser.
