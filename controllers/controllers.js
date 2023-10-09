const jwt = require('jsonwebtoken');

const userModel = require('../models/user'),
  { post, text, video } = require('../models/post'),
  { postComment, textComment } = require('../models/comment'),
  { music, album } = require('../models/vibe'),
  messageModel = require('../models/message');
const coins_transactions = require('../models/coins_transactions');

const postModel = post, textModel = text, videoModel = video,
  vibeModel = music, albumModel = album,
  postCommentModel = postComment, textCommentModel = textComment;

const uploadpath = __dirname + "/../public/files/";
//get all record base on collection name endpoints
exports.getCollection = (req, res) => {
  let rp_name = req.params.name;
  let collname;
  if (rp_name === "users") {
    collname = userModel;
  }
  else if (req.params.name === "post") {
    collname = postModel;
  }
  else if (rp_name === "text") {
    collname = textModel;
  }
  else if (rp_name === "video") {
    collname = videoModel;
  }
  else if (rp_name === "vibe") {
    collname = vibeModel;
  }
  else if (rp_name === "album") {
    collname = albumModel;
  }
  else if (rp_name === "message") {
    collname = messageModel;
  }
  else {
    res.json({ message: "No collection found" });
    console.log("0 result");
  }
  if (rp_name !== null) {
    collname.find()
      .then((result) => {
        res.json({ message: "Success", data: result });
        console.log(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
        console.log(err);
      });
  }
  else {
    res.json({ message: "Error! No collection found" });
    console.log("No collection found!");
  }
}
exports.findItem = (req, res) => {
  const rp_name = req.params.name,
    rp_id = req.params.id;
  let collname;
  if (rp_name === "users") {
    collname = userModel;
  }
  else if (req.params.name === "post") {
    collname = postModel;
  }
  else if (rp_name === "text") {
    collname = textModel;
  }
  else if (rp_name === "video") {
    collname = videoModel;
  }
  else if (rp_name === "vibe") {
    collname = vibeModel;
  }
  else if (rp_name === "album") {
    collname = albumModel;
  }
  else if (rp_name === "message") {
    collname = messageModel;
  }
  else if (rp_name === "commentonpost") {
    collname = postCommentModel;
  }
  else if (rp_name === "commentontext") {
    collname = textCommentModel;
  }
  else {
    console.log("0 result");
  }
  if (rp_name !== null && rp_id !== null) {
    collname.findById(rp_id)
      .then((result) => {
        res.json({ message: "Success", data: result });
      })
      .catch((err) => {
        res.status(500).send(err.stack);
        console.log(err.message);
      });
  }
  else {
    res.json({ message: "Error! No item found" });
    console.log("No item found!");
  }
}
exports.deleteItem = (req, res) => {
  let rp_name = req.params.name,
    rp_id = req.params.id;
  let collname;
  if (rp_name === "users") {
    collname = userModel;
  }
  else if (req.params.name === "post") {
    collname = postModel;
  }
  else if (rp_name === "text") {
    collname = textModel;
  }
  else if (rp_name === "video") {
    collname = videoModel;
  }
  else if (rp_name === "vibe") {
    collname = vibeModel;
  }
  else if (rp_name === "album") {
    collname = albumModel;
  }
  else if (rp_name === "message") {
    collname = messageModel;
  }
  else {
    res.json({ message: "No collection found" });
    console.log("0 result");
  }
  if (rp_name !== null && rp_id !== null) {
    collname.findByIdAndDelete(rp_id)
      .then((result) => {
        res.json({ message: "Success", result });
        console.log(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
        console.log(err);
      });
  }
  else {
    res.json({ message: "Error! No item found" });
    console.log("No item found!");
  }
}
//like or react
exports.likePostItem = (req, res) => {
  let rp_userid = req.params.userid;
  let rp_name = req.params.name,
    rp_id = req.params.id;
  let collname;
  if (rp_name === "post") {
    collname = postModel;
  }
  else if (req.params.name === "text") {
    collname = textModel;
  }
  else if (rp_name === "vibe") {
    collname = vibeModel;
  }
  else if (rp_name === "video") {
    collname = videoModel;
  }
  else if (rp_name === "message") {
    collname = messageModel;
  }
  else {
    res.json({ message: "No collection found" });
    console.log("0 result");
  }
  if (rp_name !== null && rp_id !== null && rp_userid) {
    collname.findByIdAndUpdate({ _id: rp_id }, { $push: { likes: rp_userid } }, { safe: true, upsert: true })
      .then((result) => {
        res.json({ message: "React submitted!", data: result });
        console.log(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
        console.log(err);
      });
  }
  else {
    res.json({ message: "Error! Incomplete data!" });
    console.log(`Incomplete!`);
  }
}
exports.AddViewerOnPost = (req, res) => {
  let rp_userid = req.params.userid;
  let rp_name = req.params.name,
    rp_id = req.params.id;
  let collname;
  if (rp_name === "post") {
    collname = postModel;
  }
  else if (req.params.name === "text") {
    collname = textModel;
  }
  else if (rp_name === "vibe") {
    collname = vibeModel;
  }
  else if (rp_name === "video") {
    collname = videoModel;
  }
  else if (rp_name === "message") {
    collname = messageModel;
  }
  else {
    console.log("0 result");
  }
  if (rp_name !== null && rp_id !== null && rp_userid) {
    collname.findByIdAndUpdate({ _id: rp_id }, { $push: { views: rp_userid } }, { safe: true, upsert: true })
      .then((result) => {
        res.json({ message: "React submitted!", data: result });
        console.log(result);
      })
      .catch((err) => {
        res.status(500).send(err.stack);
        console.log(err);
      });
  }
  else {
    res.json({ message: "Error! Incomplete data!" });
    console.log(`Incomplete!`);
  }
}
exports.followUser = (req, res) => {
  let rp = req.params;
  let userFollowed = false, userFollowing = false;
  userModel.find({ _id: [rp.id, rp.follower] })
    .then(user => {
      for (let i = 0; i < user.length; i++) {
        if (user[i].id === rp.id) {
          for (let j = 0; j < user[i].followers.length; j++) {
            if (user[i].followers[j] === rp.follower) {
              userFollowed = true;
            }
          }
        } else {
          for (let j = 0; j < user[i].following.length; j++) {
            if (user[i].following[j] === rp.id) {
              userFollowing = true;
            }
          }
        }
      }
      if (!userFollowed && !userFollowing) {
        Promise.all([
          userModel.findByIdAndUpdate({ _id: rp.id }, { $push: { followers: rp.follower } }, { safe: true, upsert: true }),
          userModel.findByIdAndUpdate({ _id: rp.follower }, { $push: { following: rp.id } }, { safe: true, upsert: true })
        ]).then(result => {
          res.json({ message: "Followed", result });
        })
          .catch(error => {
            console.log(error);
          });
      } else {
        res.json({ message: "Followed" });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
exports.Search1 = (req, res) => {
  let keyword = req.params.words;
  Promise.all([
    userModel.find({ $text: { $search: keyword } }),
    postModel.find({ $text: { $search: keyword } }),
    textModel.find({ $text: { $search: keyword } }),
    videoModel.find({ $text: { $search: keyword } }),
    vibeModel.find({ $text: { $search: keyword } })
  ]).then(data => {
    res.json({ user: data[0], post: data[1], text: data[2], video: data[3], music: data[4] });
  })
    .catch(error => {
      console.log(error);
    });
}
exports.Stats = (req, res) => {
  Promise.all([
    userModel.countDocuments(),
    postModel.countDocuments(),
    textModel.countDocuments(),
    vibeModel.countDocuments(),
    videoModel.countDocuments()
  ])
  .then(response => {
    res.json({
      userCount: response[0], 
      gallerylaneCount: response[1],
      paperCount: response[2],
      vibeCount: response[3],
      videoCount: response[4]
    });
  })
  .catch(error => {
    console.log(error.message);
  })
}
exports.Search = (req, res) => {
  let keyword = req.params.keyword;
  userModel.find(
  {
    $search: {
      index: "default",
      text: {
        query: keyword,
        path: {
          wildcard: "*"
        }
      }
    }
  }
)
  .then(response => res.json({data: response}))
  .catch(error => console.log(error))
}
//user 
exports.Login = (req, res) => {
  let rb = req.body;
  userModel.findOne({ email: rb.email })
    .then(user => {
      if (user) {
        const maxAge = 60000;
        if (rb.password === user.password) {
          let token = jwt.sign({ id: user._id, email: user.email }, 'verySecretValue', { expiresIn: 60000 })
          res.cookie("jwt", token, {
            httpOnly: true,
            token: token,
            maxAge: maxAge
          });
          res.json({ message: "Login successful!", id: user._id, token });
        } else {
          res.json({ message: "Password does not match!", user });
        }
      } else {
        res.json({ message: "User not found!" });
      }
    })
    .catch(err => {
      console.log(err);
    });
}
exports.userLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  userModel.findOne({ email: email })
    .then((exist) => {
      if (email && password) {
        if (req.session.authenticated) {
          res.json(req.session);
          console.log("signed in...");
        }
        else {
          if (password == exist.password) {
            req.session.authenticated = true;
            req.session.user = {
              email, password
            };
            //jwt
            const token = jwt.sign({
              userId: exist._id,
              userEmail: exist.email,
            },
              "RANDOM-TOKEN",
              { expiresIn: "24h" })
            exist.token = token;
            res.json({
              message: "Login successful!",
              token: token,
              data: exist,
              sessionID: req.sessionID,
              session: req.session
            });
            console.log(req.sessionID);
            console.log(req.session);
          }
          else {
            res.status(403).send({ message: 'Bad Credentials! Wrong password.' });
          }
        }
      }
      else {
        res.status(403).send({ message: 'Bad Credentials!' });
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
exports.userSignup = (req, res) => {
  userModel.findOne({ email: req.body.email })
    .then((exist) => {
      if (req.body.email == exist.email) {
        res.json({
          message: "Email already exist!"
        });
      }
      else {
        res.json({
          message: "Email is usable!"
        });
      }
    })
    .catch((e) => {
      let rb = req.body, rf = req.files;
      let file = rf.file;
      let filename = file.md5 + file.name;
      let data = {
        first_name: rb.first_name,
        last_name: rb.last_name,
        email: rb.email,
        password: rb.password,
        birthdate: rb.birthdate,
        photo: filename
      }
      file.mv(`${uploadpath}${filename}`, (err) => {
        if (err) {
          res.json({ message: 'Failed to upload file!' });
        } else {
          userModel.create(data)
            .then((isRegistered) => {
              res.json({
                message: "Successfully registered!",
                user: isRegistered
              });
              console.log(`Successfully registered! || ${req.originalUrl} || ${new Date().toString()} \n data: \n ${isRegistered}`)
            })
            .catch((err) => {
              res.json({
                message: "Registration failed!"
              });
              console.log(err);
            });
        }
      })
    });
}
exports.editUser = (req, res) => {
  let rb = req.body;
  if (rb.type === 'detailswithfile') {
    let file = req.files.file;
    let filename = file.md5 + file.name;
    let data = {
      first_name: rb.first_name,
      last_name: rb.last_name,
      profession: rb.profession,
      phone: rb.phone,
      email: rb.email,
      photo: filename
    };
    file.mv(`${uploadpath}${filename}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed" });
      } else {
        userModel.findByIdAndUpdate(req.params.id, {
          $set: data
        })
          .then(result => {
            res.json({ message: "Edited successfully!" });
          })
          .catch(err => {
            console.log(err);
          });
      }
    })
  }
  else {
    let data = {
      first_name: rb.first_name,
      last_name: rb.last_name,
      profession: rb.profession,
      phone: rb.phone,
      email: rb.email
    };
    userModel.findByIdAndUpdate(req.params.id,
      {
        $set: data
      })
      .then((result) => {
        console.log(`Successfully updated records! || ${req.originalUrl} || ${new Date().toString()}\nData:\n${JSON.stringify(req.body)}`);
        res.json({ message: "Edited successfully!" });
      })
      .catch((err) => {
        res.status(500).send(err.stack);
      });
  }
}
//coins endpoints
exports.AddCoins = (req, res) => {
  var total_amount;
  userModel.findById(req.params.id)
    .then(response => {
      total_amount = response.coins + req.body.amount;
      const amount = { coins: total_amount }
      userModel.findByIdAndUpdate(req.params.id,
        {
          $set: amount
        })
        .then(() => {
          res.json({ message: "Deposit successfully!" })
        })
        .catch(err => {
          console.log(err.message);
        });
    })
    .catch(error => {
      console.log(error.message);
    });
}
exports.UseCoins = (req, res) => {
  Promise.all([userModel.findById({ _id: req.body.sender }), userModel.findById({ _id: req.body.receiver })])
    .then(data => {
      const amount_send = data[1].coins + parseInt(req.body.amount);
      const amount_reduce = data[0].coins - parseInt(req.body.amount);
      const transaction = {
        sender: req.body.sender,
        receiver: req.body.receiver,
        amount: req.body.amount,
        description: req.body.description,
        date: new Date().toString()
      }
      if (data[0].coins == 0) {
        res.json({ message: "Insufficient coins!" });
      } else {
        Promise.all([
          userModel.findByIdAndUpdate(req.body.sender, { $set: { coins: amount_reduce } }),
          userModel.findByIdAndUpdate(req.body.receiver, { $set: { coins: amount_send } }),
          coins_transactions.create(transaction)
        ])
          .then(response => {
            res.json({ message: "Transaction success!", data: response });
          })
          .catch(err => { console.log(err.message) });
      }
    })
    .catch(error => {
      console.log(error);
    });
}
//post endpoints
exports.addPost = (req, res) => {
  const uploadpath = __dirname + "/../public/files/";
  let files = [];
  let success = 1;
  let filenames = [];
  if (req.files.file.length > 1) {
    for (let i = 0; i < req.files.file.length; i++) {
      req.files.file[i].mv(`${uploadpath}${req.files.file[i].md5 + "-" + req.files.file[i].name}`, function uploadStatus(err) {
        if (err) {
          console.log(err);
          return success = 0;
        }
        return success = 1;
      });

      files[i] = req.files.file[i];
      filenames[i] = req.files.file[i].md5 + "-" + req.files.file[i].name;
    }
    console.log("Status" + success);
    if (success === 0) {
      res.json({ message: "Upload failed" });
    } else {
      let data = {
        owner: req.body.owner,
        title: req.body.title,
        details: req.body.details,
        files: filenames,
        tags: req.body.tags,
        upload_date: new Date().toString(),
        date_modified: new Date().toString()
      };
      postModel.create(data)
        .then((result) => {
          res.json({
            message: 'Upload complete',
          });
          console.log(result);
          console.log(files);
        })
        .catch((err) => {
          console.log(err);
          res.json({
            message: 'Failed saving data',
            err,
          });
        });
    }
  }
  else {
    let file = req.files.file;
    let filename = file.md5 + file.name;
    let data = {
      owner: req.body.owner,
      title: req.body.title,
      details: req.body.details,
      files: filename,
      tags: req.body.tags,
      date_modified: new Date().toString()
    }
    file.mv(`${uploadpath}${filename}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed!" });
      } else {
        postModel.create(data)
          .then((result) => {
            res.json({
              message: 'Upload complete',
              data: file
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({
              message: 'Failed saving data',
              err,
            });
            console.log(err);
          });
      }
    })
  }
}
exports.getUserPosts = (req, res) => {
  postModel.find({ owner: req.params.id })
    .then((data) => {
      res.send(data);
      console.log(`Retrieval success! || ${req.originalUrl} || ${new Date().toString()}\nData:\n${JSON.stringify(data)}`);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}
exports.getUserVibePosts = (req, res) => {
  vibeModel.find({ publisher: req.params.id })
    .then((data) => {
      res.send(data);
      console.log(`Retrieval success! || ${req.originalUrl} || ${new Date().toString()}\nData:\n${JSON.stringify(data)}`);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}
exports.getUserTextPosts = (req, res) => {
  textModel.find({ writers: req.params.id })
    .then((data) => {
      res.send(data);
      console.log(`Retrieval success! || ${req.originalUrl} || ${new Date().toString()}\nData:\n${JSON.stringify(data)}`);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}
exports.getUserVideoPosts = (req, res) => {
  videoModel.find({ owner: req.params.id })
    .then((data) => {
      res.send(data);
      console.log(`Retrieval success! || ${req.originalUrl} || ${new Date().toString()}\nData:\n${JSON.stringify(data)}`);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log(err);
    });
}
exports.editPost = (req, res) => {
  postModel.findByIdAndUpdate(req.params.id,
    {
      $set: req.body
    })
    .then((data) => {
      res.json({ message: "Updated successfully" });
      console.log(req.body);
    })
    .catch((err) => {
      console.log(err);
    });
}
//text post endpoints
exports.addTextPost = (req, res) => {
  const uploadpath = __dirname + "/../public/files/";
  if (req.files.file !== null) {
    let file = req.files.file;
    let background = file.md5 + "-" + file.name;
    let textdata = {
      writers: req.body.writers,
      header: req.body.header,
      title: req.body.title,
      content: req.body.content,
      backgroundCover: background,
      tags: req.body.tags,
      likes: req.body.likes,
      dateCreated: new Date().toString(),
      dateModified: new Date().toString()
    }
    file.mv(`${uploadpath}${background}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed!" });
        console.log(err);
      }
      else {
        textModel.create(textdata)
          .then((isCreated) => {
            res.json({
              message: "Published",
              data: isCreated
            });
            console.log(isCreated);
          })
          .catch((e) => {
            res.json({ message: "Upload failed!" });
            console.log(e);
          });
      }
    });
  } else {
    let textdata = {
      writers: req.body.writers,
      header: req.body.header,
      title: req.body.title,
      content: req.body.content,
      backgroundCover: background,
      tags: req.body.tags,
      likes: req.body.likes,
      dateCreated: new Date().toString(),
      dateModified: new Date().toString()
    }
    textModel.create(textdata)
      .then((isCreated) => {
        res.json({
          message: "Published",
          data: isCreated
        });
        console.log(isCreated);
      })
      .catch((e) => {
        res.json({ message: "Upload failed!" });
        console.log(e);
      });
  }
}
exports.editTextPost = (req, res) => {
  if (req.body.type === 'textwithfile') {
    const uploadpath = __dirname + "/../public/files/";
    let file = req.files.file;
    let background = file.md5 + "-" + file.name;
    let data = {
      header: req.body.header,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      backgroundCover: background,
      dateModified: new Date().toString()
    }
    file.mv(`${uploadpath}${background}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed!" });
      }
      else {
        textModel.findByIdAndUpdate(req.params.id, {
          $set: data
        })
          .then(isUpdated => {
            res.json({ message: "Update success!" });
            console.log(data);
          })
          .catch(e => {
            res.json({ message: "Update failed!" });
            console.log(e);
          });
      }
    });
  } else {
    let data = {
      header: req.body.header,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    textModel.findByIdAndUpdate(req.params.id, {
      $set: data
    })
      .then(isUpdated => {
        res.json({ message: "Update success!" });
      })
      .catch(e => {
        res.json({ message: "Update failed!" });
        console.log(e);
      });
  }
}
//comment postmodel endpoints
exports.getCollectionComment = (req, res) => {
  let rp_type = req.params.type;
  let commentCol;
  if (rp_type === "post") {
    commentCol = postCommentModel;
  }
  else if (rp_type === "text") {
    commentCol = textCommentModel;
  }
  else {
    res.json({ message: "No collection found" });
  }
  if (rp_type !== null) {
    commentCol.find()
      .then(result => {
        res.json({ message: "Success", data: result });
        console.log(result);
      })
      .catch(err => {
        res.json({ error });
      });
  }
  else {
    console.log("0 result");
  }
}
exports.addCommentPost = (req, res) => {
  let DB_type;
  if (req.params.db === "post") {
    DB_type = postCommentModel;
  }
  else if (req.params.db === "text") {
    DB_type = textCommentModel;
  }
  else {
    console.log("DB type not available");
  }
  let comment = {
    postID: req.body.postid,
    comment: req.body.comment,
    commentedBy: req.body.userid,
    commentType: "main",
    dateCreated: new Date().toString(),
    dateModified: new Date().toString()
  }
  DB_type.create(comment)
    .then((isCreated) => {
      res.json({ message: "Comment added", data: comment });
    })
    .catch((error) => {
      res.json({ message: "Failed to add comment!" });
    });
}
exports.getPostComments = (req, res) => {
  let DB_TYPE;
  let rp_colname = req.params.db;
  let rp_postid = req.params.id;
  if (rp_colname === "post") {
    DB_TYPE = postCommentModel;
  }
  else if (rp_colname === "text") {
    DB_TYPE = textCommentModel;
  }
  else {
    console.log(":db parameter error");
    res.json({ message: 'Parameter error!' });
  }
  DB_TYPE.find({ postID: rp_postid })
    .then(result => {
      res.json({ message: 'Success', data: result });
      console.log(result);
    })
    .catch(err => {
      console.log(err);
      res.json({ message: 'Error!' });
    });
}
exports.replyCommentPost = (req, res) => {
  let DB_type;
  if (req.params.db === "post") {
    DB_type = postCommentModel;
  }
  else if (req.params.db === "text") {
    DB_type = textCommentModel;
  }
  else {
    console.log("DB type not available");
  }
  let reply = {
    postID: req.body.postid,
    comment: req.body.comment,
    commentType: "reply",
    commentedBy: req.body.userid,
    commentID: req.body.commentID,
    dateCreated: new Date().toString(),
    dateUpdated: new Date().toString()
  }
  DB_type.create(reply)
    .then(isDone => {
      res.json({ message: "Reply added!", success: true });
      console.log(isDone);
    })
    .catch(err => {
      res.json({ message: "Reply failed!" });
      console.log(err);
    });
}
exports.editCommentPost = (req, res) => {
  let DB_type;
  if (req.params.db === "post") {
    DB_type = postCommentModel;
  }
  else if (req.params.db === "text") {
    DB_type = textCommentModel;
  }
  else {
    console.log("DB type not available");
  }
  let data = {
    comment: req.body.comment,
    dateModified: new Date().toString()
  }
  DB_type.findByIdAndUpdate({ _id: req.params.comment_id }, { $set: data })
    .then((isEdited) => {
      res.json({ message: "Edited successfully!", success: true });
      console.log(isEdited);
    })
    .catch((error) => {
      res.json({ message: "Edit failed!" });
      console.log(error);
    });
}
exports.deleteCommentPost = (req, res) => {
  let DB_type;
  if (req.params.db === "post") {
    DB_type = postCommentModel;
  }
  else if (req.params.db === "text") {
    DB_type = textCommentModel;
  }
  else {
    console.log("DB type not available");
  }
  DB_type.findByIdAndDelete(req.params.id)
    .then(success => {
      res.json({ message: "Comment deleted!", success: true });
      console.log(`Comment deleted!\n${success}`);
    })
    .catch(err => {
      res.json({ message: "Failed to delete comment!" });
      console.log(err);
    });
}
//message endpoints
exports.addMessage = (req, res) => {
  messageModel.find({ participants: [req.params.sender, req.params.receiver] })
    .then((result) => {
      let message = {
        participants: [req.params.sender, req.params.receiver],
        sender_id: req.params.sender,
        receiver_id: req.params.receiver_id,
        sender_email: req.body.sender_email,
        receiver_email: req.body.receiver_email,
        message: req.body.message,
        files: req.body.files,
        dateCreated: new Date().toString(),
        dateModified: new Date().toString()
      }
      messageModel.create(message)
        .then(isCreated => {
          res.json({ message: "Sent successfully!", data: message });
          console.log(`Created: Message\nSuccess: 1!\nData: \n${JSON.stringify(isCreated)}`);
          userModel.findByIdAndUpdate({ _id: req.params.receiver_id }, { $push: { notifications: [{ sender: req.params.sender_id, category: 'chat', notification: 'New message!' }] } }, { safe: true, upsert: true })
            .then(res => {
              console.log(`Notification sent!`);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(e => {
          console.log(e);
        });
    })
    .catch((error) => {
      console.log(error);
    });
}
exports.getSentMessages = (req, res) => {
  messageModel.find({ sender_id: req.params.id })
    .then((data) => {
      res.json({ data: data });
      console.log(data);
    })
    .catch((error) => {
      res.status(500).send(error);
      console.log(error);
    });
}
exports.getInboxMessages = (req, res) => {
  messageModel.find({ receiver_id: req.params.id })
    .then((data) => {
      res.json({ data: data });
      console.log(data);
    })
    .catch((error) => {
      res.status(500).send(error);
      console.log(error);
    });
}
exports.getUserMessages = (req, res) => {
  messageModel.find({ participants: [req.params.id] })
    .then(data => {
      res.json({ data: data });
      console.log(data);
    })
    .catch(error => {
      res.status(500).send(error);
      console.log(error);
    });
}
exports.getConversationMessages = (req, res) => {
  messageModel.find({ participants: [req.params.userid, req.params.id] })
    .then((data) => {
      res.json({ data: data });
      console.log(`Retrieval success! \nData: \n${data.toString()}\nData:\n${JSON.stringify(data)}`);
    })
    .catch((error) => {
      res.send(error);
      res.status(500).send(error);
      console.log(error);
    });
}
exports.editMessage = (req, res) => {
  let message = {
    message: req.body.message,
    dateModified: new Date().toString()
  }
  messageModel.findByIdAndUpdate(req.params.id,
    {
      $set: message
    })
    .then((result) => {
      console.log(`Successfully updated message! \nData:\n${result.toString()}`);
      res.json({
        message: "Successfully updated", data: result
      });
    })
    .catch((error) => {
      console.log(error);
    });
}
exports.addVideo = (req, res) => {
  let video = req.files.file;
  let videoname = video.md5 + "-" + video.name;
  let image = req.files.image;
  let thumbnail = image.md5 + "-" + image.name;
  let videoData = {
    owner: req.body.owner,
    title: req.body.title,
    description: req.body.description,
    file: videoname,
    thumbnail: thumbnail,
    tags: req.body.tags,
    dateUploaded: new Date().toString(),
    dateModified: new Date().toString()
  }
  video.mv(`${uploadpath}${videoname}`, (err) => {
    if (err) {
      res.json({ message: "Upload failed!" });
      console.log(err);
    } else {
      image.mv(`${uploadpath}${thumbnail}`, (err) => {
        videoModel.create(videoData)
          .then(isSaved => {
            res.json({ message: "Video uploaded successfully!" });
            console.log(isSaved);
          })
          .catch(err => {
            res.json({ message: "Upload failed!" });
            console.log(err);
          });
      });
    }
  });
}
exports.editVideo = (req, res) => {
  const updateVideoStock = req.body.videostock;
  const updateVideoThumbnailStock = req.body.thumbnailstock;
  if (updateVideoStock === 'replace' && updateVideoThumbnailStock === 'replace') {
    let file = req.files.file;
    let filename = file.md5 + "-" + file.name;
    let image = req.files.image;
    let thumbnail = image.md5 + "-" + image.name;
    let data = {
      title: req.body.title,
      description: req.body.description,
      thumbnail: thumbnail,
      file: filename,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    file.mv(`${uploadpath}${filename}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed!" });
        console.log(err);
      } else {
        image.mv(`${uploadpath}${thumbnail}`, (err) => {
          videoModel.findByIdAndUpdate(req.params.id, { $set: data })
            .then(isEdited => {
              res.json({ message: "Updated successfully!" });
              console.log(data);
            })
            .catch(error => {
              res.json({ message: "Update failed!", error });
              console.log(error);
            });
        });
      }
    });
  }
  else if (updateVideoStock === 'replace' && updateVideoThumbnailStock === 'keep') {
    let file = req.files.file;
    let filename = file.md5 + "-" + file.name;
    let data = {
      title: req.body.title,
      description: req.body.description,
      file: filename,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    file.mv(`${uploadpath}${filename}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed!" });
      } else {
        videoModel.findByIdAndUpdate(req.params.id, { $set: data })
          .then(isEdited => {
            res.json({ message: "Updated successfully!" });
          })
          .catch(error => {
            res.json({ message: "Update failed!" });
            console.log(error);
          });
      }
    });
  }
  else if (updateVideoStock === 'keep' && updateVideoThumbnailStock === 'replace') {
    let image = req.files.image;
    let thumbnail = image.md5 + "-" + image.name;
    let data = {
      title: req.body.title,
      description: req.body.description,
      thumbnail: thumbnail,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    image.mv(`${uploadpath}${thumbnail}`, (err) => {
      if (err) {
        res.json({ message: "Upload failed!" });
      } else {
        videoModel.findByIdAndUpdate(req.params.id, { $set: data })
          .then(isEdited => {
            res.json({ message: "Updated successfully!" });
          })
          .catch(error => {
            res.json({ message: "Update failed!" });
            console.log(error);
          });
      }
    });
  }
  else {
    let data = {
      title: req.body.title,
      description: req.body.description,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    videoModel.findByIdAndUpdate(req.params.id, { $set: data })
      .then(isEdited => {
        res.json({ message: "Update successful" });
      })
      .catch(err => {
        res.json({ message: "Update failed!", error: err });
        console.log(err);
      });
  }
}
//vibe endpoints
exports.publishMusic = (req, res) => {
  let audio = req.files.audio;
  let filename = audio.md5 + "-" + audio.name;
  let image = req.files.image;
  let cover = image.md5 + "-" + image.name;
  let music = {
    publisher: req.body.publisher,
    title: req.body.title,
    file: filename,
    lyrics: req.body.lyrics,
    cover_photo: cover,
    tags: req.body.tags,
    dateCreated: new Date().toString(),
    dateModified: new Date().toString()
  }
  audio.mv(`${uploadpath}${filename}`, (err) => {
    console.log();
    if (err) {
      console.log("Upload failed", err);
      res.json({ message: "Upload failed", error: err });
    }
    else {
      image.mv(`${uploadpath}${cover}`, (err) => {
        vibeModel.create(music)
          .then(isPublished => {
            res.json({ message: "Published successfully", data: music });
          })
          .catch(err => {
            res.json({ message: "Publish failed", error: err });
            console.log(err);
          });
      });
    }
  });
}
exports.updateMusic = (req, res) => {
  let coverStats = req.body.coverphotostock;
  if (coverStats === 'replace') {
    let image = req.files.image;
    let cover = image.md5 + "-" + image.name;
    let musicData = {
      publisher: req.body.publisher,
      title: req.body.title,
      cover_photo: cover,
      lyrics: req.body.lyrics,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    image.mv(`${uploadpath}${cover}`, (err) => {
      vibeModel.findByIdAndUpdate(req.params.id, musicData)
        .then(isModified => {
          res.json({ message: "Update successful", data: musicData });
          console.log(musicData);
        })
        .catch(err => {
          res.json({ message: "Update failed", error: err });
          console.log(err);
        });
    });
  } else {
    let newMusicData = {
      publisher: req.body.publisher,
      title: req.body.title,
      lyrics: req.body.lyrics,
      tags: req.body.tags,
      dateModified: new Date().toString()
    }
    vibeModel.findByIdAndUpdate(req.params.id, newMusicData)
      .then(isUpdated => {
        res.json({ message: "Update successful", data: newMusicData });
      })
      .catch(err => {
        res.json({ message: "Update failed!", error: err });
      });
  }
}
//album endpoints
exports.createAlbum = (req, res) => {
  let album = {
    owner: req.body.owner,
    name: req.body.name,
    description: req.body.description,
    playlist: req.body.playlist,
    dateCreated: new Date().toString(),
    dateModified: new Date().toString()
  }
  albumModel.create(album)
    .then(isCreated => {
      res.json({ message: "Successfully created album", data: isCreated });
      console.log(isCreated);
    })
    .catch(err => {
      res.json({ message: "Failed to create album", error: err });
      console.log(err);
    });
}
exports.updateAlbum = (req, res) => {
  let album = {
    owner: req.body.owner,
    name: req.body.name,
    description: req.body.description,
    playlist: req.body.playlist,
    dateModified: new Date().toString()
  }
  albumModel.findByIdAndUpdate(req.params.id, { $set: album })
    .then(isUpdated => {
      res.json({ message: "Successfully updated", data: album });
      console.log(album);
    })
    .catch(err => {
      res.json({ message: "Update failed", error: err });
      console.log(err);
    });
}
