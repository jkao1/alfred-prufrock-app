/**
 * GET /
 */
exports.tree = function(req, res) {
  res.render("tree", {
    title: "Tree",
  });
};
