import React, { Fragment, useState } from 'react';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function BasicDateTimePicker() {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <DateTimePicker
      label="Set the end of the vote"
      inputVariant="outlined"
      format={'yyyy-MM-dd HH:mm'}
      disablePast
      showTodayButton
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
}

const MuiUtilContainer = () => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <BasicDateTimePicker></BasicDateTimePicker>
    </MuiPickersUtilsProvider>
  );
};

export default MuiUtilContainer;
