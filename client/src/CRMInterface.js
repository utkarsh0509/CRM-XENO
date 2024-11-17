import React, { useEffect, useState } from 'react';
import CampaignCustomers from './CampaignCustomers';
import CreateCustomer from './CreateCustomer';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import { People as PeopleIcon, Settings as SettingsIcon, Campaign as CampaignIcon, Add as AddIcon } from '@mui/icons-material';
import CreateSegment from './Segment';
import CampaignCreator from './CampaignCreator';

// TabPanel component for tab content
function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CRMInterface = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 0) {
      fetchCustomers();
    }
  }, [activeTab]);

  const fetchCustomers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/customers');
      const data = await response.json();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 1200, margin: 'auto', p: 3 }}>
      {/* Header */}
      <Card sx={{ mb: 3 }}>
        <CardHeader
          title="CRM & Campaign Management"
          sx={{ bgcolor: 'primary.main', color: 'white', textAlign: 'center' }}
        />
      </Card>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
          centered
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab icon={<PeopleIcon />} label="Customers" />
          <Tab icon={<SettingsIcon />} label="Segments" />
          <Tab icon={<CampaignIcon />} label="Campaigns" />
          <Tab icon={<PeopleIcon />} label="Campaign Customers" />
          <Tab icon={<AddIcon />} label="Create Customer" />
        </Tabs>
      </Box>

      {/* Tab Content */}
      {/* Customers */}
      <TabPanel value={activeTab} index={0}>
        <Card>
          <CardHeader title="Customers" />
          <CardContent>
            {isLoading ? (
              <Typography>Loading customers...</Typography>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Total Spending</TableCell>
                      <TableCell>Visits</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {customers.map((customer) => (
                      <TableRow key={customer.id}>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.totalSpending}</TableCell>
                        <TableCell>{customer.visits}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </TabPanel>

      {/* Segments */}
      <TabPanel value={activeTab} index={1}>
        <CreateSegment />
      </TabPanel>

      {/* Campaigns */}
      <TabPanel value={activeTab} index={2}>
        <CampaignCreator />
      </TabPanel>

      {/* Campaign Customers */}
      <TabPanel value={activeTab} index={3}>
        <CampaignCustomers />
      </TabPanel>

      {/* Create Customer */}
      <TabPanel value={activeTab} index={4}>
        <CreateCustomer />
      </TabPanel>
    </Box>
  );
};

export default CRMInterface;
