export const ADD_TO_NEWSLETTER = `
  mutation ($email: String!) {
    newsletter(email: $email) {
      status
      message
    }
  }
`;
