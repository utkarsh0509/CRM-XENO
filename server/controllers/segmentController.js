const Segment = require('../models/Segment');
const { calculateAudienceSize } = require('../services/segmentService');

exports.createSegment = async (req, res) => {
  try {
    const { name, description, conditions, logicalOperator } = req.body;
    
    // Calculate audience size
    const audienceSize = await calculateAudienceSize(conditions, logicalOperator);
    
    const segment = new Segment({
      name,
      description,
      conditions,
      logicalOperator,
      audienceSize
    });
    
    await segment.save();
    res.status(201).json(segment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSegments = async (req, res) => {
  try {
    const segments = await Segment.find().sort('-createdAt');
    res.json(segments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};