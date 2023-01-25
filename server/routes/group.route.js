const {Router} = require('express')
const router = Router()
const Group = require('../models/Group')

router.post('/add', async (req,res) => {
    try {
        console.log(req.body)
        const {groupName, userId} = req.body

        const group = new Group({
            groupName : groupName,
            users : [userId]
        })

        await group.save()

        res.json(group)


    } catch (error) {
        console.log(error)
    }
})

router.get('/', async (req,res) => {
    try {
        const {userId} = req.query
        console.log(userId)

        const group = await Group.find({ users: userId})

        res.json(group)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async (req,res) => {
    try {
        console.log(req.params.id)
        const group = await Group.findOneAndDelete({users: req.params.id})
        res.json(group)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router