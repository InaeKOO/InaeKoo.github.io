# Publish on GitHub Pages

Repository: https://github.com/InaeKOO/InaeKoo.github.io

Expected public site after successful deployment: https://inaekoo.github.io/

The checked-out repository uses **master**. A GitHub Actions workflow is included to build the homepage together with the existing Jekyll articles and About page. The workflow installs the Gemfile dependencies, builds the entire site, and deploys the generated `_site` directory.

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
5. Remove the obsolete files listed below from the old checkout. Review the additions, edits, and deletions, commit with a message such as `Refine portrait and typography; remove unused theme`, and click **Push origin**.

For the browser editor, upload the changed files at the repository root. If the uploader skips `.github`, create `.github/workflows/pages.yml` explicitly with **Add file → Create new file**, using the included workflow text. Commit the change to `master`.

### Remove obsolete files from an older checkout

The ZIP contains the clean source tree. Copying it over an old checkout will not delete the old files automatically. In GitHub Desktop, use **Repository → Show in Explorer**, then remove these paths from that repository only:

- Folders: `_includes/`, `_sass/`, `_data/`, and `js/`.
- Files: `_layouts/default.html`, `_layouts/tag_page.html`, `search.json`, `favicon.png`, and `REDESIGN.md` (if present).
- In `images/`, keep only `InhoeKoo.jpg`, `Adaptive.png`, `QFlowNet-schematic.png`, and `QFlowNet schematic.pdf`. The removed files are the old theme's numbered demo images, old logos, and preview screenshots.

Retain `.git/`, `.github/`, `_posts/`, and `_pages/`. Review any newer files you added yourself before deleting them. The active layouts are `orbit.html`, `page.html`, and `post.html`.

The site no longer uses the legacy search, pagination, or generated tag pages. The two original research articles and the standalone About page remain available at their existing URLs.

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
- [Jekyll with GitHub Actions](https://jekyllrb.com/docs/continuous-integration/github-actions/)
