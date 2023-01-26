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

router.put('/groups/:id', async (req,res) => {
    try {
        const {id, userId} = req.body
        
        const group = await Group.findOne({_id: id})
        group.users.push({userId: userId})
        await group.save()
        console.log(group)
        res.json(group)

    } catch (error) {
        console.log(error)
    }
})

module.exports = router