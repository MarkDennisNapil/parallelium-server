const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema({
    publisher: {
        type: String
    },
    title: {
        type: String
    },
    file: {
        type: String
    },
    lyrics: {
        type: String
    },
    cover_photo: {
        type: String
    },
    views: {
        type: Array
    },
    tags: {
        type: Array
    },
    likes: {
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
},
{
    collection: 'vibe'
});
const music = mongoose.model("music", musicSchema);

const albumSchema = new mongoose.Schema({
    owner: {
        type: String
    },
    name: {
        type: String
    },
    description: {
        type: String
    },
    playlist: {
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
    collection: 'vibe_albums'
});
const album = mongoose.model("album", albumSchema);

module.exports = {music, album};