import React from 'react'

interface WelcomeProps {
  onStart: () => void
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="welcome-container">
      <div className="heart-decoration">💕</div>
      <h1 className="welcome-title">لعبة القلوب</h1>
      <p className="welcome-subtitle">أسئلة تفتح القلوب وتقرب المسافات</p>
      
      <div className="welcome-description">
        <p>✨ اكتشفوا معاً أعماق المشاعر والأحلام ✨</p>
        <p>🎀 أسئلة ذكية تبني جسوراً من الصدق 🎀</p>
        <p>💭 كل سؤال حكاية.. وكل إجابة قرب 💭</p>
      </div>

      <button className="start-button" onClick={onStart}>
        <span>ابدأ الرحلة</span>
        <span className="button-heart">💖</span>
      </button>

      <div className="floating-hearts">
        <span>💗</span>
        <span>💓</span>
        <span>💕</span>
        <span>💖</span>
        <span>💝</span>
      </div>
    </div>
  )
}

export default Welcome