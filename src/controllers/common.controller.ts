import { successResponse } from "@/utils/responses";
import crypto from "crypto";

//* Controller for cloudnary signed credential *//
export const cloudnaryCredentialsController = async () => {
  const timestamp = Math.floor(Date.now() / 1000);

  const paramsToSign = `folder=departments&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

  const signature = crypto
    .createHash("sha1")
    .update(paramsToSign)
    .digest("hex");

  return successResponse(
    {
      timestamp,
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      folder: "departments",
    },
    "success",
    200,
  );
};
