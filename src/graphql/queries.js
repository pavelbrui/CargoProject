import { gql } from '@apollo/client';


// GraphQL queries and mutations
export const CALCULATE_ORDER = gql`
    query calculateMyOrder($input: CalculateOrderInput!) {
        public {
            calculateMyOrder(input: $input)
        }
    }
`;


export const MY_ORDERS_QUERY = gql`
  query MyOrders {
    user {
      myOrders {
        _id
        clientId
        direction
        from {
          addressGoogleString
        }
        to {
          addressGoogleString
        }
        deliveryType
        ownerType
        paymentCurrency
        totalPrice
        elements {
          length
          width
          height
          weight
          description
        }
        fromDoor
        toDoor
        paid
        status
        createdAt
        updatedAt
      }
    }
  }
`;


export const LOGIN_USER = gql`
  query LoginUser($user: LoginInput!) {
    public {
      login {
        password(user: $user) {
            accessToken
            hasError
            login   
        }
      }
    }
  }
`;
