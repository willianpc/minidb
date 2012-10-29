minidb
======

A simple wraper for local/session storage DOM API management

How to use it
------------------------------

minidb.STORAGE_TYPE.ACTION

Where..

 - STORAGE_TYPE = local or session
 - ACTION
        selectAll/all
        select/get
        insert/set
        remove/del

Examples:

minidb.local.set('name', 'Willian');
minidb.local.get('name'); //give you "Willian"

minidb.session.set('userData', {id:333, name: 'Joseph'});
minidb.local.get('userData'); //gives you nothing
minidb.session.get('userData'); //gives you {id:333, name: 'Joseph'}

