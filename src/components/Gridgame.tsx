import { ReactNode, useEffect, useState } from "react";

const Gridgame = () => {
  const [toggle, setToggle] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const [board, setBoard] = useState<(ReactNode | null)[]>(Array(9).fill(null));
  const [headerContent, setHeaderContent] = useState<string | ReactNode>(
    "Tic Tac Game"
  );
  useEffect(() => {
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
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setGameOver(true);
        const show =
          board[a] === "O" ? (
            <img src="/assets/c2.png" alt="O" width={50} />
          ) : (
            <img src="/assets/16083479.png" alt="X" width={50} />
          );
        setHeaderContent(
          <>
            <span>congrats</span>
            {show}
            <span>wins</span>
          </>
        );
        setTimeout(() => {
          setShowRestartButton(true);
        }, 1500);
      }
    }

    if (!board.includes(null) && !gameOver) {
      setHeaderContent(
        <span className="text-red-900">Game Over No One Wins ...</span>
      );
      setTimeout(() => {
        resetGrid();
      }, 1500);
    }
  }, [board, gameOver]);

  const onClickHandler = (i: number) => {
    if (board[i] || gameOver) return;
    const newBoard = [...board];
    newBoard[i] = toggle ? "O" : "X";
    setBoard(newBoard);
    setToggle(!toggle);
  };

  const resetGrid = () => {
    setBoard(Array(9).fill(null));
    setGameOver(false);
    setShowRestartButton(false);
    setHeaderContent("Tic Tac Game");
    setToggle(true);
  };
  return (
    <>
      <div className="text-xl text-center font-semibold p-5 text-black">
        {headerContent}
      </div>
      <div className="grid grid-cols-3 gap-3 w-96 bg-neutral-200 mx-auto mb-4 overflow-hidden p-4 rounded-lg my-3">
        {board.map((item, index) => (
          <div
            key={index}
            className="h-28 flex justify-center items-center border border-cyan-900 rounded-lg overflow-hidden"
            onClick={() => onClickHandler(index)}
          >
            {item === "O" && <img src="/assets/c2.png" alt="O" />}
            {item === "X" && <img src="/assets/16083479.png" alt="X" />}
          </div>
        ))}
      </div>
      {showRestartButton && (
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
