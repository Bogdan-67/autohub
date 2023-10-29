import { createSlice, createAsyncThunk, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import AuthService from '../../services/AuthService';
import { AuthResponse } from '../../models/response/AuthResponse';
import axios, { AxiosResponse } from 'axios';
import { IUser } from '../../models/IUser';
import { API_URL } from '../../http';
import UserService from '../../services/UserService';
import { Status } from '../../models/Status.enum';
import { message } from 'antd';

export type LoginParams = {
  login: string;
  password: string;
};

export type Error = {
  message: string;
  errors: [];
};

export type RegistrParams = LoginParams & {
  name: string;
  surname: string;
  patronimyc: string;
  email: string;
  phone: string;
  car: string;
  recaptcha: string;
};

export type FetchUserParams = {
  id_account: number;
};

const localAuth = (local: string) => {
  if (local === 'false') return false;
  else if (local === 'true') return true;
  else return null;
};

// Функция логина
export const loginAccount = createAsyncThunk<AxiosResponse<AuthResponse>, LoginParams>(
  'user/loginStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { login, password } = params;
      const response = await AuthService.login(login, password);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Функция регистрации
export const registrAccount = createAsyncThunk<AxiosResponse<AuthResponse>, RegistrParams>(
  'user/registrStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { name, surname, patronimyc, phone, email, car, login, password, recaptcha } = params;
      const response = await AuthService.registration(
        login,
        password,
        name,
        surname,
        patronimyc,
        email,
        phone,
        car,
        recaptcha,
      );
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Функция логаута
export const logoutAccount = createAsyncThunk<void, void>('user/logoutStatus', async () => {
  try {
    await AuthService.logout();
  } catch (error) {
    console.log(error.response?.data?.message);
  }
});

// Функция проверки авторизации
export const checkAuth = createAsyncThunk<AxiosResponse<AuthResponse>, void>(
  'user/checkAuthStatus',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message);
    }
  },
);

// Функция запроса данных о пользователе
export const fetchUser = createAsyncThunk<AxiosResponse<IUser>, FetchUserParams>(
  'user/fetchUserStatus',
  async (params, { rejectWithValue }) => {
    try {
      const { id_account } = params;
      const response = await UserService.fetchUser(id_account);
      return response;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
// Функция обновления данных пользователя
export const updateUser = createAsyncThunk<
  AxiosResponse<IUser>,
  { id_user: number; userData: Partial<IUser> }
>('user/updateUserData', async (params, { rejectWithValue }) => {
  try {
    const { id_user, userData } = params;
    const response = await UserService.updateUser(id_user, userData);
    return response;
  } catch (error) {
    if (!error.response) {
      throw error;
    }
    return rejectWithValue(error.response?.data?.message);
  }
});

export interface Profile {
  user: IUser;
  status: Status;
  isAuth: boolean;
  updateUserStatus: Status;
}

const initialState: Profile = {
  user: {
    id_account: null,
    id_user: null,
    name: '',
    surname: '',
    patronimyc: '',
    email: '',
    phone: '',
    role: '',
    car: '',
    login: '',
    img: '',
  },
  status: Status.SUCCESS,
  isAuth: localStorage.isAuth ? localAuth(localStorage.isAuth) : false,
  updateUserStatus: Status.SUCCESS, // Изначально статус обновления данных пользователя установлен в SUCCESS
};
const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    setError(state) {
      state.status = Status.ERROR;
    },
    setUpdateUserStatus(state) {
      state.updateUserStatus = Status.ERROR;
    },
    setImg(state, action: PayloadAction<string>) {
      state.user.img = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Кейсы для логина
    builder.addCase(loginAccount.pending, (state) => {
      state.status = Status.LOADING;
      state.user = initialState.user;
    });
    builder.addCase(loginAccount.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      console.log('USer', state.user);
      message.success(`Рады видеть снова, ${action.payload.data.user.name}!`);
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('role', action.payload.data.user.role);
      state.isAuth = true;
      localStorage.isAuth = true;
    });
    builder.addCase(loginAccount.rejected, (state, action) => {
      alert(action.payload);
      state.status = Status.ERROR;
      state.user = initialState.user;
    });

    // Кейсы для регистрации
    builder.addCase(registrAccount.pending, (state) => {
      state.status = Status.LOADING;
      state.user = initialState.user;
    });
    builder.addCase(registrAccount.fulfilled, (state, action) => {
      state.user = action.payload.data.user;
      message.success(`Добро пожаловать, ${action.payload.data.user.name}!`);
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('role', action.payload.data.user.role);
      state.isAuth = true;
      localStorage.isAuth = true;
    });
    builder.addCase(registrAccount.rejected, (state, action) => {
      alert(action.payload);
      state.status = Status.ERROR;
      state.user = initialState.user;
    });

    // Кейсы для логаута
    builder.addCase(logoutAccount.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(logoutAccount.fulfilled, (state) => {
      state.status = Status.SUCCESS;
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      state.isAuth = false;
      localStorage.isAuth = false;
      state.user = initialState.user;
    });
    builder.addCase(logoutAccount.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Кейсы для обновления данных пользователя
    builder.addCase(updateUser.pending, (state) => {
      state.updateUserStatus = Status.LOADING;
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserStatus = Status.SUCCESS;
      state.user = action.payload.data;
      localStorage.setItem('role', action.payload.data.role);
    });

    builder.addCase(updateUser.rejected, (state) => {
      state.updateUserStatus = Status.ERROR; // Устанавливаем статус ERROR при ошибке при обновлении данных пользователя
    });

    // Кейсы для проверки авторизации
    builder.addCase(checkAuth.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      localStorage.setItem('token', action.payload.data.accessToken);
      localStorage.setItem('role', action.payload.data.user.role);
      state.isAuth = true;
      localStorage.isAuth = true;
      state.user = action.payload.data.user;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.status = Status.ERROR;
    });

    // Кейсы для запроса данных о пользователе
    builder.addCase(fetchUser.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = Status.SUCCESS;
      state.user = action.payload.data;
      localStorage.setItem('role', action.payload.data.role);
    });
    builder.addCase(fetchUser.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setUser, setError, setUpdateUserStatus, setImg } = authSlice.actions;
export const SelectProfile = (state: RootState) => state.auth;
export const SelectAuthStatus = (state: RootState) => state.auth.status;
export const SelectIsAuth = (state: RootState) => state.auth.isAuth;
export const SelectUser = (state: RootState) => state.auth.user;
export const SelectUserRole = (state: RootState) => state.auth.user.role;
export const SelectAccountID = (state: RootState) => state.auth.user.id_account;
export const SelectUserID = (state: RootState) => state.auth.user.id_user;

export default authSlice.reducer;
