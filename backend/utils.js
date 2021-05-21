const fs = require('fs').promises;
const axios = require("axios");
const path = require("path");
const {nanoid} = require('nanoid');
const config = require('./config');

const downloadAvatar = async url => {
  const picResponse = await axios.get(url, {responseType: 'arraybuffer'});
  const avatarFilename = path.join('avatar', nanoid() + '.jpg');
  const avatarFilePath = path.join(config.uploadPath, avatarFilename);
  await tryToCreateDir('avatar');
  await fs.writeFile(avatarFilePath, picResponse.data);

  return avatarFilename;
};

const tryToCreateDir = async dirName => {
  const dirPath = path.join(config.uploadPath, dirName); // /home/tsyganov/projects/js8-9/workspace/shop/api/public

  try {
    await fs.access(dirPath);
  } catch (e) {
    await fs.mkdir(dirPath, {recursive: true});
  }
};

module.exports = {
  downloadAvatar,
  tryToCreateDir,
};