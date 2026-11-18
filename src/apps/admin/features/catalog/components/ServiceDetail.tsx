import React, { useState } from 'react';
import { Button, CardHead, Tag, TextLink, Toggle } from '../../../ui';
import { TASK_TIMES, WORK, type CatalogService, type ServiceTask } from '../data';
import '../catalog.css';

export type ServiceDetailProps = {
  service: CatalogService;
  onTaskChange: (index: number, on: boolean) => void;
  /** Returns true when the task was added. */
  onAddTask: (task: Pick<ServiceTask, 'name' | 'time'>) => boolean;
};

/** The selected service: what customers read, the tasks they can tick (add or switch off), and who can be sent. */
export function ServiceDetail({ service: sel, onTaskChange, onAddTask }: ServiceDetailProps) {
  const [newTask, setNewTask] = useState<{ name: string; time: string } | null>(null);
  const add = () => { if (newTask && onAddTask(newTask)) setNewTask(null); };

  return (
    <div className="card cat-panel">
      <CardHead pad={false} title={sel.name} right={sel.live ? <Tag tone="g">Live</Tag> : <Tag tone="x">Hidden</Tag>} />
      <div className="s m">Shown to customers as: {sel.blurb}</div>
      {sel.tasks ? <>
        <div className="h2">Tasks the customer can tick</div>
        <div className="cat-tasks s">
          {sel.tasks.map((t, i) => (
            <div className="row" key={t.name + i}>
              <span className={t.on ? undefined : 'cat-task-off'}>{t.name}</span>
              <span className="lft"><span className="m">{t.time}</span>
                <Toggle on={t.on} onChange={(v) => onTaskChange(i, v)} /></span>
            </div>))}
        </div>
        {newTask ? (
          <div className="lft cat-new-task">
            <input className="inp cat-task-name" placeholder="Task name" autoFocus value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && add()} />
            <select className="inp cat-task-time" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}>{TASK_TIMES.map((x) => <option key={x}>{x}</option>)}</select>
            <Button size="sm" onClick={add}>Add</Button><Button variant="outline" size="sm" onClick={() => setNewTask(null)}>Cancel</Button>
          </div>
        ) : <TextLink onClick={() => setNewTask({ name: '', time: '30 min' })}>Add a task</TextLink>}
      </> : <div className="s m">The customer writes their own list of chores. No fixed tasks.</div>}
      <div className="s m">{sel.needs ? (sel.trained ? `${sel.trained} partners are trained for this service.` : `Only partners with the ${sel.needs} specialisation are sent.`) : `Every approved ${WORK[sel.category].toLowerCase()} partner can be sent for this service.`}</div>
    </div>
  );
}

export default ServiceDetail;
