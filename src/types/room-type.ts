export type RoomType = {
  id:           string;
  name:         string;
  slug:         string;
  capacity?:     number;
  description?:  string;
  info?:         string;
  price:        number;
  location_url?: string;
  status:       string;
  created_at:   Date;
  updated_at:   Date;
}