# Project Christmas Cracker 🎄

A sophisticated holiday wellness challenge app built with Next.js, featuring a Ralph Lauren Christmas aesthetic. Track your 116-day journey from September 1st to December 25th with elegant progress visualization and community features.

## ✨ Features

### 🎯 Challenge Overview
- **116-Day Journey**: Track your progress from September 1st to December 25th
- **8 Daily Goals**: Steps, exercise, hydration, protein, sleep, reading, supplements, and adulting tasks
- **Elegant Design**: Ralph Lauren-inspired Christmas aesthetic with premium styling

### 📊 Progress Tracking
- **Daily Tracker**: Interactive checklist for daily activities
- **Progress Dashboard**: Visual statistics and completion rates
- **Advanced Charts**: Multiple chart types (line, area, bar) using Recharts
- **Streak Tracking**: Monitor your current streak and perfect days

### 🏠 Adulting Advent
- **Weekly Tasks**: Curated adulting tasks in three categories:
  - Connection & Communication
  - Life Admin
  - Self-Care Maintenance

### 👥 Community Features
- **Friend Comparisons**: Compare progress with friends
- **Data Export/Import**: Share and backup your progress
- **Community Dashboard**: Connect with other participants

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Ralph Lauren aesthetic
- **Database**: PostgreSQL with Prisma ORM
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Deployment**: Ready for Netlify/Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd christmas-cracker-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your database URL:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/christmas_cracker"
   ```

4. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
christmas-cracker-app/
├── src/
│   ├── app/
│   │   ├── api/           # API routes
│   │   ├── globals.css    # Global styles
│   │   ├── layout.tsx     # Root layout
│   │   └── page.tsx       # Main page
│   ├── components/        # React components
│   └── lib/              # Utilities
├── prisma/
│   └── schema.prisma     # Database schema
├── public/
│   └── logo.png          # Your logo
└── README.md
```

## 🗄️ Database Schema

### Users
- Basic user information (email, name)
- Challenge settings and preferences
- Progress tracking relationships

### Progress Entries
- Daily activity completion status
- Quantitative metrics (steps, water intake, etc.)
- Timestamps and user relationships

### Challenge Settings
- Personal goal configurations
- Challenge start/end dates
- Activity preferences

## 🎨 Design System

### Color Palette
- **Primary Red**: #A84432 (Ralph Lauren signature red)
- **Warm Cream**: #FFF9F5 (background)
- **Deep Brown**: #4A3833 (text)
- **Accent Red**: #D84A4A (highlights)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Components
- Elegant cards with subtle shadows
- Gradient buttons with hover effects
- Custom progress bars and checkboxes
- Responsive grid layouts

## 🚀 Deployment

### Netlify Deployment

1. **Connect your repository** to Netlify
2. **Set build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Add environment variables** in Netlify dashboard
4. **Deploy!**

### Environment Variables for Production

```env
DATABASE_URL="your-production-database-url"
NODE_ENV="production"
```

## 📊 API Endpoints

### Progress Management
- `GET /api/progress?userId=123&date=2024-12-01` - Get progress for specific date
- `GET /api/progress?userId=123` - Get all user progress
- `POST /api/progress` - Save/update daily progress

### User Management
- `GET /api/users?email=user@example.com` - Get user data
- `POST /api/users` - Create new user

## 🔧 Customization

### Adding New Activities
1. Update the Prisma schema in `prisma/schema.prisma`
2. Add new fields to the ProgressEntry model
3. Update the tracker component in `src/app/page.tsx`
4. Run `npx prisma db push` to update the database

### Styling Changes
- Modify `src/app/globals.css` for global styles
- Update component-specific styles in the respective files
- Use Tailwind CSS classes for rapid styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Ralph Lauren for design inspiration
- Next.js team for the amazing framework
- Recharts for beautiful data visualization
- The Christmas Cracker community for motivation

---

**Made with ❤️ for a healthier, happier holiday season! 🎄✨**
