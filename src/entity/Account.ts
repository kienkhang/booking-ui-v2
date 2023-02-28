interface Account {
  id: String
  email: String
  created_at: String
  updated_at: String
  'user-key-firebase': String
  profile_id: String
  customer: {
    id: String
    customer_id: String
    passport_data: String
    email: String
    first_name: String
    last_name: String
    full_name: String
    phone: String
    gender: Boolean
    identifier_number: String
    dob: String
    address: String
    created_at: String
    updated_at: String
  }
  token: {
    access_token: String
    refresh_token: String
    expired_time: 1675779094
  }
  avatar: String
  allow_notification: Boolean
  allow_send_email: Boolean
  status_account_id: Number
  status_account: {
    id: Number
    status_code: String
    status_name: String
    description: String
  }
}
export default Account
