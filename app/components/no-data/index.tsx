import React from 'react'

export type INoDataProps = {}

const NoData: React.FC<INoDataProps> = () => {
  return (
    <div className='relative flex h-full w-full items-center justify-center overflow-hidden px-10 py-10'>
      <div className='pointer-events-none absolute left-[12%] top-[18%] h-72 w-72 rounded-full bg-blue-400/10 blur-3xl' />
      <div className='pointer-events-none absolute bottom-[10%] right-[8%] h-80 w-80 rounded-full bg-violet-500/10 blur-3xl' />

      <div className='relative z-10 grid w-full max-w-[980px] grid-cols-[1.35fr_0.9fr] gap-6'>
        <div className='rounded-[32px] border border-white/80 bg-white/75 p-8 shadow-[0_28px_80px_rgba(37,99,235,0.12)] backdrop-blur-xl'>
          <div className='mb-4 inline-flex rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-blue-700'>
            AI Thesis Workspace
          </div>

          <h2 className='mb-4 text-[34px] font-black leading-tight tracking-[-0.04em] text-slate-950'>
            AI 论文报告工作台
          </h2>

          <p className='mb-7 max-w-[620px] text-[15px] leading-8 text-slate-600'>
            上传论文后，系统将在这里生成结构诊断、内容优化、格式合规检查与导出建议，
            帮助用户快速获得更规范、更专业的论文优化结果。
          </p>

          <div className='grid grid-cols-2 gap-3'>
            {[
              ['01', '学校规范匹配', '依据目标高校论文要求进行格式匹配'],
              ['02', '结构诊断报告', '检查摘要、目录、章节、结论完整性'],
              ['03', '学术表达优化', '提升语言规范性、逻辑衔接和表达质量'],
              ['04', '格式合规检查', '检查标题、图表、引用与参考文献格式'],
            ].map(([num, title, desc]) => (
              <div
                key={num}
                className='rounded-2xl border border-white/80 bg-white/80 p-4 shadow-[0_14px_34px_rgba(15,23,42,0.06)]'
              >
                <div className='mb-3 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-xs font-black text-white'>
                  {num}
                </div>
                <div className='mb-1 text-[15px] font-black text-slate-900'>{title}</div>
                <div className='text-xs leading-5 text-slate-500'>{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='relative rounded-[32px] border border-white/80 bg-white/70 p-6 shadow-[0_28px_80px_rgba(79,70,229,0.12)] backdrop-blur-xl'>
          <div className='absolute -right-8 -top-8 h-32 w-32 rounded-full bg-violet-400/20 blur-2xl' />

          <div className='mb-5 flex items-center justify-between'>
            <div>
              <div className='text-xs font-black uppercase tracking-[0.16em] text-violet-600'>Preview</div>
              <div className='mt-1 text-xl font-black text-slate-950'>论文优化报告</div>
            </div>
            <div className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700'>
              Ready
            </div>
          </div>

          <div className='space-y-3'>
            {[
              ['结构完整度', '92%'],
              ['格式合规度', '88%'],
              ['表达优化空间', '36 项'],
              ['参考文献检查', '待生成'],
            ].map(([label, value]) => (
              <div
                key={label}
                className='flex items-center justify-between rounded-2xl border border-slate-100 bg-white/82 px-4 py-4 shadow-sm'
              >
                <span className='text-sm font-bold text-slate-600'>{label}</span>
                <span className='text-sm font-black text-slate-950'>{value}</span>
              </div>
            ))}
          </div>

          <div className='mt-5 rounded-2xl border border-dashed border-blue-200 bg-blue-50/55 p-4'>
            <div className='mb-2 text-sm font-black text-blue-700'>输出结果</div>
            <div className='text-xs leading-6 text-slate-500'>
              支持生成论文诊断报告、优化后正文、格式修改建议，并可继续对接 PDF / Word 导出。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NoData)
