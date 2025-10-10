const { PrismaClient } = require("../generated/prisma");
const fs = require("fs").promises;

// Instantiate Prisma Client
const Prisma = new PrismaClient();

module.exports.getMyFiles = async function (req, res, next) {
  const root = await Prisma.folder.findFirst({
    where: { id: req.user.rootFolderId },
    include: {
      children: true,
      files: true,
    },
  });
  return res.render("my-files", { currentFolder: root });
};

module.exports.getUploadFile = async function (req, res, next) {
  return res.render("upload-file");
};

module.exports.postUploadFile = async function (req, res, next) {
  const file = await Prisma.file.create({
    data: {
      id: req.file.filename,
      name: req.body.file_name,
      originalName: req.file.originalname,
      size: req.file.size,
      uploaderId: req.user.id,
      folderId: req.body.parentfolder,
      location: req.file.path,
    },
  });
  console.log(file);
  return res.redirect("/myfiles");
};

module.exports.getNewFolder = async function (req, res, next) {
  return res.render("create-folder");
};

module.exports.postNewFolder = async function (req, res, next) {
  const userId = req.user.id;
  const parentId = req.body.parentfolder;

  const newFolder = await Prisma.folder.create({
    data: {
      name: req.body.foldername,
      owner: {
        connect: { id: userId },
      },
      parent: {
        connect: { id: parentId },
      },
    },
  });
  return res.redirect("/myfiles");
};

module.exports.getFolder = async function (req, res, next) {
  return res.render("my-files");
};

module.exports.getEditFolder = async function (req, res, next) {
  return res.render("edit-folder");
};

module.exports.postEditFolder = async function (req, res, next) {
  await Prisma.folder.update({
    where: { id: req.body.folder_id },
    data: {
      name: req.body.folder_name,
      parentId: req.body.parent_folder,
    },
  });
  res.redirect("/myfiles");
};

module.exports.deleteFolder = async function (req, res, next) {
  console.log(req.body);
  await Prisma.folder.delete({
    where: { id: req.body.folder_id },
  });
  return res.redirect("/myfiles");
};

module.exports.viewFile = async function (req, res, next) {
  const file = await Prisma.file.findFirst({
    where: { id: req.params.file_id },
  });
  return res.render("view-file", { file: file });
};

module.exports.editFile = async function (req, res, next) {
  const file = await Prisma.file.update({
    where: { id: req.body.file_id },
    data: {
      name: req.body.file_name,
      folderId: req.body.folder_id,
    },
  });
  return res.redirect("/myfiles");
};

module.exports.deleteFile = async function (req, res, next) {
  const file_id = req.body.file_id;
  const file_path = "uploads/" + file_id;
  await Prisma.file.delete({
    where: { id: file_id },
  });
  await fs.unlink(file_path);
  return res.redirect("/myfiles");
};
