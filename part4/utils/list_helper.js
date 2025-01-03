// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce((acc, current) => acc + current.likes, 0)
    : 0;
};

export { dummy, totalLikes };
