// src/Quotes.js
import React, { useState, useEffect } from 'react';
import { FaHeart, FaShareAlt } from 'react-icons/fa';
import './Quotes.css';

function Quotes({ user }) {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState('');
  const [currentQuote, setCurrentQuote] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    // Fetch quotes from the API
    const fetchQuotes = async () => {
      try {
        const response = await fetch('https://api.quotable.io/quotes?tags=love');
        const data = await response.json();
        
        // Check if the data structure is correct
        if (data && data.results) {
          const formattedQuotes = data.results.map(q => ({ text: `${q.content} - ${q.author}`, favorite: false }));
          setQuotes(formattedQuotes);
          if (formattedQuotes.length > 0) {
            setCurrentQuote(formattedQuotes[Math.floor(Math.random() * formattedQuotes.length)].text);
          }
        } else {
          console.error("Unexpected data structure:", data);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    const savedQuotes = JSON.parse(localStorage.getItem('quotes'));
    if (savedQuotes) {
      setQuotes(savedQuotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('quotes', JSON.stringify(quotes));
  }, [quotes]);

  const addQuote = () => {
    if (newQuote.trim()) {
      setQuotes([...quotes, { text: newQuote, favorite: false }]);
      setNewQuote('');
    }
  };

  const getRandomQuote = () => {
    if (quotes.length > 0) {
      setCurrentQuote(quotes[Math.floor(Math.random() * quotes.length)].text);
    } else {
      setCurrentQuote('');
    }
  };

  const toggleFavorite = (index) => {
    const newQuotes = quotes.map((quote, i) =>
      i === index ? { ...quote, favorite: !quote.favorite } : quote
    );
    setQuotes(newQuotes);
  };

  const shareQuote = (quote) => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quote)}`;
    window.open(url, '_blank');
  };

  const filteredQuotes = showFavorites
    ? quotes.filter((quote) => quote.favorite)
    : quotes;

  return (
    <div className="quotes-container">
      <h1>Romantic Quotes</h1>
      {user && <p>Welcome, {user.email}</p>}
      <div className="quote-display">
        <p>{currentQuote}</p>
        <button onClick={getRandomQuote}>Show Another Quote</button>
      </div>
      {user && (
        <div className="input-container">
          <input
            type="text"
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            placeholder="Add a new romantic quote"
          />
          <button onClick={addQuote}>Add Quote</button>
        </div>
      )}
      <div className="favorites-toggle">
        <label>
          <input 
            type="checkbox"
            checked={showFavorites}
            onChange={() => setShowFavorites(!showFavorites)}
          />
          Show Favorites
        </label>
      </div>
      <ul>
        {filteredQuotes.map((quote, index) => (
          <li key={index} className={quote.favorite ? 'favorite' : ''}>
            <span>{quote.text}</span>
            <div className="actions">
              <FaHeart
                className={`icon ${quote.favorite ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(index)}
              />
              <FaShareAlt
                className="icon"
                onClick={() => shareQuote(quote.text)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Quotes;
