Podcast App
Project Overview
This is a React-based Podcast Discovery Platform that allows users to browse, search, and manage their favorite podcasts. The application provides a rich, interactive experience for podcast enthusiasts, with features like genre filtering, search, favorites management, and detailed podcast information.
Features

Podcast Browsing

-View comprehensive list of podcasts
-Filter podcasts by genre
-Sort podcasts alphabetically or by update date
-Search podcasts by title


Favorites Management

-Add podcasts to favorites
-View and manage favorite podcasts
-Sort favorites by different criteria


Podcast Details

-Detailed view of individual podcast information
-Season and episode details
-Audio playback controls


Responsive Design

-Mobile and desktop friendly interface
-Intuitive user experience



Technology Stack

-React
-React Hooks (useState, useEffect, useContext)
-React Router
-Custom Hooks
-Context API for state management

Prerequisites

Node.js (v14 or later)
npm or Yarn

Installation

Clone the repository

bashCopygit clone https://github.com/ZwelishaNgcongo/CS20240151_WFO2407_A_Zwelisha-Ngcongo_DJS11
cd my-react-app

Install dependencies

bashCopynpm install
     or
yarn install

Set up environment variables
Create a .env file in the root directory and add any necessary API endpoints:


Running the Application

Development Mode

bashCopynpm start
# or
yarn start

Production Build

bashCopynpm run build
# or
yarn build
Project Structure
Copysrc/
│
├── components/
│   ├── Favorites.jsx
│   ├── GenreFilter.jsx
│   ├── PodcastDetails.jsx
│   ├── PodcastList.jsx
│   └── SearchBar.jsx
│
├── context/
│   ├── FavoritesContext.jsx
│   └── GenreContext.jsx
│
├── hooks/
│   └── useFetchPodcasts.js
│
├── utils/
│   └── api.js
│
└── App.js
Key Components
-PodcastList

Displays list of podcasts
Provides filtering and sorting functionality
Allows adding podcasts to favorites

Favorites

Manages user's favorite podcasts
Allows removing favorites
Provides sorting options

PodcastDetails

Shows comprehensive information about a specific podcast
Includes audio playback controls

API Integration
The application uses a custom API utility (src/utils/api.js) to fetch:

Podcast previews
Podcast details
Genre information

State Management

Context API for global state management
Favorites Context for managing favorite podcasts
Genre Context for handling genre-related information

Performance Optimization

Memoization with useMemo
Efficient data filtering and sorting
Minimal re-renders through careful state management

Contact
Zwelisha Ngcongo- zwelisha.ngcongo@gmail.com
Project Link: https://github.com/ZwelishaNgcongo/CS20240151_WFO2407_A_Zwelisha-Ngcongo_DJS11

netlify link :https://cs20240151-wfo2407-a-zwelisha-ngcongo.netlify.app

