const models = require('./models');
const ProjectItems = models.ProjectItems;
const treeData = require('./util/TreeData');
const ItemsDao = require('./ItemsDao');
var _ = require('lodash');
ItemsDao.getTreeItems(1,function(tree){
   console.log( tree._root.children);
  var selectNode = tree._root.children[0];
    tree._root.children[0].data.hasChild="Y";
    tree._root.children[0].data.order = 6;
    var data = {
      "item":"node-c",
      "hasChild":"N",
      "order":"1",
      "type":"node",
      "ProjectId":1,
      "parent":selectNode.data.id
    }
    //add (子節點，母節點attr，tree.traverseDF,attr)
    tree.add(data,selectNode.data.id,tree.traverseDF,"id");
    var deletNote = selectNode.children[0];
    //remove(子節點attr，母節點attr，tree.traverseDF,attr)
    tree.remove(deletNote.data.id,selectNode.data.id,tree.traverseDF,"id");

    ItemsDao.crudTree(tree,1,function(result){
      console.log(result)
    })


});
// var projectItems =ProjectItems.build();
// projectItems.getAllByProjectId({ProjectId:1},function(results){
//   var items =results.map(function(obj){
//     return obj.get();
//   });
//   console.log(items)
// },function(err){
//   console.log(err)
// })

// function getItemsByProjectId(prijectId,callback){
//   var projectItems =ProjectItems.build();
//   projectItems.getAllByProjectId({ProjectId:prijectId},function(results){
//     var projectItems =results.map(function(obj){
//       return obj.get();
//     })
//     callback(projectItems)
//
//   },function(err){
//     console.log(err)
//   })
// }
//
// getItemsByProjectId(1,function(results){
//   var  tree = treeData.init(results);
//   var selectNode = tree._root.children[0];
//   tree._root.children[0].data.hasChild="Y";
//   var data = {
//     "item":"node-b",
//     "hasChild":"N",
//     "order":"0",
//     "type":"node",
//     "ProjectId":1,
//     "parent":selectNode.data.id
//   }
//
//   tree.add(data,selectNode.data.id,tree.traverseDF,"id");
//   console.log(tree._root.children[0].children);
// })
