var express = require('express');
const generateUniqueId = require("generate-unique-id");
var router = express.Router();


/* /cats*/
router.route('/')
    .get( (req, res, next) => {
        console.log("Someone wants to receive all the cats ! ")
        res.json({
            success: true,
            error: null,
            data: [
                {
                    id: generateUniqueId(),
                    breed: "Siamois",
                    price: 5000
                }, {
                    id: generateUniqueId(),
                    breed: "Persian",
                    price: 3000
                }
            ]
        })
    })
    .post(((req, res, next) => {
        res.send("Someone wants to add a cat !")
    }))



/* /cats/:catId */
router.route('/:catId')
    .get( (req,res,next)=>{
        let catId = req.params.catId
        res.render('cats' , {name : "Cesar" , price : 4000 , id : catId})
    })
    .delete( (req,res,next)=>{
        let catId = req.params.catId
        res.send(`The cat with the id = ${catId} is deleted succesfully`)
    })
    .patch( (req,res,next)=>{
        let catId = req.params.catId
        res.send(`The cat with the id = ${catId} is updated succesfully`)
    })

// /cats/deadOnes
// router.use("/deadOnes", deadCats.js)




module.exports = router;
