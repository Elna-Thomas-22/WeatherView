import React, { useState } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

 const API_KEY = 'c054a154f344ae81602c37862ceffb75';
; // Replace with your OpenWeatherMap API key

  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city name");

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  const getWeatherIcon = (weatherMain) => {
    const icons = {
      Clear: '☀️',
      Clouds: '☁️',
      Rain: '🌧️',
      Drizzle: '🌦️',
      Thunderstorm: '⛈️',
      Snow: '❄️',
      Mist: '🌫️',
      Fog: '🌫️',
      Haze: '🌫️'
    };
    return icons[weatherMain] || '🌤️';
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>🌦️ Weather Explorer</h1>
          <p style={styles.subtitle}>Discover weather conditions around the world</p>
        </div>

        <div style={styles.searchContainer}>
          <div style={styles.inputWrapper}>
            <input
              type="text"
              placeholder="Enter city name..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyPress={handleKeyPress}
              style={styles.input}
            />
            <button 
              onClick={fetchWeather} 
              style={styles.button}
              disabled={loading}
            >
              {loading ? (
                <div style={styles.spinner}></div>
              ) : (
                '🔍 Search'
              )}
            </button>
          </div>
        </div>

        {weather && (
          <div style={styles.weatherCard}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cityName}>
                📍 {weather.name}, {weather.sys.country}
              </h2>
              <div style={styles.weatherIcon}>
                {getWeatherIcon(weather.weather[0].main)}
              </div>
            </div>
            
            <div style={styles.cardBody}>
              <div style={styles.temperature}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div style={styles.description}>
                {weather.weather[0].description.charAt(0).toUpperCase() + 
                 weather.weather[0].description.slice(1)}
              </div>
              
              <div style={styles.details}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Feels like</span>
                  <span style={styles.detailValue}>{Math.round(weather.main.feels_like)}°C</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Humidity</span>
                  <span style={styles.detailValue}>{weather.main.humidity}%</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Wind Speed</span>
                  <span style={styles.detailValue}>{weather.wind.speed} m/s</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Pressure</span>
                  <span style={styles.detailValue}>{weather.main.pressure} hPa</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: `
      radial-gradient(circle at 30% 20%, rgba(255, 223, 0, 0.9) 0%, rgba(255, 223, 0, 0.3) 25%, transparent 50%),
      radial-gradient(circle at 70% 30%, rgba(255, 165, 0, 0.8) 0%, rgba(255, 165, 0, 0.2) 30%, transparent 60%),  
      radial-gradient(circle at 20% 70%, rgba(255, 193, 7, 0.6) 0%, transparent 40%),
      linear-gradient(135deg, #FFE082 0%, #FFAB40 25%, #FF7043 50%, #E91E63 75%, #9C27B0 100%),
      linear-gradient(45deg, #FFA726 0%, #FFB74D 50%, #FFCC02 100%)
    `,
    zIndex: -2,
  },
  content: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '4rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '3rem',
    animation: 'fadeInUp 0.8s ease-out',
  },
  title: {
    fontSize: '3.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff, #f0f0f0)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    margin: '0 0 0.5rem 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: 'rgba(255, 255, 255, 0.8)',
    margin: 0,
    fontWeight: '300',
  },
  searchContainer: {
    marginBottom: '3rem',
    animation: 'fadeInUp 0.8s ease-out 0.2s both',
  },
  inputWrapper: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '50px',
    padding: '0.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  input: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '1rem 1.5rem',
    fontSize: '1.1rem',
    color: 'white',
    width: '300px',
    fontWeight: '400',
  },
  button: {
    background: 'linear-gradient(135deg, #ff6b6b, #ff8e8e)',
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    minWidth: '120px',
    justifyContent: 'center',
  },
  spinner: {
    width: '20px',
    height: '20px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  weatherCard: {
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
    borderRadius: '25px',
    padding: '2.5rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
    maxWidth: '500px',
    width: '100%',
    animation: 'fadeInUp 0.8s ease-out 0.4s both',
    transition: 'transform 0.3s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  cityName: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: 'white',
    margin: 0,
    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
  },
  weatherIcon: {
    fontSize: '4rem',
    animation: 'bounce 2s infinite',
  },
  cardBody: {
    textAlign: 'center',
  },
  temperature: {
    fontSize: '4rem',
    fontWeight: '700',
    color: 'white',
    margin: '1rem 0',
    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  },
  description: {
    fontSize: '1.3rem',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: '2rem',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  details: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginTop: '2rem',
  },
  detailItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '15px',
    padding: '1rem',
    backdropFilter: 'blur(5px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  detailLabel: {
    fontSize: '0.9rem',
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '0.5rem',
    fontWeight: '400',
  },
  detailValue: {
    fontSize: '1.1rem',
    color: 'white',
    fontWeight: '600',
  },
};

// Add keyframe animations via CSS-in-JS simulation
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }
  
  input::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
  }
  
  button:active {
    transform: translateY(0);
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  button:disabled:hover {
    transform: none;
    box-shadow: 0 4px 15px rgba(255, 107, 107, 0.3);
  }
  
  @media (max-width: 768px) {
    .container {
      padding: 1rem;
    }
    
    .title {
      font-size: 2.5rem;
    }
    
    .inputWrapper {
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
    }
    
    .input {
      width: 100%;
      text-align: center;
    }
    
    .details {
      grid-template-columns: 1fr;
    }
  }
`;
document.head.appendChild(styleSheet);

export default App;