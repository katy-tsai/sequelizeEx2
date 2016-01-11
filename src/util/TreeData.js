var Tree = require('./Tree.js');
var _ = require('lodash');
var tree;
var i =1;
var data;
module.exports = {
  init:init,
  initWithParentCode:initWithParentCode
};
function init(data){
  var tree = new Tree();
  data = data;
  var rootArray = _.sortBy(_.filter(data,{type:'root'}),'order');

  rootArray.map(function(root){
    tree.add(root,'project',tree.traverseDF,'item');
    addChild(root,data,'id',tree);
  })
  return tree;
}

function addChild(root,data,parent,tree){
  var childArray = _.sortBy(_.filter(data,{parent:root[parent]}),'order');

  if(childArray.length!=0){
    childArray.map(function(child){
       tree.add(child,root[parent],tree.traverseDF,parent);
       addChild(child,data,parent);
     });
  }
  i++;
}

function initWithParentCode(data,parent){
  var tree = new Tree();
  data = data;
  var rootArray = _.sortBy(_.filter(data,{type:'root'}),'order');
  rootArray.map(function(root){
    tree.add(root,'project',tree.traverseDF,'item');
    addChild(root,data,parent,tree);
  })

  return tree;
}
