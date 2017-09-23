const Language = require('@google-cloud/language');
const language = Language();

/**
 * POST /language
 */
exports.languagePost = function(req, res) {
  const document = {
    'content': "textHi there i AM TESTING.",
    type: 'PLAIN_TEXT'
  };
  language.analyzeEntities({ document: document })
  .then((results) => {
    const entities = results[0].entities;

    console.log('Entities:');
    entities.forEach((entity) => {
      console.log(entity.name);
      console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
      if (entity.metadata && entity.metadata.wikipedia_url) {
        console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
      }
    });
  })
  .catch((err) => {
    console.error('ERROR:', err);
  });
};
