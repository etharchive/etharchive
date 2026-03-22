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
            `${author.birthYear}—${author.deathYear}` : 
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