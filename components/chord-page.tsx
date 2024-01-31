"use client";
import { data } from "@/example/dumy";
import { useVideo } from "@/hooks/use-video";
import { useRef } from "react";

export const ChordPage = () => {
  const { played, autoScroll } = useVideo();
  const tolerance = 0.2;

  const highlightedRef = useRef<HTMLDivElement>(null);

  const scrollToHighlighted = () => {
    setTimeout(() => {
      if (highlightedRef.current) {
        highlightedRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 100);
  };

  return (
    <div className="my-5">
      {data.sections.map((section, index) => {
        const isActive =
          played >= section.start_time - tolerance &&
          played < section.end_time + tolerance;

        if (isActive && autoScroll) {
          scrollToHighlighted();
        }

        return (
          <div
            key={index}
            ref={isActive ? highlightedRef : null}
            className={`px-2 py-4 ${
              isActive ? "bg-violet-300/40 rounded-sm" : ""
            }`}
          >
            <div>
              <strong>{section.text_uppercase}</strong>
              {section.content.map((content, index) => (
                <p
                  key={index}
                  className={`text-nowrap whitespace-nowrap ${
                    content.margin_top ? "mt-5" : ""
                  }`}
                  dangerouslySetInnerHTML={{ __html: content.content }}
                ></p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
