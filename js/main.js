const productosDeportivos = [
    {
        id: 1, 
        nombre: "Pelota de fútbol",
        precio: 12000,
        deporte: "futbol" 
    },
    {
        id: 2,
        nombre: "Zapatillas running",
        precio: 180000,
        deporte: "running" 
    },
    {
        id: 3,
        nombre: "Raqueta de tenis",
        precio: 127000,
        deporte: "tenis" 
    },
    {
        id: 4,
        nombre: "Chaleco de Hidratación Noaflojes",
        precio: 120000,
        deporte: "running" 
    },
    {
        id: 5,
        nombre: "Mancuernas 10kg",
        precio: 48000,
        deporte: "fitness" 
    }
]

let cardArticle = []

let articleContainer = document.getElementById("article-container")


function renderizarArticulos(articlesArray) {
    const row = document.createElement("div")
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4"
    articleContainer.appendChild(row)
    articlesArray.forEach(article => {
        const card = document.createElement("div")
        card.className = "col"

        card.innerHTML = `
            <div class="card h-100 border-dark bg-light text-dark">
                <div class="card-body d-flex flex-column justify-content-between text-center">
                    <h3 class="card-header">${article.nombre}</h3>
                    <h4 class="card-text">Precio: $${article.precio}</h4>
                    <h4 class="card-text">Categoria: ${article.deporte}</h4>
                    <button class="articleAdd btn btn-primary" id="${article.id}">
                        Agregar al Carrito
                    </button>
                </div>
            </div>
        `
        row.appendChild(card)
    })
    agregarAlCarrito()
}

renderizarArticulos(productosDeportivos)

function agregarAlCarrito () {
    addButton = document.querySelectorAll(".articleAdd")
    addButton.forEach(button => {
        button.onclick = (evento) => {
            const articleId = evento.currentTarget.id
            const selectedArticle = productosDeportivos.find(article => article.id == articleId)
            cardArticle.push(selectedArticle)

            localStorage.setItem("cardArticles",JSON.stringify(cardArticle))
        }
    })
}