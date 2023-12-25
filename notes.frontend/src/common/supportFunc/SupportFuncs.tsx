const ConvertToDate = (date: string | undefined) => {
  return date ? new Date(date).toLocaleDateString() : "There is no date";
};

export { ConvertToDate };
