module.exports.getMyFiles = async function (req, res, next) {
  return res.render("my-files");
};

module.exports.getUploadFile = async function (req, res, next) {
  return res.render("upload-file");
};

module.exports.postUploadFile = async function (req, res, next) {
  console.log(req.file);
  return res.redirect("/");
};
