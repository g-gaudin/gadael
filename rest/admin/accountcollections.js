'use strict';

var ctrlFactory = require('restitute').controller;


function listController() {
    ctrlFactory.list.call(this, '/rest/admin/accountcollections');
    
    this.controllerAction = function() {
        this.jsonService(this.service('admin/accountcollections/list'));
    };
}
listController.prototype = new ctrlFactory.list();


function getController() {
    ctrlFactory.get.call(this, '/rest/admin/accountcollections/:id');
    
    this.controllerAction = function() {
        this.jsonService(this.service('admin/accountcollections/get'));
    };
}
getController.prototype = new ctrlFactory.get();


function save() {
    this.jsonService(this.service('admin/accountcollections/save'));
}

function createController() {
    ctrlFactory.create.call(this, '/rest/admin/accountcollections');
    this.controllerAction = save;
}
createController.prototype = new ctrlFactory.create();

function updateController() {
    ctrlFactory.update.call(this, '/rest/admin/accountcollections/:id');
    this.controllerAction = save;
}
updateController.prototype = new ctrlFactory.update();

function deleteController() {
    ctrlFactory.delete.call(this, '/rest/admin/accountcollections/:id');
    
    this.controllerAction = function() {
        this.jsonService(this.service('admin/accountcollections/delete'));
    };
}
deleteController.prototype = new ctrlFactory.delete();



exports = module.exports = {
    list: listController,
    get: getController,
    create: createController,
    update: updateController,
    delete: deleteController
};