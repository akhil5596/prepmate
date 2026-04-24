import { Router } from 'express';
import Problem from '../models/Problem.js';
import { auth } from '../middleware/auth.js';

const router = Router();

// Get all problems (with filters)
router.get('/', async (req, res) => {
  try {
    const { difficulty, tag, search, page = 1, limit = 20 } = req.query;
    const query = {};
    if (difficulty) query.difficulty = difficulty;
    if (tag) query.tags = tag;
    if (search) query.title = { $regex: search, $options: 'i' };

    const problems = await Problem.find(query)
      .select('title difficulty tags stats')
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    const total = await Problem.countDocuments(query);
    res.json({ problems, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single problem
router.get('/:id', async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.id);
    if (!problem) return res.status(404).json({ error: 'Problem not found' });
    res.json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create problem (admin/interviewer only)
router.post('/', auth, async (req, res) => {
  try {
    const problem = await Problem.create(req.body);
    res.status(201).json(problem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
