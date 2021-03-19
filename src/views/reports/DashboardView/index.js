import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Paper from '@material-ui/core/Paper';
import LiveCount from '../../../components/LiveCount';
import Daterange from '../../../components/DateRange';
import { useSelector, useDispatch } from 'react-redux';
import actions from '../../../redux/actions';
import Budget from './Budget';
import Sessions from './Sessions';
import TasksProgress from './TasksProgress';
import TotalCustomers from './TotalCustomers';
import TotalProfit from './TotalProfit';
import Posts from './Posts';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(2)
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const {
    live_users,
    sessions,
    reply,
    published,
    dates
  } = useSelector((state) => state.metaReducer);
  console.log(live_users, sessions, reply, published);
  const dispatch = useDispatch();
  const [sessionCount, setSessionCount] = useState(0);
  const [duration, setDuration] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [sessionDetails, setSessionDetails] = useState([]);
  const [pc, setPublishedCount] = useState(0);
  const [upc, setunPublishedCount] = useState(0);
  const [prc, setPublishedRCount] = useState(0);
  const [uprc, setunPublishedRCount] = useState(0);
  console.log(duration, avgTime);
  const onDateChange = (d) => {
    dispatch({ type: 'DATES_CHANGED', payload: d });
  };
  useEffect(() => {
    dispatch(actions.fetchSessionsData(dates));
    dispatch(actions.fetchReplyData(dates));
    dispatch(actions.fetchPublishedData(dates));
  }, [dates,dispatch]);
  useEffect(() => {
    dispatch(actions.fetchLiveUsers());
    const interval = setInterval(() => {
      dispatch(actions.fetchLiveUsers());
    }, 300000);
    return () => {
      clearInterval(interval);
    };
  }, [dispatch]);
  useEffect(() => {
    const { session_details } = sessions;
    const session_count = session_details.reduce((a, b) => (a + b.session_count), 0);
    console.log('session_count', session_count);
    let session_duration = 0;
    const ss = session_details.map((s) => {
      s.avg = Math.floor((s.session_count / session_count) * 1000) / 1000;
      s.duration = parseFloat(s.duration);
      session_duration += s.duration;
      return s;
    });
    console.log(ss);
    setSessionCount(session_count);
    if (session_details.length !== 0) {
      setAvgTime(Math.floor((session_count / session_details.length) * 1000) / 1000);
    } else {
      setAvgTime(0);
    }
    setDuration(session_duration);
    setSessionDetails(session_details);
  }, [sessions]);
  useEffect(() => {
    const { total_published, total_unpublished } = published;
    const published_count = total_published.reduce((a, b) => (a + b.created_count), 0);
    const unpublished_count = total_unpublished.reduce((a, b) => (a + b.created_count), 0);
    setPublishedCount(published_count);
    setunPublishedCount(unpublished_count);
  }, [published]);
  useEffect(() => {
    const { total_published_replies, total_unpublished_replies } = reply;
    const published_count = total_published_replies.reduce((a, b) => (a + b.total_count), 0);
    const unpublished_count = total_unpublished_replies.reduce((a, b) => (a + b.total_count), 0);
    setPublishedRCount(published_count);
    setunPublishedRCount(unpublished_count);
  }, [reply]);
  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid container spacing={3} justify="flex-start" style={{ marginBottom: 20 }}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <LiveCount live_users={live_users} />
          </Grid>
        </Grid>
        <Paper className={classes.paper}>
          <Grid container spacing={3} >
            <Grid item lg={6} sm={6} xl={6} xs={12} justify="flex-start" style={{textAlign:'initial'}}>
              <Daterange onDateChange={onDateChange} />
            </Grid>
            <Grid item lg={6} sm={6} xl={6} xs={12} justify="flex-end" style={{textAlign:'end'}}>
              <div>download</div>
            </Grid>
          </Grid>
        </Paper>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Budget session_count={sessionCount} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalCustomers duration={duration} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TasksProgress avgTime={avgTime} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalProfit pc={pc} upc={upc} prc={prc} uprc={uprc} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Sessions dates={dates} sessions={sessionDetails} />
          </Grid>
          <Grid
            item
            lg={12}
            md={12}
            xl={12}
            xs={12}
          >
            <Posts dates={dates} reply={reply} published={published} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
