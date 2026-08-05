import api from './api';

const DEFAULT_WORKERS = [
  {
    id: 101,
    employee_id: 'EMP-2026-01',
    name: 'Ramesh Mohanty',
    email: 'ramesh.worker@safai.com',
    phone: '+91 98765 43210',
    department: 'Municipal Waste Operations',
    assigned_zone: 'Saheed Nagar Zone 1',
    status: 'Available',
    profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    assigned_tasks_count: 5,
    completed_tasks_count: 18,
    performance_score: 94,
    avg_resolution_hours: 3.2
  },
  {
    id: 102,
    employee_id: 'EMP-2026-02',
    name: 'Suresh Nayak',
    email: 'suresh.worker@safai.com',
    phone: '+91 98765 43211',
    department: 'Heritage & Temple Sanitation',
    assigned_zone: 'Old Town Heritage Zone',
    status: 'Busy',
    profile_photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    assigned_tasks_count: 4,
    completed_tasks_count: 22,
    performance_score: 96,
    avg_resolution_hours: 2.8
  },
  {
    id: 103,
    employee_id: 'EMP-2026-03',
    name: 'Mahesh Das',
    email: 'mahesh.worker@safai.com',
    phone: '+91 98765 43212',
    department: 'Commercial & Tech Corridor',
    assigned_zone: 'Patia KIIT Square Zone',
    status: 'Available',
    profile_photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
    assigned_tasks_count: 3,
    completed_tasks_count: 15,
    performance_score: 91,
    avg_resolution_hours: 4.1
  }
];

const DEFAULT_WORKER_TASKS = [
  {
    id: 1,
    task_id: 'TSK-1049',
    complaint_id: 'SAF-2026-1049',
    category: 'Garbage Accumulation',
    description: 'Large pile of commercial unsegregated waste dumping near Saheed Nagar market square.',
    citizen_name: 'Aarav Sharma',
    address: 'Plot 42, Janpath Road, Saheed Nagar, Bhubaneswar',
    ward: 'Saheed Nagar',
    latitude: 20.2886,
    longitude: 85.8427,
    priority: 'HIGH',
    status: 'In Progress',
    assigned_date: '2026-08-01T10:30:00Z',
    report_image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    admin_notes: 'Urgent commercial area clearance requested by market association.',
    worker_notes: 'En route with sanitation truck BMC-01.',
    before_image: null,
    after_image: null,
    completed_at: null
  },
  {
    id: 2,
    task_id: 'TSK-1022',
    complaint_id: 'SAF-2026-1022',
    category: 'Overflowing Dustbin',
    description: 'Public community bin overflowing onto sidewalk near Lingaraj Temple Old Town entrance.',
    citizen_name: 'Neha Verma',
    address: 'Temple Road, Old Town, Bhubaneswar',
    ward: 'Old Town',
    latitude: 20.2392,
    longitude: 85.8335,
    priority: 'MEDIUM',
    status: 'Completed',
    assigned_date: '2026-07-29T08:15:00Z',
    report_image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80',
    admin_notes: 'Heritage zone priority clearance.',
    worker_notes: 'Bins emptied and area sanitized thoroughly.',
    before_image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=600&q=80',
    after_image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
    completed_at: '2026-07-29T12:00:00Z'
  },
  {
    id: 3,
    task_id: 'TSK-1011',
    complaint_id: 'SAF-2026-1011',
    category: 'Missed Waste Collection',
    description: 'Door-to-door waste collection vehicle missed Lane 3 near KIIT Square for two consecutive days.',
    citizen_name: 'Rohit Singh',
    address: 'KIIT Avenue, Patia, Bhubaneswar',
    ward: 'Patia',
    latitude: 20.3541,
    longitude: 85.8184,
    priority: 'LOW',
    status: 'Assigned',
    assigned_date: '2026-07-30T11:45:00Z',
    report_image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=600&q=80',
    admin_notes: 'Deploy morning route collection team.',
    worker_notes: '',
    before_image: null,
    after_image: null,
    completed_at: null
  }
];

const DEFAULT_NOTIFICATIONS = [
  { id: 1, title: 'New Task Assigned', message: 'Complaint SAF-2026-1049 assigned to you by Admin.', date: '10 mins ago', read: false },
  { id: 2, title: 'Task Updated', message: 'Admin added priority note to Task TSK-1022.', date: '1 hour ago', read: false },
  { id: 3, title: 'Task Successfully Verified', message: 'Task TSK-1022 verified and complaint resolved by Admin.', date: '1 day ago', read: true }
];

const getStoredWorkers = () => {
  const stored = localStorage.getItem('safai_workers');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { console.error(e); }
  }
  localStorage.setItem('safai_workers', JSON.stringify(DEFAULT_WORKERS));
  return DEFAULT_WORKERS;
};

const getStoredTasks = () => {
  const stored = localStorage.getItem('safai_worker_tasks');
  if (stored) {
    try { return JSON.parse(stored); } catch (e) { console.error(e); }
  }
  localStorage.setItem('safai_worker_tasks', JSON.stringify(DEFAULT_WORKER_TASKS));
  return DEFAULT_WORKER_TASKS;
};

const saveTasks = (tasks) => localStorage.setItem('safai_worker_tasks', JSON.stringify(tasks));
const saveWorkers = (workers) => localStorage.setItem('safai_workers', JSON.stringify(workers));

