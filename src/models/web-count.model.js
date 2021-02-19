const mongoose = require("mongoose");
const { count } = require("./user.model");
const Schema = mongoose.Schema;
const superagent = require("superagent");
const counter = require("html-word-count");
var wordsCounter = require("word-counting");
var axios = require("axios");

let WebCounterSchema = new Schema({
  url: {
    required: true,
    type: String,
    trim: true,
  },
  count: {
    type: Number,
    trim: true,
  },
  isfavourite: {
    type: Boolean,
    trim: true,
    default: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

WebCounterSchema.pre("save", async function (next) {
  // Need to be a standard function cuz 'this' binding
  //making this as user for accessing individual instances
  const user = this;
  const regex = /(<([^>]+)>)/gi;
  const htmlCode = await superagent.get(user.url);
  const count = htmlCode.text.replace(regex, "").split(" ").length;
  user.count = count;

  next();
});

// WebCounterSchema.methods.getCount = async function (url) {
//   const webCounter = this;

//   return new Promise((resolve, reject) => {
//     axios
//       .get(url)
//       .then((res) => {
//         const regex = /(<([^>]+)>)/gi;
//         const count = res.data.replace(regex, "").split(" ").length;
//         if (count) resolve(count);
//         else reject("error");
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//   });
// };

const WebCounter = mongoose.model("WebCounter", WebCounterSchema);

module.exports = WebCounter;
