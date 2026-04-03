import React, { useState, useEffect, useCallback, useReducer } from 'react'
import { CustomQuestion } from '../App'

interface QuestionScreenProps {
  category: string
  onBack: () => void
  customQuestions: CustomQuestion[]
}

const questionsData: Record<string, string[]> = {
  'اعرفيني أكثر': [
    "لو قدرتِ تعيشي في أي لحظة من حياتك تاني مرة، أي لحظة تختاري؟",
    "أي ثلاثة كتب غيرت طريقة تفكيرك؟",
    "إيه الصفة في نفسك اللي تتمني إن الناس تلاحظها أكثر؟",
    "لو كان عندك يوم كامل لنفسك فقط، إيه اللي هتسويه؟",
    "إيه الحلم اللي كنتِ تحلميه وأنتِ صغيرة ولسه في قلبك لحد دلوقتي؟",
    "مين الشخص اللي أثر في حياتك بشكل كبير بدون ما يحس؟",
    "إيه الموقف اللي ضحكتي فيه لدرجة الدموع مؤخراً؟",
    "لو كان عندك موهبة واحدة تتمني تتقنيها، إيه هتكون؟",
    "إيه أكتر مكان بتحسي فيه بالسلام والراحة؟",
    "لو سمحتي لنفسك تبكي على شيء، إيه هيكون؟",
    "إيه الحاجة اللي بتعمليها لما تكوني وحيدة وبتخليكِ سعيدة؟",
    "لو حصلتي على جائزة عن شيء عملتيه، إيه هيكون؟",
    "إيه الصفات اللي بتحبيها في نفسك وأمنيتك الناس تشوفها؟",
    "لو رجع بيكي الزمن، إيه النصيحة اللي هتقدميها لنفسك الصغيرة؟",
    "إيه الشيء اللي بتعمليه وحاسه إنه يعبر عنكِ فعلًا؟",
    "لو كتبتي كتاب عن حياتك، إيه هيكون عنوانه؟",
    "إيه أكتر ذكرى بتخلي قلبك ينبض بالحنين؟",
    "لو تكوني بطلة فيلم، إيه اللي هيكون دورك؟",
    "إيه الحاجة اللي بتعمليها وتنسي الدنيا كلها؟",
    "لو تختاري أغنية تعبر عن شخصيتك، إيه هتكون؟"
  ],
  'أحاسيس وعواطف': [
    "إيه اللي بيخليكِ تحسي إن حد قريب منك فعلاً؟",
    "متى شعرتِ بفخر حقيقي بنفسك آخر مرة؟",
    "إيه اللي بيزعلك بدون ما تعرفي تفسيره؟",
    "إيه الحاجة اللي بتخليكي تبكي من الفرح؟",
    "مين الشخص اللي بتحسي إنه بيفهمك بدون كلام؟",
    "إيه اللي بيخليكي تحسي بالأمان؟",
    "آخر مرة حسيتي فيها إن الدنيا جميلة، إيه اللي كان؟",
    "إيه اللي بتعمليه عشان تفرحي نفسك لما تكوني زعلانة؟",
    "إيه الحاجة اللي محدش يعرفها عنك وبتخليكي إنتي؟",
    "لو كان في مشاعر مجسمة، إيه شكل حزنك؟ إيه شكل فرحك؟",
    "إيه الموقف اللي حسيتي فيه إنك مقدرة ومفهومة؟",
    "لو ممكن تشاركي لحظة ضعفك مع شخص، مين هيكون؟",
    "إيه الحاجة اللي بتخليكي تحسي بالامتنان حتى في أصعب الأيام؟",
    "متى شعرتِ إن قلبك اتفتح على شيء جديد؟",
    "إيه اللي بيهديكِ لما بتتوتر؟",
    "لو تكتبي رسالة لنفسك بعد 10 سنين، إيه هتقوليها؟",
    "إيه اللي بيخلي قلبك ينبض بسرعة؟",
    "متى شعرتِ إنك عايشة اللحظة بكل تفاصيلها؟",
    "إيه اللي بيخليكي تحسي إنك مرتاحة لشخص؟",
    "لو تعبري عن شعور الحب بلونين، إيه هيكونوا؟"
  ],
  'أحلام وطموحات': [
    "لو مش هتندمي على حاجة في حياتك، إيه هتعمليها دلوقتي؟",
    "إيه الحلم اللي بتخافين تحلمي بيه؟",
    "لو قدرتي تسافري أي مكان في العالم بلا حدود، فين هتروحي؟",
    "إيه اللي نفسك تتعلميه بس مش لاقية الوقت؟",
    "لو ضامنة النجاح 100%، إيه أول حاجة هتعمليها؟",
    "إيه التغيير اللي نفسك تشوفيه في العالم؟",
    "لو تقابلي نفسك بعد 10 سنين، إيه هتسأليها؟",
    "إيه الحاجة اللي شايفة إنها هدفك الحقيقي في الحياة؟",
    "لو عندك 3 أمنيات تتحققوا، إيه هيكونوا؟",
    "إيه الشغف اللي نفسك تحوليه لحياة مهنية؟",
    "لو تعيشي قصة نجاح أي شخص في العالم، مين هتختاري؟",
    "إيه الحاجة اللي نفسك تقولي عنها 'أنا عملت ده'؟",
    "لو تقابلي إلهامك، إيه اللي هتقوليه؟",
    "إيه الحلم اللي بتشتغلي عليه ببطء في الخفاء؟",
    "لو سمحتي لنفسك تحلمين بدون خوف، إيه هيكون؟",
    "إيه اللي نفسك تغيريه في العالم من حولك؟",
    "لو يكون عندك مشروع خاص، إيه هيكون؟",
    "إيه أكتر حاجة نفسك تحققيه قبل الـ 30؟",
    "لو تختاري مكان تحلمي تعيشي فيه، إيه هيكون؟",
    "إيه الحلم اللي لو تحقق هتكوني أسعد إنسانة؟"
  ],
  'علاقات وحب': [
    "إيه أهم حاجة بتدوري عليها في الشخص اللي جنبك؟",
    "لو توصفي الحب بلون، إيه هيكون؟",
    "إيه أكتر لفتة بتحبيها من شخص قريب ليكي؟",
    "لو تحبي حد، إيه أكتر حاجة بتمني تعمليها معاه؟",
    "إيه اللي بيخلي العلاقة تنجح بالنسبة ليكي؟",
    "لو توصفي الحب اللي تستحقيه، إيه هيكون شكله؟",
    "إيه الصفات اللي بتمنّيها في شريك حياتك؟",
    "إيه أكتر شيء بيخليكي تحسي بالارتباط الحقيقي؟",
    "لو تكتبي قصة حبك المثالية، إيه أول سطر فيها؟",
    "إيه اللي بتعمليه عشان تخلي اللي قدامك يحس إنه مهم؟",
    "لو تتزوجي، إيه اللي تتمني يكون مختلف في زواجك؟",
    "إيه أكتر حاجة بتقدريها في العلاقات؟",
    "لو اللي قدامك زعلان، إيه أول حاجة بتعمليها؟",
    "إيه اللي بيخليكي تحسي بالغيرة الحلوة؟",
    "لو تختاري أغنية تعبر عن مفهومك للحب، إيه هتكون؟",
    "إيه الذكرى اللي بتخليكي تؤمني بالحب؟",
    "لو توصفي شريك أحلامك بثلاث كلمات، إيه هيكونوا؟",
    "إيه أكتر حاجة بتخلي العلاقة تدوم؟",
    "لو توصفي الحب الحقيقي في جملة واحدة، إيه هتقولي؟",
    "إيه اللي يخليكي تقولي 'ده الشخص المناسب'؟"
  ],
  'لحظات صدق': [
    "إيه الحاجة اللي حاسة إن محدش بيفهمها فيكِ زي ما ينفع؟",
    "لو حد يشوف روحك قبل ما يشوف وشك، إيه هيلاحظ؟",
    "إيه الحقيقة اللي صعب تعترفي بيها لنفسك؟",
    "لو تبكي دلوقتي من غير سبب واضح، إيه اللي جواك؟",
    "إيه المرة اللي حسيتي فيها إنك وحيدة حتى وسط الزحمة؟",
    "لو تكتبي سرك على ورقة وترميها للبحر، إيه هيكون؟",
    "إيه اللي نفسك تسمعيه من حد عشان تحسي بالراحة؟",
    "لو تقدري تغفري لنفسك على حاجة، إيه هتكون؟",
    "إيه الحاجة اللي بتعمليها عشان تحبي نفسك أكثر؟",
    "لو ترسمي مشاعرك دلوقتي، إيه الشكل اللي هيطلع؟",
    "إيه الذكرى اللي لسه بتألمك بس بتعلمك؟",
    "لو تسمحي لنفسك تكوني ضعيفة، إيه أول شيء هتعمليه؟",
    "إيه الحاجة اللي نفسك تقوليها لحد ومقدريش؟",
    "لو تعيشي يوم بدون خوف، إيه اللي هيتغير؟",
    "إيه أكتر حاجة نفسك تفهميها في نفسك؟",
    "لو تقدري ترجعي بالزمن وتغيري حاجة، إيه هتكون؟",
    "إيه اللي بيخليكي تحسي إنك مش لوحدك حتى لو كنتي لوحدك؟",
    "لو تسمحي لنفسك تكوني سعيدة بلا سبب، إيه اللي هتحسي بيه؟",
    "إيه الحاجة اللي بتخليكي تفقدي الأمل؟ وإيه اللي بيرجعه؟",
    "لو تقدري تقولي 'أنا آسفة' لنفسك، إيه هتعتذري عنه؟"
  ]
}

