/**
 * Returns pretty date string for the given date and type.
 *
 * @param {Date} date Date to make pretty.
 * @param {number} type Different date format.
 * @return {string} pretty date string.
 */
export function dateToString(date: Date, type: number): string {
  const year: number = date.getFullYear();
  const month: number = date.getMonth() + 1;
  const day: number = date.getDate();

  const hour: number =
    date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minute: number = date.getMinutes();
  const ampm: string = date.getHours() > 12 ? "오후" : "오전";

  switch (type) {
    case 1:
      //Only date
      return `${year}년 ${month}월 ${day}일`;
    case 2:
      //Only time
      return `${ampm} ${hour}:${minute}`;

    default:
      //Both date and time
      return `${year}년 ${month}월 ${day}일 ${ampm} ${hour}:${minute}`;
  }
}
