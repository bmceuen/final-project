let db = firebase.firestore()

document.querySelector('.upload-products').addEventListener('click',  async function(event)
{
    event.preventDefault()

    let response = await fetch('/.data.json')
    let productList = await response.json()

    console.log(productList)
})