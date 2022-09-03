/* =========================================
            load & show all category
=========================================== */
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
        <button onclick="loadNews(${category.category_id},'${category.category_name}')" class="btn btn-outline-secondary">${category.category_name}</button>
        `;
        categoriesContainer.appendChild(div);
    });
}
loadCategories();

/* ===============================================
            load & show news by category_id
================================================ */
const loadNews = async (id, categoryName) => {
    try {
        // loader start
        toggleSpinner(true);
        const url = `https://openapi.programming-hero.com/api/news/category/0${id}`;
        const res = await fetch(url);
        const data = await res.json();
        showNews(data.data, categoryName);
    }
    catch (error) {
        console.log(error);
    }
}
const showNews = (allNews, categoryName) => {
    const totalNewsNumberShowElement = document.getElementById('total-news-number-show-element');
    if (allNews.length == 0) {
        totalNewsNumberShowElement.innerText = 'No News Found!';
    }
    else {
        totalNewsNumberShowElement.innerText = `${allNews.length} news found for ${categoryName}`;
    }
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    // sorted by highest view news
    allNews.sort((a, b) => b.total_view - a.total_view);
    allNews.forEach(news => {
        const div = document.createElement('div');
        div.classList.add('row', 'rounded-2', 'shadow', 'p-3', 'mt-5', 'mb-0', 'm-2');
        div.innerHTML = `
        <div onclick="loadNewsDetails('${news._id}')" class="col-lg-4" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
            <img src="${news.thumbnail_url ? news.thumbnail_url : 'No Data Available'}">
        </div>
        <div onclick="loadNewsDetails('${news._id}')" class="col-lg-8" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">
            <div class="row">
                <div class="col-lg-12">
                    <h4 class="fw-bold">${news.title ? news.title : 'No Data Available'}</h4>
                    <p>${news.details ? news.details.slice(0, 300) : 'No Data Available'}...</p>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-lg-5">
                    <div class="row">
                        <div class="col-lg-3 d-flex align-items-center">
                            <img src="${news.author.img ? news.author.img : 'No Data Available'}" class="author-image rounded-circle">
                        </div>
                        <div class="col-lg-9">
                            <p class="fw-semibold">
                            ${news.author.name ? news.author.name : 'No Data Available'}
                            </p>
                            <small>${news.author.published_date ? news.author.published_date : 'No Data Available'}</small>
                        </div>
                    </div>
                </div>
                <div class="col-lg-5">
                    <h6>
                        <img src="./icons/view.png" class="icon"> ${news.total_view ? news.total_view : 'No Data Available'}
                    </h6>
                </div>
                <div class="col-lg-2">
                <a href="#">
                    <img src="./icons/right-arrow.png" class="icon"">
                </a>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(div);
    });
    // loader end
    toggleSpinner(false);
}

/* ===============================================================
            load & show news details on modal by news_id
================================================================= */
const loadNewsDetails = id => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showNewsDetails(data.data))
        .catch(error => console.log(error));
}
const showNewsDetails = newsAllDetails => {
    newsAllDetails.forEach(newsDetails => {
        const newsDetailsTitle = document.getElementById('newsDetailsModalLabel');
        newsDetailsTitle.innerText = newsDetails.title;

        const newsDetailsBody = document.getElementById('news-details-modal-body');
        newsDetailsBody.innerHTML = `
        <img src="${newsDetails.image_url ? newsDetails.image_url : 'No Data Available'}" class="img-fluid my-3">
        <p><span class="fw-bold">Is Trending:</span> ${newsDetails.others_info.is_trending ? newsDetails.others_info.is_trending : 'No Data Available'}</p>
        <p><span class="fw-bold">Is Today's Pick:</span> ${newsDetails.others_info.is_todays_pick ? newsDetails.others_info.is_todays_pick : 'No Data Available'}</p>
        <p><span class="fw-bold">Rating:</span> ${newsDetails.rating.number ? newsDetails.rating.number : 'No Data Available'}, ${newsDetails.rating.badge ? newsDetails.rating.badge : 'No Data Available'}</p>
        <p><span class="fw-bold">View:</span> ${newsDetails.total_view ? newsDetails.total_view : 'No Data Available'}</p>
        <p><span class="fw-bold">Details:</span> ${newsDetails.details ? newsDetails.details : 'No Data Available'}</p>
        <p class="fw-bold text-center my-4">============================</p>
        <p><span class="fw-bold">Author Details:</span>
            <img src="${newsDetails.author.img ? newsDetails.author.img : 'No Data Available'}" class="img-fluid rounded-circle my-3">
            <p><span class="fw-bold">Name:</span>
                ${newsDetails.author.name ? newsDetails.author.name : 'No Data Available'}
            </p>
            <p><span class="fw-bold">Published Date:</span> ${newsDetails.author.published_date ? newsDetails.author.published_date : 'No Data Available'}</p>
        </p>
        `;
    });
}

/* =====================================
            loader/spinner
====================================== */
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}