const {Router} = require('express')
const router = Router()
const Group = require('../models/Group')

router.get('/', async (req,res) => {
    try {
        const group = await Group.find({})
        res.json(group)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router