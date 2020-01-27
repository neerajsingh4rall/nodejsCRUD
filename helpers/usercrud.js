const userCrud = {
    search(userObj){
        const store = require('../db/store');
        return store.userArr.find(obj=>obj.userid==userObj.uid && obj.password == userObj.pwd)?'Welcome'+" "+userObj.uid:'Invalid User';
    },
    add(obj){
        const store = require('../db/store');
        store.userArr.push(obj);
        console.log('Array is',store.userArr);
        return 'Record Added';
    },
    delete(userObj){
        const store = require('../db/store');
        store.userArr.find(obj=>obj.userid==userObj.uid && obj.password == userObj.pwd);
        return obj.userid = '';
    }
    
}
module.exports = userCrud;