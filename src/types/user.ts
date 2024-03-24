import { getInterns } from "@/services/intern";
import { Interest, Prisma, Tag, User } from "@prisma/client";

export interface UserCreatedEvent {
  data: UserCreatedPayload;
  object: string;
  type: string;
}

export interface UserCreatedPayload {
  birthday: string;
  created_at: number;
  email_addresses: EmailAddress[];
  external_accounts: any[];
  external_id: string;
  first_name: string;
  gender: string;
  id: string;
  image_url: string;
  last_name: string;
  last_sign_in_at: number;
  object: string;
  password_enabled: boolean;
  phone_numbers: any[];
  primary_email_address_id: string;
  primary_phone_number_id: any;
  primary_web3_wallet_id: any;
  profile_image_url: string;
  two_factor_enabled: boolean;
  updated_at: number;
  username: any;
  web3_wallets: any[];
}

export interface EmailAddress {
  email_address: string;
  id: string;
  linked_to: any[];
  object: string;
}

export type InternItem = Prisma.PromiseReturnType<typeof getInterns>[number];

export type GetInternsResponse = {
  interns: InternItem[];
  total: number;
};

export type GetInternsRequest = {
  page: number;
  limit: number;
  tagIds?: string[];
  interestIds?: string[];
} & Prisma.UserFindManyArgs;
