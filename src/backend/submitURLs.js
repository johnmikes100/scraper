/**

 * @param {string[]} urls - An array of URLs to be scraped.
 */
function submitURLs(urls) {
    console.log(urls + " sending")
    fetch('http://127.0.0.1:5000/scrape', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({ urls }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        downloadJSON(data, 'happy_hours.json');
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

function downloadJSON(jsonData, filename) {
    const jsonStr = JSON.stringify(jsonData, null, 4);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click(); 
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export { submitURLs };
