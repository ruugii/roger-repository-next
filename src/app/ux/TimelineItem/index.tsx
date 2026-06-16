import { ReactNode } from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string | ReactNode;
}

export default function TimelineItem({ date, title, description }: TimelineItem) {
  return (
    <li className="timeline-item">
      <time className="timeline-date">
        <b>
          {date}
        </b>
      </time>
      <h3 className="timeline-title font-bold">
        {title}
      </h3>
      <div className="timeline-description">{description}</div>
    </li>
  )
}
