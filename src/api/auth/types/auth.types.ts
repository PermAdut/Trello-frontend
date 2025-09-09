export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterCredentials {
  username: string
  firstName: string
  email: string
  password: string
  repeatedPassword: string
}

export interface AuthResponse {
  username: string
  accessToken: string
}
