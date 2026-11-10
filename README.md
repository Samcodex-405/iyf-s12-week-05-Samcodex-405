# Week 5: DOM Manipulation

**Student:** Shaniz Ann Mumbua (GitHub: Samcodex-405)
- **Course:** IYF Weekend Academy, Season 12
- **Repository:** iyf-s12-week-05-Samcodex-405

This week I learned to select, change, add and remove page elements with JavaScript, and to respond to clicks, typing and keyboard events. The deliverable is an interactive To-Do List.

## Live Demo

https://samcodex-405.github.io/iyf-s12-week-05-Samcodex-405/

## Repository Layout

```
iyf-s12-week-05-Samcodex-405/
├── index.html           <- To-Do List (the deliverable, shown by GitHub Pages)
├── styles.css           <- To-Do List styling
├── app.js               <- To-Do List logic
├── dom-practice.html    <- Task 9.1 practice page
├── dom.js               <- Tasks 9.x and 10.x practice code
├── daily-challenges/    <- The five daily challenges (has its own README)
├── .gitignore
└── README.md
```

## To-Do List

**Features**

- Add a task with the Add button or the Enter key
- Empty and spaces-only tasks are refused, and the input clears after adding
- Click a task to mark it complete (crossed out); click again to undo
- Each task has its own delete button (shown on hover)
- Filters: All / Active / Completed
- Counter shows "1 item left" / "3 items left"
- Clear Completed removes all finished tasks
- Bonus: double-click a task to edit it; Enter saves, Escape cancels

**How it follows the rules**

| Rule | How I did it |
| --- | --- |
| Event delegation | One `click` listener on the `ul`; tasks added later work without new listeners |
| User text uses `textContent` | Tasks are built with `createElement` and `textContent`, never `innerHTML` |
| No inline `onclick` | Every handler is added with `addEventListener` in JavaScript |
| Look changes via `classList` | `completed` and `active` classes are toggled; no `element.style` |
| State in an array of objects | `todos = [{ id, text, completed }]`, and the list is redrawn from it |
| No page reload | `event.preventDefault()` on form submit |

**Test it:** add a task called `<b>hi</b>`. It shows the tags as plain text, not bold.

## Practice Tasks (`dom-practice.html` + `dom.js`)

| Task | Topic |
| --- | --- |
| 9.1 | Selecting elements (`getElementById`, `querySelector`, `querySelectorAll`, ...) |
| 9.2 | Traversing the DOM (parent, children, siblings) |
| 9.3 | Modifying text, attributes, data attributes and classes |
| 9.4 | Creating, cloning and removing elements (`addNavItem`) |
| 10.1 | Click counter (cannot go below 0) |
| 10.2 | Keyboard shortcuts: Ctrl+S, Escape, Ctrl+Enter |
| 10.3 | Event bubbling and a delegated task list |
| 10.4 | Form validation with real-time error messages |


## Daily Challenges

See [daily-challenges/README.md](daily-challenges/README.md) for details.

1. Random heading colors
2. Create and delete numbered paragraphs
3. Remove (and bonus hide/show) images
4. Copy content between divs (bonus drag and drop)
5. Dark mode toggle

## How to Run

1. Clone the repo: `git clone https://github.com/Samcodex-405/iyf-s12-week-05-Samcodex-405.git`
2. Open `index.html` in a browser. No install or build step is needed.

## Lessons Learned

- Event delegation: one click listener on the `ul` handles every task, including ones added later, because clicks bubble up from the task to the list.
- `event.target` can be the delete button or the text inside an `li`, so I used `closest("li")` to find the task that was clicked.
- `textContent` displays `<b>hi</b>` as text, while `innerHTML` would turn it into real HTML. That is why anything a user types never goes through `innerHTML`.
- Keeping tasks in an array of objects and redrawing the list from it means the screen and the data can never disagree, which made filters and Clear Completed simple.
- Forgetting `event.preventDefault()` on a form submit reloads the page and wipes the list.
- `classList.toggle` is cleaner than setting `element.style`, because the CSS stays in the stylesheet.

## Git
