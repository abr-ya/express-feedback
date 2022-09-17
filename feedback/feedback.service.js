const db = require("../utils/db.server.js");

const listFeedbacks = async () => {
  return db.feedback.findMany({
    select: {
      id: true,
      text: true,
      rating: true,
      user: true,
      userId: true,
      ava: true,
    },
  });
};

const createFeedback = async (feedback) => {
  const { text, rating, user, userId, ava } = feedback;

  return db.feedback.create({
    data: { text, rating, user, userId, ava },
    select: {
      id: true,
      text: true,
      rating: true,
      user: true,
      userId: true,
      ava: true,
    },
  });
};

const updateFeedback = async (feedback, id) => {
  const { text, rating } = feedback;
  return db.feedback.update({
    where: { id },
    data: { text, rating },
  });
};

const deleteFeedback = async (id) => {
  await db.feedback.delete({
    where: { id },
  });
};

module.exports = { listFeedbacks, createFeedback, updateFeedback, deleteFeedback }