export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      notification_types: {
        Row: {
          created_at: string;
          id: number;
          name: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          name?: string | null;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          active: boolean | null;
          created_at: string;
          id: number;
          notification_type_id: number | null;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string;
          id?: number;
          notification_type_id?: number | null;
        };
        Update: {
          active?: boolean | null;
          created_at?: string;
          id?: number;
          notification_type_id?: number | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          full_name: string | null;
          global_notifications_on: boolean | null;
          id: string;
          pin_code: string | null;
          tos_accepted: boolean | null;
          updated_at: string | null;
          username: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          full_name?: string | null;
          global_notifications_on?: boolean | null;
          id: string;
          pin_code?: string | null;
          tos_accepted?: boolean | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          full_name?: string | null;
          global_notifications_on?: boolean | null;
          id?: string;
          pin_code?: string | null;
          tos_accepted?: boolean | null;
          updated_at?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      services: {
        Row: {
          banner: string | null;
          category_id: number | null;
          color: string | null;
          created_at: string;
          icon: string | null;
          id: number;
          name: string | null;
        };
        Insert: {
          banner?: string | null;
          category_id?: number | null;
          color?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string | null;
        };
        Update: {
          banner?: string | null;
          category_id?: number | null;
          color?: string | null;
          created_at?: string;
          icon?: string | null;
          id?: number;
          name?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "services_category_id_fkey";
            columns: ["category_id"];
            referencedRelation: "categories";
            referencedColumns: ["id"];
          }
        ];
      };
      subscription_tiers: {
        Row: {
          created_at: string;
          id: number;
          interval_period: Database["public"]["Enums"]["interval_days"] | null;
          name: string | null;
          price: number | null;
          service_id: number | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          interval_period?: Database["public"]["Enums"]["interval_days"] | null;
          name?: string | null;
          price?: number | null;
          service_id?: number | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          interval_period?: Database["public"]["Enums"]["interval_days"] | null;
          name?: string | null;
          price?: number | null;
          service_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "subscription_tiers_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "services";
            referencedColumns: ["id"];
          }
        ];
      };
      subscriptions: {
        Row: {
          active: boolean | null;
          created_at: string;
          id: number;
          renewal_date: string | null;
          service_id: number | null;
          subscription_tier_id: number | null;
          user_id: number | null;
        };
        Insert: {
          active?: boolean | null;
          created_at?: string;
          id?: number;
          renewal_date?: string | null;
          service_id?: number | null;
          subscription_tier_id?: number | null;
          user_id?: number | null;
        };
        Update: {
          active?: boolean | null;
          created_at?: string;
          id?: number;
          renewal_date?: string | null;
          service_id?: number | null;
          subscription_tier_id?: number | null;
          user_id?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_service_id_fkey";
            columns: ["service_id"];
            referencedRelation: "services";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_subscription_tier_id_fkey";
            columns: ["subscription_tier_id"];
            referencedRelation: "subscription_tiers";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "subscriptions_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      users: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: number;
          name: string | null;
          profile_id: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          profile_id?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: number;
          name?: string | null;
          profile_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "users_profile_id_fkey";
            columns: ["profile_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      interval_days: "monthly" | "quarterly" | "semi-annual" | "annual";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
