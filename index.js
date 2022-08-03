import { config as redisConfig } from './config/redis.config.js'

import { Queue, QueueEvents, Worker } from 'bullmq'

const QUEUE_NAME = 'testing-queue'
const myQueue = new Queue(
  QUEUE_NAME,
  {
    connection: redisConfig,
    defaultJobOptions: {
      removeOnComplete: true,
      removeOnFail: true
    }
  }
)

async function addJobs () {
  await myQueue.add('myJobName', { foo: 'bar' })
  await myQueue.add('myJobName', { qux: 'baz' })
}

const worker = new Worker(QUEUE_NAME, async job => {
  // Will print { foo: 'bar' } for the first job and { qux: 'baz' } for the second. We pass our strings seperately
  // rather than formatting them as one to avoid the output being '2 [object Object]'
  console.log(job.id, job.data)

  return new Date().toUTCString()
}, { connection: redisConfig })

worker.on('completed', job => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`)
})

const queueEvents = new QueueEvents(QUEUE_NAME, { connection: redisConfig })

queueEvents.on('waiting', ({ jobId }) => {
  console.log(`${jobId} is waiting`)
})

queueEvents.on('active', ({ jobId, prev }) => {
  console.log(`${jobId} is now active; previous status was ${prev}`)
})

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`${jobId} has completed and returned ${returnvalue}`)
})

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`${jobId} has failed with reason ${failedReason}`)
})

await addJobs()
