import { ENDPOINT } from "../constants";

export const changeDate = (date) => {
  const berilganVaqt = new Date(date);
  const sana = berilganVaqt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return sana;
};

export const getImage = (data) => {
  return `${ENDPOINT}upload/${data?._id}.${data?.name?.split(".")[1]}`;
};
