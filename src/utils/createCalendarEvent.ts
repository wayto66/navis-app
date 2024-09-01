import { EventStatus, type TEvent } from "~/types/DatabseModels";

export const eventColorMap = new Map<EventStatus, string>([
  [EventStatus.THEME_APPROVAL, "bg-gray-700"],
  [EventStatus.IN_PRODUCTION, "bg-pink-500"],
  [EventStatus.UNDER_CHANGE, "bg-orange-500"],
  [EventStatus.CREATIVE_APPROVAL, "bg-purple-500"],
  [EventStatus.AWAITING_CLIENT, "bg-yellow-600"],
  [EventStatus.PROGRAMED, "bg-blue-600"],
  [EventStatus.PUBLISHED, "bg-green-600"],
  [EventStatus.CANCELED, "bg-red"],
]);

const createCalendarEvent = (event: TEvent) => {
  const color = eventColorMap.get(event.status) ?? "bg-gray-500";

  return {
    title: event.title,
    date: new Date(event.targetDate).toISOString().split("T")[0],
    extendedProps: {
      companyId: event.companyId,
      creatorId: event.creatorId,
      clientId: event.clientId,
      title: event.title,
      copy: event.copy,
      briefing: event.briefing,
      link: event.link,
      targetDate: event.targetDate,
      status: event.status,
      id: event.id,
    },
    id: event.id.toString(),
    classNames: [
      color,
      "hover:scale-[0.97]",
      "transition",
      "p-1",
      "cursor-pointer",
      "text-red",
      "text-green-300",
    ],
  };
};

export default createCalendarEvent;
