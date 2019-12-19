import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Grid, Checkbox, Paper, Button } from '@material-ui/core';
import Card from '../component/card';
import "../App.css";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    flexGrow: 1,
    backgroundColor: "yellow",
    paddingTop: "55px",
    paddingRight: "60px",
    paddingLeft: "100px",
    paddingBottom: "80px"
  },
  tabPaper: {
    backgroundColor: "white"
  }
}));

export default function SimpleTabs({ tabs, index, state, onDragStart, onDragOver, onDragEnd, handleCheckbox }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper className={classes.paper}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {
              tabs.map(tab => {
                return <Tab key={tab.id} label={tab.label} {...a11yProps(tab.id)} />
              })
            }
          </Tabs>
          {
            value > 0 && <Button variant="contained" color="secondary" onClick={() => alert('deleted')}> Delete category </Button>
          }
        </AppBar>
        <TabPanel className={classes.tabPaper} value={value} index={index}>
          <Grid container spacing={2}>
            <ul>
              {state.items.map((item, idx) => (
                <li style={{ listStyle: "none" }} key={item.id} onDragOver={() => onDragOver(idx)}>
                  <div
                    key={idx}
                    className="drag"
                    draggable
                    onDragStart={e => onDragStart(e, idx)}
                    onDragEnd={onDragEnd}
                  >
                    <Checkbox
                      id={String(item.id)}
                      checked={state.checkedItems.indexOf(item.id) > -1}
                      onChange={handleCheckbox}
                      value="primary"
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <Card item={item} />
                  </div>
                </li>
              ))}
            </ul>
          </Grid>
        </TabPanel>
      </Paper>
    </>
  );
}
