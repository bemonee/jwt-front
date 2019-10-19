export class User {
    id: number;
    username: string;
    password: string;
    token?: string;
    credentialsNonExpired?: boolean;
    accountNonExpired?: boolean;
    accountNonLocked?: boolean;
    enabled?: boolean;
    authorities?: Authority[];
}

export interface Authority {
  authority: string;
}