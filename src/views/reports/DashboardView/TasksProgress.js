import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import TimerIcon from '@material-ui/icons/Timer';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const TasksProgress = ({ className, avgTime, ...rest }) => {
  const classes = useStyles();
  const session_time = (time) => {
    const duration = parseInt(time, 10);
    const d = Math.floor(duration / 86400);
    const dr = duration % 86400;
    let h = Math.floor(dr / 3600);
    const hr = dr % 3600;
    let m = Math.floor(hr / 60);
    let mr = hr % 60;
    h = h > 9 ? h : `0${h}`;
    m = m > 9 ? m : `0${m}`;
    mr = mr > 9 ? m : `0${mr}`;
    return `${d}d: ${h}h: ${m}m: ${mr}s`;
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              AVG SESSION TIME
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              {session_time(avgTime)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <TimerIcon />
            </Avatar>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};

TasksProgress.propTypes = {
  className: PropTypes.string
};

export default TasksProgress;
