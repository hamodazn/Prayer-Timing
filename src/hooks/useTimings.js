import { useState, useEffect } from "react";
import { getTimingsByCity } from "../api/timings";
import { availableCities } from "../data/availableCities";
import moment from "moment";

const useTimings = (city) => {
  const [timings, setTimings] = useState(null);
  const [error, setError] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [countdown, setCountdown] = useState(null);
  const [currentTime, setCurrentTime] = useState(moment().format("HH:mm"));

  useEffect(() => {
    const fetchTimings = async () => {
      try {
        const selectedCity = availableCities.find(
          (cityObj) => cityObj.apiName === city.apiName
        );
        if (selectedCity) {
          const timings = await getTimingsByCity(
            city.apiName,
            selectedCity.country
          );
          setTimings(timings);
        } else {
          console.error(
            `City with apiName "${city.apiName}" not found in availableCities`
          );
        }
      } catch (error) {
        setError(error);
      }
    };

    fetchTimings();
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format("HH:mm"));
    }, 60000); // Aktualisiert jede Minute

    return () => clearInterval(intervalId);
  }, [city]);

  useEffect(() => {
    if (timings) {
      return calculateNextPrayer(timings);
    }
  }, [timings]);

  const calculateNextPrayer = (timings) => {
    const now = moment();
    const mainPrayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    const prayerTimes = Object.entries(timings)
      .filter(([name]) => mainPrayers.includes(name))
      .map(([name, time]) => ({
        name,
        time: moment(time, "HH:mm"),
      }));

    let nextPrayer = prayerTimes.find((prayer) => prayer.time.isAfter(now));
    if (!nextPrayer) {
      // If no prayer is found for today, take the first prayer of the next day
      nextPrayer = {
        ...prayerTimes[0],
        time: prayerTimes[0].time.add(1, "days"),
      };
    }
    setNextPrayer(nextPrayer);

    const updateCountdown = () => {
      const now = moment();
      const duration = moment.duration(nextPrayer.time.diff(now));
      setCountdown({
        hours: duration.hours(),
        minutes: duration.minutes(),
        seconds: duration.seconds(),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    // Return the cleanup function to clear the interval
    return () => clearInterval(interval);
  };

  return { timings, error, nextPrayer, countdown, currentTime };
};

export default useTimings;
