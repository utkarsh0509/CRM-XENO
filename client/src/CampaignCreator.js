import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

const CampaignCreator = ({ onCampaignCreated }) => {
  const [segments, setSegments] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    segmentId: '',
    message: '',
    scheduledFor: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/segments');
      const data = await response.json();
      setSegments(data);
    } catch (error) {
      console.error('Error fetching segments:', error);
    }
  };

  const handleCreateCampaign = async () => {
    if (!newCampaign.name || !newCampaign.description || !newCampaign.segmentId || !newCampaign.message || !newCampaign.scheduledFor) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8080/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCampaign),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Campaign created successfully!');
        setNewCampaign({
          name: '',
          description: '',
          segmentId: '',
          message: '',
          scheduledFor: '',
        });
        if (onCampaignCreated) onCampaignCreated(data); // Notify parent component
      } else {
        console.error('Failed to create campaign:', response.statusText);
        alert('Failed to create campaign.');
      }
    } catch (error) {
      console.error('Error creating campaign:', error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Create a New Campaign" />
      <CardContent>
        <Grid container spacing={2}>
          {/* Campaign Name */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Campaign Name"
              value={newCampaign.name}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, name: e.target.value })
              }
            />
          </Grid>

          {/* Campaign Description */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Description"
              value={newCampaign.description}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, description: e.target.value })
              }
            />
          </Grid>

          {/* Select Segment */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Select Segment</InputLabel>
              <Select
                value={newCampaign.segmentId}
                onChange={(e) =>
                  setNewCampaign({ ...newCampaign, segmentId: e.target.value })
                }
              >
                {segments.map((segment) => (
                  <MenuItem key={segment._id} value={segment._id}>
                    {segment.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Message */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Message"
              multiline
              rows={3}
              value={newCampaign.message}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, message: e.target.value })
              }
            />
          </Grid>

          {/* Scheduled Date and Time */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Scheduled For"
              InputLabelProps={{ shrink: true }}
              value={newCampaign.scheduledFor}
              onChange={(e) =>
                setNewCampaign({ ...newCampaign, scheduledFor: e.target.value })
              }
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateCampaign}
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Creating...' : 'Create Campaign'}
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CampaignCreator;
