import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="TDD react JS" />
      <Bio />

      <h4>Otros tutoriales de TDD en React</h4>

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => (
          <li key={post.fields.slug} className="post-list-item">
            <Link to={post.fields.slug} itemProp="url">
              {post.frontmatter.title || post.fields.slug}
            </Link>
          </li>
        ))}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
