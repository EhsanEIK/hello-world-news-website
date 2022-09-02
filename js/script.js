// load & show categories
const loadCategories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => showCategories(data.data.news_category))
        .catch(error => console.log(error));
}
const showCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container');
    categories.forEach(category => {
        const div = document.createElement('div');
        div.classList.add('m-3');
        div.innerHTML = `
        <button onclick="loadNews(${category.category_id})" class="btn btn-outline-secondary">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(div);

    });
}
loadCategories();

// load & show news by category id
const loadNews = async id => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showNews(data.data);
}
const showNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    newses.forEach(news => {
        console.log(news);
        const div = document.createElement('div');
        div.classList.add('row', 'rounded-2', 'shadow', 'p-3', 'm-5');
        div.innerHTML = `
        <div class="col-lg-4">
            <img src="${news.thumbnail_url ? news.thumbnail_url : 'Not Given'}">
        </div>
        <div class="col-lg-8">
            <div class="row">
                <div class="col-lg-12">
                    <h4 class="fw-bold">${news.title ? news.title : 'Not Given'}</h4>
                    <p>${news.details ? news.details.slice(0, 300) : 'Not Given'}...</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-5">
                    <div class="row">
                        <div class="col-lg-3 d-flex align-items-center">
                            <img src="${news.author.img ? news.author.img : 'Not Given'}" class="img-fluid rounded-circle">
                        </div>
                        <div class="col-lg-9">
                            <p class="fw-semibold">
                            ${news.author.name ? news.author.name : 'Not Given'}
                            </p>
                            <small>${news.author.published_date ? news.author.published_date : 'Not Given'}</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <h6>
                        <img src="./icons/view.png" style="width: 20px;"> ${news.total_view ? news.total_view : 'Not Given'}
                    </h6>
                </div>
                <div class="col-lg-2">
                <button onclick="" class="btn btn-primary">Details</button>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    });
}