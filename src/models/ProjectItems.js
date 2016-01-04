module.exports = function(sequelize,DataTypes){
  var ProjectItems =sequelize.define('ProjectItems',{
    item:DataTypes.STRING(180),
    unit:DataTypes.STRING(5),
    contractNum:DataTypes.FLOAT(19,3),
    contractPrice:DataTypes.FLOAT(19,2),
    contractCheckPrice:DataTypes.FLOAT(19,0),
    contractRate:DataTypes.FLOAT(19,3),
    executeNum:DataTypes.FLOAT(19,3),
    executePrice:DataTypes.FLOAT(19,2),
    executeCheckPrice:DataTypes.FLOAT(19,0),
    executeRate:DataTypes.FLOAT(19,3),
    note:DataTypes.STRING(180),
    executeCompany:DataTypes.STRING(5),
    hasChild:DataTypes.STRING(1),
    order:DataTypes.INTEGER,
    type:DataTypes.STRING(10)
  },
   {tableName: 'projectItems',
   instanceMethods:{

     getAll:function(onSuccess,onError){
       ProjectItems.findAll().then(onSuccess).catch(onError);
     },
     getAllByProjectId:function(entity,onSuccess,onError){
      var projectId = entity.ProjectId;
      ProjectItems.findAll({where:{
        ProjectId:projectId
      }}).then(onSuccess).catch(onError);
    },
     createOrUpdate:function(onSuccess,onError){
        var entity = this.get();
        if(entity.id!=null){
          ProjectItems.update(entity,{where:{id:entity.id}}).then(function(){
            return Projects.findById(entity.id);
          }).then(onSuccess).catch(onError);
        }else{
          return ProjectItems.create(entity).then(onSuccess).catch(onError);
        }
      },
      bulkcrud:function(entity){
        if(entity.id!=null){
          return ProjectItems.update(entity,{where:{id:entity.id}}).then(function(){
            return ProjectItems.findById(entity.id);
          });
        }else{
          return ProjectItems.create(entity);
        }
      }
   }


  })

  return ProjectItems;
}
