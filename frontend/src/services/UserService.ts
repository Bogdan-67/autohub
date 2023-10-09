import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../models/IUser';

export default class UserService {
  static fetchUser(id_account: number): Promise<AxiosResponse<IUser>> {
    return $api.get<IUser>('/user/' + id_account);
  }

  static updateUser(id_user: number, userData: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return $api.put<IUser>('/user/' + id_user, userData);
  }

  static updateUserPhoto(data: FormData): Promise<AxiosResponse<string>> {
    return $api.put<string>('/photo', data);
  }

  static deleteUserPhoto(id: number): Promise<AxiosResponse<string>> {
    return $api.delete<string>(`/photo/${id}`);
  }

  static deleteUser(id: number): Promise<AxiosResponse<IUser>> {
    return $api.delete<IUser>(`/user/${id}`);
  }
}
