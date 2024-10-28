import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://airy-empathy-production.up.railway.app/graphql', // Podaj URL do swojego backendu
    cache: new InMemoryCache(),
});

// Dodaj definicje typów
const typeDefs = gql`type Query{
	"""
	Retrieves user-related queries.
	"""
	user: UserQuery!
	"""
	Retrieves login-related queries.
	"""
	public: PublicQuery!
	"""
	Retrieves admin member-related queries.
	"""
	admin(teamId: String): AdminQuery!
}

type PublicQuery{
	login: LoginQuery!
	list: [String]
	calculateMyOrder(
		input: CalculateOrderInput!
	): Int
}

type Mutation{
	"""
	Mutations related to public actions.
	"""
	public: PublicMutation!
	"""
	Mutations related to user actions.
	"""
	user: UserMutation!
	"""
	Mutations related to admin member actions.
	"""
	admin(teamId: String): AdminMutation!
	"""
	entry point for Webhooks.
	"""
	webhook: String
}

"""
Represents a mutation for public actions.
"""
type PublicMutation{
	"""
	Registers a user.
	"""
	register(
		"""
		The registration input object.
		"""
		user: RegisterInput!
	): RegisterResponse!
	"""
	Changes the password using a token.
	"""
	changePasswordWhenLogged(input:ChangePasswordWhenLoggedInput!):ChangePasswordWhenLoggedResponse!
	changePasswordWithToken(
		token: ChangePasswordWithTokenInput!
	): ChangePasswordWithTokenResponse!
	"""
	Verifies an email using a verification data object.
	"""
	verifyEmail(
		"""
		The verification email input object.
		"""
		verifyData: VerifyEmailInput!
	): VerifyEmailResponse!
    sendOrder(input: SendOrderPublicInput!): String
}

"""
Represents user-related mutations.
"""
type UserMutation{
	editUser(
		updatedUser: UpdateUserInput!
	): EditUserResponse!
	orderOps(
		_id: String!
	): OrderOps!
	saveDraft(input: DraftOrderInput!):  String
	sendOrder(input: SendOrderInput!): String
	createTeam(
		teamName: String!
	): CreateTeamResponse!
	joinToTeam(
		teamId: String!
	): JoinToTeamResponse!
}

input UpdateUserInput{
	username: String
	fullName: String
	country: Country
	phone: String
	emailForMails: String
}

"""
Represents admin member-related mutations.
"""
type AdminMutation{
	addOrder(
		order: CreateOrderAdminInput
	):  String
	
	orderOps(
		_id: String!
	): OrderOps!
	sendInvoice: Boolean

	updateDirectionPricing(
		_id:  String!
		price: UpdatePriceForCountryCurrencyInput
	): Boolean

	newDirectionPricing(
		input: PriceForCountryCurrencyInput!
	): String

	sendInvitationToTeam(
		invitation: SendTeamInvitationInput!
	): SendInvitationToTeamResponse!

	removeUserFromTeam(
		data: RemoveUserFromTeamInput!
	): RemoveUserFromTeamResponse!
}


type PriceForCountryCurrency{
	ownerType:  OwnerType
	_id:String!
	direction: String!
    paymentCurrency: CountryCurrency!
	priceTypes:  [PriceForDeliveryType]
	courierMinPriceToHome:Float
	courierKgToHome:Float
	courierMinPriceFromHome:Float
	courierKgFromHome:Float

}

input PriceForCountryCurrencyInput{
	ownerType:  OwnerType
	direction:  String!
	paymentCurrency: CountryCurrency!
	priceTypes:  [PriceForDeliveryTypeInput]

	courierMinPriceToHome:Float
	courierKgToHome:Float
	courierMinPriceFromHome:Float
	courierKgFromHome:Float
}

input UpdatePriceForCountryCurrencyInput{
	ownerType:  OwnerType
	direction:  String
	paymentCurrency: CountryCurrency
	priceTypes:  [PriceForDeliveryTypeInput]
	courierMinPriceToHome:Float
	courierKgToHome:Float
	courierMinPriceFromHome:Float
	courierKgFromHome:Float
}


input PriceForDeliveryTypeInput{
	deliveryType:  DeliveryType
	minPrice: Float
	priceForKg: Float
}


type PriceForDeliveryType{
	deliveryType:  DeliveryType
	minPrice: Float
	priceForKg: Float
}



input ProviderLoginInput{
	code: String!
}


input SimpleUserInput{
	username: String!
	password: String!
}


input LoginInput{
	username: String!
	password: String!
}


input SendTeamInvitationInput{
	username: String!
	teamId: String!
	roles: [String!]!
}


input VerifyEmailInput{
	token: String!
}


input InviteTokenInput{
	expires: String
	domain: String
	teamId: String
	roles: [String!]!
}

input ChangePasswordWithTokenInput{
	username: String!
	forgotToken: String!
	newPassword: String!
}

input ChangePasswordWhenLoggedInput{
	username: String!
	oldPassword: String!
	newPassword: String!
}

input RegisterInput{
	fullName: String
	username: String!
	password: String!
	country:   Country!
	invitationToken: String
}

"""
Represents user-related queries.
"""
type UserQuery{
	"""
	Retrieves the current user.
	"""
	me: User
	calculateMyOrder(
		input: CalculateOrderInput
	): Int
	myOrders(input: OrderFilter) :
	[DraftOrder!]
	myDrafts: [DraftOrder!]
	orderDetails(
		_id: String!
	): Order!
}

input CalculateOrderInput{
	direction: String!
	paymentCurrency: CountryCurrency!
	deliveryType: DeliveryType!
	ownerType: OwnerType!
	elements: [DimensionInput!]!
	fromDoor: Boolean
	toDoor: Boolean
}

"""
Represents login-related queries.
"""
type LoginQuery{
	"""
	Authenticates a user using a password.
	"""
	password(
		"""
		The login input object.
		"""
		user: LoginInput!
	): LoginResponse!
	"""
	Authenticates a user using a provider.
	"""
	provider(
		"""
		The provider login input object.
		"""
		params: ProviderLoginInput!
	): ProviderLoginQuery!
	"""
	Refreshes an access token using a refresh token.
	"""
	refreshToken(
		"""
		The refresh token.
		"""
		refreshToken: String!
	): String!
	"""
	Sends a request for forgot password.
	"""
	requestForForgotPassword(
		"""
		The username for the forgot password request.
		"""
		username: String!
	): Boolean!
	"""
	Retrieves the Google OAuth link.
	"""
	getGoogleOAuthLink(
		setup: GetOAuthInput!
	): String!
}

"""
Represents admin member-related queries.
"""
type AdminQuery{
	orders(
		fieldFilter: AdminOrderFilter
		dateFilter:  PeriodInput
	    paginate: PageOptions
	    sort: SortOrdersInput
	): PaginatedOrders
	getPricings(
		ownerType: OwnerType
		direction:  String
	    paymentCurrency: CountryCurrency): [PriceForCountryCurrency!]
    users:  [User]
}



enum CountryCurrency {
    USD,  
    PLN, 
    BYR, 
    RUB,  
    EUR,  
    GBP,  # Funt brytyjski
    JPY,  # Jen japoński
    CNY,  # Juan chiński
    AUD,  # Dolar australijski
    CAD,  # Dolar kanadyjski
    CHF,  # Frank szwajcarski
    SEK,  # Korona szwedzka
    NOK,  # Korona norweska
    MXN,  # Peso meksykańskie
    INR,  # Rupia indyjska
    BRL,  # Real brazylijski
    ZAR,  # Rand południowoafrykański
    KRW,  # Won południowokoreański
}

type User implements Node{
	_id: String!
	username: String!
	fullName: String
	country:  Country
	emailConfirmed: Boolean!
	createdAt: String!
	customerId: String
	teams: [String!]
}

type Team {
	_id: String!
	name: String!
	owner: String
	members: [TeamMember!]!
	createdAt: String
}

type TeamMember {
	_id: String!
	username: String!
	fullName: String
}

interface Node{
	"""
	The ID of the node.
	"""
	_id: String!
	"""
	The creation date of the node.
	"""
	createdAt: String!
}

type Order{
	_id: String!
	clientId: String!
	direction:  String!
	paymentCurrency: CountryCurrency!
	from: Address!
	to: Address!
	deliveryType: DeliveryType!
	ownerType: OwnerType!
	totalPrice: Int!
	elements: [Dimension!]!
    description: String!
    notes:  String
	fromDoor: Boolean
	paid: Boolean
	toDoor: Boolean
	status: OrderStatus
	createdAt: String!
	updatedAt:  String
}

type DraftOrder{
	_id: String!
	clientId: String!
	direction:  String
	from: Address
	to: Address
	deliveryType: DeliveryType
	ownerType: OwnerType
    paymentCurrency: CountryCurrency
	totalPrice: Int
	elements: [Dimension!]
	description: String
    notes:  String
	fromDoor: Boolean
	toDoor: Boolean
	paid: Boolean
	status: OrderStatus
	createdAt: String!
	updatedAt:  String
}

type Dimension{
	length: Int
	height: Int
	width: Int
	weight: Int
	description: String
}

input DimensionInput{
	length: Int!
	height: Int!
	width: Int!
	weight: Int!
	description: String!
}

enum OwnerType{
	BISNES
	PRIVAT
}

enum DeliveryType{
	SEA
	AIR
	TRAIN
}

type Address{
	fullName:  String!
	country: Country!
	flat: String
	phone: String!
	addressGoogleString: String!
}

enum Country {
    USA,    # Stany Zjednoczone
    BY,     # Białoruś
    RU,     # Rosja
    PL,     # Polska
    CAN,    # Kanada
    IL,     # Izrael
    DE,     # Niemcy
    FR,     # Francja
    UK,     # Wielka Brytania
    JP,     # Japonia
    CN,     # Chiny
    IN,     # Indie
    AU,     # Australia
    BR,     # Brazylia
    ZA,     # Republika Południowej Afryki
    MX,     # Meksyk
    IT,     # Włochy
    ES,     # Hiszpania
    SE,     # Szwecja
    NO,     # Norwegia
    KR,     # Korea Południowa
    NL,     # Holandia
    CH,     # Szwajcaria
    AT,     # Austria
    GR,     # Grecja
    TR,     # Turcja
    SA,     # Arabia Saudyjska
    NZ,     # Nowa Zelandia
    AR,     # Argentyna
    EG,     # Egipt
    PT,     # Portugalia
    FI,     # Finlandia
    DK,     # Dania
    UA,     # Ukraina
    HU,     # Węgry
    BE,     # Belgia
    CZ,     # Czechy
    SK,     # Słowacja
    IE,     # Irlandia
    RO,     # Rumunia
    AE,     # Zjednoczone Emiraty Arabskie
    MY,     # Malezja
    SG,     # Singapur
    TH,     # Tajlandia
    VN,     # Wietnam
    PH,     # Filipiny
    IS,     # Islandia
    LI,     # Liechtenstein
    LU,     # Luksemburg
    MT,     # Malta
    MC,     # Monako
    AD,     # Andora
    AL,     # Albania
    BA,     # Bośnia i Hercegowina
    BG,     # Bułgaria
    HR,     # Chorwacja
    CY,     # Cypr
    EE,     # Estonia
    LV,     # Łotwa
    LT,     # Litwa
    MD,     # Mołdawia
    MK,     # Macedonia Północna
    RS,     # Serbia
    SI,     # Słowenia
    XK,     # Kosowo
    SM,     # San Marino
    VA,     # Watykan
    GE,     # Gruzja (chociaż jest częściowo w Azji, często związana z Europą)
    AM,     # Armenia (również częściowo w Azji, kulturowo powiązana z Europą)
}



type OrderOps{
	delete: Boolean!
	update(
		input: UpdateOrderInput
	): Boolean!
}

enum ChangePasswordWithTokenError{
	CANNOT_CHANGE_PASSWORD_FOR_USER_REGISTERED_VIA_SOCIAL
	TOKEN_IS_INVALID
	PASSWORD_IS_TOO_WEAK
}

type ChangePasswordWithTokenResponse{
	result: Boolean
	hasError: ChangePasswordWithTokenError
}

input UpdateOrderInput{
	status: OrderStatus
	from: AddressAddInput
	to: AddressAddInput
	deliveryType: DeliveryType
	ownerType: OwnerType
	totalPrice: Int
	elements: [DimensionInput!]
	fromDoor: Boolean
	toDoor: Boolean
}

enum OrderStatus{
	DRAFT
	CREATED
	"""
	Waiting  for  pay
	"""
	ACCEPTED
	"""
	Waiting for driver
	"""
	WAITING
	"""
	Driver has taken an order
	"""
	TAKEN
	"""
	If driver cancels this order 
	"""
	DENIED
	"""
	Driver left restauration and is driving to client
	"""
	DRIVING
	"""
	Order is delivered
	"""
	DELIVERED
	"""
	Restaurant cancelled this order
	"""
	CANCELLED
	NOT_DELIVERED
}

input DraftOrderInput{
	direction:  String
	from: AddressAddInput
	to: AddressAddInput
	deliveryType: DeliveryType
	ownerType: OwnerType
    paymentCurrency:   CountryCurrency
	totalPrice: Int
	elements: [DimensionInput]
	fromDoor: Boolean
	toDoor: Boolean
}

input SendOrderInput{
	direction:  String!
	from: AddressAddInput!
	to: AddressAddInput!
	deliveryType: DeliveryType!
	ownerType: OwnerType!
    paymentCurrency:   CountryCurrency!
	totalPrice: Int!
	elements: [DimensionInput!]!
	fromDoor: Boolean
	toDoor: Boolean
}

input SendOrderPublicInput{
    userEmail:  String!
	direction: String!
	from: AddressAddInput!
	to: AddressAddInput!
	deliveryType: DeliveryType!
	ownerType: OwnerType!
    paymentCurrency:   CountryCurrency!
	totalPrice: Int!
	elements: [DimensionInput!]!
	fromDoor: Boolean
	toDoor: Boolean
}

input  CreateOrderAdminInput{
	clientId: String!
	from: AddressAddInput!
	to: AddressAddInput!
	deliveryType: DeliveryType!
	ownerType: OwnerType!
    paymentCurrency:   CountryCurrency!
	totalPrice: Int!
	elements: [DimensionInput!]!
	fromDoor: Boolean
	toDoor: Boolean
}


input AddressAddInput{
    fullName:  String!
	country:  Country!
	flat: String
	phone: String!
	addressGoogleString: String!
}

scalar Timestamp

input TimestampFilter{
	Gt: Timestamp
	Gte: Timestamp
	Lt: Timestamp
	Lte: Timestamp
}

scalar AnyObject

input SortInput{
	field: SortField!
	"""
	True for ASC, false for DESC
	"""
	order: Boolean
}

enum SortField{
	CREATED_AT
	UPDATED_AT
	STATUS
    PAYMENT_CURRENCY
	DIRECTION
	DELIVERY_TYPE
	TOTAL_PRICE
}


type RegisterResponse{
	registered: Boolean
	hasError: RegisterErrors
}

enum RegisterErrors{
	USERNAME_EXISTS
	PASSWORD_WEAK
	INVITE_DOMAIN_INCORRECT
	LINK_EXPIRED
	USERNAME_INVALID
}

type VerifyEmailResponse{
	result: Boolean
	hasError: VerifyEmailError
}

enum VerifyEmailError{
	TOKEN_CANNOT_BE_FOUND
}

type LoginResponse{
	"""
	same value as accessToken, for delete in future,
	improvise, adapt, overcome, frontend!
	"""
	login: String
	accessToken: String
	refreshToken: String
	hasError: LoginErrors
}

enum LoginErrors{
	CONFIRM_EMAIL_BEFOR_LOGIN
	INVALID_LOGIN_OR_PASSWORD
	CANNOT_FIND_CONNECTED_USER
	YOU_PROVIDED_OTHER_METHOD_OF_LOGIN_ON_THIS_EMAIL
	UNEXPECTED_ERROR
}

input PeriodInput{
	to: String!
	from: String!
}

input PageOptions{
	"""
	default is 10
	"""
	limit: Int
	cursorId: String
}

input AdminOrderFilter{
	clientId: String
	searchString: String
	paymentCurrency: CountryCurrency
	
	status: [OrderStatus!]
	paid: Boolean

	direction: [String]
	
	deliveryType: DeliveryType
	ownerType: OwnerType
	fromDoor: Boolean
	toDoor: Boolean
}



input OrderFilter{
	searchString: String
	period:  PeriodInput
	paginate: PageOptions
	sort: SortOrdersInput
	status: [OrderStatus!]
	paid: Boolean	
	totalPrice: Int
}


scalar Date

input ChangePassword{
	password: String!
	newPassword: String!
}

type FileUpload{
	filename: String!
	uploadURL: String!
}

enum Platform{
	ANDROID
	WEB
	IOS
}

type Pusher{
	"""
	Authenticates user against a pusher channel
	"""
	authorization(
		socketId: String!
		channel: String!
	): PusherAuth!
	channels: PusherChannels!
}

"""
Represents pusher authentication payload
"""
type PusherAuth{
	"""
	Authenticates user against a pusher channel
	"""
	auth: String!
}

"""
Pusher channel API
"""
type PusherChannels{
	"""
	Returns an id of a channel for tenant orders
	"""
	tenantOrders(
		id: ID!
	): String
	"""
	Returns an id of a channel for driver orders
	"""
	driverOrders(
		id: ID!
	): String!
	"""
	Returns an id of a channel for driver status (online/offline)
	"""
	driverStatus(
		id: ID!
	): String!
	"""
	Returns an id of a channel for restaurant orders
	"""
	restaurantOrders(
		id: ID!
	): String!
}

input OrdersFieldFilterInput{
	name: String
	content: String
	clientId: String
	customFieldName: String
}

enum OrderPriority{
	LOW
	MID
	TOP
}

input OrdersFieldRegexFilterInput{
	name: String
	content: String
	clientId: String
	customFieldName: String
}

input SortOrdersInput{
	field: SortField!
	"""
	True for ASC, false for DESC
	"""
	order: Boolean
}

type PaginatedOrders{
	cursorId: String
	objects: [DraftOrder!]!
}

input DateFilterInput{
	"""
	Basicly filter use createdAt,
	but you can to set other field
	"""
	dateFieldName: String
	from: String
	to: String
}

enum EditUserError{
	USERNAME_ALREADY_TAKEN
	FAILED_MONGO_UPDATE
	USER_DOES_NOT_EXIST
}

type EditUserResponse{
	result: Boolean
	hasError: EditUserError
}

type ProviderLoginQuery{
	apple: ProviderResponse
	google: ProviderResponse
}

input GetOAuthInput{
	scopes: [String!]
	state: String
	redirectUri: String
}

enum ChangePasswordWhenLoggedError{
	CANNOT_CHANGE_PASSWORD_FOR_USER_REGISTERED_VIA_SOCIAL
	OLD_PASSWORD_IS_INVALID
	PASSWORD_WEAK
}

type ChangePasswordWhenLoggedResponse{
	result: Boolean
	hasError: ChangePasswordWhenLoggedError
}

enum ProviderErrors{
	CANNOT_RETRIVE_PROFILE_FROM_GOOGLE_TRY_REFRESH_TOKEN
	CANNOT_FIND_EMAIL_FOR_THIS_PROFIL
	CANNOT_RETRIVE_USER_INFORMATION_FROM_APPLE
	CODE_IS_NOT_EXIST_IN_ARGS
	CANNOT_RETRIVE_SUB_FIELD_FROM_JWT_TOKEN
	CANNOT_RETRIVE_TOKEN_FROM_MICROSOFT
}


enum SendInvitationToTeamError{
	USER_ALREADY_HAS_YOUR_INVITATION
	YOU_CANNOT_SEND_INVITATION_TO_YOURSELF
	USER_IS_NOT_OWNER_OF_THE_TEAM
	CANNOT_FIND_USER
	USERNAME_IS_TOO_AMBIGUOUS
	USER_ALREADY_EXISTS_IN_THE_TEAM
}

type SendInvitationToTeamResponse{
	result: Boolean
	hasError: SendInvitationToTeamError
}

enum JoinToTeamError{
	TEAM_INVITATION_DOES_NOT_EXIST_OR_CAPTURED
	MEMBER_ALREADY_EXISTS_IN_THE_TEAM
}

type JoinToTeamResponse{
	result: Boolean
	hasError: JoinToTeamError
}


type ProviderResponse{
	hasError: ProviderErrors
	jwt: String
	access_token: String
}

enum RemoveUserFromTeamError{
	YOU_ARE_NOT_THE_OWNER_OF_A_TEAM_OR_TEAM_DOES_NOT_EXIST
	YOU_CANNOT_KICK_YOURSELF_FROM_THE_TEAM
	USER_NOT_FOUND
}

type RemoveUserFromTeamResponse{
	result: Boolean
	hasError: RemoveUserFromTeamError
}


input RemoveUserFromTeamInput{
	userId: String!
	teamId: String!
}

schema{
	query: Query
	mutation: Mutation
}


enum CreateTeamError{
	TEAM_NOT_CREATED
	TEAM_EXISTS
}

type CreateTeamResponse{
	result: String
	hasError: CreateTeamError
}
`;

export { client, typeDefs };