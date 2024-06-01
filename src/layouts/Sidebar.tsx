import { Clapperboard, Home, Library, Repeat } from "lucide-react";
import { ElementType } from "react";
import { buttonStyles } from "../components/Button";
import { twMerge } from "tailwind-merge";

export function Sidebar() {
  return (
    <>
      <aside className="sticky top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col ml-1 lg:hidden">
        <NarrowSidebarItem Icon={Home} title="Home" url="/" />
        <NarrowSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <NarrowSidebarItem
          Icon={Clapperboard}
          title="Suscriptions"
          url="/suscriptions"
        />
        <NarrowSidebarItem Icon={Library} title="Library" url="/library" />
      </aside>
      <aside className="w-56 lg:sticky absolute top-0 overflow-y-auto scrollbar-hidden pb-4 flex flex-col gap-2 px-2 ">
        <ExtendedSidebarSection>
          <ExtendedSidebarItem isActive Icon={Home} title="Home" url="/" />
        </ExtendedSidebarSection>
      </aside>
    </>
  );
}

type NarrowSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function NarrowSidebarItem({ Icon, title, url }: NarrowSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyles({ variant: "ghost" }),
        "py-4 px-1 flex flex-col items-center rounded-lg gap-1"
      )}
    >
      <Icon className="w-6 h-6" />
      <div className="text-sm">{title}</div>
    </a>
  );
}

type ExtendedSidebarItem = {
  Icon: ElementType;
  title: string;
  url: string;
  isActive?: boolean;
};

function ExtendedSidebarSection() {
    
}
function ExtendedSidebarItem({
  Icon,
  title,
  url,
  isActive = false,
}: ExtendedSidebarItem) {
  return <a href={url}></a>;
}
