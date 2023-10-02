const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  owner: {
    type: String
  },
  title: {
    type: String
  },
  details: {
    type: String
  },
  files: {
    type: Array
  },
  tags: {
    type: Array
  },
  likes: {
    type: Array
  },
  views: {
    type: Array
  },
  dateCreated: {
    type: String
  },
  dateModified: {
    type: String
  }
},
  {
    collection: 'post_collection'
  })
const post = mongoose.model("post", postSchema);

const textSchema = new mongoose.Schema({
  writers: {
    type: String
  },
  header: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  },
  backgroundCover: {
    type: String
  },
  tags: {
    type: Array
  },
  likes: {
    type: Array
  },
  views: {
    type: Array
  },
  comments: {
    type: Array
  },
  dateCreated: {
    type: String
  },
  dateModified: {
    type: String
  }
},{
  collection: 'text_collection'
});
const text = mongoose.model("text", textSchema);

const videoSchema = new mongoose.Schema({
  owner: {
      type: String
  },
  title: {
      type: String
  },
  description: {
      type: String
  },
  file: {
      type: String
  },
  thumbnail: {
    type: String
  },
  subtitle: {
      type: String
  },
  likes: {
      type: Array
  },
  views: {
      type: Array
  },
  tags: {
      type: Array
  },
  dateCreated: {
      type: String
  },
  dateModified: {
      type: String
  }
},
{
  collection: 'video_collection'
})
const video = mongoose.model("video", videoSchema);

module.exports = {post, text, video};
