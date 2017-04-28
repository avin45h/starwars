import Dispatcher from '../Dispatchers/Dispatcher'
import MicroEvent from 'microevent'

let localStorage = window.localStorage;


let Generator = function () {
    let store = JSON.parse((!window.localStorage.store || window.localStorage.store === "[object Object]") ? "{}" : window.localStorage.store);

    if (!store.loggedin) {
        localStorage.store = JSON.stringify({loggedin : false});
    }
    return this;
};

Generator.prototype = Object.create({});

Generator.prototype.store = function (data) {
    localStorage.store = JSON.stringify({loggedin : data.loggedin})
};

Generator.prototype.isLoggedin = function (data) {
    let store = JSON.parse(window.localStorage.store || "{}");
    return store.loggedin;
};

Generator.prototype.getLimit = function () {
    let store = JSON.parse(window.localStorage.store || "{}");
    return store.limit || null;
};

Generator.prototype.logSearch = function(){
    let store = JSON.parse(window.localStorage.store || "{}");
    if (!store.searches){
        store.searches = [];
    }
    store.searches.push(parseInt(+Date.now()/1000));
    localStorage.store = JSON.stringify(store);
};

Generator.prototype.isInLimit = function () {
    let sixtySecondsAgo = (parseInt(+Date.now()/1000) - 60);
    let store = JSON.parse(window.localStorage.store || "{}");
    let lastSixtyCount = 0;
    if (!store.limit || !store.searches || !store.searches.length){
        return true;
    }
    store.searches.map(function (ts) {
        if(ts > sixtySecondsAgo){
            console.log("Incrementing count as ts: ", ts, " is after", sixtySecondsAgo, "by", ts - sixtySecondsAgo);
            lastSixtyCount++;
        }
    });
    console.log("S->", store.limit, "Last ->", lastSixtyCount);
    return store.limit > lastSixtyCount;
};

MicroEvent.mixin(Generator);

let Store = new Generator();

Dispatcher.register(function (payload) {
    if (payload.actionName === 'login' && payload.loggedin) {
        let obj = {loggedin : true, searches: []};
        if (payload.limit){
            obj.limit = payload.limit;
        }
        localStorage.store = JSON.stringify(obj);
        Store.trigger('login');
    }

    if (payload.actionName === 'login' && !payload.loggedin) {
        localStorage.store = JSON.stringify({loggedin : false});
        Store.trigger('logout');
    }

    if( payload.actionName === 'logSearch'){
        Store.logSearch();
    }
});

export default Store;