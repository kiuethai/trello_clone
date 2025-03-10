import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeaAxios'
import { API_ROOT } from '~/utils/constants'

// Khởi tạo giá trị State của một cái Sloce trong redux
const initialState = {
  currentUser: null
}
// Các hành động gọi api( bất đồng bộ) và cập nhật dữ liệu vào Redux, dùng Middleware createAsyncdThunk đi kèm với extraReducers
export const loginUserAPI = createAsyncThunk(
  'user/loginUserAPI',
  async (data) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/users/login`, data)
    // Lưu ý: axios sẽ trả kết quả về qua property của nó là data
    return response.data
  }
)

// Khởi tại một cái Slice trong kho lưu trữ - Redux Store
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // Reducers: Nơi xử lý  dữ liệu đồng bộ
  reducers: {},
  // ExtraReducer: Nơi xử lý dữ liệu bất đồng bộ
  extraReducers: (builder) => {
    builder.addCase(loginUserAPI.fulfilled, (state, action) => {
      // action.payload ở đây chính là cái responce.data trả về ở trên
      const user = action.payload
      state.currentUser = user
    })
  }
})

// Action creators are generated for each case reducer function
// export const { } = userSlice.actions

// Selectors:
export const selectCurrentUser = (state) => {
  return state.user.currentUser
}


export const userReducer = userSlice.reducer
