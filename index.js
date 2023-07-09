$(function() {
  $("#submit-btn").click(function(e) {
    e.preventDefault();

    var sol = $("#sol-input").val();
    var page = $("#page-input").val();

    if (!sol || !page) {
      alert("Please enter Sol and Page values.");
      return;
    }

    var apiKey = "aBBTk9o2ZPT8cgerPyNau58JCp5VdfScftAtLuAR";// It doesn't effect the code id you don't give your api key
    var apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&api_key=${apiKey}`;
    
    displayImages(apiUrl);
  });
});

function displayImages(apiUrl) {
  // Clear existing images
  $("#image-container").empty();

  // Make a request to the NASA API
  $.ajax({
    url: apiUrl,
    method: 'GET',
    success: function(response) {
      if (response.photos.length > 0) {
        response.photos.forEach(function(photo) {
          var imageSrc = photo.img_src;
          var imageElement = $("<img>").attr("src", imageSrc);
          $("#image-container").append(imageElement);
        });
      } else {
        alert("No images found for the selected Sol and Page values.");
      }
    },
    error: function() {
      alert("An error occurred while fetching images.");
    }
  });
}