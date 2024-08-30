
# Calendar Application

## Overview

This project is a calendar application built using TypeScript, React, and Tailwind CSS. It provides a user-friendly interface for navigating and interacting with dates in a calendar view. Users can switch between day, week, and month views, and use a date picker to select and reset dates.

## Features

- **Day, Week, and Month Views**: Users can switch between different calendar views on the same page.
- **Date Navigation**: Navigate to previous and next months or years.
- **Date Selection**: Click on dates to select them.
- **Today Button**: Reset the calendar to the current month.
- **Highlight Current Date**: The current date is highlighted in the calendar.
- **Separate Controls**: The "Today" button is separated from navigation controls for better usability.

## Tech Stack

- **TypeScript**: A typed superset of JavaScript that provides type safety and better development tooling.
- **React**: A popular JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for building custom designs quickly.

## Installation

To get started with the project, follow these steps:

1. **Clone the Repository**:

   ```
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install Dependencies**:

   ```
   npm install
   ```

3. **Start the Development Server**:

   ```
   npm run dev
   ```

   This will start the development server and open the application in your default browser.

## Usage

### Date Picker Component

The `DatePicker` component allows users to:

- Navigate to previous or next months and years.
- Select a date by clicking on it.
- Reset the calendar to the current month using the "Today" button.

### Calendar Layout

- **Header**: Contains navigation buttons for changing months and years.
- **Days of the Week**: Displayed at the top of the calendar.
- **Days Grid**: Shows the days of the current month, including days from the previous and next months if necessary.

## Development

### Adding New Features

1. **Update the `DatePicker` Component**:
   - Implement additional functionality or UI changes in the `DatePicker.tsx` file.

2. **Update Styles**:
   - Modify or add new styles in `styles/tailwind.config.js` or within the component-specific CSS classes.

3. **Testing**:
   - Ensure new features are covered by tests. Add or update tests as needed.

### Running Tests

To run the tests, use:

```
npm run test
```

This will execute the test suite and display the results.

## Contributing

If you'd like to contribute to the project:

1. **Fork the Repository**.
2. **Create a New Branch**:
   ```bash
   git checkout -b feature-branch
   ```
3. **Make Your Changes**.
4. **Submit a Pull Request**.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- **React**: [React Documentation](https://reactjs.org/docs/getting-started.html)
- **Tailwind CSS**: [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- **Moment.js**: [Moment.js Documentation](https://momentjs.com/docs/)
```

This updated `README.md` includes the installation commands clearly outlined for easy reference. Adjust `<repository-url>` and `<repository-directory>` with your actual repository details.