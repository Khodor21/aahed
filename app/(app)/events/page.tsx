import TopBar from "@/components/TopBar";
import { getEvents } from "@/lib/server/eventStore";
import EventsClient from "./components/EventsClient";
import {
  buildEventView,
  groupUpcomingEvents,
  isPastEvent,
} from "./format";

const STUDENT_ID = "std-1";

export default async function EventsPage() {
  const events = await getEvents(STUDENT_ID);
  const now = new Date();

  const upcoming = events.filter((event) => !isPastEvent(event, now));
  const past = events
    .filter((event) => isPastEvent(event, now))
    .reverse()
    .map((event) => buildEventView(event, now));

  const upcomingGroups = groupUpcomingEvents(upcoming, now);
  const featured = upcoming.find((event) => !event.cancelled);
  const pendingResponses = upcomingGroups
    .flatMap((group) => group.items)
    .filter((event) => event.needsResponse);

  return (
    <main className="min-h-screen flex flex-col items-center pt-10 pb-24" dir="rtl">
      <div className="w-full max-w-sm px-4 mx-auto flex flex-col space-y-6">
        <TopBar title="الفعاليات" />

        <EventsClient
          upcomingGroups={upcomingGroups}
          pastEvents={past}
          featuredId={featured?.id ?? null}
          pendingResponses={pendingResponses}
        />
      </div>
    </main>
  );
}
