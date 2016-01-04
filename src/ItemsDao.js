var Q = require('q');
const modeles = require('./models');
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
  }

}
