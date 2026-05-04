import React from 'react'

export type INoDataProps = {}

const steps = [
  {
    num: '01',
    title: '学校规范匹配',
    desc: '根据目标高校论文格式要求，进行规范匹配与检查。',
  },
  {
    num: '02',
    title: '结构诊断报告',
    desc: '检查摘要、目录、章节与结论的完整性与逻辑性。',
  },
  {
    num: '03',
    title: '内容优化建议',
    desc: '优化语言表达、学术风格与段落衔接，提升可读性。',
  },
  {
    num: '04',
    title: '格式合规检查',
    desc: '检查标题、图表、参考文献、脚注等排版规范问题。',
  },
]

const reportItems = [
  '结构完整度',
  '格式合规度',
  '表达优化建议',
  '参考文献检查',
]

const NoData: React.FC<INoDataProps> = () => {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] border border-white/60 bg-white/35 px-7 py-5 backdrop-blur-xl">
      {/* 背景柔光 */}
      <div className="pointer-events-none absolute left-[10%] top-[8%] h-64 w-64 rounded-full bg-blue-200/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-[12%] h-72 w-72 rounded-full bg-violet-200/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[8%] left-[35%] h-64 w-64 rounded-full bg-cyan-100/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-[1180px]">
        {/* 顶部标题 */}
        <div className="mb-5 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="mb-2 inline-flex rounded-full border border-blue-200/70 bg-blue-50/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
              AI THESIS WORKSPACE
            </div>
            <h2 className="text-[30px] font-black leading-tight text-slate-900">
              AI 论文报告工作台
            </h2>
            <p className="mt-3 max-w-[780px] text-[14px] leading-7 text-slate-600">
              上传论文之后，系统将在右侧生成结构诊断、内容优化、格式合规检查与导出建议，
              帮助用户快速获得更规范、更专业、更具学术表达力的论文优化结果。
            </p>
          </div>

          <div className="inline-flex self-start rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-2 text-sm font-semibold text-emerald-700">
            Ready
          </div>
        </div>

        {/* 主体区域 */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.15fr_0.85fr]">
          {/* 左侧工作流 */}
          <div className="rounded-[26px] border border-white/70 bg-white/70 p-6 shadow-[0_20px_60px_rgba(30,41,59,0.08)]">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-base font-black text-white shadow-lg">
                AI
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  Academic Intelligence Console
                </div>
                <div className="text-lg font-bold text-slate-900">
                  论文智能诊断与优化流程
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {steps.map((item) => (
                <div
                  key={item.num}
                  className="rounded-[20px] border border-slate-200/70 bg-white/90 p-4 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
                >
                  <div className="mb-2 inline-flex rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-3 py-1 text-xs font-bold text-white">
                    {item.num}
                  </div>
                  <div className="mb-1 text-[16px] font-bold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-xs leading-6 text-slate-600">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧预览 */}
          <div className="rounded-[26px] border border-white/70 bg-white/78 p-6 shadow-[0_20px_60px_rgba(30,41,59,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <div className="inline-flex rounded-full border border-violet-200/70 bg-violet-50/80 px-4 py-1 text-xs font-bold uppercase tracking-[0.18em] text-violet-700">
                Preview
              </div>
              <span className="rounded-full border border-emerald-200/70 bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700">
                Ready
              </span>
            </div>

            <h3 className="mb-5 text-[26px] font-black text-slate-900">
              论文优化报告
            </h3>

            <div className="space-y-3">
              {reportItems.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-slate-50/80 px-5 py-3"
                >
                  <span className="text-[14px] font-semibold text-slate-700">
                    {item}
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    待生成
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[22px] border border-blue-100 bg-gradient-to-br from-blue-50 to-violet-50 p-4">
              <div className="mb-2 text-sm font-bold text-blue-700">输出结果</div>
              <div className="text-[15px] font-bold leading-6 text-slate-900">
                支持生成诊断报告、优化建议，并导出 PDF / Word
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-600">
                用户填写左侧信息后，系统将在这里展示论文优化报告的结构化预览内容。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NoData)
