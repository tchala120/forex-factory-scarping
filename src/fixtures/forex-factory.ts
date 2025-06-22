import type { Page } from '@playwright/test'

export type Month = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec'

export class ForexFactory {
	constructor(public readonly page: Page) {}

	async navigateToCalendar() {
		const month = process.env.MONTH
		const year = process.env.YEAR

		const monthParam = this.computeMonthParam(month as Month, year)

		await this.page.goto(`/calendar?month=${monthParam}`)
	}

	async changeTimezone() {
		await this.page.goto(`/timezone`)

		await this.page.locator('select[name="timezone"]').selectOption('Asia/Bangkok')

		await this.page.getByText(/Save Settings/i).click()
	}

	private computeMonthParam(month?: Month, year?: number) {
		if (month == null) {
			return 'this'
		}

		if (year == null) {
			return month
		}

		return `${month}.${year}`
	}
}
