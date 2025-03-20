import { ReactNode } from "react";

interface TimelineItem {
  date: string;
  title: string;
  description: string | ReactNode;
}

export default function TimelineItem({ date, title, description }: TimelineItem) {
  return (
    <li className="mb-4 ms-4">
      <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
      <time className="mb-1 text-sm font-normal leading-none ">
        <b className="font-bold">
          {date}
        </b>
      </time>
      <h3 className="font-bold">
        {title}
      </h3>
      <ul>
        <li>
          {description}
        </li>
      </ul>
    </li>
  )
}