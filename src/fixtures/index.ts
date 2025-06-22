import { test as base } from '@playwright/test'

import { ForexFactory } from './forex-factory'

interface Fixtures {
	forexFactory: ForexFactory
}

export const test = base.extend<Fixtures>({
	forexFactory: async ({ page }, use) => {
		const forexFactory = new ForexFactory(page)

		await forexFactory.navigateToCalendar()
		await forexFactory.changeTimezone()

		await use(forexFactory)
	},
})
