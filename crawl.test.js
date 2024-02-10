const { test, expect, describe } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

/*

    https://blog.boot.dev/path/
    https://blog.boot.dev/path
    http://blog.boot.dev/path/
    http://blog.boot.dev/path
    // blog.boot.dev/path


*/

describe('URL parse testing', () => {
    // Checking if the URL is empty
    test('throws an error if the URL is empty', () => {
        expect(normalizeURL('')).toThrow('URL must be non-empty')
        expect(normalizeURL(' ')).toThrow('URL must be non-empty')
        expect(normalizeURL(null)).toThrow('URL must be non-empty')
    })
    // check if the URL has whitespace, and if so, treat it as a valid URL
    test('Treat URL with whitespace as a valid URL', () => {
        expect(normalizeURL(' https://blog.boot.dev/path/ ')).toBe('blog.boot.dev/path')
    })

    test('Throw error if unsupported protocol is used', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('fttp://blog.boot.dev/path/')).toThrow('Incorrect Protocol used')
        expect(normalizeURL('fps://blog.boot.dev/path/')).toThrow('Incorrect Protocol used')
    })

    test('Confirm that a URL with upper case or a mix of upper and lower case still is valid', () =>{
        expect(normalizeURL('https://bLog.BoOt.Dev/Path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('http://bLoG.BoOt.Dev/Path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('https://BLOG.BOOT.DEV/PATH/')).toBe('blog.boot.dev/path')
    })

})


describe('URL type check', () => {
    expect(normalizeURL('https://blog.boot.dev/path/').toBeInstanceOf(String))
    
} )