const Language = require("@google-cloud/language");
const language = Language();

var pastEntities = [];

/**
 * analyzeSyntax
 * pastEntities store previous "NOUN" tokens (partOfSpeech.tag).
 * For every new token, we check matching lemmas & text.content.
 * base font size of node on salience.
 */
exports.languagePost = (req, res) => {
  const document = {
    content: req.body.text.substring(0, req.body.text.length - 6),
    type: "HTML",
  };
  language.analyzeEntities({ document })
    .then(response => {
      const { entities } = response[0];
      entities.forEach(entity => {
        if (!pastEntities.find(pastEntity => pastEntity.name === entity.name)) {
          pastEntities.push(entity);
          res.send(entity);
        }
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};
