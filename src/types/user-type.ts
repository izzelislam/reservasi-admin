export type UserType = {
  id:                number;
  name:              string;
  email:             string;
  phone:             string;
  email_verified_at?: string;
  role:              string;
  photo:             null;
  afiliator_code?:    string;
  created_at:        Date;
  updated_at:        Date;
  photo_url?:         string;
}