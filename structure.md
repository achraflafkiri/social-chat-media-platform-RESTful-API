#السلام عليكم


errController.js 
    - ghadi nrja3 liha fach nkmal upload audio wela music


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
