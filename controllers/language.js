const Language = require("@google-cloud/language");
const language = Language();

let pastEntities = [];

exports.clearEntities = (req, res) => {
  pastEntities = [];
  res.send({status: "success"});
}

/**
 * analyzeSyntax
 * pastEntities store previous "NOUN" tokens (partOfSpeech.tag).
 * For every new token, we check matching lemmas & text.content.
 * base font size of node on salience.
 */
exports.languagePost = (req, res) => {
  const content = req.body.text.substring(0, req.body.text.length - 6);
  console.log(content);
  const document = {
    content,
    type: "HTML",
  };
  language.analyzeEntities({ document })
    .then(response => {
      const { entities } = response[0];
      const entity = entities.find(entity => !pastEntities.find(pastEntity => pastEntity.name === entity.name));
      if (entity) {
        pastEntities.push(entity)
      }
      res.send({entity});
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};
