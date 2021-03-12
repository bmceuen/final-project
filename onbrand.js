let db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user)
{
    if (user)
    {
        let printProducts = async function()

        {
            let category = 'denim'
            let querySnapshot = await db.collection(`${user.uid}`).where('category','==', category).get()
            let userCollection = querySnapshot.docs

            for(let j=0;j<userCollection.length;j++)
            {
                let userProduct = userCollection[j].data()
                let productImage = userProduct.productImage
                let productName = userProduct.productName
                let productURL = userProduct.productURL
                let productPrice = userProduct.productPrice
                let brand = userProduct.brand
                let productID = userProduct.productID
                let productRating = userProduct.productRating

            
                document.querySelector('.products').insertAdjacentHTML('beforeend', `
                        <div class="product-grid">
                        <div class="product-${productID} p-4">
                            <a href="${productURL}" target="popup" onclick="window.open('${productURL}','name','width=1400, height=1000')">
                                <img src="${productImage}" class="product-image border-2 border-black">
                            </a>
                            <button class="buynow hidden">BUY NOW</button>
                            <button class="btn hidden">👍</button>
                            <button class="btn2 hidden">👎</button>
                            <div class="mt-2 justify-center">
                                <p class="text-center text-2xl text-bold text-black">${brand}</p>
                            </div>
                            <div class="text-black text-center text-l text-bold">${productName}</div>
                            <div class="text-black text-center text-xl text-bold">${productPrice}</div>
                        </div>
                        </div>
                        `)
            }
        
        }
        

        // if(do they have a product list already created)
        // {
        //     if(have they taken the entire quiz)
        //     {
        //         printProducts()
            
        //     }
        //     else
        //     {
        //         go through quiz
        //     }
        // else
        // {
        //     create product list
        // }
        // }




        
            let productsDiv = document.querySelector('.products')

            let querySnapshot = await db.collection(`${user.uid}`).get()
            let userCollection = querySnapshot.docs
            console.log(userCollection)

            let checkQuizAnswers = await db.collection('answers').where('userId', '==', user.uid).get()
            console.log(checkQuizAnswers)


            let quizAnswers = checkQuizAnswers.docs
            console.log(quizAnswers)
            
            for(let i = 0;i<quizAnswers.length;i++)
            {
                answer = quizAnswers[i].data()
                console.log(answer.size)
            }
           


        if(userCollection.length>0) //do theyhave a product list created
        {
            console.log(quizAnswers.size)
            
            if(quizAnswers.length == 4) //have they completed a quiz
            {
                printProducts()
            }
            else
            {
                //go through quiz
                let checkQuizAnswers = await db.collection('answers').where('userId', '==', user.uid).get()
                let quizAnswers = checkQuizAnswers.docs
                console.log(quizAnswers.size)
                for(let t=0;t<quizAnswers.length;t++)
                {
                    let answer = quizAnswers[t].data()
                    console.log(answer.denimAnswer)
                    console.log(answer.tshirtAnswer)
                    console.log(answer.fitAnswer)
                    console.log(answer.sneakerAnswer)
                    
        
                if(answer.denimAnswer == '')
                {   
                    let category = "denim"
                    console.log('ask denim question')
                    productsDiv.insertAdjacentHTML('beforeend', `
                        <div class="selector border-2 border-gray-100 p-8">
                            <form class="quiz text-center text-black">

                            <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>

                            <div class="quizImages flex">
                                
                                <input type="radio" id="Levi's" name="denim" value="Levi's"/>
                                <label class="quizOption" for="Levi's">
                                <img src="images/levis.png"></img>
                                </label>

                                <input type="radio" id="Gap" name="denim" value="Gap">
                                <label class="quizOption" for="Gap">
                                <img src="images/gap.png"></img>
                                </label>

                                <input type="radio" id="American Eagle" name="denim" value="American Eagle">
                                <label class="quizOption" for="American Eagle">
                                <img src="images/american_eagle.png"></img>
                                </label>

                                <input type="radio" id="Banana Republic" name="denim" value="Banana Republic">
                                <label class="quizOption" for="Banana Republic">
                                <img src="images/banana_republic.jpg"></img>
                                </label>

                                <input type="radio" id="Mugsy Jeans" name="denim" value="Mugsy Jeans">
                                <label class="quizOption" for="Mugsy Jeans">
                                <img src="images/mugsy.jpg"></img>
                                </label>

                                <input type="radio" id="Paige" name="denim" value="Paige">
                                <label class="quizOption" for="Paige">
                                <img src="images/paige.png"></img>
                                </label>
                            </div> 

                            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                        
                        </form>
                        </div>
                        `)

                        document.querySelector('.quiz').addEventListener('submit', async function(event)
                        {
                            event.preventDefault()
                            let answer = document.querySelector(`input[name=${category}]:checked`).value
                                                
                            await db.collection('answers').doc(`${user.uid}`).update({
                                userId: user.uid,
                                denimAnswer: answer,
                                tshirtAnswer: '',
                                sneakerAnswer: '',
                                fitAnswer: ''
                            })
                        
                        let brandCollection = await db.collection(`${user.uid}`).where('brand', '==', answer).get()
                        let brandMatch = brandCollection.docs
                        console.log(brandMatch)
            
                        for(let j=0;j<brandMatch.length;j++)
                            {
                                let brandProduct = brandMatch[j].id
                                await db.collection(`${user.uid}`).doc(`${brandProduct}`).update(
                                    {
                                        productRating: firebase.firestore.FieldValue.increment(100)
                                    })
                            }
                        
                            document.location.href = 'index.html'
                        })
                    
                }
                else if(answer.tshirtAnswer == "")
                {
                    console.log('ask t-shirt question')
                    //ask t-shirt question

                    let category = 't-shirts'
                    productsDiv.insertAdjacentHTML('beforeend', `
                                <div class="selector border-2 border-gray-100 p-8">
                                    <form class="quiz text-center text-black">
                
                                    <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>
                
                                    <div class="quizImages flex">
                                        
                                        <input type="radio" id="Buck Mason" name="t-shirts" value="Buck Mason"/>
                                        <label class="quizOption" for="Buck Mason">
                                        <img src="images/buck_mason.jpg"></img>
                                        </label>
                
                                        <input type="radio" id="Everlane" name="t-shirts" value="Everlane"/>
                                        <label class="quizOption" for="Everlane">
                                        <img src="images/everlane.jpg"></img>
                                        </label>
                            
                                        <input type="radio" id="Gap" name="t-shirts" value="Gap"/>
                                        <label class="quizOption" for="Gap">
                                        <img src="images/gap.png"></img>
                                        </label>
                            
                                        <input type="radio" id="Bylt Basics" name="t-shirts" value="Bylt Basics"/>
                                        <label class="quizOption" for="Bylt Basics">
                                        <img src="images/bylt.jpg"></img>
                                        </label>
                                    </div>
                
                                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                                
                                    </form>
                                </div>
                                `)
                                document.querySelector('.quiz').addEventListener('submit', async function(event)
                                {
                                    event.preventDefault()
                                    let answer = document.querySelector(`input[name=${category}]:checked`).value
                                                        
                                    await db.collection('answers').doc(`${user.uid}`).update({
                                        userId: user.uid,
                                        tshirtAnswer: answer,
                                        sneakerAnswer: '',
                                        fitAnswer: ''
                                    })
                                
                                let brandCollection = await db.collection(`${user.uid}`).where('brand', '==', answer).get()
                                let brandMatch = brandCollection.docs
                                console.log(brandMatch)
                    
                                for(let j=0;j<brandMatch.length;j++)
                                    {
                                        let brandProduct = brandMatch[j].id
                                        await db.collection(`${user.uid}`).doc(`${brandProduct}`).update(
                                            {
                                                productRating: firebase.firestore.FieldValue.increment(100)
                                            })
                                    }
                                
                                    document.location.href = 'index.html'
                                })

                }
                else if(answer.sneakerAnswer == "")
                {
                    console.log('ask sneakers question')
                    //ask sneakers question
                    category = 'sneakers'
                    productsDiv.insertAdjacentHTML('beforeend', `

                            <div class="selector border-2 border-gray-100 p-8">
                                <form class="quiz text-center text-black">                        
                                    
                                    <p class="text-black text-xl p-4">What is your favorite ${category} brand?</p>
                                    
                                    <div class="quizImages flex">
                                        <input type="radio" id="allbirds" name="sneakers" value="allbirds">
                                        <label class="quizOption" for="allbirds">
                                        <img src="images/allbirds.jpg"></img>
                                        </label>

                                        <input type="radio" id="Nike" name="sneakers" value="Nike">
                                        <label class="quizOption" for="Nike">
                                        <img src="images/nike.jpg"></img>
                                        </label>

                                        <input type="radio" id="Greats" name="sneakers" value="Greats">
                                        <label class="quizOption" for="Greats">
                                        <img src="images/greats.jpg"></img>
                                        </label>
                                    </div>

                                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                                    
                                </form>
                            </div>
                        `)
                        document.querySelector('.quiz').addEventListener('submit', async function(event)
                        {
                            event.preventDefault()
                            let answer = document.querySelector(`input[name=${category}]:checked`).value
                                                
                            await db.collection('answers').doc(`${user.uid}`).update({
                                userId: user.uid,
                                sneakerAnswer: answer,
                                fitAnswer: ''
                            })
                        
                        let brandCollection = await db.collection(`${user.uid}`).where('brand', '==', answer).get()
                        let brandMatch = brandCollection.docs
                        console.log(brandMatch)
            
                        for(let j=0;j<brandMatch.length;j++)
                            {
                                let brandProduct = brandMatch[j].id
                                await db.collection(`${user.uid}`).doc(`${brandProduct}`).update(
                                    {
                                        productRating: firebase.firestore.FieldValue.increment(100)
                                    })
                            }
                        
                            document.location.href = 'index.html'
                        })
                }
                else if(answer.fitAnswer == '')
                {
                    console.log('ask fit question')
                    //ask fit question
                    category = 'denim'
                    productsDiv.insertAdjacentHTML('beforeend', `
                            <div class="selector border-2 border-gray-100 p-8">
                            <form class="quiz text-center text-black">

                            <p class="text-black text-xl p-4">What is your preferred pant fit?</p>

                            <div class="quizImages flex center">
                                
                                <input type="radio" id="Slim" name="pant_fit" value="Slim">
                                <label class="quizOptionFit" for="Slim">
                                <img src="images/slim.jpg"></img>
                                Slim</label>

                                <input type="radio" id="Skinny" name="pant_fit" value="Skinny">
                                <label class="quizOptionFit" for="Skinny">
                                <img src="images/skinny.jpg"></img>
                                Skinny</label>

                                <input type="radio" id="Straight" name="pant_fit" value="Straight">
                                <label class="quizOptionFit"for="Straight">
                                <img src="images/straight.jpg"></img>
                                Straight</label>
                            </div>

                            <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-8 rounded-xl">Submit</button>
                        
                            </form>
                        
                            </div>
                            `)
                            document.querySelector('.quiz').addEventListener('submit', async function(event)
                            {
                                event.preventDefault()
                                let answer = document.querySelector(`input[name=pant_fit]:checked`).value
                                                    
                                await db.collection('answers').doc(`${user.uid}`).update({
                                    userId: user.uid,
                                    fitAnswer: answer
                                })
                            
                            let fitCollection = await db.collection(`${user.uid}`).where('pant_fit', '==', answer).get()
                            let fitMatch = fitCollection.docs
                            console.log(fitMatch)
                
                            for(let j=0;j<fitMatch.length;j++)
                                {
                                    let fitProduct = fitMatch[j].id
                                    await db.collection(`${user.uid}`).doc(`${fitProduct}`).update(
                                        {
                                            productRating: firebase.firestore.FieldValue.increment(500)
                                        })
                                }
                            
                                document.location.href = 'index.html'
                            })
                }
            }
            }
        }
        
        else
        {
            //create product list
            let masterProductList = await db.collection('products').get()
            let productList = masterProductList.docs
            console.log(productList)

            let querySnapshot = await db.collection(`${user.uid}`).get()
            let userCollection = querySnapshot.docs
            console.log(userCollection)

            if(userCollection.length == 0)
             {
                for(let i=0;i<productList.length;i++)
                {
                    let product = productList[i].data()
                    let productImage = product.image_url
                    let productName = product.product_name
                    let productURL = product.url
                    let productPrice = product.price
                    let brand = product.brand
                    let productID = product.product_number
                    let category = product.category
                    let pant_fit = product.pant_fit

                    await db.collection(`${user.uid}`).add(
                        {
                            productImage: productImage,
                            productName: productName,
                            productURL: productURL,
                            productPrice: productPrice,
                            brand : brand,
                            productID: productID,
                            productRating: 0,
                            category: category,
                            pant_fit: pant_fit
                        })
                }

                    await db.collection('answers').doc(`${user.uid}`).set(
                                {
                                    userId: user.uid,
                                    denimAnswer: '',
                                    tshirtAnswer: '',
                                    sneakerAnswer: '',
                                    fitAnswer: ''
                                })
                }
        else
        {
                {
                    console.log('hello')
                    category = 'denim'
                    printProducts()
                }
            }
        }
    
    }


    else
    {
        document.location.href = 'login.html'
    }
})