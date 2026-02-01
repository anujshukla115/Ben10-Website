import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [activeSeries, setActiveSeries] = useState('classic');
  const [activeAlienIndex, setActiveAlienIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ben 10 series data
  const benSeries = {
    classic: {
      title: "Ben 10 Classic",
      description: "The original series where Ben first discovers the Omnitrix",
      color: "#4CAF50",
      aliens: [
        {
          name: "Heatblast",
          description: "Pyrokinesis, fire manipulation, and flight capabilities",
          image: "https://images.unsplash.com/photo-1614729937450-1c28b5e3c3e9?w=300&h=300&fit=crop",
          abilities: ["Fire Manipulation", "Flight", "Heat Resistance"]
        },
        {
          name: "Four Arms",
          description: "Superhuman strength with four powerful arms",
          image: "https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?w=300&h=300&fit=crop",
          abilities: ["Super Strength", "Enhanced Durability", "Multi-limb Combat"]
        },
        {
          name: "Diamondhead",
          description: "Crystalline body with projectile shooting capabilities",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
          abilities: ["Crystal Generation", "Projectile Shooting", "Damage Resistance"]
        },
        {
          name: "XLR8",
          description: "Super-speed and enhanced reflexes",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=300&fit=crop",
          abilities: ["Super Speed", "Enhanced Reflexes", "Rapid Movement"]
        },
        {
          name: "Ripjaws",
          description: "Aquatic alien with powerful jaws and swimming abilities",
          image: "https://images.unsplash.com/photo-1560279966-8ff2f6c66cf3?w=300&h=300&fit=crop",
          abilities: ["Underwater Breathing", "Enhanced Bite Force", "Aquatic Adaptation"]
        }
      ]
    },
    alienForce: {
      title: "Ben 10: Alien Force",
      description: "Five years later, Ben retrieves the Omnitrix to find his missing grandfather",
      color: "#2196F3",
      aliens: [
        {
          name: "Swampfire",
          description: "Plant-based alien with fire and regeneration abilities",
          image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop",
          abilities: ["Plant Manipulation", "Pyrokinesis", "Regeneration"]
        },
        {
          name: "Humungousaur",
          description: "Can grow in size with immense strength and durability",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop",
          abilities: ["Size Manipulation", "Super Strength", "Enhanced Durability"]
        },
        {
          name: "Jetray",
          description: "Aerodynamic alien with neuroshock blasts and hyperflight",
          image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=300&h=300&fit=crop",
          abilities: ["Hyperflight", "Neuroshock Blasts", "Underwater Adaptation"]
        },
        {
          name: "Big Chill",
          description: "Ice-based alien with intangibility and cryokinesis",
          image: "https://images.unsplash.com/photo-1612277795009-f95f3e192a6a?w=300&h=300&fit=crop",
          abilities: ["Cryokinesis", "Intangibility", "Flight"]
        },
        {
          name: "Chromastone",
          description: "Crystalline being that absorbs and redirects energy",
          image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop",
          abilities: ["Energy Absorption", "Energy Projection", "Flight"]
        }
      ]
    },
    ultimateAlien: {
      title: "Ben 10: Ultimate Alien",
      description: "Ben faces his greatest challenge with the Ultimatrix",
      color: "#FF9800",
      aliens: [
        {
          name: "Ultimate Swampfire",
          description: "Evolved form with explosive seed projectiles and enhanced strength",
          image: "https://images.unsplash.com/photo-1563089145-599997674d42?w=300&h=300&fit=crop",
          abilities: ["Explosive Seed Projectiles", "Enhanced Strength", "Regeneration"]
        },
        {
          name: "Ultimate Humungousaur",
          description: "Evolved with missile launchers on his back and enhanced durability",
          image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&h=300&fit=crop",
          abilities: ["Missile Launchers", "Enhanced Durability", "Super Strength"]
        },
        {
          name: "Ultimate Big Chill",
          description: "Evolved with enhanced freezing abilities and sonic screams",
          image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop",
          abilities: ["Absolute Zero Freeze", "Sonic Scream", "Enhanced Flight"]
        },
        {
          name: "Ultimate Way Big",
          description: "Massive cosmic being with cosmic ray manipulation",
          image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=300&h=300&fit=crop",
          abilities: ["Cosmic Ray Manipulation", "Immense Size", "Super Strength"]
        },
        {
          name: "Ultimate Echo Echo",
          description: "Evolved with solid sound constructs and multi-duplication",
          image: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=300&h=300&fit=crop",
          abilities: ["Solid Sound Constructs", "Multi-Duplication", "Sonic Screams"]
        }
      ]
    },
    omniverse: {
      title: "Ben 10: Omniverse",
      description: "Ben teams up with new partner Rook to protect the universe",
      color: "#9C27B0",
      aliens: [
        {
          name: "Feedback",
          description: "Can absorb and redirect any form of energy",
          image: "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?w=300&h=300&fit=crop",
          abilities: ["Energy Absorption", "Energy Redirection", "Electrical Manipulation"]
        },
        {
          name: "Bloxx",
          description: "Living Lego-like creature with reconstruction abilities",
          image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=300&h=300&fit=crop",
          abilities: ["Shape Reconstruction", "Elasticity", "Super Strength"]
        },
        {
          name: "Gravattack",
          description: "Can manipulate gravity to crush or levitate objects",
          image: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=300&fit=crop",
          abilities: ["Gravity Manipulation", "Planetary Form", "Enhanced Durability"]
        },
        {
          name: "Crashhopper",
          description: "Grasshopper-like alien with powerful jumping abilities",
          image: "https://images.unsplash.com/photo-1518796745738-41048802f99a?w=300&h=300&fit=crop",
          abilities: ["Super Jumping", "Enhanced Leg Strength", "Acrobatics"]
        },
        {
          name: "Walkatrout",
          description: "Extremely slippery fish-like alien",
          image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=300&h=300&fit=crop",
          abilities: ["Super Slipperiness", "Underwater Breathing", "Agility"]
        }
      ]
    }
  };

  // Handle series change
  const handleSeriesChange = (series) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveSeries(series);
      setActiveAlienIndex(0);
      setIsTransitioning(false);
    }, 300);
  };

  // Handle alien navigation
  const handleAlienChange = (direction) => {
    setIsTransitioning(true);
    setTimeout(() => {
      const aliensCount = benSeries[activeSeries].aliens.length;
      if (direction === 'next') {
        setActiveAlienIndex((prevIndex) => (prevIndex + 1) % aliensCount);
      } else {
        setActiveAlienIndex((prevIndex) => (prevIndex - 1 + aliensCount) % aliensCount);
      }
      setIsTransitioning(false);
    }, 300);
  };

  // Get active series data
  const activeSeriesData = benSeries[activeSeries];

  return (
    <div className="app" style={{ background: `linear-gradient(135deg, #0a0a2a 0%, ${activeSeriesData.color}33 100%)` }}>
      <header className="header">
        <div className="logo">
          <h1>Ben 10</h1>
          <div className="omnitrix-icon">
            <div className="omnitrix-center"></div>
          </div>
        </div>
        <p className="tagline">Explore all aliens across every Ben 10 series</p>
      </header>

      <main className="main-content">
        {/* Series selector */}
        <div className="series-selector">
          {Object.keys(benSeries).map((seriesKey) => (
            <button
              key={seriesKey}
              className={`series-tab ${activeSeries === seriesKey ? 'active' : ''}`}
              style={{
                backgroundColor: activeSeries === seriesKey ? benSeries[seriesKey].color : '#333',
                borderColor: benSeries[seriesKey].color
              }}
              onClick={() => handleSeriesChange(seriesKey)}
            >
              {benSeries[seriesKey].title}
            </button>
          ))}
        </div>

        {/* Series info */}
        <div className="series-info">
          <h2 style={{ color: activeSeriesData.color }}>{activeSeriesData.title}</h2>
          <p>{activeSeriesData.description}</p>
        </div>

        {/* Alien display */}
        <div className={`alien-display ${isTransitioning ? 'transitioning' : ''}`}>
          <div className="alien-slider">
            <button className="nav-button prev" onClick={() => handleAlienChange('prev')}>
              &lt;
            </button>
            
            <div className="alien-card">
              <div className="alien-image-container">
                <div 
                  className="alien-image" 
                  style={{ 
                    backgroundImage: `url(${activeSeriesData.aliens[activeAlienIndex].image})`,
                    boxShadow: `0 0 20px ${activeSeriesData.color}`
                  }}
                ></div>
                <div className="alien-series-badge" style={{ backgroundColor: activeSeriesData.color }}>
                  {activeSeriesData.title.split(' ')[0]}
                </div>
              </div>
              
              <div className="alien-info">
                <h3 style={{ color: activeSeriesData.color }}>{activeSeriesData.aliens[activeAlienIndex].name}</h3>
                <p className="alien-description">{activeSeriesData.aliens[activeAlienIndex].description}</p>
                
                <div className="abilities">
                  <h4>Abilities:</h4>
                  <div className="ability-tags">
                    {activeSeriesData.aliens[activeAlienIndex].abilities.map((ability, index) => (
                      <span key={index} className="ability-tag" style={{ backgroundColor: `${activeSeriesData.color}40` }}>
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="alien-counter">
                  {activeAlienIndex + 1} / {activeSeriesData.aliens.length}
                </div>
              </div>
            </div>
            
            <button className="nav-button next" onClick={() => handleAlienChange('next')}>
              &gt;
            </button>
          </div>
        </div>

        {/* Alien selector dots */}
        <div className="alien-dots">
          {activeSeriesData.aliens.map((_, index) => (
            <button
              key={index}
              className={`alien-dot ${index === activeAlienIndex ? 'active' : ''}`}
              style={{ backgroundColor: index === activeAlienIndex ? activeSeriesData.color : '#555' }}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActiveAlienIndex(index);
                  setIsTransitioning(false);
                }, 300);
              }}
            ></button>
          ))}
        </div>

        {/* Quick series preview */}
        <div className="series-preview">
          <h3>All Ben 10 Series</h3>
          <div className="preview-cards">
            {Object.keys(benSeries).map((seriesKey) => (
              <div 
                key={seriesKey} 
                className={`preview-card ${activeSeries === seriesKey ? 'active' : ''}`}
                style={{ borderColor: benSeries[seriesKey].color }}
                onClick={() => handleSeriesChange(seriesKey)}
              >
                <h4 style={{ color: benSeries[seriesKey].color }}>{benSeries[seriesKey].title}</h4>
                <p className="preview-alien-count">{benSeries[seriesKey].aliens.length} aliens</p>
                <div className="preview-aliens">
                  {benSeries[seriesKey].aliens.slice(0, 3).map((alien, idx) => (
                    <div key={idx} className="preview-alien">
                      <div 
                        className="preview-alien-image" 
                        style={{ backgroundImage: `url(${alien.image})` }}
                      ></div>
                      <span className="preview-alien-name">{alien.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Ben 10 Interactive Experience • All content is based on the Ben 10 franchise</p>
        <div className="omnitrix-animation">
          <div className="omnitrix-segment" style={{ animationDelay: '0s' }}></div>
          <div className="omnitrix-segment" style={{ animationDelay: '0.2s' }}></div>
          <div className="omnitrix-segment" style={{ animationDelay: '0.4s' }}></div>
          <div className="omnitrix-segment" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </footer>
    </div>
  );
};

export default App;
