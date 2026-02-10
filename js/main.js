const productosDeportivos = [
    {
        id: 1, 
        nombre: "Pelota de fútbol",
        url: "./media/A01.jpg",
        precio: 12000,
        deporte: "futbol" 
    },
    {
        id: 2,
        nombre: "Zapatillas running",
        url: "./media/A02.jpg",
        precio: 180000,
        deporte: "running" 
    },
    {
        id: 3,
        nombre: "Raqueta de tenis",
        url: "./media/A03.jpg",
        precio: 127000,
        deporte: "tenis" 
    },
    {
        id: 4,
        nombre: "Chaleco de Hidratación Noaflojes",
        url: "./media/A04.jpg",
        precio: 120000,
        deporte: "running" 
    },
    {
        id: 5,
        nombre: "Mancuernas 10kg",
        url: "./media/A05.jpg",
        precio: 48000,
        deporte: "fitness" 
    }
]

// Mejora para mantener el carrito actualizado al agregar un nuevo artículo. 

let cardArticle = JSON.parse(localStorage.getItem("cardArticles")) || []

let articleContainer = document.getElementById("article-container")



function renderizarArticulos(articlesArray) {
    articleContainer.innerHTML = ""

    const row = document.createElement("div")
    row.className = "row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4"
    articleContainer.appendChild(row)
    articlesArray.forEach(article => {
        const card = document.createElement("div")
        card.className = "col"
        // Al hacer clic en el botón, se obtiene el id del artículo, se encuentra en el array productosDeportivos y se agrega al array cardArticle.
        card.innerHTML = `
            <div class="card h-100 border-dark bg-light text-dark">
                <div class="card-body d-flex flex-column justify-content-between text-center">
                    <h3 class="card-header">${article.nombre}</h3>
                    <div class="text-center"><img src="${article.url}" class="card-img-top w-25 zoom-img" alt="${article.nombre}"></div>
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
    // Se agregó la función agregarAlCarrito() que se llama después de renderizar los artículos para asignar el evento onclick a cada botón de agregar al carrito.
    agregarAlCarrito()
}

renderizarArticulos(productosDeportivos)

function agregarAlCarrito () {
    const addButtons = document.querySelectorAll(".articleAdd")

    addButtons.forEach(button => {
        button.addEventListener("click", (evento) => {
            const articleId = evento.currentTarget.id
            const selectedArticle = productosDeportivos.find(
                article => article.id == articleId
            )

            cardArticle.push(selectedArticle)

            localStorage.setItem(
                "cardArticles",
                JSON.stringify(cardArticle)
            )
        })
    })
}