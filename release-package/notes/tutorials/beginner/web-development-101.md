---
title: Web Development 101
tags: [tutorial, web-development, html, css, javascript, beginner]
created: 2024-01-05
author: Tutorial Team
description: Complete beginner's guide to web development
updated: 2024-02-20
category: tutorials
status: published
---

# Web Development 101

Welcome to the world of web development! This tutorial will guide you through the basics of building websites using HTML, CSS, and JavaScript.

## Prerequisites

- A text editor (VS Code recommended)
- A web browser (Chrome, Firefox, or Edge)
- Basic computer skills
- Enthusiasm to learn!

## Chapter 1: HTML Basics

HTML (HyperText Markup Language) is the foundation of web pages. It provides structure and content.

### Your First HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Web Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first web page.</p>
</body>
</html>
```

### Essential HTML Elements

#### Headings
```html
<h1>Main Heading</h1>
<h2>Subheading</h2>
<h3>Sub-subheading</h3>
<!-- ... up to h6 -->
```

#### Text Elements
```html
<p>This is a paragraph.</p>
<strong>Bold text</strong>
<em>Italic text</em>
<br> <!-- Line break -->
<hr> <!-- Horizontal rule -->
```

#### Lists
```html
<!-- Unordered list -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First step</li>
    <li>Second step</li>
    <li>Third step</li>
</ol>
```

#### Links and Images
```html
<!-- Links -->
<a href="https://example.com">Visit Example</a>
<a href="about.html">About Page</a>
<a href="#section">Jump to Section</a>

<!-- Images -->
<img src="photo.jpg" alt="Description of photo">
<img src="https://example.com/image.png" alt="External image">
```

#### Forms
```html
<form action="/submit" method="post">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <label for="message">Message:</label>
    <textarea id="message" name="message" rows="4"></textarea>
    
    <button type="submit">Send</button>
</form>
```

## Chapter 2: CSS Fundamentals

CSS (Cascading Style Sheets) makes your HTML look beautiful by adding colors, layouts, and animations.

### Adding CSS to HTML

```html
<!-- Inline CSS -->
<p style="color: blue;">Blue text</p>

<!-- Internal CSS -->
<style>
    p {
        color: green;
    }
</style>

<!-- External CSS (recommended) -->
<link rel="stylesheet" href="styles.css">
```

### CSS Selectors

```css
/* Element selector */
p {
    color: blue;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#header {
    font-size: 24px;
}

/* Descendant selector */
nav a {
    text-decoration: none;
}

/* Multiple selectors */
h1, h2, h3 {
    font-family: Arial, sans-serif;
}
```

### Common CSS Properties

```css
/* Typography */
.text-styling {
    font-family: 'Helvetica', Arial, sans-serif;
    font-size: 16px;
    font-weight: bold;
    color: #333;
    text-align: center;
    line-height: 1.6;
}

/* Box Model */
.box {
    width: 300px;
    height: 200px;
    padding: 20px;
    margin: 10px;
    border: 2px solid #000;
    background-color: #f0f0f0;
}

/* Flexbox Layout */
.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

/* Colors and Backgrounds */
.styled-element {
    color: #ff6b6b;
    background-color: rgba(0, 0, 0, 0.1);
    background-image: url('pattern.png');
    background-size: cover;
}
```

### Responsive Design

```css
/* Mobile-first approach */
.container {
    width: 100%;
    padding: 10px;
}

/* Tablet styles */
@media (min-width: 768px) {
    .container {
        max-width: 750px;
        margin: 0 auto;
    }
}

/* Desktop styles */
@media (min-width: 1024px) {
    .container {
        max-width: 1200px;
    }
}
```

## Chapter 3: JavaScript Basics

JavaScript brings your website to life with interactivity and dynamic behavior.

### Adding JavaScript

```html
<!-- Inline JavaScript -->
<button onclick="alert('Hello!')">Click Me</button>

<!-- Internal JavaScript -->
<script>
    console.log('Hello from JavaScript!');
</script>

