



const printReport = (pages) =>{
      
    const sorted_report_list = Object.entries(pages).sort((a,b) => b[1]-a[1])
    for (const url_entry of sorted_report_list){
        console.log(`Found ${url_entry[1]} internal links to ${url_entry[0]}`)
    }
}

module.exports = {
    printReport
};