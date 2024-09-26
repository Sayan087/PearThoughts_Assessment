'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import { TimePicker } from './timePicker';
import { useState } from 'react';

const formSchema = z.object({
  startDate: z.date(),
  endDate: z.date().optional(),
  recurrence: z.enum(['none', 'daily', 'weekly', 'monthly']).default('none'),
  interval: z.number().min(1, 'Interval must be at least 1').optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;

export default function DateTimePickerForm() {
  const [submittedData, setSubmittedData] = useState<FormSchemaType[]>([]); // State to hold submitted data
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: undefined,
      endDate: undefined,
      recurrence: 'none',
      interval: 1,
    },
  });

  function onSubmit(values: FormSchemaType) {
    setSubmittedData((prevData) => [...prevData, values]); // Append new data to state
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Start Date Picker */}
          <FormField
            control={form.control}
            name='startDate'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel>Start Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick a start date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                    <div className='p-3 border-t border-border'>
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* End Date Picker */}
          <FormField
            control={form.control}
            name='endDate'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel>End Date (Optional)</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[280px] justify-start text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      <CalendarIcon className='mr-2 h-4 w-4' />
                      {field.value ? (
                        format(field.value, 'PPP HH:mm:ss')
                      ) : (
                        <span>Pick an end date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0'>
                    <Calendar
                      mode='single'
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                    <div className='p-3 border-t border-border'>
                      <TimePicker setDate={field.onChange} date={field.value} />
                    </div>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Recurrence Field */}
          <FormField
            control={form.control}
            name='recurrence'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel>Recurrence</FormLabel>
                <select {...field} className='border rounded p-2'>
                  <option value='none'>None</option>
                  <option value='daily'>Daily</option>
                  <option value='weekly'>Weekly</option>
                  <option value='monthly'>Monthly</option>
                </select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interval Field */}
          <FormField
            control={form.control}
            name='interval'
            render={({ field }) => (
              <FormItem className='flex flex-col items-start'>
                <FormLabel>Interval</FormLabel>
                <input
                  type='number'
                  {...field}
                  className='border rounded p-2'
                  placeholder='Enter interval'
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit'>Submit</Button>
        </form>
      </Form>

      {/* Display submitted data in a table format */}
      {submittedData.length > 0 && (
        <div className='mt-8'>
          <h2 className='text-lg font-semibold'>Submitted Data</h2>
          <table className='table-auto border border-collapse border-gray-300 w-full'>
            <thead>
              <tr>
                <th className='border p-2'>Start Date</th>
                <th className='border p-2'>End Date</th>
                <th className='border p-2'>Recurrence</th>
                <th className='border p-2'>Interval</th>
              </tr>
            </thead>
            <tbody>
              {submittedData.map((data, index) => (
                <tr key={index}>
                  <td className='border p-2'>
                    {data.startDate ? format(data.startDate, 'PPP HH:mm:ss') : 'N/A'}
                  </td>
                  <td className='border p-2'>
                    {data.endDate ? format(data.endDate, 'PPP HH:mm:ss') : 'N/A'}
                  </td>
                  <td className='border p-2'>{data.recurrence}</td>
                  <td className='border p-2'>{data.interval}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
