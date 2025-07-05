
# Codelabs - Learn. Build. Launch.

A comprehensive educational platform and CRM system for managing coding bootcamp leads and student enrollment.

## 🚀 Project Overview

Codelabs is a modern, full-stack application consisting of:

1. **Landing Page (Frontend)** - Public-facing website for lead capture and student enrollment
2. **Admin Panel/CRM (Backend)** - Lead management system for admins and sales personnel

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/UI** for component library
- **React Router** for navigation
- **TanStack Query** for data fetching

### Backend
- **Supabase** for database and authentication
- **PostgreSQL** database
- **Row Level Security (RLS)** for data protection

### Additional Libraries
- **Lucide React** for icons
- **React Hook Form** for form management
- **Sonner** for notifications

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── Header.tsx      # Navigation header
│   ├── HeroSection.tsx # Landing page hero
│   ├── CareerCounsellingForm.tsx
│   └── ...
├── pages/              # Route components
│   ├── Index.tsx       # Landing page
│   ├── AdminDashboard.tsx
│   └── NotFound.tsx
├── integrations/       # External service integrations
│   └── supabase/       # Supabase client and types
├── hooks/              # Custom React hooks
└── lib/                # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd codelabs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Supabase configuration is already set up in `src/integrations/supabase/client.ts`
   - Database tables are created via migrations in `supabase/migrations/`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Landing Page: `http://localhost:5173`
   - Admin Dashboard: `http://localhost:5173/admin`

## 🔐 Admin Access

**Default Admin Credentials:**
- Email: `admin@codelabs.com`
- Password: `admin123`

⚠️ **Important:** Change default credentials in production!

## 📊 Features

### Landing Page
- Responsive design optimized for mobile
- Lead capture form with Supabase integration
- Success story testimonials
- Pricing information with promotional pricing
- WhatsApp chat integration
- Google Form integration for free trials

### Admin Dashboard
- **Lead Management**
  - View all leads with unique Lead IDs
  - Search and filter functionality
  - Export leads to CSV
  - Lead status tracking
- **Analytics**
  - Total leads statistics
  - Monthly and weekly breakdowns
  - Performance metrics
- **User Management**
  - Admin authentication
  - Secure session management

### Database Schema
- `career_counselling_leads` - Stores form submissions
- `admin_users` - Admin user management
- Row Level Security enabled for data protection

## 🎨 Design System

### Color Palette
- **Primary:** Purple gradient (`from-purple-600 to-blue-600`)
- **Secondary:** Green accents for success states
- **Neutral:** Gray scale for text and backgrounds

### Typography
- **Headings:** Poppins font family
- **Body:** Inter font family

## 🔧 Development Guidelines

### Code Organization
- **Components:** Small, focused, single-responsibility
- **Hooks:** Custom hooks for shared logic
- **Types:** TypeScript interfaces for type safety
- **Styling:** Tailwind CSS utility classes

### Best Practices
- Use descriptive variable and function names
- Add comments for complex logic
- Follow React best practices for hooks and state management
- Implement proper error handling
- Use TypeScript strictly

### Database Guidelines
- Use Row Level Security (RLS) policies
- Generate UUIDs for primary keys
- Include created_at and updated_at timestamps
- Follow PostgreSQL naming conventions

## 📱 Mobile Optimization

The application is fully responsive with special attention to:
- Form placement and visibility on mobile devices
- Button sizing and touch targets
- Content alignment and readability
- Performance optimization for mobile networks

## 🚀 Deployment

### Frontend Deployment
The application can be deployed to any static hosting service:
- Vercel (recommended)
- Netlify
- GitHub Pages

### Database
- Supabase provides managed PostgreSQL hosting
- Automatic SSL and security features
- Built-in authentication and authorization

## 🔒 Security Features

- Row Level Security (RLS) on all tables
- Input validation and sanitization
- Secure admin authentication
- CORS protection
- SQL injection prevention

## 📈 Future Enhancements

### Planned Features
- **User Roles:** Admin and Sales Person roles
- **Advanced Lead Management:** Lead assignment, status tracking, notes
- **Analytics Dashboard:** Advanced reporting and visualizations
- **Bulk Operations:** Import/export functionality
- **Calendar Integration:** Meeting scheduling
- **AI Chatbot:** Automated customer support
- **Notification System:** Email and WhatsApp notifications

### Technical Improvements
- API rate limiting
- Database performance optimization
- Advanced caching strategies
- Real-time updates with WebSockets
- Comprehensive error logging

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Update documentation
4. Submit pull request
5. Code review and merge

### Code Standards
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Include unit tests for new features
- Update README for new functionality

## 📞 Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Check documentation and FAQs

## 📄 License

This project is proprietary software. All rights reserved.

---

**Codelabs** - Empowering the next generation of developers through hands-on learning and industry-ready skills.
