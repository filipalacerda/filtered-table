/**
 * Given a string, it capitalizes the first letter of it
 * @param name
 * @returns string
 */
const capitalizeName = (name: string) => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export { capitalizeName };
