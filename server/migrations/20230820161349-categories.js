const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async up(db, client) {
    await db
      .collection("categories")
      .insertMany([{
        "_id": new ObjectId("647f04587957d0d366afa4a4")
        ,
        "name": "Programming"
      },{
        "_id": new ObjectId("647f04587957d0d366afa4a5")
        ,
        "name": "AI"
      },{
        "_id": new ObjectId("647f04587957d0d366afa4a6")
        ,
        "name": "Network"
      },{
        "_id": new ObjectId("647f04587957d0d366afa4a7")
        ,
        "name": "IoT"
      },{
        "_id": new ObjectId("647f04587957d0d366afa4a8")
        ,
        "name": "Blockchain"
      },{
        "_id": new ObjectId("647f04587957d0d366afa4a9")
        ,
        "name": "Web Security"
      }]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
