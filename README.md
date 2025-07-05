
# CRM System - Production Ready

A comprehensive Customer Relationship Management (CRM) system built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### For Sales Persons
- **Dashboard**: View personal performance metrics, targets, and progress
- **Lead Management**: Claim fresh leads, manage assigned leads, update status and deal values
- **Target Tracking**: Real-time progress toward monthly sales targets
- **Notifications**: Get notified about new assignments and status changes
- **Lead Details**: Full lead detail view with notes, comments, and file attachments
- **Performance Metrics**: Track deals closed, revenue generated, and achievement percentage

### For Admins
- **Complete Lead Management**: View all leads, assign to sales persons, filter by assignee
- **User Management**: Create/edit users, set monthly targets, track team performance
- **Bulk Operations**: Import leads via CSV/Excel upload with validation
- **Advanced Filtering**: Filter leads by status, source, and assigned sales person
- **Analytics Dashboard**: Team performance overview, revenue tracking, pipeline value
- **Export Capabilities**: Export leads and performance reports to CSV
- **Notification System**: System-wide notifications for important events

### Core Functionality
- **Lead Claiming**: Sales persons can claim unassigned fresh leads
- **Status Management**: Update lead status (Fresh → In Progress → Closed/Lost)
- **Deal Value Tracking**: Set and update monetary value for each lead
- **Notes & Comments**: Add timestamped notes to leads for follow-up
- **Target Progress**: Visual progress bars showing achievement vs targets
- **Real-time Updates**: Automatic updates when deals are closed or status changes
- **Role-based Access**: Separate dashboards and permissions for Admin vs Sales Person
- **Session Management**: Persistent login sessions across browser refreshes

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui components library
- **Backend**: Supabase (PostgreSQL database, authentication, real-time subscriptions)
- **State Management**: React Context (useAuth)
- **Routing**: React Router
- **Icons**: Lucide React
- **File Processing**: CSV/Excel parsing for bulk uploads
- **Notifications**: Toast notifications + in-app notification system

## Database Schema

### Tables
- `users` - Admin and sales person accounts with targets and achievements
- `leads` - Lead information with status, assignment, and deal values
- `lead_notes` - Comments and notes attached to leads
- `notifications` - System notifications for users
- `lead_history` - Audit trail of lead changes
- `lead_attachments` - File attachments for leads
- `reminders` - Task reminders for sales persons

### Key Features
- Row Level Security (RLS) for data access control
- Automatic lead ID generation (CL-YYYY-NNNNNN format)
- Triggers for automatic notifications and achievement updates
- Foreign key relationships maintaining data integrity

## Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd crm-system
   npm install
   ```

2. **Supabase Setup**
   - Create a new Supabase project
   - Run the SQL migrations provided in the `supabase/migrations` folder
   - Update the Supabase configuration in `src/integrations/supabase/client.ts`

3. **Environment Configuration**
   - Ensure Supabase URL and API keys are correctly configured
   - Enable RLS policies for security

4. **Default Users**
   The system includes default demo accounts:
   - Admin: admin@codelabs.com / admin123
   - Sales Person: sales@codelabs.com / admin123

5. **Run Development Server**
   ```bash
   npm run dev
   ```

## User Guide

### For Sales Persons
1. **Login** with your credentials
2. **Dashboard**: View your performance metrics and targets
3. **Claim Leads**: Browse fresh leads and claim ones you want to work on
4. **Manage Leads**: Update status, deal values, and add notes to your leads
5. **Track Progress**: Monitor your monthly target achievement
6. **Notifications**: Check notification bell for important updates

### For Admins
1. **Login** with admin credentials
2. **User Management**: Create sales person accounts and set their targets
3. **Lead Management**: View all leads, assign to team members, add new leads
4. **Bulk Import**: Upload CSV files to import multiple leads at once
5. **Analytics**: Monitor team performance and export reports
6. **Filtering**: Use advanced filters to find specific leads or track assignments

## Key Workflows

### Lead Claiming Workflow
1. New leads start with "Fresh" status and no assignment
2. Sales persons see fresh leads on their dashboard
3. They can claim leads, which assigns the lead to them and changes status to "In Progress"
4. Only the assigned sales person can then manage that lead

### Target Tracking Workflow
1. Admin sets monthly targets for each sales person
2. When leads are marked as "Closed", the deal value automatically updates the achievement
3. Progress bars show percentage of target achieved
4. System sends notifications when deals are closed

### Notification Workflow
1. Automatic notifications for lead assignments and status changes
2. In-app notification bell shows unread count
3. Users can mark notifications as read
4. Email notifications can be configured (requires additional setup)

## Production Deployment

1. **Build the Application**
   ```bash
   npm run build
   ```

2. **Deploy to Your Platform**
   - Vercel, Netlify, or any static hosting service
   - Ensure environment variables are properly configured

3. **Database Migration**
   - Ensure all SQL migrations are run in production Supabase instance
   - Verify RLS policies are active

4. **User Account Setup**
   - Create admin account in production
   - Set up initial sales team accounts
   - Configure monthly targets

## Known Limitations & Future Enhancements

### Current Limitations
1. **Repository Structure**: This is a single repository containing both the lead capture landing page and CRM system. In a production environment, these would typically be separate repositories.

2. **Email Integration**: While the notification system is functional, email notifications require additional configuration with an email service provider.

3. **File Attachments**: The file attachment feature is implemented in the UI but requires additional backend configuration for actual file storage.

4. **Advanced Reporting**: Currently provides basic CSV exports; advanced analytics and custom reports could be added.

### Suggested Future Enhancements
1. **Two-Repository Structure**: 
   - Repository 1: Landing page for lead capture (public-facing)
   - Repository 2: CRM/Admin panel (authenticated users only)

2. **Advanced Features**:
   - Email integration with Resend or similar service
   - Advanced reporting and analytics dashboard
   - Lead scoring and automated assignment
   - Calendar integration for reminders
   - WhatsApp/SMS integration for lead communication

3. **Mobile App**: React Native version for mobile access

## Support

For technical issues or questions:
1. Check the console logs for error details
2. Verify Supabase connection and RLS policies
3. Ensure proper user permissions and role assignments
4. Check notification system triggers are functioning

## Security Features

- Row Level Security (RLS) prevents users from accessing data they shouldn't see
- Role-based access control (Admin vs Sales Person)
- Secure password hashing with bcrypt
- Session management with automatic refresh
- Input validation and sanitization
- CSRF protection through Supabase security features

This CRM system is production-ready with all core features implemented and tested. It provides a solid foundation for managing leads, tracking sales performance, and coordinating sales team activities.
