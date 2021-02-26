let db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user)
{
    if (user)
    {

        let docRef = await db.collection('answers').doc(user.uid).get()
        let result = docRef.data()
        // let finalResult = result.userId
        // console.log(finalResult)

        let loginDiv = document.querySelector('.sign-in-or-sign-out')
        loginDiv.classList.add('border-2', 'text-white', 'text-center')
        loginDiv.innerHTML = `You Are Currently Logged In As:<br>${user.email}<br><br>
        <button class="sign-out-button bg-tan text-bold text-storm px-4 py-2 rounded-xl">Sign-Out</button>`

        let productsDiv = document.querySelector('.products')
        document.querySelector('.sign-out-button').addEventListener('click', async function(event){
            productsDiv.classList.add('hidden')
            firebase.auth().signOut()
            document.location.href = 'index.html'
        })
        

        let printProducts = async function()
        {
            let productList = await db.collection('products').get()
            // console.log(productList.size)
            let products = productList.docs
            for(let i=0; i<products.length;i++)
            {
                let productData = products[i].data()
                // console.log(productData)
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

        if(result)
        {
           printProducts()
        }
        else
        {
    

        document.querySelector('.quiz').insertAdjacentHTML('beforeend', `
        <div class="border-2 border-white m-8">
        <form class="quiz text-center text-white">
        
            <p class="text-white">What is your favorite denim brand?</p>
            <input type="radio" id="levi's" name="denim" value="Levi's">
            <label for="Levi's">Levi's</label><br>

            <input type="radio" id="Gap" name="denim" value="Gap">
            <label for="Gap">Gap</label><br>

            <input type="radio" id="Lucky" name="denim" value="Lucky">
            <label for="Lucky">Lucky</label><br>

            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
        </form>
        </div>
        `)
            
        document.querySelector('.quiz').addEventListener('submit', async function(event){

            event.preventDefault()
            let denimBrandAnswer = document.querySelector('input[name="denim"]:checked').value
            console.log(denimBrandAnswer)
            db.collection('answers').doc(user.uid).set({
                userId: user.uid,
                denim_answer: denimBrandAnswer,
            })
            document.querySelector('.quiz').classList.add('hidden')
            printProducts()
            
            
        })
    }
    
        
        
            
        db.collection('users').doc(user.uid).set({
            name: user.displayName,
            email: user.email
        })
        
        
        // console.log(user.uid)
        
        console.log('user is signed in')
       
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
            signInSuccessURL: `index.html`
        }
        ui.start(`.sign-in-or-sign-out`, authUIConfig)
    }
})