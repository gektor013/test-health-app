export interface User {
  userId: number
  name: string
  email: string
  phone: string
  isAdmin: boolean
  image: string
  birthdate?: string | Date
  sex: string
}

export interface LoginResponse extends User {
  token: string
  userId: number
}
