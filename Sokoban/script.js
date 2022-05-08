const map = document.getElementById('map');
document.body.addEventListener('keydown', keyPress);

let elementsG = null;

var player = {
    x: 11,
    y: 11,
  };

let button = document.getElementById("restart");
button.addEventListener("click", () => restartGame());


function initializeMap() {
  for (let row = 0; row < tileMap01.height; row++) { //hight 16
    for (let col = 0; col < tileMap01.width; col++) { //width 19
      var element = document.createElement('div');
      element.classList.add('block');
      if (tileMap01.mapGrid[row][col][0] !== ' ') {
        element.classList.add(tileMap01.mapGrid[row][col][0]);
      }
      element.id = 'x' + col + 'y' + row;

      map.appendChild(element);
    }
  }
  elementsG = document.querySelectorAll('.G');
    
  }

  function keyPress(e) {
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
        e.preventDefault();
        movePlayer(0, -1);
        break;
  
      case 'ArrowDown':
      case 's':
        e.preventDefault();
        movePlayer(0, 1);
  
        break;
  
      case 'ArrowLeft':
      case 'a':
        e.preventDefault();
        movePlayer(-1, 0);
  
        break;
  
      case 'ArrowRight':
      case 'd':
        e.preventDefault();
        movePlayer(1, 0);
  
        break;
  
      default:
        console.error();
        break;
    }
  }

  function movePlayer(x, y) {
    var newY = player.y + y;
    var newX = player.x + x;
  
    var playerElement = document.getElementById('x' + player.x + 'y' + player.y);
    var destination = document.getElementById('x' + newX + 'y' + newY);
    if (!destination.classList.contains('W')) {
      const destination2 = document.getElementById(
        'x' + (newX + x) + 'y' + (newY + y)
      );
      if (destination.classList.contains('B')) {
        if (!destination2.classList.contains('W')) {
          if (!destination2.classList.contains('B')) {
            player.x = newX;
            player.y = newY;
            playerElement.classList.remove('P');
            destination.classList.remove('B');
            destination.classList.add('P');
            destination2.classList.add('B');
          }
        }
      } else {
        playerElement.classList.remove('P');
        destination.classList.add('P');
        player.x = newX;
        player.y = newY;
      }
      let count = 0;
      elementsG.forEach(element => {
        if (element.classList.contains('B')) {
          count++;
        }
      });
      if (count === 6) {
        alert('You win!')
        restartGame();
      }
    }
  }

  function restartGame(){
    player.x = 11;
    player.y = 11;
    document.getElementById('map').innerHTML = '';
    initializeMap();
  }
  initializeMap();