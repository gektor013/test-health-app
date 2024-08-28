export interface User {
  userId: number
  name: string
  email: string
  phone: string
  isAdmin: boolean
  image: string
  birthdate?: string | Date
  sex: "Male" | "Female"
}

export interface LoginResponse extends User {
  token: string
  id?: number
  documents?: {
    contentUrl: string
    id: number
  }[]
}
