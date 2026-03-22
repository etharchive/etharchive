// Global variables
let authorsData = [];
let currentFilter = '';

// Fetch and load authors data from JSON file
async function loadAuthors() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load authors data');
        }
        const data = await response.json();
        authorsData = data.authors;
        displayAuthors(authorsData);
        setupSearch();
    } catch (error) {
        console.error('Error loading authors:', error);
        const grid = document.getElementById('authorsGrid');
        if (grid) {
            grid.innerHTML = '<div class="no-results">Unable to load authors. Please refresh the page.</div>';
        }
    }
}

// Display authors in the grid
function displayAuthors(authors) {
    const grid = document.getElementById('authorsGrid');
    
    if (!grid) return;
    
    if (authors.length === 0) {
        grid.innerHTML = '<div class="no-results">No authors found matching your search.</div>';
        return;
    }
    
    // Generate HTML for each author card
    const authorsHTML = authors.map(author => {
        const yearsText = author.deathYear ? 
            `${author.birthYear}-${author.deathYear}` : 
            `b. ${author.birthYear}`;
        
        const bookCount = author.books ? author.books.length : 0;
        const bookText = bookCount === 1 ? '1 book' : `${bookCount} books`;
        
        const imageUrl = author.imageUrl || 'images/placeholder.png';
        
        return `
            <a href="author.html?slug=${encodeURIComponent(author.slug)}" class="author-card">
                <div class="author-image">
                    <img src="${escapeHtml(imageUrl)}" 
                         alt="${escapeHtml(author.name)}"
                         onerror="this.parentElement.innerHTML='<div class=\'placeholder-img\'><i class=\'fas fa-user\'></i></div>'">
                </div>
                <div class="author-info">
                    <h2 class="author-name">${escapeHtml(author.name)}</h2>
                    <div class="author-years">${yearsText}</div>
                    <div class="author-books">${bookText}</div>
                </div>
            </a>
        `;
    }).join('');
    
    grid.innerHTML = authorsHTML;
}

// Escape HTML to prevent XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearchBtn');
    
    if (!searchInput) return;
    
    // Search input event
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();
        currentFilter = searchTerm;
        
        // Show/hide clear button
        if (clearBtn) {
            clearBtn.style.display = searchTerm.length > 0 ? 'flex' : 'none';
        }
        
        if (searchTerm === '') {
            displayAuthors(authorsData);
            return;
        }
        
        const filteredAuthors = authorsData.filter(author => 
            author.name.toLowerCase().includes(searchTerm)
        );
        
        displayAuthors(filteredAuthors);
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentFilter = '';
            displayAuthors(authorsData);
            clearBtn.style.display = 'none';
            searchInput.focus();
        });
    }
}

// Initialize the page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadAuthors();
});

// Function to get URL parameter
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load author detail page
async function loadAuthorDetail() {
    const slug = getUrlParameter('slug');
    
    if (!slug) {
        showError('No author specified');
        return;
    }
    
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Failed to load authors data');
        }
        const data = await response.json();
        const author = data.authors.find(a => a.slug === slug);
        
        if (!author) {
            showError('Author not found');
            return;
        }
        
        displayAuthorDetail(author, data.authors);
    } catch (error) {
        console.error('Error loading author:', error);
        showError('Unable to load author details. Please try again.');
    }
}

// Display author detail
function displayAuthorDetail(author, allAuthors) {
    const container = document.getElementById('authorContent');
    if (!container) return;
    
    const yearsText = author.deathYear ? 
        `${author.birthYear}-${author.deathYear}` : 
        `Born ${author.birthYear}`;
    
    const bookCount = author.books ? author.books.length : 0;
    const bookCountText = bookCount === 1 ? '1 Book' : `${bookCount} Books`;
    
    // Get related authors (random 4 authors excluding current)
    const relatedAuthors = allAuthors
        .filter(a => a.id !== author.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    
    const authorHTML = `
        <div class="author-detail">
            <div class="author-two-columns">
                <div class="author-portrait">
                    <img src="${author.imageUrl || 'images/placeholder.png'}" 
                         alt="${escapeHtml(author.name)}"
                         onerror="this.parentElement.innerHTML='<div class=\\'portrait-placeholder\\'><i class=\\'fas fa-user\\'></i></div>'">
                </div>
                <div class="author-details">
                    <h1 class="author-name-large">${escapeHtml(author.name)}</h1>
                    <div class="author-meta">
                        <span class="meta-item">
                            <i class="fas fa-calendar-alt"></i> ${yearsText}
                        </span>
                        <span class="meta-item">
                            <i class="fas fa-book"></i> ${bookCountText}
                        </span>
                    </div>
                    <div class="author-bio">
                        ${escapeHtml(author.bio)}
                    </div>
                </div>
            </div>
            
            <div class="books-section">
                <h2>Books by ${escapeHtml(author.name)}</h2>
                <div class="books-grid">
                    ${author.books.map(book => `
                        <a href="book.html?slug=${encodeURIComponent(book.slug)}" class="book-card">
                            <div class="book-image">
                                <img src="${book.coverUrl || 'images/placeholder.png'}" 
                                     alt="${escapeHtml(book.title)}"
                                     onerror="this.parentElement.innerHTML='<div class=\\'book-placeholder\\'><i class=\\'fas fa-book\\'></i></div>'">
                            </div>
                            <div class="book-info">
                                <div class="book-title">${escapeHtml(book.title)}</div>
                                <div class="book-year">${book.year}</div>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
            
            ${relatedAuthors.length > 0 ? `
                <div class="related-authors-section">
                    <h2>Related Authors</h2>
                    <div class="related-authors-grid">
                        ${relatedAuthors.map(related => {
                            const relatedYears = related.deathYear ? 
                                `${related.birthYear}—${related.deathYear}` : 
                                `b. ${related.birthYear}`;
                            return `
                                <a href="author.html?slug=${encodeURIComponent(related.slug)}" class="related-author-card">
                                    <div class="related-author-image">
                                        <img src="${related.imageUrl || 'images/placeholder.png'}" 
                                             alt="${escapeHtml(related.name)}"
                                             onerror="this.parentElement.innerHTML='<div class=\\'related-author-placeholder\\'><i class=\\'fas fa-user\\'></i></div>'">
                                    </div>
                                    <div class="related-author-info">
                                        <div class="related-author-name">${escapeHtml(related.name)}</div>
                                        <div class="related-author-years">${relatedYears}</div>
                                    </div>
                                </a>
                            `;
                        }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    container.innerHTML = authorHTML;
}

// Show error message
function showError(message) {
    const container = document.getElementById('authorContent');
    if (container) {
        container.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>${escapeHtml(message)}</p>
                <a href="index.html">← Return to homepage</a>
            </div>
        `;
    }
}

// Check if we're on the author detail page
if (window.location.pathname.includes('author.html')) {
    document.addEventListener('DOMContentLoaded', loadAuthorDetail);
}