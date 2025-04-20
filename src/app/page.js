"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { Trophy, RotateCcw } from "lucide-react";

const Memory = () => {
  const emoji = [
    { id: 1, emoji: "🐶", matched: false },
    { id: 2, emoji: "🐱", matched: false },
    { id: 3, emoji: "🐭", matched: false },
    { id: 4, emoji: "🦊", matched: false },
    { id: 5, emoji: "🐻", matched: false },
    { id: 6, emoji: "🐼", matched: false },
    { id: 7, emoji: "🐯", matched: false },
    { id: 8, emoji: "🦁", matched: false },
    { id: 9, emoji: "🐮", matched: false },
    { id: 10, emoji: "🐷", matched: false },
    { id: 11, emoji: "🐸", matched: false },
    { id: 12, emoji: "🐵", matched: false },
    { id: 13, emoji: "🐶", matched: false },
    { id: 14, emoji: "🐱", matched: false },
    { id: 15, emoji: "🐭", matched: false },
    { id: 16, emoji: "🦊", matched: false },
    { id: 17, emoji: "🐻", matched: false },
    { id: 18, emoji: "🐼", matched: false },
    { id: 19, emoji: "🐯", matched: false },
    { id: 20, emoji: "🦁", matched: false },
    { id: 21, emoji: "🐮", matched: false },
    { id: 22, emoji: "🐷", matched: false },
    { id: 23, emoji: "🐸", matched: false },
    { id: 24, emoji: "🐵", matched: false },
  ];

  const [clickedEmoji, setClickedEmoji] = useState([]);
  const [matchedEmoji, setMatchedEmoji] = useState([]);
  const [shuffledEmoji, setShuffledEmoji] = useState([]);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [flippingBack, setFlippingBack] = useState([]);
  const [recentlyMatched, setRecentlyMatched] = useState([]);

  const emojiDup = [...emoji];

  function shuffle(emojis) {
    for (let i = emojis.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [emojis[i], emojis[j]] = [emojis[j], emojis[i]];
    }
    return emojis;
  }
  
  useEffect(() => {
    if (isGameOver) return;

    const timeTaken = setInterval(()=> {
      setTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(timeTaken);
  }, [isGameOver])

  useEffect(() => {
    if (matchedEmoji.length === shuffledEmoji.length && shuffledEmoji.length > 0) {
      setIsGameOver(true);
    }
  }, [matchedEmoji, shuffledEmoji])

  useEffect(() => {
    setShuffledEmoji(shuffle([...emojiDup]));
  }, []);

  // const clickSound = new Audio("/menu-button-89141.mp3");
  // const matchSound = new Audio("/match.mp3");
  // const wrongSound = new Audio("/wrong.mp3");

  const handleClick = (item) => {
    if (
      clickedEmoji.length < 2 &&
      !clickedEmoji.includes(item.id) &&
      !matchedEmoji.includes(item.id) &&
      !flippingBack.includes(item.id)
    ) {
      // clickSound.play().catch(() => {})
      setClickedEmoji([...clickedEmoji, item.id]);
    }
  };

  useEffect(() => {
    if (clickedEmoji.length === 2) {
      let first = emoji.find((item) => item.id === clickedEmoji[0]);
      let second = emoji.find((item) => item.id === clickedEmoji[1]);

      if (first.emoji === second.emoji) {
        // First show them matched with a fade effect
        setRecentlyMatched([first.id, second.id]);
        
        // After the match animation, add them to matched list (which will make them disappear)
        setTimeout(() => {
          setMatchedEmoji([...matchedEmoji, first.id, second.id]);
          setScore((prev) => prev + 1);
          setClickedEmoji([]);
          
          // Clear recently matched after fade animation completes
          setTimeout(() => {
            setRecentlyMatched([]);
          }, 500);
        }, 800);
      } else {
        // Add flippingBack state to animate cards flipping back
        setTimeout(() => {
          setFlippingBack(clickedEmoji);
          setTimeout(() => {
            setClickedEmoji([]);
            setFlippingBack([]);
          }, 500); // Duration of flip back animation
        }, 1000);
      }
    }
  }, [clickedEmoji]);

  const restart = () => {
    setMatchedEmoji([]);
    setShuffledEmoji(shuffle([...emojiDup]));
    setClickedEmoji([]);
    setFlippingBack([]);
    setRecentlyMatched([]);
    setScore(0);
    setTime(0);
    setIsGameOver(false);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-100 to-purple-200 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-5xl font-bold text-purple-800 tracking-tight">
            Memory Game
          </h1>

          <Card className="w-full p-6 bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 bg-purple-100 px-4 py-2 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600" />
                <span className="text-lg font-medium">
                  Matched: {score} pairs
                </span>
              </div>

              <Button
                onClick={restart}
                variant="outline"
                className="flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Restart
              </Button>
            </div>

            <div className="grid grid-cols-4 gap-4 md:grid-cols-6">
              {shuffledEmoji.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleClick(item)}
                  className={`
                    aspect-square flex items-center justify-center rounded-xl text-7xl
                    perspective-1000 transition-all duration-300 cursor-pointer
                    ${matchedEmoji.includes(item.id) ? "pointer-events-none" : ""}
                  `}
                >
                  <div 
                    className={`
                      absolute w-full h-full transition-all duration-500 transform-style-preserve-3d
                      ${matchedEmoji.includes(item.id) ? "opacity-0 scale-95" : ""}
                      ${(clickedEmoji.includes(item.id) || matchedEmoji.includes(item.id)) ? "rotate-y-180" : ""}
                      ${flippingBack.includes(item.id) ? "rotate-y-0" : ""}
                    `}
                  >
                    {/* Card Front */}
                    <div 
                      className={`
                        absolute w-full h-full flex items-center justify-center backface-hidden
                        bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl shadow-xl
                      `}
                    />
                    
                    {/* Card Back */}
                    <div 
                      className={`
                        absolute w-full h-full flex items-center justify-center backface-hidden rotate-y-180
                        bg-gray-300 rounded-xl shadow-lg
                        ${recentlyMatched.includes(item.id) ? "animate-match-fade bg-green-200" : ""}
                      `}
                    >
                      {item.emoji}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Add CSS for the flip animations */}
      <style jsx global>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        @keyframes matchFade {
          0% { transform: rotateY(180deg) scale(1); background-color: #e9fae9; }
          30% { transform: rotateY(180deg) scale(1.05); background-color: #9ae49a; }
          100% { transform: rotateY(180deg) scale(1); background-color: #e2e2e2; }
        }
        .animate-match-fade {
          animation: matchFade 0.8s ease-out forwards;
        }
      `}</style>

      {matchedEmoji.length === shuffledEmoji.length && shuffledEmoji.length > 0 && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center animate-fadeIn">
          <Card className="p-8 max-w-sm w-full mx-4 text-center animate-scaleIn">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="text-gray-600 mb-6">
              You've matched all the pairs! Want to play again?
            </p>
            <p className="text-xl mb-4">{`Time Taken : ${time}sec`}</p>
            <Button onClick={restart} className="w-full">
              Play Again
            </Button>
          </Card>
        </div>
      )}

      {/* Additional animations for modal */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Memory;