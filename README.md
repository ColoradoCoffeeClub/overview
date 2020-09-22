# CCC API - Product Overview Section

Designed and built the back-end API for this microservice, part of an E-Commerce retail store selling clothing, shoes, and accessories. 

## Metrics/Milestones

After routes were built and the database was designed, I generated 10M primary records and seeded my Mongo database:
![image of loading db](https://github.com/ColoradoCoffeeClub/overview/blob/master/public/Screen%20Shot%202020-09-03%20at%202.30.17%20PM.png)

![image of seeded DB](https://github.com/ColoradoCoffeeClub/overview/blob/master/public/Screen%20Shot%202020-09-21%20at%2010.30.16%20PM.png)

Once the server and DB were up and running I stress tested using Artillery.io and New Relic:
![image of artillery](https://github.com/ColoradoCoffeeClub/overview/blob/master/public/Screen%20Shot%202020-09-21%20at%209.48.20%20PM.png)

![image of new relic dash](https://github.com/ColoradoCoffeeClub/overview/blob/master/public/Screen%20Shot%202020-09-09%20at%2012.47.14%20PM.png)

Finally, both server and DB were deployed to EC2 instances and hooked up:
![image 1 of postman](https://github.com/ColoradoCoffeeClub/overview/blob/master/public/Screen%20Shot%202020-09-12%20at%203.59.16%20PM.png)

![image 2 of postman](https://github.com/ColoradoCoffeeClub/overview/blob/master/public/Screen%20Shot%202020-09-12%20at%203.58.54%20PM.png)



## API Routes and Respective Information
### List Products

`GET /products/list`
Retrieves the list of products.

Parameters

| Parameter | Type    | Description                                               |
| --------- | ------- | --------------------------------------------------------- |
| page      | integer | Selects the page of results to return.  Default 1.        |
| count     | integer | Specifies how many results per page to return. Default 5. |

Response

`Status: 200 OK `

```json
[
  {
		"id": 1,
		"name": "Camo Onesie",
		"slogan": "Blend in to your crowd",
		"description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
		"category": "Jackets",
		"default_price": "140"
	},
  {
		"id": 2,
		"name": "Bright Future Sunglasses",
		"slogan": "You've got to wear shades",
		"description": "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
		"category": "Accessories",
		"default_price": "69"
	},
  {
		"id": 3,
		"name": "Morning Joggers",
		"slogan": "Make yourself a morning person",
		"description": "Whether you're a morning person or not. Whether you're gym bound or not. Everyone looks good in joggers.",
		"category": "Pants",
		"default_price": "40"
	},
	// ...
]
```



### Product Information

Returns all product level information for a specified product id.

`GET /products/:product_id`

Parameters

| Parameter  | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| product_id | integer | Required ID of the Product requested |

Response

`Status: 200 OK `

```json
{
	"id": 11,
	"name": "Air Minis 250",
	"slogan": "Full court support",
	"description": "This optimized air cushion pocket reduces impact but keeps a perfect balance underfoot.",
	"category": "Basketball Shoes",
	"default_price": "0",
	"features": [
  	{
			"feature": "Sole",
			"value": "Rubber"
		},
  	{
			"feature": "Material",
			"value": "FullControlSkin"
		},
  	// ...
	],
}
```



### Product Styles

Returns the all styles available for the given product.

`GET /products/:product_id/styles`

Parameters

| Parameter  | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| product_id | integer | Required ID of the Product requested |

Response

`Status: 200 OK `

```json
{
	"product_id": "1",
	"results": [
  	{
			"style_id": 1,
			"name": "Forest Green & Black",
			"original_price": "140",
			"sale_price": "0",
			"default?": 1,
			"photos": [
  			{
					"thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
					"url": "urlplaceholder/style_1_photo_number.jpg"
				},
  			{
					"thumbnail_url": "urlplaceholder/style_1_photo_number_thumbnail.jpg",
					"url": "urlplaceholder/style_1_photo_number.jpg"
				}
  			// ...
			],
		"skus": {
			"XS": 8,
			"S": 16,
			"M": 17,
			"L": 10,
			"XL": 15
		}
	},
  {
		"style_id": 2,
		"name": "Desert Brown & Tan",
		"original_price": "140",
		"sale_price": "0",
		"default?": 0,
		"photos": [
  			{
					"thumbnail_url": "urlplaceholder/style_2_photo_number_thumbnail.jpg",
					"url": "urlplaceholder/style_2_photo_number.jpg"
        }
      // ...
			],
		"skus": {
			"S": 16,
			"XS": 8,
			"M": 17,
			"L": 10,
			"XL": 15,
			"XXL": 6
			}
	},
  // ...
}
```



### Related Products

Returns the id's of products related to the product specified.

`GET /products/:product_id/related`

Parameters

| Parameter  | Type    | Description                          |
| ---------- | ------- | ------------------------------------ |
| product_id | integer | Required ID of the Product requested |

Response

`Status: 200 OK `

```json
[
  2,
  3,
  8,
  7
],
```

