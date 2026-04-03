import React, { useState } from 'react'
import { CustomQuestion } from '../App'

interface MyQuestionsProps {
  questions: CustomQuestion[]
  onAdd: (question: string) => void
  onDelete: (id: number) => void
  onBack: () => void
}

const MyQuestions: React.FC<MyQuestionsProps> = ({ questions, onAdd, onDelete, onBack }) => {
  const [newQuestion, setNewQuestion] = useState<string>('')
  const [showAddForm, setShowAddForm] = useState<boolean>(false)

  const handleAdd = () => {
    if (newQuestion.trim()) {
      onAdd(newQuestion.trim())
      setNewQuestion('')
      setShowAddForm(false)
    }
  }

  const copyQuestionToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      alert('✅ تم نسخ السؤال!')
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      alert('✅ تم نسخ السؤال!')
    }
  }

  return (
    <div className="my-questions-container">
      <button className="back-button-small" onClick={onBack}>
        ← رجوع للفئات
      </button>

      <h2 className="my-questions-title">📝 أسئلتي الخاصة</h2>
      <p className="my-questions-subtitle">
        هنا تقدر تكتب أسئلة أنت عايز تسألها لولاء - أسئلة من قلبك
      </p>

      {!showAddForm ? (
        <button className="add-question-btn" onClick={() => setShowAddForm(true)}>
          + أضف سؤال جديد
        </button>
      ) : (
        <div className="add-question-form">
          <textarea
            className="question-input"
            placeholder="اكتب سؤالك هنا... مثال: إيه اللي يخلي يومك حلو حتى لو كان صعب؟"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={3}
          />
          <div className="form-actions">
            <button className="save-btn" onClick={handleAdd}>حفظ السؤال</button>
            <button className="cancel-btn" onClick={() => {
              setShowAddForm(false)
              setNewQuestion('')
            }}>إلغاء</button>
          </div>
        </div>
      )}

      {questions.length === 0 ? (
        <div className="empty-questions">
          <p>✨ مافيش أسئلة مخصصة لسه ✨</p>
          <p>أضف أول سؤال من قلبك لولاء ✨</p>
        </div>
      ) : (
        <div className="questions-list">
          {questions.map((q, idx) => (
            <div key={q.id} className="question-item">
              <div className="question-number">{idx + 1}</div>
              <p className="question-item-text">{q.text}</p>
              <button 
                className="delete-question-btn"
                onClick={() => onDelete(q.id)}
                aria-label="حذف السؤال"
                title="حذف السؤال"
              >
                🗑️
              </button>
              <button 
                className="delete-question-btn"
                onClick={() => copyQuestionToClipboard(q.text)}
                aria-label="نسخ السؤال"
                title="نسخ السؤال"
              >
                📋
              </button>
            </div>
          ))}
        </div>
      )}

      {questions.length > 0 && (
        <div className="play-custom-questions">
          <button 
            className="play-custom-btn"
            onClick={() => {
              window.location.hash = 'custom'
              onBack()
            }}
          >
            🎮 العب بهذه الأسئلة
          </button>
          <p className="play-hint">(اسأل ولاء أسئلتك الخاصة!)</p>
        </div>
      )}
    </div>
  )
}

export default MyQuestions