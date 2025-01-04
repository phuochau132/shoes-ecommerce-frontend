import { UserType } from '../user';

export type ReviewType = {
  id: number;
  user: UserType;
  title: string;
  text: string;
  content: string;
  rating: number;
  created_at: string;
};
