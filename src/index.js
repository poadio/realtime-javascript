var omneedia;

function load() {
    console.log('load');
    omneedia = window.omneedia.createClient(env.OMNEEDIA_URL, env.OMNEEDIA_KEY);
    /** subsribe to table newscontent */
    omneedia
        .from('newscontent')
        .on('UPDATE', function(v) {
            console.log('updated');
        })
        .on('INSERT', function(v) {
            console.log('insert');
        })
        .subscribe(function(change) {
            console.log('change');
        });
}

window.addEventListener('load', load);