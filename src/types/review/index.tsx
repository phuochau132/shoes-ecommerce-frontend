import { UserType } from '../user';

export type ReviewType = {
  author: UserType;
  title: string;
  text: string;
  rating: number;
  createAt: Date;
};
