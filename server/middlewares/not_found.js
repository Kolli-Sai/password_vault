const not_found = (req, res) => {
  try {
    res
      .status(404)
      .send(
        `There are no resources with "${req.url}" path and "${req.method}" method.`
      );
  } catch (error) {
    console.log(`error in not_found -> ${error}`);
  }
};

module.exports = { not_found };
