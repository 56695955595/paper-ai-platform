import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  PlayIcon,
} from '@heroicons/react/24/solid'
import Select from '@/app/components/base/select'
import type { PromptConfig, VisionFile, VisionSettings } from '@/types/app'
import Button from '@/app/components/base/button'
import { DEFAULT_VALUE_MAX_LEN } from '@/config'
import TextGenerationImageUploader from '@/app/components/base/image-uploader/text-generation-image-uploader'
import { uploadFile } from '@/service'

export type IRunOnceProps = {
  promptConfig: PromptConfig
  inputs: Record<string, any>
  onInputsChange: (inputs: Record<string, any>) => void
  onSend: () => void
  visionConfig: VisionSettings
  onVisionFilesChange: (files: VisionFile[]) => void
}
const RunOnce: FC<IRunOnceProps> = ({
  promptConfig,
  inputs,
  onInputsChange,
  onSend,
  visionConfig,
  onVisionFilesChange,
}) => {
  const { t } = useTranslation()
useEffect(() => {
  const pendingText = window.sessionStorage.getItem('pending_paper_content')
  if (!pendingText)
    return

  const hasPaperContentInput = promptConfig.prompt_variables.some(item => item.key === 'paper_content')
  if (!hasPaperContentInput)
    return

  window.sessionStorage.removeItem('pending_paper_content')

  onInputsChange({
    ...inputs,
    process_mode: inputs.process_mode || '论文排版',
    paper_type: inputs.paper_type || '硕士论文',
    rewrite_mode: inputs.rewrite_mode || '深度优化（允许补充）',
    paper_content: pendingText,
  })
}, [promptConfig.prompt_variables.length])
  const onClear = () => {
    const newInputs: Record<string, any> = {}
    promptConfig.prompt_variables.forEach((item) => {
      newInputs[item.key] = ''
    })
    onInputsChange(newInputs)
  }

  return (
    <div className="">
      <section>
        {/* input form */}
        <form>
          {promptConfig.prompt_variables.map(item => (
            <div className='w-full mt-4' key={item.key}>
              <label className='text-gray-900 text-sm font-medium'>{item.name}</label>
              <div className='mt-2'>
                {item.key === 'paper_file' && (
                  <div className="mt-2">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.txt,.md"
                      className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-700"
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file)
                          return
try {
  const shouldReadTxtAsText =
    file.name.toLowerCase().endsWith('.txt')
    && inputs.process_mode === '论文排版'

 if (shouldReadTxtAsText) {
  const text = await file.text()

  window.sessionStorage.setItem('pending_paper_content', text)

  e.target.value = ''

  alert('TXT 内容已提取成功，页面将自动刷新。刷新后正文会自动填入，请直接点击运行。')

  window.location.reload()
  return
}

  const uploaded = await uploadFile(file)
  console.log('Dify uploaded file object:', uploaded)

  const uploadFileId = uploaded?.id || uploaded?.upload_file_id || uploaded?.data?.id

  if (!uploadFileId) {
    alert('文件上传成功，但没有拿到 upload_file_id，请打开控制台查看 Dify uploaded file')
    return
  }

  onInputsChange({
    ...inputs,
    [item.key]: {
      type: 'document',
      transfer_method: 'local_file',
      upload_file_id: uploadFileId,
    },
  })
}
catch (error) {
  console.error(error)
  alert('文件上传失败，请重新上传')
}
                      }}
                    />
                    {inputs[item.key] && (
                      <div className="mt-2 text-xs text-green-600">
                        文件已上传，点击运行即可开始处理。
                      </div>
                    )}
                  </div>
                )}
                {item.type === 'select' && (
                  <Select
                    className='w-full'
                    defaultValue={inputs[item.key]}
                    onSelect={(i) => { onInputsChange({ ...inputs, [item.key]: i.value }) }}
                    items={(item.options || []).map(i => ({ name: i, value: i }))}
                    allowSearch={false}
                    bgClassName='bg-gray-50'
                  />
                )}
                {item.key !== 'paper_file' && item.type === 'string' && (
                  <input
                    type="text"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                    maxLength={item.max_length || DEFAULT_VALUE_MAX_LEN}
                  />
                )}
                {item.type === 'paragraph' && (
                  <textarea
                    className="block w-full h-[104px] p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                  />
                )}
                {item.type === 'number' && (
                  <input
                    type="number"
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
                    placeholder={`${item.name}${!item.required ? `(${t('appDebug.variableTable.optional')})` : ''}`}
                    value={inputs[item.key]}
                    onChange={(e) => { onInputsChange({ ...inputs, [item.key]: e.target.value }) }}
                  />
                )}
              </div>
            </div>
          ))}
          {
            visionConfig?.enabled && (
              <div className="w-full mt-4">
                <div className="text-gray-900 text-sm font-medium">{t('common.imageUploader.imageUpload')}</div>
                <div className='mt-2'>
                  <TextGenerationImageUploader
                    settings={visionConfig}
                    onFilesChange={files => onVisionFilesChange(files.filter(file => file.progress !== -1).map(fileItem => ({
                      type: 'image',
                      transfer_method: fileItem.type,
                      url: fileItem.url,
                      upload_file_id: fileItem.fileId,
                    })))}
                  />
                </div>
              </div>
            )
          }
          {promptConfig.prompt_variables.length > 0 && (
            <div className='mt-4 h-[1px] bg-gray-100'></div>
          )}
          <div className='w-full mt-4'>
            <div className="flex items-center justify-between">
              <Button
                className='!h-8 !p-3'
                onClick={onClear}
                disabled={false}
              >
                <span className='text-[13px]'>{t('common.operation.clear')}</span>
              </Button>
              <Button
                type="primary"
                className='!h-8 !pl-3 !pr-4'
                onClick={onSend}
                disabled={false}
              >
                <PlayIcon className="shrink-0 w-4 h-4 mr-1" aria-hidden="true" />
                <span className='text-[13px]'>{t('app.generation.run')}</span>
              </Button>
            </div>
          </div>
        </form>
      </section>
    </div>
  )
}
export default React.memo(RunOnce)
