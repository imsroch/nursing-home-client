# Geriatrico Neuquen Website

This website serves as the digital front for Geriatrico Neuquen, a local geriatric care facility in Buenos Aires. It provides comprehensive information about the services offered, staff qualifications, and facility amenities, and includes a contact form powered by EmailJS for direct communication.

## Features

- Service Overview: Detailed descriptions of the care and services provided, including long-term stays, rehabilitation services, and specialized care plans.
- Staff Profiles: Introductions to the qualified and compassionate team members who provide care and support.
- Contact Form: Integrated with EmailJS, allowing visitors to easily inquire or communicate with the facility’s administration.
- Assessment Form (`/formulario`): Questionnaire that saves responses to a Google Sheet via Apps Script.

## Tech Stack

- TypeScript: Used for writing scalable and maintainable code.
- Tailwind CSS: Provides a utility-first approach to styling, facilitating a responsive and modern design that enhances the user experience.
- EmailJS: Enables seamless email integration, allowing the facility to receive messages directly from the website without the need for a backend server.
- Google Sheets: Stores `/formulario` submissions (exportable as Excel).

## Installation

Clone nursing-home-client

```bash
  git clone https://github.com/imsroch/nursing-home-client.git
```

Install the packages

```bash
  npm install
```

Copy env and add your Apps Script Web App URL (see `scripts/google-apps-script.js`):

```bash
  cp .env.example .env.local
```

Run the site

```bash
  npm run dev
```

Open `http://localhost:5173/formulario` to use the assessment form.
