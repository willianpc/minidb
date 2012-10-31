'use strict';

;var minidb = (function(d, w, undefined) {

    var local, session;

    function all() {
        var result = {}, obj, k, arrResult = [];
        

        for(var i=0; i < this.type.length; i++) {
            k = this.type.key(i);

            try {
                obj = JSON.parse(this.type.getItem(k));
            } catch(err) {
                obj = this.type.getItem(k);
            }
            arrResult.push(obj);
            result[k] = obj;
        }
        
        result.toArray = function() {
            return arrResult;
        };
        
        return result;
    }

    function get(k) {
        var obj;

        try {
            obj = JSON.parse(this.type.getItem(k));
        } catch(err) {
            obj = this.type.getItem(k);
        }
        return obj;
    }

    function insert(id, data) {
        if(typeof(data) === 'object') {
            data = JSON.stringify(data);
        }

        this.type.setItem(id, data);
        return id;
    }
    
    function remove(id) {
        this.type.removeItem(id);
    }

    var tmp = {
        selectAll: all,
        all: all,
        select: get,
        get: get,
        insert: insert,
        set: insert,
        remove: remove,
        del: remove
    };
    
    local = Object.create(tmp);
    local.type = localStorage;
    
    session = Object.create(tmp);
    session.type = sessionStorage;
    
    return {
        session: session,
        local: local
    };
})(document, window);
