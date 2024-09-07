import { MouseEvent, useEffect, useRef, useState } from "react";

const Gridgame = () => {
  const [toggle, setToggle] = useState(true);
  const [lock, setLock] = useState<HTMLDivElement[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const headerRef = useRef(null);
  // resetGrid function
  function resetGrid() {
    const cells = document.querySelectorAll(".grid div");
    cells.forEach((item) => {
      (item as HTMLDivElement).innerHTML = "";
    });
    setLock([]);
    setGameOver(false);
    setToggle(true);
    const header = headerRef.current as HTMLDivElement | null;
    if (header) {
      header.className = "text-xl text-center font-semibold p-5 text-black";
      header.innerHTML = "Tic Tac Game";
    }
  }

  // restart button

  const checkWin = () => {
    const cells = document.querySelectorAll(".grid div");
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      const cellA = (cells[a] as HTMLElement)?.innerHTML;
      const cellB = (cells[b] as HTMLElement)?.innerHTML;
      const cellC = (cells[c] as HTMLElement)?.innerHTML;

      if (cellA && cellA === cellB && cellB === cellC) {
        //handle header
        console.log(cellA);
        const header = headerRef.current as HTMLDivElement | null;
        if (header) {
          header.className =
            "h-20 w-20 flex items-center justify-center text-xl text-center font-semibold p-5 text-black";
          header.innerHTML = `congrats ${cellA} wins`;
        }
        //disable press action
        cells.forEach((item) => {
          const divElement = item as HTMLDivElement;
          setLock((prev) => [...prev, divElement]);
        });
        console.log(lock);
        //show restart button
        setTimeout(() => {
          setGameOver(true);
        }, 2000);
        return;
      }
    }
  };

  const onClickHandler = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    if (lock.includes(target)) {
      return;
    }
    setLock((prev) => [...prev, target]);
    target.innerHTML = toggle
      ? `<img src="/assets/c2.png" alt="O"/>`
      : `<img src="/assets/16083479.png" alt="X" />`;
    setToggle(!toggle);
    checkWin();
  };

  useEffect(() => {
    if (lock.length === 9) {
      const header = headerRef.current as HTMLDivElement | null;
      if (header) {
        header.className = "text-xl text-center font-semibold p-5 text-red-900";
        header.innerHTML = "Game Over No One Wins ...";
      }
      setTimeout(() => {
        resetGrid();
      }, 2000);
    }
  }, [lock]);

  return (
    <>
      <div
        ref={headerRef}
        className="text-xl text-center font-semibold p-5 text-black"
      >
        Tic Tac Game
      </div>
      <div className="grid grid-cols-3 gap-3 w-96 bg-neutral-200 mx-auto mb-4 overflow-hidden p-4 rounded-lg">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            className="h-28 flex justify-center items-center border border-cyan-900 rounded-lg overflow-hidden"
            onClick={onClickHandler}
          ></div>
        ))}
      </div>
      {gameOver && (
        <button
          onClick={resetGrid}
          className="p-4 rounded-xl text-black border border-black text-lg"
        >
          Restart Game
        </button>
      )}
    </>
  );
};

export default Gridgame;
