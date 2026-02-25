/**
 * MINIMALISTIC MARKDOWN PAGE LOADER
 * 
 * This script handles:
 * - Loading Markdown files dynamically
 * - Rendering Markdown to HTML using marked.js
 * - Smooth page transitions with fade-in animation
 * - Dropdown navigation handling
 */

// ============================================
// CONFIGURATION
// ============================================

const CONFIG = {
    pagesDir: 'pages/',           // Directory where Markdown files are stored
    defaultPage: 'landing',       // Default page to load on initial visit
    fadeInDuration: 500,          // Fade-in animation duration in milliseconds
};

// ============================================
// DOM ELEMENTS
// ============================================

const customDropdown = document.getElementById('custom-dropdown');
const dropdownSelected = document.getElementById('dropdown-selected');
const selectedText = document.getElementById('selected-text');
const dropdownOptions = document.getElementById('dropdown-options');
const contentArea = document.getElementById('content');

let currentPage = CONFIG.defaultPage;

// ============================================
// MARKDOWN CONFIGURATION
// ============================================

// Configure marked.js for better rendering
if (typeof marked !== 'undefined') {
    marked.setOptions({
        breaks: true,           // Convert \n to <br>
        gfm: true,             // GitHub Flavored Markdown
        headerIds: true,       // Add IDs to headers
        mangle: false,         // Don't escape autolinked email addresses
        pedantic: false,       // Don't be too strict
        sanitize: false,       // Allow HTML in Markdown
        smartLists: true,      // Use smarter list behavior
        smartypants: false,    // Don't use smart typography
    });
}

// ============================================
// CORE FUNCTIONS
// ============================================

/**
 * Load and render a Markdown page
 * @param {string} pageName - Name of the page (without .md extension)
 */
async function loadPage(pageName) {
    try {
        // Show loading state
        contentArea.classList.add('loading');
        
        // Construct the file path
        const filePath = `${CONFIG.pagesDir}${pageName}.md`;
        
        // Fetch the Markdown file
        const response = await fetch(filePath);
        
        if (!response.ok) {
            throw new Error(`Failed to load ${filePath}: ${response.status} ${response.statusText}`);
        }
        
        // Get the Markdown content
        const markdown = await response.text();
        
        // Convert Markdown to HTML
        const html = marked.parse(markdown);
        
        // Apply fade-out effect before changing content
        contentArea.style.opacity = '0';
        
        // Wait for fade-out to complete
        await new Promise(resolve => setTimeout(resolve, 150));
        
        // Update the content
        contentArea.innerHTML = html;
        
        // Remove loading state
        contentArea.classList.remove('loading');
        
        // Trigger fade-in animation by resetting the animation
        contentArea.style.animation = 'none';
        
        // Force reflow to restart animation
        void contentArea.offsetWidth;
        
        // Apply fade-in animation
        contentArea.style.animation = 'fadeIn 0.5s ease-in';
        contentArea.style.opacity = '1';
        
        // Scroll to top smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Add copy buttons to code blocks (optional enhancement)
        addCopyButtonsToCodeBlocks();
        
    } catch (error) {
        console.error('Error loading page:', error);
        
        // Display error message to user
        contentArea.innerHTML = `
            <div style="color: #ff5555; padding: 2rem; border: 1px solid #ff5555; border-radius: 4px;">
                <h2>⚠️ Error Loading Page</h2>
                <p>Could not load <code>${pageName}.md</code></p>
                <p style="color: #888; font-size: 0.9rem;">${error.message}</p>
            </div>
        `;
        
        contentArea.classList.remove('loading');
        contentArea.style.opacity = '1';
    }
}

/**
 * Add copy buttons to code blocks (optional enhancement)
 */
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = contentArea.querySelectorAll('pre code');
    
    codeBlocks.forEach((codeBlock) => {
        const pre = codeBlock.parentElement;
        
        // Skip if button already exists
        if (pre.querySelector('.copy-button')) return;
        
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyButton.textContent = 'Copy';
        copyButton.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: var(--code-bg);
            color: var(--accent-color);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 0.3rem 0.6rem;
            font-family: var(--font-mono);
            font-size: 0.75rem;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease, background 0.2s ease;
        `;
        
        // Show button on hover
        pre.style.position = 'relative';
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });
        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });
        
        // Copy functionality
        copyButton.addEventListener('click', async () => {
            const code = codeBlock.textContent;
            
            try {
                await navigator.clipboard.writeText(code);
                copyButton.textContent = '✓ Copied';
                copyButton.style.background = 'var(--accent-color)';
                copyButton.style.color = 'var(--bg-color)';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.style.background = 'var(--code-bg)';
                    copyButton.style.color = 'var(--accent-color)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
                copyButton.textContent = '✗ Failed';
                
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                }, 2000);
            }
        });
        
        pre.appendChild(copyButton);
    });
}

/**
 * Toggle dropdown open/close
 */
function toggleDropdown() {
    customDropdown.classList.toggle('open');
}

/**
 * Close dropdown when clicking outside
 */
function closeDropdown(event) {
    if (!customDropdown.contains(event.target)) {
        customDropdown.classList.remove('open');
    }
}

/**
 * Handle page selection from dropdown
 */
function selectPage(pageName) {
    // Update current page
    currentPage = pageName;
    
    // Update selected text
    const pageNames = {
        'landing': 'Home',
        'architecture': 'Architecture',
        'frontend': 'Frontend',
        'backend': 'Backend'
    };
    selectedText.textContent = pageNames[pageName] || pageName;
    
    // Update selected state in options
    document.querySelectorAll('.dropdown-option').forEach(option => {
        if (option.dataset.value === pageName) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
    });
    
    // Close dropdown
    customDropdown.classList.remove('open');
    
    // Load the page
    loadPage(pageName);
}

// ============================================
// EVENT LISTENERS
// ============================================

// Toggle dropdown on click
dropdownSelected.addEventListener('click', toggleDropdown);

// Handle option selection
document.querySelectorAll('.dropdown-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        const pageName = option.dataset.value;
        selectPage(pageName);
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', closeDropdown);

// Close dropdown on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        customDropdown.classList.remove('open');
    }
});

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize the application
 */
function init() {
    // Check if marked.js is loaded
    if (typeof marked === 'undefined') {
        console.error('marked.js is not loaded. Please include it in your HTML.');
        contentArea.innerHTML = `
            <div style="color: #ff5555; padding: 2rem;">
                <h2>⚠️ Configuration Error</h2>
                <p>Markdown renderer (marked.js) is not loaded.</p>
            </div>
        `;
        return;
    }
    
    // Load the default page
    loadPage(CONFIG.defaultPage);
    
    // Set initial selected state
    document.querySelector(`.dropdown-option[data-value="${CONFIG.defaultPage}"]`)?.classList.add('selected');
    
    console.log('✓ Markdown page loader initialized');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// UTILITY FUNCTIONS (Optional)
// ============================================

/**
 * Preload all pages for faster navigation (optional)
 */
async function preloadAllPages() {
    const pages = ['landing', 'frontend', 'backend'];
    
    for (const page of pages) {
        try {
            const response = await fetch(`${CONFIG.pagesDir}${page}.md`);
            if (response.ok) {
                console.log(`✓ Preloaded ${page}.md`);
            }
        } catch (error) {
            console.warn(`Could not preload ${page}.md:`, error);
        }
    }
}

// Uncomment to enable preloading:
// setTimeout(preloadAllPages, 1000);
