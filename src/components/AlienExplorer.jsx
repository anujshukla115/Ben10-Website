import React, { useState, useEffect } from 'react';
import './AlienExplorer.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaFire, FaWater, FaLeaf, FaSnowflake, FaBolt, FaFistRaised } from 'react-icons/fa';

const AlienExplorer = () => {
  const [activeSeries, setActiveSeries] = useState('classic');
  const [activeAlienIndex, setActiveAlienIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Ben 10 Series Data with all aliens
  const benSeries = {
    classic: {
      title: "Ben 10 Classic",
      color: "#00FF88",
      bgColor: "linear-gradient(135deg, #0a0f2c, #04703d)",
      description: "The original series where 10-year-old Ben first discovers the Omnitrix",
      aliens: [
        {
          name: "Heatblast",
          description: "A Pyronite from Pyros. Can manipulate and project intense flames, withstand extreme heat, and fly using pyrokinetic propulsion.",
          image: "/images/classic/heatblast.png",
          abilities: ["Pyrokinesis", "Flight", "Heat Resistance"],
          icon: <FaFire />,
          species: "Pyronite"
        },
        {
          name: "Four Arms",
          description: "A Tetramand from Khoros. Possesses immense strength, four powerful arms for combat, and enhanced durability.",
          image: "/images/classic/fourarms.png",
          abilities: ["Super Strength", "Four Arms", "Enhanced Durability"],
          icon: <FaFistRaised />,
          species: "Tetramand"
        },
        {
          name: "Diamondhead",
          description: "A Petrosapien from Petropia. Can generate and manipulate crystals, fire crystal shards, and reform his body.",
          image: "/images/classic/diamondhead.png",
          abilities: ["Crystal Generation", "Projectile Shooting", "Reformation"],
          icon: "💎",
          species: "Petrosapien"
        },
        {
          name: "XLR8",
          description: "A Kineceleran from Kinet. Moves at superhuman speeds, possesses enhanced reflexes, and creates after-images.",
          image: "/images/classic/xlr8.png",
          abilities: ["Super Speed", "Enhanced Reflexes", "Time Perception"],
          icon: "⚡",
          species: "Kineceleran"
        },
        {
          name: "Ripjaws",
          description: "A Piscciss Volann from Piscciss. Can breathe underwater, has powerful jaws, enhanced swimming speed, and night vision.",
          image: "/images/classic/ripjaws.png",
          abilities: ["Underwater Breathing", "Powerful Bite", "Aquatic Speed"],
          icon: <FaWater />,
          species: "Piscciss Volann"
        },
        {
          name: "Ghostfreak",
          description: "An Ectonurite from Anur Phaetos. Can become intangible, invisible, possess others, and extend tentacles.",
          image: "/images/classic/ghostfreak.png",
          abilities: ["Intangibility", "Invisibility", "Possession"],
          icon: "👻",
          species: "Ectonurite"
        }
      ]
    },
    alienForce: {
      title: "Ben 10: Alien Force",
      color: "#2196F3",
      bgColor: "linear-gradient(135deg, #0a0f2c, #1e3c72)",
      description: "Five years later, 15-year-old Ben retrieves the Omnitrix to find his missing grandfather",
      aliens: [
        {
          name: "Swampfire",
          description: "A Methanosian from Methanos. Can manipulate plants, generate flames, regenerate limbs, and emit methane gas.",
          image: "/images/alienforce/swampfire.png",
          abilities: ["Pyrokinesis", "Plant Manipulation", "Regeneration"],
          icon: <FaLeaf />,
          species: "Methanosian"
        },
        {
          name: "Humungousaur",
          description: "A Vaxasaurian from Terradino. Can grow in size, possesses immense strength, and has near-indestructible skin.",
          image: "/images/alienforce/humungousaur.png",
          abilities: ["Size Manipulation", "Super Strength", "Enhanced Durability"],
          icon: <FaFistRaised />,
          species: "Vaxasaurian"
        },
        {
          name: "Big Chill",
          description: "A Necrofriggian from Kylmyys. Can fly, become intangible, freeze targets, and withstand extreme cold.",
          image: "/images/alienforce/bigchill.png",
          abilities: ["Cryokinesis", "Intangibility", "Flight"],
          icon: <FaSnowflake />,
          species: "Necrofriggian"
        },
        {
          name: "Jetray",
          description: "An Aerophibian from Aeropela. Can fly at hypersonic speeds, breathe underwater, and fire neuroshock blasts.",
          image: "/images/alienforce/jetray.png",
          abilities: ["Hypersonic Flight", "Neuroshock Blasts", "Aquatic Adaptation"],
          icon: "✈️",
          species: "Aerophibian"
        },
        {
          name: "Chromastone",
          description: "A Crystalsapien from Petropia. Can absorb, store, and redirect energy, fly, and project energy beams.",
          image: "/images/alienforce/chromastone.png",
          abilities: ["Energy Absorption", "Energy Projection", "Flight"],
          icon: "🔮",
          species: "Crystalsapien"
        }
      ]
    },
    ultimateAlien: {
      title: "Ben 10: Ultimate Alien",
      color: "#FF9800",
      bgColor: "linear-gradient(135deg, #2c0a0a, #ff6600)",
      description: "Ben faces his greatest challenge with the Ultimatrix and Ultimate forms",
      aliens: [
        {
          name: "Ultimate Swampfire",
          description: "Evolved form with explosive seed projectiles, enhanced strength, and faster regeneration.",
          image: "/images/ultimate/ultimateswampfire.png",
          abilities: ["Explosive Seeds", "Enhanced Strength", "Rapid Regeneration"],
          icon: <FaLeaf />,
          species: "Methanosian (Evolved)"
        },
        {
          name: "Ultimate Humungousaur",
          description: "Evolved with missile launchers on his back, enhanced durability, and explosive spikes.",
          image: "/images/ultimate/ultimatehumungousaur.png",
          abilities: ["Missile Launchers", "Spike Projection", "Enhanced Durability"],
          icon: <FaFistRaised />,
          species: "Vaxasaurian (Evolved)"
        },
        {
          name: "Ultimate Big Chill",
          description: "Evolved with enhanced freezing abilities, sonic screams, and faster flight.",
          image: "/images/ultimate/ultimatebigchill.png",
          abilities: ["Absolute Zero Freeze", "Sonic Scream", "Enhanced Flight"],
          icon: <FaSnowflake />,
          species: "Necrofriggian (Evolved)"
        },
        {
          name: "Ultimate Way Big",
          description: "Massive cosmic being with cosmic ray manipulation and immense size.",
          image: "/images/ultimate/ultimatewaybig.png",
          abilities: ["Cosmic Ray Manipulation", "Immense Size", "Super Strength"],
          icon: "🌌",
          species: "To'kustar (Evolved)"
        },
        {
          name: "Ultimate Echo Echo",
          description: "Evolved with solid sound constructs and multi-duplication capabilities.",
          image: "/images/ultimate/ultimateechoecho.png",
          abilities: ["Solid Sound Constructs", "Multi-Duplication", "Sonic Screams"],
          icon: "📢",
          species: "Sonorosian (Evolved)"
        }
      ]
    },
    omniverse: {
      title: "Ben 10: Omniverse",
      color: "#9C27B0",
      bgColor: "linear-gradient(135deg, #220a2c, #6e1f7c)",
      description: "Ben teams up with new partner Rook to protect the universe",
      aliens: [
        {
          name: "Feedback",
          description: "Can absorb and redirect any form of energy through his tail-like appendages.",
          image: "/images/omniverse/feedback.png",
          abilities: ["Energy Absorption", "Energy Redirection", "Electrical Manipulation"],
          icon: <FaBolt />,
          species: "Conductoid"
        },
        {
          name: "Bloxx",
          description: "Living Lego-like creature that can reconstruct his body into various shapes.",
          image: "/images/omniverse/bloxx.png",
          abilities: ["Shape Reconstruction", "Elasticity", "Super Strength"],
          icon: "🧱",
          species: "Segmentasapien"
        },
        {
          name: "Gravattack",
          description: "Can manipulate gravity to crush or levitate objects and create miniature black holes.",
          image: "/images/omniverse/gravattack.png",
          abilities: ["Gravity Manipulation", "Planetary Form", "Enhanced Durability"],
          icon: "🌍",
          species: "Galvanic Mechamorph"
        },
        {
          name: "Crashhopper",
          description: "Grasshopper-like alien with powerful jumping abilities and shockwave creation.",
          image: "/images/omniverse/crashhopper.png",
          abilities: ["Super Jumping", "Shockwave Creation", "Acrobatics"],
          icon: "🦗",
          species: "Orthopterran"
        },
        {
          name: "Walkatrout",
          description: "Extremely slippery fish-like alien that can escape any grasp.",
          image: "/images/omniverse/walkatrout.png",
          abilities: ["Super Slipperiness", "Underwater Breathing", "Agility"],
          icon: "🐟",
          species: "Ickthyperambuloid"
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
    }, 400);
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
    }, 400);
  };

  // Get active series data
  const activeSeriesData = benSeries[activeSeries];
  const activeAlien = activeSeriesData.aliens[activeAlienIndex];

  return (
    <section className="alien-explorer" style={{ background: activeSeriesData.bgColor }}>
      <div className="container">
        <motion.div 
          className="explorer-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2>Omnitrix Alien Database</h2>
          <p>Explore every alien transformation across all Ben 10 series</p>
        </motion.div>

        {/* Series Selector */}
        <div className="series-selector">
          {Object.keys(benSeries).map((seriesKey) => (
            <motion.button
              key={seriesKey}
              className={`series-btn ${activeSeries === seriesKey ? 'active' : ''}`}
              style={{
                backgroundColor: activeSeries === seriesKey ? benSeries[seriesKey].color : 'rgba(255,255,255,0.1)',
                borderColor: benSeries[seriesKey].color
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSeriesChange(seriesKey)}
            >
              {benSeries[seriesKey].title}
            </motion.button>
          ))}
        </div>

        {/* Series Info */}
        <motion.div 
          className="series-info"
          key={activeSeries}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ color: activeSeriesData.color }}>{activeSeriesData.title}</h3>
          <p>{activeSeriesData.description}</p>
        </motion.div>

        {/* Alien Display */}
        <div className={`alien-display-container ${isTransitioning ? 'transitioning' : ''}`}>
          <div className="alien-display">
            <button className="nav-btn prev" onClick={() => handleAlienChange('prev')}>
              <FaChevronLeft />
            </button>

            <div className="alien-card">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeSeries}-${activeAlienIndex}`}
                  className="alien-content"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="alien-image-section">
                    <div className="alien-image-wrapper">
                      <div 
                        className="alien-image"
                        style={{ 
                          backgroundImage: `url(${activeAlien.image})`,
                          boxShadow: `0 0 30px ${activeSeriesData.color}80`
                        }}
                      />
                      <div className="alien-series-tag" style={{ backgroundColor: activeSeriesData.color }}>
                        {activeSeriesData.title.split(' ')[0]}
                      </div>
                    </div>
                    <div className="alien-stats">
                      <div className="stat">
                        <span className="stat-label">Species:</span>
                        <span className="stat-value">{activeAlien.species}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Series:</span>
                        <span className="stat-value">{activeSeriesData.title}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Alien {activeAlienIndex + 1}/{activeSeriesData.aliens.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="alien-info-section">
                    <div className="alien-header">
                      <h3 style={{ color: activeSeriesData.color }}>{activeAlien.name}</h3>
                      <div className="alien-icon">{activeAlien.icon}</div>
                    </div>
                    
                    <p className="alien-description">{activeAlien.description}</p>
                    
                    <div className="abilities-section">
                      <h4>Abilities & Powers:</h4>
                      <div className="abilities-grid">
                        {activeAlien.abilities.map((ability, index) => (
                          <motion.div
                            key={index}
                            className="ability-tag"
                            style={{ backgroundColor: `${activeSeriesData.color}40` }}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {ability}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button className="nav-btn next" onClick={() => handleAlienChange('next')}>
              <FaChevronRight />
            </button>
          </div>

          {/* Alien Dots Navigation */}
          <div className="alien-dots">
            {activeSeriesData.aliens.map((_, index) => (
              <button
                key={index}
                className={`alien-dot ${index === activeAlienIndex ? 'active' : ''}`}
                style={{ 
                  backgroundColor: index === activeAlienIndex ? activeSeriesData.color : '#555',
                  transform: index === activeAlienIndex ? 'scale(1.3)' : 'scale(1)'
                }}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setActiveAlienIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
              />
            ))}
          </div>
        </div>

        {/* All Aliens Grid */}
        <div className="all-aliens-preview">
          <h4>All Aliens in {activeSeriesData.title}</h4>
          <div className="aliens-grid">
            {activeSeriesData.aliens.map((alien, index) => (
              <motion.div
                key={index}
                className={`preview-alien-card ${index === activeAlienIndex ? 'active' : ''}`}
                style={{ borderColor: index === activeAlienIndex ? activeSeriesData.color : 'transparent' }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setActiveAlienIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
              >
                <div 
                  className="preview-alien-image"
                  style={{ backgroundImage: `url(${alien.image})` }}
                />
                <div className="preview-alien-info">
                  <h5>{alien.name}</h5>
                  <p className="preview-species">{alien.species}</p>
                  <div className="preview-abilities">
                    {alien.abilities.slice(0, 2).map((ability, i) => (
                      <span key={i} className="preview-ability">{ability}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlienExplorer;
