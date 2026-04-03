const db = require("../models");
const FeatureFlag = db.featureFlag;

// Get all feature flags
exports.findAll = (_req, res) => {
  FeatureFlag.findAll()
    .then((flags) => {
      const result = {};
      flags.forEach((f) => {
        result[f.key] = f.enabled;
      });
      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving feature flags.",
      });
    });
};

// Toggle a feature flag (admin only)
exports.toggle = (req, res) => {
  const { key } = req.params;
  const { enabled } = req.body;

  if (typeof enabled !== "boolean") {
    return res.status(400).send({ message: "'enabled' must be a boolean." });
  }

  FeatureFlag.findOne({ where: { key } })
    .then((flag) => {
      if (!flag) {
        return res.status(404).send({ message: `Feature flag '${key}' not found.` });
      }
      flag.update({ enabled }).then((updated) => {
        res.send({ key: updated.key, enabled: updated.enabled });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating feature flag.",
      });
    });
};
