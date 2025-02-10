import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, timelineOppositeContentClasses, TimelineSeparator } from "@mui/lab";

export default function Experience() {
  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="experience">
      <h2 className="text-4xl font-bold">
        Experience
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
              2025 - 2023
            </b>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <b className="font-bold">
              NTT Data Europe & Latam
            </b>
            <ul>
              <li>
                Junior Frontend Developer Engineer
              </li>
              <ul>
                <li>Naturgy (UFD) Portal web project</li>
              </ul>
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
              NSIGN.TV
            </b>
            <ul>
              <li>
                Trainee Frontend Engineer
              </li>
              <ul>
                <li>
                  Design and develop of diferent applet utilities for the clients
                  <ul>
                    <li>
                      View the flights to arrive at Barcelona
                    </li>
                    <li>
                      Change Euro - Dolar in live
                    </li>
                    <li>
                      View the next matches in La Liga
                    </li>
                    <li>
                      Time in the location of the device (or that marks the browser you are using)
                    </li>
                    <li>
                      View upcoming events on a calendar
                    </li>
                  </ul>
                </li>
                <li>
                  Analysis of the UX of the platform and making proposals for improvement
                </li>
              </ul>
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
              Asociación española contra el cáncer
            </b>
            <ul>
              <li>
                Summer Camp monitor
              </li>
              <ul>
                Carry out different tasks to stimulate the group of medium-sized children (10 - 13 years old) in the Summer Camps carried out annually by the Spanish Association Against Cancer in Salardú (Vall d&apos;aran)
              </ul>
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
              Comkedem Sports and Education Association
            </b>
            <ul>
              <li>
                Volunteer
              </li>
              <ul>
                <li>Design of the different sections of the website for a future update in wordpress</li>
              </ul>
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
              Comkedem Sports and education Association
            </b>
            <ul>
              <li>
                Casal and summer Campament monitor
              </li>
              <ul>
                <li>
                  Carry out diferent group dynamization tasks in the Sports Center (between 8 and 15 years old) and in the Autonomus States (Between 16 and 18) carried out every summer by the Comkedem Association
                </li>
              </ul>
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
              IES Alt Penedes
            </b>
            <ul>
              <li>
                IT Technician
              </li>
              <ul>
                <li>Installation, update and configuration of operating systems and accesory software for newly acquired laptops</li>
                <li>Installation of audiovisual equipment in the classrooms</li>
                <li>Preparation of audiovisuals for the days of open doors of the academic year 2020-2021</li>
                <li>Collaboration in the installation and configuration of the Moodle platform to be able to carry out the telematic classes</li>
              </ul>
            </ul>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </section>
  )
}