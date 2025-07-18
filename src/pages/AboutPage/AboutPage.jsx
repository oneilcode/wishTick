import cls from './AboutPage.module.css';

export const AboutPage = () => {
  return (
    <div className={cls.about}>
      <h5 className={cls.aboutTitle}> WishTick — твой цифровой дневник желаний, который помогает мечтам сбываться!</h5>
      <p>В современном ритме жизни так легко упустить из виду свои мечты и цели.  <br />Но что если бы существовал простой и удобный инструмент, который не только помогает записывать желания, но и мотивирует их исполнять? <br />WishTick — это именно такое приложение: твой личный цифровой дневник желаний, превращающий мечты в реальность.</p>
      <h6 className={cls.aboutSubTitle}>Как это работает?</h6>
      <ul className={cls.aboutList}>
        <li>
          1. Добавляй желания <br />
          С WishTick ты можешь фиксировать всё, что хочешь достичь — от небольших повседневных радостей до грандиозных жизненных целей. Хочешь выучить новый язык, отправиться в путешествие или просто чаще радовать себя маленькими приятностями? Просто добавь это в приложение, и первый шаг к исполнению сделан!
        </li>
        <li>
       2. Отслеживай статус <br />
        Больше никаких забытых желаний! В WishTick ты можешь отмечать, какие мечты уже сбылись, а какие ещё в процессе. Это помогает не только видеть прогресс, но и чувствовать удовлетворение от каждого достижения.
        </li>
        <li>
       3. Анализируй и вдохновляйся <br />
        Приложение предоставляет статистику, которая наглядно показывает, как много ты уже сделал(а). Оглядываясь на исполненные мечты, ты заряжаешься мотивацией и уверенностью для новых свершений!
        </li>
      </ul>
      <h6 className={cls.aboutSubTitle}>Почему WishTick — это больше, чем просто список желаний?</h6>
      <p>Это твой персональный источник вдохновения и инструмент для осознанного управления своей жизнью. Здесь нет места забытым мечтам — только чёткий план, контроль и радость от их воплощения.</p>
      <span>WishTick: Твои мечты — под контролем!</span>
      <span className={cls.motivationText}>Присоединяйся к тем, кто не просто мечтает, а делает!</span>
    </div>
  );
};
