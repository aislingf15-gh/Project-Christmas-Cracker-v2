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

  Check,
  Gift,
  Coffee,
  Music,
  ChefHat,
  Wine,
  Mail,
  Cake,
  Gamepad2,
  Phone
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
}

interface ProgressEntry {
  id?: string
  date: string
  stepsCompleted: boolean
  waterGoalMet: boolean
  proteinGoalMet: boolean
  sleepGoalMet: boolean
  readingCompleted: boolean
  supplementsTaken: boolean
  exerciseCompleted: boolean
  adultingTaskDone: boolean
  stepsCount?: number
  waterIntake?: number
  proteinIntake?: number
  sleepHours?: number
  readingMinutes?: number
  exerciseMinutes?: number
  adultingTask?: string
}

interface ApiProgressEntry {
  id: string
  date: string
  stepsCompleted: boolean
  waterGoalMet: boolean
  proteinGoalMet: boolean
  sleepGoalMet: boolean
  readingCompleted: boolean
  supplementsTaken: boolean
  exerciseCompleted: boolean
  adultingTaskDone: boolean
  stepsCount?: number
  waterIntake?: number
  proteinIntake?: number
  sleepHours?: number
  readingMinutes?: number
  exerciseMinutes?: number
  adultingTask?: string
}

interface LeaderboardEntry {
  id: string
  userId: string
  currentStreak: number
  longestStreak: number
  totalDaysTracked: number
  perfectDays: number
  lastUpdated: string
  user: {
    id: string
    name: string
    email: string
  }
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
  },
  {
    quote: "Discipline is the bridge between goals and accomplishment.",
    author: "Jim Rohn",
    affirmation: "I am disciplined and focused on my daily habits."
  },
  {
    quote: "The difference between try and triumph is just a little umph!",
    author: "Marvin Phillips",
    affirmation: "I give my best effort in everything I do."
  },
  {
    quote: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson",
    affirmation: "I stay consistent and persistent in my journey."
  },
  {
    quote: "The only bad workout is the one that didn&apos;t happen.",
    author: "Unknown",
    affirmation: "I show up for myself every single day."
  },
  {
    quote: "Your body can stand almost anything. It's your mind you have to convince.",
    author: "Unknown",
    affirmation: "I am mentally strong and resilient."
  },
  {
    quote: "The pain you feel today will be the strength you feel tomorrow.",
    author: "Arnold Schwarzenegger",
    affirmation: "I grow stronger through every challenge."
  },
  {
    quote: "Make yourself proud.",
    author: "Unknown",
    affirmation: "I am proud of my commitment to self-improvement."
  },
  {
    quote: "Small progress is still progress.",
    author: "Unknown",
    affirmation: "I celebrate every step forward, no matter how small."
  },
  {
    quote: "You are what you do, not what you say you&apos;ll do.",
    author: "Carl Jung",
    affirmation: "I am defined by my actions and consistency."
  },
  {
    quote: "The only person you are destined to become is the person you decide to be.",
    author: "Ralph Waldo Emerson",
    affirmation: "I choose to become the best version of myself."
  },
  {
    quote: "Every day is a new beginning.",
    author: "Unknown",
    affirmation: "I start fresh each day with renewed energy."
  },
  {
    quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb",
    affirmation: "I start my journey now, regardless of the past."
  },
  {
    quote: "You miss 100% of the shots you don't take.",
    author: "Wayne Gretzky",
    affirmation: "I take action and seize opportunities."
  },
  {
    quote: "The mind is everything. What you think you become.",
    author: "Buddha",
    affirmation: "I cultivate positive thoughts and beliefs."
  },
  {
    quote: "Strength does not come from the physical capacity. It comes from an indomitable will.",
    author: "Mahatma Gandhi",
    affirmation: "I have an unbreakable will to succeed."
  },
  {
    quote: "The only way to achieve the impossible is to believe it is possible.",
    author: "Charles Kingsleigh",
    affirmation: "I believe in my ability to achieve anything."
  },
  {
    quote: "Success is walking from failure to failure with no loss of enthusiasm.",
    author: "Winston Churchill",
    affirmation: "I maintain enthusiasm even through setbacks."
  },
  {
    quote: "The greatest glory in living lies not in never falling, but in rising every time we fall.",
    author: "Nelson Mandela",
    affirmation: "I rise stronger after every fall."
  },
  {
    quote: "What you do today can improve all your tomorrows.",
    author: "Ralph Marston",
    affirmation: "I invest in my future through today&apos;s actions."
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0)
  const [user, setUser] = useState<User | null>(null)

  const [progressData, setProgressData] = useState<ProgressEntry[]>([])
  const [showSaveFeedback, setShowSaveFeedback] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    calculateDaysUntilChristmas()
    loadUserFromStorage()
  }, [])

  useEffect(() => {
    if (user) {
      loadProgressFromAPI()
    }
  }, [user]) // eslint-disable-line react-hooks/exhaustive-deps

  const calculateDaysUntilChristmas = () => {
    const today = new Date()
    const christmas = new Date(today.getFullYear(), 11, 25) // December 25th
    
    // If we're after Christmas, use next year's challenge
    if (today > christmas) {
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

  const loadProgressFromAPI = async () => {
    if (!user) return
    
    try {
      setIsLoading(true)
      const response = await fetch(`/api/progress?userId=${user.id}`)
      if (response.ok) {
        const data = await response.json()
        // Transform the data to match our frontend format
        const transformedData = data.map((entry: ApiProgressEntry) => ({
          id: entry.id,
          date: entry.date.split('T')[0], // Convert to YYYY-MM-DD format
          stepsCompleted: entry.stepsCompleted,
          waterGoalMet: entry.waterGoalMet,
          proteinGoalMet: entry.proteinGoalMet,
          sleepGoalMet: entry.sleepGoalMet,
          readingCompleted: entry.readingCompleted,
          supplementsTaken: entry.supplementsTaken,
          exerciseCompleted: entry.exerciseCompleted,
          adultingTaskDone: entry.adultingTaskDone,
          stepsCount: entry.stepsCount,
          waterIntake: entry.waterIntake,
          proteinIntake: entry.proteinIntake,
          sleepHours: entry.sleepHours,
          readingMinutes: entry.readingMinutes,
          exerciseMinutes: entry.exerciseMinutes,
          adultingTask: entry.adultingTask
        }))
        setProgressData(transformedData)
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const saveProgressToAPI = async (progress: ProgressEntry) => {
    if (!user) {
      console.error('No user found when trying to save progress')
      return
    }
    
    try {
      setIsLoading(true)
      console.log('Saving progress for user:', user.id, 'date:', progress.date)
      
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          date: progress.date,
          stepsCompleted: progress.stepsCompleted,
          waterGoalMet: progress.waterGoalMet,
          proteinGoalMet: progress.proteinGoalMet,
          sleepGoalMet: progress.sleepGoalMet,
          readingCompleted: progress.readingCompleted,
          supplementsTaken: progress.supplementsTaken,
          exerciseCompleted: progress.exerciseCompleted,
          adultingTaskDone: progress.adultingTaskDone,
          stepsCount: progress.stepsCount,
          waterIntake: progress.waterIntake,
          proteinIntake: progress.proteinIntake,
          sleepHours: progress.sleepHours,
          readingMinutes: progress.readingMinutes,
          exerciseMinutes: progress.exerciseMinutes,
          adultingTask: progress.adultingTask
        })
      })
      
      console.log('Progress save response status:', response.status)
      
      if (response.ok) {
        const savedProgress = await response.json()
        console.log('Progress saved successfully:', savedProgress.id)
        
        // Reload progress data
        await loadProgressFromAPI()
        
        // Update leaderboard
        if (user) {
          try {
            console.log('Updating leaderboard for user:', user.id)
            const leaderboardResponse = await fetch('/api/leaderboard', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: user.id })
            })
            console.log('Leaderboard update response status:', leaderboardResponse.status)
          } catch (error) {
            console.error('Error updating leaderboard:', error)
          }
        }
        
        setShowSaveFeedback(true)
        setTimeout(() => setShowSaveFeedback(false), 3000)
      } else {
        const errorData = await response.json()
        console.error('Progress save failed:', errorData)
      }
    } catch (error) {
      console.error('Error saving progress:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogin = async (userData: { name: string; email: string }) => {
    try {
      setIsLoading(true)
      console.log('Attempting login with:', { name: userData.name, email: userData.email })
      
      // Try to find existing user first
      let response = await fetch(`/api/users?email=${encodeURIComponent(userData.email)}`)
      console.log('User lookup response status:', response.status)
      
      let user: User
      
      if (response.ok) {
        const existingUser = await response.json()
        console.log('Existing user found:', existingUser ? 'yes' : 'no')
        if (existingUser) {
          user = existingUser
        } else {
          // Create new user
          console.log('Creating new user...')
          response = await fetch('/api/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
          })
          console.log('User creation response status:', response.status)
          user = await response.json()
        }
      } else {
        // Create new user
        console.log('User lookup failed, creating new user...')
        response = await fetch('/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        })
        console.log('User creation response status:', response.status)
        user = await response.json()
      }
      
      console.log('Login successful, user ID:', user.id)
      setUser(user)
      localStorage.setItem('christmas-cracker-user', JSON.stringify(user))
    } catch (error) {
      console.error('Error during login:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    setUser(null)
    setProgressData([])
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
    return <LoginScreen onLogin={handleLogin} isLoading={isLoading} />
  }

  const dailyQuote = getDailyQuote()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
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
                <h1 className="text-3xl font-light text-gray-900 mb-1">
                  Project Christmas Cracker
                </h1>
                <p className="text-gray-600 text-sm mb-1">
                  Welcome back {user.name}!
                </p>
                <p className="text-green-800 text-sm font-medium">
                  Look & Feel Like a Cracker by Christmas!
                </p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-full shadow-sm">
                <Clock className="w-5 h-5 text-gray-700" />
                <span className="text-xl font-light text-gray-900">{daysUntilChristmas}</span>
                <span className="text-gray-700 text-sm font-medium">days until Christmas</span>
              </div>
              
              <div className="relative group">
                <button className="flex items-center gap-2 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                  <User className="w-6 h-6 text-gray-600" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
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
      <div className="bg-white py-6">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center flex justify-center gap-6">
            <div className="bg-white px-8 py-6 rounded-xl border border-gray-200 shadow-lg w-96">
              <p className="text-lg font-medium text-gray-900 mb-3">Today&apos;s Quote</p>
              <p className="text-base text-gray-700 italic mb-3">&ldquo;{dailyQuote.quote}&rdquo;</p>
              <p className="text-sm text-gray-500">— {dailyQuote.author}</p>
            </div>
            <div className="bg-white px-8 py-6 rounded-xl border border-gray-200 shadow-lg w-96">
              <p className="text-lg font-medium text-gray-900 mb-3">Today&apos;s Affirmation</p>
              <p className="text-base text-gray-700">{dailyQuote.affirmation}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-center space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-8 py-4 text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id 
                      ? 'text-gray-900 border-b-2 border-gray-900 bg-gray-50' 
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
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

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tracker' && <TrackerTab progressData={progressData} onSaveProgress={saveProgressToAPI} />}
        {activeTab === 'progress' && <ProgressTab progressData={progressData} user={user} />}
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
function LoginScreen({ 
  onLogin, 
  isLoading 
}: { 
  onLogin: (userData: { name: string; email: string }) => Promise<void>
  isLoading: boolean 
}) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      await onLogin({
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
                disabled={isLoading}
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
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium transition-colors hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              disabled={isLoading}
            >
              {isSignUp ? 'Already have an account? Sign in' : 'Need an account? Sign up'}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Your data is securely stored in the cloud
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
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
                <div className={`flex justify-center mb-6 ${req.color}`}>
                  <Icon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 text-center">{req.title}</h3>
                <p className="text-gray-600 text-sm text-center leading-relaxed">{req.detail}</p>
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
            <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <h3 className="text-xl font-medium text-gray-900 mb-6">{category.title}</h3>
              <ul className="space-y-4">
                {category.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-4 text-gray-700">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
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
  onSaveProgress: (progress: ProgressEntry) => Promise<void> 
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

  // Check if it's Christmas Eve or Christmas Day
  const isChristmasEve = selectedDate.endsWith('-12-24')
  const isChristmasDay = selectedDate.endsWith('-12-25')
  
  // Check if it's the last day of the week (Sunday)
  const selectedDateObj = new Date(selectedDate)
  const isLastDayOfWeek = selectedDateObj.getDay() === 0 // Sunday

  const getChecklistItems = () => {
    if (isChristmasEve) {
      return [
        { id: 'steps', label: 'Enjoy family time', icon: Heart, color: 'text-red-600' },
        { id: 'water', label: 'Wrap presents', icon: Gift, color: 'text-green-600' },
        { id: 'protein', label: 'Watch Christmas movies', icon: Star, color: 'text-yellow-600' },
        { id: 'sleep', label: 'Set out cookies for Santa', icon: Cake, color: 'text-brown-600' },
        { id: 'reading', label: 'Read Christmas stories', icon: BookOpen, color: 'text-green-700' },
        { id: 'supplements', label: 'Drink hot chocolate', icon: Coffee, color: 'text-brown-500' },
        { id: 'exercise', label: 'Dance to Christmas music', icon: Music, color: 'text-purple-600' },
        { id: 'adulting', label: 'Prepare Christmas dinner', icon: ChefHat, color: 'text-red-700' }
      ]
    } else if (isChristmasDay) {
      return [
        { id: 'steps', label: 'Open presents with family', icon: Gift, color: 'text-red-600' },
        { id: 'water', label: 'Drink a litre of mulled wine', icon: Wine, color: 'text-purple-600' },
        { id: 'protein', label: 'Enjoy Christmas dinner', icon: ChefHat, color: 'text-green-600' },
        { id: 'sleep', label: 'Take Christmas nap', icon: Activity, color: 'text-indigo-600' },
        { id: 'reading', label: 'Read Christmas cards', icon: Mail, color: 'text-blue-600' },
        { id: 'supplements', label: 'Eat Christmas pudding', icon: Cake, color: 'text-brown-600' },
        { id: 'exercise', label: 'Play Christmas games', icon: Gamepad2, color: 'text-green-700' },
        { id: 'adulting', label: 'Call distant family', icon: Phone, color: 'text-red-700' }
      ]
    } else {
      const regularItems = [
        { id: 'steps', label: 'Completed 8,000+ steps', icon: Zap, color: 'text-green-600' },
        { id: 'water', label: 'Hit water intake goal', icon: Droplets, color: 'text-blue-600' },
        { id: 'protein', label: 'Met protein target', icon: Heart, color: 'text-red-500' },
        { id: 'sleep', label: 'Got 7-8 hours sleep', icon: Activity, color: 'text-indigo-600' },
        { id: 'reading', label: 'Read for 10 minutes', icon: BookOpen, color: 'text-green-700' },
        { id: 'supplements', label: 'Took supplements', icon: Pill, color: 'text-purple-600' },
        { id: 'exercise', label: 'Completed workout (if scheduled)', icon: Dumbbell, color: 'text-red-600' }
      ]
      
      // Only show adulting task on the last day of the week
      if (isLastDayOfWeek) {
        regularItems.push({ id: 'adulting', label: 'Did an adulting task', icon: CheckSquare, color: 'text-red-700' })
      }
      
      return regularItems
    }
  }

  const checklistItems = getChecklistItems()

  // Load existing progress for selected date
  useEffect(() => {
    const existingEntry = progressData.find(entry => entry.date === selectedDate)
    if (existingEntry) {
      setChecklist({
        steps: existingEntry.stepsCompleted,
        water: existingEntry.waterGoalMet,
        protein: existingEntry.proteinGoalMet,
        sleep: existingEntry.sleepGoalMet,
        reading: existingEntry.readingCompleted,
        supplements: existingEntry.supplementsTaken,
        exercise: existingEntry.exerciseCompleted,
        adulting: existingEntry.adultingTaskDone
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

  const handleSaveProgress = async () => {
    const newEntry: ProgressEntry = {
      date: selectedDate,
      stepsCompleted: checklist.steps,
      waterGoalMet: checklist.water,
      proteinGoalMet: checklist.protein,
      sleepGoalMet: checklist.sleep,
      readingCompleted: checklist.reading,
      supplementsTaken: checklist.supplements,
      exerciseCompleted: checklist.exercise,
      adultingTaskDone: checklist.adulting
    }

    await onSaveProgress(newEntry)
  }

  const completedCount = Object.values(checklist).filter(Boolean).length
  const completionRate = Math.round((completedCount / checklistItems.length) * 100)

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-lg border border-gray-200">
        <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">
          Today&apos;s Progress
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
                  className={`w-5 h-5 bg-white border-2 rounded focus:ring-2 mr-4 ${
                    checklist[item.id as keyof typeof checklist]
                      ? 'text-green-800 border-green-800 focus:ring-green-800'
                      : 'text-gray-900 border-gray-300 focus:ring-gray-500'
                  }`}
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
function ProgressTab({ progressData, user }: { progressData: ProgressEntry[], user: User | null }) {
  const [showShareFeedback, setShowShareFeedback] = useState(false)
  const [isSharing, setIsSharing] = useState(false)

  const calculateStats = () => {
    const totalDays = progressData.length
    const perfectDays = progressData.filter(entry => 
      entry.stepsCompleted && entry.waterGoalMet && entry.proteinGoalMet && entry.sleepGoalMet && 
      entry.readingCompleted && entry.supplementsTaken && entry.exerciseCompleted
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

  const handleShareProgress = async () => {
    if (!user) {
      console.log('No user found')
      return
    }
    
    try {
      setIsSharing(true)
      console.log('Sharing progress for user:', user.id)
      
      // Update the leaderboard with current progress
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id })
      })
      
      console.log('Share response:', response.status)
      
      if (response.ok) {
        const result = await response.json()
        console.log('Share result:', result)
        setShowShareFeedback(true)
        setTimeout(() => setShowShareFeedback(false), 3000)
      } else {
        console.error('Share failed:', response.status)
      }
    } catch (error) {
      console.error('Error sharing progress:', error)
    } finally {
      setIsSharing(false)
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
          <button 
            onClick={handleShareProgress}
            disabled={isSharing || progressData.length === 0}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSharing ? 'Sharing...' : 'Share Progress'}
          </button>
        </div>
      </div>

      {/* Share Feedback */}
      {showShareFeedback && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span>Progress shared to community leaderboard!</span>
        </div>
      )}
    </div>
  )
}

// Community Tab Component
function CommunityTab() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    loadLeaderboard()
  }, [])

  // Refresh leaderboard every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadLeaderboard()
    }, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const loadLeaderboard = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/leaderboard')
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
      }
    } catch (error) {
      console.error('Error loading leaderboard:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-light text-gray-900">
          Community Leaderboard
        </h2>
        <button 
          onClick={loadLeaderboard}
          disabled={isLoading}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {isLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading leaderboard...</p>
        </div>
      ) : leaderboard.length > 0 ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{leaderboard.length}</div>
              <div className="text-sm text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.max(...leaderboard.map(entry => entry.currentStreak))}
              </div>
              <div className="text-sm text-gray-600">Best Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...leaderboard.map(entry => entry.longestStreak))}
              </div>
              <div className="text-sm text-gray-600">Longest Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {leaderboard.reduce((sum, entry) => sum + entry.perfectDays, 0)}
              </div>
              <div className="text-sm text-gray-600">Perfect Days</div>
            </div>
          </div>
          
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{entry.user.name}</p>
                    <p className="text-sm text-gray-600">{entry.totalDaysTracked} days tracked</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{entry.currentStreak}</p>
                      <p className="text-xs text-gray-600">Current</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{entry.longestStreak}</p>
                      <p className="text-xs text-gray-600">Longest</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-purple-600">{entry.perfectDays}</p>
                      <p className="text-xs text-gray-600">Perfect</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600">
          <Users className="w-10 h-10 text-gray-400 mx-auto mb-4 stroke-[1.5]" />
          <p className="text-lg mb-2">No users on the leaderboard yet</p>
          <p className="text-sm">Start tracking to see your progress!</p>
        </div>
      )}
    </div>
  )
}
