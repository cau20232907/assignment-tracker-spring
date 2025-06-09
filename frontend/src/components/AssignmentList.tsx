import React, { useState, useEffect } from 'react';
import { Assignment } from '../types/Assignment';
import { assignmentApi } from '../api/api';

interface AssignmentListProps {
  refresh?: boolean;
  onRefreshComplete?: () => void;
}

const AssignmentList: React.FC<AssignmentListProps> = ({ 
  refresh = false, 
  onRefreshComplete 
}) => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await assignmentApi.getAll();
      setAssignments(data);
    } catch (err) {
      setError('Failed to fetch assignments');
      console.error('Error fetching assignments:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  useEffect(() => {
    if (refresh) {
      fetchAssignments().then(() => {
        onRefreshComplete?.();
      });
    }
  }, [refresh, onRefreshComplete]);

  const handleComplete = async (id: number) => {
    try {
      await assignmentApi.complete(id);
      await fetchAssignments();
    } catch (err) {
      console.error('Error completing assignment:', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await assignmentApi.delete(id);
      await fetchAssignments();
    } catch (err) {
      console.error('Error deleting assignment:', err);
    }
  };
  const formatDate = (dateString: string) => {
    try {
      // Spring Boot에서 마이크로초를 포함한 ISO 날짜 형식을 처리
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Date formatting error:', error);
      return 'Invalid Date';
    }
  };

  if (loading) return <div className="loading">Loading assignments...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="assignment-list">
      <h2>과제 목록</h2>
      {assignments.length === 0 ? (
        <p className="empty-message">등록된 과제가 없습니다.</p>
      ) : (
        <div className="assignments">
          {assignments.map(assignment => (
            <div 
              key={assignment.id} 
              className={`assignment-item ${assignment.completed ? 'completed' : ''}`}
            >
              <div className="assignment-content">
                <h3 className={assignment.completed ? 'completed-title' : ''}>
                  {assignment.title}
                </h3>
                {assignment.description && (
                  <p className="description">{assignment.description}</p>
                )}                <div className="assignment-meta">
                  {assignment.dueDate && (
                    <span className="due-date">
                      마감일: {formatDate(assignment.dueDate)}
                    </span>
                  )}
                  <span className="created-date">
                    생성일: {formatDate(assignment.createdAt)}
                  </span>
                </div>
              </div>
              <div className="assignment-actions">
                {!assignment.completed && (
                  <button 
                    onClick={() => handleComplete(assignment.id)}
                    className="complete-btn"
                  >
                    완료
                  </button>
                )}
                <button 
                  onClick={() => handleDelete(assignment.id)}
                  className="delete-btn"
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
