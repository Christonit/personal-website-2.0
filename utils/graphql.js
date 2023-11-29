export const QUERY = `query {
    portfolioCollection(limit: 6) {
      items {
          sys{
              id
          }
          title
          slug
          thumbnail{
              url
              title
          }
          previewDescription
      }
    }
  }`;




export const SPECIFIC_QUERY = `title
  slug
  thumbnail {
    url
    title
  }
  tasks
  toolsUsed
  description
  previewDescription
  content {
    json
  }
  blockCollection(limit: 10) {
    items {
      ... on TwoColumnBlock {
        title
        contentfulMetadata {
            tags {
              id
              name
            }
        }
        paragraphs {
          json
        }
      }

      ... on ImageBlock {
        contentfulMetadata {
          tags {
            id
            name
          }
        }
        portfolioScreenshotsCollection {
          items {
            url
            title
          }
        }
      }
      ... on TwoColumnImages {
        twoColumnImagesCollection {
          items {
            url
            title
          }
        }
      }
      ... on Block {
        title
        contentfulMetadata {
            tags {
              id
              name
            }
        }
        paragraphs: textBlock {
          json
        }
      }
    }
  }`