const ItemsDao = require('./ItemsDao');


var projectItem1 = {
  "item":"aaa",
  "hasChild":"N",
  "order":"2",
  "type":"root",
  "ProjectId":1
}

var projectItem2 = {
  "item":"test2",
  "hasChild":"N",
  "order":"4",
  "type":"root",
  "ProjectId":1
}

var items = [projectItem1,projectItem2];

ItemsDao.createOrUpdateList(items,function(results){
  console.log(results);
})
