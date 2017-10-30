const Language = require("@google-cloud/language");
const language = Language();

let pastEntities = [];
let usedInSentence = [];

exports.clearEntities = (req, res) => {
  pastEntities = [];
  usedInSentence = [];
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
  const document = {
    content,
    type: "HTML",
  };

  language.analyzeEntitySentiment({ document })
    .then(response => {
      const { entities } = response[0];
      return language.analyzeSyntax({ document })
        .then(syntaxResponse => {
          return {
           syntax: syntaxResponse[0], 
           entities,
         };
       });
    })
    .then(result => {
      const { syntax, entities } = result;
      let { tokens } = syntax;
      let rootToken = null;
      for (let i = 0; i < tokens.length; i++) {
        tokens[i].id = i;
        if (tokens[i].dependencyEdge.label === "ROOT") {
          rootToken = tokens[i];
        }
      }
      let NSUBJ = null;
      let DOBJ = null;
      function searchForNSUBJ(dependent) {
        if (dependent.dependencyEdge.label === "NSUBJ") {
          NSUBJ = dependent;
          return;
        }
        return tokens
          .filter(token => token !== dependent && token.dependencyEdge.headTokenIndex === dependent.id)
          .forEach(searchForNSUBJ);
      }
      function searchForDOBJ(dependent) {
        if (dependent.dependencyEdge.label === "DOBJ" || dependent.dependencyEdge.label === "ATTR") {
          DOBJ = dependent;
          return;
        }
        return tokens
          .filter(token => token !== dependent && token.dependencyEdge.headTokenIndex === dependent.id)
          .forEach(searchForDOBJ);
      }
      searchForNSUBJ(rootToken);
      searchForDOBJ(rootToken);

      const entity = entities.find(entity => !usedInSentence.includes(entity.name));
      if (entity) {
        usedInSentence.push(entity.name);
      }
      
      if (NSUBJ && !pastEntities.includes(NSUBJ.text.content)) {
        pastEntities.push(NSUBJ.text.content)
      }
      if (DOBJ && !pastEntities.includes(DOBJ.text.content)) {
        pastEntities.push(DOBJ.text.content)
      }
      console.log('past=entieis', pastEntities)
      if (NSUBJ && pastEntities.includes(NSUBJ.text.content)) {
        NSUBJ.attachToLabel = NSUBJ.text.content;
      }
      res.send({NSUBJ, DOBJ, rootToken, entity})

    })
/*
      const entity = entities.find(entity => !pastEntities.find(pastEntity => pastEntity.name === entity.name));
      if (entity) {
        pastEntities.push(entity)
      }
      res.send({entity});
    })*/
    .catch(err => {
      console.error('ERROR:', err);
    });
};
