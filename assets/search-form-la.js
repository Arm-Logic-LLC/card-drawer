class FormSearchLa extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.searchInput = this.querySelector('.la-search-menu-drawer');
        this.resultsContainer = document.querySelector('#predictive-search-results-la');
        this.drawer_navigation = document.querySelector('.la-menu-drawer__navigation');

        this.resultsDesktopContiner = document.querySelector('#desktop_menu_search-la');
        this.searchInputDesk = document.querySelector('.search_desktop_menu_input-la');
        this.init();
    }

    init() {
        this.addEventListeners();
    }

    addEventListeners() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', this.handleSearchInput.bind(this));
        }
        if (this.searchInputDesk) {
            this.searchInputDesk.addEventListener('input', this.handleSearchInput.bind(this));
        }
        
    }

    async handleSearchInput(event) {
        const searchTerm = event.target.value.trim();
        if (searchTerm.length > 0) {
            const results = await this.fetchSearchResults(searchTerm);

            if (window.innerWidth > 989) {
                this.displayDesktopSearchResults(results); 
            } else {
                this.displayMobileSearchResults(results); 
            }
            this.activateSearch();
        } else {
            this.deactivateSearch();
        }
    }

    async fetchSearchResults(searchTerm) {
        try {
            const response = await fetch(`/search/suggest.json?q=${encodeURIComponent(searchTerm)}&resources[type]=product&resources[options][fields]=variants.sku`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data.resources.results.products || [];
        } catch (error) {
            console.error('Error fetching search results:', error);
            return [];
        }
    }

    displayMobileSearchResults(products) {
        this.resultsContainer.innerHTML = '';
        if (products) {
            const productTitle = document.createElement('div');
            productTitle.classList.add('la-product-search-title');
            productTitle.innerHTML = `
                <p id="la-product-search-title_child">PRODUCT</p>
            `;
            this.resultsContainer.appendChild(productTitle);
        }
        if (products.length > 0) {
            for (let i = 0; i < Math.min(products.length, 6); i++) {
                const product = products[i];
                const productItem = document.createElement('div');
                productItem.classList.add('predictive-search-item');
                productItem.innerHTML = `
                    <a href="${product.url}">
                        <img src="${product.featured_image.url}" alt="${product.title}">
                        <span>${product.title}</span>
                    </a>
                `;
                this.resultsContainer.appendChild(productItem);
            }
        } else {
            this.resultsContainer.innerHTML = '<p>No results found</p>';
        }

        if (products.length > 6) {
            const viewButton = document.createElement("div");
            viewButton.classList.add('view_all_shop_search');
            viewButton.innerHTML = `
                <a href="/search?q=${this.searchInput.value}">VIEW ALL ${products.length} ITEMS</a>
            `;
            this.resultsContainer.appendChild(viewButton);
        }
    }

    displayDesktopSearchResults(products) {
        this.resultsDesktopContiner.innerHTML = '';
        if (products) {
            const productTitle = document.createElement('div');
            productTitle.classList.add('la-product-search-title');
            productTitle.innerHTML = `
                <p id="la-product-search-title_child">PRODUCT</p>
            `;
            this.resultsDesktopContiner.appendChild(productTitle);
        }
        if (products.length > 0) {
            for (let i = 0; i < Math.min(products.length, 8); i++) {
                const product = products[i];
                const productItem = document.createElement('div');
                productItem.classList.add('predictive-search-item');
                productItem.innerHTML = `
                    <a href="${product.url}">
                        <img src="${product.featured_image.url}" alt="${product.title}">
                        <span>${product.title}</span>
                    </a>
                `;
                this.resultsDesktopContiner.appendChild(productItem);
            }
        } else {
            this.resultsDesktopContiner.innerHTML = '<p>No results found</p>';
        }

        if (products.length > 8) {
            const viewButton = document.createElement("div");
            viewButton.classList.add('view_all_shop_search');
            viewButton.innerHTML = `
                <a href="/search?q=${this.searchInput.value}">VIEW ALL ${products.length} ITEMS</a>
            `;
            this.resultsDesktopContiner.appendChild(viewButton);
        }
    }

    activateSearch() {
        this.drawer_navigation.classList.add('remove-scroll');
        this.resultsContainer.style.display = 'block';
        this.resultsDesktopContiner.style.display = 'block';
    }

    deactivateSearch() {
        this.resultsContainer.innerHTML = '';
        this.resultsContainer.style.display = 'none';
        this.drawer_navigation.classList.remove('remove-scroll');
        
        this.resultsDesktopContiner.innerHTML = '';
        this.resultsDesktopContiner.style.display = 'none';
    }
}

customElements.define('form-search-la', FormSearchLa);
