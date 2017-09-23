// Imports the Google Cloud client library
const Language = require('@google-cloud/language');

// Instantiates a client
const language = Language();

// The text to analyze
const text = 'I am interested in UM.';

function analyzeText(text) {
  return new Promise((resolve, reject) => {

    const document = {
      'content': text,
      type: 'PLAIN_TEXT'
    };

    const features = {
      extractSyntax: true,
      extractEntities: true,
      extractDocumentSentiment: true,
      extractEntitySentiment: true,
      classifyText: true
    };

    language.annotateText({'document': document, 'features': features})
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
         //throw new Error(err);
         reject(err);
      });
  });
}

// Test call
analyzeText(text)
  .then(result => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch(console.log);
