import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User;

@Schema({
  versionKey: false,
})
export class User {
  @Prop({
    required: true,
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: String,
  })
  username: string;

  @Prop({
    required: true,
    type: String,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
