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