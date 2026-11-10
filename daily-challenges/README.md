# Daily Challenges: Week 5 (DOM Manipulation)

Five small pages that each practise one DOM skill. Each file is self-contained: open it in a browser, no setup needed.

**Student:** Shaniz Ann Mumbua (GitHub: Samcodex-405)

## Challenges

| Day | File | What it does | DOM skills used |
| --- | --- | --- | --- |
| 1 | [day1-color-changer.html](day1-color-changer.html) | A button gives every `h1`, `h2` and `h3` a random hex color | `querySelectorAll`, `forEach`, CSS custom property |
| 2 | [day2-element-creator.html](day2-element-creator.html) | A button adds numbered paragraphs, each with its own Delete button | `createElement`, `appendChild`, `textContent`, event delegation |
| 3 | [day3-image-remover.html](day3-image-remover.html) | Removes all images from the page. Bonus: toggles hide/show instead | `remove()`, `classList.toggle` |
| 4 | [day4-content-copier.html](day4-content-copier.html) | Copies content from a source box to a target box. Bonus: drag and drop | `innerHTML` (my own HTML only), drag events, `preventDefault` |
| 5 | [day5-dark-mode.html](day5-dark-mode.html) | Toggles dark mode with a smooth transition and remembers the choice | `classList.toggle`, CSS transition, `localStorage` |

## How to run

1. Open any file in the `daily-challenges/` folder in your browser, or
2. View them on the live site: `https://samcodex-405.github.io/iyf-s12-week-05-Samcodex-405/daily-challenges/day1-color-changer.html` (change the file name for other days).

## Notes

- All event handling uses `addEventListener`, with no `onclick` in the HTML.
- Styling changes use `classList` where possible.
- Day 5 uses `localStorage`, which is taught in Week 7, so I tried it early and wrapped it in `try/catch` in case storage is unavailable.
- Day 3 uses small inline images so the page works without any image files.