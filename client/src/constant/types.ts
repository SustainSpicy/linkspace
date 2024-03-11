export interface alertProps {
  show?: boolean;
  text: string;
  type: string;
}

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

type header = string;
type social = string;
export interface LinkProps {
  _id: String;
  title: string;
  url: string;
  img: string;
  type: header | social;
  display: Boolean;
}
export interface onboardingProps {
  valid: boolean;
  todo: string[];
}
export interface ProfileProps {
  email: string;
  fullName: string;
  username: string;
  isFirstLogin: boolean;
  isOnboarding: onboardingProps;
  links: LinkProps[];
  dob: string;
  createdAt: string;
  updatedAt: string;
}

export interface isOnboarding {
  valid: boolean;
  todo: string[];
}

export interface Links {
  title: string;
  url: string;
  img: string;
  type: "header" | "social";
}
[];
