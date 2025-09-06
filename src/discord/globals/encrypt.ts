import { string } from "@rjweb/utils"

import env from "@/globals/env"

const ENCRYPTION: Record<string, string> = env.ENCRYPTION as unknown as Record<string, string>

export function encrypt(data: string): string {
	let result = data
	for (const [algorithm, secret] of Object.entries(ENCRYPTION)) {
		result = string.encrypt(result, secret, { algorithm, output: 'hex' })
	}
	return result
}

export function decrypt(data: string): string {
	let result = data
	const entries = Object.entries(ENCRYPTION)
	for (let i = entries.length - 1; i >= 0; i--) {
		const [algorithm, secret] = entries[i]
		result = string.decrypt(result, secret, { algorithm, input: 'hex' })
	}
	return result
}