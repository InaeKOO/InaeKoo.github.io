# Publish on GitHub Pages

Repository: https://github.com/InaeKOO/InaeKoo.github.io

Expected public site after successful deployment: https://inaekoo.github.io/

The checked-out repository uses **master**. A custom GitHub Actions workflow is included because the existing Jekyll site uses `jekyll-tagging`, a custom plugin. The workflow installs the Gemfile dependencies, builds the entire site, and deploys the generated `_site` directory.

## 1. Enable GitHub Actions as the Pages source

Open the repository, then **Settings → Pages → Build and deployment → Source → GitHub Actions**.

Direct settings link: https://github.com/InaeKOO/InaeKoo.github.io/settings/pages

If the environment `github-pages` has deployment branch restrictions, allow `master` under **Settings → Environments → github-pages**.

## 2. Upload the changes

Recommended with GitHub Desktop:

1. Sign in to GitHub Desktop and clone `InaeKOO/InaeKoo.github.io`.
2. Check out `master` and fetch/pull any latest changes before copying the redesign.
3. Extract `Inhoe-Koo-homepage.zip`. Copy the **contents inside `homepage`** into the cloned repository root. `index.html` and `_config.yml` must be at the repository root, not inside an extra `homepage` folder.
4. Include `.github/workflows/pages.yml`; dot-prefixed folders can be hidden in some file browsers.
5. Review the changed files, commit with a message such as `Update research portfolio and vision`, and click **Push origin**.

For the browser editor, upload the changed files at the repository root. If the uploader skips `.github`, create `.github/workflows/pages.yml` explicitly with **Add file → Create new file**, using the included workflow text. Commit the change to `master`.

The changed files are `index.html`, `assets/orbit/`, `_pages/about.md`, `_layouts/orbit.html`, `_layouts/page.html`, `_layouts/post.html`, `_config.yml`, `Gemfile`, `.github/workflows/pages.yml`, `REDESIGN.md`, and `DEPLOYMENT.md`.

## 3. Watch the deployment

Open **Actions → Deploy homepage to GitHub Pages**. Pushing to `master` starts the workflow. If needed, select **Run workflow → master** to run it manually.

Wait for both **build** and **deploy** to succeed. The deployment job publishes the generated site to the `github-pages` environment and reports its URL.

## 4. Check the live website

Open https://inaekoo.github.io/ and test:

- All six orbit menus, especially Vision & goals.
- The three research cards and paper links.
- https://inaekoo.github.io/#goals and https://inaekoo.github.io/about/.
- A mobile viewport and keyboard navigation.

If the old page remains after a successful deployment, refresh with Ctrl+F5 or open a private window.

## Troubleshooting

- **No workflow run:** confirm the workflow file is on `master`, Actions are enabled, and Source is GitHub Actions.
- **404 / site unavailable during Configure Pages:** set the Pages source before rerunning the workflow.
- **Environment protection failure:** allow `master` to deploy to `github-pages`.
- **Build failure:** open the first failed step in Actions. The build step runs `bundle exec jekyll build --trace` to expose the actual error. The local environment did not have Ruby, so the first full Jekyll build is performed here.
- **Raw Liquid syntax or Markdown:** the source files were published directly instead of the generated `_site` artifact. Use the included build workflow; do not add `.nojekyll` to bypass the build.
- **Wrong folder:** ensure the repository root contains `index.html`, `_config.yml`, and `Gemfile`.

Future pushes to `master` rebuild and redeploy the site automatically. These instructions and local files do not change repository settings or publish anything by themselves.

## Official references

- [Configure a Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [Use custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Jekyll with GitHub Actions and custom plugins](https://jekyllrb.com/docs/continuous-integration/github-actions/)
