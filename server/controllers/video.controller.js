const Video = require("../models/Video.model");
const User = require("../models/User.model");
const Notification = require("../models/Notification.model");
const { errorResponse, DEFAULT_PAGE_SIZE } = require("../configs/route.config");

async function trendingVideo(req, res, next) {
  try {
    const curr = new Date(); //get current date
    const lastWeek = new Date(curr.getTime() - 1000 * 24 * 60 * 60 * 1000); //get last week date
    const page = req.query.page;

    const [videos] = await Video.aggregate([
      {
        $match: {
          createdAt: {
            $gte: lastWeek,
            $lt: curr,
          },
        },
      },
      {
        $facet: {
          docs: [
            { $sort: { views: -1 } },
            { $skip: DEFAULT_PAGE_SIZE * (page - 1) },
            { $limit: DEFAULT_PAGE_SIZE },
          ],
          meta: [{ $count: "total_documents" }],
        },
      },
      { $unwind: "$meta" },
    ]);
    const totalDocs = videos?.meta.total_documents || 0;
    const output = {
      docs: videos?.docs || [],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
      total_pages: Math.ceil(totalDocs / DEFAULT_PAGE_SIZE),
      total_documents: totalDocs,
    };
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function randomVideo(req, res, next) {
  try {
    const page = req.query.page;

    const [videos] = await Video.aggregate([
      {
        $facet: {
          docs: [
            { $skip: DEFAULT_PAGE_SIZE * (page - 1) },
            { $limit: DEFAULT_PAGE_SIZE },
          ],
          meta: [{ $count: "total_documents" }],
        },
      },
      { $unwind: "$meta" },
    ]);

    const totalDocs = videos?.meta.total_documents || 0;
    const output = {
      docs: videos?.docs || [],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
      total_pages: Math.ceil(totalDocs / DEFAULT_PAGE_SIZE),
      total_documents: totalDocs,
    };
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function subscribeVideo(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;
    const page = req.query.page;

    const list = await Promise.all(
      subscribedChannels.map((channelId) => {
        return Video.find({ userId: channelId });
      })
    );
    const videos = list.flat().sort((a, b) => b.createdAt - a.createdAt);

    const output = {
      docs:
        videos.slice(
          (page - 1) * DEFAULT_PAGE_SIZE,
          page * DEFAULT_PAGE_SIZE
        ) || [],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
      total_pages: Math.ceil(videos.length / DEFAULT_PAGE_SIZE),
      total_documents: videos.length,
    };
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function myVideo(req, res, next) {
  try {
    const page = req.query.page;
    const [videos] = await Video.aggregate([
      {
        $match: { userId: req.user.id },
      },
      {
        $facet: {
          docs: [
            { $skip: DEFAULT_PAGE_SIZE * (page - 1) },
            { $limit: DEFAULT_PAGE_SIZE },
          ],
          meta: [{ $count: "total_documents" }],
        },
      },
      { $unwind: "$meta" },
    ]);
    const totalDocs = videos?.meta.total_documents || 0;
    const output = {
      docs: videos?.docs || [],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
      total_pages: Math.ceil(totalDocs / DEFAULT_PAGE_SIZE),
      total_documents: totalDocs,
    };
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function likedVideo(req, res, next) {
  try {
    const page = req.query.page;
    const [videos] = await Video.aggregate([
      {
        $match: { likes: req.user.id },
      },
      {
        $facet: {
          docs: [
            { $skip: DEFAULT_PAGE_SIZE * (page - 1) },
            { $limit: DEFAULT_PAGE_SIZE },
          ],
          meta: [{ $count: "total_documents" }],
        },
      },
      { $unwind: "$meta" },
    ]);
    const totalDocs = videos?.meta.total_documents || 0;
    const output = {
      docs: videos?.docs || [],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
      total_pages: Math.ceil(totalDocs / DEFAULT_PAGE_SIZE),
      total_documents: totalDocs,
    };
    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function addVideo(req, res, next) {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  const user = await User.findById(req.user.id);
  const subscribers = user.subscribers;
  try {
    // Create an array of promises for creating notifications
    const notificationPromises = subscribers.map((subscriber) =>
      Notification.create({ userRequestId: req.user.id, userRecipientId: subscriber, typeNoti: 0 })
    );

    // Wait for all notification promises to resolve
    await Promise.all(notificationPromises);

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
}

async function updateVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).send(errorResponse.DEFAULT_404_ERROR);
    }

    if (req.user.id === updatedVideo.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVideo);
    } else {
      return res.status(403).send("You can update only your video");
    }
  } catch (error) {
    next(error);
  }
}

async function deleteVideo(req, res, next) {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);

    if (!video) {
      return res.status(404).send(errorResponse.DEFAULT_404_ERROR);
    }

    res.status(200).json("The video has been deleted");
  } catch (error) {
    next(error);
  }
}

async function getVideo(req, res, next) {
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json(video);
  } catch (error) {
    next(error);
  }
}

async function addView(req, res, next) {
  try {
    await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.status(200).json("The view has been increased");
  } catch (error) {
    next(error);
  }
}

async function getVideoByTag(req, res, next) {
  try {
    const tags = req.query.tags?.split(",");
    const page = req.query.page;
    const [videos] = await Video.aggregate([
      { $match: { tags: { $in: tags } } },
      {
        $facet: {
          docs: [
            { $skip: DEFAULT_PAGE_SIZE * (page - 1) },
            { $limit: DEFAULT_PAGE_SIZE },
          ],
          meta: [{ $count: "total_documents" }],
        },
      },
      { $unwind: "$meta" },
    ]);

    const totalDocs = videos?.meta.total_documents || 0;
    const output = {
      docs: videos?.docs || [],
      page: page,
      pageSize: DEFAULT_PAGE_SIZE,
      total_pages: Math.ceil(totalDocs / DEFAULT_PAGE_SIZE),
      total_documents: totalDocs,
    };

    res.status(200).json(output);
  } catch (error) {
    next(error);
  }
}

async function searchVideo(req, res, next) {
  if (req.query) {
    try {
      const query = req.query.q;
      const page = req.query.page;

      const [videos] = await Video.aggregate([
        { $match: { title: { $regex: query, $options: "i" } } },
        {
          $facet: {
            docs: [
              { $skip: DEFAULT_PAGE_SIZE * (page - 1) },
              { $limit: DEFAULT_PAGE_SIZE },
            ],
            meta: [{ $count: "total_documents" }],
          },
        },
        { $unwind: "$meta" },
      ]);

      const totalDocs = videos?.meta.total_documents || 0;
      const output = {
        docs: videos?.docs || [],
        page: page,
        pageSize: DEFAULT_PAGE_SIZE,
        total_pages: Math.ceil(totalDocs / DEFAULT_PAGE_SIZE),
        total_documents: totalDocs,
      };

      res.status(200).json(output);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(200).send(errorResponse.INVALID_QUERY);
  }
}

module.exports = {
  trendingVideo,
  randomVideo,
  subscribeVideo,
  myVideo,
  likedVideo,
  addVideo,
  updateVideo,
  deleteVideo,
  getVideo,
  addView,
  getVideoByTag,
  searchVideo,
};
