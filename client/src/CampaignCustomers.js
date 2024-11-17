import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

const CampaignCustomers = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [segments, setSegments] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCampaignCustomers();
  }, []);

  const fetchCampaignCustomers = async () => {
    setIsLoading(true);
    try {
      // Fetch all campaigns
      const campaignsResponse = await fetch('http://localhost:8080/api/campaigns');
      const campaignsData = await campaignsResponse.json();
      setCampaigns(campaignsData);

      // Fetch all customers
      const customersResponse = await fetch('http://localhost:8080/api/customers');
      const customersData = await customersResponse.json();
      setCustomers(customersData);

      // Fetch all segments
      const segmentsResponse = await fetch('http://localhost:8080/api/segments');
      const segmentsData = await segmentsResponse.json();
      setSegments(segmentsData);

      // Process campaigns to find matching customers
      const campaignCustomerData = campaignsData.map((campaign) => {
        // Find the segment associated with the campaign
        const segment = segmentsData.find((seg) => seg._id === campaign.segmentId);

        if (!segment) {
          return {
            campaignName: campaign.name,
            campaignDescription: campaign.description,
            customers: [],
          };
        }

        // Filter customers based on segment conditions
        const matchingCustomers = customersData.filter((customer) =>
          segment.conditions.every((condition) =>
            evaluateCondition(customer, condition)
          )
        );

        return {
          campaignName: campaign.name,
          campaignDescription: campaign.description,
          customers: matchingCustomers,
        };
      });

      setFilteredCustomers(campaignCustomerData);
    } catch (error) {
      console.error('Error fetching campaign customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateCondition = (customer, condition) => {
    const { field, operator, value } = condition;
    switch (operator) {
      case '>':
        return customer[field] > value;
      case '<':
        return customer[field] < value;
      case '=':
        return customer[field] === value;
      default:
        return false;
    }
  };

  return (
    <Card>
      <CardHeader title="Campaign Customers" />
      <CardContent>
        {isLoading ? (
          <Typography>Loading...</Typography>
        ) : (
          filteredCustomers.map((campaignData, index) => (
            <Box key={index} sx={{ mb: 4 }}>
              <Typography variant="h6" gutterBottom>
                Campaign: {campaignData.campaignName}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {campaignData.campaignDescription}
              </Typography>
              {campaignData.customers.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Total Spending</TableCell>
                        <TableCell>Last Visit Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {campaignData.customers.map((customer) => (
                        <TableRow key={customer._id}>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{customer.email}</TableCell>
                          <TableCell>{customer.totalSpending}</TableCell>
                          <TableCell>{customer.lastVisitDate}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Typography>No matching customers for this campaign.</Typography>
              )}
            </Box>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default CampaignCustomers;
