/**
 * GET /
 */
exports.timeline = function(req, res) {
    res.render("timeline", {
      title: "Timeline",
    });
  };
  