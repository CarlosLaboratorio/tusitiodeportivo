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
    articlesArray.forEach(article => {
        articleContainer.classList.add("row", "g-3")
        const card = document.createElement("div")
        card.className = "card border-dark col-12 col-sm-6 col-md-4 mb-3 p-3 mb-2 bg-light text-dark"
        card.innerHTML = `  
                        <div class="card-body">
                            <h3 class="card-header">${article.nombre}</h3>
                            <h4 class="card-text">Precio: $${article.precio}</h4>
                            <h4 class="card-text">Categoria: ${article.deporte}</h4>
                            <button class="articleAdd btn btn-light" id="${article.id}">Agregar</button>
                        </div>`
                        articleContainer.appendChild(card)
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