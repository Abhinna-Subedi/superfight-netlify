import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './App.css';

function App() {
  const [hero, setHero] = useState("");
  const [drawnCards, setDrawnCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);

  // Generate cards (100 heroes + 500 abilities)
  const heroCards = Array.from({ length: 100 }, (_, i) => `Hero ${i+1}`);
  const abilityCards = Array.from({ length: 500 }, (_, i) => `Ability ${i+1}`);

  // Set initial hero
  useEffect(() => {
    setHero(heroCards[Math.floor(Math.random() * heroCards.length)]);
  }, []);

  // Draw 3 ability cards
  const drawCards = () => {
    const newCards = [];
    for (let i = 0; i < 3; i++) {
      newCards.push(abilityCards[Math.floor(Math.random() * abilityCards.length)]);
    }
    setDrawnCards(newCards);
  };

  // Select card animation
  const selectCard = (card) => {
    setSelectedCards([...selectedCards, card]);
  };

  return (
    <div className="app">
      {/* Hero Card */}
      <motion.div className="card hero-card">
        {hero}
      </motion.div>

      {/* Draw Button */}
      <button onClick={drawCards}>Draw 3 Cards</button>

      {/* Drawn Cards Row */}
      <div className="cards-row">
        {drawnCards.map((card, index) => (
          !selectedCards.includes(card) && (
            <motion.div 
              key={index}
              className="card ability-card"
              onClick={() => selectCard(card)}
              whileHover={{ scale: 1.05 }}
              animate={{ x: 0, y: 0 }}
            >
              {card}
            </motion.div>
          )
        ))}
      </div>

      {/* Selected Cards (Top Right) */}
      <div className="hand">
        {selectedCards.map((card, index) => (
          <motion.div
            key={card}
            className="card ability-card"
            animate={{
              x: 100 + index * 20,
              y: -100 - index * 10,
              rotate: -5 + index * 5
            }}
          >
            {card}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default App;
