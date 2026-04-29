import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const musings = [
  {
    date: '2026.04',
    content: '在给模型植入"共情"能力时，我们到底是在创造温度，还是在伪造一种概率上的讨好？',
  },
  {
    date: '2026.02',
    content: '相比于让 AI 变聪明，让它学会说"我不知道"才是最难的微调工程。',
  },
  {
    date: '2025.11',
    content: '优秀的 Prompt 工程师像个诗人，而优秀的 RLHF 设计师更像个冷酷的法官。',
  },
  {
    date: '2025.09',
    content: '数据如星辰大海，而算法是我们在其中拉起的网。网越密，捞起的虚无也越多。',
  }
];

export function MarginalMusings() {
  return (
    <section className="min-h-screen pt-40 pb-32 px-6 md:px-12 max-w-5xl mx-auto relative">
      <div className="text-center mb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center justify-center mb-6"
        >
          <Sparkles className="text-muted mr-3" size={20} />
          <h2 className="font-serif text-3xl md:text-4xl text-primary tracking-[-0.01em]">
            边角碎念
          </h2>
          <Sparkles className="text-muted ml-3" size={20} />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-sans text-secondary text-base"
        >
          训练模型时的随机掉落思考。
        </motion.p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent-line to-transparent md:-translate-x-1/2" />

        <div className="space-y-24">
          {musings.map((musing, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-4px] md:left-1/2 top-0 md:top-1/2 w-2 h-2 bg-primary rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_10px_var(--accent-glow)] z-10" />

                {/* Content */}
                <div className={`pl-8 md:px-0 md:w-1/2 ${
                  isEven ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'
                }`}>
                  <div className="font-sans text-xs text-muted mb-3 tracking-[0.1em]">
                    {musing.date}
                  </div>
                  <p className="font-serif text-xl md:text-2xl leading-[1.8] text-primary font-normal text-glow">
                    {musing.content}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
