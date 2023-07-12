export interface SignUpVariables {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignUpData {
  signUp: {
    token: string;
  };
}

export interface SignInVariables {
  email: string;
  password: string;
}

export interface SignInData {
  signIn: {
    token: string;
  };
}

export interface MeData {
  me: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}
