import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator } from "@mui/lab";

export default function Studies() {
  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="studies">
      <h2 className="text-4xl font-bold">
        Studies
      </h2>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent className=" hidden"></TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent></TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2024 - CURRENT
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              La Salle online
            </b>
            <ul>
              <li>
                CFGS multiplatform application development
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2024 - 2021
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              La Salle
            </b>
            <ul>
              <li>
                CFGS multiplatform application development
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2021 - 2018
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              IES Eugeni d&#39;Ors
            </b>
            <ul>
              <li>
                CFGM Microcomputer Systems and Networks
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2023
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              LUCA Tic
            </b>
            <ul>
              <li>
                Program InTalent, Java Cloud Microservices
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2022
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              Udemy
            </b>
            <ul>
              <li>
                Smart Contracts with solidity from A to Z
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2021
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              CET 10
            </b>
            <ul>
              <li>
                Diamizer course for multi-sports activities
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2020
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              CET 10
            </b>
            <ul>
              <li>
                Leisure and free time monitor course
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent>
            <b className="font-bold">
              2018
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              CISCO NETACAD
            </b>
            <ul>
              <li>
                Title in networks
              </li>
            </ul>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>

  )
}