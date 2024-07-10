import Link from "next/link";
import TextCard from "./TextCard";
import GrayText from "./GrayText";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
    <main>
      <Image
        src="/stars/big-purple.svg"
        className="absolute -z-10 top-24 right-0"
        alt="star"
        width={680}
        height={915}
      />
      <div className="md:flex py-16 md:py-0 items-center container relative">
        <div className="flex-1 py-16">
          <TextCard
            title="ПРИВЕТСТВУЕМ ВАС!"
            description="У нас собраны все самые необходимые функции для развития сообщества МПИТ."
          >
            <h1>
              Платформа для
              <div className="text-purple">проведения конкурсов МПИТ</div>
            </h1>
          </TextCard>
          <Link href="/login">
            <button className="border">Узнать подробнее</button>
          </Link>
        </div>
        <div className="absolute bottom-0 lg:relative lg:flex-1 -z-10">
          <Image
            src="/images/mascot.png"
            alt="mascot"
            className="hidden md:block xl:ml-16 w-3/5 lg:w-full float-end"
            width={684}
            height={684}
          />
        </div>
      </div>
      <div className="bg-gray-300">
        <div className="container grid gap-16 md:flex py-20">
          <div className="flex-1 text-center">
            <GrayText text="регистраций в день" value={100} />
          </div>
          <div className="flex-1 text-center">
            <GrayText text="активных участников" value={60_000} />
          </div>
          <div className="flex-1 text-center">
            <GrayText text="заработано" value={600_000} />
          </div>
        </div>
      </div>
      <div className="container grid gap-28 mt-16 md:mt-0">
        <div className="md:flex items-center">
          <div className="flex-1 order-2">
            <TextCard
              title="ЗАРАБОТОК"
              description="Создавайте свое портфолио, ищите заказы и зарабатывайте на них."
            >
              <h2>Возможность работать на заказ</h2>
            </TextCard>
          </div>
          <div className="flex-1 order-1">
            <Image src="/images/laptop.png" alt="laptop image" width={684} height={600} />
          </div>
        </div>
        <div className="md:flex items-center">
          <div className="flex-1">
            <TextCard
              title="ОПЫТ"
              description="Отправляйте заявки  на конкурсы и получайте  заслуженные баллы."
            >
              <h2>Участвовать на конкурсах и получать за это оценки</h2>
            </TextCard>
          </div>
          <div className="flex-1">
            <Image
              className="md:w-2/3 md:float-end"
              src="/images/columns.png"
              alt="columns image"
              width={456}
              height={488}
            />
          </div>
        </div>
        <div className="md:flex items-center">
          <div className="flex-1 order-2">
            <TextCard
              title="ЭФФЕКТИВНОСТЬ"
              description="Приглашайте других понравившихся участников в свою команду и работайте вместе."
            >
              <h2>Возможность создавать и работать в команде </h2>
            </TextCard>
          </div>
          <div className="flex-1 order-1">
            <Image src="/images/guys.png" alt="guys image" width={684} height={658} />
          </div>
        </div>
      </div>
    </main>
    <Footer />
    </>
  );
}
