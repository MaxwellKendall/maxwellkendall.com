import moment from "moment";

export const getFontColor = (izOffHrs) => {
    return izOffHrs ? '#6DA7B5' : '#4C6063';
};

export const isOffHrs = () => (
    moment().day() >= 6 || moment().hour() >= 17
);

