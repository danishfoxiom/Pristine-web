import axios from "axios";
import { API } from "./api";
import { message } from "antd";

interface AwsImageUploadResponseType {
  Location: string;
  [key: string]: any;
}

const apiClient = axios.create({
  baseURL: API.BASEURL, // your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const DOCUMENT_UPLOAD = async (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (file) {
        message.loading({
          type: "loading",
          content: "Action in progress..",
          duration: 1,
        });
        const formDataFiles = new FormData();
        formDataFiles.append("file", file);
        const fileUpload = await fetch(`${API.BASEURL}${API.FILE_UPLOAD}`, {
          method: "POST",
          body: formDataFiles,
        });
        if (fileUpload.ok) {
          const jsonResponse = await fileUpload.text();
          resolve(jsonResponse);
        } else {
          reject("Failed to upload file");
        }
      } else {
        reject("no file selected");
      }
    } catch (err) {
      reject(err);
    }
  });
};

export const COMPRESS_IMAGE = async (file: any) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${API.BASEURL}${API.IMAGE_COMPRESS}`, {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const jsonResponse: AwsImageUploadResponseType =
            await response.json();
          const obj = {
            ...jsonResponse,
            url: jsonResponse.Location,
            status: true,
          };
          resolve(obj);
        } else {
          let obj = {
            status: false,
            url: null,
          };
          reject(obj);
        }
      } else {
        reject("no file selected");
      }
    } catch (err) {
      reject(err);
    }
  });
};

export default apiClient;
