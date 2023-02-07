const stockProductos = [
  {
    id: 1,
    nombre: "Amino Beef Universal",
    cantidad: 1,
    desc: "Amino Beef aminoacidos provenientes de la carne",
    precio: 3550,
    img: "imagenesPagina/aminoBeefUniversal.jpg",
  },
  {
    id: 2,
    nombre: "Amino Energy ON",
    cantidad: 1,
    desc: "Aminoacidos importados de la mejor calidad",
    precio: 2850,
    img: "imagenesPagina/aminoEnergyOn.jpg",
  },
  {
    id: 3,
    nombre: "Amino X BSN",
    cantidad: 1,
    desc: "Aminoacidos en polvo",
    precio: 1200,
    img: "imagenesPagina/aminoXBsn.jpg",
  },
  {
    id: 4,
    nombre: "Isoprot proteina isolada",
    cantidad: 1,
    desc: "Proteina isolada de la mejor calidad",
    precio: 2400,
    img: "imagenesPagina/isoprotEna.jpg",
  },
  {
    id: 5,
    nombre: "Premium Whey Protein",
    cantidad: 1,
    desc: "Premium Whey Protein de Star, proteina de suero de leche ultraconcentrada",
    precio: 700,
    img: "imagenesPagina/proteinaStar.jpg",
  },
  {
    id: 6,
    nombre: "Proteina Vegan Isolate",
    cantidad: 1,
    desc: "Proteina apta para dietas veganas",
    precio: 1950,
    img: "imagenesPagina/veganProtein.jpg",
  },
  {
    id: 7,
    nombre: "Whey X Pro",
    cantidad: 1,
    desc: "Proteina de maxima calidad con creatina micronizada.",
    precio: 1659,
    img: "imagenesPagina/wheyProEna.jpg",
  },
  {
    id: 8,
    nombre: "Shaker Green/Black",
    cantidad: 1,
    desc: "Shaker ideal para preparar tus batidos y bebidas. Con sistema antigrumos y de alta resistencia a golpes",
    precio: 950,
    img: "imagenesPagina/shakerVerde.jpg",
  },
  {
    id: 9,
    nombre: "Straps fuerza color rojo",
    cantidad: 1,
    desc: "Straps para potencia y levantamiento. Mejoran el agarre y la fuerza para tus ejercicios",
    precio: 1300,
    img: "imagenesPagina/strapRojo.jpg",
  },
];
let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector("#procesar-pago");

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if (formulario) {
  formulario.addEventListener("submit", enviarCompra);
}

if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Confirmar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

stockProductos.forEach((prod) => {
  const { id, nombre, precio, desc, img, cantidad } = prod;
  if (contenedor) {
    contenedor.innerHTML += `
    <div class="card mt-3" style="width: 29rem;">
    <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
    <div class="card-body flex-grow-1">
      <h5 class="card-title">${nombre}</h5>
      <p class="card-text">Precio: $${precio}</p>
      <p class="card-text">Descripcion: ${desc}</p>
      <p class="card-text">Cantidad: ${cantidad}</p>
      <button class="btn btn-primary"; onclick="agregarProducto(${id})">Comprar Producto</button>
    </div>
  </div>
    `;
  }
});

const agregarProducto = (id) => {
  const existe = carrito.some((prod) => prod.id === id);

  if (existe) {
    const prod = carrito.map((prod) => {
      if (prod.id === id) {
        prod.cantidad++;
      }
    });
  } else {
    const item = stockProductos.find((prod) => prod.id === id);
    carrito.push(item);
  }
  mostrarCarrito();
};

const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = "";
    carrito.forEach((prod) => {
      const { id, nombre, precio, desc, img, cantidad } = prod;
      console.log(modalBody);
      modalBody.innerHTML += `
      <div class="modal-contenedor">
        <div>
        <img class="img-fluid img-carrito" src="${img}"/>
        </div>
        <div>
        <p>Producto: ${nombre}</p>
      <p>Precio: $${precio}</p>
      <p>Cantidad :${cantidad}</p>
      <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
        </div>
      </div>
      
  
      `;
    });
  }

  if (carrito.length === 0) {
    console.log("Nada");
    modalBody.innerHTML = 
    `<p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
    `;
  } else {
    console.log("Algo");
  }
  carritoContenedor.textContent = carrito.length;

  if (precioTotal) {
    precioTotal.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }

  guardarStorage();
};

function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminarProducto(id) {
  const juegoId = id;
  carrito = carrito.filter((juego) => juego.id !== juegoId);
  mostrarCarrito();
}
function procesarPedido() {
  carrito.forEach((prod) => {
    const listaCompra = document.querySelector("#lista-compra tbody");
    const { id, nombre, precio, img, cantidad } = prod;
    if (listaCompra) {
      const row = document.createElement("tr");
      row.innerHTML += `
              <td>
              <img class="img-fluid img-carrito" src="${img}"/>
              </td>
              <td>${nombre}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>$${precio * cantidad}</td>
            `;
      listaCompra.appendChild(row);
    }
  });
  totalProceso.innerText = carrito.reduce(
    (acc, prod) => acc + prod.cantidad * prod.precio,
    0
  );
}

function enviarCompra(e) {
  e.preventDefault();
  const cliente = document.querySelector("#cliente").value;
  const email = document.querySelector("#correo").value;

  if (email === "" || cliente == "") {
    Swal.fire({
      title: "¡Debes completar tu email y nombre!",
      text: "Rellena el formulario",
      icon: "Error",
      confirmButtonText: "Aceptar",
    });
  } else {
    const btn = document.getElementById("button");

  
    btn.value = "Enviando...";

    const serviceID = "default_service";
    const templateID = "template_qxwi0jn";

    emailjs.sendForm(serviceID, templateID, this).then(
      () => {
        btn.value = "Finalizar compra";
        alert("Correo enviado!");
      },
      (err) => {
        btn.value = "Finalizar compra";
        alert(JSON.stringify(err));
      }
    );

    const spinner = document.querySelector("#spinner");
    spinner.classList.add("d-flex");
    spinner.classList.remove("d-none");

    setTimeout(() => {
      spinner.classList.remove("d-flex");
      spinner.classList.add("d-none");
      formulario.reset();

      const alertExito = document.createElement("p");
      alertExito.classList.add(
        "alert",
        "alerta",
        "d-block",
        "text-center",
        "col-12",
        "mt-2",
        "alert-success"
      );
      alertExito.textContent = "Compra realizada! Gracias por elegir Barbell suplementos";
      formulario.appendChild(alertExito);

      setTimeout(() => {
        alertExito.remove();
      }, 3000);
    }, 3000);
  }
  localStorage.clear();
}


/* Formulario de contacto */

const formularioContacto = document.querySelector('#formulario');



/*Funcion para extraer los datos y convertirlos a formato JSON */

const procesaTodo = (event) => {

  event.preventDefault();
  const datos = new FormData(event.target);
 
 const datosCompletos = Object.fromEntries(datos.entries());
 console.log(JSON.stringify(datosCompletos));
 
 }
 
 formularioContacto.addEventListener('submit', procesaTodo);
 
/* usuarios del formulario de contacto*/

