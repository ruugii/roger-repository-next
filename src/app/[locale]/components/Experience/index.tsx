import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, timelineOppositeContentClasses, TimelineSeparator } from "@mui/lab";
import { useTranslations } from "next-intl";

export default function Experience() {

  const t = useTranslations('experience');

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="experience">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },
        }}
      >
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2025')} - {t('year.2023')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('enterprice.ntt.title')}
            </b>
            <ul>
              <li>
                {t('enterprice.ntt.position')}
              </li>
              {t.rich('enterprice.ntt.description', {
                ul: (chunks) => (
                  <ul>
                    {chunks}
                  </ul>
                ),
                li: (chunks) => (
                  <li>
                    {chunks}
                  </li>
                )
              })}
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2023')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('enterprice.nsign.title')}
            </b>
            <ul>
              <li>
                {t('enterprice.nsign.position')}
              </li>
              {t.rich('enterprice.nsign.description', {
                ul: (chunks) => (
                  <ul>
                    {chunks}
                  </ul>
                ),
                li: (chunks) => (
                  <li>
                    {chunks}
                  </li>
                )
              })}
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2022')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('enterprice.aecc.title')}
            </b>
            <ul>
              <li>
                {t('enterprice.aecc.position')}
              </li>
              {t.rich('enterprice.aecc.description', {
                ul: (chunks) => (
                  <ul>
                    {chunks}
                  </ul>
                ),
                li: (chunks) => (
                  <li>
                    {chunks}
                  </li>
                )
              })}
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2022')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('enterprice.ckm.title')}
            </b>
            <ul>
              <li>
                {t('enterprice.ckm.position')}
              </li>
              {t.rich('enterprice.ckm.description', {
                ul: (chunks) => (
                  <ul>
                    {chunks}
                  </ul>
                ),
                li: (chunks) => (
                  <li>
                    {chunks}
                  </li>
                )
              })}
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2020')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('enterprice.ckm2.title')}
            </b>
            <ul>
              <li>
                {t('enterprice.ckm2.position')}
              </li>
              {t.rich('enterprice.ckm2.description', {
                ul: (chunks) => (
                  <ul>
                    {chunks}
                  </ul>
                ),
                li: (chunks) => (
                  <li>
                    {chunks}
                  </li>
                )
              })}
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              {t('year.2020')}
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              {t('enterprice.ies.title')}
            </b>
            <ul>
              <li>
                {t('enterprice.ies.position')}
              </li>
              {t.rich('enterprice.ies.description', {
                ul: (chunks) => (
                  <ul>
                    {chunks}
                  </ul>
                ),
                li: (chunks) => (
                  <li>
                    {chunks}
                  </li>
                )
              })}
            </ul>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>
  )
}