// 1. Espera a que todo el contenido de la página se cargue
document.addEventListener("DOMContentLoaded", function() {

    // --- LÓGICA DE LA TARJETA (Elementos existentes) ---
    const tarjeta = document.getElementById('miTarjeta');
    const escena = document.getElementById('escenaTarjeta');
    const body = document.body;
    const html = document.documentElement;
    const musica = document.getElementById('musicaCumple');
    const iconoSonido = document.getElementById('iconoSonido');

    // --- LÓGICA DE INSTRUCCIONES (Nueva secuencia) ---
    const instruccionMano = document.getElementById('instruccion-mano');
    const instruccionZoom = document.getElementById('instruccionZoom');

    // 1. Oculta ambas manos al inicio
    instruccionMano.classList.add('oculto');
    instruccionZoom.classList.add('oculto');
    
    // 2. Bloquea las interacciones al cargar
    body.classList.add('interacciones-bloqueadas');

    // 3. SECUENCIA DE 4 SEGUNDOS
    // (0s) Muestra la mano de ZOOM
    instruccionZoom.classList.remove('oculto');

    // (2s) Oculta ZOOM, muestra CLICK
    setTimeout(() => {
        instruccionZoom.classList.add('oculto');
        instruccionMano.classList.remove('oculto');
    }, 2000); // 2 segundos

    // (4s) Oculta CLICK y activa la tarjeta
    setTimeout(() => {
        instruccionMano.classList.add('oculto');
        
        // 4. Desbloquea las interacciones
        body.classList.remove('interacciones-bloqueadas');
        
        // (Opcional) Elimina las manos del HTML para limpiar
        setTimeout(() => {
            if (instruccionMano.parentNode) {
                instruccionMano.parentNode.removeChild(instruccionMano);
            }
            if (instruccionZoom.parentNode) {
                instruccionZoom.parentNode.removeChild(instruccionZoom);
            }
        }, 500); // Espera a que la animación de 'oculto' termine
        
    }, 4000); // 4 segundos (2s de zoom + 2s de click)
    

    // --- LÓGICA DEL SCROLL (Tu código original, no se toca) ---
    function esMovilVertical() {
        return window.matchMedia("(orientation: portrait)").matches;
    }
    if (esMovilVertical()) {
        body.classList.add('no-scroll');
        html.classList.add('no-scroll');
    }

    // --- LÓGICA DEL CLICK EN TARJETA (Tu código original, no se toca) ---
    tarjeta.addEventListener('click', function() {
        
        // No se ejecutará hasta que 'interacciones-bloqueadas' se quite
        
        const seEstaAbriendo = tarjeta.classList.toggle('abierta');
        escena.classList.toggle('tarjeta-abierta-escalada');

        if (esMovilVertical()) {
            body.classList.toggle('no-scroll');
            html.classList.toggle('no-scroll');
        }
        
        if (seEstaAbriendo) {
            if (musica) musica.play();
            if (iconoSonido) iconoSonido.classList.add('mostrando');
        } else {
            if (musica) {
                musica.pause();
                musica.currentTime = 0;
            }
            if (iconoSonido) iconoSonido.classList.remove('mostrando');
        }
    });

    // --- LA LÓGICA VIEJA DE LA MANITA HA SIDO REEMPLAZADA POR LA NUEVA SECUENCIA ---
});