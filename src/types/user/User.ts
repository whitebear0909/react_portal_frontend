export interface UserModel {
  id: number
  avatar: string
  email: string
  firstname: string
  lastname: string
  type: string
  level?: string
  companyName?: string
  companyId?: string
  customerId?: string
  status?: string
  workPhone?: string
  workCell?: string
  fax?: string
  other?: string
  primaryPhone?: string
  title?: string
  activatedAt?: Date
  createdAt?: Date
}

export type CustomersProps = {
  customers: UserModel[]
}

export type NBSAdminsTableProps = {
  data: UserModel[]
}

export interface CustomerID {
  customerId: string
  companyName: string
  value: string
}

export type InvitedCustomersProps = {
  customers: UserModel[]
  admin: boolean
}
