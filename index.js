import { Queue, QueueEvents, Worker } from 'bullmq'

const myQueue = new Queue('foo')

async function addJobs () {
  await myQueue.add('myJobName', { foo: 'bar' })
  await myQueue.add('myJobName', { qux: 'baz' })
}

await addJobs()

const worker = new Worker('foo', async job => {
  // Will print { foo: 'bar' } for the first job
  // and { qux: 'baz' } for the second
  console.log(job.data)
})

worker.on('completed', job => {
  console.log(`${job.id} has completed!`)
})

worker.on('failed', (job, err) => {
  console.log(`${job.id} has failed with ${err.message}`)
})

const queueEvents = new QueueEvents()

queueEvents.on('waiting', ({ jobId }) => {
  console.log(`${jobId} is waiting`)
})

queueEvents.on('active', ({ jobId, prev }) => {
  console.log(`${jobId} is now active; previous status was ${prev}`)
})

queueEvents.on('completed', ({ jobId, returnValue }) => {
  console.log(`${jobId} has completed and returned ${returnValue}`)
})

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.log(`${jobId} has failed with reason ${failedReason}`)
})
