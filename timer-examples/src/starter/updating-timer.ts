import { WorkflowClient } from '@temporalio/client';
import { countdownWorkflow, setDeadlineSignal, timeLeftQuery } from '../workflows';

async function run(): Promise<void> {
  const client = new WorkflowClient();

  const handle = await client.start(countdownWorkflow, { taskQueue: 'timer-examples' });
  console.log('Time left: ', await handle.query(timeLeftQuery));
  await handle.signal(setDeadlineSignal, Date.now() + 3000);
  console.log('Time left: ', await handle.query(timeLeftQuery));
  console.log('Done');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
