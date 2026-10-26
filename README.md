# Instagram Login Wall Hider

A small userscript that hides the "Log in / Sign up" overlay on public Instagram posts and gives you back scrolling and clicking, without needing to open DevTools every time.

> **Not affiliated with Instagram or Meta.** This only changes how the page is displayed in *your own browser*.

## What it does

When you open a public Instagram post while logged out, Instagram places a modal and a dark overlay on top of the page, then locks scrolling and pointer events on everything behind it. This script:

- Hides the login/sign-up modal and the dark backdrop using CSS
- Removes the `inert` / `aria-hidden` / `overflow: hidden` locks Instagram applies to the page behind it
- Watches for the page re-creating the overlay (it does this on every scroll) and keeps it hidden

## Why CSS instead of deleting the element?

Instagram is a React app. Deleting nodes with `element.remove()` breaks its DOM tree (the page stops responding), and the overlay is re-created on every scroll anyway. Hiding it with a CSS rule works for every copy, including ones that don't exist yet.

## Installation

1. Install a userscript manager: [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/)
2. Open [`instagram-login-wall-hider.user.js`](./instagram-login-wall-hider.user.js) in this repo and click **Raw** (your userscript manager will offer to install it), or create a new script and paste the contents
3. Open any public Instagram post while logged out

### CSS-only alternative (Stylus)

Add this as a user style for `instagram.com`. It's simpler but doesn't remove the scroll/click locks, so it may not be enough on its own:

```css
div.x1n2onr6.xzkaem6:has([role="dialog"]),
div[data-interactable]:has([role="dialog"]),
[role="dialog"][aria-modal="true"] { display: none !important; }
html, body { overflow: auto !important; pointer-events: auto !important; position: static !important; }
```

### One-off use (no extension)

Paste the script body (without the `==UserScript==` header) into the DevTools console. It only lasts until you reload the page.

## Limitations

- **It only hides the overlay.** If Instagram doesn't send a post's content to logged-out visitors, there is nothing underneath to show. It does not bypass any server-side restriction.
- **Private accounts stay private.** Nothing here gives access to content you couldn't otherwise see.
- Comments, likes, and "more posts" often won't load without an account.
- Instagram changes its obfuscated class names (like `x1n2onr6`) from time to time. The `[role="dialog"]` selectors should keep working, but if they stop, open an issue with the new element's HTML.

## Alternative: embed links

For a single post you can often skip all of this by adding `embed` to the URL:

```
https://www.instagram.com/p/POST_CODE/embed/captioned/
```

## Troubleshooting

| Problem | Fix |
|---|---|
| Overlay still visible | Check the script is enabled for `instagram.com`; open an issue with the overlay's HTML |
| Can't scroll or click | Reload the page; make sure no other script is conflicting |
| Page is blank under the overlay | Instagram isn't serving that content to logged-out users |

## Disclaimer

Provided as is, for personal and educational use. Using it may be against Instagram's Terms of Use; you are responsible for how you use it.

## License

MIT
