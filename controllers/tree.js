var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;
global.window = document.defaultView;

//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);

const Bing = require('node-bing-api')({ accKey: "80e5ca71bd6145d2b374d99baf681c34" });

/**
 * GET /
 */
exports.tree = function(req, res) {
  res.render("tree", {
    title: "Tree",
  });
};

exports.addImage = (req, res) => {
  const { treeSize } = req.body.treeSize;
  jsdom.jQueryify(window, "http://code.jquery.com/jquery.js", function () {
    var $ = window.$;
  });
    Bing.images("Ninja Turtles", {
      count: 1,   // Number of results (max 50)
      offset: 0    // Skip first 3 result
      }, function(error, res, body){
        const { thumbnailUrl } = body.value[0];
        const offset = $(`g#g_circles circle:nth-child(${treeSize - 1})`).offset();
        $(`<img src="${thumbnailURL}" style="position:absolute;top:${offset.top};left:${offset.left}/>`).load(function() {
          console.log('appending', this);
          $(this).width("30px").height("some").appendTo('body');
        });
      });
  };
