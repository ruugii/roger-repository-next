import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";
import { useTranslations } from "next-intl";

export default function Studies() {

  const t = useTranslations('studies');

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="studies">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>
      <Timeline sx={{ width: "100%" }}>
        <TimelineItem sx={{ display: "none" }}>
          <TimelineOppositeContent></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2024')} - {t('year.current')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.lasalleonline')}
            </b>
            <ul>
              <li>
                {t('degree.DAM')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2021')} - {t('year.2024')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.lasallegracia')}
            </b>
            <ul>
              <li>
                {t('degree.DAW')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2018')} - {t('year.2021')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.eugeni')}
            </b>
            <ul>
              <li>
                {t('degree.SMX')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2023')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.lucatic')}
            </b>
            <ul>
              <li>
                {t('degree.InTalent')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2022')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.udemy')}
            </b>
            <ul>
              <li>
                {t('degree.Solidity')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2021')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.CET')}
            </b>
            <ul>
              <li>
                {t('degree.Diamizer')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2020')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.CET')}
            </b>
            <ul>
              <li>
                {t('degree.monitor')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem sx={{ minHeight: "80px" }}>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2018')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot sx={{ width: "12px", height: "12px" }} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('school.CISCO')}
            </b>
            <ul>
              <li>
                {t('degree.CCNA')}
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>
  )
}