export const workerService = {
  async login(credentials) {
    try {
      const res = await api.post('auth/worker/login/', credentials);
      if (res.data.access) {
        localStorage.setItem('safai_token', res.data.access);
        localStorage.setItem('safai_user', JSON.stringify(res.data.user));
        return res.data;
      }
    } catch (err) {
      console.warn('Worker login fallback mode');
    }

    const workers = getStoredWorkers();
    const found = workers.find(w => w.employee_id.toLowerCase() === credentials.email.toLowerCase() || w.email.toLowerCase() === credentials.email.toLowerCase()) || workers[0];
    
    const workerUser = {
      id: found.id,
      name: found.name,
      email: found.email,
      role: 'FIELD_WORKER',
      employee_id: found.employee_id,
      department: found.department,
      assigned_zone: found.assigned_zone,
      profile_photo: found.profile_photo,
      status: found.status
    };

    localStorage.setItem('safai_token', 'mock_worker_jwt_token_999');
    localStorage.setItem('safai_user', JSON.stringify(workerUser));
    return { user: workerUser, access: 'mock_worker_jwt_token_999' };
  },

  async getProfile() {
    const user = JSON.parse(localStorage.getItem('safai_user') || '{}');
    const workers = getStoredWorkers();
    return workers.find(w => w.id === user.id || w.employee_id === user.employee_id) || workers[0];
  },

  async getTasks() {
    return getStoredTasks();
  },

  async getTask(id) {
    const tasks = getStoredTasks();
    return tasks.find(t => t.id === parseInt(id) || t.complaint_id === id || t.task_id === id) || tasks[0];
  },

  async updateTaskStatus(id, newStatus, notes = '', afterImage = null) {
    const tasks = getStoredTasks();
    let updatedTask = null;
    const updatedList = tasks.map(t => {
      if (t.id === parseInt(id) || t.task_id === id || t.complaint_id === id) {
        updatedTask = {
          ...t,
          status: newStatus,
          worker_notes: notes || t.worker_notes,
          after_image: afterImage || t.after_image,
          completed_at: newStatus === 'Completed' ? new Date().toISOString() : t.completed_at
        };
        return updatedTask;
      }
      return t;
    });
    saveTasks(updatedList);

    // Also update parent complaint status if needed
    const storedComplaints = JSON.parse(localStorage.getItem('safai_complaints') || '[]');
    const updatedComplaints = storedComplaints.map(c => {
      if (c.id === parseInt(id) || c.complaint_id === id) {
        let compStatus = c.status;
        if (newStatus === 'In Progress') compStatus = 'IN_PROGRESS';
        return { ...c, status: compStatus };
      }
      return c;
    });
    localStorage.setItem('safai_complaints', JSON.stringify(updatedComplaints));

    return updatedTask;
  },

  // Admin Worker Management
  async getWorkers() {
    return getStoredWorkers();
  },

  async createWorker(workerData) {
    const workers = getStoredWorkers();
    const newWorker = {
      id: Date.now(),
      employee_id: `EMP-2026-0${workers.length + 1}`,
      name: workerData.name,
      email: workerData.email,
      phone: workerData.phone || '+91 98765 43299',
      department: workerData.department || 'Municipal Waste Operations',
      assigned_zone: workerData.assigned_zone || 'Saheed Nagar Zone 1',
      status: 'Available',
      profile_photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      assigned_tasks_count: 0,
      completed_tasks_count: 0,
      performance_score: 100,
      avg_resolution_hours: 2.5
    };
    workers.unshift(newWorker);
    saveWorkers(workers);
    return newWorker;
  },

  async deleteWorker(id) {
    const workers = getStoredWorkers().filter(w => w.id !== parseInt(id));
    saveWorkers(workers);
    return true;
  },

  async assignTaskToWorker(complaintId, workerId, adminNotes = '') {
    const workers = getStoredWorkers();
    const worker = workers.find(w => w.id === parseInt(workerId));

    const tasks = getStoredTasks();
    const newTask = {
      id: Date.now(),
      task_id: `TSK-${Math.floor(1000 + Math.random() * 9000)}`,
      complaint_id: complaintId,
      category: 'Garbage Accumulation',
      description: 'Cleanliness issue assigned by Municipal Admin.',
      citizen_name: 'Citizen',
      address: 'Bhubaneswar Ward Area',
      ward: worker ? worker.assigned_zone : 'Saheed Nagar',
      latitude: 20.2961,
      longitude: 85.8245,
      priority: 'HIGH',
      status: 'Assigned',
      assigned_date: new Date().toISOString(),
      report_image: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=600&q=80',
      admin_notes: adminNotes || 'Please inspect and clear waste urgently.',
      worker_notes: '',
      before_image: null,
      after_image: null,
      completed_at: null
    };
    tasks.unshift(newTask);
    saveTasks(tasks);

    // Update complaint status to ASSIGNED & update assigned_team
    const storedComplaints = JSON.parse(localStorage.getItem('safai_complaints') || '[]');
    const updatedComplaints = storedComplaints.map(c => {
      if (c.id === parseInt(complaintId) || c.complaint_id === complaintId) {
        return {
          ...c,
          status: 'ASSIGNED',
          assigned_team: worker ? `${worker.name} (${worker.assigned_zone})` : 'Assigned Worker'
        };
      }
      return c;
    });
    localStorage.setItem('safai_complaints', JSON.stringify(updatedComplaints));

    return newTask;
  },

  async getNotifications() {
    const stored = localStorage.getItem('safai_worker_notifications');
    return stored ? JSON.parse(stored) : DEFAULT_NOTIFICATIONS;
  }
};
