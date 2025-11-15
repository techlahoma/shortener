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

