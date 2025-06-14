# 🌦️ WeatherSphere - A React Weather Reporter

A clean, modern, and responsive web application that provides real-time weather data for any city in the world. This project was built as a take-home assignment to demonstrate modern frontend development skills, architectural best practices, and a keen eye for user experience.

**[➡️ View the Live Demo Here](https://weather-reporter-app.netlify.app/)**

---

## ✨ Features

-   **Dynamic Weather Search:** Search for any city worldwide to get instant weather updates.
-   **Comprehensive Data:** Displays current temperature, humidity, wind speed, UV index, feels-like temperature, precipitation, visibility, and air quality.
-   **Geolocation on Load:** Defaults to fetching weather for a preset location (Colombo) on the initial load.
-   **Responsive Design:** A fully responsive and mobile-first interface that looks great on all devices, from small phones to large desktop screens.
-   **Elegant Loading States:** Utilizes a loading skeleton UI to provide a smooth and professional user experience while data is being fetched, improving perceived performance.
-   **Dynamic Icons & Theming:** Displays professional weather icons (Material-UI) and a dynamic day/night theme on the weather card based on the location's local time.
-   **Robust Error Handling:** Provides clear, user-friendly error messages for invalid city names, network issues, or API key problems.
-   **Smart Caching:** Caches recent search results to reduce redundant API calls and provide faster responses for repeated searches.
-   **Toast Notifications:** Uses non-intrusive toast notifications for success and error feedback.

---

## 📸 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/4ccef51c-2843-4a57-8571-ae159c3c3f43" alt="Main Weather Display" width="32%">
  &nbsp; &nbsp;
  <img src="https://github.com/user-attachments/assets/43e9008a-5915-42e2-995d-762534ea91ac" alt="Loading Skeleton State" width="32%">
  &nbsp; &nbsp;
  <img src="https://github.com/user-attachments/assets/c87ca0aa-cc2f-4823-85d8-a1dcf06e97d0" alt="Error Message Display" width="32%">
</p>
<p align="center">
  <em>From left to right: Main Display, Loading Skeleton, and Error State.</em>
</p>

---

## 🛠️ Tech Stack & Tools

-   **Framework:** React (with Vite for a fast development experience)
-   **State Management:** Redux Toolkit (for predictable, centralized state management)
-   **Styling:** Tailwind CSS (for utility-first styling) & CSS Modules (for component-scoped styles)
-   **Icons:** Material-UI Icons (for a consistent and professional icon set)
-   **API:** [WeatherAPI.com](https://www.weatherapi.com/)
-   **Notifications:** `react-hot-toast`
-   **Testing:** Vitest & React Testing Library

---

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    *(Remember to replace `your-username` with your actual GitHub username)*
    ```
    git clone https://github.com/your-username/weather-reporter.git
    ```
2.  **Navigate to the project directory:**
    ```
    cd weather-reporter
    ```
3.  **Install NPM packages:**
    ```
    npm install
    ```
4.  **Set up your environment variables:**
    -   Create a new file named `.env` in the root of your project.
    -   Add your WeatherAPI.com API key to this file. This is a critical security step to ensure your keys are not committed to version control.
        ```
        VITE_WEATHER_API_KEY=your_weatherapi_com_key_here
        ```

### Available Scripts

-   **To run the app in development mode:**
    ```
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

-   **To build the app for production:**
    ```
    npm run build
    ```

-   **To run the tests:**
    ```
    npm run test
    ```

---

## 🏗️ Architectural Decisions & Design Choices

This project was architected with scalability, maintainability, and user experience as top priorities.

1.  **State Management (Redux Toolkit):**
    -   Redux Toolkit was chosen for its robust and predictable state management capabilities.
    -   `createAsyncThunk` centralizes all API fetching logic, including pending, fulfilled, and rejected states, keeping components clean and focused on the UI.
    -   Selectors (`selectWeatherData`, etc.) are used to decouple the UI from the state structure, making the codebase easier to refactor in the future.

2.  **Error Handling & Network Resilience:**
    -   The `weatherAPI.js` service was architected to be resilient. It intelligently distinguishes between permanent **client errors** (like a `400 Bad Request` for an invalid city) and temporary **server errors** (like a `503`).
    -   It employs a "fail-fast" strategy for client errors to provide immediate user feedback, while implementing an exponential backoff retry mechanism for server errors. This ensures a robust and efficient experience.

3.  **Handling `React.StrictMode`:**
    -   The initial data fetch is managed within a `useEffect` hook that includes a proper **cleanup function**. This prevents race conditions and duplicate API calls caused by `StrictMode`'s double-mounting behavior in development, demonstrating a deep understanding of the React component lifecycle.

4.  **User Experience (UX) Enhancements:**
    -   A **Loading Skeleton** is used instead of a generic spinner. This improves "perceived performance" by showing the user the shape of the content before it arrives, which feels faster and more modern.
    -   **Toast notifications** provide non-intrusive feedback, keeping the user informed without disrupting their workflow.

5.  **Component Structure & Styling:**
    -   A hybrid styling approach was used: **Tailwind CSS** for rapid development and **CSS Modules** (`WeatherCard.module.css`) for component-scoped, complex styles that would be cumbersome to manage with utility classes alone.

6.  **Custom Hooks (`useWeatherNotifications.jsx`):**
    -   Logic for handling side effects (like showing toast notifications) was abstracted into a custom hook. This keeps the main `App.jsx` component cleaner and adheres to the principle of separation of concerns.

---

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

Thank you for the opportunity and for taking the time to review my project!
