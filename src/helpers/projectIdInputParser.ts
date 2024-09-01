export const projectIdInputParser = (value: string) => {
  const split = value.split(" ");
  const idString = split[0]?.replace("#", "");
  return Number(idString);
};
