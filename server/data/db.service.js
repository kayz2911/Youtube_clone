const axios = require("axios").default;
const bcrypt = require("bcryptjs");
const config = require("./db.configure");
const mongoService = require("../services/mongo.service");
const helpers = require("../helpers/helpers");
const Video = require("../models/Video.model");
const User = require("../models/User.model");

const loadUser = async (id) => {
  const mappedModel = (dbModel) => {
    return {
      idFromYTB: id,
      name: dbModel.snippet.title,
      email: `${id}@gmail.com`,
      password: bcrypt.hashSync("123456", bcrypt.genSaltSync(10)),
      img: dbModel.snippet.thumbnails.default.url,
      subscribers: [],
      subscribedUsers: [],
      createdAt: dbModel.snippet.publishedAt,
    };
  };

  try {
    const url = `${config.BASE_URL}/channels?part=snippet&key=${config.API_KEY}&id=${id}`;
    const dbModel = await (await axios.get(url)).data;

    await User.findOneAndUpdate(
      { idFromYTB: id },
      { $setOnInsert: mappedModel(dbModel.items[0]) },
      { new: true, upsert: true }
    );
  } catch (error) {
    throw error;
  }
};

const loadVideos = async (id) => {
  const mappedModel = (dbModel) => {
    return {
      userId: dbModel.snippet.channelId,
      title: dbModel.snippet.title,
      imgUrl: dbModel.snippet.thumbnails.medium.url,
      videoUrl: `${config.BASE_VIDEO_URL}/${dbModel.id.videoId}`,
      desc: dbModel.snippet.description,
      views: helpers.getRandomIntInclusive(1000000, 100000000),
      tags: ["movie"],
      likes: [],
      dislikes: [],
      createdAt: new Date(dbModel.snippet.publishedAt),
    };
  };

  try {
    const url = `${config.BASE_URL}/search?part=snippet&maxResults=50&key=${config.API_KEY}&type=video&videoCategoryId=${id}`;
    const dbModel = await (await axios.get(url)).data;

    for (const item of dbModel.items) {
      await Video.findOneAndUpdate(
        { videoUrl: `${config.BASE_VIDEO_URL}/${item.id.videoId}` },
        { $setOnInsert: mappedModel(item) },
        { new: true, upsert: true, strict: false, timestamps: false }
      );

      // Update data User
      await loadUser(item.snippet.channelId);
    }
  } catch (error) {
    throw error;
  }
};

const updateUserId = async () => {
  try {
    const userIdFromYTB = await User.find({}, "idFromYTB");
    for (const userId of userIdFromYTB) {
      await Video.updateMany(
        { userId: userId.idFromYTB },
        { userId: userId._id.toString() }
      );
    }
  } catch (error) {
    throw error;
  }
};

async function test() {
  await mongoService.connect("youtube_clone");

  await loadVideos(1);
  await updateUserId();

  await mongoService.disconnect();
}

test();
