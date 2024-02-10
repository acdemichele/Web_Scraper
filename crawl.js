

const normalizeURL = (url) => {
    
    
    // Solution without using the URL object from Node API

    // try {
    //     // split the URL by '//' to remove the protocol
    // const url_split_list = url.split('//')

    //     // extracting the parsed URL from the list
    // const url_without_protocol = url_split_list[1]  

    // // checking if there is a backslash at the end
    // if (url_without_protocol[url_without_protocol.length - 1] == '/'){
    //     const new_url = url_without_protocol.slice(0, url_without_protocol.length - 1)
    //     return new_url
    // }   
    // return url_without_protocol 

    // } catch (error) {
    //     console.log("There was an error parsing the URL", error)
    // }
    

    pass

}

// Error handling classes

class EmptyURLError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DivideByZeroError';
    }


}




module.exports = {

    normalizeURL
}