interface QuestionState {
  questions: string[]
  currentIndex: number
  usedIndices: number[]
}

type QuestionAction = 
  | { type: 'SET_QUESTIONS'; payload: string[] }
  | { type: 'UPDATE_INDEX'; payload: number; usedIndices: number[] }
  | { type: 'RESET_INDICES' }

function questionReducer(state: QuestionState, action: QuestionAction): QuestionState {
  switch (action.type) {
    case 'SET_QUESTIONS':
      return { questions: action.payload, currentIndex: 0, usedIndices: [] }
    case 'UPDATE_INDEX':
      return { ...state, currentIndex: action.payload, usedIndices: action.usedIndices }
    case 'RESET_INDICES':
      return { ...state, usedIndices: [], currentIndex: 0 }
    default:
      return state
  }
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({ category, onBack, customQuestions }) => {
  const [{ questions, currentIndex, usedIndices }, dispatch] = useReducer(questionReducer, {
    questions: [],
    currentIndex: 0,
    usedIndices: []
  })
  const [showCopySuccess, setShowCopySuccess] = useState<boolean>(false)

  useEffect(() => {
    let allQuestions: string[] = []
    if (category === 'اسئلتي') {
      allQuestions = customQuestions.map(q => q.text)
    } else {
      allQuestions = [...(questionsData[category] || [])]
    }
    dispatch({ type: 'SET_QUESTIONS', payload: allQuestions })
  }, [category, customQuestions])

  const getRandomQuestion = useCallback(() => {
    if (questions.length === 0) return "لا توجد أسئلة"
    
    if (usedIndices.length >= questions.length) {
      dispatch({ type: 'RESET_INDICES' })
      return questions[0]
    }

    const availableIndices = []
    for (let i = 0; i < questions.length; i++) {
      if (!usedIndices.includes(i)) {
        availableIndices.push(i)
      }
    }

    if (availableIndices.length === 0) {
      dispatch({ type: 'RESET_INDICES' })
      return questions[0]
    }

    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
    dispatch({ type: 'UPDATE_INDEX', payload: randomIndex, usedIndices: [...usedIndices, randomIndex] })
    return questions[randomIndex]
  }, [questions, usedIndices])

  const nextQuestion = () => {
    getRandomQuestion()
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setShowCopySuccess(true)
      setTimeout(() => setShowCopySuccess(false), 2000)
    }
  }

  const currentQuestion = questions[currentIndex] || "لا توجد أسئلة في هذه الفئة"

  return (
    <div className="question-container">
      <button className="back-button-small" onClick={onBack}>
        ← رجوع للفئات
      </button>

      <div className="question-counter">
        السؤال {usedIndices.length + 1} من {questions.length}
      </div>

      <div className="question-card">
        <div className="question-icon">💌</div>
        <p className="question-text">{currentQuestion}</p>
        
        <div className="question-actions">
          <button className="action-btn copy-btn" onClick={() => copyToClipboard(currentQuestion)}>
            📋 نسخ السؤال
          </button>
          <button className="action-btn next-btn" onClick={nextQuestion}>
            🎲 سؤال تاني
          </button>
        </div>

        {showCopySuccess && (
          <div className="copy-success">
            ✅ تم نسخ السؤال! أرسله لولاء الآن
          </div>
        )}
      </div>

      <div className="question-tip">
        💡 نصيحة: انسخ السؤال وأرسله كأنه سؤال عادي في المحادثة
      </div>
    </div>
  )
}

export default QuestionScreen