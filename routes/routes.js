const express = require('express'),
  jwt = require('jsonwebtoken'),
  multer = require('multer');

const controller = require('../controllers/controllers');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/files');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()} ${file.originalname}`);
  },
});

const upload = multer({ dest: "../public/files/" });

//--user route endpoints--
//get all data base on collection name
router.get('/collection/:name', controller.getCollection);
//find single item base on the collection name parameter
router.get('/:name/:id', controller.findItem);
//find & delete single item base on the collection name parameter
router.delete('/:name/:id', controller.deleteItem);
//--like post item endpoints --
router.put('/:name/:id/like/:userid', controller.likePostItem);
//--insert viewer
router.put('/:name/:id/view/:userid', controller.AddViewerOnPost);
//--follow user
router.put('/user/:id/follow/:follower', controller.followUser);
//--search anything
router.get('/search/:keyword', controller.Search);
//login endpoint
router.post('/auth', controller.Login);
//signup endpoint
router.post('/signup', controller.userSignup);
//edit user
router.put('/users/:id', controller.editUser);
//add coins
router.put('/users/:id/coins', controller.AddCoins);
//use coins
router.put('/users/coins/use', controller.UseCoins);
//system statistics
router.get('/stats', controller.Stats);
//--post route endpoints--
//add post
router.post('/post', controller.addPost);
//--get user's posts
router.get('/post/user/:id', controller.getUserPosts);
//--get user vibe music posts
router.get('/vibe/user/:id', controller.getUserVibePosts);
//--get user text posts
router.get('/text/user/:id', controller.getUserTextPosts);
//--get user video posts
router.get('/video/user/:id', controller.getUserVideoPosts);
//edit post
router.put('/post/:id', controller.editPost);
//add text post
router.post('/text', controller.addTextPost);
//edit text post
router.put('/text/:id', controller.editTextPost);
//--comment endpoints--
//get comment collection base on post type
router.get('/collection/comment/:type', controller.getCollectionComment);
//add comment for post or text
router.post('/:db/comment/add', controller.addCommentPost);
//get comments for post or text
router.get('/:db/:id/comments', controller.getPostComments);
//reply to comment
router.post('/:db/comment/reply', controller.replyCommentPost);
//edit comment or reply
router.put('/:db/comment/:comment_id', controller.editCommentPost);
//delete comment or reply
router.delete('/:db/comment/:id', controller.deleteCommentPost);
//--message route endponts--
//add message
router.post('/message/from/:sender/to/:receiver', controller.addMessage);
//get sent messages
router.get('/messages/user/:id/sent', controller.getSentMessages);
//get inbox messages
router.get('/messages/user/:id/inbox', controller.getInboxMessages);
//get user messages
router.get('/messages/user/:id', controller.getUserMessages);
//get conversation messages
router.get('/messages/user/:userid/and/:id', controller.getConversationMessages);
//edit message
router.put('/message/:id', controller.editMessage);
//--video streaming endpoints--
//add video
router.post('/video', controller.addVideo);
//edit video
router.put('/video/:id', controller.editVideo);
//--vibe endpoint--
//publish music
router.post('/vibe', controller.publishMusic);
//update music
router.put('/vibe/:id', controller.updateMusic);
//--vibe album endpoint--
//create album
router.post('/vibe/album', controller.createAlbum);
//update album
router.put('/vibe/album/:id', controller.updateAlbum);

module.exports = router;
