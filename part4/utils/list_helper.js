// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce((acc, current) => acc + current.likes, 0)
    : 0;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  let topBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > topBlog.likes) topBlog = blog;
  });
  return topBlog;
};

export { dummy, totalLikes, favoriteBlog };
