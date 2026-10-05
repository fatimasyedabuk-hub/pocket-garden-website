# Pocket Garden — Respond to the User

A standalone CCT 360 lab project. Open index.html in a browser. No installation, external images, libraries, or internet connection is required to preview it.

## Interactions to demonstrate

1. Click Water plant three times: the plant grows and the water progress meter fills. Pressing W does the same thing.
2. Click the light button: the garden switches between daylight and moonlight. Press L as a shortcut.
3. After watering three times, use daylight and click Grow a flower (or press B): a growing message appears, then a flower opens after 1.2 seconds.
4. Type a plant name: the garden heading updates while typing.
5. Start a new garden: resets the plant, name, lighting, water count, and pending flower timer.

## Technical focus

- DOM: getElementById, textContent, hidden, setAttribute, classList, dataset, and progress.value.
- Event listeners: click, input, keydown, and resize.
- BOM: window.setTimeout, window.clearTimeout, and window.innerWidth.
- Functions and state: named functions, let/const, numbers, strings, and booleans.
- The JavaScript includes comments explaining each interaction.

## Publish and submit

Create a NEW GitHub repository called pocket-garden. Keep index.html in the repository root with css/style.css and js/script.js in their folders. Do not replace the previous scrolling assignment.

In VS Code: open this folder, initialize the repository, stage the files, commit with the assignment's required message `Class Progress.`, and publish a public repository. Later changes can use additional commit messages.

On GitHub: Settings → Pages → Deploy from a branch → main → / (root) → Save.

Open the published site and try all the interactions before submitting. Submit both the repository URL and the live GitHub Pages URL. If there is one URL field plus a comment box, put the live site in the URL field and the repository URL in the comment.
