import moment from 'moment';
import _ from 'lodash';

const fillYears = (data, fillObj, dates, key) => {
  const { start_date, end_date } = dates;
  const diff = moment(end_date).diff(moment(start_date), 'days');
  const temp = [];
  for (let i = 0; i <= diff; i++) {
    const date = moment(start_date).add(i, 'days').format('YYYY-MM-DD');
    const obj = _.find(data, (o) => o[key] === date);
    if (obj) {
      temp.push(obj);
    } else {
      const ob = { ...fillObj };
      ob[key] = date;
      temp.push(ob);
    }
  }
  return temp;
};

export default fillYears;
