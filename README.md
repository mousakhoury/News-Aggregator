## News Aggregator



## Project Description

Welcome to our Laravel - React news aggregation website! Our platform brings you the latest news from three different APIs, curated to your interests. With an intuitive user interface, you can easily access and filter news articles according to your preferences.

## Features:

- News Aggregation: Our website collects news articles from three distinct APIs, ensuring a comprehensive and diverse range of stories on your home page.

- User Authentication: Create a new account or log in to your existing account to personalize your news experience.

- Personalized News Feed: Once logged in, your home page presents you with a consolidated view of news articles from the APIs. You can conveniently filter articles by title, date, categories, and author to find exactly what you're looking for.

- Profile Management: Your profile is just a click away. Access it from the dropdown next to your username in the top right corner. Update your personal information, including your name, email, and password. You also have the option to delete your account if needed.

- Preference Settings: Tailor your news feed to match your interests by visiting the preference page from the dropdown menu. Here, you can choose preferred news sources, categories, and authors. Your news feed will reflect these choices, ensuring you get the most relevant articles.

## How to Get Started

- Create an Account or Log In: Start by creating a new account or logging in if you already have one.

- Explore the Home Page: Once logged in, you'll land on the home page. Here, you can view the latest news articles from our selected APIs.

- Filter News: Use the filtering options to refine your news feed. Search for articles by title, date, categories, or author to focus on topics that matter to you.

- Manage Your Profile: Click on your username in the top right corner and select "Profile" from the dropdown. Here, you can update your personal details or delete your account if needed.

- Customize Your Preferences: Access the preference page from the dropdown next to your username. Fine-tune your news feed by selecting preferred sources, categories, and authors.

- Stay Informed: Enjoy a personalized news experience that keeps you informed about the topics that interest you the most.

- Whether you're a news enthusiast or just looking to stay updated, our Laravel - React news website offers a seamless way to access, customize, and enjoy a diverse range of news articles. Start exploring today and tailor your news experience to your liking!

## Table of Contents

- Installation
- Configuration
- Usage

## Installation

1. **Ensure you have the required software:**
   Before getting started, make sure you have the following software installed on your system:
   - [Composer](https://getcomposer.org/download/)
   - [Node.js](https://nodejs.org/en/download/)
   - XAMPP or any other server with PHP version 8.2.4 or higher installed and running.

2. **Clone the repository:**
   ```
   git clone https://github.com/mousakhoury/News-Aggregator.git
   ```

3. **Navigate to the project directory:**
   ```
   cd your-project
   ```

4. **Install Composer Dependencies:**
   ```
   composer install
   ```

5. **Copy the .env file:**
   ```
   cp .env.example .env
   ```

6. **Generate an application key:**
   ```
   php artisan key:generate
   ```

7. **Create an empty database for the project. Update `.env` with your database details:**

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

8. **Run Migrations and Seeders:**
   ```
   php artisan migrate --seed
   ```

## Configuration

Explain any additional configuration steps that might be necessary. This could include setting up third-party services, environment variables, or custom settings.

## Usage

1. **Compile assets:**
   ```
   npm install
   npm run dev
   ```

2. **Start the development server:**
   ```
   php artisan serve
   ```

3. **Access the application in your web browser:**
   ```
   http://localhost:8000
   ```

- **Features:** List the main features of your application.
- **Screenshots:** Include screenshots or GIFs showcasing the application.
- **Dependencies:** List external dependencies or services that your project relies on.
- **Troubleshooting:** Provide solutions for common issues users might encounter.

Make sure to customize the instructions based on your specific project's needs.
