import { useState } from "react";
import { CategoryItems } from "./components/CategoryItems";
import { categories, videos } from "./data/home";
import { PageHeader } from "./layouts/PageHeader";
import { VideoItem } from "./components/VideoItem";
import { Sidebar } from "./layouts/Sidebar";

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  return (
    <div className="max-h-screen flex flex-col ">
      <PageHeader />
      <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
        <Sidebar />
        <div className="overflow-x-hidden px-8 pb-4">
          <div className="sticky top-0 bg-white z-10 pb-4">
            <CategoryItems
              categories={categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
          <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))] ">
            {videos.map((video) => (
              <VideoItem key={video.id} {...video} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
