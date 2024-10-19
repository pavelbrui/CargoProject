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
  mutation UpdateDirectionPricing($teamId: String!, $_id: String!, $price: PriceForCountryCurrencyInput!) {
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
