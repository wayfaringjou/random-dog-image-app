'use-strict';

// Fetch request to dogAPI
function getDogImages(imageNumber) {
  const options = { method: 'GET' };
  fetch(`https://dog.ceo/api/breeds/image/random/${imageNumber}`, options)
    .then((response) => response.json())
    .then((data) => console.log(data));
}
// Listen to form submission and pass input value to fetch request
function submitClickedHandler() {
  $('main').on('click', '.js-image-submit', function (e) {
    e.preventDefault();
    // Math.trunc is used to handle inputs with periods entered by keyboard
    let imageNumber = Math.trunc($(this).siblings('#image-number').val());
    // If lower than 1 or higher than 50 is entered by keyboard, reset to min and max
    if (imageNumber <= 0) {
      imageNumber = 1;
      $(this).siblings('#image-number').val(imageNumber);
    } else if (imageNumber > 50) {
      imageNumber = 50;
      $(this).siblings('#image-number').val(imageNumber);
    }
    getDogImages(imageNumber);
  });
}

function dogImageAppHandler() {
  submitClickedHandler();
}

$(dogImageAppHandler);
