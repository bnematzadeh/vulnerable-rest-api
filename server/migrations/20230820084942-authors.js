const mongoose = require('mongoose');
var ObjectId = mongoose.Types.ObjectId;

module.exports = {
  async up(db, client) {
    await db
      .collection("authors")
      .insertMany([{
        "_id": new ObjectId("647e13103c18faca7f185cbc")
        ,
        "name": "Robert Sedgewick",
        "email": "robert.s@gmail.com",
        "phoneNumber": "+1-202-427-0140",
        "about": "Robert is a well-versed administrative assistant and office manager with five years of experience providing tailored support. Helping others and sharing knowledge are two beliefs Andrew imparts every day. His experience, positive attitude and willingness to help others allow him to excel in administrative roles.",
        "job": "Software Engineer"
      },{
        "_id": new ObjectId("647e13103c18faca7f185cbd")
        ,
        "name": "Tyler Martin",
        "email": "tyler@gmail.com",
        "phoneNumber": "+1-201-420-0123",
        "about": "Hi, my name is Tyler, and I believe that educating people about how culture and food correlate helps individuals understand more about themselves. I have nine years of experience exploring and discovering the unique recipes made by communities around the world, and I use my knowledge to create custom and memorable events. I believe that bringing together culture, food and people can help individuals connect and bond, and I intend to bring that experience to you.",
        "job": "Software Engineer"
      },{
        "_id": new ObjectId("647e13103c18faca7f185cbe")
        ,
        "name": "Erich Gamma",
        "email": "erichg@outlook.com",
        "phoneNumber": "+1-207-540-0123",
        "about": "Hello, I'm Erich. I'm an innovative and dedicated interior design professional dedicated to satisfying my customers' design requirements. I enjoy the challenge of finding unique ways to fulfill my customers' needs.",
        "job": "Designer"
      },{
        "_id": new ObjectId("647e13103c18faca7f185cbf")
        ,
        "name": "Borna Nematzadeh",
        "email": "borna.nematzadeh123@gmail.com",
        "phoneNumber": "+1-202-555-0123",
        "about": "I am a hard working, honest individual. I am a good timekeeper, always willing to learn new skills. I am friendly, helpful and polite, have a good sense of humour. I am able to work independently in busy environments and also within a team setting. I am outgoing and tactful, and able to listen effectively when solving problems.",
        "job": "Security Researcher"
      },{
        "_id": new ObjectId("647e13103c18faca7f185cc0")
        ,
        "name": "Angela Krakauer",
        "email": "angela.krakauer@gmail.com",
        "phoneNumber": "+1-209-510-0123",
        "about": "Hello, my name is Angela, and I believe that focusing on your company's data security plan is essential to growing your company's business. With over 10 years of experience in information and data security, my knowledge and skills can help you create effective security strategies. My dedication to creating comprehensive data security plans can also help your company improve its data integrity and increase customer retention.",
        "job": "Data Scientist"
      },{
        "_id": new ObjectId("647e13103c18faca7f185cc1")
        ,
        "name": "James Martin",
        "email": "james.ma@gmail.com",
        "phoneNumber": "+1-702-444-0123",
        "about": "I am a dedicated, organized and methodical individual. I have good interpersonal skills, am an excellent team worker and am keen and very willing to learn and develop new skills. I am reliable and dependable and often seek new responsibilities within a wide range of employment areas. I have an active and dynamic approach to work and getting things done. I am determined and decisive. I identify and develop opportunities.",
        "job": "Team Manager"
      },{
        "_id": new ObjectId("647e13103c18faca7f185cc2")
        ,
        "name": "George Demirov",
        "email": "georgede1@yahoo.com",
        "phoneNumber": "+1-304-210-0123",
        "about": "George is a versatile web designer due to his extensive history in graphic and web design. His dedication to continuously learning about new web design trends and concepts has made him a valuable member of the team. With eight years of experience and a master's in web design, his expertise can help customers modernize with websites and appeal to expanding customer populations.",
        "job": "Web Designer"
      }]);
  },

  async down(db, client) {
    await db.collection("authors").deleteMany({})
  }
};
