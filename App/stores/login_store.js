var AppDispatcher = require('../dispatcher/app-dispatcher');
var AppConstants = require('../constants/app-constants');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = "change";

var _loginData = {loggedIn: false, error: null};

function _submitUserandPassword(data){
	console.log('payload')
  console.log(data)
  // if (payload != null){
    if (data.username.length > 4 && data.password.length > 4){
     _loginData.loggedIn = true
    } else {
      _loginData.loggedIn = false
      _loginData.error = 'Your credentials suck'
    }
  console.log(_loginData)
  LoginStore.emitChange();
}

var LoginStore = merge(EventEmitter.prototype, {
  getAll: function() {
    return _loginData;
  },
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  dispatcherIndex:AppDispatcher.register(function(payload){
  	switch(payload.action.actionType){
  		case AppConstants.LOGIN_SUBMIT:
  			_submitUserandPassword(payload.action.data);
  		default:
  			return true;
  	}
  	LoginStore.emitChange()
  	return true;
  })
})

module.exports = LoginStore;