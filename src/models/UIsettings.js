module.exports = function(sequelize,DataTypes){
  return sequelize.define('UIsetting',{
    type:DataTypes.STRING,
    code:DataTypes.STRING,
    text:DataTypes.STRING
  })
}
