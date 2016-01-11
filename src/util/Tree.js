const Queue = require('./Queue.src.js');
const _ = require('lodash');
function Node(data){
  this.data = data;
  this.parent = null;
  this.isOpen = true;
  this.children = [];
}

var Tree = function Tree(){
  var node = new Node({item:'project'});
  this._root = node;
}

Tree.prototype.addChild = function(data){
  var rootArray = _.sortBy(_.filter(data,{type:'root'}),'order');

  rootArray.map(function(root){
    this.add(root,'project',this.traverseBF,'item');
    addChild(root);

  })
}

Tree.prototype.traverseDF = function(callback){
  (function recurse(currentNode){

    for(var i=0,length = currentNode.children.length;i<length;i++){
      recurse(currentNode.children[i]);
    }
    callback(currentNode);
  })(this._root);
}

Tree.prototype.traverseBF = function(callback){
  var queue = new Queue();
  queue.enqueue(this._root);
  var currentTree = queue.dequeue();
  while(currentTree){
    for(var i=0,length=currentTree.children.length;i<length;i++){
      queue.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = queue.dequeue();
  }
}

Tree.prototype.traverseBFOrder = function(callback){
  var queue = new Queue();
  queue.enqueue(this._root);
  var currentTree = queue.dequeue();
  while(currentTree){
    for(var i=0,length=currentTree.children.length;i<length;i++){
      currentTree.children[i].data.order = i;
      queue.enqueue(currentTree.children[i]);
    }
    callback(currentTree);
    currentTree = queue.dequeue();
  }
}

Tree.prototype.contains = function(callback,traversal){
  traversal.call(this,callback);
}

Tree.prototype.add = function(data,toData,traversal,attr){
  var child = new Node(data);
  var parent = null;
  var callback = function(node){
    if(node.data[attr] === toData){
      parent = node;
    }
  }
  this.contains(callback,traversal);
  if(parent){
    parent.children.push(child);
    child.parent = parent;
  }else{
    throw new Error('Cannot add node to a non-existent parent.');
  }
}



Tree.prototype.remove = function(data,fromData,traversal,attr){
  var tree = this;
  var parent = null;
  var childToRemove =null;
  var index;
  var callback = function(node){
    if(node.data[attr] == fromData){
        parent = node;
    };
  }

  this.contains(callback,traversal);
  if(parent){
    console.log("===========parent===========",parent)
    index = findIndex(parent.children,data,attr);
    if(index === undefined){
      throw new Error('Node to remove does not exist.');
    }else{
      childToRemove = parent.children.splice(index,1);
    }
  }else{
    throw new Error('Parent does not exist.');
  }
  return childToRemove;
}

function findIndex(arr,data,attr){
  var index;
  for(var i=0;i<arr.length;i++){
    if(arr[i].data[attr]===data){
      index = i;
    }
  }
  return index;
}

module.exports = Tree;
