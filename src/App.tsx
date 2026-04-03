import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Categories from './components/Categories'
import QuestionScreen from './components/QuestionScreen'
import MyQuestions from './components/MyQuestions'

export interface CustomQuestion {
  id: number;
  text: string;
}

type ScreenType = 'welcome' | 'categories' | 'questions' | 'myQuestions';

function App() {
  const [screen, setScreen] = useState<ScreenType>('welcome')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>(() => {
    const saved = localStorage.getItem('customQuestions')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('customQuestions', JSON.stringify(customQuestions))
  }, [customQuestions])

  const saveCustomQuestions = (questions: CustomQuestion[]) => {
    setCustomQuestions(questions)
    localStorage.setItem('customQuestions', JSON.stringify(questions))
  }

  const addCustomQuestion = (question: string) => {
    const newQuestions = [...customQuestions, { id: Date.now(), text: question }]
    saveCustomQuestions(newQuestions)
  }

  const deleteCustomQuestion = (id: number) => {
    const newQuestions = customQuestions.filter(q => q.id !== id)
    saveCustomQuestions(newQuestions)
  }

  return (
    <div className="app">
      {screen === 'welcome' && <Welcome onStart={() => setScreen('categories')} />}
      {screen === 'categories' && (
        <Categories 
          onSelectCategory={(category: string) => {
            setSelectedCategory(category)
            setScreen('questions')
          }}
          onMyQuestions={() => setScreen('myQuestions')}
        />
      )}
      {screen === 'questions' && selectedCategory && (
        <QuestionScreen 
          category={selectedCategory}
          onBack={() => {
            setSelectedCategory(null)
            setScreen('categories')
          }}
          customQuestions={selectedCategory === 'اسئلتي' ? customQuestions : []}
        />
      )}
      {screen === 'myQuestions' && (
        <MyQuestions
          questions={customQuestions}
          onAdd={addCustomQuestion}
          onDelete={deleteCustomQuestion}
          onBack={() => setScreen('categories')}
        />
      )}
    </div>
  )
}

export default App