export default function calcAge() {
  const today = new Date();
  const birthday = new Date('2001-05-31');
  let age = today.getFullYear() - birthday.getFullYear();
  const month = today.getMonth() - birthday.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthday.getDate())) {
    age--;
  }
  return age;
}