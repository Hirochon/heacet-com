const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.tsx`)
  const fixedPost = path.resolve(`./src/templates/fixed-post.tsx`)
  const postIndex = path.resolve(`./src/templates/index.tsx`)

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
  if (resultFixed.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      resultFixed.errors
    )
    return
  }

  const postsBlog = resultBlog.data.allMarkdownRemark.nodes
  const postsFixed = resultFixed.data.allMarkdownRemark.nodes

  const postsPerPage = 2
  const numPages = Math.ceil(postsBlog.length / postsPerPage)

  if (postsBlog.length > 0) {
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
      thumbnail: File @fileByDataPath
      isFixed: Boolean
    }

    type Fields {
      slug: String
    }
  `)
}