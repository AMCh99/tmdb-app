# TMDb Frontend Application

A front-end application built using TypeScript, Next.js, React.js, and Material UI. This app integrates with The Movie Database (TMDb) API to provide movie and TV show information, including trailers, cast, crew, and reviews.

## Demo

Available here: [TMDb App Demo](https://amch99.github.io/tmdb-app/)

## Tech Stack

- **TypeScript**
- **Next.js** (v14.2.12)
- **React.js**
- **Material UI** ([Documentation](https://mui.com/material-ui/getting-started/))
- **TMDb API** ([Documentation](https://www.themoviedb.org/documentation/api))

## Features

- **Main Page**: Displays a trending movie or TV show that updates every 12 seconds, showing basic information and a trailer. Below it, there are two horizontally scrollable sections for trending movies and trending TV shows.
- **Movies Page**: Contains three horizontally scrollable sections:
  - Trending Movies
  - The Best Movies
  - Upcoming Movies
- **TV Shows Page**: Contains three horizontally scrollable sections:
  - Trending TV Shows
  - The Best TV Shows
  - Airing Today
- **Search Bar**: Allows users to search for any movie or TV show by name.
- **Movie/Show Details**: Clicking on any movie or TV show navigates to a detailed page, which includes:
  - Basic information
  - A trailer (if available)
  - Cast and Crew
  - Reviews from TMDb

## Prerequisites

Make sure the following are installed:

- **Node.js** (Version: 16.x or higher)
- **npm** (Version: 9.2.0 or higher)

## Setup Instructions

To run the application locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/amch99/tmdb-app.git
   cd tmdb-app
   ```
2. Create a **.env** file in the root directory and add the following environment variable:
    ```bash
    NEXT_PUBLIC_TOKEN=your_tmdb_api_token_here
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev 
    ```
5. Open your browser and go to **http://localhost:3000**.

## Running Tests (Optional)

To run the tests:

1. Install Jest and related dependencies:
    ```bash
    npm install jest @types/jest ts-jest --save-dev
    ```
2. Run the tests:
    ```bash
    npm run test 
    ```

## Dependencies
- **npm**: 9.2.0
- **Next.js**: v14.2.12

## License
This project is licensed under the MIT License.
