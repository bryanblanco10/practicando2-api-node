const PUBLIC_VAPID_KEY = 'BE_aBzJEaeeCOwpiV1z_heMHMFnvbcXu_tkwAQYV3RACLn4aWN9Sv74qQdaUQ-RAFg3I2e6NSZDIfn0YaWQjwK4'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
 
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
 
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

const subscription = async () =>{

	// serviceWorker
	const register = await navigator.serviceWorker.register('./serviceWorker.js',{
		scope: '/'
	})

	const subscription = await register.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
	})

	// console.log(JSON.stringify(subscription))

	await fetch('/subscription', {
		method: 'POST',
		headers:{
			'cache-control': "no-cache, private",
      'content-type': "application/json"
		},
		body: JSON.stringify(subscription)
	})
	console.log('Subscribed!')
}

const form = document.querySelector('#myForm')
const message = document.querySelector('#message')

form.addEventListener('submit', e =>{
	e.preventDefault()

	fetch('new-message', { 
		method: 'POST',
		body: JSON.stringify({ 
			message: message.value
		}),
		headers:{
			'Content-Type': 'application/json'
		}
	})

	form.reset()
})

subscription()