# Minimalistic Static Site

A clean, terminal-inspired static site built with pure HTML, CSS, and JavaScript. Features dynamic Markdown rendering with a dark theme and programmer-friendly aesthetic.

## 🎨 Features

- **Dark Theme** — Near-black background with teal accent color
- **Minimalistic Design** — No navbar, footer, or extra chrome
- **Single Dropdown Navigation** — The only UI element for page switching
- **Markdown-Powered** — All content written in Markdown
- **Smooth Transitions** — Fade-in animations when switching pages
- **Monospace Typography** — JetBrains Mono font for that code editor feel
- **GitHub Pages Ready** — Deploy instantly with zero configuration

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── styles.css          # All styling and theme variables
├── app.js             # Markdown loading and rendering logic
└── pages/             # Markdown content files
    ├── landing.md     # Landing page (default)
    ├── frontend.md    # Frontend development page
    └── backend.md     # Backend development page
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-name>
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8080
   
   # Or using Node.js
   npx http-server -p 8080
   
   # Or using PHP
   php -S localhost:8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

> **Note**: You cannot open `index.html` directly in a browser due to CORS restrictions. You must use a local web server.

## 🌐 Deploy to GitHub Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "main" branch as source
   - Click "Save"

3. **Access your site**
   ```
   https://<username>.github.io/<repository-name>/
   ```

## 🎨 Customization

### Change Accent Color

Edit the `:root` variables in [`styles.css`](styles.css:13):

```css
:root {
    --accent-color: #00d9ff;  /* Change this to your preferred color */
    /* Try: #a78bfa (purple), #10b981 (green), #f59e0b (amber) */
}
```

### Change Font

Edit the font family in [`styles.css`](styles.css:19):

```css
:root {
    --font-mono: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
}
```

### Add More Pages

1. **Create a new Markdown file** in the `pages/` directory:
   ```bash
   touch pages/projects.md
   ```

2. **Add content** to your new file:
   ```markdown
   # My Projects
   
   Content goes here...
   ```

3. **Update the dropdown** in [`index.html`](index.html:17):
   ```html
   <select id="page-selector" class="page-dropdown">
       <option value="landing">Landing</option>
       <option value="frontend">Frontend</option>
       <option value="backend">Backend</option>
       <option value="projects">Projects</option>  <!-- Add this -->
   </select>
   ```

### Modify Content Width

Edit the max-width in [`styles.css`](styles.css:21):

```css
:root {
    --content-max-width: 850px;  /* Adjust as needed */
}
```

## 📝 Editing Content

All content is stored as Markdown files in the `pages/` directory. Simply edit these files to update your site:

- [`pages/landing.md`](pages/landing.md) — Landing page
- [`pages/frontend.md`](pages/frontend.md) — Frontend page
- [`pages/backend.md`](pages/backend.md) — Backend page

### Markdown Features Supported

- **Headers** — `# H1`, `## H2`, `### H3`, etc.
- **Bold** — `**bold text**`
- **Italic** — `*italic text*`
- **Code blocks** — Triple backticks with syntax highlighting
- **Inline code** — Single backticks
- **Links** — `[text](url)`
- **Lists** — Ordered and unordered
- **Blockquotes** — `> quote`
- **Tables** — GitHub-flavored Markdown tables
- **Horizontal rules** — `---`

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with CSS variables
- **JavaScript (ES6+)** — Vanilla JS, no frameworks
- **[marked.js](https://marked.js.org/)** — Markdown parser (loaded via CDN)

## 🎯 Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own use!

## 💡 Tips

- **Performance**: The site is already optimized, but you can enable page preloading by uncommenting the last line in [`app.js`](app.js:195)
- **SEO**: Add meta tags to [`index.html`](index.html:5) for better search engine visibility
- **Analytics**: Add Google Analytics or similar by including the script in [`index.html`](index.html:5)
- **Favicon**: Add a `favicon.ico` file to the root directory to remove the 404 error

## 🐛 Troubleshooting

### CORS Error
If you see a CORS error, make sure you're running a local web server instead of opening the HTML file directly.

### Markdown Not Rendering
Check the browser console for errors. Ensure `marked.js` is loading from the CDN.

### Dropdown Not Working
Verify that [`app.js`](app.js) is loading correctly and there are no JavaScript errors in the console.

---

**Built with ❤️ and ☕**

*Last updated: January 2026*
