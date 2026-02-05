let cardStorage = localStorage.getItem("cardArticles")
cardArticles = JSON.parse(cardStorage)

let cardCarrito = document.getElementById("card-carrito")


function renderizarCarrito (cardItems) {
    const row = document.createElement("div")
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4"
    cardCarrito.appendChild(row)
    cardItems.forEach(article => {
        const card = document.createElement("div")
        card.className = "col"

        const totalCarrito = document.getElementById("totalCarrito")
        const total = cardItems.reduce((sum, item) => sum + item.precio, 0)
        totalCarrito.textContent = `Total: $${total}`

        card.innerHTML = `
            <div class="card h-100 border-dark bg-light text-dark">
                <div class="card-body d-flex flex-column justify-content-between text-center">
                    <h3 class="card-header">${article.nombre}</h3>
                    <h4 class="card-text">Precio: $${article.precio}</h4>
                    <h4 class="card-text">Categoria: ${article.deporte}</h4>
                    <button class="articleRemove btn btn-secondary" id="${article.id}">
                        Quitar del Carrito
                    </button>
                </div>
            </div>
        `
        row.appendChild(card)

    })
}

renderizarCarrito(cardArticles)