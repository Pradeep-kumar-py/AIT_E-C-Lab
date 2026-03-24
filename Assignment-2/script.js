const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const minPriceInput = document.getElementById("minPrice");
const maxPriceInput = document.getElementById("maxPrice");
const stockOnlyInput = document.getElementById("stockOnly");
const sortSelect = document.getElementById("sortSelect");
const searchBtn = document.getElementById("searchBtn");
const resetBtn = document.getElementById("resetBtn");
const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");

const currency = new Intl.NumberFormat("en-IN", {
	style: "currency",
	currency: "INR",
	maximumFractionDigits: 0
});

function parseOptionalNumber(value) {
	const parsed = Number(value);
	return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function getFilterState() {
	return {
		query: searchInput.value.trim().toLowerCase(),
		category: categorySelect.value,
		min: parseOptionalNumber(minPriceInput.value),
		max: parseOptionalNumber(maxPriceInput.value),
		stockOnly: stockOnlyInput.checked,
		sortBy: sortSelect.value
	};
}

function sortProducts(products, sortBy) {
	const sorted = [...products];

	if (sortBy === "price-asc") {
		sorted.sort((a, b) => a.price - b.price);
	} else if (sortBy === "price-desc") {
		sorted.sort((a, b) => b.price - a.price);
	} else if (sortBy === "rating-desc") {
		sorted.sort((a, b) => b.rating - a.rating);
	} else if (sortBy === "name-asc") {
		sorted.sort((a, b) => a.name.localeCompare(b.name));
	}

	return sorted;
}

function applyFilters(products, state) {
	let filtered = products.filter((product) => {
		const searchBlob = `${product.name} ${product.category} ${product.description}`.toLowerCase();

		if (state.query && !searchBlob.includes(state.query)) {
			return false;
		}

		if (state.category && product.category !== state.category) {
			return false;
		}

		if (state.min !== null && product.price < state.min) {
			return false;
		}

		if (state.max !== null && product.price > state.max) {
			return false;
		}

		if (state.stockOnly && !product.inStock) {
			return false;
		}

		return true;
	});

	filtered = sortProducts(filtered, state.sortBy);
	return filtered;
}

function renderProducts(products) {
	productGrid.innerHTML = "";

	if (products.length === 0) {
		emptyState.hidden = false;
		return;
	}

	emptyState.hidden = true;

	products.forEach((product, index) => {
		const article = document.createElement("article");
		article.className = "product-card";
		article.style.animationDelay = `${index * 35}ms`;

		article.innerHTML = `
			<img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
			<div class="product-content">
				<h3 class="product-title">${product.name}</h3>
				<div class="pill-row">
					<span class="pill">${product.category}</span>
					<span class="pill ${product.inStock ? "" : "out"}">${product.inStock ? "In Stock" : "Out of Stock"}</span>
				</div>
				<p class="description">${product.description}</p>
				<div class="meta">
					<span class="price">${currency.format(product.price)}</span>
					<span class="rating">${product.rating.toFixed(1)} / 5</span>
				</div>
			</div>
		`;

		productGrid.appendChild(article);
	});
}

function updateCatalog() {
	const state = getFilterState();
	const filteredProducts = applyFilters(PRODUCTS, state);
	renderProducts(filteredProducts);
	resultsCount.textContent = `Showing ${filteredProducts.length} of ${PRODUCTS.length} products`;
}

function populateCategoryFilter() {
	const categories = [...new Set(PRODUCTS.map((item) => item.category))].sort((a, b) => a.localeCompare(b));

	categories.forEach((category) => {
		const option = document.createElement("option");
		option.value = category;
		option.textContent = category;
		categorySelect.appendChild(option);
	});
}

function bindEvents() {
	searchBtn.addEventListener("click", updateCatalog);

	searchInput.addEventListener("input", updateCatalog);

	searchInput.addEventListener("keydown", (event) => {
		if (event.key === "Enter") {
			event.preventDefault();
			updateCatalog();
		}
	});

	categorySelect.addEventListener("change", updateCatalog);
	minPriceInput.addEventListener("input", updateCatalog);
	maxPriceInput.addEventListener("input", updateCatalog);
	stockOnlyInput.addEventListener("change", updateCatalog);
	sortSelect.addEventListener("change", updateCatalog);

	resetBtn.addEventListener("click", () => {
		searchInput.value = "";
		categorySelect.value = "";
		minPriceInput.value = "";
		maxPriceInput.value = "";
		stockOnlyInput.checked = false;
		sortSelect.value = "featured";
		updateCatalog();
	});
}

populateCategoryFilter();
bindEvents();
updateCatalog();
