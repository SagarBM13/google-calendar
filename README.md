# Calendar Application

## Overview

This project is a calendar application built using TypeScript,Next,React, and Tailwind CSS. It provides day, week, and month views, along with a calendar for selecting day and month-year on the left side. The application is designed with a non-scrollable header and week name section in the week view, and it uses a table layout for time and event slots.

## Features

- **Day, Week, and Month Views**: Switch between different views on the same page.
- **Calendar Navigation**: Navigate through months and years.
- **Reset to Today**: Option to reset the calendar view to the current day.
- **Dynamic Date Handling**: Uses `moment.js` to handle date manipulation and formatting instead of a datepicker library.

## Technologies

- **TypeScript**: For type safety and better development experience.
- **React**: For building the user interface components.
- **Tailwind CSS**: For utility-first CSS styling.
- **Moment.js**: For date manipulation and formatting.

## Installation

To get started with the project, follow these steps:

### Clone the Repository

```bash
git clone https://github.com/your-username/calendar-app.git
cd calendar-app
```

### Install Dependencies

Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Then run:

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Navigate to `http://localhost:3000` to see the application in action.

## Usage

### DatePicker Component

The `DatePicker` component is used for displaying and interacting with the calendar. Key features include:

- **Navigation Buttons**: Move to previous/next month and year.
- **Reset Button**: Resets the calendar to the current month.
- **Date Selection**: Click on a date to select it.

The `DatePicker` component is implemented using `moment.js` to handle all date-related functionalities. This approach eliminates the need for an external datepicker library, providing a streamlined and efficient solution.

## Contributing

Feel free to submit issues, feature requests, or pull requests. Please follow the standard Git workflow for contributing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

