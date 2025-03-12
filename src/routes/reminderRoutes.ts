import { Hono } from 'hono';
import type { CreateReminderDto, UpdateReminderDto } from '../types/reminder.js';
import { ReminderService } from '../services/reminderServices.js';


const remindersRoutes = new Hono();


remindersRoutes.post('/', async (c) => {
    try {
        const body = await c.req.json() as CreateReminderDto;
        const newReminder = ReminderService.createReminder(body);
        return c.json(newReminder, 201);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 400);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.get('/:id', (c) => {
    try {
        const id = c.req.param('id');
        const reminder = ReminderService.getReminderById(id);
        return c.json(reminder);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.get('/', (c) => {
    try {
        const reminders = ReminderService.getAllReminders();
        return c.json(reminders);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.patch('/:id', async (c) => {
    try {
        const id = c.req.param('id');
        const body = await c.req.json() as UpdateReminderDto;
        const updatedReminder = ReminderService.updateReminder(id, body);
        return c.json(updatedReminder);
    } catch (error) {
        if (error instanceof Error) {
            if (error.message === 'Reminder not found') {
                return c.json({ error: error.message }, 404);
            }
            return c.json({ error: error.message }, 400);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.delete('/:id', (c) => {
    try {
        const id = c.req.param('id');
        ReminderService.deleteReminder(id);
        return c.json({ message: 'Reminder deleted successfully' });
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.post('/:id/mark-completed', (c) => {
    try {
        const id = c.req.param('id');
        const updatedReminder = ReminderService.markAsCompleted(id);
        return c.json(updatedReminder);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.post('/:id/unmark-completed', (c) => {
    try {
        const id = c.req.param('id');
        const updatedReminder = ReminderService.unmarkAsCompleted(id);
        return c.json(updatedReminder);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.get('/completed', (c) => {
    try {
        const completedReminders = ReminderService.getCompletedReminders();
        return c.json(completedReminders);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});


remindersRoutes.get('/not-completed', (c) => {
    try {
        const notCompletedReminders = ReminderService.getNotCompletedReminders();
        return c.json(notCompletedReminders);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});

remindersRoutes.get('/due-today', (c) => {
    try {
        const dueTodayReminders = ReminderService.getDueTodayReminders();
        return c.json(dueTodayReminders);
    } catch (error) {
        if (error instanceof Error) {
            return c.json({ error: error.message }, 404);
        }
        return c.json({ error: 'An unexpected error occurred' }, 500);
    }
});

export { remindersRoutes };