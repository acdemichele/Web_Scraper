const { test, expect, describe } = require('@jest/globals')
const { normalizeURL, EmptyURLError, WrongProtocolError } = require('./crawl.js')

describe('URL parse testing', () => {
    // Checking if the URL is empty
    test('throws an error if the URL is empty', () => {
        expect(() => normalizeURL('')).toThrow(EmptyURLError)
        expect(() => normalizeURL(' ')).toThrow(EmptyURLError)
        expect(() => normalizeURL(null)).toThrow(EmptyURLError)
      
        expect(() => normalizeURL('None')).toThrow(EmptyURLError)
    })

    // check if the URL has whitespace, and if so, treat it as a valid URL
    test('Treat URL with whitespace as a valid URL', () => {
        expect(normalizeURL(' https://blog.boot.dev/path/ ')).toBe('blog.boot.dev/path')
    })

    test('Throw error if unsupported protocol is used', () => {
        expect(normalizeURL('https://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('http://blog.boot.dev/path/')).toBe('blog.boot.dev/path')
        expect(() => normalizeURL('fttp://blog.boot.dev/path/')).toThrow(WrongProtocolError)
        expect(() => normalizeURL('fps://blog.boot.dev/path/')).toThrow(WrongProtocolError)
    })

    test('Confirm that a URL with upper case or a mix of upper and lower case still is valid', () =>{
        expect(normalizeURL('https://bLog.BoOt.Dev/Path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('http://bLoG.BoOt.Dev/Path/')).toBe('blog.boot.dev/path')
        expect(normalizeURL('https://BLOG.BOOT.DEV/PATH/')).toBe('blog.boot.dev/path')
    })
})

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })