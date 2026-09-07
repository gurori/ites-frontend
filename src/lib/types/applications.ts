import type { Competition } from "./Competition";
import type { Order } from "./Order";
import type { User } from "./User";
import type { WithId } from "./WithId";

export type CompetitionEntry = WithId<{
  fromMember: User;
  forCompetition: Omit<Competition, "organizersIds" | "membersIds">;
}>;

export type OrderBid = WithId<{
  fromMember: User;
  forOrder: Omit<Order, "memberId" | "clientId">;
}>;

export type TeamJoinRequest = WithId<{
  fromMember: User;
}>;

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
