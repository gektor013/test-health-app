export interface User {
  userId: number
  name: string
  email: string
  phone: string
  isAdmin: boolean
  image: string
}

export interface LoginResponse extends User {
  token: string
  userId: number
}
