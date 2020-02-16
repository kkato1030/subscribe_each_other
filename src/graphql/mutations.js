/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createSession = `mutation CreateSession(
  $input: CreateSessionInput!
  $condition: ModelSessionConditionInput
) {
  createSession(input: $input, condition: $condition) {
    id
    userId
    location
  }
}
`;
export const updateSession = `mutation UpdateSession(
  $input: UpdateSessionInput!
  $condition: ModelSessionConditionInput
) {
  updateSession(input: $input, condition: $condition) {
    id
    userId
    location
  }
}
`;
export const deleteSession = `mutation DeleteSession(
  $input: DeleteSessionInput!
  $condition: ModelSessionConditionInput
) {
  deleteSession(input: $input, condition: $condition) {
    id
    userId
    location
  }
}
`;
