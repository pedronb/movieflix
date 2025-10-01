let movies = [];
let selectedRating = 0;

const stars = document.querySelectorAll(".star");
const ratingValue = document.getElementById("ratingValue");
const ratingInput = document.getElementById("rating");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.dataset.rating);
    ratingInput.value = selectedRating;
    updateStars();
  });

  star.addEventListener("mouseenter", () => {
    const rating = parseInt(star.dataset.rating);
    updateStars(rating);
  });
});

document.getElementById("ratingStars").addEventListener("mouseleave", () => {
  updateStars();
});

function updateStars(hover = null) {
  const rating = hover || selectedRating;
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add("active");
    } else {
      star.classList.remove("active");
    }
  });
  ratingValue.textContent = `${rating}/5`;
}

document.getElementById("movieForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const movie = {
    id: Date.now(),
    title: document.getElementById("title").value,
    year: document.getElementById("year").value,
    genre: document.getElementById("genre").value,
    rating: selectedRating,
    description: document.getElementById("description").value,
    addedAt: new Date().toISOString(),
  };

  movies.push(movie);
  saveMovies();
  renderMovies();

  e.target.reset();
  selectedRating = 0;
  updateStars();

  document
    .getElementById("moviesContainer")
    .scrollIntoView({ behavior: "smooth" });
});

document.getElementById("filterGenre").addEventListener("change", renderMovies);
document.getElementById("sortBy").addEventListener("change", renderMovies);

function renderMovies() {
  const container = document.getElementById("moviesContainer");
  const filterGenre = document.getElementById("filterGenre").value;
  const sortBy = document.getElementById("sortBy").value;

  let filteredMovies = [...movies];

  if (filterGenre) {
    filteredMovies = filteredMovies.filter((m) => m.genre === filterGenre);
  }

  if (sortBy === "rating") {
    filteredMovies.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "title") {
    filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filteredMovies.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
  }

  if (filteredMovies.length === 0) {
    container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-state-icon">🎬</div>
                        <div class="empty-state-text">Nenhum filme cadastrado ainda.<br>Adicione seu primeiro filme acima!</div>
                    </div>
                `;
    return;
  }

  container.innerHTML = filteredMovies
    .map(
      (movie) => `
                <div class="movie-card">
                    <div class="movie-title">${movie.title}</div>
                    ${
                      movie.year
                        ? `<div class="movie-year">${movie.year}</div>`
                        : ""
                    }
                    ${
                      movie.genre
                        ? `<span class="movie-genre">${movie.genre}</span>`
                        : ""
                    }
                    <div class="movie-rating">
                        <span class="rating-stars">${"★".repeat(
                          movie.rating
                        )}${"☆".repeat(5 - movie.rating)}</span>
                        <span class="rating-number">${movie.rating}/5</span>
                    </div>
                    ${
                      movie.description
                        ? `<div class="movie-description">${movie.description}</div>`
                        : ""
                    }
                    <button class="btn-delete" onclick="deleteMovie(${
                      movie.id
                    })">Excluir</button>
                </div>
            `
    )
    .join("");
}

function deleteMovie(id) {
  if (confirm("Tem certeza que deseja excluir este filme?")) {
    movies = movies.filter((m) => m.id !== id);
    saveMovies();
    renderMovies();
  }
}

function saveMovies() {
  const moviesData = JSON.stringify(movies);
  movies = JSON.parse(moviesData);
}

renderMovies();
