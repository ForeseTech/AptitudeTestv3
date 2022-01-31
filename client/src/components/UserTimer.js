import React, { useState, useEffect, useRef } from 'react';
import { endTimer } from '../actions/timerActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const UserTimer = () => {
  const intervalRef = useRef(null);

  const dispatch = useDispatch();

  const [timer, setTimer] = useState('00:00:00');
  const [endDate, setEndDate] = useState();

  useEffect(() => {
    getTimings();
    clearTimer(getDeadline());
  }, [endDate]);

  const getTimeRemaining = (end) => {
    const total = Date.parse(end) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);

    return { total, hours, minutes, seconds };
  };

  const startTimer = (deadline) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(deadline);

    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds)
      );
    } else {
      clearInterval(intervalRef.current);
      dispatch(endTimer());
    }
  };

  const clearTimer = (endTime) => {
    setTimer('00:00:00');
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const id = setInterval(() => {
      startTimer(endTime);
    }, 1000);
    intervalRef.current = id;
  };

  const getDeadline = () => {
    let deadline = endDate;
    return deadline;
  };

  const getTimings = async () => {
    const { data } = await axios.get('/api/timer/');
    if (data && data) {
      setEndDate(data[0].endTime);
    }
  };

  // const onClickReset = () => {
  //     if(intervalRef.current) clearInterval(intervalRef.current)
  //     clearTimer(getDeadline())
  // }

  return <>{timer}</>;
};

export default UserTimer;
