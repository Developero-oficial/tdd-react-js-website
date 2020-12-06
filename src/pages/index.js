import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.posts.nodes
  const mainPost = data.mainPost

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title="TDD react JS"
        description="Tutorial para aplicar TDD paso a paso en React JS usando Jest y React Testing Library incluyendo llamada a API"
      />
      <Bio />

      <h1>
        Tutorial para aplicar TDD en React JS usando Jest y React Testing
        Library
      </h1>
      <section
        dangerouslySetInnerHTML={{ __html: mainPost.html }}
        itemProp="articleBody"
      />

      {!!posts.length && (
        <>
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
        </>
      )}
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
    posts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { slug: { ne: "/tdd-react/" } } }
    ) {
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
    mainPost: markdownRemark(fields: { slug: { eq: "/tdd-react/" } }) {
      id
      html
    }
  }
`
