#السلام عليكم

# Controllers:

    ** Music Controller **

    Upload Music: Create a route and controller function that allows authenticated users to upload music files to the server and create a new music document in the database. You'll need to handle the file upload using a middleware such as Multer and then save the file path to the 'file' field in the music schema.

    Get Music: Create a route and controller function that allows users to retrieve a list of all the music on the platform or a specific music by id.

    Update Music: Create a route and controller function that allows the uploader of the music or an admin to update the music's information.

    Delete Music: Create a route and controller function that allows the uploader of the music or an admin to delete a music.

    Like Music: Create a route and controller function that allows users to like a music. This could involve incrementing the 'likes' field in the music schema and saving the user's id in an array of 'likedBy' field.

    Comment on Music: Create a route and controller function that allows users to post comments on a music. This could involve creating a new comment document in the database and saving its id in the 'comments' array in the music schema.

    Get Comments: Create a route and controller function that allows users to retrieve all the comments for a specific music.

    Search Music: Create a route and controller function that allows users to search for music by title, artist, or album. This could involve using a text index and the $text operator in MongoDB to perform the search.

- Type of litters  
   Controller:
  CamelCase (getAllUsers)
  Models:
  lowerCase (likesmodel)

errController.js - ghadi nrja3 liha fach nkmal upload audio wela music

- app.js (entry point for the application)
- package.json
- routes/
  - auth.js (routes for user authentication and registration)
  - music.js (routes for managing music tracks)
  - comments.js (routes for managing comments)
  - likes.js (routes for managing likes)
- controllers/
  - authController.js (handles logic for user authentication and registration)
  - musicController.js (handles logic for music track uploads, downloads, and search)
  - commentsController.js (handles logic for comments)
  - likesController.js (handles logic for likes)
- middleware/
  - authMiddleware.js (handles authentication and authorization)
  - multer.js (handles file uploads)
- models/
  - User.js (defines the User model for the MongoDB database)
  - Music.js (defines the Music model for the MongoDB database)
  - Comment.js (defines the Comment model for the MongoDB database)
  - Like.js (defines the Like model for the MongoDB database)
- public/ (folder for storing publicly accessible files, such as music tracks)
- views/ (folder for storing views)
