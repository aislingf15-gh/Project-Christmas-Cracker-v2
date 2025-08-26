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
  Activity
} from 'lucide-react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')
  const [daysUntilChristmas, setDaysUntilChristmas] = useState(0)

  useEffect(() => {
    calculateDaysUntilChristmas()
  }, [])

  const calculateDaysUntilChristmas = () => {
    const today = new Date()
    const christmas = new Date(today.getFullYear(), 11, 25)
    
    if (today > christmas) {
      christmas.setFullYear(christmas.getFullYear() + 1)
    }
    
    const timeDiff = christmas.getTime() - today.getTime()
    const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24))
    setDaysUntilChristmas(days)
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'tracker', label: 'Daily Tracker', icon: CheckCircle },
    { id: 'progress', label: 'My Progress', icon: TrendingUp },
    { id: 'community', label: 'Community', icon: Users },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-white border-b-4 border-red-100">
        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-red-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-64 h-24">
                <Image
                  src="/logo.png"
                  alt="Project Christmas Cracker Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            
            {/* Tagline */}
            <h1 className="text-4xl md:text-5xl font-bold text-red-800 mb-4 font-serif">
              Look & Feel Cracking This Christmas! 🎄
            </h1>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join the ultimate holiday wellness challenge that combines fitness, self-care, 
              and those adulting tasks you've been putting off!
            </p>
            
            {/* Countdown */}
            <div className="mt-8 inline-block bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-full">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6" />
                <span className="text-2xl font-bold">{daysUntilChristmas}</span>
                <span className="text-lg">days until Christmas</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-red-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`nav-tab flex items-center gap-2 ${
                    activeTab === tab.id ? 'active' : ''
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tracker' && <TrackerTab />}
        {activeTab === 'progress' && <ProgressTab />}
        {activeTab === 'community' && <CommunityTab />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-red-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600">
            © 2024 Project Christmas Cracker | Created with ❤️ for a healthier, happier holiday season
          </p>
        </div>
      </footer>
    </div>
  )
}

// Overview Tab Component
function OverviewTab() {
  const requirements = [
    {
      icon: '🚶‍♀️',
      title: 'Daily Steps',
      detail: '8,000 - 12,000 steps',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: '💪',
      title: 'Exercise',
      detail: '3x weekly gym/workout sessions',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: '💧',
      title: 'Hydration',
      detail: 'Hit your daily water goal',
      color: 'from-cyan-500 to-cyan-600'
    },
    {
      icon: '🥗',
      title: 'Protein',
      detail: 'Meet your protein target',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: '😴',
      title: 'Sleep',
      detail: '7-8 hours quality rest',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: '📚',
      title: 'Reading',
      detail: '10 minutes daily',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: '💊',
      title: 'Supplements',
      detail: 'Daily vitamins & probiotics',
      color: 'from-pink-500 to-pink-600'
    },
    {
      icon: '✅',
      title: 'Adulting Task',
      detail: '1 weekly task completed',
      color: 'from-red-500 to-red-600'
    }
  ]

  const taskCategories = [
    {
      title: '💬 Connection & Communication',
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
      title: '🏠 Life Admin',
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
      title: '✨ Self-Care Maintenance',
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
    <div className="space-y-12 animate-fade-in-up">
      {/* Challenge Overview */}
      <div className="card">
        <h2 className="text-3xl font-bold text-red-800 mb-8 text-center font-serif">
          The Challenge
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {requirements.map((req, index) => (
            <div key={index} className="card-hover text-center">
              <div className="text-4xl mb-4">{req.icon}</div>
              <h3 className="text-lg font-semibold text-red-800 mb-2">{req.title}</h3>
              <p className="text-gray-600 text-sm">{req.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Adulting Advent Section */}
      <div className="card">
        <h2 className="text-3xl font-bold text-red-800 mb-4 text-center font-serif">
          The Adulting Advent
        </h2>
        <p className="text-center text-gray-600 mb-8 italic">
          Complete one task each week - because being a grown-up is part of glowing up!
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {taskCategories.map((category, index) => (
            <div key={index} className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-red-800 mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.tasks.map((task, taskIndex) => (
                  <li key={taskIndex} className="flex items-start gap-3 text-gray-700">
                    <Star className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{task}</span>
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
function TrackerTab() {
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
    { id: 'steps', label: '✅ Completed 8,000+ steps', icon: '🚶‍♀️' },
    { id: 'water', label: '💧 Hit water intake goal', icon: '💧' },
    { id: 'protein', label: '🥗 Met protein target', icon: '🥗' },
    { id: 'sleep', label: '😴 Got 7-8 hours sleep', icon: '😴' },
    { id: 'reading', label: '📚 Read for 10 minutes', icon: '📚' },
    { id: 'supplements', label: '💊 Took supplements', icon: '💊' },
    { id: 'exercise', label: '💪 Completed workout (if scheduled)', icon: '💪' },
    { id: 'adulting', label: '✨ Did an adulting task', icon: '✨' }
  ]

  const handleCheckboxChange = (id: string) => {
    setChecklist(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  const completedCount = Object.values(checklist).filter(Boolean).length
  const completionRate = Math.round((completedCount / Object.keys(checklist).length) * 100)

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="card">
        <h2 className="text-3xl font-bold text-red-800 mb-6 text-center font-serif">
          Today's Tracker
        </h2>
        
        {/* Date Selector */}
        <div className="flex justify-center mb-8">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="elegant-input max-w-xs text-center"
          />
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-red-700">{completionRate}%</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>

        {/* Checklist */}
        <div className="grid gap-4 max-w-2xl mx-auto">
          {checklistItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                checklist[item.id as keyof typeof checklist]
                  ? 'border-red-300 bg-red-50'
                  : 'border-red-200 bg-white hover:border-red-300'
              }`}
            >
              <input
                type="checkbox"
                id={item.id}
                checked={checklist[item.id as keyof typeof checklist]}
                onChange={() => handleCheckboxChange(item.id)}
                className="custom-checkbox mr-4"
              />
              <label
                htmlFor={item.id}
                className={`flex-1 cursor-pointer ${
                  checklist[item.id as keyof typeof checklist]
                    ? 'text-red-700 line-through'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </label>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="text-center mt-8">
          <button className="btn-primary">
            Save Today's Progress
          </button>
        </div>
      </div>
    </div>
  )
}

// Progress Tab Component
function ProgressTab() {
  const stats = [
    { label: 'Days Tracked', value: '0', icon: Calendar },
    { label: 'Current Streak', value: '0', icon: Activity },
    { label: 'Completion Rate', value: '0%', icon: Target },
    { label: 'Perfect Days', value: '0', icon: Award }
  ]

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="card">
        <h2 className="text-3xl font-bold text-red-800 mb-8 text-center font-serif">
          Your Progress Dashboard
        </h2>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="card-hover text-center">
                <div className="flex justify-center mb-4">
                  <Icon className="w-8 h-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-red-700 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            )
          })}
        </div>

        {/* Chart Placeholder */}
        <div className="bg-gray-50 rounded-xl p-8 text-center">
          <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Start tracking to see your progress chart!</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <button className="btn-secondary">
            📥 Export Progress
          </button>
          <button className="btn-secondary">
            📤 Import Progress
          </button>
          <button className="btn-secondary">
            👥 Compare with Friends
          </button>
        </div>
      </div>
    </div>
  )
}

// Community Tab Component
function CommunityTab() {
  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="card">
        <h2 className="text-3xl font-bold text-red-800 mb-8 text-center font-serif">
          Community
        </h2>
        
        <div className="text-center text-gray-600">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg">Connect with friends and share your progress!</p>
          <p className="text-sm mt-2">Community features coming soon...</p>
        </div>
      </div>
    </div>
  )
}
