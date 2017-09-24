const Language = require("@google-cloud/language");
const language = Language();

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
      res.send(entities[entities.length - 1]);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
};
