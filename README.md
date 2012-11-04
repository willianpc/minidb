minidb
======

A simple wrapper for the local/session storage DOM API management

The API is now compatible to Internet Explorer 6~8

NOTE: If you do not need to worry about old browsers support, simply take off the polyfills from the script.

NOTE2: When using older browsers remember to import JSON api from https://github.com/douglascrockford/JSON-js

Special thanks to @zenorocha and @guipn

Live demo
--------------------------
http://wpsystem.com.br/minidb/

How to use it
------------------------------

minidb.STORAGE_TYPE.ACTION

**Where...**

* STORAGE_TYPE = local or session
* ACTION
 * selectAll/all
 * select/get
 * insert/set
 * remove/del
 * size/length

**Examples:**

minidb.local.set('name', 'Willian');

minidb.local.get('name'); //gives you "Willian"

minidb.session.set('userData', {id:333, name: 'Joseph'});

minidb.local.get('userData'); //gives you nothing

minidb.session.get('userData'); //gives you {id:333, name: 'Joseph'}

minidb.local.insert('someArray', [2, 3, 4, 5, 6, 'a string', {myObj: 'yay! an object'}]);

var someArray = minidb.local.select('someArray');

selectAll / all returns a key/value set of data.

If you do prefer an array instead of a set simply use **minidb.local.all().toArray();**
