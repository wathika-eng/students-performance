export class CreateUserDto {
  fullName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export class LoginUserDto {
  email: string;
  password: string;
}

export class ReturnUser {
  fullName: string;
  email: string;
  createdAt: Date;
  role: string;
}
