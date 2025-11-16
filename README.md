# Pretty URL Shortener for link.techlahoma.org

This guide explains how to update `_redirects` so
short links keep working for Techlahoma events.

## Add or Update Links

### Edit on GitHub.com

1. Open `_redirects` on GitHub and click the pencil
   icon. GitHub's edit steps live here:
   https://docs.github.com/en/repositories/
   working-with-files/managing-files/
   editing-files
2. Insert your new redirect line near the top so
   recent links stay easy to find.
3. Use the preview tab to confirm spacing, then add
   a concise commit message that describes the link.
4. Submit the change on a branch or fork so Netlify
   redeploys once it merges to the default branch 
   within about a minute.

### Edit by Pulling the Repo

1. Clone the repo, create a branch, and run `ni` if
   dependencies have changed.
2. Open `_redirects` in your editor and add the new
   line near the top.
3. Run any project checks, then commit with a clear
   message and push your branch.
4. Open a pull request; Netlify will publish after
   the change merges.

### Format Each Redirect Line

Match Netlify's syntax exactly:

```
/slug  https://target.example/path  302
```

- Always start with a leading slash.
- Use at least two spaces between columns for readability.
- Include an explicit status code (`302` keeps browsers
  checking for updates instead of caching forever).

Full reference:
https://docs.netlify.com/routing/redirects/
redirect-options/#syntax

## How It Works

Netlify reads `_redirects` during every deploy and
turns each entry into an instant redirect on the CDN.
When you commit a new line, the next deploy updates
`link.techlahoma.org/<slug>` to point at the target.
Learn more in Netlify's redirect docs:
https://docs.netlify.com/routing/redirects/

## List of Redirects

<!-- redirects:start -->
- `/` → https://github.com/techlahoma/shortener
- `/*` → https://techlahoma.org
- `/ama` → https://luma.com/1ky3drci
- `/ama-call` → https://meet.google.com/cdu-mjqx-cyd
- `/linkedin` → https://www.linkedin.com/company/techlahoma-foundation
- `/ok-ai` → https://oklahom.ai/
- `/okc-ai` → https://www.meetup.com/oklahom_ai/ (302)
- `/okc-game` → https://www.meetup.com/oklahoma-game-developers/ (302)
- `/okc-gamedev` → https://www.meetup.com/oklahoma-game-developers/ (302)
- `/okc-jug` → https://www.meetup.com/oklahoma-city-java-user-group/ (302)
- `/okc-jug-site` → https://okcjug.org/ (302)
- `/okc-lugnuts` → https://www.meetup.com/okc-lugnuts/ (302)
- `/okc-osh` → https://www.meetup.com/okc-osh/ (302)
- `/okc-pythonistas` → https://www.meetup.com/pythonistas/ (302)
- `/okc-webdevs` → https://www.meetup.com/okcwebdevs/ (302)
- `/qr` → https://it-tools.tech/qrcode-generator (302)
- `/shecodesokc` → https://www.meetup.com/shecodesokc/ (302)
- `/shortener` → https://github.com/techlahoma/shortener
- `/tda` → https://www.meetup.com/tulsadevelopers-net/ (302)
- `/tgd` → https://www.meetup.com/tulsa-game-developers/ (302)
- `/tulsa-agile` → https://www.meetup.com/tulsaagilepractitioners/ (302)
- `/tulsa-ai` → https://www.meetup.com/oklahomai-developers/ (302)
- `/tulsa-aws` → https://www.meetup.com/tulsa-aws/ (302)
- `/tulsa-dev` → https://www.meetup.com/tulsadevelopers-net/ (302)
- `/tulsa-dotnet` → https://www.meetup.com/tulsadevelopers-net/ (302)
- `/tulsa-game` → https://www.meetup.com/tulsa-game-developers/ (302)
- `/tulsa-gamedev` → https://www.meetup.com/tulsa-game-developers/ (302)
- `/tulsa-salesforce` → https://trailblazercommunitygroups.com/salesforce-user-group-tulsa-united-states/ (302)
- `/tulsa-ux` → https://tulsaux.com/ (302)
- `/tulsa-ux-ig` → https://www.instagram.com/tulsaux/ (302)
- `/tulsa-web` → https://www.meetup.com/tulsa-web-devs/ (302)
- `/tulsa-wp` → https://www.meetup.com/tulsa-wordpress-meetup/ (302)
- `/twd` → https://www.meetup.com/tulsa-web-devs/ (302)
- `/twd-site` → https://tulsawebdevs.org/ (302)
<!-- redirects:end -->
