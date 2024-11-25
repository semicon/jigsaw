const puzzleBoard = document.getElementById('puzzle-board');
const piecesContainer = document.getElementById('pieces-container');

// Create the board and pieces
const rows = 4;
const cols = 4;
let pieces = [];

// Generate the puzzle board
for (let i = 0; i < rows * cols; i++) {
  const boardSlot = document.createElement('div');
  boardSlot.dataset.index = i;
  boardSlot.classList.add('base');
  puzzleBoard.appendChild(boardSlot);
}

// Generate the pieces and shuffle them
for (let i = 0; i < rows * cols; i++) {
  const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.draggable = true;
  piece.dataset.index = i;

  // คำนวณตำแหน่งภาพพื้นหลัง
  const offsetX = (i % cols) * -100; // ความกว้างของแต่ละชิ้น (ตัวอย่าง 100px)
  const offsetY = Math.floor(i / cols) * -100; // ความสูงของแต่ละชิ้น (ตัวอย่าง 100px)
  
  piece.style.width = '100px';
  piece.style.height = '100px';
  piece.style.backgroundImage = "url('https://khaokheow.zoothailand.org/zoo_office/fileupload/encyclopedia_file/357.jpg')";
  piece.style.backgroundPosition = `${offsetX}px ${offsetY}px`;
  piece.style.backgroundSize = `${cols * 100}px ${rows * 100}px`; // ขนาดภาพเต็ม

  pieces.push(piece);
}
pieces = pieces.sort(() => Math.random() - 0.5); // Shuffle the pieces
pieces.forEach(piece => piecesContainer.appendChild(piece));



// Drag and Drop logic
let draggedPiece = null;

piecesContainer.addEventListener('dragstart', (e) => {
  if (e.target.classList.contains('piece')) {
    draggedPiece = e.target;
  }
});

puzzleBoard.addEventListener('dragover', (e) => {
  e.preventDefault();
});

puzzleBoard.addEventListener('drop', (e) => {
  if (e.target.dataset.index && draggedPiece) {
    const targetIndex = e.target.dataset.index;
    const pieceIndex = draggedPiece.dataset.index;

    if (targetIndex === pieceIndex) {
      e.target.appendChild(draggedPiece);
      draggedPiece.classList.add('placed');
      draggedPiece.draggable = false;
      draggedPiece = null;

      // Check if all pieces are placed
      if (document.querySelectorAll('.placed').length === rows * cols) {
        setTimeout(() => alert('Puzzle Completed!'), 100);
      }
    }
  }
});
