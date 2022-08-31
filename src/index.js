var omneedia;

function el(id) {
    return document.querySelector(id);
}

function load() {
    console.log('load');
    console.log(el('ul'));
    el('ul').innerHTML = '';
    omneedia = window.omneedia.createClient(env.OMNEEDIA_URL, env.OMNEEDIA_KEY);
    /** subsribe to table newscontent */
    omneedia
        .from('newsheader')
        .select()
        .then(function(r) {
            if (!r.data) return alert("Can't connect to database");
            for (var i = 0; i < r.data.length; i++) {
                el(
                    'ul'
                ).innerHTML += `<li class="list-group-item" id="item_${r.data[i].id}">${r.data[i].newstitle}</li>`;
            }
            console.log(r.data);
        })
        .catch(function(e) {
            alert("Can't connect to database");
        });
    omneedia
        .from('newsheader')
        .on('UPDATE', function(v) {
            console.log('updated');
            console.log(v);
            console.log(v.new.id);
            el('#item_' + v.new.id).innerHTML = v.new.newstitle;
        })
        .on('DELETE', function(v) {
            console.log('deleted');
            console.log(v);
            el(`#item_${v.old.id}`).remove();
        })
        .on('INSERT', function(v) {
            console.log('insert');
            console.log(v);
            el('ul').innerHTML += `<li id="item_${v.new.id}">${v.new.newstitle}</li>`;
        })
        .subscribe(function(change) {
            console.log('change');
            console.log(change);
        });
}

window.addEventListener('load', load);