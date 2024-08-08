import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
  file: {
    uploadStatus: number
    uri: string
  }
}

const initialState: AuthState = {
  file: {
    uploadStatus: 0,
    uri: ""
  }
}

export const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setUploadStatus: (
      state,
      { payload }: PayloadAction<{ uploadStatus: number; uri: string }>
    ) => {
      state.file.uploadStatus = payload.uploadStatus * 100
      state.file.uri = payload.uri
    }
  }
})

export const { setUploadStatus } = mediaSlice.actions

export default mediaSlice.reducer
