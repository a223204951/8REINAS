var contador = 0;
var colorReina = 1;
var colorClaro = "#f5f5dc"; // beige - CASILLAS CLARAS
var colorOscuro = "#ffc0cb"; // pink - CASILLAS OSCURAS
var usandoSolucionPredefinida = false;

// Inicializar el tablero con colores correctos
function inicializarTablero() {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            // (0,0) debe ser CLARO (beige)
            if ((i + j) % 2 === 0) {
                celda.style.backgroundColor = colorClaro; // beige
            } else {
                celda.style.backgroundColor = colorOscuro; // pink
            }
        });
    });
}

// Actualizar colores del tablero
function actualizarColoresTablero() {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            if ((i + j) % 2 === 0) {
                celda.style.backgroundColor = colorClaro; // beige
            } else {
                celda.style.backgroundColor = colorOscuro; // pink
            }
        });
    });
}

// Obtener la posición de una celda
function obtenerPosicion(celda) {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].querySelectorAll('td');
        for (let j = 0; j < celdas.length; j++) {
            if (celdas[j] === celda) {
                return { fila: i, columna: j };
            }
        }
    }
    return null;
}

// Obtener celda por posición
function obtenerCelda(fila, columna) {
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    if (fila >= 0 && fila < 8 && columna >= 0 && columna < 8) {
        return filas[fila].querySelectorAll('td')[columna];
    }
    return null;
}

