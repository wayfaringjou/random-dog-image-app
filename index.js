'use-strict';

function generateImageListItem(item) {
  return `
  <li>
  <img src="${item}" />
  </li>
  `;
}
// Use a map function to generate list items
function generateImageList(data) {
  const imageList = data.message.map((item) => generateImageListItem(item));
  return `
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
