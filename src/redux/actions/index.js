import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://dev.vigyaa.io/api/api/analytics/',
    headers: {
        'content-type': 'application/json',
    },
});

const fetchLiveUsers = () => {
  return (dispatch) => {
    instance.get('live-users-count').then((response) => {
      dispatch({ type: 'LIVE_USERS', payload: response.data });
    });
  };
};

const fetchSessionsData = (dates) => {
  return (dispatch) => {
    instance.get('session-data', { params: dates }).then((response) => {
      dispatch({ type: 'SESSIONS_DATA', payload: response.data });
    });
  };
};

const fetchReplyData = (dates) => {
  return (dispatch) => {
    instance.get('reply-count-data', { params: dates }).then((response) => {
      dispatch({ type: 'REPLY_DATA', payload: response.data });
    });
  };
};

const fetchPublishedData = (dates) => {
  return (dispatch) => {
    instance.get('published-unpublished-data', { params: dates }).then((response) => {
      dispatch({ type: 'PUBLISHED_DATA', payload: response.data });
    });
  };
};

export default {
 fetchLiveUsers,
 fetchPublishedData,
 fetchReplyData,
 fetchSessionsData
};
