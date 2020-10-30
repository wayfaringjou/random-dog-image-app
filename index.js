'use-strict';

function generateImageListItem(item, breedArr) {
  const searchPos = item.indexOf('breeds/') + 'breeds/'.length;
  let breed = item.slice(searchPos, item.indexOf('/', searchPos));
  if (breed.includes('-')) {
    const breedComp = breed.split('-');
    breed = `${breedComp[1]} ${breedComp[0]}`;
  }
  breedArr.push(breed);
  return `
  <li>
  <img src="${item}" alt="${breed}"/>
  <p class="img-caption capitalize">${breed}</p>
  </li>
  `;
}
// Use a map function to generate list items
function generateImageList(data) {
  const breedArr = [];
  const imageList = data.message.map((item) => generateImageListItem(item, breedArr));
  let headerMsg;
  if (breedArr.length > 2) {
    headerMsg = `${breedArr[0]}, ${breedArr[1]}</span>, and more`;
  } else if (breedArr.length > 1) {
    headerMsg = `${breedArr[0]}</span> and <span class="capitalize">${breedArr[1]}</span>`;
  } else {
    headerMsg = `${breedArr[0]}</span>`;
  }
  return `
  <h3>Look what we found! <span class="capitalize">${headerMsg}!</h3>
  <ul>
    ${imageList.join('')}
  </ul>
  `;
}
// Render image list inside #image-display section
function renderImages(data) {
  $('main').find('#image-display').html(generateImageList(data));
}

// Fetch request to dogAPI
function getDogImages(imageNumber) {
  const options = { method: 'GET' };
  fetch(`https://dog.ceo/api/breeds/image/random/${imageNumber}`, options)
    .then((response) => response.json())
    // Call renderImage function with response data
    .then((data) => renderImages(data))
    .catch((error) => alert('An error has ocurred, please try later.'));
}

// Listen to form submission and pass input value to fetch request
function submitClickedHandler() {
  $('main').on('submit', '.js-image-form', function (e) {
    e.preventDefault();
    const imageNumber = $(this).find('#image-number').val();
    getDogImages(imageNumber);
  });
}

function dogImageAppHandler() {
  submitClickedHandler();
}

$(dogImageAppHandler);
