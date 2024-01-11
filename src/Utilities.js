export const getUniqueId = () => {
  return new Date().getTime().toString();
}

export const getNewColorCode = () => {
  return `#${Math.floor(Math.random()*16777215).toString(16)}`;
}