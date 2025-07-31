# Placement Portal - Frontend

A modern, professional React frontend for the Placement Portal application. This frontend provides a beautiful and intuitive user interface for students to share and discover placement experiences.

## Features

- **Modern UI/UX**: Clean, professional design with smooth animations and responsive layout
- **Authentication**: User registration, login, and profile management
- **Experience Sharing**: Comprehensive forms for sharing placement/internship experiences
- **Experience Discovery**: Advanced filtering and search capabilities
- **Company Discussions**: Real-time discussions for specific companies
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Tech Stack

- **React 18**: Latest React with hooks and modern patterns
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API communication
- **React Icons**: Beautiful icon library
- **React Hot Toast**: Toast notifications
- **CSS3**: Custom CSS with modern design patterns

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running on port 5000

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
client/
├── public/                 # Static assets
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx     # Navigation component
│   │   └── ProtectedRoute.jsx # Route protection
│   ├── context/           # React context providers
│   │   └── AuthContext.jsx # Authentication context
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── Login.jsx      # Login page
│   │   ├── Register.jsx   # Registration page
│   │   ├── Experiences.jsx # Experience listing
│   │   ├── AddExperience.jsx # Experience form
│   │   ├── ExperienceDetails.jsx # Experience details
│   │   ├── Discussions.jsx # Company discussions
│   │   └── Profile.jsx    # User profile
│   ├── styles/            # CSS files
│   │   ├── index.css      # Global styles
│   │   └── App.css        # App-specific styles
│   ├── utils/             # Utility functions
│   │   └── api.js         # API configuration
│   ├── App.jsx            # Main app component
│   └── main.jsx           # App entry point
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
└── README.md              # This file
```

## Key Components

### Authentication
- **AuthContext**: Manages user authentication state
- **Login/Register**: User authentication forms
- **ProtectedRoute**: Route protection for authenticated users

### Experience Management
- **Experiences**: Browse and filter experiences
- **AddExperience**: Comprehensive form for sharing experiences
- **ExperienceDetails**: Detailed view of individual experiences

### Community Features
- **Discussions**: Company-specific discussion threads
- **Profile**: User profile and experience management

## API Integration

The frontend communicates with the backend through the `/api` proxy configured in `vite.config.js`. All API calls are handled through the `api.js` utility with automatic token management.

### Key API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `GET /api/experiences` - Get experiences with filters
- `POST /api/experiences` - Create new experience
- `GET /api/experiences/:id` - Get specific experience
- `GET /api/discussions/:company` - Get company discussions
- `POST /api/discussions/:company` - Add discussion message

## Styling

The application uses a custom CSS approach with:
- **CSS Variables**: For consistent theming
- **Utility Classes**: For common styling patterns
- **Responsive Design**: Mobile-first approach
- **Modern CSS**: Flexbox, Grid, and CSS animations

## Features in Detail

### Experience Sharing
- Comprehensive form with all placement details
- Dynamic form fields for questions and resources
- Real-time validation and error handling
- Rich text formatting and organization

### Experience Discovery
- Advanced filtering by company, department, type, and package
- Search functionality
- Responsive card layout
- Quick access to detailed views

### Company Discussions
- Company-specific discussion threads
- Real-time message posting
- Popular companies quick selection
- Character limit and validation

### User Profiles
- Personal experience management
- Account information display
- Experience statistics
- Profile customization

## Development

### Adding New Features

1. Create new components in the appropriate directory
2. Add routes in `App.jsx`
3. Update navigation in `Navbar.jsx`
4. Add any new API endpoints to `api.js`
5. Style components using the existing CSS patterns

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use meaningful component and variable names
- Add proper error handling
- Include loading states for async operations

## Deployment

The application can be deployed to any static hosting service:

1. Build the application: `npm run build`
2. Upload the `dist` folder to your hosting service
3. Configure the backend URL in production

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Test on multiple devices and browsers
4. Update documentation as needed

## License

This project is part of the Placement Portal application. 