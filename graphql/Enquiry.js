export const ENQUIRY = `
  mutation (
    $name: String!
    $email: String!
    $contactNumber: String
    $subject: String!
    $enquiry: String!
  ) {
    customerEnquiry(
      name: $name
      email: $email
      contactNumber: $contactNumber
      subject: $subject
      enquiry: $enquiry
    ) {
      status
      message
    }
  }
`;
