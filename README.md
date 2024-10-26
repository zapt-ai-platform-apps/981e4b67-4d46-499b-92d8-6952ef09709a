# New App

## Overview

New App is a TikTok Hashtag Generator that helps users generate relevant hashtags for their TikTok content. The app offers a free 3-day trial and three paid subscription plans with varying levels of features.

## User Journeys

### 1. Sign Up and Sign In

- **Step 1:** Users open the app and are prompted to sign in.
- **Step 2:** Users see the text "Sign in with ZAPT" and can click to learn more about ZAPT.
- **Step 3:** Users sign in using email (magic link) or social providers like Google, Facebook, or Apple.
- **Step 4:** Upon successful sign-in, users are directed to the homepage.

### 2. Generate Hashtags

- **Step 1:** On the homepage, users can enter a keyword related to their TikTok content.
- **Step 2:** Users click the "Generate" button to create hashtags.
- **Step 3:** The app displays a loading state while generating hashtags.
- **Step 4:** Generated hashtags are displayed on the screen for the user to copy or use.

### 3. Subscription Management

- **Step 1:** New users start with a free trial plan limited to 3 days.
- **Step 2:** Users can access the hashtag generator with limitations based on their plan:
  - **Free Plan:** Generate up to 5 hashtags per keyword.
  - **Basic Plan:** Generate up to 10 hashtags per keyword.
  - **Premium Plan:** Generate up to 20 hashtags per keyword.
  - **Pro Plan:** Generate up to 50 hashtags per keyword.
- **Step 3:** Users can upgrade their subscription to unlock more features (Note: Subscription upgrade functionality is a placeholder in this version).

### 4. Sign Out

- **Step 1:** Users can sign out by clicking the "Sign Out" button in the top-right corner.
- **Step 2:** The app redirects users back to the sign-in page.

## External APIs and Services

- **ZAPT:** Used for authentication and event handling.
- **ChatGPT (via `createEvent`):** Generates hashtags based on user input.
- **Neon Database:** Stores user information and generated hashtags.
- **Supabase Auth UI:** Provides the authentication interface.

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Public app ID for ZAPT initialization.
- `NEON_DB_URL`: Connection string for the Neon PostgreSQL database.
