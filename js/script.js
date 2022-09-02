// load & show categories
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCategories(data.data.news_category));
}
const showCategories = categories => {
    categories.forEach(category => {
        console.log(category);
    });
}
loadCategories();