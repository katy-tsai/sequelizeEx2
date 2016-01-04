module.exports = function(sequelize,DataTypes){
  return sequelize.define('WorkItem',{
    item:DataTypes.STRING(180),
    isDefault:DataTypes.STRING(1)
  },
   {tableName: 'workItem'})
}
