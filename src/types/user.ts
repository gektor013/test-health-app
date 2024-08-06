export interface User {
  userId: number
  name: string
  email: string
  phone: string
  isAdmin: boolean
}

export interface LoginResponse extends User {
  token: string
}
