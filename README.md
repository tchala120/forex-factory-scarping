# Forex Factory Calendar Scraper

A Playwright-based web scraper for extracting economic calendar data from Forex Factory and exporting it to CSV format.

## Features

- **Automated Web Scraping**: Uses Playwright to scrape Forex Factory's economic calendar
- **CSV Export**: Automatically exports scraped data to CSV files
- **Flexible Filtering**: Filter events by impact level (High/Medium/Low) or currency
- **Date Range Support**: Scrape data for specific months or current calendar
- **Robust Error Handling**: Gracefully handles empty calendars and missing data

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

### Basic Scraping

The fixture provides several methods to scrape and save calendar data:

```typescript
import { test, expect } from './src/fixtures/forex-factory.fixture';

test('scrape current calendar', async ({ forexFactory }) => {
  // Simple scrape and save
  const filePath = await forexFactory.scrapeAndSave();
  console.log(`Data saved to: ${filePath}`);
});
```

### Advanced Usage

```typescript
test('advanced scraping with filters', async ({ forexFactory }) => {
  // Navigate to calendar
  await forexFactory.navigateToCalendar();
  
  // Get all events
  const allEvents = await forexFactory.getCalendarData();
  
  // Filter high impact USD events
  const highImpactEvents = await forexFactory.filterEventsByImpact(allEvents, 'High');
  const usdEvents = await forexFactory.filterEventsByCurrency(highImpactEvents, ['USD']);
  
  // Save filtered data
  await forexFactory.saveToCSV(usdEvents, 'usd-high-impact.csv');
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

## Examples

Check `src/tests/forex-factory.spec.ts` for comprehensive examples of:

- Basic calendar scraping
- Date-specific scraping
- Impact level filtering
- Currency filtering
- Error handling

## Notes

- The scraper respects Forex Factory's structure and waits for elements to load
- All scraped data is properly escaped for CSV format
- The fixture automatically creates the output directory if it doesn't exist
- Tests include proper error handling for edge cases 