import GrayText from "./GrayText";
import TextCard from "./TextCard";

const Dashboard = () => {
  return (
    <main>
      <img
        src="/stars/big-purple.svg"
        className="absolute -z-10 top-24 right-0"
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
          <button className="border">Узнать подробнее</button>
        </div>
        <div className="absolute bottom-0 lg:relative lg:flex-1 -z-10">
          <img
            src="/images/mascot.png"
            alt="mascot"
            className="hidden md:block xl:ml-16 w-3/5 lg:w-full float-end"
          />
        </div>
      </div>
      <div className="bg-gray-300">
        <div className="container grid gap-16 md:flex py-20">
          <div className="flex-1 text-center">
            <GrayText text="регистраций в день" value="100+" />
          </div>
          <div className="flex-1 text-center">
            <GrayText text="активных участников" value="60K+" />
          </div>
          <div className="flex-1 text-center">
            <GrayText text="заработано" value="600K+" />
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
            <img src="/images/laptop.png" alt="laptop image" />
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
            <img
              className="md:w-2/3 md:float-end"
              src="/images/columns.png"
              alt="columns image"
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
            <img src="/images/guys.png" alt="guys image" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
