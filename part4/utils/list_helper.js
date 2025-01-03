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

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const bloggers = {};
  let topBlogger = { author: "", blogs: 0 };
  blogs.forEach((blog) => {
    let totalBlogs = 1;
    if (blog.author in bloggers) {
      totalBlogs += bloggers[blog.author].blogs;
      bloggers[blog.author].blogs = totalBlogs;
    } else {
      bloggers[blog.author] = { author: blog.author, blogs: totalBlogs };
    }
    if (totalBlogs > topBlogger.blogs) {
      topBlogger = {
        author: blog.author,
        blogs: totalBlogs,
      };
    }
  });
  return topBlogger;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const bloggers = {};
  let topBlogger = { author: "", likes: 0 };
  blogs.forEach((blog) => {
    let totalLikes = blog.likes || 0;
    if (blog.author in bloggers) {
      totalLikes += bloggers[blog.author].likes;
      bloggers[blog.author].likes = totalLikes;
    } else {
      bloggers[blog.author] = { author: blog.author, likes: totalLikes };
    }
    if (totalLikes > topBlogger.likes) {
      topBlogger = {
        author: blog.author,
        likes: totalLikes,
      };
    }
  });
  return topBlogger;
};

export { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
