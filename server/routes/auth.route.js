const {Router} = require('express')
const router = Router()
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwtToken = require('jsonwebtoken')

router.post('/registration',
[
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').isLength({min: 6})
]
,
async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }
        const  { email, password } = req.body;
        const isUsed = await User.findOne({ email })

        if (isUsed){
            return res.status(300).json({message: "User with this email already exists"})
        }
        
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email, password: hashedPassword
        })

        await user.save()

        res.status(201).json({message: "User created"})

    } catch (error) {
        console.log(error)
    }
})

router.post('/login',
[
    check('email', 'Incorrect email').isEmail(),
    check('password', 'Incorrect password').exists()
]
,
async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Incorrect registration data'
            })
        }
        const  { email, password } = req.body;
        
        const user = await User.findOne({email})

        if (!user){
            return res.status(400).json({message: 'User with this email does not exist'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Incorrect password'})
        }

        const jwtSecret = 'po4201o4210-e02o0ds0dso0d0oadeweqweqwedsavgsafg'
        const token = jwtToken.sign(
            {userId: user.id}, 
            jwtSecret,
            {expiresIn: '1h'}
        )
        console.log('validation is ok')
        res.json({token, userId: user.id})

    } catch (error) {
        console.log(error)
    }
})

module.exports = router