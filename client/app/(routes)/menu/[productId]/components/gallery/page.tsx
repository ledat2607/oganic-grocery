'use client'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import GalleryContent from "./gallery-content";
import GalleryTab from "./gallery-tab";

interface GalleryProps {
  image: { url: string }[];
}

const Gallery = ({ image }: GalleryProps) => {
  return (
    <div className="flex flex-col gap-6 w-full">

      <Tabs defaultValue={image[0].url} className="w-full space-y-6">

        {/* Main Preview */}
        {image.map((tab) => (
          <TabsContent
            key={tab.url}
            value={tab.url.toString()}
            className="flex items-center justify-center"
          >
            <div
              className="w-full max-w-xl aspect-square rounded-2xl overflow-hidden 
              bg-gradient-to-br from-white to-neutral-100 shadow-xl 
              border border-neutral-200 hover:shadow-2xl transition-all duration-300 group"
            >
              <GalleryContent url={tab.url} />
            </div>
          </TabsContent>
        ))}

        {/* Thumbnails */}
        <TabsList
          className="
            flex gap-4 w-full overflow-x-auto no-scrollbar 
            bg-transparent p-1
          "
        >
          {image.map((tab) => (
            <TabsTrigger
              key={tab.url}
              value={tab.url.toString()}
              className="
                p-0 bg-transparent rounded-xl overflow-hidden transition-all 
                data-[state=active]:border-2 data-[state=active]:border-green-500 
                data-[state=active]:shadow-[0_0_10px_rgba(16,185,129,0.4)]
              "
            >
              <div
                className="
                  w-20 h-20 rounded-xl overflow-hidden border border-neutral-200 
                  hover:scale-105 hover:shadow-lg transition-all duration-200 bg-white
                "
              >
                <GalleryTab url={tab.url} />
              </div>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Gallery;
