import bcrypt from "bcrypt";
// import crypto from "crypto";
import mongoose from "mongoose";
import Joi from "joi";
import { join } from "path";

type RoleUser = "ADMIN" | "USER";
export type StatusUser = "ACTIVE" | "PENDING" | "INACTIVE";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  full_name: string;
  role: RoleUser;
  token: string;
  status: StatusUser;
  comparePassword: comparePasswordFunction;
};

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true },
    password: { type: String, minLength: 8 },
    full_name: String,
    role: String,
    token: String,
  },
  { timestamps: true },
);

userSchema.pre("updateOne", function save(next) {
  const user: any = this as UserDocument;
  hashPasswordUpdate(next, user);
});

userSchema.pre("save", function save(next) {
  const user = this as UserDocument;
  hashPasswordCreate(next, user);
});

const hashPasswordCreate = (next: any, user: any) => {
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err: any, salt: any) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err: any, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
};

const hashPasswordUpdate = (next: any, user: any) => {
  if (!user._update.password) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user._update.password, salt, (err: any, hash) => {
      if (err) {
        return next(err);
      }
      user._update.password = hash;
      next();
    });
  });
};

// Validate
// export function validateChangePass(data: any) {
//   const schema = {
//     password: Joi.string().min(8),
//   };
//   return Joi.valid(data, schema);
// }

export const validateChangePass : any = Joi.object({
  password: Joi.string().min(8),
});

type comparePasswordFunction = (
  password: string,
  candidatePassword: string,
) => boolean;

const comparePassword: comparePasswordFunction = function (
  password,
  candidatePassword,
) {
  return bcrypt.compareSync(password, candidatePassword);
};

userSchema.methods.comparePassword = comparePassword;

export const User = mongoose.model<UserDocument>("users", userSchema);
