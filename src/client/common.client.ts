import { apiRequest } from "@/lib/apiClient";
import { CloudnarySignatureResponse } from "@/types/apiResponse.types";

export const cloudnaryUploader = async () => {
  return apiRequest<CloudnarySignatureResponse>("get", "/cloudinary-signature");
};

export const uploadDepartmentIamgeToCloudnary = async (
  file: File,
  signedRes: CloudnarySignatureResponse,
) => {
  const { apiKey, cloudName, signature, timestamp, folder } = signedRes;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", String(timestamp));
  formData.append("signature", signature);
  formData.append("folder", folder);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) throw new Error("Upload failed");

  return {
    secureUrl: data.secure_url,
    publicId: data.public_id,
  };
};
