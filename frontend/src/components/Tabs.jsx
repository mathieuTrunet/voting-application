import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CurrentSessionContainer from "../pages/UserPage/CurrentSessionContainer/currentSessionContainer.jsx";
import LastSuggestion from "../pages/LastSuggestion/lastSuggestion.jsx";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function BasicTabs() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%'}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} centered onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Suggestion en cours" {...a11yProps(0)} />
                    <Tab label="Dernière suggestion" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <CurrentSessionContainer ></CurrentSessionContainer>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <LastSuggestion></LastSuggestion>
            </CustomTabPanel>
        </Box>
    );
}