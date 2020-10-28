/* eslint-env jquery */

'use-strict';

// Generate Image
function generateImage(imgSrc) {
  return `
  <img src="${imgSrc}" class="breed-img"/>
  `;
}
// Render image list inside #image-display section
function renderBreedImage(imgSrc) {
  $('main').find('#image-display').html(generateImage(imgSrc));
}

// Fetch request to dogAPI
function getDogImagesByBreed(breed) {
  const options = { method: 'GET' };
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`, options)
    .then((response) => response.json())
    // Call renderBreedImage function with response data
    .then((data) => {
      if (data.status === 'error') {
        alert(data.message);
        return renderBreedImage(`https://http.cat/${data.code}`);
      }
      return renderBreedImage(data.message);
    })
    .catch((error) => alert('An error has ocurred, please try again later.'));
}

// Listen to form submission and pass input value to fetch request
function submitClickedHandler() {
  $('main').on('submit', '.js-image-breed-form', function (e) {
    e.preventDefault();
    const dogBreed = $(this).find('#dog-breed').val();
    getDogImagesByBreed(dogBreed);
  });
}

function dogImageAppHandler() {
  submitClickedHandler();
}

$(dogImageAppHandler);
