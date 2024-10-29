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
          flat
          phone
          fullName
        }
        to {
          addressGoogleString
          flat
          phone
          fullName
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







export const GET_USER_DETAILS = gql`
  query GetUserDetails {
  user{
    me {
      _id
      username
      teams 
    }
   }
  }
`;


export const GET_PRICINGS = gql`
  query GetPricings($direction: String, $paymentCurrency: CountryCurrency, $ownerType: OwnerType, $teamId: String!) {
    admin(teamId: $teamId) {
      getPricings(direction: $direction, paymentCurrency: $paymentCurrency, ownerType: $ownerType) {
        _id
        ownerType
        direction
        paymentCurrency
        priceTypes {
          deliveryType
          minPrice
          priceForKg
        }
        courierMinPriceFromHome
        courierMinPriceToHome
        courierKgToHome
        courierKgFromHome
      }
    }
  }
`;


export const GET_DIRECTIONS = gql`
  query GetPricings( $teamId: String!) {
    admin(teamId: $teamId) {
      getPricings {
        direction
        paymentCurrency
      }
    }
  }
`;


export const GET_ENUM = gql`
query GetEnumValues($enumName: String!) {
  __type(name: $enumName) {
    enumValues {
      name
    }
  }
}
`


export const GET_ORDERS = gql`
  query GetOrders(
    $teamId: String!, 
    $sort: SortOrdersInput, 
    $fieldFilter: AdminOrderFilter, 
    $dateFilter: PeriodInput, 
    $paginate: PageOptions
  ) {
    admin(teamId: $teamId) {
      orders(
        sort: $sort
        fieldFilter: $fieldFilter
        dateFilter: $dateFilter
        paginate: $paginate
      ) {
        cursorId
        objects {
         _id
        clientId
        direction
        from {
          addressGoogleString
          flat
          phone
        }
        to {
          addressGoogleString
          flat
          phone
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
  }
`;




export const GET_USERS = gql`
  query GetUsers($teamId: String!) {
    admin(teamId: $teamId) {
      users {
          _id
          username
          fullName
          country
          createdAt
        
      }
    }
  }
`;


// export const GET_USERS = gql`
//   query GetUsers($teamId: String!, $sort: SortOrdersInput, $fieldFilter: AdminOrderFilter, $paginate: PageOptions) {
//     admin(teamId: $teamId) {
//       users(sort: $sort, fieldFilter: $fieldFilter, paginate: $paginate) {
//         cursorId
//         objects {
//           _id
//           username
//           fullName
//           country
//           emailForMails
//           phone
//           createdAt
//           teams
//         }
//       }
//     }
//   }
// `;