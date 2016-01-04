var Q = require('q');
const modeles = require('./models');
const _ = require('lodash');
const Project = modeles.Project;
const ProjectItems = modeles.ProjectItems;

module.exports = {
  setOrder:function(items){
  return items.map(function(item,index){
      item.order = index;
      return item;
    });
  },

  createOrUpdateList:function(items,callback){
    items = this.setOrder(items);
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
