import React from 'react'

interface Category {
  id: string
  name: string
  icon: string
  description: string
}

const categories: Category[] = [
  { id: 'know', name: 'اعرفيني أكثر', icon: '🌟', description: 'اكتشف شخصيتها وقيمها' },
  { id: 'feelings', name: 'أحاسيس وعواطف', icon: '💗', description: 'افتح باب المشاعر' },
  { id: 'dreams', name: 'أحلام وطموحات', icon: '✨', description: 'مستقبلها وأحلامها' },
  { id: 'love', name: 'علاقات وحب', icon: '💕', description: 'تصورها عن الحب' },
  { id: 'honest', name: 'لحظات صدق', icon: '🎀', description: 'اتصال عاطفي حقيقي' }
]

interface CategoriesProps {
  onSelectCategory: (category: string) => void
  onMyQuestions: () => void
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory, onMyQuestions }) => {
  return (
    <div className="categories-container">
      <button className="back-button" onClick={onMyQuestions}>
        <span>📝</span> أسئلتي الخاصة
      </button>
      
      <h2 className="categories-title">اختار الفئة المناسبة</h2>
      
      <div className="categories-grid">
        {categories.map(cat => (
          <button 
            key={cat.id}
            className="category-card"
            onClick={() => onSelectCategory(cat.name)}
          >
            <div className="category-icon">{cat.icon}</div>
            <h3 className="category-name">{cat.name}</h3>
            <p className="category-desc">{cat.description}</p>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Categories