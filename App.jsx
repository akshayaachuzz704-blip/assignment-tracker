import React, { useState } from 'react';

export default function App() {
  // 1. Initial State Data
  const [assignments, setAssignments] = useState([
    { id: 1, title: 'Data Structures Problem Set', subject: 'Computer Science', dueDate: '2026-06-28', status: 'Pending' },
    { id: 2, title: 'Thermodynamics Lab Report', subject: 'Physics', dueDate: '2026-06-15', status: 'Late' },
    { id: 3, title: 'Calculus Integration Sheet', subject: 'Maths', dueDate: '2026-06-20', status: 'Submitted' },
  ]);

  // 2. Form Input States
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('Computer Science');
  const [dueDate, setDueDate] = useState('');

  // 3. Filter State
  const [filterSubject, setFilterSubject] = useState('All');

  const subjectOptions = ['Computer Science', 'Physics', 'Maths', 'Chemistry'];

  // Action: Add New Assignment
  const handleAddAssignment = (e) => {
    e.preventDefault();
    if (!title || !dueDate) {
      alert('Please enter both Title and Due Date');
      return;
    }

    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status: 'Pending',
    };

    setAssignments([...assignments, newAssignment]);
    setTitle('');
    setDueDate('');
  };

  // Action: Update Submission Status
  const handleStatusChange = (id, newStatus) => {
    setAssignments(
      assignments.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Filter Logic
  const filteredAssignments = filterSubject === 'All'
    ? assignments
    : assignments.filter((item) => item.subject === filterSubject);

  // Dashboard Counter Calculations
  const totalCount = assignments.length;
  const submittedCount = assignments.filter((item) => item.status === 'Submitted').length;
  const pendingCount = assignments.filter((item) => item.status === 'Pending').length;
  const lateCount = assignments.filter((item) => item.status === 'Late').length;

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '900px', margin: '0 auto', color: '#333' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        <h2>College Assignment Submission Tracker</h2>
        <p style={{ color: '#666' }}>Faculty Dashboard Panel</p>
      </header>

      {/* DASHBOARD SUMMARY COUNTS */}
      <section style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '150px', padding: '15px', background: '#f0f4f8', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#1a365d' }}>{totalCount}</h3>
          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Total Tracked</span>
        </div>
        <div style={{ flex: '1', minWidth: '150px', padding: '15px', background: '#e6fffa', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#234e52' }}>{submittedCount}</h3>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2c7a7b' }}>Submitted</span>
        </div>
        <div style={{ flex: '1', minWidth: '150px', padding: '15px', background: '#feebc8', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#744210' }}>{pendingCount}</h3>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#dd6b20' }}>Pending</span>
        </div>
        <div style={{ flex: '1', minWidth: '150px', padding: '15px', background: '#fed7d7', borderRadius: '8px', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 5px 0', color: '#742a2a' }}>{lateCount}</h3>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#e53e3e' }}>Late</span>
        </div>
      </section>

      <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
        {/* ADD ASSIGNMENT FORM */}
        <section style={{ flex: '1', minWidth: '280px', background: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h3 style={{ marginTop: 0 }}>Add New Assignment</h3>
          <form onSubmit={handleAddAssignment} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Assignment Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="e.g. Lab Report 2"
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Subject Department</label>
              <select 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                {subjectOptions.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px' }}>Due Date</label>
              <input 
                type="date" 
                value={dueDate} 
                onChange={(e) => setDueDate(e.target.value)}
                style={{ width: '100%', padding: '8px', boxSizing: 'border-box', borderRadius: '4px', border: '1px solid #ccc' }}
              />
            </div>
            <button type="submit" style={{ padding: '10px', background: '#3182ce', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '5px' }}>
              Save Assignment
            </button>
          </form>
        </section>

        {/* ASSIGNMENT RECORDS LIST */}
        <section style={{ flex: '2', minWidth: '320px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
            <h3 style={{ margin: 0 }}>Assignment Records</h3>
            <div>
              <label style={{ marginRight: '8px', fontSize: '14px' }}>Filter Department:</label>
              <select 
                value={filterSubject} 
                onChange={(e) => setFilterSubject(e.target.value)}
                style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                <option value="All">All Subjects</option>
                {subjectOptions.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            </div>
          </div>

          {filteredAssignments.length === 0 ? (
            <p style={{ color: '#999', textAlign: 'center', padding: '20px', border: '1px dashed #ccc', borderRadius: '8px' }}>No assignments found.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredAssignments.map((item) => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', border: '1px solid #e2e8f0', borderRadius: '8px', background: 'white' }}>
                  <div>
                    <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>{item.title}</h4>
                    <span style={{ fontSize: '12px', background: '#edf2f7', padding: '3px 8px', borderRadius: '12px', marginRight: '10px' }}>{item.subject}</span>
                    <span style={{ fontSize: '12px', color: '#718096' }}>Due: {item.dueDate}</span>
                  </div>
                  <div>
                    <select
                      value={item.status}
                      onChange={(e) => handleStatusChange(item.id, e.target.value)}
                      style={{
                        padding: '6px',
                        borderRadius: '4px',
                        fontWeight: 'bold',
                        border: '1px solid #ccc',
                        backgroundColor: 
                          item.status === 'Submitted' ? '#c6f6d5' : 
                          item.status === 'Pending' ? '#feebc8' : '#fed7d7',
                        color: 
                          item.status === 'Submitted' ? '#22543d' : 
                          item.status === 'Pending' ? '#744210' : '#742a2a'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Late">Late</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
