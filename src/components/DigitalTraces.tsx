import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const traces = [
  {
    id: '01',
    title: '模型对齐基准库',
    desc: '构建基于人类反馈的高质量强化学习（RLHF）数据集体系，显著提升语言模型在复杂逻辑推理中的表现。',
    tag: 'RLHF / Data Curation'
  },
  {
    id: '02',
    title: '多模态意图识别',
    desc: '优化视觉-语言大模型（VLM）在模糊指令下的意图捕获能力，使其在多模态交互场景中更自然。',
    tag: 'VLM / Prompt Engineering'
  },
  {
    id: '03',
    title: '领域知识图谱融合',
    desc: '通过思维链（CoT）设计与动态知识库召回，降低特定行业问答系统中的幻觉生成率。',
    tag: 'RAG / CoT'
  },
  {
    id: '04',
    title: '角色扮演模型微调',
    desc: '设计极具深度的性格锚点体系，赋予 AI 在长程对话中高度一致的情感反馈与记忆留存。',
    tag: 'Fine-Tuning / Persona'
  }
];

export function DigitalTraces() {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl md:text-[40px] mb-4 text-primary tracking-[-0.01em]">
            数字痕迹
          </h2>
          <p className="font-sans text-secondary text-base md:text-lg max-w-xl">
            在无序的海量数据中，寻找能与人类心智共鸣的秩序。
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {traces.map((trace, idx) => (
          <motion.div
            key={trace.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
            className="group card-base card-hover p-8 md:p-10 flex flex-col justify-between min-h-[320px] relative overflow-hidden cursor-pointer"
          >
            {/* Subtle glow background */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white/5 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex justify-between items-start mb-12">
              <span className="font-sans text-muted text-sm tracking-widest">{trace.id}</span>
              <div className="p-2 border border-white/10 rounded-full text-muted group-hover:text-primary group-hover:border-white/30 transition-colors duration-300">
                <ArrowUpRight size={18} strokeWidth={1.5} />
              </div>
            </div>

            <div>
              <h3 className="font-sans text-2xl font-medium mb-3 text-primary group-hover:text-glow transition-all duration-300">
                {trace.title}
              </h3>
              <p className="font-sans text-secondary text-sm md:text-base leading-relaxed mb-6">
                {trace.desc}
              </p>
              <div className="inline-block px-3 py-1 border border-white/10 text-xs text-muted tracking-wider group-hover:border-white/20 transition-colors">
                {trace.tag}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
