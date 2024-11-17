const mongoose = require('mongoose');

const conditionSchema = new mongoose.Schema({
  field: {
    type: String,
    required: true,
    enum: ['totalSpending', 'visits', 'lastVisitDate']
  },
  operator: {
    type: String,
    required: true,
    enum: ['>', '<', '>=', '<=', '==', '!=']
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const segmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  conditions: [{
    type: conditionSchema,
    required: true
  }],
  logicalOperator: {
    type: String,
    enum: ['AND', 'OR'],
    default: 'AND'
  },
  audienceSize: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Segment', segmentSchema);
