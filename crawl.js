const jsdom = require("jsdom");
const { JSDOM } = jsdom;


const normalizeURL = (input_URL)  => {
    if (!input_URL || typeof input_URL !== 'string') {
        throw new WrongParameterError();
    }

    const fullPath = new URL(input_URL.trim().toLowerCase());
    if (!fullPath.protocol || (fullPath.protocol !== 'http:' && fullPath.protocol !== 'https:')) {
        throw new WrongProtocolError();
    }

    if (!fullPath.pathname) {
        throw new InvalidPathname();
    }

    let return_url = `${fullPath.hostname}${fullPath.pathname}`;
    if (return_url.length > 0 && return_url.slice(-1) === '/') {
        return_url = return_url.slice(0, -1);
    }

    return return_url;
}


function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const aElements = dom.window.document.querySelectorAll('a')
    for (const aElement of aElements){
      if (aElement.href.slice(0,1) === '/'){
        try {
          urls.push(new URL(aElement.href, baseURL).href)
        } catch (err){
          console.log(`${err.message}: ${aElement.href}`)
        }
      } else {
        try {
          urls.push(new URL(aElement.href).href)
        } catch (err){
          console.log(`${err.message}: ${aElement.href}`)
        }
      }
    }
    return urls
  }


const crawlPage = async (rootURL, currentURL, pages)  => {

    try {
        const response = await fetch(rootURL)
        if (response.status > 399){
            throw new Error(`Failed to fetch html of webpage, HTTP error: ${response.status}`)
            return
        }
        
        const contentType = response.headers.get('content-type')

        if ((!contentType) || !contentType.includes('text/html')){

            throw new Error(`Response is non-HTML: ${contentType}`)
            return
        }   

        const html_body = await response.text()
        console.log(html_body)
        
    } catch (error) {
        console.error('Error:', error)
        throw error
        
    }
  }







// Error handling classes
class InvalidPathname extends Error {
    constructor(message = 'Invalid Path') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class EmptyURLError extends Error {
    constructor(message = 'URL must be non-empty') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class WrongProtocolError extends Error {
    constructor(message = 'Incorrect Protocol used') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

class WrongParameterError extends Error {
    constructor(message = 'URL must be of type String') {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
    }
}

module.exports = {
    normalizeURL, crawlPage
};
