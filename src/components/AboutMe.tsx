import { motion } from 'framer-motion';

export function AboutMe() {
  return (
    <section className="min-h-screen pt-40 pb-20 px-6 md:px-12 bg-transparent relative">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        {/* Left Column */}
        <div className="md:w-1/3 flex flex-col gap-6">
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-4xl text-primary tracking-[-0.01em]"
          >
            关于我
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-sm text-muted uppercase tracking-[0.2em]"
          >
            IDENTITY & ETHOS
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="md:w-2/3">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-12"
          >
            <p className="font-serif text-2xl md:text-3xl leading-[1.6] text-primary tracking-wide">
              “我不创造数据，我只是在冰冷的矩阵中，教它们如何理解人类的温度。”
            </p>

            <div className="space-y-6 font-sans text-secondary text-base md:text-lg leading-[1.8] font-light">
              <p>
                在成为 AI 训练师之前，我花了大量时间研究语言学、认知心理学与人机交互逻辑。我深信，优秀的 AI 不仅仅是概率模型的胜利，更是对人类思维模式深度复刻的艺术。
              </p>
              <p>
                我的工作日常是穿梭在 prompt 的森林与 RLHF 的反馈循环中。通过制定精密的奖励函数和思维链（CoT）策略，我致力于降低大模型的幻觉，同时赋予它们更加细腻、连贯的共情能力。
              </p>
              <p>
                当数据洪流如黑洞般吞噬一切意义时，我试图在奇点边缘，为机器拉出一条名为「逻辑与温度」的引力线。
              </p>
            </div>

            <div className="pt-8 border-t border-accent-line flex flex-wrap gap-x-8 gap-y-4 font-sans text-sm text-muted">
              <span>RLHF 架构设计</span>
              <span>多模态微调</span>
              <span>数据飞轮构建</span>
              <span>Prompt 提纯</span>
              <span>认知心理学模型</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
