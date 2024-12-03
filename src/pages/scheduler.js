import React, { useEffect, useState } from 'react';
import { graphql, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import { isAfter, isBefore, format, set, add } from 'date-fns';
import { Header } from '../components/blog/Header';
import { Footer } from '../components/blog/Footer';
import { isOffHrs } from '../utils';
import '../styles/index.css';
import { SEO } from '../components/shared/SEO';

const acceptableChars = 'abcdefghijklmnopqrstuvwxyz123456789-/';

export const URLifybirthday = (str) =>
  str.split(' ').map((s) =>
    s
      .split('')
      .filter((s2) => acceptableChars.includes(s2.toLowerCase()))
      .join('')
      .toLowerCase()
  );

const parseUrlbirthday = (str) => {
  const decoded = decodeURIComponent(str);
  return decoded;
};

const setQueryParam = (value) => {
  return `?${new URLSearchParams({ birthday: value })
    .toString()
    .toLowerCase()}`;
};

const wakeTime = '7:00';

const numberOfFeedingsByWeeksOld = {
  0: 9,
  2: 8,
  6: 7,
  9: 6,
  14: 5,
  23: 5,
};

const getToday = () => {
  return set(new Date(Date.now()), { hours: 1 });
};

const getSchedule = (birthday) => {
  const today = getToday();
  return Object.entries(numberOfFeedingsByWeeksOld).reduce(
    (acc, [afterWeek, numberOfFeedingsPerDay], i) => {
      const birthAsDate = parseDate(birthday);
      console.log({ afterWeek, birthAsDate });
      const mergeCount = i + 1;
      const date = add(parseDate(birthday), { weeks: afterWeek });
      acc.set(date, [numberOfFeedingsPerDay, mergeCount]);
      return acc;
    },
    new Map()
  );
};

const getDailyFeedingsAndMergeCount = (schedule) => {
  let feedingsAndMergeCount = [-1, -1];
  if (!schedule) return feedingsAndMergeCount;
  const today = getToday();
  for (var [date, [feedings, mergeCount]] of schedule.entries()) {
    if (isAfter(today, date)) {
      feedingsAndMergeCount = [feedings, mergeCount];
    }
  }
  return feedingsAndMergeCount;
};

const handleFirstTwoWeeks = (numberOfFeedingsToday) => {
  // -1 as we assume the first feeding is already done?
  const [hours, minutes] = String(wakeTime)
    .split(':')
    .map((s) => parseInt(s, 10));
  const msgs = [];
  const today = getToday();
  const threePm = set(today, { hours: 14, minutes: 59 });
  const elevenPm = set(today, { hours: 22, minutes: 59 });

  let prevFeed = null;
  for (let i = 1; i <= numberOfFeedingsToday; i++) {
    let currentFeed = prevFeed
      ? add(prevFeed, { hours: 3 })
      : set(today, { hours, minutes });
    if (
      prevFeed &&
      isAfter(prevFeed, threePm) &&
      isBefore(prevFeed, elevenPm)
    ) {
      currentFeed = add(prevFeed, { hours: 3 });
    }
    msgs.push(`Feeding Number ${i} -- ${format(currentFeed, 'hh:mm bbbb')}`);
    prevFeed = currentFeed;
  }
  return msgs;
};

const handleAfterFirstTwoWeeks = (numberOfFeedingsToday) => {
  // -1 as we assume the first feeding is already done?
  const [hours, minutes] = String(wakeTime)
    .split(':')
    .map((s) => parseInt(s, 10));
  const msgs = [];
  let prevFeed = null;
  const today = getToday();
  const tenPm = set(today, { hours: 20, minutes: 59 });

  for (let i = 1; i <= numberOfFeedingsToday; i++) {
    let currentFeed = prevFeed
      ? add(prevFeed, { hours: 3 })
      : set(today, { hours, minutes });
    if (prevFeed && isAfter(prevFeed, tenPm)) {
      currentFeed = add(prevFeed, { hours: 4 });
    }
    msgs.push(`Feeding Number ${i} -- ${format(currentFeed, 'hh:mm bbbb')}`);
    prevFeed = currentFeed;
  }
  return msgs;
};

const handleFourthAndFifth = (numberOfFeedingsToday, isFifth) => {
  // -1 as we assume the first feeding is already done?
  const [hours, minutes] = String(wakeTime)
    .split(':')
    .map((s) => parseInt(s, 10));
  const today = getToday();
  const msgs = [];
  let prevFeed = null;
  for (let i = 1; i <= numberOfFeedingsToday; i++) {
    let currentFeed = prevFeed
      ? add(prevFeed, { hours: 3, minutes: 0 })
      : set(today, { hours, minutes });
    if (isFifth && i === 3) {
      msgs.push(
        `Feeding Number ${i} -- ${format(
          currentFeed,
          'hh:mm bbbb'
        )} ** CATNAP **`
      );
    } else if (i === 4) {
      msgs.push(
        `Feeding Number ${i} -- ${format(
          currentFeed,
          'hh:mm bbbb'
        )} **NO SLEEP TIL BEDTIME**`
      );
    } else {
      msgs.push(`Feeding Number ${i} -- ${format(currentFeed, 'hh:mm bbbb')}`);
    }
    prevFeed = currentFeed;
  }
  if (isFifth) {
    msgs.push(`👆 Mid afternoon adds catnap! (pg 102)`);
  } else {
    msgs.push(`👆 Late afternoon excludes nap and adds waketime! (pg 101)`);
  }
  return msgs;
};

const handleSixth = (numberOfFeedingsToday) => {
  const [hours, minutes] = String(wakeTime)
    .split(':')
    .map((s) => parseInt(s, 10));
  const msgs = [];
  let prevFeed = null;
  for (let i = 1; i <= numberOfFeedingsToday; i++) {
    let currentFeed = prevFeed
      ? add(prevFeed, { hours: 3, minutes: 0 })
      : set(today, { hours, minutes });
    msgs.push(
      i === 4
        ? `Feeding Number ${i} -- ${format(
            currentFeed,
            'hh:mm bbbb'
          )} waketime + dinner + more waketime`
        : `Feeding Number ${i} -- ${format(currentFeed, 'hh:mm bbbb')}`
    );
    prevFeed = currentFeed;
  }
  msgs.push(`👆 Late afternoon includes lots of wake time! (pg 103)`);
  return msgs;
};

const getMsgs = (schedule) => {
  if (!schedule) return [];
  const [numberOfFeedings, mergeCount] =
    getDailyFeedingsAndMergeCount(schedule);
  console.log({ numberOfFeedings, mergeCount });
  if (mergeCount === -1) return [];
  if (mergeCount <= 1) {
    return handleFirstTwoWeeks(numberOfFeedings);
  } else if (mergeCount === 4 || mergeCount === 5) {
    return handleFourthAndFifth(numberOfFeedings, mergeCount === 5);
  } else if (mergeCount > 5) {
    return handleSixth(numberOfFeedings);
  } else {
    return handleAfterFirstTwoWeeks(numberOfFeedings);
  }
};

const parseDate = (str) => {
  const dateInput = str
    .split('-')
    .map((s) => Number(s))
    .map((n, i) => (i === 1 ? n - 1 : n));
  const date = new Date(...dateInput);
  return date;
};

const isValidBirthday = (s) => {
  const arr = s.split('-');
  if (arr.length !== 3) return false;
  const [year, month, date] = arr;
  return (
    year.length === 4 &&
    month.length > 0 &&
    month.length < 3 &&
    date.length > 0 &&
    date.length < 3 &&
    arr.map((s) => Number(s)).every((n) => n > 0)
  );
};

const Scheduler = ({ data }) => {
  const query = new URLSearchParams(useLocation().search);
  const birthday = query.get('birthday') || '2024-05-17';
  const [schedule, setSchedule] = useState(getSchedule(birthday));

  const { siteMetadata } = data.site;
  const izOffHrs = isOffHrs();

  const handleSetBirthday = (e) => {
    if (!e.target.value) {
      navigate('/scheduler');
    } else {
      navigate(setQueryParam(e.target.value));
    }
  };
  useEffect(() => {
    if (isValidBirthday(birthday)) {
      setSchedule(getSchedule(birthday));
    }
  }, [birthday]);

  console.log({ schedule });

  const handleKeyChange = (e) => {
    if (e.keyCode === 13) {
      navigate(setQueryParam(e.target.value));
    }
  };

  const renderMessages = () => {
    if (schedule) {
      return getMsgs(schedule).map((msg) => (
        <li className="p-10 border-2 mx-10 w-full rounded my-2 text-center">
          {msg}
        </li>
      ));
    }
    return [];
  };

  return (
    <SEO siteMetadata={siteMetadata}>
      <Header izOffHrs={izOffHrs} />
      <input
        type="text"
        value={parseUrlbirthday(birthday)}
        placeholder="Enter birthday"
        className="border border-2 text-xl border-gray-400 rounded-full p-5 flex mx-auto my-10 w-64 outline-none"
        onChange={handleSetBirthday}
        onKeyDown={handleKeyChange}
      />
      <ul className="blog-list flex flex-wrap mx-auto justify-center">
        {renderMessages()}
      </ul>
      <Footer izOffHrs={izOffHrs} />
    </SEO>
  );
};

export const query = graphql`
  query scheduler {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;

export default Scheduler;
