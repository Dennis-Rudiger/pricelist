import { describe, it, expect } from 'vitest'
import { formatMoney } from './money'

describe('formatMoney', () => {
  it('formats KES by default', () => {
    const out = formatMoney(12.5)
    expect(out).not.toContain('$')
    expect(/(KSh|KES)/i.test(out)).toBe(true)
  })
})
