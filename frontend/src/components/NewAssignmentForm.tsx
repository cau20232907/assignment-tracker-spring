import React, { useState } from 'react';
import { AssignmentCreate } from '../types/Assignment';
import { assignmentApi } from '../api/api';

interface NewAssignmentFormProps {
  onSuccess?: () => void;
}

const NewAssignmentForm: React.FC<NewAssignmentFormProps> = ({ onSuccess }) => {  const [formData, setFormData] = useState<AssignmentCreate>({
    title: '',
    description: '',
    dueDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
        const submitData = {
        ...formData,
        dueDate: formData.dueDate || undefined,
        description: formData.description || undefined,
      };

      await assignmentApi.create(submitData);
        // 폼 초기화
      setFormData({
        title: '',
        description: '',
        dueDate: '',
      });
      
      onSuccess?.();
    } catch (err) {
      setError('과제 생성에 실패했습니다.');
      console.error('Error creating assignment:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="new-assignment-form">
      <h2>새 과제 추가</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">제목 *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="과제 제목을 입력하세요"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">설명</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="과제 설명을 입력하세요 (선택사항)"
            rows={3}
          />
        </div>        <div className="form-group">
          <label htmlFor="dueDate">마감일</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        {error && <div className="error">{error}</div>}

        <button 
          type="submit" 
          disabled={loading}
          className="submit-btn"
        >
          {loading ? '추가 중...' : '과제 추가'}
        </button>
      </form>
    </div>
  );
};

export default NewAssignmentForm;