<!-- External JavaScript (recommended) -->
<script src="script.js"></script>
```

### Variables and Data Types

```javascript
// Variables
let name = "John";           // String
const age = 25;             // Number
let isStudent = true;       // Boolean
let grades = [90, 85, 92];  // Array
let person = {              // Object
    name: "John",
    age: 25
};

// Modern syntax
const message = `Hello, ${name}!`; // Template literal
```

### Functions

```javascript
// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Arrow function
const add = (a, b) => a + b;

// Function with default parameter
function sayHello(name = "Guest") {
    console.log(`Welcome, ${name}!`);
}
```

### DOM Manipulation

```javascript
// Selecting elements
const heading = document.getElementById('heading');
const buttons = document.getElementsByClassName('btn');
const firstPara = document.querySelector('p');
const allParas = document.querySelectorAll('p');

// Changing content
heading.textContent = 'New Heading';
heading.innerHTML = '<span>Styled Heading</span>';

// Changing styles
heading.style.color = 'blue';
heading.style.fontSize = '24px';

// Adding/removing classes
heading.classList.add('highlight');
heading.classList.remove('old-style');
heading.classList.toggle('active');
```

### Event Handling

```javascript
// Click event
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
    alert('Button clicked!');
});

// Form submission
const form = document.querySelector('#myForm');
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default submission
    
    const formData = new FormData(form);
    const name = formData.get('name');
    console.log(`Form submitted by ${name}`);
});

// Multiple events
const input = document.querySelector('#myInput');
input.addEventListener('focus', () => console.log('Input focused'));
input.addEventListener('blur', () => console.log('Input blurred'));
input.addEventListener('input', (e) => console.log(e.target.value));
```

## Chapter 4: Building Your First Project

Let's build a simple Todo List application!

### HTML Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List</title>
    <link rel="stylesheet" href="todo.css">
</head>
<body>
    <div class="container">
        <h1>My Todo List</h1>
        <form id="todoForm">
            <input type="text" id="todoInput" placeholder="Add a new task..." required>
            <button type="submit">Add</button>
        </form>
        <ul id="todoList"></ul>
    </div>
    <script src="todo.js"></script>
</body>
</html>
```

### CSS Styling

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    padding: 20px;
}

.container {
    max-width: 600px;
    margin: 0 auto;
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
    color: #333;
    margin-bottom: 20px;
    text-align: center;
}

#todoForm {
    display: flex;
    margin-bottom: 20px;
}

#todoInput {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px 0 0 5px;
    font-size: 16px;
}

button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background-color: #45a049;
}

.todo-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
}

.todo-item.completed {
    opacity: 0.6;
    text-decoration: line-through;
}

.delete-btn {
    margin-left: auto;
    background-color: #f44336;
    padding: 5px 10px;
    border-radius: 3px;
}

.delete-btn:hover {
    background-color: #da190b;
}
```

### JavaScript Functionality

```javascript
// Get elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Display todos on page load
displayTodos();

// Add todo
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const todoText = todoInput.value.trim();
    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false
        };
        
        todos.push(todo);
        saveTodos();
        displayTodos();
        todoInput.value = '';
    }
});

// Display todos
function displayTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) {
            li.classList.add('completed');
        }
        
        li.innerHTML = `
            <input type="checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span>${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;
        
        todoList.appendChild(li);
    });
}

// Toggle todo completion
function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    saveTodos();
    displayTodos();
}

// Delete todo
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    displayTodos();
}

// Save to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
```

## Next Steps

Congratulations! You've learned the basics of web development. Here's what to learn next:

1. **Advanced CSS**
   - CSS Grid
   - Animations
   - Preprocessors (Sass)

2. **Advanced JavaScript**
   - ES6+ features
   - Async/Await
   - Fetch API

3. **Frameworks**
   - React
   - Vue.js
   - Angular

4. **Backend Development**
   - Node.js
   - Databases
   - RESTful APIs

5. **Tools & Workflow**
   - Git version control
   - npm/yarn
   - Webpack/Vite

Keep practicing and building projects. The best way to learn is by doing!