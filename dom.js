// ===== Task 9.1: Selecting elements =====
const header = document.getElementById("main-header");
const contents = document.getElementsByClassName("content");
const paragraphs = document.getElementsByTagName("p");
const firstLink = document.querySelector(".nav-link");
const allLinks = document.querySelectorAll(".nav-link");
console.log("getElementById:", header);
console.log("getElementsByClassName:", contents);
console.log("getElementsByTagName:", paragraphs);
console.log("querySelector:", firstLink);
console.log("querySelectorAll:", allLinks);

const h1 = document.querySelector("h1");                    // 1
const contentEls = document.querySelectorAll(".content");   // 2
const contactForm = document.getElementById("contact-form"); // 3
const emailInput = document.getElementById("email");         // 4
const navItems = document.querySelectorAll("nav li");        // 5
const firstNavLink = document.querySelector(".nav-link");    // 6
const lastParagraph = document.querySelector("footer p");    // 7 (the last <p> on the page)
console.log(h1, contentEls, contactForm, emailInput, navItems, firstNavLink, lastParagraph);

// ===== Task 9.2: Traversing =====
const nav = document.querySelector("nav");
console.log("nav parent:", nav.parentElement);
console.log("nav children:", nav.children);
console.log("first/last child:", nav.firstElementChild, nav.lastElementChild);

const article = document.querySelector("article");
console.log("article next:", article.nextElementSibling);
console.log("article previous:", article.previousElementSibling);

console.log("header > nav:", document.getElementById("main-header").querySelector("nav"));
console.log("first link's li:", firstLink.parentElement);
console.log("ul's li children:", document.querySelector("ul.nav-list").querySelectorAll("li"));
console.log("footer up to body:", document.querySelector("footer").parentElement);

// ===== Task 9.3: Modifying content =====
h1.textContent = "DOM Practice (updated by dom.js)";

const note = document.createElement("p");
const userInput = `<img src="x" onerror="alert('hacked!')">`;
note.textContent = userInput; // safe: shows the characters, runs nothing
note.className = "content";
article.append(note);

firstLink.setAttribute("title", "Go home");
firstLink.dataset.section = "home"; // creates data-section="home"
console.log("data-section:", firstLink.dataset.section);

const container = document.querySelector(".container");
container.classList.add("highlight");           // classes are better than inline styles
setTimeout(() => container.classList.remove("highlight"), 1500);

// ===== Task 9.4: Adding & removing elements =====
function addNavItem(text, href) {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "nav-link";
    a.textContent = text;
    a.href = href;
    li.appendChild(a);
    document.querySelector(".nav-list").appendChild(li);
}
addNavItem("Blog", "/blog");
addNavItem("Portfolio", "/portfolio");

const cloneSource = document.querySelector(".nav-link").parentElement;
const clone = cloneSource.cloneNode(true);
clone.querySelector("a").textContent = "Cloned Link";
document.querySelector(".nav-list").appendChild(clone);

// ===== Task 10.1: Click counter =====
const counterArea = document.getElementById("counter-area");
const countDisplay = document.createElement("span");
countDisplay.textContent = "0";
const plusBtn = document.createElement("button");
plusBtn.textContent = "+";
const minusBtn = document.createElement("button");
minusBtn.textContent = "-";
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset";
counterArea.append(minusBtn, " ", countDisplay, " ", plusBtn, " ", resetBtn);

let count = 0;
function showCount() { countDisplay.textContent = count; }
plusBtn.addEventListener("click", () => { count++; showCount(); });
minusBtn.addEventListener("click", () => { if (count > 0) count--; showCount(); });
resetBtn.addEventListener("click", () => { count = 0; showCount(); });

// ===== Task 10.2: Keyboard shortcuts =====
document.addEventListener("keydown", function (event) {
    console.log("Key:", event.key, "Code:", event.code);

    if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault(); // stop the browser's save dialog
        alert("Saved!");
    } else if (event.key === "Escape") {
        document.querySelectorAll("input").forEach((el) => { el.value = ""; });
    } else if (event.ctrlKey && event.key === "Enter") {
        contactForm.requestSubmit();
    }
});

// ===== Task 10.3: Delegated task list (ONE listener on the ul) =====
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = text;
    const del = document.createElement("button");
    del.textContent = "Delete";
    del.className = "delete-btn";
    li.append(span, " ", del);
    taskList.appendChild(li);
    taskInput.value = "";
});

taskList.addEventListener("click", function (event) {
    const li = event.target.closest("li");
    if (!li) return;
    if (event.target.closest(".delete-btn")) {
        li.remove();
    } else {
        li.classList.toggle("completed");
    }
});

// ===== Task 10.4: Form validation =====
const nameInput = document.getElementById("name");

function showError(input, message) {
    input.classList.add("error");
    let msg = input.nextElementSibling;
    if (!msg || !msg.classList.contains("error-message")) {
        msg = document.createElement("div");
        msg.className = "error-message";
        input.after(msg);
    }
    msg.textContent = message;
}

function clearError(input) {
    input.classList.remove("error");
    const msg = input.nextElementSibling;
    if (msg && msg.classList.contains("error-message")) msg.remove();
}

function isValid(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return data.name.trim().length >= 2 && emailRegex.test(data.email);
}

nameInput.addEventListener("input", function (event) {
    if (event.target.value.trim().length < 2) {
        showError(nameInput, "Name must be at least 2 characters");
    } else {
        clearError(nameInput);
    }
});

emailInput.addEventListener("input", function (event) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(event.target.value)) {
        showError(emailInput, "Please enter a valid email");
    } else {
        clearError(emailInput);
    }
});

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(contactForm));
    console.log("Form data:", data);
    if (isValid(data)) {
        alert("Form submitted successfully!");
        contactForm.reset();
    } else {
        if (data.name.trim().length < 2) showError(nameInput, "Name must be at least 2 characters");
        showError(emailInput, "Please enter a valid email");
    }
});