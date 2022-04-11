
export type RoleUser = "ADMIN" | "USER";
export type StatusUser = "ACTIVE" | "PENDING" | "INACTIVE" | "DELETED";

export interface UserCreateDto {
    email: string,
    full_name: string,
    role: RoleUser,
    password: string,
    token?: string,
    status: StatusUser;
    google_id?: string,
    github_id?: string
}

export interface UserEditDto {
    _id?: string,
    email?: string,
    full_name: string,
    role: RoleUser,
    status: StatusUser;
}

export interface UserDeleteDto {
    _id?: string,
    email?: string,
    status: 'DELETED';
}