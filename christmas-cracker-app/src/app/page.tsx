'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  CheckCircle, 
  Users, 
  Award,
  Heart,
  Star,
  Clock,
  Activity,
  Zap,
  Droplets,
  Dumbbell,
  BookOpen,
  Pill,
  CheckSquare,
  User,
  LogOut,
  Settings,
  Check
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
}

interface ProgressEntry {
  date: string
  steps: boolean
  water: boolean
  protein: boolean
  sleep: boolean
  reading: boolean
  supplements: boolean
  exercise: boolean
  adulting: boolean
}

const dailyQuotes = [
  {
    quote: "The only way to do great work is to love what you do.",
    author: "Steve Jobs",
    affirmation: "I am capable of achieving great things through consistent effort."
  },
  {
    quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill",
    affirmation: "I embrace challenges as opportunities for growth."
  },
  {
    quote: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt",
    affirmation: "I trust in my ability to create the life I envision."
  },
  {
    quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    author: "Zig Ziglar",
    affirmation: "I am becoming stronger and wiser with each step forward."
  },
  {
    quote: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    affirmation: "I release doubt and embrace possibility."
  },
  {
    quote: "It always seems impossible until it's done.",
    author: "Nelson Mandela",
    affirmation: "I have the power to make the impossible possible."
  },
  {
    quote: "The journey of a thousand miles begins with one step.",
    author: "Lao Tzu",
    affirmation: "I celebrate every small step toward my goals."
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0)
  const [user, setUser] = useState<User | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [progressData, setProgressData] = useState<ProgressEntry[]>([])
  const [showSaveFeedback, setShowSaveFeedback] = useState(false)

  useEffect(() => {
    calculateDaysUntilChristmas()
    loadUserFromStorage()
    loadProgressFromStorage()
  }, [])

  const calculateDaysUntilChristmas = () => {
    const today = new Date()
    const challengeStart = new Date(today.getFullYear(), 8, 1) // September 1st (month is 0-indexed)
    const christmas = new Date(today.getFullYear(), 11, 25) // December 25th
    
    // If we're before September 1st, use next year's challenge
    if (today < challengeStart) {
      challengeStart.setFullYear(challengeStart.getFullYear() - 1)
      christmas.setFullYear(christmas.getFullYear() - 1)
    }
    
    // If we're after Christmas, use next year's challenge
    if (today > christmas) {
      challengeStart.setFullYear(challengeStart.getFullYear() + 1)
      christmas.setFullYear(christmas.getFullYear() + 1)
    }
    
    const timeDiff = christmas.getTime() - today.getTime()
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    setDaysUntilChristmas(days)
  }

  const loadUserFromStorage = () => {
    const savedUser = localStorage.getItem('christmas-cracker-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }

  const loadProgressFromStorage = () => {
    const savedProgress = localStorage.getItem('christmas-cracker-progress')
    if (savedProgress) {
      setProgressData(JSON.parse(savedProgress))
    }
  }

  const saveProgressToStorage = (progress: ProgressEntry[]) => {
    localStorage.setItem('christmas-cracker-progress', JSON.stringify(progress))
    setProgressData(progress)
    
    // Show save feedback
    setShowSaveFeedback(true)
    setTimeout(() => setShowSaveFeedback(false), 3000)
  }

  const handleLogin = (userData: User) => {
    setUser(userData)
    localStorage.setItem('christmas-cracker-user', JSON.stringify(userData))
    setIsLoginModalOpen(false)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('christmas-cracker-user')
  }

  const getDailyQuote = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    return dailyQuotes[dayOfYear % dailyQuotes.length]
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'tracker', label: 'Daily Tracker', icon: CheckCircle },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'community', label: 'Community', icon: Users },
  ]

  if (!user) {
    return <LoginScreen onLogin={handleLogin} />
  }

  const dailyQuote = getDailyQuote()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Christmas Cracker Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              
              <div>
                <h1 className="text-2xl font-light text-gray-900 mb-1">
                  Project Christmas Cracker
                </h1>
                <p className="text-gray-600 text-sm mb-1">
                  Welcome back {user.name}!
                </p>
                <p className="text-green-800 text-sm">
                  Look & Feel Like a Cracker by Christmas!
                </p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-lg font-light text-gray-900">{daysUntilChristmas}</span>
                <span className="text-gray-600 text-sm">days</span>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="w-5 h-5 text-gray-600" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Daily Quote */}
      <div className="bg-gradient-to-r from-green-50 via-red-50 to-green-50 py-6 relative overflow-hidden">
        {/* Traditional Tartan Pattern Background */}
        <div className="absolute inset-0 opacity-8">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, #dc2626 0px, #dc2626 2px, transparent 2px, transparent 8px),
              linear-gradient(0deg, #dc2626 0px, #dc2626 2px, transparent 2px, transparent 8px),
              linear-gradient(90deg, #166534 0px, #166534 1px, transparent 1px, transparent 4px),
              linear-gradient(0deg, #166534 0px, #166534 1px, transparent 1px, transparent 4px),
              linear-gradient(90deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 16px),
              linear-gradient(0deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 16px)
            `,
            backgroundSize: '16px 16px',
            backgroundPosition: '0 0'
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center">
            <p className="text-lg italic text-gray-700 mb-2">"{dailyQuote.quote}"</p>
            <p className="text-sm text-gray-600 mb-3">— {dailyQuote.author}</p>
            <div className="inline-block bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
              <p className="text-sm font-medium text-gray-900">Today's Affirmation</p>
              <p className="text-sm text-gray-600">{dailyQuote.affirmation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 relative overflow-hidden">
        {/* Traditional Tartan Border */}
        <div className="absolute bottom-0 left-0 right-0 h-2 opacity-25">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(90deg, #dc2626 0px, #dc2626 1px, transparent 1px, transparent 4px),
              linear-gradient(0deg, #dc2626 0px, #dc2626 1px, transparent 1px, transparent 4px),
              linear-gradient(90deg, #166534 0px, #166534 1px, transparent 1px, transparent 8px),
              linear-gradient(0deg, #166534 0px, #166534 1px, transparent 1px, transparent 8px)
            `,
            backgroundSize: '8px 8px',
            backgroundPosition: '0 0'
          }}></div>
        </div>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id 
                      ? 'text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Save Feedback */}
      {showSaveFeedback && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Progress saved successfully!</span>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tracker' && <TrackerTab progressData={progressData} onSaveProgress={saveProgressToStorage} />}
        {activeTab === 'progress' && <ProgressTab progressData={progressData} />}
        {activeTab === 'community' && <CommunityTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Christmas Cracker
          </p>
        </div>
      </footer>
    </div>
  )
}

// Login Screen Component
function LoginScreen({ onLogin }: { onLogin: (user: User) => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      onLogin({
        id: Date.now().toString(),
        name: name.trim(),
        email: email.trim()
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 rounded-lg border border-gray-200">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20">
                <Image
                  src="/logo.png"
                  alt="Christmas Cracker Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-3xl font-light text-gray-900 mb-2">
              Project Christmas Cracker
            </h1>
            <p className="text-gray-600 mb-2">
              {isSignUp ? 'Create your account' : 'Sign in to continue'}
            </p>
            <p className="text-green-800 text-sm">
              Look & Feel Like a Cracker by Christmas!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium transition-colors hover:bg-gray-800"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Your data is stored locally on your device
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Overview Tab Component
function OverviewTab() {
  const requirements = [
    {
      icon: Zap,
      title: 'Daily Steps',
      detail: '8,000 - 12,000 steps',
      color: 'text-green-600'
    },
    {
      icon: Dumbbell,
      title: 'Exercise',
      detail: '3x weekly sessions',
      color: 'text-red-600'
    },
    {
      icon: Droplets,
      title: 'Hydration',
      detail: 'Daily water goal',
      color: 'text-blue-600'
    },
    {
      icon: Heart,
      title: 'Protein',
      detail: 'Meet protein target',
      color: 'text-red-500'
    },
    {
      icon: Activity,
      title: 'Sleep',
      detail: '7-8 hours quality rest',
      color: 'text-indigo-600'
    },
    {
      icon: BookOpen,
      title: 'Reading',
      detail: '10 minutes daily',
      color: 'text-green-700'
    },
    {
      icon: Pill,
      title: 'Supplements',
      detail: 'Daily vitamins',
      color: 'text-purple-600'
    },
    {
      icon: CheckSquare,
      title: 'Adulting Task',
      detail: '1 weekly task',
      color: 'text-red-700'
    }
  ]

  const taskCategories = [
    {
      title: 'Connection & Communication',
      tasks: [
        'Check in with a friend you haven\'t spoken to',
        'Send a voice note instead of texting',
        'Schedule a coffee date or video call',
        'Write a proper email to a long-distance friend',
        'Call a family member you keep meaning to ring',
        'Send someone a photo that reminds you of them'
      ]
    },
    {
      title: 'Life Admin',
      tasks: [
        'Clean makeup brushes',
        'Donate unused items',
        'Deep clean one area',
        'Organize phone photos',
        'Cancel unused subscriptions',
        'Book overdue appointments',
        'Sort through paperwork'
      ]
    },
    {
      title: 'Self-Care Maintenance',
      tasks: [
        'Meal prep session',
        'Wardrobe audit',
        'Update CV/LinkedIn',
        'Back up phone/computer',
        'Replace old underwear/socks',
        'Schedule health checkups'
      ]
    }
  ]

  return (
    <div className="space-y-16">
      {/* Challenge Overview */}
      <div>
        <h2 className="text-2xl font-light text-gray-900 mb-8">
          Daily Requirements
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {requirements.map((req, index) => {
            const Icon = req.icon
            return (
              <div key={index} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
                <div className={`flex justify-center mb-4 ${req.color}`}>
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">{req.title}</h3>
                <p className="text-gray-600 text-sm text-center">{req.detail}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Adulting Tasks */}
      <div>
        <h2 className="text-2xl font-light text-gray-900 mb-4">
          Weekly Adulting Tasks
        </h2>
        <p className="text-gray-600 mb-8">
          Complete one task each week from any category
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {taskCategories.map((category, index) => (
            <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-3 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Tracker Tab Component
function TrackerTab({ 
  progressData, 
  onSaveProgress 
}: { 
  progressData: ProgressEntry[]
  onSaveProgress: (progress: ProgressEntry[]) => void 
}) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [checklist, setChecklist] = useState({
    steps: false,
    water: false,
    protein: false,
    sleep: false,
    reading: false,
    supplements: false,
    exercise: false,
    adulting: false
  })

  const checklistItems = [
    { id: 'steps', label: 'Completed 8,000+ steps', icon: Zap, color: 'text-green-600' },
    { id: 'water', label: 'Hit water intake goal', icon: Droplets, color: 'text-blue-600' },
    { id: 'protein', label: 'Met protein target', icon: Heart, color: 'text-red-500' },
    { id: 'sleep', label: 'Got 7-8 hours sleep', icon: Activity, color: 'text-indigo-600' },
    { id: 'reading', label: 'Read for 10 minutes', icon: BookOpen, color: 'text-green-700' },
    { id: 'supplements', label: 'Took supplements', icon: Pill, color: 'text-purple-600' },
    { id: 'exercise', label: 'Completed workout (if scheduled)', icon: Dumbbell, color: 'text-red-600' },
    { id: 'adulting', label: 'Did an adulting task', icon: CheckSquare, color: 'text-red-700' }
  ]

  // Load existing progress for selected date
  useEffect(() => {
    const existingEntry = progressData.find(entry => entry.date === selectedDate)
    if (existingEntry) {
      setChecklist({
        steps: existingEntry.steps,
        water: existingEntry.water,
        protein: existingEntry.protein,
        sleep: existingEntry.sleep,
        reading: existingEntry.reading,
        supplements: existingEntry.supplements,
        exercise: existingEntry.exercise,
        adulting: existingEntry.adulting
      })
    } else {
      setChecklist({
        steps: false,
        water: false,
        protein: false,
        sleep: false,
        reading: false,
        supplements: false,
        exercise: false,
        adulting: false
      })
    }
  }, [selectedDate, progressData])

  const handleCheckboxChange = (id: string) => {
    setChecklist(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  const handleSaveProgress = () => {
    const newEntry: ProgressEntry = {
      date: selectedDate,
      ...checklist
    }

    const updatedProgress = progressData.filter(entry => entry.date !== selectedDate)
    updatedProgress.push(newEntry)
    updatedProgress.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    onSaveProgress(updatedProgress)
  }

  const completedCount = Object.values(checklist).filter(Boolean).length
  const completionRate = Math.round((completedCount / Object.keys(checklist).length) * 100)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
          Today's Progress
        </h2>
        
        {/* Date Selector */}
        <div className="flex justify-center mb-8">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:border-gray-500 focus:outline-none"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Completion</span>
            <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="h-full bg-gray-900 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {checklistItems.map((item) => {
            const Icon = item.icon
            return (
              <div
                key={item.id}
                className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                  checklist[item.id as keyof typeof checklist]
                    ? 'border-gray-300 bg-gray-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  id={item.id}
                  checked={checklist[item.id as keyof typeof checklist]}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="w-5 h-5 text-gray-900 bg-white border-2 border-gray-300 rounded focus:ring-gray-500 focus:ring-2 mr-4"
                />
                <Icon className={`w-4 h-4 mr-3 stroke-[1.5] ${item.color}`} />
                <label
                  htmlFor={item.id}
                  className={`flex-1 cursor-pointer ${
                    checklist[item.id as keyof typeof checklist]
                      ? 'text-gray-500 line-through'
                      : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </label>
              </div>
            )
          })}
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <button 
            onClick={handleSaveProgress}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium transition-colors hover:bg-gray-800"
          >
            Save Progress
          </button>
        </div>
      </div>
    </div>
  )
}

// Progress Tab Component
function ProgressTab({ progressData }: { progressData: ProgressEntry[] }) {
  const calculateStats = () => {
    const totalDays = progressData.length
    const perfectDays = progressData.filter(entry => 
      entry.steps && entry.water && entry.protein && entry.sleep && 
      entry.reading && entry.supplements && entry.exercise && entry.adulting
    ).length
    
    const totalCompletions = progressData.reduce((sum, entry) => {
      return sum + Object.values(entry).filter(Boolean).length - 1 // -1 for date
    }, 0)
    
    const totalPossible = progressData.length * 8
    const completionRate = totalPossible > 0 ? Math.round((totalCompletions / totalPossible) * 100) : 0
    
    // Calculate current streak
    let currentStreak = 0
    const sortedEntries = [...progressData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
    for (const entry of sortedEntries) {
      const hasAnyCompletion = Object.values(entry).some(value => value === true)
      if (hasAnyCompletion) {
        currentStreak++
      } else {
        break
      }
    }

    return {
      daysTracked: totalDays,
      currentStreak,
      completionRate,
      perfectDays
    }
  }

  const stats = calculateStats()
  const statItems = [
    { label: 'Days Tracked', value: stats.daysTracked.toString(), icon: Calendar, color: 'text-gray-600' },
    { label: 'Current Streak', value: stats.currentStreak.toString(), icon: Activity, color: 'text-gray-600' },
    { label: 'Completion Rate', value: `${stats.completionRate}%`, icon: Target, color: 'text-gray-600' },
    { label: 'Perfect Days', value: stats.perfectDays.toString(), icon: Award, color: 'text-gray-600' }
  ]

  return (
    <div className="space-y-12">
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
          Progress Overview
        </h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statItems.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="text-center">
                <div className={`flex justify-center mb-4 ${stat.color}`}>
                  <Icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Recent Activity */}
        {progressData.length > 0 ? (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {progressData.slice(0, 7).map((entry, index) => {
                const completedCount = Object.values(entry).filter(Boolean).length - 1 // -1 for date
                const completionRate = Math.round((completedCount / 8) * 100)
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{new Date(entry.date).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-600">{completedCount}/8 tasks completed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">{completionRate}%</p>
                      <div className="w-20 bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="h-full bg-gray-900 rounded-full" 
                          style={{ width: `${completionRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <TrendingUp className="w-10 h-10 text-gray-400 mx-auto mb-4 stroke-[1.5]" />
            <p className="text-gray-500">Start tracking to see your progress</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
            Import Data
          </button>
        </div>
      </div>
    </div>
  )
}

// Community Tab Component
function CommunityTab() {
  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200">
      <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
        Community
      </h2>
      
      <div className="text-center text-gray-600">
        <Users className="w-10 h-10 text-gray-400 mx-auto mb-4 stroke-[1.5]" />
        <p className="text-lg mb-2">Connect with friends and share your progress</p>
        <p className="text-sm">Community features coming soon</p>
      </div>
    </div>
  )
}
