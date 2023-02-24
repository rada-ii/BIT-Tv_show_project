class Show {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.rating = data.rating.average;
    this.poster = data.image.original;
    this.summary = data.summary;
    this.description = data.summary; // set description to summary for simplicity
    this.premiered = data.premiered;
    this.ended = data.ended;
    this.officialSite = data.officialSite;
  }

  display() {
    $("#show-poster").attr("src", this.poster);
    $("#show-title").text(this.name);
    $("#show-rating").text(`(${this.rating})`);
    $("#show-premiered").text(`${this.premiered}`);
    $("#show-ended").text(`${this.ended}`);
    $("#show-officialSite").html(
      `<a href="${this.officialSite}">${this.officialSite}</a>`
    );
    $("#show-description").html(
      `<h3>Show details</h3><p>${this.description}</p>`
    );
  }
}

let allShows = [];
let showLimit = 50;
let page = 0;

$.ajax({
  url: "https://api.tvmaze.com/shows",
  method: "GET",
  dataType: "json",
  success: function (data) {
    for (let i = 0; i < data.length; i++) {
      allShows.push(new Show(data[i]));
    }
    searchList();
  },
  error: function () {
    alert("Error fetching show data. Please try again later.");
  },
});

let params = new window.URLSearchParams(window.location.search);

let id = params.get("id");

$.ajax({
  url: `https://api.tvmaze.com/shows/${id}`,
  method: "GET",
  dataType: "json",
  success: function (data) {
    let show = new Show(data);
    show.display();
    bottomButton.style.display = "block";
  },
  error: function () {
    alert("Error fetching show data. Please try again later.");
  },
});
