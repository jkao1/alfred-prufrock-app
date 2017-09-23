const Language = require("@google-cloud/language");
const language = Language();

/**
 * POST /language
 */
exports.languagePost = (req, res) => {
  console.log(req.body)
  const document = {
    content: req.body.text,
    type: "PLAIN_TEXT",
  };
  language.analyzeEntities({ document })
  .then(response => {
    const { entities } = response[0];
    console.log(entities[0])
    res.send(entities[entities.length - 1].name);
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
};
