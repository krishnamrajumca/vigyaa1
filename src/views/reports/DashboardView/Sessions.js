/* eslint-disable */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import fillYears from '../../../utils/fillYears';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  makeStyles,
} from '@material-ui/core';
import LineChart from '../../../graphs/lineChart';
import BarChart from '../../../graphs/barChart';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Sessions = ({ className, ...rest }) => {
  const classes = useStyles();
  const { dates, sessions } = rest;
  const [series, setSeries] = useState([]);
  const [labels, setlabels] = useState([]);
  useEffect(() => {
    const filledData = fillYears(sessions, { duration: 0, session_count: 0, avg: 0 }, dates, 'created_on');
    const visitors = filledData.map((s) => s.session_count);
    const session_times = filledData.map((s) => s.duration);
    const dateLabels = filledData.map((s) => s.created_on);
    const avg = filledData.map((s) => s.avg);
    const arr = [
      { name: 'Visitors', data: visitors },
      { name: 'Session Time', data: session_times },
      { name: 'Avg Session Time', data: avg }
    ];
    setSeries(arr);
    setlabels(dateLabels);
  }, [sessions, dates]);

  if(series.length == 0){
    return null;
  }
  else
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        title="Sessions"
      />
      <Divider />
      <CardContent>
        <Box
          height={400}
          position="relative"
        >
          <LineChart series={[series[0]]} labels={labels} title="Visitors" />
        </Box>
        <Box
          height={400}
          position="relative"
        >
          <LineChart series={[series[1]]} labels={labels} title="Session Times" />
        </Box>
        <Box
          height={40}
          position="relative"
        >
          Avg Session Time
        </Box>
        <Box
          height={400}
          position="relative"
        >
           <BarChart series={[series[2]]} labels={labels} title="Avg Session Time" />
        </Box>
      </CardContent>

    </Card>
  );
};

Sessions.propTypes = {
  className: PropTypes.string
};

export default Sessions;
