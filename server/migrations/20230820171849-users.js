module.exports = {
  async up(db, client) {
    await db
      .collection("users")
      .insertMany([{
        "name": "Nick",
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "$2b$10$TsOxUC1qsmh5CbPv0OaEzeunm2HQCiwzdfMJz4G1l4D0.MG/L3Hji",
        "role": "ADMIN"
    }]);
  },

  async down(db, client) {
    // TODO write the statements to rollback your migration (if possible)
    // Example:
    // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
  }
};
