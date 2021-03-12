const btnHam = document.querySelector(".ham-btn");
const btnTimes = document.querySelector(".times-btn");
const navBar = document.getElementById("nav-bar");

const bannerSubContent = document.getElementsByClassName(
  "banner-sub-content"
)[0];

const newsList = document.getElementsByClassName("current-news-head")[0];
const latestNews = document.getElementsByClassName("main-container-right")[0];
const containerTopLeft = document.getElementsByClassName(
  "container-top-left"
)[0];
const containerBottomLeft = document.getElementsByClassName(
  "container-bottom-left"
)[0];

btnHam.addEventListener("click", function () {
  if (btnHam.className !== "") {
    btnHam.style.display = "none";
    btnTimes.style.display = "block";
    navBar.classList.add("show-nav");
  }
});

btnTimes.addEventListener("click", function () {
  if (btnHam.className !== "") {
    this.style.display = "none";
    btnHam.style.display = "block";
    navBar.classList.remove("show-nav");
  }
});

const fetchNews = async () => {
  try {
    const response = await fetch("http://localhost:80/api/news");
    const data = await response.json();
    for (let i = 0; i < 16; i++) {
      if (i < 4) {
        newsList.innerHTML += `<h3>
            ${data[i].title.slice(0, 80)}
          </h3>`;
      } else if (i >= 4 && i < 8) {
        bannerSubContent.innerHTML += `<div class="hot-topic">
            <img src=${data[i].urlToImage} alt="" />
            <div class='image-overlay' ></div>
            <div class="hot-topic-content">
              <h2>
                ${data[i].title.slice(0, 80)}
              </h2>
  
              <h3>New Topic ${i + 1}</h3>
              <p>
                ${data[i].description.slice(0, 200)}...
              </p>
              <a href="#">Read More</a>
            </div>
          </div>`;
      } else if (i >= 8 && i < 9) {
        containerTopLeft.innerHTML = `<article>
            <img src=${data[i].urlToImage} />

            <div>
              <h3>
                ${data[i].title}
              </h3>

              <p>
                ${data[i].description}
              </p>

              <a href="#">Read More <span>>></span></a>
            </div>
          </article>`;
      } else if (i >= 9 && i < 11) {
        containerBottomLeft.innerHTML += `<article>
            <img src=${data[i].urlToImage} />
            <div>
              <h3>
                ${data[i].title}
              </h3>
              <p>
                ${data[i].description}
              </p>

              <a href="#">Read More <span>>></span></a>
            </div>
          </article>`;
      } else {
        latestNews.innerHTML += `<article>
          <h4>just in</h4>
          <div>
            <h2>
              ${data[i].title}
            </h2>

            <p>
              ${data[i].description}
            </p>

            <a href="#">Read More <span>>></span></a>
          </div>
          <img src=${data[i].urlToImage} />
        </article>`;
      }
    }
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

fetchNews();
