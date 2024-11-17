import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

const CreateSegment = () => {
  const [newSegment, setNewSegment] = useState({
    name: '',
    description: '',
    conditions: [{ field: 'totalSpending', operator: '>', value: 10000 }],
    logicalOperator: 'AND',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateSegment = async () => {
    if (!newSegment.name.trim() || !newSegment.description.trim()) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/segments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSegment),
      });
      if (response.ok) {
        const data = await response.json();
        alert('Segment created successfully!');
        console.log(data);
        setNewSegment({
          name: '',
          description: '',
          conditions: [{ field: 'totalSpending', operator: '>', value: 10000 }],
          logicalOperator: 'AND',
        });
      } else {
        console.error('Error creating segment:', response.statusText);
        alert('Failed to create segment.');
      }
    } catch (error) {
      console.error('Error creating segment:', error);
      alert('An error occurred while creating the segment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCondition = () => {
    setNewSegment({
      ...newSegment,
      conditions: [
        ...newSegment.conditions,
        { field: 'totalSpending', operator: '>', value: 0 },
      ],
    });
  };

  return (
    <Card>
      <CardHeader title="Create a New Customer Segment" />
      <CardContent>
        <Grid container spacing={2}>
          {/* Segment Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Segment Name"
              value={newSegment.name}
              onChange={(e) =>
                setNewSegment({ ...newSegment, name: e.target.value })
              }
            />
          </Grid>

          {/* Segment Description */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              value={newSegment.description}
              onChange={(e) =>
                setNewSegment({ ...newSegment, description: e.target.value })
              }
            />
          </Grid>

          {/* Conditions */}
          {newSegment.conditions.map((condition, index) => (
            <Grid item xs={12} key={index}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {/* Field */}
                <InputLabel>Field</InputLabel>
                <Select
                  value={condition.field}
                  onChange={(e) => {
                    const updatedConditions = [...newSegment.conditions];
                    updatedConditions[index].field = e.target.value;
                    setNewSegment({ ...newSegment, conditions: updatedConditions });
                  }}
                >
                  <MenuItem value="totalSpending">Total Spending</MenuItem>
                  <MenuItem value="visits">Visits</MenuItem>
                  <MenuItem value="lastVisitDate">Last Visit Date</MenuItem>
                </Select>

                {/* Operator */}
                <InputLabel>Operator</InputLabel>
                <Select
                  value={condition.operator}
                  onChange={(e) => {
                    const updatedConditions = [...newSegment.conditions];
                    updatedConditions[index].operator = e.target.value;
                    setNewSegment({ ...newSegment, conditions: updatedConditions });
                  }}
                >
                  <MenuItem value=">">Greater than</MenuItem>
                  <MenuItem value="<">Less than</MenuItem>
                  <MenuItem value="=">Equals</MenuItem>
                </Select>

                {/* Value */}
                <TextField
                  fullWidth
                  type="number"
                  label="Value"
                  value={condition.value}
                  onChange={(e) => {
                    const updatedConditions = [...newSegment.conditions];
                    updatedConditions[index].value = parseFloat(e.target.value);
                    setNewSegment({ ...newSegment, conditions: updatedConditions });
                  }}
                />
              </Box>
            </Grid>
          ))}

          {/* Add Condition Button */}
          <Grid item xs={12}>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addCondition}
              fullWidth
            >
              Add Condition
            </Button>
          </Grid>

          {/* Logical Operator */}
          <Grid item xs={12}>
            <InputLabel>Logical Operator</InputLabel>
            <Select
              fullWidth
              value={newSegment.logicalOperator}
              onChange={(e) =>
                setNewSegment({ ...newSegment, logicalOperator: e.target.value })
              }
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateSegment}
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Creating...' : 'Create Segment'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CreateSegment;
