'use strict';

const models = require('../../models/db');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getAll = (req, res) => {
  let limit = 5;
  let page = 0;
  let direction = 'DESC';
  let sort = 'id';
  let filter = null;
  
  if(req.query.filter){
    filter = req.query.filter; 
  }
  if(req.query.pagesize){
    limit = parseInt(req.query.pagesize); 
  }
  if(req.query.page){
    page = parseInt(req.query.page);      
  }
  if(req.query.direction){
    direction = req.query.direction;
  }
  if(req.query.sort){
    sort = req.query.sort;
  }
  
  let offset = page * limit;

  if(filter){
    models.Job_Position.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, direction]],
      where: { [Op.or]: 
        [{code: {[Op.like]:'%'+filter+'%'}}, {desc: {[Op.like]:'%'+filter+'%' }}] 
      }
    })
    .then(Job_Positions => {
      res.status(200).json({'records': Job_Positions.rows, 'totalRecords':Job_Positions.count, 'numberOfPageRecords': limit});
    })
    .catch(error => {
      res.status(404).send('Internal Server Error:' + error);
    });
  }else{
    models.Job_Position.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort, direction]]
    })
    .then(Job_Positions => {
      let pages = Math.ceil(Job_Positions.count / limit);  
      res.status(200).json({'records': Job_Positions.rows, 'totalRecords':Job_Positions.count, 'totalPages': pages,
        'numberOfPageRecords': limit});
    })
    .catch(error => {
      res.status(404).send('Internal Server Error:' + error);
    });
  }
}; 

exports.findByPk = (req, res) => {
  let id = req.params.id;
 
  models.Job_Position.findByPk(id, {})
  .then(Job_Position => {
    res.json(Job_Position);
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
}

exports.create = (req, res) => {
  models.Job_Position.create(req.body)
    .then((Job_Position) => {
      res.send(Job_Position);
    })
    .catch(error => {
      console.log(error);
      res.status(404).send(error);
    })
}

exports.update = (req, res) => {
  let pId = req.params.id;

  models.Job_Position.update(req.body,{ where: {id: pId} } 
    ).then(()=> {
    res.status(200).send("data updated");
  })
  .catch(error => {
    console.log(error);
    res.status(404).send(error);
  })
}

exports.delete = (req, res) => {
  let pId = req.params.id;
  
  models.Job_Position.destroy({where: { id: pId }}).then(() => {
    res.status(200).send('data deleted');
  });
};

exports.changeStatus = (req, res) => {
  let id = req.params.id;

  models.Job_Position.update( { status: req.body.status }, { where: {id: id} })
  .then(() => {
    res.status(200).send("data updated");
   });
};
