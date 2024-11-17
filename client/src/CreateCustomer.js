import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

const CreateCustomer = () => {
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    totalSpending: '',
    visits: '',
    lastVisitDate: '',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Validate inputs
    if (
      !newCustomer.name.trim() ||
      !newCustomer.email.trim() ||
      !newCustomer.totalSpending ||
      !newCustomer.visits ||
      !newCustomer.lastVisitDate
    ) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newCustomer.name,
          email: newCustomer.email,
          totalSpending: parseFloat(newCustomer.totalSpending),
          visits: parseInt(newCustomer.visits, 10),
          lastVisitDate: newCustomer.lastVisitDate,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Customer "${data.name}" created successfully.`);
        setNewCustomer({
          name: '',
          email: '',
          totalSpending: '',
          visits: '',
          lastVisitDate: '',
        });
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to create customer.'}`);
      }
    } catch (error) {
      console.error('Error creating customer:', error);
      setMessage('Error: Unable to create customer.');
    }
  };

  return (
    <Card>
      <CardHeader title="Create New Customer" />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          {message && <Typography color="error">{message}</Typography>}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={newCustomer.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={newCustomer.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Total Spending"
              name="totalSpending"
              type="number"
              value={newCustomer.totalSpending}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Visits"
              name="visits"
              type="number"
              value={newCustomer.visits}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Last Visit Date"
              name="lastVisitDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={newCustomer.lastVisitDate}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Create Customer
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CreateCustomer;
