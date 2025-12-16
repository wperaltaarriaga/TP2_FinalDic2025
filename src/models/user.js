import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
	{
		username: {
			type: String,
			maxlength: 100,
			required: true,
		},
		password: {
			type: String,
			required: true,
		}
	},
	{
		collection: "users",
		versionKey: false,
		timestamps: true,
	},
);

export const UserModel = mongoose.model("User", userSchema);
