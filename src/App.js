import { useEffect, useState, useRef } from "react";
import { ReactComponent as Play } from "./img/play.svg";
import { ReactComponent as Pause } from "./img/pause.svg";
import "./style.scss";
function App() {
  const X = Math.floor(window.innerWidth/40);
  const Y = Math.floor(window.innerHeight/40);
  const [tiles, setTiles] = useState(
    Array.from({ length: Y }, (_) => new Array(X).fill(0))
  );
  const width = 40;
  const height = 40;
  const [hasStarted, setHasStarted] = useState(0);
  const buttonRef = useRef();

  const handleTileClick = (event) => {
    console.log(event);
    if(!hasStarted && (event.buttons === 1 || event._reactName === 'onClick')){
      let tempTiles = JSON.parse(JSON.stringify(tiles));
      const i = event.target.getAttribute("i");
      const j = event.target.getAttribute("j");
      tempTiles[i][j] = +!tempTiles[i][j];
      setTiles(tempTiles);
    }
    buttonRef.current.focus();
  };

  const checkNeighbours = (i, j) => {
    let n = 0;
    if (i + 1 < Y && tiles[i + 1][j] == 1) {
      n++;
    }
    if (i - 1 > -1 && tiles[i - 1][j] == 1) {
      n++;
    }
    if (j + 1 < X && tiles[i][j + 1] == 1) {
      n++;
    }
    if (j - 1 > -1 && tiles[i][j - 1] == 1) {
      n++;
    }
    if (i + 1 < Y && j + 1 < X && tiles[i + 1][j + 1] == 1) {
      n++;
    }
    if (i - 1 > -1 && j - 1 > -1 && tiles[i - 1][j - 1] == 1) {
      n++;
    }
    if (i + 1 < Y && j - 1 > -1 && tiles[i + 1][j - 1] == 1) {
      n++;
    }
    if (i - 1 > -1 && j + 1 < X && tiles[i - 1][j + 1] == 1) {
      n++;
    }
    return n;
  };

  const activateGame = () => {
    let tempTiles = JSON.parse(JSON.stringify(tiles));
    for (let i = 0; i < Y; i++) {
      for (let j = 0; j < X; j++) {
        if (tiles[i][j] == 1) {
          if (checkNeighbours(i, j) < 2 || checkNeighbours(i, j) > 3)
            tempTiles[i][j] = 0;
        } else {
          if (checkNeighbours(i, j) == 3) tempTiles[i][j] = 1;
        }
      }
    }
    setTiles(tempTiles);
  };

  const handleStart = (event) => {
    event.preventDefault();
    setHasStarted(prev=>+!prev);
    activateGame();
  };

  useEffect(() => {
    if (hasStarted) {
      setTimeout(() => activateGame(),200);
    }
  }, [tiles]);

  return (
    <form className="container" onSubmit={handleStart}>
      {tiles.map((tiles, i) => {
        return tiles.map((tile, j) => {
          return (
            <div
              style={{ width: width, height: height }}
              onMouseOver={handleTileClick}
              onClick={handleTileClick}
              i={i}
              j={j}
              className={tile ? "active" : ""}
            >
            </div>
          );
        });
      })}
      <button
        type="submit"
        ref={buttonRef}
      >
        {hasStarted ? <Pause/> : <Play/>}
      </button>
    </form>
  );
}

export default App;
