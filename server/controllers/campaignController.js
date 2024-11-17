const Campaign = require('../models/Campaign');
const Segment = require('../models/Segment');

exports.createCampaign = async (req, res) => {
  try {
    const { name, description, segmentId, message, scheduledFor } = req.body;
    
    const segment = await Segment.findById(segmentId);
    if (!segment) {
      return res.status(404).json({ error: 'Segment not found' });
    }
    
    const campaign = new Campaign({
      name,
      description,
      segment: segmentId,
      message,
      scheduledFor,
      audienceSize: segment.audienceSize
    });
    
    await campaign.save();
    res.status(201).json(campaign);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find()
      .populate('segment')
      .sort('-createdAt');
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};