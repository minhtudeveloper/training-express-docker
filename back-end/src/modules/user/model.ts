import bcrypt from "bcrypt";
// import crypto from "crypto";
import mongoose from "mongoose";

type RoleUser = "ADMIN" | "USER";

export type UserDocument = mongoose.Document & {
  email: string;
  password: string;
  full_name: string;
  role: RoleUser;
};

const userSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true },
    password: String,
    full_name: String,
    role: String,
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

export const User = mongoose.model<UserDocument>("users", userSchema);
