'use-strict';

// Generate Image
function generateImage(imgSrc) {
  return `
  <img src="${imgSrc}" class="breed-img"/>
  `;
}
// Generate breed name from image address
function generateBreedName(imgSrc) {
  const searchPos = imgSrc.indexOf('breeds/') + 'breeds/'.length;
  let breed = imgSrc.slice(searchPos, imgSrc.indexOf('/', searchPos));
  if (breed.includes('-')) {
    const breedComp = breed.split('-');
    breed = `${breedComp[1]} ${breedComp[0]}`;
  }
  return breed;
}
// Render image list inside #image-display section
function renderBreedImage(data) {
  // If api response is not a success, throw an error and display error code and cat image
  if (data.status === 'error') {
    const imgSectionHtml = `
    <h3><strong>${data.code}</strong></h3>
    <h4>${data.message}</h4>
    ${generateImage(`https://http.cat/${data.code}`)}
    `;
    $('main').find('#image-display').html(imgSectionHtml);
    throw new Error(data.message);
  } else {
    const imgSectionHtml = `
    <h3 class="capitalize">${generateBreedName(data.message)}</h3>
    ${generateImage(data.message)}
    `;
    $('main').find('#image-display').html(imgSectionHtml);
  }
}

// Fetch request to dogAPI
function getDogImagesByBreed(breed) {
  const options = { method: 'GET' };
  fetch(`https://dog.ceo/api/breed/${breed}/images/random`, options)
    .then((response) => response.json())
    // Call renderBreedImage function with response data
    .then((data) => renderBreedImage(data))
    // Catch fetch error and response not ok errors
    .catch((error) => alert(`An error has ocurred. ${error}`));
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
