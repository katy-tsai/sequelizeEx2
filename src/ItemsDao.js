var Q = require('q');
const models = require('./models');
const _ = require('lodash');
const Project = models.Project;
const ProjectItems = models.ProjectItems;
const treeData = require('./util/TreeData');

module.exports = {
  getTreeItems:function(ProjectId,callback){
    var projectItems =ProjectItems.build();
    projectItems.getAllByProjectId({ProjectId:ProjectId},function(results){
      var items =results.map(function(obj){
        return obj.get();
      });
      var  tree = treeData.init(items);
      callback(tree);

    },function(err){
      console.log(err)
    })
  },
  setOrder:function(childrens){
  return childrens.map(function(item,index){
      item.order = index;
      return item;
    });
  },
  crudTree:function(tree,ProjectId,callback){
    var items = [];
     tree.traverseBFOrder(function(node){
       items.push(node.data);
     });
     items = _.drop(items);

     this.crud(items,ProjectId,callback);
  },
  createOrUpdateList:function(items,callback){
    var promises = [];
    for(var i in items){
      var item = items[i];
      var projectItems = ProjectItems.build(item);
      promises.push(projectItems.bulkcrud(item))
    }

    Q.all(promises).then(function (results){
      var newItems=[]
      results.map(function(obj,i){
        newItems.push(obj.get());
      })
      callback(newItems) ;

    }).catch(function(err){
      console.log(err);
    })
  },
  getItemIds:function(ProjectId,callback){
      var projectItems = ProjectItems.build();
      projectItems.getAllByProjectId({ProjectId:ProjectId},function(items){
        var itemIds = _.pluck(items,'id');
        callback(itemIds);
      },function(err){
        console.log(err);
      })
  },
  getDeleteIds:function(items,ProjectId,callback){
    var newIds = _.pluck(items,'id');
    this.getItemIds(ProjectId,function(originalIds){
      var deleteIts = _.difference(originalIds,newIds);
      callback(deleteIts);
    })
  },
  deleteIds:function(items,ProjectId,callback){
    var projectItems = ProjectItems.build();
    this.getDeleteIds(items,ProjectId,function(deleteIds){
      if(deleteIds.length>0){
        projectItems.bulkDestroy(deleteIds).then(callback);
      }
    })
  },
  crud:function(items,ProjectId,callback){
    this.deleteIds(items,ProjectId,this.createOrUpdateList(items,callback));
  }

}
