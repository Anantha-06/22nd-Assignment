
async function searchProducts(event) {
    event.preventDefault();
    const searchTerm = document
      .getElementById("searchInput")
      .value.toLowerCase();

    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();


      const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm)
      );


      displaySearchResults(filteredProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      document.getElementById("resultsContainer").innerHTML =
        '<p class="text-danger">Failed to fetch products. Please try again later.</p>';
    }
  }


  function displaySearchResults(products) {
    const resultsContainer = document.getElementById("resultsContainer");
    resultsContainer.innerHTML = ""; 

    if (products.length === 0) {
      resultsContainer.innerHTML =
        '<p class="text-warning">No products found matching your search.</p>';
      return;
    }

    products.forEach((product) => {
      const productCard = `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card">
            <img src="${product.image}" class="card-img-top" alt="${product.title}" />
            <div class="card-body">
              <h5 class="card-title">${product.title}</h5>
              <p class="card-text text-success">$${product.price}</p>
              <p class="card-text">${product.description.slice(0, 50)}...</p>
              <a href="#" class="btn btn-warning">View Product</a>
            </div>
          </div>
        </div>`;
      resultsContainer.innerHTML += productCard;
    });
  }