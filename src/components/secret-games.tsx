import { useState, useEffect } from "react";
import { X, RotateCcw, ArrowLeft, ArrowUp, ArrowDown, ArrowRight, Trophy, Sparkles, User, Cpu, Heart, Check, AlertCircle } from "lucide-react";

interface SecretGamesProps {
  onClose: () => void;
}

type GameMode = "menu" | "tictactoe" | "memory" | "scramble" | "imposter" | "snake";

export function SecretGames({ onClose }: SecretGamesProps) {
  const [mode, setMode] = useState<GameMode>("menu");

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background text-ink animate-slide-up pb-[env(safe-area-inset-bottom)] pt-[max(env(safe-area-inset-top),1.25rem)]">
      {/* Header */}
      <header className="px-5 py-4 border-b border-border/60 flex items-center justify-between bg-surface/90 backdrop-blur">
        <div className="flex items-center gap-2.5">
          {mode !== "menu" && (
            <button
              onClick={() => setMode("menu")}
              className="grid h-9 w-9 place-items-center rounded-xl bg-muted text-ink hover:bg-border/40 transition active:scale-[0.9]"
            >
              <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.4} />
            </button>
          )}
          <div>
            <h2 className="font-display text-lg font-bold flex items-center gap-1.5 leading-none">
              {mode === "menu" && <>Arcade Zone 👾</>}
              {mode === "tictactoe" && <>Panda vs Robot 🧸</>}
              {mode === "memory" && <>Emoji Match 🃏</>}
              {mode === "scramble" && <>Campus Guess 🧠</>}
              {mode === "imposter" && <>Imposter Party 🕵️‍♂️</>}
              {mode === "snake" && <>Campus Snake 🐍</>}
            </h2>
            <p className="text-[10px] font-semibold text-ink-soft mt-0.5 leading-none">
              {mode === "menu" && "Secret campus arcade. Shhh! 🤫"}
              {mode === "tictactoe" && "Tic Tac Toe against AI bot"}
              {mode === "memory" && "Find matching emoji pairs"}
              {mode === "scramble" && "Unscramble CSE-B words"}
              {mode === "imposter" && "Who is the imposter in CSE-B? 🤫"}
              {mode === "snake" && "Eat campus foods and grow longer"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="grid h-9 w-9 place-items-center rounded-full bg-muted text-ink-soft hover:text-ink transition active:scale-[0.9]"
        >
          <X className="h-4 w-4" />
        </button>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-5 no-scrollbar">
        {mode === "menu" && <GameMenu onSelectGame={setMode} />}
        {mode === "tictactoe" && <TicTacToe />}
        {mode === "memory" && <MemoryGame />}
        {mode === "scramble" && <WordScramble />}
        {mode === "imposter" && <ImposterGame />}
        {mode === "snake" && <SnakeGame />}
      </main>
    </div>
  );
}

/* -------------------------- Game Menu -------------------------- */
function GameMenu({ onSelectGame }: { onSelectGame: (mode: GameMode) => void }) {
  const games = [
    {
      id: "imposter" as GameMode,
      title: "Imposter Party 🕵️‍♂️",
      desc: "Local pass-and-play party game with your classmates!",
      primaryEmoji: "🕵️‍♂️",
      color: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-deep border border-indigo-100/30 dark:border-indigo-900/30",
    },
    {
      id: "tictactoe" as GameMode,
      title: "Panda vs Robot",
      desc: "Play Tic Tac Toe against an AI Bot in your boring class!",
      primaryEmoji: "🤖",
      color: "bg-red-50 dark:bg-red-950/30 text-red-900 border border-red-100/30 dark:border-red-900/30",
    },
    {
      id: "memory" as GameMode,
      title: "Emoji Match",
      desc: "Test your memory limit by pairing cute campus emojis!",
      primaryEmoji: "🃏",
      color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 border border-emerald-100/30 dark:border-emerald-900/30",
    },
    {
      id: "scramble" as GameMode,
      title: "Campus Word Guess",
      desc: "Unscramble campus & teacher names from SJCET!",
      primaryEmoji: "🏫",
      color: "bg-amber-50 dark:bg-amber-950/30 text-amber-900 border border-amber-100/30 dark:border-amber-900/30",
    },
    {
      id: "snake" as GameMode,
      title: "Campus Snake 🐍",
      desc: "Eat delicious college foods like Porotta & Chai to grow longer!",
      primaryEmoji: "🐍",
      color: "bg-teal-50 dark:bg-teal-950/30 text-teal-900 border border-teal-100/30 dark:border-teal-900/30",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-[28px] bg-indigo-deep p-5 text-white relative overflow-hidden shadow-lg mb-2">
        <div className="absolute inset-0 bg-dots opacity-10" />
        <div className="relative">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
            Unlocked 🔑
          </span>
          <h3 className="font-display text-xl font-extrabold mt-3 leading-tight">
            Lecture Hall Boring? 😴
          </h3>
          <p className="text-xs text-white/80 mt-1 leading-relaxed">
            Here are some quick, cute offline games to keep you awake. Just don't get caught by teachers! 👨‍🏫🤫
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => onSelectGame(g.id)}
            className="w-full flex items-center gap-4 rounded-3xl border border-border/60 bg-surface p-4 text-left hover:border-indigo/25 transition active:scale-[0.99]"
          >
            <div className={`h-12 w-12 shrink-0 flex items-center justify-center rounded-full ${g.color}`}>
              <span className="text-2xl leading-none">{g.primaryEmoji}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="font-display text-sm font-bold text-ink">{g.title}</h4>
              <p className="text-xs text-ink-soft mt-0.5 leading-tight">{g.desc}</p>
            </div>
          </button>
        ))}
      </div>
      
      <p className="text-center text-[10px] font-bold uppercase text-ink-soft/40 mt-8 tracking-wider flex items-center justify-center gap-1">
        Made with <Heart className="h-3 w-3 text-blush fill-blush animate-pulse" /> for SJCET CSE-B
      </p>
    </div>
  );
}

