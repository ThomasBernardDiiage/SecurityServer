import { Claim } from "./claim.interface";

export interface Application {
    id: number
    name: string
    secret: string
    claims : Claim[]
  }
