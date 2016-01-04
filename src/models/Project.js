var ProjectItems = require('./ProjectItems');

module.exports = function(sequelize,DataTypes){
   var Projects = sequelize.define('Project',{
        projectCode:DataTypes.STRING(20),
        projectName:DataTypes.STRING(180),
        projectAlias :DataTypes.STRING(50),
        projectLocation:DataTypes.STRING(500),
        owners:DataTypes.STRING(50),
        architect:DataTypes.STRING(50),
        company:DataTypes.STRING(5),
        note:DataTypes.STRING(180),
        startDate:DataTypes.DATE,
        completionDate:DataTypes.DATE,
        contractDate:DataTypes.DATE,
        buildingUse:DataTypes.STRING(5),
        structureType:DataTypes.STRING(5),
        buildingMethod:DataTypes.STRING(5),
        bracedExcavation:DataTypes.STRING(5),
        facades:DataTypes.STRING(5),
        undergroundArea:DataTypes.FLOAT(19,2),
        undergroundHeight:DataTypes.FLOAT(19,2),
        undergroundNum:DataTypes.INTEGER,
        dergroundArea:DataTypes.FLOAT(19,2),
        dergroundHeight:DataTypes.FLOAT(19,2),
        dergroundNum:DataTypes.INTEGER,
        roofArea:DataTypes.FLOAT(19,2),
        roofHeight:DataTypes.FLOAT(19,2),
        roofNum:DataTypes.INTEGER,
        baseArea:DataTypes.FLOAT(19,2),
        totalFloorArea:DataTypes.FLOAT(19,2),
        photoPath:DataTypes.STRING(100),
        pdfPath:DataTypes.STRING(100),
        creacteUser:DataTypes.STRING(50),
        writeUser:DataTypes.STRING(50),
        checkUser:DataTypes.STRING(50),
        isLock:DataTypes.STRING(2),
        status:DataTypes.STRING(2)
  },
   {tableName: 'project',
    instanceMethods:{

      getAll:function(onSuccess,onError){
        Projects.findAll({include: [{model:ProjectItems}]}).then(onSuccess).catch(onError);
      },

     getById:function(project_id,onSuccess,onError){
       var id = project_id;
       Projects.find({where:{id:id}},{raw:true}).then(onSuccess).catch(onError);
     },
      createOrUpdate:function(onSuccess,onError){
         var entity = this.get();
         if(entity.id!=null){
           Projects.update(entity,{where:{id:entity.id}}).then(function(){
             return Projects.findById(entity.id);
           }).then(onSuccess).catch(onError);
         }else{
           return Projects.create(entity).then(onSuccess).catch(onError);
         }
       }
    }
  }
);

return Projects;

}
