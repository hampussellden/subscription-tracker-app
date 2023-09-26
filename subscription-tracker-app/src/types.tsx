export type Interval_periods =
  | "monthly"
  | "quarterly"
  | "semi-annual"
  | "annual";
// export const enum Interval_periods {
//   monthly = "monthly",
//   quarterly = "quarterly",
//   semiAnnual = "semi-annual",
//   annual = "annual",
// }
export type SubscriptionTier = {
  id: number;
  name: string;
  price: number;
  service_id: number;
  interval_period: Interval_periods;
};
export type Service = {
  id: number;
  name: string;
  icon: string | null;
  color: string | null;
  banner: string | null;
  category_id: number | null;
  subscription_tiers?: SubscriptionTier[];
  categories: Category;
};
export type Category = {
  id: number;
  name: string | null;
};
export type Subscription = {
  id: number;
  user_id: number;
  service_id: number;
  subscription_tier_id: number;
  renewal_date: string;
  active: boolean;
  created_at: string;
  services: Service;
  subscription_tiers: SubscriptionTier;
  users: User;
};
export type User = {
  id: number;
  name: string;
  profile_id: string;
  created_at: string;
  avatar_url: string;
};
