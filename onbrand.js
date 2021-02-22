let db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user)
{
    if (user)
    {
        console.log('user is signed in')
        let productList = await db.collection('products').get()
        console.log(productList.size)
        let products = productList.docs
        for(let i=0; i<products.length;i++)
        {
            let productData = products[i].data()
            console.log(productData)
            let productImage = productData.product_image
            let productName = productData.product_name
            let productURL = productData.url
            let productPrice = productData.price
            let brand = productData.brand
        
        
        document.querySelector('.products').insertAdjacentHTML('beforeend', `
        <div class="product-grid w-1/5 p-4">
            <a href="${productURL}">
                <img src="${productImage}" class="border-2 border-black hover:opacity-80">
            </a>
            <div class="mt-2 justify-center">
                <p class="text-center text-2xl text-bold text-white">${brand}</p>
            </div>
            <div class="text-white text-center text-xl text-bold">${productName}</div>
            <div class="text-white text-center text-2xl text-bold">${productPrice}</div>
        </div>

        
        
        
        `)
        }
        
    }
    else
    {
        let ui = new firebaseui.auth.AuthUI(firebase.auth())

        let authUIConfig = 
        {
            signInOptions:
            [
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            signInSuccessURL:'index.html'
        }
        ui.start(`.sign-in-or-sign-out`, authUIConfig)
    }
})