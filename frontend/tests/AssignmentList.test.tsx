import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AssignmentList from '../src/components/AssignmentList';
import { assignmentApi } from '../src/api/api';

// Mock the API
jest.mock('../src/api/api');
const mockedAssignmentApi = assignmentApi as jest.Mocked<typeof assignmentApi>;

const mockAssignments = [
  {
    id: 1,
    title: 'Test Assignment 1',
    description: 'Test Description 1',
    dueDate: '2024-12-31T23:59:59',
    completed: false,
    createdAt: '2024-01-01T00:00:00'
  },
  {
    id: 2,
    title: 'Test Assignment 2',
    description: 'Test Description 2',
    dueDate: undefined,
    completed: true,
    createdAt: '2024-01-02T00:00:00'
  }
];

describe('AssignmentList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('renders loading state initially', async () => {
    mockedAssignmentApi.getAll.mockImplementation(() => new Promise(() => {}));
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    expect(screen.getByText('Loading assignments...')).toBeInTheDocument();
  });
  test('renders assignments after loading', async () => {
    mockedAssignmentApi.getAll.mockResolvedValue(mockAssignments);
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Test Assignment 1')).toBeInTheDocument();
      expect(screen.getByText('Test Assignment 2')).toBeInTheDocument();
    });
  });
  test('renders empty message when no assignments', async () => {
    mockedAssignmentApi.getAll.mockResolvedValue([]);
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('등록된 과제가 없습니다.')).toBeInTheDocument();
    });
  });
  test('handles complete assignment', async () => {
    const incompleteAssignment = { ...mockAssignments[0] };
    const completedAssignment = { ...mockAssignments[0], completed: true };
    
    mockedAssignmentApi.getAll
      .mockResolvedValueOnce([incompleteAssignment])
      .mockResolvedValueOnce([completedAssignment]);
    mockedAssignmentApi.complete.mockResolvedValue(completedAssignment);
    
    const user = userEvent.setup();
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Test Assignment 1')).toBeInTheDocument();
    });
    
    const completeButton = screen.getByText('완료');
    
    await act(async () => {
      await user.click(completeButton);
    });
    
    expect(mockedAssignmentApi.complete).toHaveBeenCalledWith(1);
  });
  test('handles delete assignment', async () => {
    mockedAssignmentApi.getAll
      .mockResolvedValueOnce(mockAssignments)
      .mockResolvedValueOnce([mockAssignments[1]]);
    mockedAssignmentApi.delete.mockResolvedValue();
    
    const user = userEvent.setup();
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Test Assignment 1')).toBeInTheDocument();
    });
    
    const deleteButtons = screen.getAllByText('삭제');
    
    await act(async () => {
      await user.click(deleteButtons[0]);
    });
    
    expect(mockedAssignmentApi.delete).toHaveBeenCalledWith(1);
  });
  test('displays error message on API failure', async () => {
    mockedAssignmentApi.getAll.mockRejectedValue(new Error('API Error'));
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch assignments')).toBeInTheDocument();
    });
  });
  test('shows completed assignments with different styling', async () => {
    mockedAssignmentApi.getAll.mockResolvedValue(mockAssignments);
    
    await act(async () => {
      render(<AssignmentList />);
    });
    
    await waitFor(() => {
      const completedTitle = screen.getByText('Test Assignment 2');
      expect(completedTitle).toHaveClass('completed-title');
    });
  });
});
