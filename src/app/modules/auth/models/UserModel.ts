export interface UserModel {
  avatar?: string;
  id: number
  email: string
  firstname: string
  lastname: string
  type: string
  customer?: CustomerModel
}

export interface CustomerModel {
  id?: number
  email?: string
  firstname?: string
  lastname?: string
  type?: string
  title?: string
  companyName: string
  companyId?: string
  customerId: string
  status?: string
  workPhone?: string
  workCellPhone?: string
  fax?: string
  otherPhone?: string
}
