import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import cls from "./HomePage.module.css";

export const HomePage = () => {
  return (
    <div className={cls.page}>
      {/* ============ HERO ============ */}
      <section className={cls.hero}>
        <motion.h1
          className={cls.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Твои мечты <span className={cls.accent}>под контролем</span>
        </motion.h1>

        <motion.p
          className={cls.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Записывай. Мечтай. Достигай. <br></br> Твои желания заслуживают внимания.
        </motion.p>

        <motion.div
          className={cls.heroButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link to="/register" className={cls.btnPrimary}>
            Начать бесплатно
          </Link>
          <Link to="/login" className={cls.btnSecondary}>
            Войти →
          </Link>
        </motion.div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className={cls.section}>
        <motion.h2
          className={cls.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Как это работает
        </motion.h2>

        <div className={cls.cards}>
          {[
            {
              num: "01",
              title: "Добавляй желания",
              text: "Фиксируй всё — от маленьких радостей до больших целей. Первый шаг к исполнению — записать мечту.",
            },
            {
              num: "02",
              title: "Отслеживай статус",
              text: "Отмечай, что сбылось, а что в процессе. Видь прогресс и заряжайся мотивацией.",
            },
            {
              num: "03",
              title: "Вдохновляйся",
              text: "Оглядывайся на исполненные мечты и находи силы для новых свершений.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.title}
              className={cls.card}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <span className={cls.cardNumber}>{step.num}</span>
              <h3 className={cls.cardTitle}>{step.title}</h3>
              <p className={cls.cardText}>{step.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className={cls.section}>
        <motion.h2
          className={cls.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Больше, чем список
        </motion.h2>

        <div className={cls.featuresList}>
          {[
            {
              title: "Осознанное управление",
              text: "Инструмент, который помогает не просто мечтать, а двигаться к цели.",
            },
            {
              title: "Источник вдохновения",
              text: "Твоя личная коллекция исполненных желаний — топливо для новых свершений.",
            },
            {
              title: "Никаких забытых мечт",
              text: "Чёткий план, контроль и радость от каждого шага к мечте.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              className={cls.feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <h3 className={cls.featureTitle}>{feature.title}</h3>
              <p className={cls.featureText}>{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ============ CTA ============ */}
      <motion.section
        className={cls.cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={cls.ctaTitle}>Присоединяйся к тем, кто не просто мечтает</h2>
        <p className={cls.ctaText}>
          Начни отслеживать свои желания сегодня и удивись, как много ты уже сделал.
        </p>
        <Link to="/register" className={cls.btnPrimary}>
          Создать первое желание
        </Link>
      </motion.section>
    </div>
  );
};
