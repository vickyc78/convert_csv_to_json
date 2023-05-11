const userService = require('../service/userService');

module.exports = router => {
  router.post("/covvertCsvToJson", async (req, res, next) => {
    try {
      let createConsumerData = await userService.createConsumer(req.body);
      res.status(200).json(createConsumerData);
    } catch (error) {
      
      let errorMessage=error.message
      res.status(500).json({message:errorMessage});
    }
  });
}