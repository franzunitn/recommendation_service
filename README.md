***API DOCUMENTATION***

**Add user**
----
  Add a user to recombee system

* **URL**

  /add-user

* **Method:**

  `POST`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "OK"
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Add interaction**
----
  Add an interaction for the specified user and item

* **URL**

  /add-interaction

* **Method:**

  `POST`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Data Params**

  **Required:**
  `{ "user_id": "id of the user",  "item_id":"Id of the item"}`
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "OK"
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Get recomendation**
----
  Return N recomendations for the specified user 

* **URL**

  /get-recomendations/user/:user_id/number/:number

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
 
   `user_id=[user_id]`
   `number=[number of recomendations]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "adult": adult,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Get recommended movies**
----
  Return N recommended movies for the specified user

* **URL**

  /get-recomendations/movies/user/:user_id/number/:number

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
 
   `user_id=[user_id]`
   `number=[number of recomendations]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "adult": adult,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Get recommended tvs**
----
  Return N recommended tv shows for the specified user

* **URL**

  /get-recomendations/tvs/user/:user_id/number/:number

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
 
   `user_id=[user_id]`
   `number=[number of recomendations]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "original_language": original language
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Get recommended games**
----
  Return N recommended games for the specified user

* **URL**

  /get-recomendations/games/user/:user_id/number/:number

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`

* **Url Params**

  **Required:**
 
   `user_id=[user_id]`
   `number=[number of recomendations]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    `{
        "id": id of the item,
        "year": year,
        "title": title,
        "overview": overview,
        "genre_ids": genre_ids,
        "category": category
    };`
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Init propieties**
----
  Initialize the recombee database with the various propieties of the item (e.g. title, overview ecc...)
  Call this endpoint only when you have an empty recombee database

* **URL**

  '/init-propieties'

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "OK"
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`


**Init movies**
----
  Fill the recombee database with the data of the movies (the top 250 ones)

* **URL**

  '/init-movies'

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "OK"
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`

**Init tvs**
----
  Fill the recombee database with the data of the tv show (the top 250 ones)

* **URL**

  '/init-tvs'

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "OK"
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`
**Init games**
----
  Fill the recombee database with the data of games (the top 250 ones)

* **URL**

  '/init-games'

* **Method:**

  `GET`

* **Header Params**

  **Required:**
  `x-access-token=your_jwt`


* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    "OK"
 
* **Error Response:**

  * **Code:** 403 FORBIDDEN <br />
    **Content:** `{ message : "Auth token must be specified" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : "Invalid token" }`

  OR

   * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message : "Invalid auth request" }`