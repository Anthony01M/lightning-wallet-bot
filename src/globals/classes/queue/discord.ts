import logger from "@/globals/logger"

type Job<T = any> = {
	id: string
	guildId: string | null
	run: () => Promise<T>
	retries: number
}

class DiscordQueue {
	protected concurrency: number
	protected running = 0
	protected queues = new Map<string, Job[]>()
	protected globalQueue: Job[] = []
	protected stopped = false

	constructor(concurrency = Number(1)) {
		this.concurrency = Math.max(1, concurrency)
	}

	public enqueue<T = any>(job: { id?: string, guildId?: string | null, run: () => Promise<T>, retries?: number }) {
		const j: Job = {
			id: job.id ?? Math.random().toString(36).slice(2, 9),
			guildId: typeof job.guildId === 'undefined' ? null : job.guildId,
			run: job.run,
			retries: typeof job.retries === 'number' ? job.retries : 2
		}
		if (j.guildId) {
			const q = this.queues.get(j.guildId) ?? []
			q.push(j)
			this.queues.set(j.guildId, q)
		} else {
			this.globalQueue.push(j)
		}
		this.process().catch(() => undefined)
		return j.id
	}

	protected async process() {
		if (this.stopped) return
		if (this.running >= this.concurrency) return
		const next = this.nextJob()
		if (!next) return
		this.running++
		try {
			await next.run()
		} catch (err) {
			logger()
				.text('Discord Queue Job Error')
				.text('\n')
				.text((err as Error).stack ?? String(err), (c) => c.red)
				.error()
			if (next.retries > 0) {
				next.retries--
				setTimeout(() => {
					if (next.guildId) {
						const q = this.queues.get(next.guildId) ?? []
						q.unshift(next)
						this.queues.set(next.guildId, q)
					} else this.globalQueue.unshift(next)
					this.process().catch(() => undefined)
				}, 250)
			}
		} finally {
			this.running--
			setImmediate(() => this.process().catch(() => undefined))
		}
	}

	protected nextJob(): Job | undefined {
		for (const q of this.queues.values()) {
			if (q.length > 0) return q.shift()
		}
		return this.globalQueue.shift()
	}

	public size() {
		let s = this.globalQueue.length
		for (const q of this.queues.values()) s += q.length
		return s
	}

	public stop() {
		this.stopped = true
	}

	public start() {
		if (!this.stopped) return
		this.stopped = false
		this.process().catch(() => undefined)
	}
}

export default new DiscordQueue()