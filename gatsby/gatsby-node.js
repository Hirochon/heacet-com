const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/post/blog-post.tsx`)
  const fixedPost = path.resolve(`./src/templates/post/fixed-post.tsx`)
  const postIndex = path.resolve(`./src/templates/index/index.tsx`)
  const categoryPostIndex = path.resolve(`./src/templates/index/category.tsx`)
  const tagPostIndex = path.resolve(`./src/templates/index/tag.tsx`)

  // Get all markdown blog posts sorted by date
  const resultBlog = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          filter: {frontmatter: {isFixed: {nin: true}}}
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
          group(field: frontmatter___category) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  const tagGroup = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
          filter: {frontmatter: {isFixed: {nin: true}}}
        ) {
          group(field: frontmatter___tags) {
            fieldValue
            totalCount
          }
        }
      }
    `
  )

  const resultFixed = await graphql(
    `
      {
        allMarkdownRemark(
          filter: {frontmatter: {isFixed: {eq: true}}}
        ) {
          nodes {
            id
            fields {
              slug
            }
            frontmatter {
              isFixed
            }
          }
        }
      }
    `
  )

  if (resultBlog.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      resultBlog.errors
    )
    return
  }
  if (tagGroup.errors) {
    reporter.panicOnBuild(
      `There was an error loading your tag group`,
      tagGroup.errors
    )
    return
  }
  if (resultFixed.errors) {
    reporter.panicOnBuild(
      `There was an error loading your fixed posts`,
      resultFixed.errors
    )
    return
  }

  const postsBlog = resultBlog.data.allMarkdownRemark.nodes
  const postsFixed = resultFixed.data.allMarkdownRemark.nodes
  const categoryList = resultBlog.data.allMarkdownRemark.group
  const tagList = tagGroup.data.allMarkdownRemark.group

  const postsPerPage = 5
  const numPages = Math.ceil(postsBlog.length / postsPerPage)

  if (postsBlog.length > 0) {
    categoryList.forEach((category) => {
      const categoryNumPages = Math.ceil(category.totalCount / postsPerPage)
      categoryPathBase = `/category/${category.fieldValue}`

      Array.from({ length: categoryNumPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? categoryPathBase : `${categoryPathBase}/${i + 1}`,
          component: categoryPostIndex,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            category: category.fieldValue,
            numPages: categoryNumPages,
            currentPage: i + 1,
            pathBase: categoryPathBase
          },
        })
      })
    })

    tagList.forEach((tag) => {
      const tagNumPages = Math.ceil(tag.totalCount / postsPerPage)
      tagPathBase = `/tag/${tag.fieldValue}`

      Array.from({ length: tagNumPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? tagPathBase : `${tagPathBase}/${i + 1}`,
          component: tagPostIndex,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            tag: tag.fieldValue,
            numPages: tagNumPages,
            currentPage: i + 1,
            pathBase: tagPathBase
          },
        })
      })
    })

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/${i + 1}`,
        component: postIndex,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
        },
      })
    })

    postsBlog.forEach((post, index) => {
      const previousPostId = index === 0 ? null : postsBlog[index - 1].id
      const nextPostId = index === postsBlog.length - 1 ? null : postsBlog[index + 1].id
      
      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }

  if (postsFixed.length > 0) {
    postsFixed.forEach((post) => {
      const isFixed = post.frontmatter.isFixed

      if (!!isFixed) {
        createPage({
          path: post.fields.slug,
          component: fixedPost,
          context: {
            id: post.id,
          },
        })
      }
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createFieldExtension, createTypes } = actions

  createFieldExtension({
    name: 'fileByDataPath',
    extend: () => ({
      resolve: function (src, args, context, info) {
        const partialPath = src.thumbnail
          if (!partialPath) {
            return null
          }

        const filePath = path.join(__dirname, 'content/', partialPath)
        const fileNode = context.nodeModel.runQuery({
          firstOnly: true,
          type: 'File',
          query: {
            filter: {
              absolutePath: {
                eq: filePath
              }
            }
          }
        })

        if (!fileNode) {
          return null
        }

        return fileNode
      }
    })
  })

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      keywords: [String]
      tags: [String]
      category: String
      thumbnail: File @fileByDataPath
      isFixed: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}