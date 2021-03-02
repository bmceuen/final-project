let db = firebase.firestore()
document.querySelector('form').addEventListener('submit', async function(event){
    event.preventDefault()
        let textString = document.querySelector('#quiz').value
        console.log(textString)
    
})