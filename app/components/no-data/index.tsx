import type { FC } from 'react'
import React from 'react'

export type INoDataProps = {}

const NoData: FC<INoDataProps> = () => {
  return (
    <div className="flex h-full w-full items-center justify-center px-10 py-10">
      <div className="grid w-full max-w-5xl grid-cols-2 gap-6">
        <div className="rounded-3xl border border-white bg-white p-8 shadow-xl">
          <div className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-blue-700">
            AI Thesis Workspace
          </div>

          <h2 className="mb-4 text-3xl font-black text-slate-950">
            AI 论文报告工作台
          </h2>

          <p className="mb-6 text-sm leading-7 text-slate-600">
            上传论文后，系统将在这里生成结构诊断、内容优化、格式合规检查与导出建议，
            帮助用户快速获得更规范、更专业的论文优化结果。
          </p>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 text-sm font-black text-blue-600">01</div>
              <div className="mb-1 text-sm font-black text-slate-900">学校规范匹配</div>
              <div className="text-xs leading-5 text-slate-500">
                依据目标高校论文要求进行格式匹配
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 text-sm font-black text-blue-600">02</div>
              <div className="mb-1 text-sm font-black text-slate-900">结构诊断报告</div>
              <div className="text-xs leading-5 text-slate-500">
                检查摘要、目录、章节与结论完整性
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 text-sm font-black text-blue-600">03</div>
              <div className="mb-1 text-sm font-black text-slate-900">学术表达优化</div>
              <div className="text-xs leading-5 text-slate-500">
                提升语言规范性、逻辑衔接与表达质量
              </div>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="mb-2 text-sm font-black text-blue-600">04</div>
              <div className="mb-1 text-sm font-black text-slate-900">格式合规检查</div>
              <div className="text-xs leading-5 text-slate-500">
                检查标题、图表、引用与参考文献格式
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white bg-white p-8 shadow-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <div className="text-xs font-black uppercase tracking-widest text-violet-600">
                Preview
              </div>
              <div className="mt-1 text-2xl font-black text-slate-950">
                论文优化报告
              </div>
            </div>

            <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
              Ready
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
              <span className="text-sm font-bold text-slate-600">结构完整度</span>
              <span className="text-sm font-black text-slate-950">待生成</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
              <span className="text-sm font-bold text-slate-600">格式合规度</span>
              <span className="text-sm font-black text-slate-950">待生成</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
              <span className="text-sm font-bold text-slate-600">表达优化建议</span>
              <span className="text-sm font-black text-slate-950">待生成</span>
            </div>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-4">
              <span className="text-sm font-bold text-slate-600">参考文献检查</span>
              <span className="text-sm font-black text-slate-950">待生成</span>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-dashed border-blue-200 bg-blue-50 p-4">
            <div className="mb-2 text-sm font-black text-blue-700">
              输出结果
            </div>
            <div className="text-xs leading-6 text-slate-500">
              支持生成论文诊断报告、优化后正文、格式修改建议，并可继续对接 PDF / Word 导出。
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(NoData)
