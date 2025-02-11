export const AUTH_LOGIN = `
  mutation ($email: String!, $password: String!) {
    authLogin(email: $email, password: $password) {
      status
      message
    }
  }
`;

export const AUTH_REGISTER = `
  mutation ($email: String!, $password: String!) {
    authRegister(email: $email, password: $password) {
      status
      message
    }
  }
`;

export const CHANGE_CUSTOMER_PASSWORD = `
  mutation ($password: String!) {
    changeCustomerPassword(password: $password) {
      status
      message
    }
  }
`;

export const SEND_VERIFICATION_CODE = `
mutation ($email: String!) {
  sendVerificationCode(email: $email) {
    status
    message
  }
}
`;

export const FORGOT_PASSWORD = `
mutation ($email: String!, $newPassword: String!, $confirmNewPassword: String!, $verificationCode: String!) {
  resetPassword(email: $email, newPassword: $newPassword, confirmNewPassword: $confirmNewPassword, verificationCode: $verificationCode) {
    status
    message
  }
}
`;
