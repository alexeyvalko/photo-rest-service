export const deleteFalsyKeys = <Type>(object: Type) => {
  const asArray = Object.entries(object);
  const filtered = asArray.filter(([, value]) => !!value);
  const filteredObject = Object.fromEntries(filtered);
  return filteredObject;
};
