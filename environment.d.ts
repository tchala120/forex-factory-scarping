declare global {
	namespace NodeJS {
		interface ProcessEnv {
			/**
			 * Forex config
			 */

			MONTH?: 'jan' | 'feb' | 'mar' | 'apr' | 'may' | 'jun' | 'jul' | 'aug' | 'sep' | 'oct' | 'nov' | 'dec'
			YEAR?: number
			TIMEZONE?: string
		}
	}
}

export {}
