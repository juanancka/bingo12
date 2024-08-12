// Array para almacenar los números ya llamados
const calledNumbers = new Set();

// funcion de cartón de Bingo
function init() {
    generateNewCard();
}

// Genera un nuevo cartón de Bingo
function generateNewCard() {
    const cardBody = document.getElementById('card-body');
    cardBody.innerHTML = ''; // Limpia el contenido actual del cartón

    const columns = ['B', 'I', 'N', 'G', 'O'];
    let numberIndex = 1;

    for (let row = 0; row < 5; row++) {
        let rowHtml = '<tr>';
        for (let col = 0; col < 5; col++) {
            let number = generateUniqueNumber(col);
            if (row === 2 && col === 2) {
                rowHtml += '<td class="marked">FREE</td>'; // Casilla libre en el centro
            } else {
                rowHtml += `<td onclick="toggleMark(this)">${number}</td>`;
            }
        }
        rowHtml += '</tr>';
        cardBody.innerHTML += rowHtml;
    }
}

// Genera un número único para una columna específica
function generateUniqueNumber(columnIndex) {
    let number;
    do {
        number = Math.floor(Math.random() * 15) + (columnIndex * 15 + 1);
    } while (isNumberUsed(number));
    return number;
}

// Verifica si el número ya ha sido llamado
function isNumberUsed(number) {
    return calledNumbers.has(number);
}

// Marca o desmarca una casilla cuando se hace clic en ella
function toggleMark(cell) {
    cell.classList.toggle('marked');
}

// Llama un nuevo número aleatorio y actualiza la lista de números llamados
function callNumber() {
    let number;
    do {
        number = Math.floor(Math.random() * 75) + 1;
    } while (calledNumbers.has(number));
    calledNumbers.add(number);
    document.getElementById('currentCall').textContent = number;
    updateCalledNumbers();
}

// Actualiza la lista de números llamados en la interfaz
function updateCalledNumbers() {
    const calledNumbersArray = Array.from(calledNumbers).sort((a, b) => a - b);
    document.getElementById('calledNumbers').textContent = calledNumbersArray.join(', ') || 'Ninguno';
}

// Verifica si hay Bingo en el cartón
function checkBingo() {
    const cells = Array.from(document.querySelectorAll('#bingo-card td'));
    const markedCells = cells.filter(cell => cell.classList.contains('marked'));

    // comprobacion de líneas horizontales, verticales y diagonales
    const bingo = checkLines(markedCells) || checkDiagonals(markedCells);
    alert(bingo ? '¡Bingo!' : 'No hay Bingo');
}

// Comprueba si hay una línea completa marcada en las filas o columnas
function checkLines(markedCells) {
    const rows = Array.from({ length: 5 }, (_, i) => markedCells.filter(cell => cell.parentElement.rowIndex === i));
    const cols = Array.from({ length: 5 }, (_, i) => markedCells.filter(cell => cell.cellIndex === i));

    return [...rows, ...cols].some(line => line.length === 5);
}

// Comprueba si hay una línea completa marcada en las diagonales
function checkDiagonals(markedCells) {
    const mainDiagonal = Array.from({ length: 5 }, (_, i) => markedCells.find(cell => cell.cellIndex === i && cell.parentElement.rowIndex === i));
    const secondaryDiagonal = Array.from({ length: 5 }, (_, i) => markedCells.find(cell => cell.cellIndex === (4 - i) && cell.parentElement.rowIndex === i));

    return mainDiagonal.length === 5 || secondaryDiagonal.length === 5;
}