/* -------------------------- Game: Tic Tac Toe -------------------------- */
function TicTacToe() {
  const [gameType, setGameType] = useState<"choose" | "vs_ai" | "two_player">("choose");
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  const P_SYMBOL = "🧸"; // Player Panda (AI Mode)
  const B_SYMBOL = "🤖"; // Bot Robot (AI Mode)
  const X_SYMBOL = "❌"; // Player 1 (2P Mode)
  const O_SYMBOL = "⭕"; // Player 2 (2P Mode)

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
    [0, 4, 8], [2, 4, 6]             // Diag
  ];

  const checkWinner = (grid: (string | null)[]) => {
    for (const pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
        return { winner: grid[a], line: pattern };
      }
    }
    if (grid.every(cell => cell !== null)) {
      return { winner: "Draw", line: null };
    }
    return null;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner) return;

    if (gameType === "vs_ai") {
      if (!isPlayerTurn) return;

      const nextBoard = [...board];
      nextBoard[index] = P_SYMBOL;
      setBoard(nextBoard);

      const winStatus = checkWinner(nextBoard);
      if (winStatus) {
        setWinner(winStatus.winner);
        setWinningLine(winStatus.line);
      } else {
        setIsPlayerTurn(false);
      }
    } else if (gameType === "two_player") {
      const nextBoard = [...board];
      const currentSymbol = isPlayerTurn ? X_SYMBOL : O_SYMBOL;
      nextBoard[index] = currentSymbol;
      setBoard(nextBoard);

      const winStatus = checkWinner(nextBoard);
      if (winStatus) {
        setWinner(winStatus.winner);
        setWinningLine(winStatus.line);
      } else {
        setIsPlayerTurn(!isPlayerTurn);
      }
    }
  };

  // Bot logic
  useEffect(() => {
    if (gameType !== "vs_ai" || isPlayerTurn || winner) return;

    const timeout = setTimeout(() => {
      const emptyCells = board.map((cell, idx) => cell === null ? idx : null).filter(val => val !== null) as number[];
      if (emptyCells.length === 0) return;

      let choice = -1;

      // 1. Can Bot win?
      for (const idx of emptyCells) {
        const testBoard = [...board];
        testBoard[idx] = B_SYMBOL;
        if (checkWinner(testBoard)?.winner === B_SYMBOL) {
          choice = idx;
          break;
        }
      }

      // 2. Block player?
      if (choice === -1) {
        for (const idx of emptyCells) {
          const testBoard = [...board];
          testBoard[idx] = P_SYMBOL;
          if (checkWinner(testBoard)?.winner === P_SYMBOL) {
            choice = idx;
            break;
          }
        }
      }

      // 3. Pick center?
      if (choice === -1 && emptyCells.includes(4)) {
        choice = 4;
      }

      // 4. Random choice
      if (choice === -1) {
        choice = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      }

      const nextBoard = [...board];
      nextBoard[choice] = B_SYMBOL;
      setBoard(nextBoard);

      const winStatus = checkWinner(nextBoard);
      if (winStatus) {
        setWinner(winStatus.winner);
        setWinningLine(winStatus.line);
      } else {
        setIsPlayerTurn(true);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [gameType, isPlayerTurn, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
    setWinningLine(null);
  };

  const selectMode = (mode: "vs_ai" | "two_player") => {
    setGameType(mode);
    resetGame();
  };

  if (gameType === "choose") {
    return (
      <div className="flex flex-col items-center justify-center py-4 text-center space-y-6 max-w-sm mx-auto animate-slide-up">
        {/* Cute Tic Tac Toe Grid Illustration */}
        <div className="grid grid-cols-3 gap-2 w-28 mx-auto p-2 bg-muted/40 rounded-2xl border border-border/40">
          <div className="aspect-square flex items-center justify-center text-lg font-black text-rose-500">❌</div>
          <div className="aspect-square flex items-center justify-center text-lg font-black text-indigo">⭕</div>
          <div className="aspect-square flex items-center justify-center text-lg font-black text-rose-500">❌</div>
          
          <div className="aspect-square flex items-center justify-center text-lg font-black text-indigo">⭕</div>
          <div className="aspect-square flex items-center justify-center text-[10px] text-ink-soft/40 font-bold">VS</div>
          <div className="aspect-square flex items-center justify-center text-lg font-black text-rose-500">❌</div>
          
          <div className="aspect-square flex items-center justify-center text-[14px]">🧸</div>
          <div className="aspect-square flex items-center justify-center text-lg font-black text-indigo">⭕</div>
          <div className="aspect-square flex items-center justify-center text-[14px]">🤖</div>
        </div>

        <div>
          <h3 className="font-display text-lg font-bold text-ink">Tic Tac Toe (XOX)</h3>
          <p className="text-xs text-ink-soft mt-1 leading-relaxed px-4">
            Play against a smart AI robot or challenge a classmate sitting next to you!
          </p>
        </div>

        <div className="w-full grid grid-cols-2 gap-3.5 pt-2">
          {/* Card 1: Play vs AI */}
          <button
            onClick={() => selectMode("vs_ai")}
            className="group flex flex-col items-center text-center p-4 rounded-3xl border border-rose-100 dark:border-rose-950 bg-rose-50/50 dark:bg-rose-950/15 hover:bg-rose-50 dark:hover:bg-rose-950/20 hover:border-rose-200 active:scale-95 transition shadow-xs"
          >
            <div className="h-12 w-12 rounded-2xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-2xl mb-3 shadow-xs">
              🤖
            </div>
            <h4 className="font-display text-xs font-black text-rose-900 dark:text-rose-200">vs Robot AI</h4>
            <p className="text-[10px] text-rose-600/70 dark:text-rose-400/70 mt-1 leading-tight font-semibold">
              Panda vs AI bot in boring class 🧸
            </p>
          </button>

          {/* Card 2: Pass & Play */}
          <button
            onClick={() => selectMode("two_player")}
            className="group flex flex-col items-center text-center p-4 rounded-3xl border border-indigo-100 dark:border-indigo-950 bg-indigo-50/50 dark:bg-indigo-950/15 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 hover:border-indigo-200 active:scale-95 transition shadow-xs"
          >
            <div className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-2xl mb-3 shadow-xs">
              👥
            </div>
            <h4 className="font-display text-xs font-black text-indigo-deep dark:text-indigo-200">2 Players</h4>
            <p className="text-[10px] text-indigo/70 dark:text-indigo-300/70 mt-1 leading-tight font-semibold">
              Classic XOX with a friend! ❌⭕
            </p>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-4 relative">
      {/* Back button */}
      <button
        onClick={() => setGameType("choose")}
        className="absolute top-0 left-0 grid h-9 w-9 place-items-center rounded-xl bg-muted text-ink-soft hover:text-ink active:scale-95 transition"
      >
        <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.4} />
      </button>

      {/* Game board wrapper to look like a game board */}
      <div className="mt-12 p-3 bg-muted/40 rounded-[28px] border border-border/40 w-full max-w-[290px] shadow-sm">
        <div className="grid grid-cols-3 gap-2.5">
          {board.map((cell, idx) => {
            const isWinningCell = winningLine?.includes(idx);
            
            let cellStyle = "bg-surface border-border/60 hover:border-indigo/20 text-ink";
            if (isWinningCell) {
              cellStyle = "bg-indigo-deep text-white border-transparent scale-[1.03] shadow-md shadow-indigo/20";
            } else if (cell === "❌" || cell === "🧸") {
              cellStyle = "bg-rose-50/70 dark:bg-rose-950/20 border-rose-100/50 dark:border-rose-900/30 text-rose-600 dark:text-rose-400";
            } else if (cell === "⭕" || cell === "🤖") {
              cellStyle = "bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-100/50 dark:border-indigo-900/30 text-indigo dark:text-indigo-400";
            }

            return (
              <button
                key={idx}
                onClick={() => handleCellClick(idx)}
                className={`h-[78px] rounded-[18px] border flex items-center justify-center text-3xl font-bold transition active:scale-95 shadow-xs ${cellStyle}`}
              >
                {cell}
              </button>
            );
          })}
        </div>
      </div>

      {/* Info status */}
      <div className="mt-8 text-center">
        {winner ? (
          <div className="space-y-1">
            <h4 className="font-display text-lg font-extrabold text-indigo flex items-center justify-center gap-1.5 animate-bounce">
              <Trophy className="h-5 w-5 text-butter fill-butter" />
              {gameType === "vs_ai" ? (
                <>
                  {winner === P_SYMBOL && "Panda Wins! 🐼🎉"}
                  {winner === B_SYMBOL && "Robot Wins! 🤖❌"}
                </>
              ) : (
                <>
                  {winner === X_SYMBOL && "Player 1 Wins! ❌🎉"}
                  {winner === O_SYMBOL && "Player 2 Wins! ⭕🎉"}
                </>
              )}
              {winner === "Draw" && "It is a Draw! 🤝"}
            </h4>
            <p className="text-xs text-ink-soft font-semibold">Good game!</p>
          </div>
        ) : (
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border/60 bg-surface shadow-xs text-xs font-bold text-ink-soft">
            {gameType === "vs_ai" ? (
              isPlayerTurn ? (
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Your Turn 🧸
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-indigo">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Robot is thinking... 🤖
                </span>
              )
            ) : (
              isPlayerTurn ? (
                <span className="flex items-center gap-1.5 text-rose-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                  </span>
                  Player 1 Turn (❌)
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-indigo">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  Player 2 Turn (⭕)
                </span>
              )
            )}
          </div>
        )}

        <button
          onClick={resetGame}
          className="mt-6 flex items-center justify-center gap-2 mx-auto px-5 py-3 rounded-2xl bg-indigo-deep text-white font-display font-bold text-xs shadow-md active:scale-95 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart Game
        </button>
      </div>
    </div>
  );
}

/* -------------------------- Game: Memory Match -------------------------- */
interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

function MemoryGame() {
  const emojis = ["🧸", "🐼", "🦖", "🍦", "🚀", "👾", "🍩", "📚"];
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({
        id: idx,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setSelectedCards([]);
    setMoves(0);
    setMatches(0);
    setIsWon(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (cardId: number) => {
    // Ignore clicks on already matched, flipped or when 2 cards are already selected
    if (cards[cardId].isMatched || cards[cardId].isFlipped || selectedCards.length >= 2) return;

    const nextCards = [...cards];
    nextCards[cardId].isFlipped = true;
    setCards(nextCards);

    const nextSelected = [...selectedCards, cardId];
    setSelectedCards(nextSelected);

    if (nextSelected.length === 2) {
      setMoves(prev => prev + 1);
      const [firstId, secondId] = nextSelected;

      if (cards[firstId].emoji === cards[secondId].emoji) {
        // Match!
        setTimeout(() => {
          const matchCards = [...cards];
          matchCards[firstId].isMatched = true;
          matchCards[secondId].isMatched = true;
          setCards(matchCards);
          setSelectedCards([]);
          setMatches(prev => {
            const next = prev + 1;
            if (next === emojis.length) {
              setIsWon(true);
            }
            return next;
          });
        }, 300);
      } else {
        // Flip back
        setTimeout(() => {
          const flipCards = [...cards];
          flipCards[firstId].isFlipped = false;
          flipCards[secondId].isFlipped = false;
          setCards(flipCards);
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-2">
      {/* Stats bar */}
      <div className="w-full max-w-[280px] flex justify-between text-xs font-bold text-ink-soft mb-4 px-1">
        <span>Moves: {moves}</span>
        <span>Pairs matched: {matches}/{emojis.length}</span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-2.5 w-full max-w-[280px]">
        {cards.map((c) => {
          const showEmoji = c.isFlipped || c.isMatched;
          return (
            <button
              key={c.id}
              onClick={() => handleCardClick(c.id)}
              className={`h-[60px] rounded-xl flex items-center justify-center text-2xl shadow-sm border transition-all duration-300 ${
                c.isMatched 
                  ? "bg-mint/15 border-mint/20 scale-[0.98]" 
                  : showEmoji
                    ? "bg-surface border-indigo/20 rotate-y-180"
                    : "bg-indigo-deep text-white border-transparent hover:bg-indigo active:scale-95"
              }`}
            >
              {showEmoji ? c.emoji : "❓"}
            </button>
          );
        })}
      </div>

      {/* Win section */}
      <div className="mt-8 text-center">
        {isWon && (
          <div className="space-y-1">
            <h4 className="font-display text-xl font-extrabold text-indigo flex items-center justify-center gap-1.5 animate-bounce">
              <Trophy className="h-5 w-5 text-butter fill-butter" />
              Awesome Memory! 🎉
            </h4>
            <p className="text-xs text-ink-soft">Finished in {moves} moves!</p>
          </div>
        )}

        <button
          onClick={initGame}
          className="mt-6 flex items-center justify-center gap-2 mx-auto px-5 py-3 rounded-2xl bg-indigo-deep text-white font-display font-bold text-xs shadow-md active:scale-95 transition"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Restart Game
        </button>
      </div>
    </div>
  );
}

/* -------------------------- Game: Word Scramble -------------------------- */
interface CampusWord {
  word: string;
  hint: string;
}

function WordScramble() {
  const POOL: CampusWord[] = [
    { word: "SARJU", hint: "ML Teacher name 🤖" },
    { word: "SJCET", hint: "Our engineering college acronym 🏫" },
    { word: "NETWORKS", hint: "Subject P1 starts with Computer ____ 🌐" },
    { word: "LUNCH", hint: "12:45 PM – 1:35 PM Break 🍱" },
    { word: "ALGORITHMS", hint: "Design and Analysis of ____ 🧩" },
    { word: "MADONA", hint: "Our favorite hangout cafe for hot tea & snacks ☕" },
    { word: "GANDHIJI", hint: "Whose statue stands in our SJCET college campus? 🗿" },
    { word: "JOBY", hint: "Bald HOD whose head reflects sunlight like a solar panel! ☀️👨‍🦲" },
    { word: "POROTTA", hint: "Canteen lile beef fry nte best combination item! 🥞" },
    { word: "BEEFFRY", hint: "Best combination with Porotta! 🥩🔥" },
    { word: "PUTTU", hint: "Cylinder-shaped steamed rice cake 🥥" },
    { word: "SULAIMANI", hint: "Black tea with a splash of lemon 🍋☕" },
    { word: "TEAKADA", hint: "Where class group discussions happen ☕" },
    { word: "KSRTC", hint: "Red and yellow government fast passenger bus 🚌" },
    { word: "CHANDRIKA", hint: "Our favorite traditional green soap 🧼" },
    { word: "MEDIMIX", hint: "Herbal ayurvedic green soap 🌿" },
    { word: "LABRECORD", hint: "The booklet we write codes and diagrams in 📓" },
    { word: "GRACEMARK", hint: "Extra marks from NCC, NSS or Sports 🎁" },
    { word: "KSEB", hint: "Department responsible for classroom power cuts 🔌" },
    { word: "AKSHAYA", hint: "Where we print documents and pay fees 🏛🏽" },
    { word: "ASSIGNMENT", hint: "Handwritten sheets submitted at the last minute 📝" },
    { word: "VIVA", hint: "Smiling at the external examiner while your brain goes completely blank 🧠❌" },
    { word: "COPYPASTE", hint: "The ultimate programming skill used in coding labs 💻" },
    { word: "ETLAB", hint: "The college portal we check daily for attendance percentage and internal marks 📊💻" },
    { word: "THATTUKADA", hint: "The local street food spot we visit for night tea and double omelette 🍳" },
    { word: "MUTTAPUFFS", hint: "Our favorite crispy bakery snack containing half an egg 🥚🥐" },
    { word: "PAZHAMPORI", hint: "The ultimate yellow sweet banana fritter in college canteen 🍌" },
    { word: "AUTO", hint: "The three-wheeled vehicle we run to catch when late for class 🛺" },
    { word: "KUDA", hint: "The folding umbrella that protects us from heavy rains on SJCET campus ☔" },
    { word: "LULUMALL", hint: "The massive shopping mall in Kochi where everyone goes for weekend trips 🛍️" },
    { word: "HOTSPOT", hint: "The mobile internet connection we beg our friends to turn on 📱" }
  ];

  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const [shuffledPool, setShuffledPool] = useState<CampusWord[]>([]);
  const [level, setLevel] = useState(0);
  const [scrambled, setScrambled] = useState("");
  const [guess, setGuess] = useState("");
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setShuffledPool(shuffleArray(POOL));
  }, []);

  const scramble = (w: string) => {
    const arr = w.split("");
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    const res = arr.join("");
    if (res === w && w.length > 1) return scramble(w);
    return res;
  };

  const loadLevel = (lv: number, currentPool: CampusWord[]) => {
    if (currentPool.length === 0) return;
    if (lv >= currentPool.length) {
      setScrambled("");
      return;
    }
    setScrambled(scramble(currentPool[lv].word));
    setGuess("");
    setIsCorrect(null);
  };

  useEffect(() => {
    if (shuffledPool.length > 0) {
      loadLevel(level, shuffledPool);
    }
  }, [level, shuffledPool]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guess.trim() || shuffledPool.length === 0) return;

    const correctWord = shuffledPool[level].word;
    const cleanGuess = guess.replace(/\s+/g, "").toUpperCase();
    const cleanCorrect = correctWord.replace(/\s+/g, "").toUpperCase();
    const isAnswerCorrect = cleanGuess === cleanCorrect;

    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setScore(prev => prev + 10);
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([100]);
      }
    } else {
      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate([200]);
      }
    }
  };

  const handleNext = () => {
    setLevel(prev => prev + 1);
  };

  const handleRestart = () => {
    setShuffledPool(shuffleArray(POOL));
    setLevel(0);
    setScore(0);
  };

  const currentLevel = shuffledPool[level];
  const isFinished = shuffledPool.length > 0 && level >= shuffledPool.length;

  return (
    <div className="flex flex-col items-center justify-center py-2 max-w-sm mx-auto">
      {isFinished ? (
        <div className="text-center py-6">
          <Trophy className="h-12 w-12 text-butter fill-butter mx-auto animate-bounce mb-3" />
          <h4 className="font-display text-xl font-extrabold text-indigo">
            Arcade Champion! 🎉
          </h4>
          <p className="text-xs text-ink-soft mt-1">
            You guessed all campus words correctly!
          </p>
          <div className="mt-4 inline-block bg-indigo-deep text-white px-4 py-2 rounded-2xl font-bold text-sm">
            Total Score: {score} pts
          </div>
          <button
            onClick={handleRestart}
            className="mt-6 flex items-center justify-center gap-2 mx-auto px-5 py-3 rounded-2xl border border-indigo text-indigo font-display font-bold text-xs active:scale-95 transition"
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className="w-full space-y-5">
          {/* Status */}
          <div className="flex justify-between items-center text-xs font-bold text-ink-soft">
            <span>Word {level + 1} of {shuffledPool.length}</span>
            <span>Score: {score} pts</span>
          </div>

          {/* Question card */}
          <div className="rounded-3xl border border-border/60 bg-surface p-5 text-center shadow-sm max-w-full overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft/75">
              Unscramble the letters:
            </p>
            <h3 className={`font-display font-black text-indigo uppercase mt-2 break-all ${
              scrambled.length > 8 
                ? "text-xl sm:text-2xl tracking-wider" 
                : "text-2.5xl sm:text-3xl tracking-widest"
            }`}>
              {scrambled}
            </h3>
            
            {/* Clue Hint */}
            <div className="mt-4 bg-muted/60 dark:bg-surface-2 rounded-2xl p-3 flex items-start gap-1.5 max-w-full text-left">
              <span className="text-[10px] font-bold bg-indigo text-white px-1.5 py-0.5 rounded uppercase shrink-0 mt-0.5">Hint</span>
              <p className="text-xs text-ink-soft font-semibold leading-relaxed break-words">{currentLevel?.hint}</p>
            </div>
          </div>

          {/* Form guess input */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={isCorrect === true}
              placeholder="Your guess..."
              className="w-full px-4 py-3.5 rounded-2xl border border-border/60 bg-surface text-ink text-center font-display font-bold placeholder-ink-soft/50 focus:outline-none focus:border-indigo/55 transition"
            />

            {isCorrect === null && (
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
              >
                Submit Answer
              </button>
            )}
          </form>

          {/* Feedbacks */}
          {isCorrect === true && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-mint/20 border border-mint/30 p-3.5 text-center text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                Correct! +10 pts 🥳🎉
              </div>
              <button
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
              >
                Next Word 🚀
              </button>
            </div>
          )}

          {isCorrect === false && (
            <div className="space-y-3">
              <div className="rounded-2xl bg-blush/20 border border-blush/30 p-3.5 text-center text-red-800 dark:text-red-300 font-bold text-xs">
                Wrong answer! Try again 🥺❌
              </div>
              <button
                onClick={() => setIsCorrect(null)}
                className="w-full py-3.5 rounded-2xl border border-border/60 bg-surface text-ink font-display font-bold text-sm hover:border-indigo/25 active:scale-95 transition"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------- Game: Imposter Finder -------------------------- */
interface ImposterWordPair {
  category: string;
  citizenWord: string;
  imposterWord: string;
  citizenClues: string[];
  imposterClues: string[];
}

const IMPOSTER_POOL: ImposterWordPair[] = [
  {
    category: "Drinks ☕",
    citizenWord: "CHAI",
    imposterWord: "COFFEE",
    citizenClues: ["Leaves 🍃", "Milk 🥛", "Morning ☀️", "Cup ☕"],
    imposterClues: ["Beans 🫘", "Black 🖤", "Starbucks 🥤", "Bitter 😵‍💫"],
  },
  {
    category: "College Places 🏫",
    citizenWord: "CLASSROOM",
    imposterWord: "LAB",
    citizenClues: ["Desk 🪑", "Blackboard 📋", "Lecture 🥱", "Teacher 🧑‍🏫"],
    imposterClues: ["Computers 💻", "AC ❄️", "Coding 🐍", "Chairs 🪑"],
  },
  {
    category: "Chat Apps 📱",
    citizenWord: "WHATSAPP",
    imposterWord: "TELEGRAM",
    citizenClues: ["Green 💚", "Status 🤳", "Group chat 💬", "Calls 📞"],
    imposterClues: ["Channels 📢", "Blue 💙", "Files 📂", "Stickers ✨"],
  },
  {
    category: "Devices 💻",
    citizenWord: "LAPTOP",
    imposterWord: "PHONE",
    citizenClues: ["Keyboard ⌨️", "Screen 🖥️", "Programming 💻", "Heavy 🎒"],
    imposterClues: ["Pocket 👖", "Camera 📸", "Touchscreen 📱", "Vibrate 📳"],
  },
  {
    category: "SJCET Legends 🏫",
    citizenWord: "SARJU",
    imposterWord: "ALWIN",
    citizenClues: ["Machine learning 🤖", "Syllabus 📚", "Active 🏃", "Guide 🧭"],
    imposterClues: ["Student 🧑‍🎓", "Vercel 🚀", "Developer 💻", "Code 💻"],
  },
  {
    category: "Breakfast 🍛",
    citizenWord: "PUTTU",
    imposterWord: "KAPPA",
    citizenClues: ["Cylinder 🛢️", "Coconut 🥥", "Kadala 🧆", "Steam 💨"],
    imposterClues: ["Root 🪵", "Fish curry 🐟", "Chenda 🥁", "Tapioca 🍠"],
  },
  {
    category: "Malabari Dinner 🍛",
    citizenWord: "POROTTA",
    imposterWord: "BIRIYANI",
    citizenClues: ["Layered 🥞", "Maida 🌾", "Beef 🥩", "Keralite ❤️"],
    imposterClues: ["Rice 🍚", "Chicken 🍗", "Masala 🌶️", "Khaibar 🍛"],
  },
  {
    category: "Dinner 🍲",
    citizenWord: "BEEFFRY",
    imposterWord: "KANJI",
    citizenClues: ["Black 🖤", "Coconut bits 🥥", "Spicy 🥵", "Porotta companion 🥞"],
    imposterClues: ["Watery 🥣", "Payar 🫘", "Sick day 🤒", "Rice bowl 🍚"],
  },
  {
    category: "Beverages 🥛",
    citizenWord: "SULAIMANI",
    imposterWord: "MORU",
    citizenClues: ["Black tea ☕", "Lemon 🍋", "Sweet 🍯", "Biriyani ender 🍛"],
    imposterClues: ["Sour 🥛", "Ginger 🫚", "Butter milk 🥛", "Lunch drink 🍛"],
  },
  {
    category: "Snacks 🍩",
    citizenWord: "NEYYAPPAM",
    imposterWord: "PAPPADAM",
    citizenClues: ["Sweet 🍯", "Fried 🍳", "Rice flour 🌾", "Dark brown 🟤"],
    imposterClues: ["Thin 🫓", "Crispy 🥨", "Sadhya 🍛", "Round ⭕"],
  },
  {
    category: "Internet 🌐",
    citizenWord: "WIFI",
    imposterWord: "HOTSPOT",
    citizenClues: ["Router 📡", "Campus 🏫", "Free 💸", "Fast ⚡"],
    imposterClues: ["Mobile 📱", "Friend 🧑‍🤝‍🧑", "Data limit 📉", "Battery drain 🔋"],
  },
  {
    category: "Class Tricks 🤫",
    citizenWord: "PROXY",
    imposterWord: "ATTENDANCE",
    citizenClues: ["Fake 🤫", "Friend help 🧑‍🤝‍🧑", "Voice change 🗣️", "Risk ⚠️"],
    imposterClues: ["Sheet 📄", "Biometric ☝️", "Percentage 📊", "Shortage 📉"],
  },
  {
    category: "Academic Pain 😢",
    citizenWord: "SUPPLY",
    imposterWord: "BACKLOG",
    citizenClues: ["Exam again 📝", "Paper fee 💸", "Series test 📈", "KTU special 🎓"],
    imposterClues: ["Count 📊", "Clearance 🧼", "Certificate hold 📄", "Stress 🤯"],
  },
  {
    category: "Marks 📝",
    citizenWord: "INTERNAL",
    imposterWord: "GRACEMARK",
    citizenClues: ["Series test 📝", "Attendance 📊", "Fifty 💯", "Teacher hand ✍️"],
    imposterClues: ["NSS/NCC 🎖️", "Sports 🏆", "Free gift 🎁", "Add-on ➕"],
  },
  {
    category: "Records 📚",
    citizenWord: "LABRECORD",
    imposterWord: "ASSIGNMENT",
    citizenClues: ["Rough book 📓", "Output page 📄", "Graph 📊", "Signature ✍️"],
    imposterClues: ["Copy paste 📄", "A4 sheet 📃", "Deadline ⏰", "Submit 📤"],
  },
  {
    category: "Faculty & Staff 🏫",
    citizenWord: "HOD",
    imposterWord: "JOBY",
    citizenClues: ["Cabin 🏢", "Rules 📜", "Permission ✍️", "Cabin boss 👨‍💼"],
    imposterClues: ["Lab staff 👨‍🔧", "Systems 💻", "Server 🖥️", "Key holder 🔑"],
  },
  {
    category: "Campus Spots 🏫",
    citizenWord: "STAFFROOM",
    imposterWord: "WORKSHOP",
    citizenClues: ["Tea ☕", "Corrections 📝", "Scolding 🗣️", "Teachers 👩‍🏫"],
    imposterClues: ["Carpentry 🪚", "Smithy 🔥", "Fitting ⚙️", "File tool 🗜️"],
  },
  {
    category: "Services 📄",
    citizenWord: "XEROX",
    imposterWord: "AKSHAYA",
    citizenClues: ["Copier 📠", "One rupee 🪙", "Notes 📝", "Double side 📄"],
    imposterClues: ["Govt portal 🏛️", "PAN card 💳", "Certificate 📜", "Token number 🎫"],
  },
  {
    category: "Transport 🚌",
    citizenWord: "KSRTC",
    imposterWord: "SPLENDOR",
    citizenClues: ["Red & Yellow 🔴🟡", "Fast passenger 🚌", "Horn 🔊", "Government 🏛️"],
    imposterClues: ["Bike 🏍️", "Mileage ⛽", "Hero 🦸", "Kick start 🦵"],
  },
  {
    category: "Vehicles 🛵",
    citizenWord: "BULLET",
    imposterWord: "AUTO",
    citizenClues: ["Royal 👑", "Thump sound 🔊", "Heavy 🏍️", "Enfield 🇬🇧"],
    imposterClues: ["Three wheel 🛺", "Meter 📟", "Yellow top 🟨", "Loud engine 🔊"],
  },
  {
    category: "Locations 📍",
    citizenWord: "POONJAR",
    imposterWord: "ERATTUPETTA",
    citizenClues: ["MLA 🏛️", "River 🌊", "Hilly ⛰️", "Route 🛣️"],
    imposterClues: ["Town 🏙️", "Halwa 🥮", "Traffic 🚦", "Near Pala 🛣️"],
  },
  {
    category: "Towns 📍",
    citizenWord: "THODUPUZHA",
    imposterWord: "PALA",
    citizenClues: ["River town 🌊", "Idukki gate ⛰️", "Cinema shooting 🎬", "Greenery 🌳"],
    imposterClues: ["Meenachil 🌊", "Kottayam 🏙️", "Achayan land 🍷", "Brilliance 🎓"],
  },
  {
    category: "Hardware 💻",
    citizenWord: "KEYBOARD",
    imposterWord: "MOUSE",
    citizenClues: ["Keys ⌨️", "Typing 💬", "Spacebar ⌨️", "RGB light 🌈"],
    imposterClues: ["Click 🖱️", "Cursor ↖️", "Scroll wheel ⚙️", "Laser light 🔴"],
  },
  {
    category: "Desktop 🖥️",
    citizenWord: "CPU",
    imposterWord: "MONITOR",
    citizenClues: ["Box 📦", "Processor 🧠", "Power button 🔌", "Fan sound 💨"],
    imposterClues: ["Display 📺", "Screen 🖥️", "HDMI 🔌", "VGA port 🔌"],
  },
  {
    category: "Power ⚡",
    citizenWord: "CHARGER",
    imposterWord: "POWERBANK",
    citizenClues: ["Wall plug 🔌", "Wire 🧵", "Type-C 🔌", "Adapter 🔌"],
    imposterClues: ["Portable 🔋", "Heavy block 🧱", "Travel 🎒", "USB port 🔌"],
  },
  {
    category: "Toiletries 🧼",
    citizenWord: "HARPIC",
    imposterWord: "MEDIMIX",
    citizenClues: ["Blue liquid 🧪", "Acid ☣️", "Clean toilet 🚽", "Bottle 🧴"],
    imposterClues: ["Green soap 🧼", "Herbal 🌿", "Bath 🛁", "Ayurvedic 🍃"],
  },
  {
    category: "Adhesives 🪵",
    citizenWord: "FEVICOL",
    imposterWord: "CELLOTAPE",
    citizenClues: ["White glue 🧴", "Woodwork 🪚", "Elephants logo 🐘", "Sticky liquid 🧪"],
    imposterClues: ["Transparent 🎞️", "Plastic roll 🎞️", "Paper wrap 🎁", "Sticky strip 🎗️"],
  },
  {
    category: "Laundry 🧼",
    citizenWord: "RIN",
    imposterWord: "SURFEXCEL",
    citizenClues: ["Blue bar 🧼", "White wash 👕", "Lightning logo ⚡", "Cheap 🪙"],
    imposterClues: ["Powder 🧪", "Stain remover 🧼", "Bucket soak 🪣", "Premium 💸"],
  },
  {
    category: "Relief 🩹",
    citizenWord: "ZANDUBALM",
    imposterWord: "VICKS",
    citizenClues: ["Headache 🤕", "Green jar 🟢", "Strong smell 👃", "Ayurvedic 🌿"],
    imposterClues: ["Cold & Cough 🤧", "Blue jar 🔵", "Menthol 🍃", "Rub on chest 🧴"],
  },
  {
    category: "Govt Depts 🏢",
    citizenWord: "KSEB",
    imposterWord: "PWD",
    citizenClues: ["Current cut 🔌", "Electric post 🛜", "Bill meter 📟", "Fuse wire 🔌"],
    imposterClues: ["Road tarring 🛣️", "Potholes 🕳️", "Bridges 🌉", "Concrete 🏗️"],
  },
  {
    category: "Heavy Vehicles 🚜",
    citizenWord: "OMNI",
    imposterWord: "JCB",
    citizenClues: ["Kidnap van 🚐", "Maruti 🚗", "Sliding door 🚪", "White color ⚪"],
    imposterClues: ["Yellow digger 🚜", "Mud excavation 🪵", "Big wheels 🛞", "Hydraulic arm 💪"],
  },
  {
    category: "Legends 🎭",
    citizenWord: "ACHAYAN",
    imposterWord: "INNOCENT",
    citizenClues: ["Kottayam guy 🍷", "Gold chain 🪙", "Mundu style 🥻", "Pala accent 🗣️"],
    imposterClues: ["Actor 🎬", "Trissur accent 🗣️", "Funny jokes 🗣️", "MP 🏛️"],
  },
  {
    category: "Brainrot 🧠",
    citizenWord: "SIGMA",
    imposterWord: "SKIBIDI",
    citizenClues: ["Gigachad 😎", "Mewing 🤫", "Alpha male 🐺", "Phonk music 🎵"],
    imposterClues: ["Toilet 🚽", "Gyatt 🍑", "Gen Alpha 🧒", "Rizzler 🤵"],
  },
  {
    category: "Slangs 🤪",
    citizenWord: "POTTAN",
    imposterWord: "MANDAN",
    citizenClues: ["Deaf-mute literal 🔇", "Foolish behavior 🤪", "Malayali insult 🗣️", "Crazy 🧠"],
    imposterClues: ["Dumb 🧠", "Slow learner 🐌", "Silly mistake 🤦‍♂️", "Idiot 🤪"],
  },
  {
    category: "Veggie/Fruit 🥥",
    citizenWord: "THENGA",
    imposterWord: "POTATO",
    citizenClues: ["Coconut 🥥", "Shell 🥥", "Chutney 🍛", "Tree height 🌴"],
    imposterClues: ["Underground 🥔", "French fries 🍟", "Samosa filling 🥟", "Brown skin 🥔"],
  },
  {
    category: "Food Spots 🥪",
    citizenWord: "CANTEEN",
    imposterWord: "BAKERY",
    citizenClues: ["Meals 🍛", "Tea break ☕", "Token queue 🎟️", "Campus ground 🏫"],
    imposterClues: ["Puffs 🥐", "Cool drink 🥤", "Cake slice 🍰", "Outside campus 🛣️"],
  },
  {
    category: "Game Roles 🎮",
    citizenWord: "CREWMATE",
    imposterWord: "IMPOSTER",
    citizenClues: ["Tasks 📋", "Report 📢", "Voted out 🗳️", "Space suit 🧑‍🚀"],
    imposterClues: ["Vents 🕳️", "Fake tasks 📋", "Kill button 🔪", "Sabotage ⚡"],
  },
  {
    category: "Structures 🏗️",
    citizenWord: "TOWER",
    imposterWord: "BUILDING",
    citizenClues: ["Tall height 🗼", "Antenna 📡", "Observation deck 🔭", "Eiffel 🗼"],
    imposterClues: ["Rooms 🏢", "Concrete 🧱", "Windows 🪟", "Multi-story 🏢"],
  },
  {
    category: "Feelings 🎭",
    citizenWord: "MOODSWINGS",
    imposterWord: "DEPRESSION",
    citizenClues: ["Happy then sad 📈📉", "Temporary ⏰", "Changing emotions 🎢", "Unpredictable 🌀"],
    imposterClues: ["Dark room 🥱", "Long term ⏳", "Sadness 😢", "Therapy 🛋️"],
  },
  {
    category: "Superstars 🎭",
    citizenWord: "MOHANLAL",
    imposterWord: "MAMMOOTTY",
    citizenClues: ["Lalettan 🕶️", "Complete Actor 👑", "Meesha fold 👨", "Odiyan 🦉"],
    imposterClues: ["Mega star 👑", "Mammookka 🕶️", "Bilal 🧥", "Age-defying 👨"],
  },
  {
    category: "New-Gen Hits 🎬",
    citizenWord: "KUMBALANGINIGHTS",
    imposterWord: "PREMAM",
    citizenClues: ["Fahadh Faasil 👨", "Shammi hero da 🦸", "Brothers 🧑‍🤝‍🧑", "Fishing net 🎣"],
    imposterClues: ["Nivin Pauly 🧑‍🦱", "Mary Malar Celine 👩‍⚕️", "Butterfly 🦋", "College gang 🎓"],
  },
  {
    category: "Dileep Comedies 🎬",
    citizenWord: "CIDMOOSA",
    imposterWord: "PUNJABIHOUSE",
    citizenClues: ["Dog Arjun 🐕", "Moosa 🕵️‍♂️", "Detective 🔍", "Thorappan Kochunni 🥷"],
    imposterClues: ["Silent act 🤫", "Boat rescue ⛵", "Gangadharan 👳", "Ramanan 🧑"],
  },
  {
    category: "Classic Movies 🎬",
    citizenWord: "MANICHITRATHAZHU",
    imposterWord: "RAMJIRAOSPEAKING",
    citizenClues: ["Ganga Nagavalli 💃", "Madampally 🏰", "Dr. Sunny 🩺", "Mental hospital 🏥"],
    imposterClues: ["Urvashi Theater 🎭", "Wrong number ☎️", "Garudan 🦅", "Kidnapping 💼"],
  },
  {
    category: "Malayalam Media 📺",
    citizenWord: "KARIKKU",
    imposterWord: "MINNALMURALI",
    citizenClues: ["YouTube 📺", "George Lolan 🧑‍🤝‍🧑", "Thera Para 🚶‍♂️", "Web series 🎞️"],
    imposterClues: ["Superhero 🦸‍♂️", "Kurukkanmoola 🏘️", "Lightning strike ⚡", "Basil Joseph 🎬"],
  },
  {
    category: "Kerala Attire 🥻",
    citizenWord: "MUNDU",
    imposterWord: "THORTHU",
    citizenClues: ["White cotton 🤍", "Folding double 🫱", "Kasavu border 🎗️", "Traditional look 🥻"],
    imposterClues: ["Wet body 🛁", "Quick dry 💨", "Thin cotton 🫱", "Bath time 🚿"],
  },
  {
    category: "Street Life 🛣️",
    citizenWord: "AUTO",
    imposterWord: "THATTUKADA",
    citizenClues: ["Three wheel 🛺", "Meter charge 📟", "Yellow hood 🟨", "Loud sound 🔊"],
    imposterClues: ["Double omelette 🍳", "Night food 🌙", "Kattu chaya ☕", "Dosa set 🥞"],
  },
  {
    category: "Footwear & Rain ☔",
    citizenWord: "CHERUPPU",
    imposterWord: "KUDA",
    citizenClues: ["Slippers 🩴", "Feet protect 👣", "Bata brand 🩴", "Walking 🚶‍♂️"],
    imposterClues: ["Umbrella ☔", "Monsoon rain 🌧️", "Paper fold 📄", "Wind blow 💨"],
  },
  {
    category: "Evening Snacks ☕",
    citizenWord: "PAZHAMPORI",
    imposterWord: "KATTANCHAYA",
    citizenClues: ["Banana fritter 🍌", "Yellow color 🟨", "Sweet taste 🍯", "Maida batter 🥣"],
    imposterClues: ["Black tea ☕", "Lemon slice 🍋", "Hot glass 🥛", "No milk 🥛"],
  },
  {
    category: "Kerala Trees 🌴",
    citizenWord: "CHAKKA",
    imposterWord: "THENGU",
    citizenClues: ["Jackfruit 🍈", "State fruit 🍈", "Thorny skin 🌵", "Sweet chula 🟡"],
    imposterClues: ["Coconut tree 🌴", "Climbing ropes 🪢", "Green frond 🌿", "Copra oil 🛢️"],
  },
  {
    category: "Lulu Mall 🛍️",
    citizenWord: "LULUMALL",
    imposterWord: "AKSHAYA",
    citizenClues: ["Edappally Kochi 🏙️", "Hypermarket 🛒", "Escalator 🪜", "Crowded lobby 👥"],
    imposterClues: ["Government portal 🏛️", "PAN card application 💳", "Token queue 🎫", "Certificates 📜"],
  },
  {
    category: "Blockbusters 🎬",
    citizenWord: "MEESAMADHAVAN",
    imposterWord: "THENKASIPATTANAM",
    citizenClues: ["Madhavan thief 🥷", "Hairpin key 🗝️", "Pillechan 👴", "Pattalam Purushu 👮‍♂️"],
    imposterClues: ["Two friends 👬", "Market fight 🥩", "Kannan Shatrughan 👬", "Secret letters ✉️"],
  },
  {
    category: "Family Comedies 🎬",
    citizenWord: "KALYANARAMAN",
    imposterWord: "GODFATHER",
    citizenClues: ["Pyari wedding planner 🤵", "Motha copy 📝", "Ramkumar 👨", "Bhavani 👩"],
    imposterClues: ["Anjooran 👴", "Feud family ⚔️", "Malappuram style 🏰", "Lal director 🎬"],
  },
  {
    category: "Hostel Comedies 🎬",
    citizenWord: "INHARIHARNAGAR",
    imposterWord: "ADIKAPYAREKOOTAMANI",
    citizenClues: ["Mahadevan Govindan 👬", "Maya house 🏡", "Thomaskutty 🧑", "Wrong address 📍"],
    imposterClues: ["Father cameo 👴", "Girl in hostel 👧", "Ghost spirit 👻", "Rent money 💵"],
  },
  {
    category: "Household 🏺",
    citizenWord: "KINDI",
    imposterWord: "VETTILA",
    citizenClues: ["Water vessel 🏺", "Brass metal 🪙", "Spout pipe 🚰", "Wash feet 👣"],
    imposterClues: ["Betel leaf 🍃", "Chewing chunnambu 🦷", "Sadya digest 🍛", "Pawn shop 🍂"],
  },
  {
    category: "Snack Foods 🥐",
    citizenWord: "MUTTAPUFFS",
    imposterWord: "SAMOSA",
    citizenClues: ["Egg inside 🥚", "Layered pastry 🥐", "Yellow yolk 🟡", "Bakery shelf 🧁"],
    imposterClues: ["Triangle shape 🔺", "Potato filling 🥔", "Maida crust 🫓", "Deep fried 🛢️"],
  }
];

type ImposterPhase = "welcome" | "players" | "names" | "imposters" | "reveal" | "gameplay" | "revealWinners";

interface PartyPlayer {
  id: string;
  name: string;
  emoji: string;
  colorClass: string;
  role: "citizen" | "imposter";
  word: string;
  isEliminated: boolean;
}

const PASTEL_COLORS = [
  "bg-amber-100 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 border-amber-200 dark:border-amber-900/40",
  "bg-red-50 dark:bg-red-950/40 text-red-900 dark:text-red-100 border-red-100 dark:border-red-900/40",
  "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 border-emerald-100 dark:border-emerald-900/40",
  "bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 border-blue-100 dark:border-blue-900/40",
  "bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-100 border-purple-100 dark:border-purple-900/40",
  "bg-pink-50 dark:bg-pink-950/40 text-pink-900 dark:text-pink-100 border-pink-100 dark:border-pink-900/40"
];

const AVATAR_EMOJIS = ["🐼", "🦊", "🦖", "🦁", "🐨", "🐯", "🐵", "🦄", "🦥", "🦉", "🐧", "🐙", "👻", "🦫", "🦦"];

const DEFAULT_CANDIDATE_NAMES = [
  "Joby", "Sarju", "Achayan", "Harpic", "Puttu", "Bucket", "Porotta", "BeefFry",
  "Mandan", "Sigma", "Vicks", "Akshaya", "Akshay", "Alwin", "Innocent", "HOD"
];

function ImposterGame() {
  const [phase, setPhase] = useState<ImposterPhase>("welcome");
  const [playerCount, setPlayerCount] = useState(6);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [imposterCount, setImposterCount] = useState(1);
  
  const [gamePlayers, setGamePlayers] = useState<PartyPlayer[]>([]);
  const [wordPair, setWordPair] = useState<ImposterWordPair>(IMPOSTER_POOL[0]);
  const [selectedRevealPlayer, setSelectedRevealPlayer] = useState<PartyPlayer | null>(null);
  const [revealCardState, setRevealCardState] = useState<"hidden" | "revealed">("hidden");

  const [shuffledImposterPool, setShuffledImposterPool] = useState<ImposterWordPair[]>([]);
  const [imposterIndex, setImposterIndex] = useState(0);

  const shuffleImposters = (array: ImposterWordPair[]): ImposterWordPair[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  useEffect(() => {
    setShuffledImposterPool(shuffleImposters(IMPOSTER_POOL));
  }, []);

  // Initialize empty player names when playerCount changes
  useEffect(() => {
    setPlayerNames(Array(playerCount).fill(""));
  }, [playerCount]);

  const handleStartSetup = () => {
    setPhase("players");
  };

  const handleContinueToNames = () => {
    setPhase("names");
  };

  const handleNameChange = (idx: number, val: string) => {
    const updated = [...playerNames];
    updated[idx] = val;
    setPlayerNames(updated);
  };

  const handleContinueToImposters = () => {
    // Validate names are not empty
    const cleanNames = playerNames.map((n, idx) => n.trim() ? n.trim() : `Player ${idx + 1}`);
    setPlayerNames(cleanNames);
    
    // Suggest imposter counts
    if (playerCount < 5) {
      setImposterCount(1);
    } else if (playerCount < 8 && imposterCount > 2) {
      setImposterCount(2);
    }
    setPhase("imposters");
  };

  const handleSetupGameData = () => {
    // 1. Pick a random word pair sequentially from shuffled pool
    let currentPool = shuffledImposterPool;
    let nextIndex = imposterIndex;

    if (currentPool.length === 0) {
      currentPool = shuffleImposters(IMPOSTER_POOL);
      setShuffledImposterPool(currentPool);
      nextIndex = 0;
    }

    if (nextIndex >= currentPool.length) {
      currentPool = shuffleImposters(IMPOSTER_POOL);
      setShuffledImposterPool(currentPool);
      nextIndex = 0;
    }

    const selectedPair = currentPool[nextIndex];
    setWordPair(selectedPair);
    setImposterIndex(nextIndex + 1);

    // 2. Assign roles
    const roles: ("citizen" | "imposter")[] = Array(playerCount).fill("citizen");
    let placedImposters = 0;
    while (placedImposters < imposterCount) {
      const idx = Math.floor(Math.random() * playerCount);
      if (roles[idx] === "citizen") {
        roles[idx] = "imposter";
        placedImposters++;
      }
    }

    // 3. Create players
    const shuffledAvatars = [...AVATAR_EMOJIS].sort(() => Math.random() - 0.5);
    const initialPlayers: PartyPlayer[] = playerNames.map((name, idx) => {
      const role = roles[idx];
      const word = role === "citizen" ? selectedPair.citizenWord : selectedPair.imposterWord;
      return {
        id: `player_${idx}`,
        name,
        emoji: shuffledAvatars[idx % shuffledAvatars.length],
        colorClass: PASTEL_COLORS[idx % PASTEL_COLORS.length],
        role,
        word,
        isSeen: false
      };
    });

    setGamePlayers(initialPlayers);
    setSelectedRevealPlayer(null);
    setRevealCardState("hidden");
    setPhase("reveal");
  };

  const handleRevealCard = () => {
    setRevealCardState("revealed");
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([60]);
    }
  };

  const handleHideAndFinishReveal = () => {
    if (!selectedRevealPlayer) return;
    
    const updated = gamePlayers.map(p => {
      if (p.id === selectedRevealPlayer.id) {
        return { ...p, isSeen: true };
      }
      return p;
    });
    setGamePlayers(updated);
    setSelectedRevealPlayer(null);
    setRevealCardState("hidden");
  };

  const restartGame = () => {
    setPhase("welcome");
  };

  const activeImposters = gamePlayers.filter(p => p.role === "imposter" && !p.isEliminated).length;
  const activeCitizens = gamePlayers.filter(p => p.role === "citizen" && !p.isEliminated).length;

  return (
    <div className="space-y-4 max-w-sm mx-auto py-2">
      
      {/* 1. Welcome Screen */}
      {phase === "welcome" && (
        <div className="space-y-5 text-center py-6">
          <div className="rounded-[28px] border border-border/60 bg-surface p-6 shadow-sm">
            <div className="text-5xl animate-pulse">🕵️‍♂️🤫</div>
            <h3 className="font-display text-xl font-extrabold text-ink mt-4">Imposter Party</h3>
            <p className="text-xs text-ink-soft mt-2 leading-relaxed">
              Pass-and-play party game with your classroom friends! Guess who holds the secret Imposter word card.
            </p>
          </div>

          <button
            onClick={handleStartSetup}
            className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
          >
            Start Setup 🏁
          </button>
        </div>
      )}

      {/* 2. Number of Players */}
      {phase === "players" && (
        <div className="space-y-5 text-center py-4">
          <div className="rounded-[28px] border border-border/60 bg-surface p-6 shadow-sm space-y-4">
            <h3 className="font-display text-lg font-bold text-ink">How many players?</h3>
            <div className="flex items-center justify-center gap-6 py-4">
              <button
                disabled={playerCount <= 3}
                onClick={() => setPlayerCount(prev => prev - 1)}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-surface text-2xl font-bold text-ink active:scale-90 transition disabled:opacity-40"
              >
                -
              </button>
              <span className="font-display text-4xl font-black text-indigo">{playerCount}</span>
              <button
                disabled={playerCount >= 12}
                onClick={() => setPlayerCount(prev => prev + 1)}
                className="grid h-12 w-12 place-items-center rounded-2xl border border-border bg-surface text-2xl font-bold text-ink active:scale-90 transition disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          <button
            onClick={handleContinueToNames}
            className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
          >
            Continue →
          </button>
        </div>
      )}

      {/* 3. Enter Player Names */}
      {phase === "names" && (
        <div className="space-y-5 py-2">
          <div className="rounded-[28px] border border-border/60 bg-surface p-5 shadow-sm space-y-4">
            <h3 className="font-display text-base font-bold text-ink text-center">Enter Player Names</h3>
            
            <div className="space-y-2.5 max-h-[280px] overflow-y-auto pr-1 no-scrollbar">
              {playerNames.map((name, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-16 text-xs font-bold text-ink-soft">Player {idx + 1}:</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(idx, e.target.value)}
                    placeholder={`Player ${idx + 1}`}
                    className="flex-1 px-3 py-2 rounded-xl border border-border/60 bg-surface text-xs font-bold text-ink focus:outline-none focus:border-indigo"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleContinueToImposters}
            className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
          >
            Continue →
          </button>
        </div>
      )}

      {/* 4. Choose Number of Imposters */}
      {phase === "imposters" && (
        <div className="space-y-5 text-center py-4">
          <div className="rounded-[28px] border border-border/60 bg-surface p-6 shadow-sm space-y-4">
            <h3 className="font-display text-lg font-bold text-ink">How many Imposters?</h3>
            <p className="text-xs text-ink-soft">Secret saboteurs in the class</p>
            
            <div className="flex items-center justify-center gap-4 py-4">
              {[1, 2, 3].map((num) => {
                const isPossible = num < playerCount - 1;
                if (!isPossible) return null;
                return (
                  <button
                    key={num}
                    onClick={() => setImposterCount(num)}
                    className={`h-14 w-14 rounded-2xl font-display text-lg font-extrabold flex items-center justify-center border transition active:scale-95 ${
                      imposterCount === num
                        ? "border-transparent bg-indigo-deep text-white shadow-md"
                        : "border-border/60 bg-surface text-ink hover:border-indigo"
                    }`}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={handleSetupGameData}
            className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
          >
            Generate Secret Cards 🎴
          </button>
        </div>
      )}

      {/* 5. Reveal Cards (Player Selected Grid) */}
      {phase === "reveal" && (
        <div className="space-y-5 py-2">
          {selectedRevealPlayer === null ? (
            <div className="space-y-4">
              <div className="rounded-[28px] border border-border/60 bg-surface p-5 text-center shadow-sm">
                <h3 className="font-display text-base font-bold text-ink">Claim & Reveal Roles 🔒</h3>
                <p className="text-xs text-ink-soft mt-1 leading-relaxed">
                  Pass the phone around. Each player, tap on your name to check your secret word card!
                </p>
              </div>

              {/* Grid of players to select */}
              <div className="grid grid-cols-2 gap-3">
                {gamePlayers.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      if (!p.isSeen) {
                        setSelectedRevealPlayer(p);
                        setRevealCardState("hidden");
                      }
                    }}
                    className={`border rounded-[22px] p-4 text-center transition-all duration-300 select-none ${
                      p.isSeen
                        ? "border-emerald-500/20 bg-emerald-500/5 opacity-80"
                        : "border-border/60 bg-surface cursor-pointer hover:border-indigo active:scale-95"
                    }`}
                  >
                    <div className="text-4xl mb-2">{p.emoji}</div>
                    <h4 className="font-display text-sm font-bold truncate leading-tight text-ink">{p.name}</h4>
                    
                    {p.isSeen ? (
                      <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        👁️ Checked
                      </span>
                    ) : (
                      <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-ink-soft">
                        🔒 Tap to see
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Start game button */}
              <button
                disabled={!gamePlayers.every(p => p.isSeen)}
                onClick={() => setPhase("discuss")}
                className={`w-full py-4 rounded-2xl font-display font-bold text-sm shadow-md transition ${
                  gamePlayers.every(p => p.isSeen)
                    ? "bg-indigo-deep text-white active:scale-95 cursor-pointer"
                    : "bg-muted text-ink-soft opacity-60 cursor-not-allowed"
                }`}
              >
                {gamePlayers.every(p => p.isSeen) 
                  ? "Start Discussion & Vote ➡️" 
                  : "Waiting for everyone to check cards... ⏳"
                }
              </button>
            </div>
          ) : (
            /* Reveal overlay modal */
            <div className="space-y-6 text-center animate-slide-up">
              {revealCardState === "hidden" ? (
                <div className="space-y-6">
                  <div className="rounded-[28px] border border-border/60 bg-surface p-6 shadow-sm text-center">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">Pass the phone to:</p>
                    <h2 className="font-display text-2xl font-black text-indigo mt-1">
                      {selectedRevealPlayer.name}
                    </h2>
                    
                    {/* Mystery Card Illustration */}
                    <div className="relative mx-auto w-28 h-40 rounded-2xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 shadow-md border-2 border-white/20 flex flex-col items-center justify-center text-white overflow-hidden my-6">
                      <div className="absolute inset-0 bg-dots opacity-10" />
                      <span className="text-4xl">❓</span>
                      <span className="text-[9px] font-extrabold uppercase tracking-widest mt-3 opacity-60">Secret Card</span>
                    </div>

                    <p className="text-xs text-ink-soft leading-relaxed px-4">
                      Make sure no one else is looking, then tap the card to check your secret role!
                    </p>
                  </div>

                  <button
                    onClick={handleRevealCard}
                    className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
                  >
                    Tap to Reveal Card 🔑
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {selectedRevealPlayer.role === "imposter" ? (
                    /* IMPOSTER CARD DESIGN */
                    <div className="rounded-[28px] bg-gradient-to-br from-red-600 via-red-700 to-red-950 p-6 text-white text-center shadow-lg border border-red-500/30 relative overflow-hidden animate-slide-up">
                      <div className="absolute inset-0 bg-dots opacity-10" />
                      <div className="relative space-y-5">
                        <div className="text-5xl">{selectedRevealPlayer.emoji}</div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Your Name</p>
                          <h2 className="font-display text-xl font-black">{selectedRevealPlayer.name}</h2>
                        </div>
                        
                        <div className="py-8 flex flex-col items-center justify-center space-y-3">
                          <div className="relative flex items-center justify-center h-20 w-20 bg-white/10 rounded-full border border-white/10 backdrop-blur-xs">
                            <span className="text-5xl">🕵️‍♂️</span>
                          </div>
                          <h1 className="font-display text-4.5xl font-black tracking-wider text-white uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]">
                            IMPOSTER
                          </h1>
                          <p className="text-[10px] text-red-200/70 font-extrabold tracking-widest uppercase bg-black/25 px-3 py-1 rounded-full">
                            🤫 KEEP IT SECRET!
                          </p>
                        </div>
                        
                        <p className="text-[10px] text-white/50 italic">Tap below to close the card safely.</p>
                      </div>
                    </div>
                  ) : (
                    /* CREWMATE CARD DESIGN */
                    <div className="rounded-[28px] bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-900 p-6 text-white text-center shadow-lg border border-emerald-500/30 relative overflow-hidden animate-slide-up">
                      <div className="absolute inset-0 bg-dots opacity-10" />
                      <div className="relative space-y-4">
                        <div className="text-5xl">{selectedRevealPlayer.emoji}</div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-white/60">Your Name</p>
                          <h2 className="font-display text-xl font-black">{selectedRevealPlayer.name}</h2>
                        </div>
                        <div className="py-2.5 border-y border-white/10">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/30 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-200 border border-emerald-500/25">
                            🟢 CREWMATE (Citizen)
                          </span>
                        </div>
                        
                        <div className="py-6 flex flex-col items-center justify-center space-y-3">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-200/70 tracking-widest bg-black/15 px-3 py-0.5 rounded-full">
                            Your Word Card 🏷️
                          </p>
                          <h1 className="font-display text-3.5xl font-black tracking-widest uppercase text-butter drop-shadow-sm">
                            {selectedRevealPlayer.word}
                          </h1>
                        </div>

                        <p className="text-[10px] text-white/50 italic">Memorize the word and tap below to hide it immediately!</p>
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handleHideAndFinishReveal}
                    className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
                  >
                    Hide Card & Continue 🤫
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 6. Discussion Room */}
      {phase === "discuss" && (
        <div className="space-y-5 py-2">
          <div className="rounded-[28px] border border-border/60 bg-surface p-5 text-center shadow-sm">
            <h3 className="font-display text-base font-bold text-ink">Discuss & Guess! 🤫</h3>
            <p className="text-xs text-ink-soft mt-1 leading-relaxed">
              Describe your words in real life, debate, and vote out who you think is faking it!
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {gamePlayers.map((p) => (
              <div
                key={p.id}
                className={`border border-border/40 bg-surface rounded-[22px] p-4 text-center select-none shadow-xs`}
              >
                <div className="text-4xl mb-2">{p.emoji}</div>
                <h4 className="font-display text-sm font-bold truncate leading-tight text-ink">{p.name}</h4>
                <span className="mt-2.5 inline-flex items-center gap-1 rounded-full bg-indigo-50 dark:bg-indigo-950/20 px-2.5 py-0.5 text-[8px] font-extrabold uppercase tracking-wider text-indigo">
                  Playing
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setPhase("revealWinners")}
            className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
          >
            Reveal Results 🏆
          </button>
        </div>
      )}

      {/* 7. Reveal Results */}
      {phase === "revealWinners" && (
        <div className="space-y-5 text-center py-4">
          <div className="rounded-[28px] border border-border/60 bg-surface p-6 shadow-sm space-y-4">
            <div className="text-5xl animate-bounce">🕵️‍♂️🤫</div>
            
            <h3 className="font-display text-xl font-extrabold text-ink">
              Game Results
            </h3>
            <p className="text-xs text-ink-soft leading-relaxed">
              Here is the answer key. See who was right!
            </p>

            <div className="border-t border-border/40 pt-4 text-left space-y-2.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">The Imposters:</h4>
              {gamePlayers.filter(p => p.role === "imposter").map(p => (
                <div key={p.id} className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-ink">
                    <span>{p.emoji}</span>
                    <span>{p.name}</span>
                  </span>
                  <span className="text-red-600 dark:text-red-400 uppercase text-[10px] font-extrabold">
                    "{p.word}"
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-border/40 pt-4 text-left space-y-2.5">
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">The Crewmates:</h4>
              {gamePlayers.filter(p => p.role === "citizen").map(p => (
                <div key={p.id} className="flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-ink">
                    <span>{p.emoji}</span>
                    <span>{p.name}</span>
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 uppercase text-[10px] font-extrabold">
                    "{p.word}"
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={handleSetupGameData}
              className="w-full py-4 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition flex items-center justify-center gap-2"
            >
              Play Again (Same Players) 🔄
            </button>
            <button
              onClick={restartGame}
              className="w-full py-4 rounded-2xl bg-muted border border-border/80 text-ink font-display font-bold text-sm active:scale-95 transition"
            >
              Setup New Game ⚙️
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

/* -------------------------- Game: Campus Snake -------------------------- */
const CAMPUS_FOODS = [
  { emoji: "🥞", name: "Porotta" },
  { emoji: "🍗", name: "Biriyani" },
  { emoji: "☕", name: "Sulaimani" },
  { emoji: "🥥", name: "Puttu" },
  { emoji: "🍌", name: "Banana" },
  { emoji: "🥩", name: "BeefFry" },
  { emoji: "🍩", name: "Neyyappam" },
  { emoji: "🥪", name: "Puffs" },
  { emoji: "🥣", name: "Kanji" }
];

const SNAKE_GRID_SIZE = 15;

function SnakeGame() {
  const [snake, setSnake] = useState<{ x: number, y: number }[]>([
    { x: 7, y: 7 },
    { x: 7, y: 8 },
    { x: 7, y: 9 }
  ]);
  const [food, setFood] = useState<{ x: number, y: number }>({ x: 7, y: 3 });
  const [foodIndex, setFoodIndex] = useState(0);
  const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">("UP");
  const [isGameOver, setIsGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("sjcet_snake_highscore");
    if (saved) {
      setHighScore(parseInt(saved, 10));
    }
  }, []);

  const spawnFood = (currentSnake: { x: number, y: number }[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * SNAKE_GRID_SIZE),
        y: Math.floor(Math.random() * SNAKE_GRID_SIZE)
      };
      if (!currentSnake.some(s => s.x === newFood.x && s.y === newFood.y)) {
        break;
      }
    }
    setFood(newFood);
    setFoodIndex(Math.floor(Math.random() * CAMPUS_FOODS.length));
  };

  const startNewGame = () => {
    setSnake([
      { x: 7, y: 7 },
      { x: 7, y: 8 },
      { x: 7, y: 9 }
    ]);
    setFood({ x: 7, y: 3 });
    setFoodIndex(Math.floor(Math.random() * CAMPUS_FOODS.length));
    setDirection("UP");
    setIsGameOver(false);
    setIsPlaying(true);
    setScore(0);
  };

  const handleDirectionChange = (newDir: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    setDirection((currDir) => {
      if (newDir === "UP" && currDir === "DOWN") return currDir;
      if (newDir === "DOWN" && currDir === "UP") return currDir;
      if (newDir === "LEFT" && currDir === "RIGHT") return currDir;
      if (newDir === "RIGHT" && currDir === "LEFT") return currDir;
      return newDir;
    });
  };

  const moveSnake = () => {
    setSnake((prevSnake) => {
      const head = prevSnake[0];
      let dx = 0;
      let dy = 0;

      switch (direction) {
        case "UP": dy = -1; break;
        case "DOWN": dy = 1; break;
        case "LEFT": dx = -1; break;
        case "RIGHT": dx = 1; break;
      }

      const newHead = {
        x: (head.x + dx + SNAKE_GRID_SIZE) % SNAKE_GRID_SIZE,
        y: (head.y + dy + SNAKE_GRID_SIZE) % SNAKE_GRID_SIZE
      };

      // Check self-collision
      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      // Check if food eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((s) => {
          const nextScore = s + 10;
          if (nextScore > highScore) {
            setHighScore(nextScore);
            localStorage.setItem("sjcet_snake_highscore", nextScore.toString());
          }
          return nextScore;
        });
        spawnFood(newSnake);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  };

  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const gameInterval = setInterval(() => {
      moveSnake();
    }, 160);

    return () => clearInterval(gameInterval);
  }, [isPlaying, isGameOver, direction]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isGameOver || !isPlaying) return;
      
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          handleDirectionChange("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          handleDirectionChange("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          handleDirectionChange("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          handleDirectionChange("RIGHT");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying, isGameOver]);

  const renderCells = () => {
    const cells = [];
    for (let r = 0; r < SNAKE_GRID_SIZE; r++) {
      for (let c = 0; c < SNAKE_GRID_SIZE; c++) {
        const isHead = snake[0].x === c && snake[0].y === r;
        const isBody = snake.slice(1).some(segment => segment.x === c && segment.y === r);
        const isFood = food.x === c && food.y === r;

        cells.push(
          <div
            key={`${r}-${c}`}
            className="flex items-center justify-center aspect-square text-xs select-none"
          >
            {isHead && <span className="text-[14px]">🐍</span>}
            {isBody && <div className="w-[85%] h-[85%] rounded-[6px] bg-emerald-500 border border-emerald-600/30 scale-95" />}
            {isFood && <span className="text-[14px] animate-pulse">{CAMPUS_FOODS[foodIndex].emoji}</span>}
            {!isHead && !isBody && !isFood && (
              <div className="w-1 h-1 rounded-full bg-slate-800/40" />
            )}
          </div>
        );
      }
    }
    return cells;
  };

  return (
    <div className="space-y-4 max-w-sm mx-auto py-2">
      {/* Score Header */}
      <div className="flex justify-between items-center bg-surface border border-border/60 p-3.5 rounded-2xl text-xs font-bold shadow-xs">
        <span className="text-ink-soft">Score: <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{score}</span></span>
        <span className="text-ink-soft">Best: <span className="text-indigo font-extrabold text-sm">{highScore}</span></span>
      </div>

      {!isPlaying ? (
        <div className="rounded-[28px] border border-border/60 bg-surface p-6 shadow-sm text-center space-y-4">
          <div className="text-5xl animate-pulse">🐍🥞</div>
          <h3 className="font-display text-lg font-bold text-ink">Campus Snake</h3>
          <p className="text-xs text-ink-soft leading-relaxed px-4">
            Eat delicious SJCET college food items like Porotta, Puttu & Chai to grow longer!
          </p>
          <button
            onClick={startNewGame}
            className="w-full py-3.5 rounded-2xl bg-indigo-deep text-white font-display font-bold text-sm shadow-md active:scale-95 transition"
          >
            Start Eating 🚀
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* LED Display Box */}
          <div className="rounded-[28px] bg-slate-900 border-[6px] border-slate-950 p-2 shadow-inner relative overflow-hidden aspect-square w-full max-w-[280px] mx-auto">
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(15, minmax(0, 1fr))',
                gridTemplateRows: 'repeat(15, minmax(0, 1fr))'
              }}
              className="w-full h-full"
            >
              {renderCells()}
            </div>

            {isGameOver && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl">😵‍💫💥</span>
                <h4 className="font-display text-lg font-bold text-white mt-3">Game Over!</h4>
                <p className="text-xs text-slate-400 mt-1">You bit yourself! final score: {score}</p>
                <button
                  onClick={startNewGame}
                  className="mt-4 px-5 py-2.5 bg-indigo text-white text-xs font-bold rounded-xl active:scale-95 transition"
                >
                  Play Again 🚀
                </button>
              </div>
            )}
          </div>

          {/* Food Info Status */}
          <div className="text-center text-[10px] font-bold uppercase text-ink-soft/60">
            Next Snack: <span className="text-indigo">{CAMPUS_FOODS[foodIndex].name} {CAMPUS_FOODS[foodIndex].emoji}</span>
          </div>

          {/* D-Pad controls */}
          <div className="grid grid-cols-3 gap-2.5 w-36 mx-auto mt-2">
            <div></div>
            <button
              onClick={() => handleDirectionChange("UP")}
              className="w-11 h-11 bg-surface border border-border/80 flex items-center justify-center rounded-2xl active:scale-90 transition shadow-xs text-ink"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <div></div>

            <button
              onClick={() => handleDirectionChange("LEFT")}
              className="w-11 h-11 bg-surface border border-border/80 flex items-center justify-center rounded-2xl active:scale-90 transition shadow-xs text-ink"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="w-11 h-11 flex items-center justify-center text-xs font-bold text-ink-soft opacity-30">🕹️</div>
            <button
              onClick={() => handleDirectionChange("RIGHT")}
              className="w-11 h-11 bg-surface border border-border/80 flex items-center justify-center rounded-2xl active:scale-90 transition shadow-xs text-ink"
            >
              <ArrowRight className="h-5 w-5" />
            </button>

            <div></div>
            <button
              onClick={() => handleDirectionChange("DOWN")}
              className="w-11 h-11 bg-surface border border-border/80 flex items-center justify-center rounded-2xl active:scale-90 transition shadow-xs text-ink"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
            <div></div>
          </div>
        </div>
      )}
    </div>
  );
}
