export const avatarName = (username: any) => {
  return (
    "https://firebasestorage.googleapis.com/v0/b/techapp-ad995.appspot.com/o/image%2Favatar" +
    username.toString() +
    "?alt=media&token=5f3f6cd9-f0a9-4502-b0de-a88a7f867c24"
  );
};

export const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  let mm: number | string = date.getMonth() + 1; // Months start at 0!
  let dd: number | string = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const res = dd + "/" + mm + "/" + yyyy;

  return res;
};
