import { describe, it, expect } from 'vitest'
import { formatMoney } from './money'

describe('formatMoney', () => {
  it('formats USD by default', () => {
    expect(formatMoney(12.5)).toContain('$')
  })
})
