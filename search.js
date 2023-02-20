$('.search').on('keyup', function () {
  let searchValue = $(this).val().toLowerCase();
  let searchResults = allShows.filter(show =>
    show.name.toLowerCase().includes(searchValue)
  );

  $('#search-list').empty();

  $('#main-section').empty();
  let rowDiv = $('<div class="row gy-2"></div>');
  let currentRow = rowDiv.clone();

  for (let i = 0; i < searchResults.length; i++) {
    let currentShow = searchResults[i];
    let showDiv = $(
      `<div class="show col-sm-3"> \
        <a href="./info1.html?id=${currentShow.id}" style="text-decoration: none;"> \
          <img src="${currentShow.image.medium}" \
          alt="${currentShow.name}"
          style="width: 100%; border: 1px solid grey;"/> \
          <p class="show-footer"style="border: 1px solid grey; padding: 5px; text-align: center;">${currentShow.name}</p> \
        </a> \
      </div>`
    );
    currentRow.append(showDiv);
    if ((i + 1) % 4 == 0 || i == searchResults.length - 1) {
      $('#main-section').append(currentRow);
      currentRow = rowDiv.clone();
    }
  }

  if (searchValue.length > 0) {
    for (let i = 0; i < searchResults.length && i < 10; i++) {
      $('#search-list').show();
      let show = searchResults[i];
      $('#search-list').append(
        `<li class="list-group-item"> \
          <a href="./info1.html?id=${show.id}" style="text-decoration: none; color: black;" > \
            ${show.name} \
          </a> \
        </li>`
      );
    }
  } else {
    $('#search-list').hide();
  }
});

$(document).on('click', function (event) {
  if (!$(event.target).is('input')) {
    $('li').hide();
    $('.search').val('');
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let loaderContainer = document.querySelector('#loader-container');
  let content = document.querySelector('#content');
  let timeoutID;

  function showContent() {
    clearTimeout(timeoutID);
    loaderContainer.parentElement.classList.remove('loading');
    document.body.classList.add('loaded');
  }

  function removeLoader() {
    loaderContainer.parentElement.classList.remove('loading');
    document.body.classList.add('loaded');
  }

  timeoutID = setTimeout(removeLoader, 3000);

  loaderContainer.parentElement.classList.add('loading');
  document.addEventListener('click', showContent);

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function setGradient() {
    let color1 = getRandomColor();
    let color2 = getRandomColor();
    let gradient = 'linear-gradient(135deg, ' + color1 + ', ' + color2 + ')';
    if (gradient === 'linear-gradient(135deg, #000000, #000000)') {
      setGradient();
    } else {
      loaderContainer.style.backgroundImage = gradient;
      setTimeout(setGradient, 1000); // Change gradient every 500ms
    }
  }

  setGradient();
});
let bottomButton = document.getElementById('myBtn1');
let topButton = document.getElementById('myBtn2');

// When the user scrolls, show the appropriate button depending on their scroll position
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop == 0 || document.documentElement.scrollTop == 0) {
    topButton.style.display = 'none';
    bottomButton.style.display = 'block';
  } else if (
    window.innerHeight + window.pageYOffset >=
    document.body.offsetHeight
  ) {
    bottomButton.style.display = 'none';
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'block';
    bottomButton.style.display = 'block';
  }
}

// When the user clicks on the bottom button, scroll to the bottom of the document
function scrollToBottom() {
  $('html, body').animate({ scrollTop: $(document).height() }, 1, function () {
    bottomButton.style.display = 'none';
    topButton.style.display = 'block';
  });
}

// When the user clicks on the top button, scroll to the top of the document
function scrollToTop() {
  $('html, body').animate({ scrollTop: 0 }, 1, function () {
    bottomButton.style.display = 'block';
    topButton.style.display = 'none';
  });
}

// When the user scrolls, show the appropriate button depending on their scroll position
$(window).scroll(function () {
  let scrollTop = $(window).scrollTop();
  let documentHeight = $(document).height();
  let windowHeight = $(window).height();

  if (scrollTop > 0) {
    topButton.style.display = 'block';
  } else {
    topButton.style.display = 'none';
  }

  if (documentHeight - (scrollTop + windowHeight) < 1) {
    bottomButton.style.display = 'none';
  } else {
    bottomButton.style.display = 'block';
  }
});

// Attach click event handler to the top button
$(topButton).click(function () {
  scrollToTop();
});

// Attach click event handler to the bottom button
$(bottomButton).click(function () {
  $('html, body').animate({ scrollTop: $(document).height() }, 1, function () {
    bottomButton.style.display = 'none';
    topButton.style.display = 'block';
  });
});
