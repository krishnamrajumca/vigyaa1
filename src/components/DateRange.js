import React, { useState, useEffect } from 'react';
import {
  makeStyles
} from '@material-ui/core';
import { DateRangePicker } from 'materialui-daterange-picker';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DateRangeIcon from '@material-ui/icons/DateRange';

import {
  addDays,
  startOfWeek,
  endOfWeek,
  addWeeks,
  startOfMonth,
  endOfMonth,
  addMonths,
  startOfYear
} from 'date-fns';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 850,
    padding: theme.spacing(1)
  }
}));
const Daterange = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState({});
  const [dateRange, setDateRange] = useState({ label: 'Today', startDate: new Date(), endDate: new Date() });
  useEffect(() => {
    console.log('hello', dateRange);
    const start = moment(dateRange.startDate).format('YYYY-MM-DD');
    const end = moment(dateRange.endDate).format('YYYY-MM-DD');
    console.log('formated', start, end);
    setDates({ startDate: start, endDate: end });
    props.onDateChange({ start_date: start, end_date: end });
  }, [dateRange]);
  const dateRanges = () => {
    const date = new Date();
    const range = [{
      label: 'Today',
      startDate: date,
      endDate: date,
    },
    {
      label: 'Yesterday',
      startDate: addDays(date, -1),
      endDate: addDays(date, -1),
    },
    {
      label: 'This Week',
      startDate: startOfWeek(date),
      endDate: endOfWeek(date),
    },
    {
      label: 'Last Week',
      startDate: startOfWeek(addWeeks(date, -1)),
      endDate: endOfWeek(addWeeks(date, -1)),
    },
    {
      label: 'Last 7 Days',
      startDate: addWeeks(date, -1),
      endDate: date,
    },
    {
      label: 'This Month',
      startDate: startOfMonth(date),
      endDate: endOfMonth(date),
    },
    {
      label: 'Last Month',
      startDate: startOfMonth(addMonths(date, -1)),
      endDate: endOfMonth(addMonths(date, -1)),
    },
    {
      label: 'This Year',
      startDate: startOfYear(date),
      endDate: date,
    }
    ];
    return range;
  };
  const toggle = () => setOpen(!open);
  return (
    <div>
      <Dialog
        open={open}
        onClose={toggle}
        className={classes.root}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        style={{ maxWidth: 800 }}
      >
        <DialogContent>
          <DateRangePicker
            open={open}
            toggle={toggle}
            definedRanges={dateRanges()}
            initialDateRange={dateRange}
            onChange={(range) => setDateRange(range)}
          />
        </DialogContent>
      </Dialog>
      <div onClick={toggle}>
        <span>{dates.startDate}</span>
        <span>{'   to   '}</span>
        <span>{dates.endDate}</span>
        <span><DateRangeIcon /></span>
      </div>
    </div>
  );
};

export default Daterange;
