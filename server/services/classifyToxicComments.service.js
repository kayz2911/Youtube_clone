const toxicity = require("@tensorflow-models/toxicity");

const loadModel = async () => {
  return await toxicity.load(0.95);
};

const predictToxicity = async (req, res, next) => {
  const comment = req.body?.desc;
  const model = req.app.locals.toxicityModel;

  if (!model) {
    await loadModel();
  }

  try {
    const isToxicComment = await model.classify(comment).then((prediction) => {
      for (const classification of prediction) {
        if (classification.results[0].match !== false) return true;
      }

      return false;
    });

    if (isToxicComment) {
      return res.status(400).send({ error: "Toxic comment" });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  loadModel,
  predictToxicity,
};
