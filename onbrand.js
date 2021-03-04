let db = firebase.firestore()
firebase.auth().onAuthStateChanged(async function(user)
{
    if (user)
    {
        //this checks to see if they have answered the t-shirt question
        
                    let querySnapshot1 = await db.collection('answers')
                                                .where('userId', '==', user.uid)
                                                .where('category', '==', 'tshirts')
                                                .get()
                    let findAnswer1 = querySnapshot1.docs

                    let querySnapshot2 = await db.collection('answers')
                                                .where('userId', '==', user.uid)
                                                .where('category', '==', 'sneakers')
                                                .get()
                    
                    let findAnswer2 = querySnapshot2.docs

                    let querySnapshot3 = await db.collection('answers')
                                                .where('userId', '==', user.uid)
                                                .where('category', '==', 'denim')
                                                .get()
                    
                    let findAnswer3 = querySnapshot3.docs
                    
                    if (findAnswer1.length > 0) //they have answered the tshirt question
                    {
                        if(findAnswer2.length>0) //they have answered the sneakers question
                        {
                            category = 'denim'
                        }
                        else
                        {
                            category = 'sneakers'
                        }
                    }
                    else
                    {
                        category = 'tshirts'
                    }
         
        
        
        
        let productsDiv = document.querySelector('.products')
        let sideNavDiv = document.querySelector('.sidebar')

        let adjustCategory = function()
        {
            let categoryTitle = category.toUpperCase()
            document.querySelector('.category-title').innerHTML = ''
            document.querySelector('.category-title').insertAdjacentHTML('beforeend',
            `${categoryTitle}`
            )
        }

        //THIS SHOWS USERINFO
        document.querySelector('.userinfo').insertAdjacentHTML('beforeend',
        `Hello ${user.displayName}! <br>
        <button class="sign-out-button bg-tan text-bold text-storm px-4 py-2 rounded-xl">Sign-Out</button>`
        )
        
        //THIS IS THE SIGNOUT BUTTON
        document.querySelector('.sign-out-button').addEventListener('click', function(event)
        {
            event.preventDefault()
            firebase.auth().signOut()
            document.location.href = 'login.html'

        })
        
        // let querySnapshot = await db.collection('answers').where('userId', '==', user.uid).get()
        // console.log(querySnapshot.size)
        // let userAnswers = querySnapshot.docs
        // for(let i = 0; i<userAnswers.length;i++)
        // {
        //     let answer = userAnswers[i].data()
        //     console.log(answer.name)
        // }


        let printProducts = async function()
        {
            productsDiv.innerHTML = ''
            let findAnswers= await db.collection('answers')
                                    .where('userId', '==', user.uid)
                                    .where('category','==', category)
                                    .get()
            let answers = findAnswers.docs
            for (let j = 0;j<answers.length;j++)
            {
                let answer = answers[j].data()
                // console.log(answer)
            

            let productList = await db.collection('products').where('brand', '==',answer.answer).get()
            // console.log(productList)
            let products = productList.docs
            for(let i=0; i<products.length;i++)
            {
                let productData = products[i].data()
                
                let productImage = productData.image_url
                let productName = productData.product_name
                let productURL = productData.url
                let productPrice = productData.price
                let brand = productData.brand
                let productID = productData.product_number
            
            document.querySelector('.products').insertAdjacentHTML('beforeend', `
            <div class="product-grid">
            <div class="product-${productID} p-4">
                <a href="${productURL}" target="popup" onclick="window.open('${productURL}','name','width=1400, height=1000')">
                    <img src="${productImage}" class="product-image border-2 border-black min-h-1400">
                </a>
                <button class="buynow hidden">BUY NOW</button>
                <button class="btn hidden">👍</button>
                <button class="btn2 hidden">👎</button>
                <div class="mt-2 justify-center">
                    <p class="text-center text-2xl text-bold text-black">${brand}</p>
                </div>
                <div class="text-black text-center text-xl text-bold">${productName}</div>
                <div class="text-black text-center text-2xl text-bold">${productPrice}</div>
            </div>
            </div>
            `)
            
           document.querySelector(`.product-${productID}`).addEventListener('mouseover', function (event)
                {
                    event.preventDefault()
                    document.querySelector(`.product-${productID} .buynow`).classList.remove('hidden')
                    document.querySelector(`.product-${productID} .btn`).classList.remove('hidden')
                    document.querySelector(`.product-${productID} .btn2`).classList.remove('hidden')
                    document.querySelector(`.product-${productID} .product-image`).classList.add('opacity-80')
                    document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-500', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                })
            
           document.querySelector(`.product-${productID}`).addEventListener('mouseout', function (event)
                {
                    event.preventDefault()
                    document.querySelector(`.product-${productID} .buynow`).classList.add('hidden')
                    document.querySelector(`.product-${productID} .btn`).classList.add('hidden')
                    document.querySelector(`.product-${productID} .btn2`).classList.add('hidden')
                    document.querySelector(`.product-${productID} .product-image`).classList.remove('opacity-80')
                    document.querySelector(`.product-${productID} .product-image`).classList.add('transition', 'duration-900', 'ease-in-out', 'transform', 'hover:-translate-y-1', 'hover:scale-110')
                })
            }
         }
    }

        
        if(findAnswer1.length>0 && findAnswer2.length>0 && findAnswer3.length>0) //this checks to see if they have they answered all the quiz questions
        {
           printProducts()
           adjustCategory()
        }
        else
        {
            if(category == 'denim')
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your favorite ${category} brand?</p>
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
            }
            else if(category == 'tshirts')
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your favorite ${category} brand?</p>
                    <input type="radio" id="Buck Mason" name="tshirts" value="Buck Mason">
                    <label for="Buck Mason">Buck Mason</label><br>

                    <input type="radio" id="Everlane" name="tshirts" value="Everlane">
                    <label for="Everlane">Everlane</label><br>

                    <input type="radio" id="Gap" name="tshirts" value="Gap">
                    <label for="Gap">Gap</label><br>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
                </form>
                </div>
                `)
            }

            else if(category == 'sneakers')
            {
                productsDiv.insertAdjacentHTML('beforeend', `
                <div class="border-2 border-white m-8">
                <form class="quiz text-center text-black">
                
                    <p class="text-black">What is your favorite ${category} brand?</p>
                    <input type="radio" id="allbirds" name="sneakers" value="allbirds">
                    <label for="allbirds">allbirds</label><br>

                    <input type="radio" id="Nike" name="sneakers" value="Nike">
                    <label for="Nike">Nike</label><br>

                    <input type="radio" id="adidas" name="sneakers" value="adidas">
                    <label for="adidas">adidas</label><br>

                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl">Submit</button>
                </form>
                </div>
                `)
            }
          
        document.querySelector('.quiz').addEventListener('submit', async function(event){

            event.preventDefault()
            let answer = document.querySelector(`input[name="${category}"]:checked`).value
            // console.log(denimBrandAnswer)
            db.collection('answers').add({
                userId: user.uid,
                category: category,
                answer: answer,
            })
            // document.querySelector('.quiz').classList.add('hidden')
                let querySnapshot1 = await db.collection('answers')
                            .where('userId', '==', user.uid)
                            .where('category', '==', 'tshirts')
                            .get()
                let findAnswer1 = querySnapshot1.docs

                let querySnapshot2 = await db.collection('answers')
                            .where('userId', '==', user.uid)
                            .where('category', '==', 'sneakers')
                            .get()

                let findAnswer2 = querySnapshot2.docs

                let querySnapshot3 = await db.collection('answers')
                            .where('userId', '==', user.uid)
                            .where('category', '==', 'denim')
                            .get()

                let findAnswer3 = querySnapshot3.docs

                if (findAnswer1.length > 0) //they have answered the tshirt question
                {
                if(findAnswer2.length>0) //they have answered the sneakers question
                {
                category = 'denim'
                }
                else
                {
                category = 'sneakers'
                }
                }
                else
                {
                category = 'tshirts'
                }
                document.location.href = 'index.html'
        }) 
        }

        document.querySelector('.denim').addEventListener('click', async function(event)
        {
            event.preventDefault()
            category = 'denim'
            printProducts()
            adjustCategory()
        })
        document.querySelector('.tshirts').addEventListener('click', async function(event)
        {
            event.preventDefault()
            category = 'tshirts'
            printProducts()
            adjustCategory()
        })

        document.querySelector('.sneakers').addEventListener('click', async function(event)
        {
            event.preventDefault()
            category = 'sneakers'
            printProducts()
            adjustCategory()
        })
    }

    else
    {
        document.location.href = 'login.html'
    }
})