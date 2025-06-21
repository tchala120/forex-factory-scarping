import type { Page } from '@playwright/test'

export type Month = 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec'

export class ForexFactory {
	private readonly baseURL = 'https://www.forexfactory.com/calendar'

	constructor(public readonly page: Page) {}

	async goto(month?: Month, year?: number) {
		const monthParam = this.computeMonthParam(month, year)

		const url = `${this.baseURL}?month=${monthParam}`

		await this.page.goto(url)
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
