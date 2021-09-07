document.addEventListener('DOMContentLoaded', function() {
  crearGaleria();
});

function crearGaleria() {
  const galeria = document.querySelector('.galeria-imagenes');

  for(let i = 1; i <=12; i++) {
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/thumb/${i}.webp`;
    imagen.dataset.imagenId = i;

    // * Añadir la función de mostrarImagen
    imagen.onclick = mostrarImagen;

    const lista = document.createElement('LI');

    lista.appendChild(imagen);

    galeria.appendChild(lista);

  }
}

function mostrarImagen(evt) {

    const id = parseInt(evt.target.dataset.imagenId)

    // * Generar la imagen
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    // * Botón para cerrar la imagenes

    const cerrarImagen = document.createElement('p');
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    //* Cuando se da click

    overlay.onclick = () => {
      overlay.remove();
      body.classList.remove('fijar-body')
    }

    // * Cuando se presiona, se cierra la imagen
    cerrarImagen.onclick = () => {
      overlay.remove();
      body.classList.remove('fijar-body')
    }

    overlay.appendChild(cerrarImagen);

    // * Mostrar en el HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}