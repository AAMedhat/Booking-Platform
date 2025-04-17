# Booking Platform

A modern, responsive React application for booking hotels in Egypt, featuring an intuitive user interface with advanced filtering options and interactive components.

## Project Overview

This platform allows users to browse and book curated hotels across Egypt. The application features a sleek design with interactive components, smooth animations, and a user-friendly interface optimized for both desktop and mobile devices. The platform aims to provide a seamless booking experience with real-time availability, detailed hotel information, and secure payment processing.

The design implementation follows the Figma prototype: [GOE-FE-EXAM Design](https://www.figma.com/design/sA3TMpfD4FwwyOlpwzGB0k/GOE-FE-EXAM?node-id=0-1&p=f&t=D0zcZJXmAfXVmIjH-0)

## Key Features

- Location-based hotel search with autocomplete and popular suggestions
- Interactive date range picker with visual calendar representation
- Customizable traveler and room selection with dynamic pricing
- Modern UI with animations and micro-interactions for enhanced user experience
- Responsive design optimized for desktop, tablet, and mobile devices
- Multi-language support (English/Arabic) with RTL capability
- User account management with booking history and favorites
- Secure checkout process with multiple payment options

## Project Structure

The project follows a component-based architecture using React and Chakra UI. Here's a breakdown of the main directories:

```
landing-page/
├── public/            # Static assets and images
│   ├── images/        # Image assets used throughout the application
│   ├── icons/         # Custom SVG icons
│   ├── locales/       # Translation files for i18n
├── src/
│   ├── app/           # Next.js app router files
│   │   ├── layout.tsx # Root layout with providers and global styles
│   │   ├── page.tsx   # Home page component
│   ├── components/    # Reusable React components
│   │   ├── common/    # Common components used across pages
│   │   ├── home/      # Components specific to the home page
│   │   ├── booking/   # Components for the booking process
│   │   ├── ui/        # Base UI components
│   ├── hooks/         # Custom React hooks
│   ├── context/       # React context providers
│   ├── lib/           # Utility functions and helpers
│   ├── styles/        # Global styles and theme configuration
│   ├── types/         # TypeScript type definitions
│   ├── pages/         # Next.js page components
```

## Component Descriptions

### Common Components

Located in `src/components/common/`:

- **Navbar.tsx**: Main navigation component featuring a responsive design with search, favorites, cart, and user profile functionality. Includes:
  - Responsive layout that adapts to mobile, tablet, and desktop viewports
  - Search functionality with autocomplete suggestions
  - User favorites menu with saved hotels
  - Shopping cart for managing selected bookings
  - User profile dropdown with authentication state management
  - Language selector for toggling between English and Arabic
  - Mobile drawer navigation for smaller screens

### Home Page Components

Located in `src/components/home/`:

- **HeroSection.tsx**: Main landing section with background image, heading text, and search filters. Features:
  - Full-width responsive hero image with overlay text
  - Animated introductory text with personalized greeting
  - Integrated search panel with location, date, and traveler inputs
  - Framer Motion animations for enhanced visual appeal
  - Responsive layout for all device sizes
  
- **LocationSelector.tsx**: Interactive dropdown for selecting Egyptian cities. Includes:
  - Custom styled dropdown menu with Chakra UI Popover
  - List of Egyptian locations with icons and descriptions
  - Search functionality for quick location finding
  - Recently selected locations tracking
  - Visual indicators for currently selected location
  
- **DateSelector.tsx**: Dual-calendar date range picker for selecting check-in and check-out dates. Features:
  - Interactive dual-month calendar view
  - Visual highlighting of selected date range
  - Validation for date selection (preventing past dates)
  - Month navigation controls
  - Special styling for current date and selected range
  - Responsive design that adapts to screen size
  
- **TravelersSelector.tsx**: Interactive selector for choosing the number of adults, children, and rooms. Includes:
  - Incrementor/decrementor controls for each category
  - Validation logic with min/max values
  - Dynamic summary text showing current selection
  - Information tooltips for category explanations
  - Responsive design for different screen sizes

### Booking Components

Located in `src/components/booking/`:

- **HotelCard.tsx**: Displays hotel information in a card format with:
  - Hotel thumbnail image with lazy loading
  - Rating stars and review count
  - Price display with discount indicators
  - Quick action buttons (favorite, compare)
  - Hover animations and interactive elements

- **FilterSidebar.tsx**: Sidebar component for filtering hotel results by:
  - Price range with slider control
  - Star rating selection
  - Amenities checkboxes
  - Location proximity
  - Property type selection

## Technologies Used

- **React (18.x)**: Frontend library for building user interfaces
- **Next.js (14.x)**: React framework for server-rendered applications
- **Chakra UI (2.x)**: Component library for accessible and responsive design
- **Framer Motion (10.x)**: Animation library for React components
- **TypeScript (5.x)**: Static type-checking for JavaScript

## Detailed Setup Instructions

### System Requirements

- Node.js 18.x or higher
- npm 9.x or higher
- Git

### Installation Steps

1. Clone the repository
   ```bash
   git clone [https://github.com/your-username/booking-platform.git](https://github.com/AAMedhat/Booking-Platform.git)
   cd booking-platform
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
4. Run the development server
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request
