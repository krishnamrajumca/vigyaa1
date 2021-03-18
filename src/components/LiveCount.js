import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
import DirectionsWalkTwoToneIcon from '@material-ui/icons/DirectionsWalkTwoTone';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 70
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 50,
    width: 50
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const LiveCount = ({ live_users }) => {
  const classes = useStyles();
  return (
    <Card
      className={classes.root}
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
              Live USERS
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {live_users.live_user_count}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <DirectionsWalkTwoToneIcon />
            </Avatar>
          </Grid>
        </Grid>

      </CardContent>
    </Card>
  );
};

export default LiveCount;
