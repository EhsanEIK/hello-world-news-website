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
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-secondary', 'me-4');
        button.innerText = category.category_name;
        categoriesContainer.appendChild(button);
    });
}
loadCategories();