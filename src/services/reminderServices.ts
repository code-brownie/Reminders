import type { CreateReminderDto, Reminder, UpdateReminderDto } from "../types/reminder.js";

let reminders: Reminder[] = [];

export const ReminderService = {
  createReminder: (reminderData: CreateReminderDto): Reminder => {

    if (!reminderData.id || !reminderData.title || !reminderData.dueDate) {
      throw new Error('Missing required fields');
    }


    const existingReminder = reminders.find(r => r.id === reminderData.id);
    if (existingReminder) {
      throw new Error('Reminder with this ID already exists');
    }


    if (isNaN(Date.parse(reminderData.dueDate))) {
      throw new Error('Invalid date format');
    }

    const newReminder: Reminder = {
      id: reminderData.id,
      title: reminderData.title,
      description: reminderData.description || '',
      dueDate: reminderData.dueDate,
      isCompleted: reminderData.isCompleted || false,
    };

    reminders.push(newReminder);
    return newReminder;
  },

  getReminderById: (id: string): Reminder => {
    const reminder = reminders.find(r => r.id === id);
    if (!reminder) {
      throw new Error('Reminder not found');
    }
    return reminder;
  },

  getAllReminders: (): Reminder[] => {
    if (reminders.length === 0) {
      throw new Error('No reminders found');
    }
    return reminders;
  },

  updateReminder: (id: string, updateData: UpdateReminderDto): Reminder => {
    const reminderIndex = reminders.findIndex(r => r.id === id);
    if (reminderIndex === -1) {
      throw new Error('Reminder not found');
    }


    if (updateData.dueDate && isNaN(Date.parse(updateData.dueDate))) {
      throw new Error('Invalid date format');
    }

    const updatedReminder = {
      ...reminders[reminderIndex],
      ...updateData
    };

    reminders[reminderIndex] = updatedReminder;
    return updatedReminder;
  },

  deleteReminder: (id: string): void => {
    const reminderIndex = reminders.findIndex(r => r.id === id);
    if (reminderIndex === -1) {
      throw new Error('Reminder not found');
    }
    reminders.splice(reminderIndex, 1);
  },

  markAsCompleted: (id: string): Reminder => {
    const reminderIndex = reminders.findIndex(r => r.id === id);
    if (reminderIndex === -1) {
      throw new Error('Reminder not found');
    }
    
    reminders[reminderIndex].isCompleted = true;
    return reminders[reminderIndex];
  },

  unmarkAsCompleted: (id: string): Reminder => {
    const reminderIndex = reminders.findIndex(r => r.id === id);
    if (reminderIndex === -1) {
      throw new Error('Reminder not found');
    }
    
    reminders[reminderIndex].isCompleted = false;
    return reminders[reminderIndex];
  },

  getCompletedReminders: (): Reminder[] => {
    const completedReminders = reminders.filter(r => r.isCompleted);
    if (completedReminders.length === 0) {
      throw new Error('No completed reminders found');
    }
    return completedReminders;
  },

  getNotCompletedReminders: (): Reminder[] => {
    const notCompletedReminders = reminders.filter(r => !r.isCompleted);
    if (notCompletedReminders.length === 0) {
      throw new Error('No uncompleted reminders found');
    }
    return notCompletedReminders;
  },

  getDueTodayReminders: (): Reminder[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dueTodayReminders = reminders.filter(r => {
      const dueDate = new Date(r.dueDate);
      dueDate.setHours(0, 0, 0, 0);
      return dueDate.getTime() === today.getTime();
    });
    
    if (dueTodayReminders.length === 0) {
      throw new Error('No reminders due today');
    }
    
    return dueTodayReminders;
  }
};