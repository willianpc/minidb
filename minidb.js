'use strict';

;var minidb = (function(document, window, undefined) {

    //Object.create polyfill
    if (!Object.create) {
        Object.create = function (o) {
            if (arguments.length > 1) {
                throw new Error('Object.create implementation only accepts the first parameter.');
            }
            function F() {}
            F.prototype = o;
            return new F();
        };
    }

    //make it work on IE < 8
    if (!window.localStorage) {
      window.localStorage = {
        getItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
          return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
          return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
          if(!sKey) { return; }
          document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
          this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
          this.length--;
        },
        hasOwnProperty: function (sKey) {
          return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
      };
      window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
      
      window.sessionStorage = Object.create(window.localStorage);
      window.sessionStorage.setItem = function (sKey, sValue) {
          if(!sKey) { return; }
          document.cookie = escape(sKey) + "=" + escape(sValue) + "; path=/";
          this.length = document.cookie.match(/\=/g).length;
      };
        
      window.sessionStorage.removeItem = function (sKey) {
          if (!sKey || !this.hasOwnProperty(sKey)) { return; }
          document.cookie = escape(sKey) + "=; path=/";
          this.length--;
      };
      
      window.sessionStorage.length = (document.cookie.match(/\=/g) || window.sessionStorage).length;

      
    }

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
            return arrResult.slice();
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
    
    function size() {
        return this.type.length;
    }

    var tmp = {
        selectAll: all,
        all: all,
        select: get,
        get: get,
        insert: insert,
        set: insert,
        remove: remove,
        del: remove,
        size: size,
        length: length
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
