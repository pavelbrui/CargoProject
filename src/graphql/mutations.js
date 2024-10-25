import { gql } from '@apollo/client';



export const SEND_ORDER = gql`
    mutation SendOrder($input: SendOrderPublicInput!) {
        public {
            sendOrder(input: $input)
        }
    }
`;




export const REGISTER_USER = gql`
    mutation Register($user: RegisterInput!) {
        public {
            register(user: $user) {
                registered
                hasError
            }
        }
    }
`;

export const UPDATE_DIRECTION_PRICING = gql`
  mutation UpdateDirectionPricing($teamId: String!, $_id: String!, $price: UpdatePriceForCountryCurrencyInput!) {
    admin(teamId: $teamId) {
      updateDirectionPricing(_id: $_id, price: $price) 
    }
  }
`;

export const ADD_NEW_PRICING = gql`
  mutation AddNewPricing($teamId: String!, $input: PriceForCountryCurrencyInput!) {
    admin(teamId: $teamId) {
      newDirectionPricing(input: $input) 
    }
  }
`;



export const UPDATE_ORDER_STATUS = gql`
mutation UpdateOrderStatus($teamId: String!, $_id: String!, $input: UpdateOrderInput!) {
  admin(teamId: $teamId) {
    orderOps(_id: $_id) {
      update(input: $input)
    }
  }
}
`;

export const DELETE_ORDER = gql`
mutation DeleteOrder($teamId: String!, $_id: String!) {
  admin(teamId: $teamId) {
    orderOps(_id: $_id) {
      delete
    }
  }
}
`;


// Mutation for editing user details
export const EDIT_USER = gql`
  mutation EditUser($updatedUser: UpdateUserInput!) {
    user {
      editUser(updatedUser: $updatedUser) {
        result
        hasError
      }
    }
  }
`;

// Mutation for removing a user from a team
export const REMOVE_USER_FROM_TEAM = gql`
  mutation RemoveUserFromTeam($data: RemoveUserFromTeamInput!) {
    admin {
      removeUserFromTeam(data: $data) {
        result
        hasError
      }
    }
  }
`;


export const UPDATE_USER = gql`
  mutation UpdateUser($teamId: String, $updatedUser: UpdateUserInput!) {
    admin(teamId: $teamId) {
      editUser(updatedUser: $updatedUser) {
        result
        hasError
      }
    }
  }
`;

export const DELETE_ADMIN = gql`
  mutation DeleteUser($teamId: String, $userId: String!) {
    admin(teamId: $teamId) {
      removeUserFromTeam(data: { userId: $userId, teamId: $teamId }) {
        result
        hasError
      }
    }
  }
`;
