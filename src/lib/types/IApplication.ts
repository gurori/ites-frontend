import type { Competition } from "./Competition";
import type { Order } from "./Order";
import type { User } from "./User";

export interface CompetitionEntry {
  id: string;
  fromMember: User;
  forCompetition: Omit<Competition, "organizersIds" | "membersIds">;
}

export interface OrderBid {
  id: string;
  fromMember: User;
  forOrder: Omit<Order, "memberId" | "clientId">;
}

export interface TeamJoinRequest {
  id: string;
  fromMember: User;
}

export type CompetitionEntryProps = {
  entry: CompetitionEntry;
};

export type CompetitionEntriesProps = {
  entries: CompetitionEntry[];
};

export type OrderBidProps = {
  bid: OrderBid;
};

export type OrderBidsProps = {
  bids: OrderBid[];
};

export type TeamJoinRequestProps = {
  teamJoinRequest: TeamJoinRequest;
};

export type TeamJoinRequestsProps = {
  teamJoinRequests: TeamJoinRequest[];
};
