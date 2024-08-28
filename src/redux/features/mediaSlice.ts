import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface MediaState {
  file: {
    uploadStatus: number
    uri: string
  }
  uploadCountFiles: number
}

const initialState: MediaState = {
  file: {
    uploadStatus: 0,
    uri: ""
  },
  uploadCountFiles: 0
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
    },

    setUploadCountFiles: (state, { payload }: PayloadAction<number>) => {
      state.uploadCountFiles = payload
    }
  }
})

export const { setUploadStatus, setUploadCountFiles } = mediaSlice.actions

export default mediaSlice.reducer
