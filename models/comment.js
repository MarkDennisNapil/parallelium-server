const mongoose = require('mongoose');

const postCommentSchema = new mongoose.Schema({
  postID: {
    type: String,
    required: [true, "PostID required!"]
  },
  comment: {
    type: String,
    required: [true, "Comment cannot be empty!"]
  },
  commentedBy: {
    type: String,
    required: [true, "Commentor required"]
  },
  commentType: {
    type: String
  },
  commentID: {
    type: String
  },
  dateCreated: {
    type: String
  },
  dateModified: {
    type: String
  }
},
  {
    collection: 'post_comment'
  });
const postComment = mongoose.model("postComment", postCommentSchema);

const articleComment = new mongoose.Schema({
  postID: {
    type: String
  },
  comment: {
    type: String
  },
  commentedBy: {
    type: String
  },
  commentType: {
    type: String
  },
  commentID: {
    type: String
  },
  dateCreated: {
    type: String
  },
  dateModified: {
    type: String
  }
},
  {
    collection: 'textComment'
  });
const textComment = mongoose.model("articleComment", articleComment);

module.exports = { postComment, textComment };
