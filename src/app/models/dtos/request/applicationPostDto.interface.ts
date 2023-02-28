import { Claim } from '../../claim.interface';

export interface ApplicationPostDto {
  id: number;
  applicationName: string;
  applicationSecret: string;
  applicationUri: string;
  applicationClaims: Claim[];
}
