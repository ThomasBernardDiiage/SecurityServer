import { TokenDto } from "./TokenDto.interface"

export interface AuthenticationResponseBaseDto {
  token : AuthenticationResponseDto
  message : string
  success : boolean
}

export interface AuthenticationResponseDto extends TokenDto{

  refreshToken : TokenDto
}
