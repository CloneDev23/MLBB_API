__path = process.cwd()
const express = require('express');
const router = express.Router();

// Scrapernya
const { herodetails } = require(__path + '/plugin/herodetail')
const { herolist } = require(__path + '/plugin/herolist')

router.get('/', (req, res) => {
    res.status(200).json({
    	status: false,
    	message: "Sorry, the page you are looking for doesn't exist",
      feature: {
        	herodetail: "https://" + req.hostname + "/herodetail?query=Zilong",
                herolist: "https://" + req.hostname + "/herolist"
      }
})
})

router.get('/herodetail', async (req, res, next) => {
     const query = req.query.query;
           
     herodetails(query).then(result => {
        res.status(200).send({result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
router.get('/herolist', async (req, res, next) => {
     const query = req.query.query;
           
     herolist(query).then(result => {
        res.status(200).send({result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Internal Server Error'
        })
    });
})


module.exports = router
