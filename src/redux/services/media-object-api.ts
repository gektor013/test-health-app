import * as FileSystem from "expo-file-system"

import { API_URL } from "@/constants/enviroments"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

import { setUploadStatus } from "../features"

import { appApi } from "./app-api"

export const mediaObjectsApi = appApi.injectEndpoints({
  endpoints: (builder) => ({
    postMediaObject: builder.mutation<FileSystem.FileSystemUploadResult, string>({
      queryFn: async (param, api) => {
        try {
          const uploadTask = await FileSystem.createUploadTask(
            API_URL + "/api/public/media_objects",
            param,

            {
              fieldName: "file",
              httpMethod: "POST",
              uploadType: FileSystem.FileSystemUploadType.MULTIPART,
              headers: {
                Accept: "application/json"
              }
            },
            ({ totalBytesSent, totalBytesExpectedToSend }) => {
              const progress = parseFloat(
                (totalBytesSent / (totalBytesExpectedToSend || 1)).toFixed(2)
              )

              api.dispatch(setUploadStatus({ uploadStatus: progress, uri: param }))
            }
          )

          const response = await uploadTask.uploadAsync()

          if (response?.status === 201) {
            return { data: response }
          } else {
            return {
              error: {
                status: response?.status,
                data: response?.body
              } as FetchBaseQueryError
            }
          }
        } catch (error) {
          return { error: error, uri: param } as {
            error: FetchBaseQueryError
            uri: string
          }
        }
      }
    })
  })
})

export const { usePostMediaObjectMutation } = mediaObjectsApi
