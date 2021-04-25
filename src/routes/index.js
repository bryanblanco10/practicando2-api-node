const { Router } = require('express')
const router = Router()

const webpush = require('../webpush')
let pushSubscription;

router.post('/subscription', async (req, res) =>{
	pushSubscription = req.body;
	console.log(pushSubscription)
	res.status(200).json();
})

router.post('/new-message', async (req, res) =>{
	const { message } = req.body
	console.log(pushSubscription)
	let payload = JSON.stringify({
		title: 'Brya10 notification',
		message: message
	})
	
	try{
		await webpush.sendNotification(pushSubscription, payload)
	}
	catch(err){
		console.log(err)
	}
})

module.exports = router;