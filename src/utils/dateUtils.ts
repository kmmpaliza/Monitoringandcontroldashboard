export const formatUTCToCETShort = (utcString: string): string => {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Berlin",
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(utcString));
};