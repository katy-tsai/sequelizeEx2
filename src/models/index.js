var Sequelize = require('Sequelize');

var sequelize = new Sequelize('cecDB','root','admin',{
  host:'localhost',
  dialect:'mysql',
  pool:{
    max:5,
    min:0,
    idle:10000
  }
});

var models = [
  'UIsettings',
  'Project',
  'WorkItem',
  'ProjectItems'
];

models.forEach(function(model){
  module.exports[model] = sequelize.import(__dirname+'/'+model)
});

(function(m){
  m.Project.hasMany(m.ProjectItems);
  m.ProjectItems.belongsTo(m.Project);
  m.ProjectItems.belongsTo(m.ProjectItems,{foreignKey:'parent'});
})(module.exports);

sequelize.sync();
module.exports.sequelize = sequelize;
