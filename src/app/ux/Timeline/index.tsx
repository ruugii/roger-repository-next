import { ReactNode } from "react";
import TimelineItem from "../TimelineItem";

interface TimelineProps {
  items: TimelineItem[];
}

interface TimelineItem {
  date: string;
  title: string;
  description: string | ReactNode;
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <ol className="timeline-list">
      {items.map((item, index) => (
        <TimelineItem
          key={index}
          date={item.date}
          title={item.title}
          description={item.description}
        />
      ))}
    </ol>
  )
}
