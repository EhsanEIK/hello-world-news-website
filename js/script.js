// load & show categories
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCategories(data.data.news_category));
}
const showCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('m-3');
        div.innerHTML = `
        <button onclick=loadNews(${category.category_id}) class="btn btn-outline-secondary">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(div);

    });
}
loadCategories();