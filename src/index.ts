import { Hono } from 'hono';
import { remindersRoutes } from './routes/reminderRoutes.js';
import { serve } from '@hono/node-server';

const app = new Hono();

app.route('/reminders', remindersRoutes);

serve(app);

console.log(`Server is running on port 3000`);

