// ==UserScript==
// @name         Instagram Login Wall Hider
// @namespace    https://github.com/Aresgms/instagram-login-wall-hider
// @version      1.0.0
// @description  Hides the "Log in / Sign up" overlay on public Instagram posts and restores scrolling and clicking.
// @match        https://www.instagram.com/*
// @run-at       document-start
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  // 1) Hide the login modal with CSS instead of deleting it.
  //    CSS also applies to copies Instagram re-creates while scrolling,
  //    and it doesn't break React's DOM tree.
  const style = document.createElement('style');
  style.textContent = `
    div.x1n2onr6.xzkaem6:has([role="dialog"]),
    div[data-interactable]:has([role="dialog"]),
    [role="dialog"][aria-modal="true"] { display: none !important; }
    html, body {
      overflow: auto !important;
      pointer-events: auto !important;
      position: static !important;
    }
  `;
  (document.head || document.documentElement).appendChild(style);

  // 2) Remove the locks Instagram puts on the page behind the modal.
  const unlock = () => {
    document.querySelectorAll('[inert]').forEach(e => e.removeAttribute('inert'));
    document.querySelectorAll('#scrollview[aria-hidden]').forEach(e => e.removeAttribute('aria-hidden'));
    if (document.body) document.body.style.setProperty('overflow', 'auto', 'important');
    document.documentElement.style.setProperty('overflow', 'auto', 'important');
  };

  document.addEventListener('DOMContentLoaded', () => {
    unlock();
    new MutationObserver(unlock).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });
  });
})();
