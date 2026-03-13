// frontend/src/components/TaskList.js
import React, { useState, useEffect, useRef } from 'react';
import TaskItem from './TaskItem';
import '../styles/App.css'; 

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  // אנחנו מתחילים מאינדקס 1, כי אינדקס 0 יהיה השכפול של המשימה האחרונה
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const trackRef = useRef(null);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      // אם מחקנו משימה והאינדקס שלנו עכשיו מצביע "באוויר"
      if (currentIndex > tasks.length) {
        setIsTransitioning(false); 
        setCurrentIndex(tasks.length); 
      }
    }
  
  }, [tasks.length]);

  if (!tasks || tasks.length === 0) {
    return <div className="empty-list">No tasks available. Add some!</div>;
  }

  // הטריק לקרוסלה אינסופית: עוטפים את המערך בשכפולים של הקצוות 
  const extendedTasks = [
    tasks[tasks.length - 1], 
    ...tasks, 
    tasks[0]
  ];

  const nextSlide = () => {
    if (isTransitioning) return; // מונע לחיצות כפולות ומהירות מדי
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // הפונקציה הזו רצה אוטומטית ברגע שהאנימציה של התזוזה מסתיימת
  const handleTransitionEnd = () => {
    setIsTransitioning(false); // מכבים את האנימציה כדי שנוכל "לקפוץ" בסתר

    // אם הגענו לשכפול של המשימה הראשונה (בסוף המערך)
    if (currentIndex === extendedTasks.length - 1) {
      setCurrentIndex(1); // קופצים חזרה למשימה הראשונה האמיתית
    }
    // אם הגענו לשכפול של המשימה האחרונה (בתחילת המערך)
    else if (currentIndex === 0) {
      setCurrentIndex(extendedTasks.length - 2); // קופצים חזרה למשימה האחרונה האמיתית
    }
  };

  return (
    <div className="carousel-container">
      <button className="carousel-btn prev" onClick={prevSlide}>
        &#10094;
      </button>

      <div className="carousel-window">
        <div 
          className="carousel-track"
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            // כשהסטייט isTransitioning דלוק יש אנימציה, כשהוא כבוי הקפיצה מיידית
            transition: isTransitioning ? 'transform 0.4s ease-in-out' : 'none'
          }}
        >
          {extendedTasks.map((task, index) => (
            <div className="carousel-slide" key={`${task.id}-${index}`}>
              <TaskItem 
                task={task} 
                onToggle={onToggle} 
                onDelete={onDelete} 
                onEdit={onEdit} 
              />
            </div>
          ))}
        </div>
      </div>

      <button className="carousel-btn next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default TaskList;