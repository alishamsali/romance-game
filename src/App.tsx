import { useState, useEffect } from 'react'
import './App.css'
import Welcome from './components/Welcome'
import Categories from './components/Categories'
import QuestionScreen from './components/QuestionScreen'
import MyQuestions from './components/MyQuestions'
import { ThemeProvider, useTheme } from './ThemeContext'

export interface CustomQuestion {
  id: number;
  text: string;
}

type ScreenType = 'welcome' | 'categories' | 'questions' | 'myQuestions';

function AppContent() {
  const [screen, setScreen] = useState<ScreenType>('welcome')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [customQuestions, setCustomQuestions] = useState<CustomQuestion[]>(() => {
    const saved = localStorage.getItem('customQuestions')
    return saved ? JSON.parse(saved) : []
  })
  const { toggleTheme, theme } = useTheme()

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
      <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
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

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App