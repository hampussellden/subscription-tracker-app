import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import S from "../style";
export default ({
  date,
  handleDateChange,
}: {
  date: Date;
  handleDateChange: any;
}) => {
  return (
    <DateTimePicker
      testID='dateTimePicker'
      value={date}
      mode='date'
      display='spinner'
      is24Hour={true}
      onChange={handleDateChange}
      textColor={"#1e5aff"}
      minimumDate={new Date(Date.now())}
    />
  );
};
