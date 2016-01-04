const ItemsDao = require('./ItemsDao');


var projectItem1 = {
  "id":88,
  "item":"aaa",
  "hasChild":"N",
  "order":"2",
  "type":"root",
  "ProjectId":1
}

var projectItem2 = {
  "id":89,
  "item":"test2",
  "hasChild":"N",
  "order":"4",
  "type":"root",
  "ProjectId":1
}
var projectItem3 = {
  "id":90,
  "item":"aaa",
  "hasChild":"N",
  "order":"4",
  "type":"root",
  "ProjectId":1
}

var projectItem4 = {
  "item":"bbb",
  "hasChild":"N",
  "order":"3",
  "type":"root",
  "ProjectId":1
}
 var items = [projectItem1,projectItem4,projectItem3];
//ItemsDao.deleteIds(items,1);
ItemsDao.crud(items,1,function(results){
  console.log(results);
})
//
// ItemsDao.createOrUpdateList(items,function(results){
//   console.log(results);
// })
