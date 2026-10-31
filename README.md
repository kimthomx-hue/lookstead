# lookstead.com (GitHub Pages)

Static marketing site for Lookstead.

## Website-only GitHub repo (recommended)

The Expo app stays **local** (or in a **private** repo later). This site lives in its **own public** repo so you never upload app source to GitHub.

### 1. Create an empty repo on GitHub

- [github.com/new](https://github.com/new)
- Name: e.g. **`lookstead.com`** or **`lookstead-website`**
- **Public** (Pages is simplest on public repos)
- **Do not** add README, .gitignore, or license (empty repo)

### 2. Copy site files into a new folder (one-time)

From PowerShell (adjust paths if needed):

```powershell
$dest = "$env:USERPROFILE\Projects\lookstead.com"
New-Item -ItemType Directory -Force -Path $dest
Copy-Item -Recurse -Force "C:\Users\Kim\Projects\lifelens\website\*" $dest

New-Item -ItemType Directory -Force -Path "$dest\.github\workflows"
Copy-Item "C:\Users\Kim\Projects\lifelens\website\github-pages-workflow.yml" "$dest\.github\workflows\deploy.yml"
```

Your **`lookstead.com`** folder should look like:

```text
lookstead.com/
  .github/workflows/deploy.yml
  index.html
  styles.css
  main.js
  CNAME
  assets/
  privacy.html
  terms.html
  help.html
```

(`github-pages-workflow.yml` is only a template — it is not deployed.)

### 3. Push only that folder

```powershell
cd $env:USERPROFILE\Projects\lookstead.com
git init
git add .
git commit -m "Initial lookstead.com site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/lookstead.com.git
git push -u origin main
```

### 4. Enable GitHub Pages

Repo → **Settings** → **Pages** → **Build and deployment** → Source: **GitHub Actions**.

After the **Deploy lookstead.com** workflow succeeds:

- **Custom domain:** `lookstead.com`
- **Enforce HTTPS** when offered

---

## Custom domain (Namecheap)

In **Advanced DNS** for `lookstead.com`, remove parking / URL redirect records, then add:

| Type | Host | Value |
|------|------|--------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `YOUR_GITHUB_USERNAME.github.io` |

(`CNAME` file in this folder already says `lookstead.com`.)

---

## Local preview

```bash
npx --yes serve .
```

(run inside the folder that contains `index.html`)

---

## Monorepo option (full app + website)

If you ever push the whole **lifelens** project, use the workflow at repo root:

`.github/workflows/deploy-website.yml` — publishes the **`website/`** subfolder only.

For “website only on GitHub,” prefer the **separate repo** steps above.

---

## App config

In the Expo app `.env` (local, not committed):

```env
EXPO_PUBLIC_WEB_ORIGIN=https://lookstead.com
```
