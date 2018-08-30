var express = require('express');
var router = express.Router();
const users = [
  {id: 1, name: 'Alice'},
  {id: 2, name: 'Bek'},
  {id: 3, name: 'Chris'}
]

/* GET users listing. */
/*
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.get('/', (req, res) => {
  console.log(req.query.limit);
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if(!Number.isNaN(limit)){
    res.json(users.slice(0, limit))
  } else {
    res.status(400).end()
  }
})


router.get('/:id', (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id, 10) //10진수로 스트링을 숫자로 변경
  const user = users.filter(user => user.id === id)[0]
  if(Number.isNaN(id)){
    res.status(400).end()
  }
  else if(user.length == 0){
    res.status(404).end()
  } else {
    res.json(user)
  }

})


module.exports = router;