import Experience from '../models/Experience.js';

// @desc    Get all experiences (with optional filters)
// @route   GET /api/experiences
export const getAllExperiences = async (req, res) => {
  try {
    const { company, department, type, minLPA, maxLPA } = req.query;
    let filter = {};

    if (company) filter.company = { $regex: company, $options: 'i' };
    if (department) filter.department = department;
    if (type) filter.type = type;
    if (minLPA || maxLPA) {
      filter.package = {};
      if (minLPA) filter.package.$gte = parseFloat(minLPA);
      if (maxLPA) filter.package.$lte = parseFloat(maxLPA);
    }

    const experiences = await Experience.find(filter).sort({ createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Get single experience by ID
// @route   GET /api/experiences/:id
export const getExperienceById = async (req, res) => {
  try {
    const exp = await Experience.findById(req.params.id);
    if (!exp) return res.status(404).json({ msg: 'Experience not found' });
    res.status(200).json(exp);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// @desc    Create new experience
// @route   POST /api/experiences
export const createExperience = async (req, res) => {
  try {
    const experience = new Experience({
      ...req.body,
      userId: req.userId, // from auth middleware
      createdAt: new Date(),
    });

    const saved = await experience.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to create experience' });
  }
};

// @desc    Update existing experience
// @route   PUT /api/experiences/:id
export const updateExperience = async (req, res) => {
  try {
    const updated = await Experience.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!updated) return res.status(404).json({ msg: 'Experience not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Failed to update experience' });
  }
};
