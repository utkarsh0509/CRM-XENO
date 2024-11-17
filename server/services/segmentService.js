const Customer = require('../models/Customer');

const buildMongoQuery = (conditions, logicalOperator) => {
  const queries = conditions.map(condition => {
    let value = condition.value;
    
    // Handle date comparison
    if (condition.field === 'lastVisitDate') {
      value = new Date(value);
    }
    
    // Convert operator to MongoDB syntax
    const operatorMap = {
      '>': '$gt',
      '<': '$lt',
      '>=': '$gte',
      '<=': '$lte',
      '==': '$eq',
      '!=': '$ne'
    };
    
    return {
      [condition.field]: { [operatorMap[condition.operator]]: value }
    };
  });

  return logicalOperator === 'AND' ? { $and: queries } : { $or: queries };
};

const calculateAudienceSize = async (conditions, logicalOperator) => {
  const query = buildMongoQuery(conditions, logicalOperator);
  return await Customer.countDocuments(query);
};

module.exports = {
  buildMongoQuery,
  calculateAudienceSize
};