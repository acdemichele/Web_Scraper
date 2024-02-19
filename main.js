const { argv } = require('node:process');
const { crawlPage } = require('./crawl.js')
const { printReport } = require('./report.js')
async function main(){


    // console.log(argv)
    let num_args = process.argv.length

    if (num_args < 3) {
        console.log('Error. Need 1 argument to proceed')
    } 
    if (num_args > 3){
        console.log('Error. Please enter only one argument')
    } 

    const baseURL = process.argv[2]
    console.log(`Web Crawler starting at ${baseURL}`)


    

    const pages = await crawlPage(baseURL, baseURL, {})
    

    printReport(pages)


 }

main()