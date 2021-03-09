const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//handles the individual items users place into swaps.

//take item from user and place it into the  ITEM database
//fields not filled out will become null
router.post("/", rejectUnauthenticated, (req, res) => {
  const item = req.body;
  console.log("sending item", item);
  const queryText = `INSERT INTO "items" ("user_id", "cat_id", "title", "size", "price", 
  "flex", "style", "brand", "shape", "gender", "profile", "condition", 
  "lacing_system", "description")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)`;
  pool
    .query(queryText, [
      item.user_id,
      item.cat_id,
      item.title,
      item.size,
      item.price,
      item.flex,
      item.style,
      item.brand,
      item.shape,
      item.gender,
      item.profile,
      item.condition,
      item.lacing_system,
      item.description,
    ])
    .then((response) => {
      console.log(response);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

//return contents of ITEM's table where the user ID matches the
//user_id of the item being grabbed.

//how will we grab the users id to only grab users listed in
//the current swap?

router.get("/", rejectUnauthenticated, (req, res) => {
  const userId = req.user.id;
  console.log("GETting items");

  const queryText = `
      SELECT items.*, ARRAY_AGG(url) image FROM "items" 
      LEFT JOIN "images" ON "items".id = "images".item_id
      WHERE "user_id" = $1
      GROUP BY "items".id
      ORDER BY "cat_id" ASC;
    `;
  pool
    .query(queryText, [userId])
    .then((result) => {
      console.log(result);

      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// Add item to Favorites
router.post('/addToFav', (req, rejectUnauthenticated, res) => {
  const userId = req.user.id;
  const itemToFav = req.body
  console.log('adding item to favorites', itemToFav);

  const queryText = `
  INSERT INTO "favorites" ("user_id", "item_id")
  VALUES ($1, $2);
  `;

  pool
    .query(queryText, [userId, itemToFav.id])
    .then((result) => {
      console.log(result);
      res.sendStatus(201)

    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });

})

router.get('/favorites', (req, rejectUnauthenticated, res) => {
  const userId = req.user.id;
  console.log('GETting favorites for:', userId);

  const queryText = `
  SELECT * from "items"
  JOIN "favorites" ON "favorites".item_id = "items".id
  WHERE "favorites".user_id = $1;
  `;

  pool
    .query(queryText, [userId])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows)

    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
  
})

//route to edit an item using the ITEM_ID
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const itemToEdit = req.params.id;
  const queryText = `UPDATE "items" WHERE "user_id" = $1, "cat_id" = $2, "size" = $3, "price" =$4, "flex" = $5, "style" = $6, 
  "brand" = $7, "shape" = $8, "gender" = $9, "profile" = $10, 
  "condition" = $11, "lacing_system" = $12, "purchased" = $13, 
  "description" = $14`;
  pool
    .query(queryText, [
      req.body.user_id,
      req.body.cat_id,
      req.body.size,
      req.body.price,
      req.body.flex,
      req.body.style,
      req.body.brand,
      req.body.shape,
      req.body.gender,
      req.body.profile,
      req.body.condition,
      req.body.lacing_system,
      req.body.purchased,
      req.body.description,
      itemToEdit,
    ])
    .then((response) => {
      response.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making Edit to database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

//delete an existing item from the ITEM table
router.delete("/:id", rejectUnauthenticated, (req, res) => {
  const itemToDelete = req.params.id;
  console.log(itemToDelete);
  //id this doesn't print correctly, it's a front end data error
  const queryText = `DELETE FROM "items" WHERE id = $1;`;
  pool
    .query(queryText, [itemToDelete])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log(`Error making DELETE database query ${queryText}`, error);
      res.sendStatus(500);
    });
});

module.exports = router;
