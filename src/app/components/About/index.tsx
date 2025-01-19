import calcAge from "@/app/actins/calcAge";
import Link from "next/link";

export default function About() {
  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black" id="about">
      <h1 className="text-4xl font-bold">
        About me
      </h1>
      <p className="text-2xl">
        Now a days, I live in Barcelona, spain. I&apos; {calcAge()} years old. Now a days, I&apos;m studing a Multiplatform Aplication Development course at the hight school La Salle.
      </p>
      <p className="text-2xl">
        I start to learn about web development in 2019, at second of the intermediate cycle of the high school in the subject of &quot;Aplicacions web&quot; wehere I learned to use diferent technologies and content managers like HTML, CSS, JavaScript, Wordpress and Moodle.
      </p>
      <p className="text-2xl">
        Right now, I&apos;m improving my skills in web development learning back-end technologies like PHP, MySQL, Laravel or node. Also I&apos;m learning front-end technologies like React or Node.js. To complete all this subjects, I have some knowledges about UX/UI design.
      </p>
      <p className="text-2xl">
        If you want more information about me, you can acces to my <Link className=" underline hover:text-gray-700" href="https://www.linkedin.com/in/roger-barrero-sorribas/">Linkedin</Link> or my <Link className=" underline hover:text-gray-700" href="https://www.ruugii.com/">personal web portfolo</Link>.
      </p>
      <p className="text-2xl">
        If you want to contact me, you can send me an email to <Link className=" underline hover:text-gray-700" href="mailto:rogerbarrero@gmail.com">rogerbarrero@gmail.com</Link>.
      </p>
    </section>
  );
}