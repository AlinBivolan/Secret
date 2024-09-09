import React, { useState } from 'react';
import { motion } from 'framer-motion';
import cat from './../images/SecondCat.png';
import secondCat from './../images/FirstCat.png';
import egg1 from './../images/Ou_1.png'; 
import egg2 from './../images/Ou_2.png';
import egg3 from './../images/Ou_3.png';
import crackedEgg from './../images/Ou_4.png';
import egg5 from './../images/Ou_5.png'; 
import cat_final from './../images/cat_egg_final.png';
import dateGif from './../images/happy-cat.gif'; // GIF care va apărea la final
import './FirstCat.css';

const FirstCat = () => {
  const [firstImageVisible, setFirstImageVisible] = useState(false);
  const [firstButtonVisible, setFirstButtonVisible] = useState(true);
  const [secondImageVisible, setSecondImageVisible] = useState(false);
  const [thirdButtonVisible, setThirdButtonVisible] = useState(false);
  const [eggVisible, setEggVisible] = useState(false);
  const [eggStage, setEggStage] = useState(0);
  const [questionVisible, setQuestionVisible] = useState(false); // Control pentru întrebarea finală
  const [noButtonPosition, setNoButtonPosition] = useState({ top: '120%', left: '30%' }); // Poziția butonului "Nu"
  const [showGif, setShowGif] = useState(false); // Control pentru a afișa GIF-ul

  const handleFirstButtonClick = () => {
    setFirstImageVisible(true);
    setFirstButtonVisible(false);
  };

  const handleSecondButtonClick = () => {
    setFirstImageVisible(false);
    setSecondImageVisible(true);
    setThirdButtonVisible(true);
  };

  const handleThirdButtonClick = () => {
    setThirdButtonVisible(false);
    setSecondImageVisible(false);
    setEggVisible(true); 
  };

  const handleEggClick = () => {
    setEggStage(prevStage => {
      const newStage = prevStage + 1;
      if (newStage === 5) {
        setEggVisible(false);
        setQuestionVisible(true); // Arată întrebarea când pisica apare
        return prevStage;
      }
      return newStage;
    });
  };

  const getEggImage = () => {
    switch (eggStage) {
      case 0:
        return egg1;
      case 1:
        return egg2;
      case 2:
        return egg3;
      case 3:
        return crackedEgg;
      case 4:
        return egg5;
      default:
        return egg1;
    }
  };

  const handleYesClick = () => {
    setShowGif(true); // Afișează GIF-ul când apasă "Da"
    setQuestionVisible(false); // Ascunde întrebarea
  };

  const handleNoClick = () => {
    // Mută butonul "Nu" într-o locație random
    const randomTop = `${Math.floor(Math.random() * 80 + 10)}%`;
    const randomLeft = `${Math.floor(Math.random() * 80 + 10)}%`;
    setNoButtonPosition({ top: randomTop, left: randomLeft });
  };

  return (
    <div className="container">
      {firstButtonVisible && (
        <button className="button-start" onClick={handleFirstButtonClick}>
          Do you want to continue?
        </button>
      )}

      {firstImageVisible && (
        <>
          <button className="button" onClick={handleSecondButtonClick}>
            Yes
          </button>
          <button className="button" onClick={handleSecondButtonClick}>
            Sure
          </button>
        </>
      )}

      {thirdButtonVisible && (
        <button className="button" onClick={handleThirdButtonClick}>
          Start
        </button>
      )}

      {/* Prima imagine */}
      <motion.div
        className="image-container"
        initial={{ x: '100%' }}
        animate={{ x: firstImageVisible ? '0%' : '100%' }}
        transition={{ duration: 0.8 }}
      >
        <img src={cat} alt="Prima imagine" className="cat-image" />
        {firstImageVisible && (
          <motion.div
            className="speech-bubble"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: '0%' }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.8 }}
          >
            Do you really want to continue?
          </motion.div>
        )}
      </motion.div>

      {/* A doua imagine */}
      <motion.div
        className="second-image-container"
        initial={{ y: '100%' }}
        animate={{ y: secondImageVisible ? '10%' : '100%' }}
        transition={{ duration: 0.8 }}
      >
        <img src={secondCat} alt="A doua imagine" className="second-cat-image" />
        {secondImageVisible && (
          <motion.div
            className="speech-bubble"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: '0%' }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.8 }}
          >
            Chiar vrei? 🥹
          </motion.div>
        )}
      </motion.div>

      {/* Oul care se sparge */}
      {eggVisible && (
        <motion.div
          className="egg-container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          onClick={handleEggClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
              <motion.h2
      className="question-style-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }} // Întârziere de 0.3 secunde
    >
      Crack the egg by spamming it!
    </motion.h2>
          <img src={getEggImage()} alt="Oul care se sparge" className="egg-image" />
        </motion.div>
      )}

      {/* Întrebarea finală și butoanele */}
      {eggStage === 4 && questionVisible && ( // Afișăm butoanele odată cu pisica finală
        <div className="final-question-container" style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2 className="question-style">Would you go out with me?</h2>
          <button className="button-final" onClick={handleYesClick}>
            YES
          </button>
          <button
            className="button-final"
            onClick={handleNoClick}
            style={{ position: 'absolute', ...noButtonPosition }}
          >
            NO :(
          </button>
          <img src={cat_final} alt="GIF final" className="cat-final" />
        </div>
      )}

      {/* GIF-ul final */}
      {showGif && (
        <>
        <motion.div
          className="gif-container"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={dateGif} alt="GIF final" className="final-gif" />
        </motion.div>
        </>
      )}
    </div>
  );
};

export default FirstCat;
