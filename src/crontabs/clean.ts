import Crontab from "@/crontab"

import logger from "@/globals/logger"

export default new Crontab()
	.cron("*/1 * * * * *")
	.listen(async (ctx) => {
		logger()
			.text("Running clean crontab")
	})