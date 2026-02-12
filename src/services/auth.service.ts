import { User } from "@/models/User";
import { LoginDTO, RegisterDTO } from "@/types/auth.types";
import { generateToken } from "@/utils/generateToken";
import bcrypt from "bcryptjs";

//* Register a new user */
export const registerUser = async (data: RegisterDTO) => {
  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("USER_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || "patient",
  });
  const user = User.findById(newUser._id).select("-password");

  return user;
};

///* Login user and generate token */
export const login = async (data: LoginDTO) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (!user.isActive) {
    throw new Error("USER_INACTIVE");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const token = await generateToken({
    _id: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  });

  return token;
};
