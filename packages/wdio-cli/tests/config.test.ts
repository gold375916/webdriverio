import { test, vi, expect } from 'vitest'
import { getAnswers } from '../src/utils.js'

vi.mock('node:fs/promises', () => ({
    default: {
        access: vi.fn().mockRejectedValue(new Error('ENOENT'))
    }
}))

test('runConfig with yes param', async () => {
    const answers = await getAnswers(true)
    expect(answers.backend).toEqual('On my local machine')
    expect(answers.baseUrl).toEqual('http://localhost')
    expect(answers.generateTestFiles).toBeTruthy()
    expect(answers.usePageObjects).toBeTruthy()
    expect(answers.framework).toEqual('@wdio/mocha-framework$--$mocha')
    expect(answers.specs).toEqual(expect.any(String))
})
