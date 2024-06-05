import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  GamepadIcon,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music,
  Newspaper,
  PlaySquare,
  Radar,
  Repeat,
  Shirt,
  Trophy,
} from "lucide-react";
import { Children, ElementType, ReactNode, useState } from "react";
import { Button, buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../data/sidebar";
import { useSidebarContext } from "../contexts/SidebarContext";
import { PageHeaderTop } from "./PageHeader";

export function Sidebar() {
  const { isLargeOpen, isSmallOpen, close } = useSidebarContext();

  return (
    <>
      <aside
        className={`sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <NarrowSidebarItem IconOrImgUrl={Home} title="Home" url="/" />
        <NarrowSidebarItem IconOrImgUrl={Repeat} title="Shorts" url="/shorts" />
        <NarrowSidebarItem
          IconOrImgUrl={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
        <NarrowSidebarItem
          IconOrImgUrl={Library}
          title="Library"
          url="/library"
        />
      </aside>
      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[9999] bg-secondary-dark opacity-50"
        />
      )}
      <aside
        className={`w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4  flex-col gap-2 px-2  ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[9999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white ">
          <PageHeaderTop />
        </div>
        <ExtendedSidebarSection>
          <ExtendedSidebarItem
            isActive
            IconOrImgUrl={Home}
            title="Home"
            url="/"
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </ExtendedSidebarSection>
        <hr />
        <ExtendedSidebarSection visibleItemCount={5}>
          <ExtendedSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <ExtendedSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <ExtendedSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <ExtendedSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            ></ExtendedSidebarItem>
          ))}
        </ExtendedSidebarSection>
        <hr />
        <ExtendedSidebarSection visibleItemCount={7} title="Subscriptions">
          {subscriptions.map((subscription) => (
            <ExtendedSidebarItem
              key={subscription.id}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </ExtendedSidebarSection>
        <hr />
        <ExtendedSidebarSection title="Explore">
          <ExtendedSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url={`/trending`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Music}
            title="Music"
            url={`/music`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Film}
            title="Movies"
            url={`/movies`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Radar}
            title="Live"
            url={`/live`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={GamepadIcon}
            title="Gaming"
            url={`/gaming`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Newspaper}
            title="News"
            url={`/news`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url={`/sports`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url={`/learning`}
          />
          <ExtendedSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url={`/fashion-beauty`}
          />
        </ExtendedSidebarSection>
      </aside>
    </>
  );
}

type NarrowSidebarItemProps = {
  IconOrImgUrl: ElementType;
  title: string;
  url: string;
};

function NarrowSidebarItem({
  IconOrImgUrl,
  title,
  url,
}: NarrowSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <IconOrImgUrl className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type ExtendedSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

type ExtendedSidebarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function ExtendedSidebarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: ExtendedSidebarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandButton = childrenArray.length > visibleItemCount;
  const visibleChildren = isExpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  const ButtonIconOrImgUrl = isExpanded ? ChevronUp : ChevronDown;
  return (
    <div>
      {title && <div className="ml-4 mt-2 text-lg mb-1">{title}</div>}
      {visibleChildren}
      {showExpandButton && (
        <Button
          variant={"ghost"}
          className="w-full flex items-center rounded-lg gap-4 p-3"
          onClick={() => {
            setIsExpanded((e) => !e);
          }}
        >
          <ButtonIconOrImgUrl className="w-6 h-6" />
          <div> {isExpanded ? "Show Less" : "Show More"}</div>
        </Button>
      )}
    </div>
  );
}
function ExtendedSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: ExtendedSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100 hover:bg-secondary" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} alt={title} className="w-6 h-6 rounded-full" />
      ) : (
        <IconOrImgUrl className="w-6 h-6"></IconOrImgUrl>
      )}
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </div>
    </a>
  );
}
