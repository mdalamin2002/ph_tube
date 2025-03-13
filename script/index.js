function loadCategory() {
  //  fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json
    .then((res) => res.json())
    // send data displayCategory
    .then((data) => displayCategory(data.categories));
}

function removeActive() {
  const buttons = document.getElementsByClassName("active");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
}
function loadVideos(searchText = "") {
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    });
}

const loadCategoryVideos = (id) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      removeActive();
      const clcikedButton = document.getElementById(`btn-${id}`);

      clcikedButton.classList.add("active");

      displayVideos(data.category);
    });
};

const loadVideoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayVideoDetails(data.video);
    });
};

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <p>${video.authors[0].profile_name}</p>
    <div class="card-actions justify-end">
     
    </div>
  </div>
</div>
  `;
};
// {
//   "category_id": "1001",
//   "category": "Music"
// }
function displayCategory(categories) {
  // get the container
  const categoryContainer = document.getElementById("category-container");

  // loop operation on Array of object
  for (let cat of categories) {
    // create Element
    const div = document.createElement("div");
    div.innerHTML = `
      <button id="btn-${cat.category_id}" onclick="loadCategoryVideos('${cat.category_id}')" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
      `;
    // append the Element
    categoryContainer.appendChild(div);
  }
}

// {
//   "category_id": "1001",
//   "video_id": "aaah",
//   "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
//   "title": "Colors of the Wind",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
//           "profile_name": "Ethan Clark",
//           "verified": true
//       }
//   ],
//   "others": {
//       "views": "233K",
//       "posted_date": "16090"
//   },
//   "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
// }

const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
    
      <div class="col-span-full text-center flex flex-col items-center justify-center py-20">
      <img class="w-[120px]" src="./assets/Icon.png" alt="">
      <h2  class="text-2xl font-bold">Oops!! sorry, There is no content here</h2>
    </div>
    `;
  }

  // keno forEach use korbo
  videos.forEach((video, index) => {
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
  <div class="card bg-base-100  ">
      <figure class="relative">
        <img class="w-full h-[150px] object-cover"
          src="${video.thumbnail}"
          alt="Shoes" />
          <span class="absolute bottom-2 right-2 text-white bg-black px-2 py-1 rounded text-sm ">3hrs 56 min ago</span>
      </figure>
      <div class=" flex gap-3 px-0 py-5">
        <div class="pfofile">
          <div class="avatar">
            <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
              <img src="${video.authors[0].profile_picture}" />
            </div>
          </div>
        </div>
        <div class="intro">
          <h2 class="text-sm font-semibold">${video.title}</h2>
          <p class="text-sm text-gray-400 flex gap-1 ">${
            video.authors[0].profile_name
          } ${
      video.authors[0].verified === true
        ? `<img class="w-5 h-5"   src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="">`
        : ``
    } </p>
          <p class="text-sm text-gray-400">${video.others.views} views</p>
        </div>
       
        </div>

        <button onclick="loadVideoDetails('${
          video.video_id
        }')" class="btn btn-block">Show Details</button>
      </div>
    `;
    videoContainer.append(videoCard);
  });
};
document.getElementById("search-input").addEventListener("keyup", (e) => {
  const input = e.target.value;
  loadVideos(input);
});
loadCategory();
