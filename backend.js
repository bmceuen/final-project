let db = firebase.firestore()

document.querySelector('.upload-products').addEventListener('click',  async function(event)
{
    event.preventDefault()

   let productList = 
   [
    {
      "dockey": 1,
      "product_number": 1,
      "brand": "Buck Mason",
      "category": "t-shirts",
      "product_name": "Slub Curved Hem Tee",
      "pant_fit": "",
      "price": "$35",
      "url": "https://www.buckmason.com/products/white-crew-neck-tee",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/buck-mason-white-slub-curved-hem-tee-1_1.jpg?v=1569311436"
    },
    {
      "dockey": 2,
      "product_number": 2,
      "brand": "Buck Mason",
      "category": "t-shirts",
      "product_name": "Slub Curved Hem Tee",
      "pant_fit": "",
      "price": "$35",
      "url": "https://www.buckmason.com/products/black-crew-neck-tee",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/buck-mason-black-pima-curved-hem-tee-1_244e7765-b152-49c1-8a9b-ba717697f6eb.jpg?v=1569312873"
    },
    {
      "dockey": 3,
      "product_number": 3,
      "brand": "Buck Mason",
      "category": "t-shirts",
      "product_name": "Slub Curved Hem Tee",
      "pant_fit": "",
      "price": "$35",
      "url": "https://www.buckmason.com/products/midnight-crew-neck-slub-tee",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/buck-mason-midnight-slub-curved-hem-tee-1_4aeb38e0-f50e-4e77-bd33-b26b1f26980d.jpg?v=1569312348"
    },
    {
      "dockey": 4,
      "product_number": 4,
      "brand": "Buck Mason",
      "category": "t-shirts",
      "product_name": "Slub Curved Hem Tee",
      "pant_fit": "",
      "price": "$35",
      "url": "https://www.buckmason.com/products/coal-slub-curved-hem-tee",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/buck-mason-coal-slub-curved-hem-tee-1_31581994-4e38-40c6-b3c4-eb29d9e6cc3a.jpg?v=1569312347"
    },
    {
      "dockey": 5,
      "product_number": 5,
      "brand": "Buck Mason",
      "category": "t-shirts",
      "product_name": "Slub Curved Hem Tee",
      "pant_fit": "",
      "price": "$35",
      "url": "https://www.buckmason.com/products/white-sand-venice-wash-slub",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/buck-mason-white-sand-venice-wash-slub-1.jpg?v=1584037867"
    },
    {
      "dockey": 6,
      "product_number": 6,
      "brand": "Buck Mason",
      "category": "ls t-shirt",
      "product_name": "Striped Field-Spec Cotton Rugby Crew",
      "pant_fit": "",
      "price": "$75",
      "url": "https://www.buckmason.com/products/grey-natural-striped-field-spec-cotton-rugby-crew",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/Buck-Mason-Grey-Natural-Stripe-Field-Spec-Cotton-Rugby-Crew-07.jpg?v=1602040642"
    },
    {
      "dockey": 7,
      "product_number": 7,
      "brand": "Buck Mason",
      "category": "ls t-shirt",
      "product_name": "Striped Field-Spec Cotton Rugby Crew",
      "pant_fit": "",
      "price": "$75",
      "url": "https://www.buckmason.com/products/navy-natural-striped-field-spec-cotton-rugby-crew",
      "image_url": "https://cdn.shopify.com/s/files/1/0123/5065/2473/products/Buck-Mason-Navy-Natural-Stripe-Field-Spec-Cotton-Rugby-Crew-07.jpg?v=1602039710"
    },
    {
      "dockey": 8,
      "product_number": 8,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Crew | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-cotton-crew-tee-sea-storm?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/6f1c3e54_e680.jpg"
    },
    {
      "dockey": 9,
      "product_number": 9,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Crew | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-cotton-crew-tee-navy?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/72fced99_e22a.jpg"
    },
    {
      "dockey": 10,
      "product_number": 10,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Crew | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-cotton-crew-tee-heather-grey?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/c8b540c0_b8eb.jpg"
    },
    {
      "dockey": 11,
      "product_number": 11,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Crew | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-cotton-crew-tee-hthr-olive?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/0353de1e_4b68.jpg"
    },
    {
      "dockey": 12,
      "product_number": 12,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Crew | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-cotton-crew-tee-palm?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/1819144b_c274.jpg"
    },
    {
      "dockey": 13,
      "product_number": 13,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Pocket Tee | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-pocket-tee-mauve?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/7d2e327e_3c4e.jpg"
    },
    {
      "dockey": 14,
      "product_number": 14,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Pocket Tee | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-pocket-tee-heather-brown?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/8575f855_dfb7.jpg"
    },
    {
      "dockey": 15,
      "product_number": 15,
      "brand": "Everlane",
      "category": "t-shirts",
      "product_name": "The Organic Cotton Pocket Tee | Uniform",
      "pant_fit": "",
      "price": "$18",
      "url": "https://www.everlane.com/products/mens-organic-pocket-tee-heather-charcoal?collection=mens-tees",
      "image_url": "https://media.everlane.com/image/upload/c_fill,dpr_1.0,f_auto,g_face:center,q_auto,w_auto:100:1200/v1/i/e45d2492_023a.jpg"
    },
    {
      "dockey": 16,
      "product_number": 16,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Organic Cotton Pocket T-Shirt",
      "pant_fit": "",
      "price": "$15",
      "url": "https://www.gap.com/browse/product.do?pid=878111032&cid=5225&pcid=5225&vid=1&cpos=6&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res21030207294906046378848&ccam=5747#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/897/110/cn19897110.jpg"
    },
    {
      "dockey": 17,
      "product_number": 17,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Organic Cotton Pocket T-Shirt",
      "pant_fit": "",
      "price": "$15",
      "url": "https://www.gap.com/browse/product.do?pid=878111062&cid=5225&pcid=5225&vid=1&cpos=6&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res21030207294906046378848&ccam=5747#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/897/009/cn19897009.jpg"
    },
    {
      "dockey": 18,
      "product_number": 18,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Organic Cotton Pocket T-Shirt",
      "pant_fit": "",
      "price": "$15",
      "url": "https://www.gap.com/browse/product.do?pid=878111052&cid=5225&pcid=5225&vid=1&cpos=6&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res21030207294906046378848&ccam=5747#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/896/982/cn19896982.jpg"
    },
    {
      "dockey": 19,
      "product_number": 19,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Classic T-Shirt",
      "pant_fit": "",
      "price": "$13",
      "url": "https://www.gap.com/browse/product.do?pid=440775012&cid=5225&pcid=5225&vid=1&cpos=12&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res21030207299840759159923#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0016/771/072/cn16771072.jpg"
    },
    {
      "dockey": 20,
      "product_number": 20,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Classic T-Shirt",
      "pant_fit": "",
      "price": "$13",
      "url": "https://www.gap.com/browse/product.do?pid=440775082&cid=5225&pcid=5225&vid=1&cpos=12&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res21030207299840759159923#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0018/025/919/cn18025919.jpg"
    },
    {
      "dockey": 21,
      "product_number": 21,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Classic T-Shirt",
      "pant_fit": "",
      "price": "$13",
      "url": "https://www.gap.com/browse/product.do?pid=440775022&cid=5225&pcid=5225&vid=1&cpos=12&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res21030207299840759159923#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0016/771/161/cn16771161.jpg"
    },
    {
      "dockey": 22,
      "product_number": 22,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Henley T-Shirt",
      "pant_fit": "",
      "price": "$31",
      "url": "https://www.gap.com/browse/product.do?pid=761267052&cid=5225&pcid=5225&vid=1&cpos=31&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res210302077364882625343#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/899/282/cn19899282.jpg"
    },
    {
      "dockey": 23,
      "product_number": 23,
      "brand": "Gap",
      "category": "t-shirts",
      "product_name": "Henley T-Shirt",
      "pant_fit": "",
      "price": "$31",
      "url": "https://www.gap.com/browse/product.do?pid=761267022&cid=5225&pcid=5225&vid=1&cpos=31&cexp=1567&kcid=CategoryIDs%3D5225&cvar=11754&ctype=Listing&cpid=res210302077364882625343#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/899/300/cn19899300.jpg"
    },
    {
      "dockey": 24,
      "product_number": 24,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut: LUX",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt-lux?variant=32262095994982",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/LUXDCSS_3_84e48d50-f569-4dd9-97ab-f36a93296c13_540x.jpg?v=1609879912"
    },
    {
      "dockey": 25,
      "product_number": 25,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut: LUX",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt-lux?variant=32074989863014",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/LUXDCSS_12_cb5c46c8-33dc-41bf-9dbd-8148d9e8a67a_540x.jpg?v=1609879912"
    },
    {
      "dockey": 26,
      "product_number": 26,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut: LUX",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt-lux?variant=32074988945510",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/LUXDCSS_15_168f3c65-3d12-4289-b8f0-b49b2a40a766_540x.jpg?v=1609879912"
    },
    {
      "dockey": 27,
      "product_number": 27,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut Shirt",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt?variant=31540434010214",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/BYLTBLENDDCSS_MAROON_1_2cdd8439-1377-4cac-9a87-0ab887910736_540x.jpg?v=1603905970"
    },
    {
      "dockey": 28,
      "product_number": 28,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut Shirt",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt?variant=31540442267750",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/BYLTBLENDDCSS_SAND_1_4706ea5f-1457-482d-9a38-5704d0d991da_540x.jpg?v=1603905970"
    },
    {
      "dockey": 29,
      "product_number": 29,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut Shirt",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt?variant=32075032592486",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/BYLTBLENDDCSS_3_05d9afa2-f22e-47ea-a830-bbd40bd85504_540x.jpg?v=1603905964"
    },
    {
      "dockey": 30,
      "product_number": 30,
      "brand": "Bylt Basics",
      "category": "t-shirts",
      "product_name": "Drop-Cut Shirt",
      "pant_fit": "",
      "price": "$28.99",
      "url": "https://byltbasics.com/collections/drop-cuts/products/drop-cut-shirt?variant=32075031019622",
      "image_url": "https://cdn.shopify.com/s/files/1/1464/5034/products/BYLTBLENDDCSS_12_aa12b1f3-8dbd-4bb6-a9dc-db83d1ff1b94_540x.jpg?v=1603905970"
    },
    {
      "dockey": 31,
      "product_number": 31,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale Knit",
      "pant_fit": "",
      "price": "$119",
      "url": "https://www.greats.com/products/the-royale-knit-navy-tie-dye",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/GREATS-Web_0016_RoyaleTieDye_800x.jpg?v=1613603213"
    },
    {
      "dockey": 32,
      "product_number": 32,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale Knit",
      "pant_fit": "",
      "price": "$119",
      "url": "https://www.greats.com/products/the-royale-knit-grey-white",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-192-RoyaleKnit-EnviroKnit-Grey-White-REGW-Product-101_800x.jpg?v=1590013840"
    },
    {
      "dockey": 33,
      "product_number": 33,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale Knit",
      "pant_fit": "",
      "price": "$119",
      "url": "https://www.greats.com/products/the-royale-knit-heathered-black",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Royale-Knit-Black-Friday-Misc-Web_0000_1_800x.jpg?v=1606343702"
    },
    {
      "dockey": 34,
      "product_number": 34,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale",
      "pant_fit": "",
      "price": "$179",
      "url": "https://www.greats.com/products/the-royale-blanco-white",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-193-Royale-Blanco-3RMW-Product-101_56ecf38d-038c-4e43-b28c-b50c5988d806_800x.jpg?v=1563990962"
    },
    {
      "dockey": 35,
      "product_number": 35,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale",
      "pant_fit": "",
      "price": "$179",
      "url": "https://www.greats.com/products/the-royale-triple-black",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-193-Royale-TripleBlack-3RBW-Product-101_0dfdc0b7-602d-413d-a381-4baa1060da91_800x.jpg?v=1563992320"
    },
    {
      "dockey": 36,
      "product_number": 36,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale",
      "pant_fit": "",
      "price": "$179",
      "url": "https://www.greats.com/products/the-royale-cuoio-tan",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-193-Royale-Cuoio-3RCU-Product-101_800x.jpg?v=1563991971"
    },
    {
      "dockey": 37,
      "product_number": 37,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Wythe",
      "pant_fit": "",
      "price": "$169",
      "url": "https://www.greats.com/products/the-wythe-cargo-multi",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Wythe-Cargo-GREATS-SS21-Web-Res_0008_9_800x.jpg?v=1611346643"
    },
    {
      "dockey": 38,
      "product_number": 38,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Wythe",
      "pant_fit": "",
      "price": "$169",
      "url": "https://www.greats.com/products/the-wythe-blanco",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Wythe-Blanco-GREATS-SS21-Web-Res_0000_1_800x.jpg?v=1611344544"
    },
    {
      "dockey": 39,
      "product_number": 39,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale High",
      "pant_fit": "",
      "price": "$199",
      "url": "https://www.greats.com/collections/high-tops-mens",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Mens-194-RoyaleHigh-Blanco-RMOW-Product-101_800x.jpg?v=1600459742"
    },
    {
      "dockey": 40,
      "product_number": 40,
      "brand": "Greats",
      "category": "sneakers",
      "product_name": "The Royale High Patchwork",
      "pant_fit": "",
      "price": "$199",
      "url": "https://www.greats.com/products/the-royale-high-patchwork-indigo-multi",
      "image_url": "https://cdn.shopify.com/s/files/1/0238/2821/products/Royale-Patchwork-Hi-Navy-Web_0000_1_800x.jpg?v=1606833528"
    },
    {
      "dockey": 41,
      "product_number": 41,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Tree Dashers",
      "pant_fit": "",
      "price": "$125",
      "url": "https://www.allbirds.com/products/mens-tree-dashers",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/TD1MTHU_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_THUNDER_d2d37940-b8b8-49b9-b579-befc6f7dd60a.png?v=1610063508"
    },
    {
      "dockey": 42,
      "product_number": 42,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Tree Dashers",
      "pant_fit": "",
      "price": "$125",
      "url": "https://www.allbirds.com/products/mens-tree-dashers-geyser",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/TD1MGYS_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_GEYSER_25e8814d-ce4f-4f8b-b96c-c9f32a71137a.png?v=1600891019"
    },
    {
      "dockey": 43,
      "product_number": 43,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Tree Dashers",
      "pant_fit": "",
      "price": "$125",
      "url": "https://www.allbirds.com/products/mens-tree-dashers-pukeko",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/TD1MOGL_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHER_PUKEKO_WHITE.png?v=1601053460"
    },
    {
      "dockey": 44,
      "product_number": 44,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Tree Dashers",
      "pant_fit": "",
      "price": "$125",
      "url": "https://www.allbirds.com/products/mens-tree-dashers-flame",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/TD1MFLM_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHERS_FLAME_5fbaf8a9-2438-486f-87a2-8b1b083f226b.png?v=1610063528"
    },
    {
      "dockey": 45,
      "product_number": 45,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Tree Dashers",
      "pant_fit": "",
      "price": "$125",
      "url": "https://www.allbirds.com/products/mens-tree-dashers-moonrise",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/TD1MMOO080_SHOE_ANGLE_GLOBAL_MENS_TREE_DASHER_MOONRISE_NAVY_18729bf9-dd19-4fc8-995c-58732fd32294.png?v=1601053821"
    },
    {
      "dockey": 46,
      "product_number": 46,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Runners",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-runners",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_Grey_BTY_10b4c383-7fc6-4b58-8b3f-6d05cef0369c.png?v=1610061677"
    },
    {
      "dockey": 47,
      "product_number": 47,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Runners",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-runners-medjool",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MMDJ_SHOE_ANGLE_GLOBAL_MENS_WOOL_RUNNER_MEDJOOL_CREAM.png?v=1610066314"
    },
    {
      "dockey": 48,
      "product_number": 48,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Runners",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-runners-savanna-dawn",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_FY19_August_PDP_WL_RN_Savanna_Dawn_BTY_ba1f3de0-bc18-4cc5-b88e-d79c220c9d84.png?v=1610067764"
    },
    {
      "dockey": 49,
      "product_number": 49,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Runners",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-runners-true-black",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WR3MTBK_SHOE_ANGLE_GLOBAL_MENS_WOOL_RUNNER_TRUE_BLACK_CREAM.png?v=1610067454"
    },
    {
      "dockey": 50,
      "product_number": 50,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Runners",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-runners-natural-white",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/Allbirds_WL_RN_SF_PDP_Natural_White_BTY.png?v=1610061979"
    },
    {
      "dockey": 51,
      "product_number": 51,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Pipers",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-pipers",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WP1MDPG_SHOE_ANGLE_GLOBAL_MENS_WOOL_PIPER_DAPPLE_GREY_WHITE_v1_07e62f37-4321-48ca-993c-32fcdb426d81.png?v=1598994617"
    },
    {
      "dockey": 52,
      "product_number": 52,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Pipers",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-pipers-ironbark",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WP1MIRB_SHOE_ANGLE_GLOBAL_MENS_WOOL_PIPER_IRONBARK_WHITE.png?v=1611618152"
    },
    {
      "dockey": 53,
      "product_number": 53,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Pipers",
      "pant_fit": "",
      "price": "$95",
      "url": "https://www.allbirds.com/products/mens-wool-pipers-bough",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WP1MBGH_SHOE_ANGLE_GLOBAL_MENS_WOOL_PIPER_BOUGH_WHITE.png?v=1611618113"
    },
    {
      "dockey": 54,
      "product_number": 54,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Dasher Mizzles - Mid",
      "pant_fit": "",
      "price": "$145",
      "url": "https://www.allbirds.com/products/mens-wool-dasher-mizzles-mid",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WDMM1ABC_SHOE_ANGLE_GLOBAL_MENS_WOOL_DASHER_MIZZLE_MID_NATURAL_BLACK_WHITE_63204f54-4b02-4f1f-accf-360a45230452.png?v=1612815513"
    },
    {
      "dockey": 55,
      "product_number": 55,
      "brand": "allbirds",
      "category": "sneakers",
      "product_name": "Men's Wool Dasher Mizzles - Mid",
      "pant_fit": "",
      "price": "$145",
      "url": "https://www.allbirds.com/products/mens-wool-dasher-mizzles-mid-mist",
      "image_url": "https://cdn.allbirds.com/image/fetch/q_auto,f_auto/w_1000,f_auto,q_auto,b_rgb:f5f5f5/https://cdn.shopify.com/s/files/1/1104/4168/products/WDMM1MST080_SHOE_ANGLE_GLOBAL_MENS_WOOL_DASHER_MIZZLE_MID_MIST_WHITE.png?v=1612815410"
    },
    {
      "dockey": 56,
      "product_number": 56,
      "brand": "Nike",
      "category": "sneakers",
      "product_name": "Nike Air Force 1 '07",
      "pant_fit": "",
      "price": "$90",
      "url": "https://www.Nike.com/t/air-force-1-07-mens-shoe-5QFp5Z/CW2288-111",
      "image_url": "https://static.Nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/4f37fca8-6bce-43e7-ad07-f57ae3c13142/air-force-1-07-mens-shoe-5QFp5Z.jpg"
    },
    {
      "dockey": 57,
      "product_number": 57,
      "brand": "Nike",
      "category": "sneakers",
      "product_name": "Nike Air Force 1 '07",
      "pant_fit": "",
      "price": "$90",
      "url": "https://www.Nike.com/t/air-force-1-07-mens-shoe-xDpsTk/CT2302-002",
      "image_url": "https://static.Nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/d762c5e2-ae49-4208-99df-484594b51e5f/air-force-1-07-mens-shoe-xDpsTk.jpg"
    },
    {
      "dockey": 58,
      "product_number": 58,
      "brand": "Nike",
      "category": "sneakers",
      "product_name": "Nike Blazer Low '77 Vintage",
      "pant_fit": "",
      "price": "$85",
      "url": "https://www.Nike.com/t/blazer-low-77-vintage-mens-shoe-pkcNzf/DA6364-400",
      "image_url": "https://static.Nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/0b195a4d-d73b-4d27-baa9-653d167ca2bd/blazer-low-77-vintage-mens-shoe-pkcNzf.jpg"
    },
    {
      "dockey": 59,
      "product_number": 59,
      "brand": "Nike",
      "category": "sneakers",
      "product_name": "Nike Blazer Low '77 Vintage",
      "pant_fit": "",
      "price": "$85",
      "url": "https://www.Nike.com/t/blazer-low-77-vintage-mens-shoe-pkcNzf/DA6364-101",
      "image_url": "https://static.Nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/fca59736-ff84-4797-9e64-0978d3b43731/blazer-low-77-vintage-mens-shoe-pkcNzf.jpg"
    },
    {
      "dockey": 60,
      "product_number": 60,
      "brand": "Nike",
      "category": "sneakers",
      "product_name": "Nike Air Max 90",
      "pant_fit": "",
      "price": "$120",
      "url": "https://www.Nike.com/t/air-max-90-mens-shoe-6n3vKB/CN8490-100",
      "image_url": "https://static.Nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/zwxes8uud05rkuei1mpt/air-max-90-mens-shoe-6n3vKB.jpg"
    },
    {
      "dockey": 61,
      "product_number": 61,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Slim Jeans with GapFlex",
      "pant_fit": "Slim",
      "price": "$47.00",
      "url": "https://www.gap.com/browse/product.do?pid=706174002&cid=1050839&pcid=6998&vid=1&grid=pds_9_234_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/939/060/cn19939060.jpg"
    },
    {
      "dockey": 62,
      "product_number": 62,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Slim Jeans with GapFlex",
      "pant_fit": "Slim",
      "price": "$47.00",
      "url": "https://www.gap.com/browse/product.do?pid=729595002&cid=1050839&pcid=6998&vid=1&grid=pds_8_234_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/939/002/cn19939002.jpg"
    },
    {
      "dockey": 63,
      "product_number": 63,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Slim Jeans with GapFlex",
      "pant_fit": "Slim",
      "price": "$62.00",
      "url": "https://www.gap.com/browse/product.do?pid=676850002&cid=1050839&pcid=6998&vid=1&grid=pds_11_234_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/897/430/cn19897430.jpg"
    },
    {
      "dockey": 64,
      "product_number": 64,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Straight Jeans",
      "pant_fit": "Straight",
      "price": "$38.00",
      "url": "https://www.gap.com/browse/product.do?pid=644885002&cid=1050840&pcid=6998&vid=1&grid=pds_0_29_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/215/582/cn19215582.jpg"
    },
    {
      "dockey": 65,
      "product_number": 65,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Straight Jeans with GapFlex",
      "pant_fit": "Straight",
      "price": "$47.00",
      "url": "https://www.gap.com/browse/product.do?pid=871867002&cid=1050840&pcid=6998&vid=1&grid=pds_2_29_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/939/026/cn19939026.jpg"
    },
    {
      "dockey": 66,
      "product_number": 66,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "511� SLIM FIT LEVI�S� FLEX MEN'S JEANS",
      "pant_fit": "Slim",
      "price": "$59.99",
      "url": "https://www.levi.com/US/en_US/clothing/men/jeans/511-slim-fit-levis-flex-mens-jeans/p/045111907",
      "image_url": "https://lsco.scene7.com/is/image/lsco/levis/clothing/045111907-front-pdp.jpg?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1155&hei=1540"
    },
    {
      "dockey": 67,
      "product_number": 67,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "511� SLIM FIT LEVI�S� FLEX MEN'S JEANS",
      "pant_fit": "Slim",
      "price": "$59.99",
      "url": "https://www.levi.com/US/en_US/clothing/men/jeans/511-slim-fit-levis-flex-mens-jeans/p/045114655",
      "image_url": "https://lsco.scene7.com/is/image/lsco/045114655-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1155&hei=1540"
    },
    {
      "dockey": 68,
      "product_number": 68,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "511� SLIM FIT LEVI�S� FLEX MEN'S JEANS",
      "pant_fit": "Slim",
      "price": "$59.99",
      "url": "https://www.levi.com/US/en_US/apparel/clothing/bottoms/511-slim-fit-levis-flex-mens-jeans/p/045113623",
      "image_url": "https://lsco.scene7.com/is/image/lsco/levis/clothing/045113623-front-pdp.jpg?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1155&hei=1540"
    },
    {
      "dockey": 69,
      "product_number": 69,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "505� REGULAR FIT MEN'S JEANS",
      "pant_fit": "Straight",
      "price": "$49.99",
      "url": "https://www.levi.com/US/en_US/clothing/men/jeans/505-regular-fit-mens-jeans/p/005054891",
      "image_url": "https://lsco.scene7.com/is/image/lsco/005054891-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1260&hei=1680"
    },
    {
      "dockey": 70,
      "product_number": 70,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "505� REGULAR FIT MEN'S JEANS",
      "pant_fit": "Straight",
      "price": "$49.99",
      "url": "https://www.levi.com/US/en_US/clothing/men/jeans/505-regular-fit-mens-jeans/p/005050260",
      "image_url": "https://lsco.scene7.com/is/image/lsco/005050260-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1260&hei=1680"
    },
    {
      "dockey": 71,
      "product_number": 71,
      "brand": "American Eagle",
      "category": "denim",
      "product_name": "AE AirFlex+ Temp Tech Slim Jean",
      "pant_fit": "Slim",
      "price": "$37.46",
      "url": "https://www.ae.com/us/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-temp-tech-slim-jean/0117_5818_024?menu=cat4840004",
      "image_url": "https://s7d2.scene7.com/is/image/aeo/0117_5818_024_of?$pdp-m-opt$&fmt=webp"
    },
    {
      "dockey": 72,
      "product_number": 72,
      "brand": "American Eagle",
      "category": "denim",
      "product_name": "AE AirFlex+ Temp Tech Slim Jean",
      "pant_fit": "Slim",
      "price": "$37.46",
      "url": "https://www.ae.com/us/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-temp-tech-slim-jean/0117_5700_272?menu=cat4840004",
      "image_url": "https://s7d2.scene7.com/is/image/aeo/0117_5700_272_of?$pdp-m-opt$&fmt=webp"
    },
    {
      "dockey": 73,
      "product_number": 73,
      "brand": "American Eagle",
      "category": "denim",
      "product_name": "AE AirFlex+ Slim Jean",
      "pant_fit": "Slim",
      "price": "$44.96",
      "url": "https://www.ae.com/us/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-slim-jean/0117_5347_938?menu=cat4840004",
      "image_url": "https://s7d2.scene7.com/is/image/aeo/0117_5347_938_of?$pdp-m-opt$&fmt=webp"
    },
    {
      "dockey": 74,
      "product_number": 74,
      "brand": "American Eagle",
      "category": "denim",
      "product_name": "AE AirFlex+ Slim Jean",
      "pant_fit": "Slim",
      "price": "$44.96",
      "url": "https://www.ae.com/us/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-slim-jean/0117_5580_004?menu=cat4840004",
      "image_url": "https://s7d2.scene7.com/is/image/aeo/0117_5580_004_of?$pdp-m-opt$&fmt=webp"
    },
    {
      "dockey": 75,
      "product_number": 75,
      "brand": "American Eagle",
      "category": "denim",
      "product_name": "AE AirFlex+ Slim Jean",
      "pant_fit": "Slim",
      "price": "$44.96",
      "url": "https://www.ae.com/us/en/p/men/slim-fit-jeans/slim-jeans/ae-airflex-slim-jean/0117_5356_081?menu=cat4840004",
      "image_url": "https://s7d2.scene7.com/is/image/aeo/0117_5356_081_of?$pdp-m-opt$&fmt=webp"
    },
    {
      "dockey": 76,
      "product_number": 76,
      "brand": "Banana Republic",
      "category": "denim",
      "product_name": "Slim Organic Jean",
      "pant_fit": "Slim",
      "price": "$119.00",
      "url": "https://bananarepublic.gap.com/browse/product.do?pid=619130002&cid=1174685&pcid=5389&vid=1&nav=meganav%3AMen%3AMen%27s%20Clothing%3ADenim&grid=pds_2_103_1#pdp-page-content",
      "image_url": "https://bananarepublic.gap.com/webcontent/0019/969/637/cn19969637.jpg"
    },
    {
      "dockey": 77,
      "product_number": 77,
      "brand": "Banana Republic",
      "category": "denim",
      "product_name": "Slim Organic Jean",
      "pant_fit": "Slim",
      "price": "$119.00",
      "url": "https://bananarepublic.gap.com/browse/product.do?pid=619084002&cid=1174685&pcid=5389&vid=1&nav=meganav%3AMen%3AMen%27s%20Clothing%3ADenim&grid=pds_4_103_1#pdp-page-content",
      "image_url": "https://bananarepublic.gap.com/webcontent/0019/815/843/cn19815843.jpg"
    },
    {
      "dockey": 78,
      "product_number": 78,
      "brand": "Banana Republic",
      "category": "denim",
      "product_name": "Slim LUXE Traveler Jean",
      "pant_fit": "Slim",
      "price": "$103.00",
      "url": "https://bananarepublic.gap.com/browse/product.do?pid=320601002&cid=1021453&pcid=5389&vid=1&nav=meganav%3AMen%3AMen%27s%20Clothing%3ADenim&grid=pds_7_103_1#pdp-page-content",
      "image_url": "https://bananarepublic.gap.com/webcontent/0019/622/142/cn19622142.jpg"
    },
    {
      "dockey": 79,
      "product_number": 79,
      "brand": "Banana Republic",
      "category": "denim",
      "product_name": "Slim LUXE Traveler Jean",
      "pant_fit": "Slim",
      "price": "$103.00",
      "url": "https://bananarepublic.gap.com/browse/product.do?pid=536787002&cid=1021453&pcid=5389&vid=1&nav=meganav%3AMen%3AMen%27s%20Clothing%3ADenim&grid=pds_12_103_1#pdp-page-content",
      "image_url": "https://bananarepublic.gap.com/webcontent/0018/275/988/cn18275988.jpg"
    },
    {
      "dockey": 80,
      "product_number": 80,
      "brand": "Mugsy Jeans",
      "category": "denim",
      "product_name": "KINZIES",
      "pant_fit": "Slim",
      "price": "$98.00",
      "url": "https://mugsyjeans.com/collections/comfortable-mens-jeans/products/jeans-kinzies?variant=27721274720343",
      "image_url": "https://cdn.shopify.com/s/files/1/0740/9143/products/kinzie-1_1024x.jpg?v=1547743327"
    },
    {
      "dockey": 81,
      "product_number": 81,
      "brand": "Mugsy Jeans",
      "category": "denim",
      "product_name": "STUDIO BLUES",
      "pant_fit": "Slim",
      "price": "$98.00",
      "url": "https://mugsyjeans.com/collections/comfortable-mens-jeans/products/jeans-studio-blues?variant=32364726282",
      "image_url": "https://cdn.shopify.com/s/files/1/0740/9143/products/studio-1-1_1024x.jpg?v=1541442060"
    },
    {
      "dockey": 82,
      "product_number": 82,
      "brand": "Mugsy Jeans",
      "category": "denim",
      "product_name": "BEANS",
      "pant_fit": "Straight",
      "price": "$98.00",
      "url": "https://mugsyjeans.com/collections/comfortable-mens-jeans/products/jeans-beans?variant=27721996730455",
      "image_url": "https://cdn.shopify.com/s/files/1/0740/9143/products/beans-1-1_1024x.jpg?v=1541441406"
    },
    {
      "dockey": 83,
      "product_number": 83,
      "brand": "Mugsy Jeans",
      "category": "denim",
      "product_name": "THERMO JEANS - WOODYS",
      "pant_fit": "Skinny",
      "price": "$108",
      "url": "https://mugsyjeans.com/collections/comfortable-mens-jeans/products/jeans-woodys-thermotech?variant=29426898239575",
      "image_url": "https://cdn.shopify.com/s/files/1/0740/9143/products/woodys-main-new_a7b04219-4db2-4757-81c6-7008df9f6343_1024x.jpg?v=1610391490"
    },
    {
      "dockey": 84,
      "product_number": 84,
      "brand": "Mugsy Jeans",
      "category": "denim",
      "product_name": "THERMO JEANS - CLARKS",
      "pant_fit": "Slim",
      "price": "$108",
      "url": "https://mugsyjeans.com/collections/comfortable-mens-jeans/products/jeans-clarks-thermotech?variant=29426751766615",
      "image_url": "https://cdn.shopify.com/s/files/1/0740/9143/products/clarks-main-new_b64a6785-e96f-4414-99c6-779902637734_1024x.jpg?v=1610391586"
    },
    {
      "dockey": 85,
      "product_number": 85,
      "brand": "Paige",
      "category": "denim",
      "product_name": "Lennox - Gomez",
      "pant_fit": "Slim",
      "price": "$199.00",
      "url": "https://www.paige.com/p/lennox--m653521-3975",
      "image_url": "https://www.paige.com/binaries/content/gallery/products/m/m653521-3975/m653521-3975_01.jpg/m653521-3975_01.jpg/brxp:xlProduct"
    },
    {
      "dockey": 86,
      "product_number": 86,
      "brand": "Paige",
      "category": "denim",
      "product_name": "Federal - Louis",
      "pant_fit": "Straight",
      "price": "$219.00",
      "url": "https://www.paige.com/p/federal--m655f72-3981",
      "image_url": "https://www.paige.com/binaries/content/gallery/products/m/m655f72-3981/m655f72-3981_01.jpg/m655f72-3981_01.jpg/brxp:xlProduct"
    },
    {
      "dockey": 87,
      "product_number": 87,
      "brand": "Paige",
      "category": "denim",
      "product_name": "Lennox - Seeker",
      "pant_fit": "Slim",
      "price": "$199.00",
      "url": "https://www.paige.com/p/lennox--m653743-4016",
      "image_url": "https://www.paige.com/binaries/content/gallery/products/m/m653743-4016/m653743-4016_01.jpg/m653743-4016_01.jpg/brxp:xlProduct"
    },
    {
      "dockey": 88,
      "product_number": 88,
      "brand": "Paige",
      "category": "denim",
      "product_name": "Lennox - Sapphire Blue",
      "pant_fit": "Slim",
      "price": "$199.00",
      "url": "https://www.paige.com/p/lennox--m653799-4959",
      "image_url": "https://www.paige.com/binaries/content/gallery/products/m/m653799-4959/m653799-4959_01.jpg/m653799-4959_01.jpg/brxp:xlProduct"
    },
    {
      "dockey": 89,
      "product_number": 89,
      "brand": "Paige",
      "category": "denim",
      "product_name": "Federal - Vintage Moroccan Dawn",
      "pant_fit": "Straight",
      "price": "$199.00",
      "url": "https://www.paige.com/p/federal--m655799-4962",
      "image_url": "https://www.paige.com/binaries/content/gallery/products/m/m655799-4962/m655799-4962_01.jpg/m655799-4962_01.jpg/brxp:xlProduct"
    },
    {
      "dockey": 90,
      "product_number": 90,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Skinny Jeans with GapFlex",
      "pant_fit": "Skinny",
      "price": "$53.00",
      "url": "https://www.gap.com/browse/product.do?pid=224935002&cid=1050838&pcid=6998&vid=1&nav=meganav%3AJeans%3AJeans%3AMen&grid=pds_0_24_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0015/161/269/cn15161269.jpg"
    },
    {
      "dockey": 91,
      "product_number": 91,
      "brand": "Gap",
      "category": "denim",
      "product_name": "Selvedge Skinny Jeans with GapFlex",
      "pant_fit": "Skinny",
      "price": "$88.00",
      "url": "https://www.gap.com/browse/product.do?pid=374094002&cid=1050838&pcid=6998&vid=1&nav=meganav%3AJeans%3AJeans%3AMen&grid=pds_1_24_1#pdp-page-content",
      "image_url": "https://www.gap.com/webcontent/0019/337/033/cn19337033.jpg"
    },
    {
      "dockey": 92,
      "product_number": 92,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "510 SKINNY FIT MEN'S JEANS",
      "pant_fit": "Skinny",
      "price": "$59.99",
      "url": "https://www.levi.com/US/en_US/apparel/clothing/bottoms/510-skinny-fit-mens-jeans/p/055100692",
      "image_url": "https://lsco.scene7.com/is/image/lsco/055100692-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1155&hei=1540"
    },
    {
      "dockey": 93,
      "product_number": 93,
      "brand": "Levi's",
      "category": "denim",
      "product_name": "510 SKINNY FIT MEN'S JEANS",
      "pant_fit": "Skinny",
      "price": "$59.99",
      "url": "https://www.levi.com/US/en_US/apparel/clothing/bottoms/510-skinny-fit-mens-jeans/p/055100675",
      "image_url": "https://lsco.scene7.com/is/image/lsco/055100675-front-pdp?fmt=jpeg&qlt=70,1&op_sharpen=0&resMode=sharp2&op_usm=0.8,1,10,0&fit=crop,0&wid=1155&hei=1540"
    }
  ]
   

console.log(productList.length)

for(let i=0; i<productList.length;i++)
{
    let product = productList[i]
    console.log(product)
    await db.collection('products').add({
      
      product_number: product.product_number,  
      brand: product.brand,
      category: product.category,
      pant_fit: product.pant_fit,
      product_name: product.product_name,
      price: product.price,
      url: product.url,
      image_url: product.image_url

    })
}
    
})