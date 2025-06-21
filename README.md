# Forex Factory Calendar Scraper

A specialized Playwright-based web scraper designed to extract economic calendar data from Forex Factory on a monthly basis and store it as CSV files for analysis and historical data collection.

## Purpose

This project automates the collection of Forex Factory's economic calendar events, allowing you to:

- **Monthly Data Collection**: Scrape calendar data for specific months to build historical datasets
- **CSV Storage**: Store all economic events in structured CSV format for easy analysis
- **Automated Data Extraction**: Remove manual work of copying calendar data from the website
- **Structured Data Format**: Convert web data into clean, analyzable CSV files with consistent columns

## Key Features

- **Monthly Scraping**: Target specific months (YYYY-MM format) for focused data collection
- **CSV Export**: Automatically save scraped data to organized CSV files in output/ directory
- **Complete Event Data**: Extract time, currency, impact level, event name, actual/forecast/previous values
- **Flexible Filtering**: Filter by impact level (High/Medium/Low) or specific currencies
- **Reliable Automation**: Built with Playwright for robust web scraping with proper wait handling

## Installation

First, install the dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

## Usage

### Monthly Data Collection

The primary use case is collecting calendar data for specific months:

```typescript
import { test, expect } from './src/fixtures/forex-factory.fixture';

test('scrape January 2024 calendar data', async ({ forexFactory }) => {
  // Scrape specific month and save to CSV
  const filePath = await forexFactory.scrapeAndSave('2024-01', 'january-2024-calendar.csv');
  console.log(`January 2024 data saved to: ${filePath}`);
});
```

### Building Historical Dataset

```typescript
test('collect multiple months of data', async ({ forexFactory }) => {
  const months = ['2024-01', '2024-02', '2024-03'];
  
  for (const month of months) {
    // Scrape each month and save to separate CSV files
    const filePath = await forexFactory.scrapeAndSave(month, `calendar-${month}.csv`);
    console.log(`${month} data saved to: ${filePath}`);
  }
});
```

### Current Month Collection

```typescript
test('scrape current month calendar', async ({ forexFactory }) => {
  // Get current month data
  const filePath = await forexFactory.scrapeAndSave();
  console.log(`Current month data saved to: ${filePath}`);
});
```

## Available Methods

### `ForexFactoryFixture`

- **`navigateToCalendar(date?: string)`**: Navigate to the calendar page (optionally for a specific month)
- **`getCalendarData()`**: Extract all calendar events from the current page
- **`saveToCSV(data, filename?)`**: Save event data to a CSV file
- **`scrapeAndSave(date?, filename?)`**: Combined method to scrape and save in one call
- **`filterEventsByImpact(events, impact)`**: Filter events by impact level
- **`filterEventsByCurrency(events, currencies)`**: Filter events by currency codes

### Data Structure

Each calendar event contains:

```typescript
interface CalendarEvent {
  time: string;       // Event time
  currency: string;   // Currency code (USD, EUR, etc.)
  impact: string;     // Impact level (High, Medium, Low)
  event: string;      // Event description
  actual: string;     // Actual value (if available)
  forecast: string;   // Forecasted value (if available)
  previous: string;   // Previous value (if available)
  date: string;       // Event date
}
```

## Running Tests

Run all tests:

```bash
npx playwright test
```

Run specific test file:

```bash
npx playwright test src/tests/forex-factory.spec.ts
```

Run tests in headed mode (visible browser):

```bash
npx playwright test --headed
```

## Output

CSV files are saved to the `output/` directory with the following format:

```csv
Date,Time,Currency,Impact,Event,Actual,Forecast,Previous
"Jan 15","8:30 AM","USD","High","Non-Farm Payrolls","250K","245K","248K"
```

## Data Collection Examples

The project includes comprehensive test examples in `src/tests/forex-factory.spec.ts`:

- **Monthly Data Scraping**: Collect calendar data for specific months (2024-01, 2024-02, etc.)
- **Historical Dataset Building**: Automate collection of multiple months of data
- **CSV File Organization**: Save data with descriptive filenames like `calendar-2024-01.csv`
- **Current Month Collection**: Get the most recent calendar data
- **Data Filtering**: Extract only high-impact events or specific currencies for focused analysis

## CSV Output Structure

Each generated CSV file contains economic calendar events with these columns:

- **Date**: Event date from the calendar
- **Time**: Scheduled event time
- **Currency**: Currency code (USD, EUR, GBP, etc.)
- **Impact**: Event impact level (High, Medium, Low)
- **Event**: Description of the economic event
- **Actual**: Actual released value (if available)
- **Forecast**: Forecasted value (if available)
- **Previous**: Previous period value (if available)

## Use Cases

- **Economic Analysis**: Build datasets for backtesting trading strategies
- **Research Projects**: Collect historical economic event data for academic research
- **Data Archival**: Create local backups of Forex Factory calendar data
- **Automated Reporting**: Generate monthly economic event summaries 