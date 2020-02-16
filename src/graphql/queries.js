/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSession = `query GetSession($id: ID!, $userId: String!) {
  getSession(id: $id, userId: $userId) {
    id
    userId
    location
  }
}
`;
export const listSessions = `query ListSessions(
  $id: ID
  $userId: ModelStringKeyConditionInput
  $filter: ModelSessionFilterInput
  $limit: Int
  $nextToken: String
  $sortDirection: ModelSortDirection
) {
  listSessions(
    id: $id
    userId: $userId
    filter: $filter
    limit: $limit
    nextToken: $nextToken
    sortDirection: $sortDirection
  ) {
    items {
      id
      userId
      location
    }
    nextToken
  }
}
`;