// Marcar casillas atacadas por una reina
function marcarAtaques(fila, columna) {
    // Marcar fila
    for (let j = 0; j < 8; j++) {
        if (j !== columna) {
            const celda = obtenerCelda(fila, j);
            if (celda && !celda.classList.contains('reina')) {
                celda.classList.add('atacada');
                if (!celda.querySelector('.marca-x')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar columna
    for (let i = 0; i < 8; i++) {
        if (i !== fila) {
            const celda = obtenerCelda(i, columna);
            if (celda && !celda.classList.contains('reina')) {
                celda.classList.add('atacada');
                if (!celda.querySelector('.marca-x')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar diagonal superior izquierda
    let i = fila - 1;
    let j = columna - 1;
    while (i >= 0 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j--;
    }
    
    // Marcar diagonal superior derecha
    i = fila - 1;
    j = columna + 1;
    while (i >= 0 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j++;
    }
    
    // Marcar diagonal inferior izquierda
    i = fila + 1;
    j = columna - 1;
    while (i < 8 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j--;
    }
    
    // Marcar diagonal inferior derecha
    i = fila + 1;
    j = columna + 1;
    while (i < 8 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina')) {
            celda.classList.add('atacada');
            if (!celda.querySelector('.marca-x')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j++;
    }
}

// Limpiar todas las marcas de ataque
function limpiarAtaques() {
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');
    
    celdas.forEach(celda => {
        celda.classList.remove('atacada');
        const marcaX = celda.querySelector('.marca-x');
        if (marcaX) {
            marcaX.remove();
        }
    });
}

// Recalcular todos los ataques
function recalcularAtaques() {
    limpiarAtaques();
    
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            if (celda.classList.contains('reina')) {
                marcarAtaques(i, j);
            }
        });
    });
}

// Marcar preview de ataques (hover)
function marcarPreviewAtaques(fila, columna) {
    // Marcar fila
    for (let j = 0; j < 8; j++) {
        if (j !== columna) {
            const celda = obtenerCelda(fila, j);
            if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
                celda.classList.add('preview-ataque');
                if (!celda.querySelector('.marca-x-preview')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x-preview';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar columna
    for (let i = 0; i < 8; i++) {
        if (i !== fila) {
            const celda = obtenerCelda(i, columna);
            if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
                celda.classList.add('preview-ataque');
                if (!celda.querySelector('.marca-x-preview')) {
                    const marcaX = document.createElement('span');
                    marcaX.className = 'marca-x-preview';
                    marcaX.textContent = '★';
                    celda.appendChild(marcaX);
                }
            }
        }
    }
    
    // Marcar diagonal superior izquierda
    let i = fila - 1;
    let j = columna - 1;
    while (i >= 0 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j--;
    }
    
    // Marcar diagonal superior derecha
    i = fila - 1;
    j = columna + 1;
    while (i >= 0 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i--;
        j++;
    }
    
    // Marcar diagonal inferior izquierda
    i = fila + 1;
    j = columna - 1;
    while (i < 8 && j >= 0) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j--;
    }
    
    // Marcar diagonal inferior derecha
    i = fila + 1;
    j = columna + 1;
    while (i < 8 && j < 8) {
        const celda = obtenerCelda(i, j);
        if (celda && !celda.classList.contains('reina') && !celda.classList.contains('atacada')) {
            celda.classList.add('preview-ataque');
            if (!celda.querySelector('.marca-x-preview')) {
                const marcaX = document.createElement('span');
                marcaX.className = 'marca-x-preview';
                marcaX.textContent = '★';
                celda.appendChild(marcaX);
            }
        }
        i++;
        j++;
    }
}

// Limpiar preview de ataques
function limpiarPreviewAtaques() {
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');
    
    celdas.forEach(celda => {
        celda.classList.remove('preview-ataque');
        const marcaX = celda.querySelector('.marca-x-preview');
        if (marcaX) {
            marcaX.remove();
        }
    });
}

// Manejar hover sobre celdas
function cellHover(celda) {
    if (!celda.classList.contains('reina') && !celda.classList.contains('atacada') && contador < 8) {
        const pos = obtenerPosicion(celda);
        if (pos) {
            marcarPreviewAtaques(pos.fila, pos.columna);
        }
    }
}

// Manejar cuando el mouse sale de una celda
function cellLeave() {
    limpiarPreviewAtaques();
}

// Verificar si hay reinas atacándose entre sí
function verificarVictoria() {
    if (contador !== 8 || usandoSolucionPredefinida) {
        return false;
    }
    
    const tabla = document.querySelector('.tablero');
    const filas = tabla.querySelectorAll('tr');
    const posicionesReinas = [];
    
    filas.forEach((fila, i) => {
        const celdas = fila.querySelectorAll('td');
        celdas.forEach((celda, j) => {
            if (celda.classList.contains('reina')) {
                posicionesReinas.push({ fila: i, columna: j });
            }
        });
    });
    
    for (let i = 0; i < posicionesReinas.length; i++) {
        for (let j = i + 1; j < posicionesReinas.length; j++) {
            const reina1 = posicionesReinas[i];
            const reina2 = posicionesReinas[j];
            
            if (reina1.fila === reina2.fila) return false;
            if (reina1.columna === reina2.columna) return false;
            if (Math.abs(reina1.fila - reina2.fila) === Math.abs(reina1.columna - reina2.columna)) {
                return false;
            }
        }
    }
    
    return true;
}

// Mostrar mensaje de victoria
function mostrarMensajeVictoria() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        animation: fadeIn 0.3s ease;
    `;
    
    const mensaje = document.createElement('div');
    mensaje.style.cssText = `
        background: linear-gradient(90deg, #ff69b4 0%, #ff1493 50%, #ff69b4 100%);
        padding: 40px 60px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(255, 105, 180, 0.5);
        text-align: center;
        animation: slideIn 0.5s ease;
    `;
    
    mensaje.innerHTML = `
        <h2 style="color: white; font-size: 48px; margin: 0 0 20px 0; font-family: Arial, sans-serif; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">
            ¡HAS GANADO! ☆
        </h2>
        <p style="color: white; font-size: 20px; margin: 0 0 25px 0; font-family: Arial, sans-serif;">
            ¡Felicidades! :3
            Has resuelto el desafío de las 8 reinas
        </p>
        <button onclick="cerrarMensajeVictoria()" style="
            padding: 12px 30px;
            font-size: 16px;
            background: white;
            color: #ff1493;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'">
            Continuar
        </button>
    `;
    
    overlay.appendChild(mensaje);
    document.body.appendChild(overlay);
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

// Cerrar mensaje de victoria
function cerrarMensajeVictoria() {
    const overlay = document.querySelector('div[style*="position: fixed"]');
    if (overlay) {
        overlay.remove();
    }
}

// Función para colocar/quitar reinas
function cellClick(celda) {
    if (celda.classList.contains('atacada')) {
        return;
    }
    
    if (!celda.classList.contains('reina')) {
        if (contador < 8) {
            celda.innerHTML = "&#9819;";
            celda.classList.add('reina');
            
            if (colorReina == 1) {
                celda.style.color = "rgb(236, 98, 117)";
            } else if (colorReina == 2) {
                celda.style.color = "rgb(155, 61, 72)";
            } else if (colorReina == 3) {
                celda.style.color = "rgb(90, 26, 34)";
            }
            
            contador++;
            limpiarPreviewAtaques();
            
            const pos = obtenerPosicion(celda);
            if (pos) {
                marcarAtaques(pos.fila, pos.columna);
            }
            
            if (verificarVictoria()) {
                setTimeout(() => {
                    mostrarMensajeVictoria();
                }, 300);
            }
        }
    } else {
        celda.innerHTML = "";
        celda.classList.remove('reina');
        celda.style.color = "";
        contador--;
        recalcularAtaques();
    }
}

// Reiniciar el tablero
function resetBoard() {
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');

    celdas.forEach(celda => {
        celda.innerHTML = "";
        celda.classList.remove('reina', 'atacada', 'preview-ataque');
        const marcaX = celda.querySelector('.marca-x');
        if (marcaX) marcaX.remove();
    });

    contador = 0;
    usandoSolucionPredefinida = false;
    
    // Valores por defecto CORRECTOS
    colorClaro = "#f5f5dc"; // beige
    colorOscuro = "#ffc0cb"; // pink
    
    // Actualizar selectores de color CORRECTOS
    document.getElementById('colorClaro').value = colorClaro;
    document.getElementById('colorOscuro').value = colorOscuro;

    actualizarColoresTablero();
}

// Soluciones predefinidas
function solveEightQueens1() {
    resetBoard();
    usandoSolucionPredefinida = true;
    const positions = [0, 4, 7, 5, 2, 6, 1, 3];
    positions.forEach((col, row) => {
        const celda = obtenerCelda(row, col);
        cellClick(celda);
    });
}

function solveEightQueens2() {
    resetBoard();
    usandoSolucionPredefinida = true;
    const positions = [3, 1, 6, 4, 0, 7, 5, 2];
    positions.forEach((col, row) => {
        const celda = obtenerCelda(row, col);
        cellClick(celda);
    });
}

function solveEightQueens3() {
    resetBoard();
    usandoSolucionPredefinida = true;
    const positions = [5, 1, 6, 0, 3, 7, 4, 2];
    positions.forEach((col, row) => {
        const celda = obtenerCelda(row, col);
        cellClick(celda);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    inicializarTablero();
    
    // Listener para color CLARO (beige)
    const colorClaroInput = document.getElementById('colorClaro');
    colorClaroInput.addEventListener('input', function() {
        colorClaro = this.value;
        actualizarColoresTablero();
    });
    
    // Listener para color OSCURO (pink)
    const colorOscuroInput = document.getElementById('colorOscuro');
    colorOscuroInput.addEventListener('input', function() {
        colorOscuro = this.value;
        actualizarColoresTablero();
    });
    
    // Agregar hover listeners
    const tabla = document.querySelector('.tablero');
    const celdas = tabla.querySelectorAll('td');
    
    celdas.forEach(celda => {
        celda.addEventListener('mouseenter', function() {
            cellHover(this);
        });
        
        celda.addEventListener('mouseleave', function() {
            cellLeave();
        });
    });
});