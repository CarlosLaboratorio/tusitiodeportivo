let cardStorage = localStorage.getItem("cardArticles")
cardArticles = JSON.parse(cardStorage)

let cardCarrito = document.getElementById("card-carrito")


function renderizarCarrito (cardItems) {
    cardItems.forEach(article => {
        cardCarrito.classList.add("row", "g-3")
        const card = document.createElement("div")
        card.className = "card border-dark col-12 col-sm-6 col-md-4 mb-3 p-3 mb-2 bg-light text-dark"
        card.innerHTML = `  
                        <div class="card-body">
                            <h3 class="card-header">${article.nombre}</h3>
                            <h4 class="card-text">Precio: $${article.precio}</h4>
                            <h4 class="card-text">Categoria: ${article.deporte}</h4>
                        </div>`
        cardCarrito.appendChild(card)
    })
}

renderizarCarrito(cardArticles)