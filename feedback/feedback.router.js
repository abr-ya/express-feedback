const express = require("express");
const { body, validationResult } = require("express-validator");

const { listFeedbacks, createFeedback, updateFeedback, deleteFeedback } = require("./feedback.service.js");

const apiRouter = express.Router();

// GET: List all the Feedbacks
apiRouter.get("/", async (_request, response) => {
  try {
    const list = await listFeedbacks();
    return response.status(200).json(list);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

// POST: create Feedback
apiRouter.post(
  "/",
  body("text").isString(),
  body("rating").isNumeric(),
  body("user").isString(),
  body("userId").isString(),
  body("ava").isString(),
  // body("completed").isBoolean(),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    try {
      const item = request.body;
      const newFeedback = await createFeedback(item);
      return response.status(201).json(newFeedback);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

// PUT: Update Feedback
apiRouter.put(
  "/:id",
  body("text").isString(),
  body("rating").isNumeric(),
  body("user").isString(),
  body("userId").isString(),
  body("ava").isString(),
  async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response.status(400).json({ errors: errors.array() });
    }
    const id = parseInt(request.params.id, 10);
    try {
      const item = request.body;
      const updatedFeedback = await updateFeedback(item, id);
      return response.status(201).json(updatedFeedback);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

apiRouter.delete("/:id", async (request, response) => {
  const id = parseInt(request.params.id, 10);
  try {
    await deleteFeedback(id);
    return response.status(204).json(`Feedback ${id} was successfully deleted`);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

module.exports = apiRouter;
