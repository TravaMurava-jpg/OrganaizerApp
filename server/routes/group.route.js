const {Router} = require('express')
const router = Router()
const Group = require('../models/Group')

router.post('/add', async (req,res) => {
    try {
     
        const {groupName, userId} = req.body

        const group = new Group({
            groupName : groupName,
            users: {userId: userId}
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
        const group = await Group.find({"users.userId": userId})
        res.json(group)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/delete/:id', async (req,res) => {
    try {
        const {id, userId} = req.body
        const filter = {_id: id, "users.userId" : userId}
        const group = await Group.findOneAndUpdate(filter, {$set: {"users.$.userId": null}})
        console.log(group)
        res.json(group)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router