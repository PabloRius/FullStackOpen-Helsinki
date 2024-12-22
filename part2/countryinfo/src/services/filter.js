const filterName = (name, data) => {
  return data.filter((el) => {
    return el.altSpellings.some((el2) => {
      const matches = el2.toLowerCase().includes(name.toLowerCase());
      return matches;
    });
  });
};

export { filterName };
