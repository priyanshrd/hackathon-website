const express = require('express');
const router = express.Router();
const Submission = require('../../backend/models/Submission');
const authMiddleware = require('../middleware/auth');
// POST /api/submit - Add a new team submission
router.post('/', async (req, res) => {
  const { teamName, description } = req.body;

  try {
    // Automatically set teamId to teamName
    const teamId = teamName;

    // Extract the first line of the description as the idea
    const idea = description.split('\n')[0]; // Split by line and take the first line

    // Save all the data in the database
    const newSubmission = new Submission({
      teamName,
      teamId,
      idea,
      description, // Save the full description for future use
    });

    await newSubmission.save();

    res.status(201).json({
      message: 'Submission saved successfully!',
      submission: newSubmission,
    });
  } catch (err) {
    console.error('Error saving submission:', err);
    res.status(500).json({ error: 'Failed to save submission' });
  }
});

// GET /api/submissions - Fetch all submissions (sorted by score)
router.get('/', async (req, res) => {
  try {
    const submissions = await Submission.find().sort({ score: -1 });
    res.status(200).json(submissions);
  } catch (err) {
    console.error('Error fetching submissions:', err);
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
});

// router.delete('/clear', async (req, res) => {
//   try {
//     await Submission.deleteMany({});
//     res.status(200).json({ message: 'All submissions have been cleared.' });
//   } catch (err) {
//     console.error('Error clearing submissions:', err);
//     res.status(500).json({ error: 'Failed to clear submissions' });
//   }
// });

// router.put('/:teamId/score', async (req, res) => {
//   const { teamId } = req.params;
//   const { score } = req.body;

//   try {
//     const updatedSubmission = await Submission.findOneAndUpdate(
//       { teamId },
//       { score },
//       { new: true } // Return the updated document
//     );

//     if (!updatedSubmission) {
//       return res.status(404).json({ error: 'Submission not found' });
//     }

//     res.status(200).json({
//       message: 'Score updated successfully!',
//       submission: updatedSubmission,
//     });
//   } catch (err) {
//     console.error('Error updating score:', err);
//     res.status(500).json({ error: 'Failed to update score' });
//   }
// });

router.put('/randomize-scores', async (req, res) => {
  try {
    // Fetch all submissions
    const submissions = await Submission.find();

    // Randomly assign scores between 0 and 100
    const updatedSubmissions = await Promise.all(
      submissions.map(async (submission) => {
        const randomScore = Math.floor(Math.random() * 101); // Random score between 0 and 100
        submission.score = randomScore;
        return submission.save();
      })
    );

    // Sort submissions by score in descending order
    const sortedSubmissions = updatedSubmissions.sort((a, b) => b.score - a.score);

    res.status(200).json({
      message: 'Scores randomized and sorted successfully!',
      submissions: sortedSubmissions,
    });
  } catch (err) {
    console.error('Error randomizing scores:', err);
    res.status(500).json({ error: 'Failed to randomize scores' });
  }
});
module.exports = router;