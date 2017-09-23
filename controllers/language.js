const Language = require("@google-cloud/language");
const language = Language();

/**
 * POST /language
 */
exports.languagePost = (req, res) => {
  const document = {
    content: "George Washington",
    type: "PLAIN_TEXT",
  };
  console.log('start');
  language
    .analyzeEntities({ document })  
    .then(results => {
      const entities = results[0].entities;
      console.log(entities);
      res.status(200).end();
    })
    .catch(err => {
      console.error("ERROR:", err);
    });
};
