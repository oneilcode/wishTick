import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import cls from "./HomePage.module.css";
import { CTA, FEATURES, HERO, HOW_IT_WORKS } from "@/constants/homePage";

export const HomePage = () => {
  return (
    <div className={cls.page}>
      <section className={cls.hero}>
        <motion.h1
          className={cls.heroTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {HERO.title} <span className={cls.accent}>{HERO.titleAccent}</span>
        </motion.h1>

        <motion.p
          className={cls.heroSubtitle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {HERO.subtitle}
          <br />
          {HERO.subtitleLine2}
        </motion.p>

        <motion.div
          className={cls.heroButtons}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <Link to="/signup" className={cls.btnPrimary}>
            {HERO.ctaPrimary}
          </Link>
          <Link to="/signin" className={cls.btnSecondary}>
            {HERO.ctaSecondary} →
          </Link>
        </motion.div>
      </section>

      <section className={cls.section}>
        <motion.h2
          className={cls.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {HOW_IT_WORKS.title}
        </motion.h2>

        <div className={cls.cards}>
          {HOW_IT_WORKS.steps.map((step, i) => (
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

      <section className={cls.section}>
        <motion.h2
          className={cls.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {FEATURES.title}
        </motion.h2>

        <div className={cls.featuresList}>
          {FEATURES.items.map((feature, i) => (
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

      <motion.section
        className={cls.cta}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className={cls.ctaTitle}>{CTA.title}</h2>
        <p className={cls.ctaText}>{CTA.text}</p>
        <Link to="/signup" className={cls.btnPrimary}>
          {CTA.button}
        </Link>
      </motion.section>
    </div>
  );
};
