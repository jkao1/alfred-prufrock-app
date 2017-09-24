const Language = require("@google-cloud/language");
const language = Language();

var pastEntities = [];

/**
 * POST /language
 */
exports.languagePost = (req, res) => {
  const document = {
    content: req.body.text.substring(0, req.body.text.length - 6),
    type: "PLAIN_TEXT",
  };
  language.analyzeEntities({ document })
    .then(response => {
      const { entities } = response[0];
      entities.forEach(entity => {
        if (!pastEntities.find(pastEntity => pastEntity.name === entity.name)) {
          pastEntities.push(entity);
          console.log(pastEntities, entity);
          res.send(entity);
        }
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
};
