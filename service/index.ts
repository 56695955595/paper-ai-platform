import type { IOnCompleted, IOnData, IOnError, IOnNodeFinished, IOnNodeStarted, IOnWorkflowFinished, IOnWorkflowStarted } from './base'
import { get, post, ssePost } from './base'
import type { Feedbacktype } from '@/types/app'

export const sendCompletionMessage = async (body: Record<string, any>, { onData, onCompleted, onError }: {
  onData: IOnData
  onCompleted: IOnCompleted
  onError: IOnError
}) => {
  return ssePost('completion-messages', {
    body: {
      ...body,
      response_mode: 'streaming',
    },
  }, { onData, onCompleted, onError })
}

export const sendWorkflowMessage = async (
  body: Record<string, any>,
  {
    onWorkflowStarted,
    onNodeStarted,
    onNodeFinished,
    onWorkflowFinished,
  }: {
    onWorkflowStarted: IOnWorkflowStarted
    onNodeStarted: IOnNodeStarted
    onNodeFinished: IOnNodeFinished
    onWorkflowFinished: IOnWorkflowFinished
  },
) => {
  const res: any = await post('workflows/run', {
    body: {
      ...body,
      response_mode: 'blocking',
    },
  })

  const workflowRunId = res?.workflow_run_id || res?.data?.id || res?.task_id || `workflow_${Date.now()}`

  onWorkflowStarted?.({
    workflow_run_id: workflowRunId,
  } as any)

  onWorkflowFinished?.({
    data: {
      ...(res?.data || {}),
      outputs: res?.data?.outputs || res?.outputs || {},
      error: res?.data?.error || res?.error,
    },
  } as any)

  return res
}
export const fetchAppParams = async () => {
  return get('parameters')
}

export const updateFeedback = async ({ url, body }: { url: string; body: Feedbacktype }) => {
  return post(url, { body })
}
