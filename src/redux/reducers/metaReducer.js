import moment from 'moment';

const initialState = {
  live_users: { live_user_count: 0 },
  dates: { start_date: moment().format('YYYY-MM-DD'), end_date: moment().format('YYYY-MM-DD') },
  sessions: { session_details: [] },
  reply: { total_published_replies: [], total_unpublished_replies: [] },
  published: { total_published: [], total_unpublished: [] },
  total_session_count: 0
};

function metaReducer(state = initialState, action) {
    switch (action.type) {
      case 'LIVE_USERS':
        return { ...state, live_users: action.payload };
      case 'DATES_CHANGED':
        return { ...state, dates: action.payload };
      case 'SESSIONS_DATA':
        return { ...state, sessions: action.payload };
      case 'PUBLISHED_DATA':
        return { ...state, published: action.payload };
      case 'REPLY_DATA':
        return { ...state, reply: action.payload };
      default:
        return { ...state };
    }
}

export default metaReducer;
