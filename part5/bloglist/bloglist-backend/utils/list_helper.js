const totalLikes = (blogs) => {
  let total = 0

  blogs.forEach((blog) => {
    total += blog.likes
  })

  return total
}

const favoriteBlog = (blogs) => {
  const mostLikes = blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
  return mostLikes
}

const mostBlogs = (blogs) => {
  const authorCount = {}

  blogs.forEach((blog) => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  const maxAuthor = {}

  maxAuthor.author = Object.keys(authorCount).reduce((a, b) => {
    return authorCount[a] > authorCount[b] ? a : b
  })

  maxAuthor.blogs = Object.values(authorCount).reduce((a, b) => {
    return authorCount[a] > authorCount[b] ? a : b
  })

  return maxAuthor
}

const mostLikes = (blogs) => {
  const authorLikes = blogs.reduce((blog, { author, likes }) => {
    blog[author] = blog[author] || 0
    blog[author] += likes
    return blog
  }, {})

  const maxLikes = {}

  maxLikes.author = Object.keys(authorLikes).reduce((a, b) => {
    return authorLikes[a] > authorLikes[b] ? a : b
  })

  maxLikes.likes = authorLikes[maxLikes.author]

  return maxLikes
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
